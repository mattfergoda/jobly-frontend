import { useState } from "react";


/** SearchBar form component
 * Props:
 * - handleSearch: Called in parent.
 *
 * State:
 * - term
 *
 * { CompanyList, JobList } -> SearchBar
 */

function SearchBar({ handleSearch }) {
  const [term, setTerm] = useState("");

  function handleChange(evt) {
    setTerm(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    setTerm("");

    const term = evt.target.term.value;
    handleSearch(term.trim());
  }

  return (
    <form className="SearchBar d-flex p-2 col-md-12" onSubmit={handleSubmit}>
      <input
        name="term"
        value={term}
        onChange={handleChange}
        onSubmit={handleSubmit}
        className="form-control me-sm-2"
        type="search"
        placeholder="Search"/>
      <button className="btn btn-primary my-2 my-sm-0">Search</button>
    </form>
  );
}

export default SearchBar;