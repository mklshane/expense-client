const SearchBar = ({ query, onChange }) => {
  return (
    <input
      type='text'
      value={query}
      onChange={(e) => onChange(e.target.value)}
      placeholder='Search expenses...'
      className='search-input'
    />
  );
};
export default SearchBar;
