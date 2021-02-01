const Card = (props) => {
  return (
    <div className={props.className} onClick={props.onClick}>
      <span>{props.name}</span>
      <img src={props.imageUrl} alt={props.name} onLoad={props.onload} />
    </div>
  );
};

export default Card;
