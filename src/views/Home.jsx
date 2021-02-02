import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Card from "../components/Card";
import Loader from "../components/Loader";
import SearchBar from "../components/SearchBar";
import { setPageNumber, setSearchName } from "../store/actions/cards";
import { getCards } from "../util/apiCalls";
import { loadImages } from "../util/preloader";
import "./Home.css";

const Home = (props) => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.currentPage);
  const lastPage = useSelector((state) => state.lastPage);
  const searchName = useSelector((state) => state.searchName);

  const [cards, setCards] = useState([]);
  const [value, setValue] = useState(searchName);
  const [loading, setLoading] = useState(false);
  const firstPage = 1;
  const history = useHistory();

  const setCurrentPage = (number) => {
    dispatch(setPageNumber(number));
  };

  const setSearchTerm = (name) => {
    dispatch(setSearchName(name));
  };

  useEffect(() => {
    setLoading(true);
    getCards().then((data) => {
      loadImages(data.map((c) => c.imageUrl)).then(() => {
        setCards(data);
        setLoading(false);
      });
    });
  }, [currentPage]);

  const search = (e) => {
    e.preventDefault();
    setLoading(true);
    setSearchTerm(value);
    setCurrentPage(1);
    getCards().then((data) => {
      loadImages(data.map((c) => c.imageUrl)).then(() => {
        setCards(data);
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
          value={value}
          onChange={setValue}
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
