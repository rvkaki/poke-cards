import Attack from "./Attack";
import Attribute from "./Attribute";
import "./Info.css";

const Info = (props) => {
  const isPokemon = props.supertype === "Pokémon";
  return (
    <div className="Info">
      <div className="horizontal" style={{ justifyContent: "space-between" }}>
        <div className="vertical">
          <b style={{ fontSize: "2.4rem" }}>{props.name}</b>
          {props.evolvesFrom ? (
            <i style={{ fontSize: "1rem" }}>Evolves from {props.evolvesFrom}</i>
          ) : null}
        </div>
        {props.nationalPokedexNumber ? (
          <span>#{props.nationalPokedexNumber}</span>
        ) : null}
      </div>
      <div className="horizontal" style={{ justifyContent: "space-between" }}>
        <p>
          {props.subtype} {props.supertype}
        </p>
        {isPokemon ? (
          <div className="horizontal">
            <span style={{ fontSize: "1.8rem", marginRight: "16px" }}>
              {props.hp}
              <span style={{ fontSize: "1rem" }}>HP</span>
            </span>
            <img
              src={`assets/${props.types[0]}.webp`}
              alt={props.types[0]}
              width="32px"
              height="32px"
            />
          </div>
        ) : null}
      </div>
      {props.ability ? (
        <div className="Info-ability">
          <span className="title">
            <i>{props.ability.type}</i> - {props.ability.name}
          </span>
          <br />
          <span className="text">{props.ability.text}</span>
        </div>
      ) : null}
      {props.attacks ? (
        <div>
          {props.attacks.map((att, idx) => (
            <Attack key={idx} {...att} />
          ))}
        </div>
      ) : null}
      {isPokemon ? (
        <div className="horizontal Info-attributes">
          <Attribute label="Weakness" values={props.weaknesses || []} />
          <Attribute label="Resistance" values={props.resistances || []} />
          <Attribute
            label="Retreat Cost"
            values={
              (props.retreatCost &&
                props.retreatCost.map((v) => {
                  return { type: v };
                })) ||
              []
            }
          />
        </div>
      ) : null}
      <p>
        <i>{props.text}</i>
      </p>
      <div>
        <div className="horizontal Info-set">
          <span>{props.set}</span>
          <span>
            {props.number}/{props.setTotal}
          </span>
        </div>
        <div className="horizontal Info-set">
          <span>{props.artist}</span>
          <span>
            {props.series} <i>{props.rarity}</i>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Info;
