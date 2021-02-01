const SearchBar = (props) => {
  return (
    <form className={props.className} onSubmit={props.onClick}>
      <input
        type="text"
        placeholder="Search card"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
