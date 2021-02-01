const Attribute = (props) => {
  return (
    <div
      style={{
        flex: 1,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <span style={{ fontWeight: 600 }}>{props.label}</span>
      <div className="horizontal">
        {props.values.map((v, idx) => (
          <div key={idx} className="horizontal">
            <img
              src={`assets/${v.type}.webp`}
              alt={v.type}
              width="24px"
              height="24px"
            />
            <span>{v.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Attribute;
