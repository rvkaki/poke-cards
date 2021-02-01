import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Card from "../components/Card";
import Loader from "../components/Loader";
import SearchBar from "../components/SearchBar";
import { getCards } from "../util/apiCalls";
import { loadImages } from "../util/preloader";
import "./Home.css";

const splitLink = (text) => {
  let res = {};
  const l = text.split(",");

  l.forEach((x) => {
    /* rel: rel=\"next\" */
    const [link, rel] = x.split(";");
    const page = parseInt(link.match(/page=(\d+)/)[1]);
    const key = rel.match(/"(\w+)"/)[1];
    res[key] = page;
  });

  return res;
};

const Home = (props) => {
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const firstPage = 1;
  const [lastPage, setLastPage] = useState(1);
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    getCards(searchTerm, currentPage).then((data) => {
      loadImages(data.cards.map((c) => c.imageUrl)).then(() => {
        setCards(data.cards);
        let l = splitLink(data.link);
        setLastPage(l.last);
        setLoading(false);
      });
    });
  }, [currentPage]);

  const search = (e) => {
    e.preventDefault();
    setLoading(true);
    if (searchTerm !== "") setCurrentPage(1);
    getCards(searchTerm, currentPage).then((data) => {
      loadImages(data.cards.map((c) => c.imageUrl)).then(() => {
        setCards(data.cards);
        let l = splitLink(data.link);
        if (l.last) setLastPage(l.last);
        else setLastPage(1);
        setLoading(false);
      });
    });
  };

  const next = () => {
    if (currentPage + 1 <= lastPage) setCurrentPage(currentPage + 1);
  };

  const prev = () => {
    if (currentPage - 1 >= firstPage) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="Home">
      <div className="horizontal" style={{ justifyContent: "space-evenly" }}>
        <p
          className="Button"
          style={{
            visibility: currentPage === firstPage ? "hidden" : "visible",
          }}
          onClick={prev}
        >
          {"<"} Prev
        </p>
        <SearchBar
          className="horizontal Home-searchbar"
          onClick={search}
          value={searchTerm}
          onChange={setSearchTerm}
        />
        <p
          className="Button"
          style={{
            visibility: currentPage === lastPage ? "hidden" : "visible",
          }}
          onClick={next}
        >
          Next {">"}
        </p>
      </div>
      <div className="Home-container">
        {loading ? <Loader /> : null}
        {cards.length === 0 ? (
          <p style={{ fontSize: "1.8rem" }}>No results found</p>
        ) : (
          cards.map((c) => (
            <Card
              className="Home-card"
              key={c.id}
              imageUrl={c.imageUrl}
              name={c.name}
              onClick={() => history.push(c.id, { ...c })}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
