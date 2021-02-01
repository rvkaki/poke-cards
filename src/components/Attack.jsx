const Attack = (props) => {
  return (
    <div style={{ marginTop: "8px" }}>
      <div
        className="horizontal"
        style={{
          justifyContent: "space-between",
        }}
      >
        <div className="horizontal">
          {props.cost.map((t, idx) => (
            <img
              key={idx}
              src={`assets/${t}.webp`}
              alt={t}
              width="30px"
              height="30px"
            />
          ))}
          <span style={{ fontWeight: "bold", marginLeft: "24px" }}>
            {props.name}
          </span>
        </div>
        <span style={{ fontSize: "1.8rem", fontWeight: 600 }}>
          {props.damage}
        </span>
      </div>
      <span style={{ fontSize: "1.2rem", color: "#333" }}>{props.text}</span>
    </div>
  );
};

export default Attack;
