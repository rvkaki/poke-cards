import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Info from "../components/Info";
import { getCard, getSet } from "../util/apiCalls";
import "./CardScreen.css";

const CardScreen = (props) => {
  const history = useHistory();
  const [card, setCard] = useState();
  const [setTotal, setSetTotal] = useState();

  useEffect(() => {
    if (history.location.state) setCard(history.location.state);
    else
      getCard(history.location.pathname.slice(1)).then((data) =>
        setCard(data.card)
      );
  }, [history.location]);

  useEffect(() => {
    if (card && card.setCode)
      getSet(card.setCode).then((data) => setSetTotal(data.set.totalCards));
  }, [card]);

  if (!card) return null;
  return (
    <div className="CardScreen">
      <img
        className="CardScreen-card"
        src={card.imageUrlHiRes}
        alt={card.name}
      />
      <Info {...card} setTotal={setTotal} />
    </div>
  );
};

export default CardScreen;
