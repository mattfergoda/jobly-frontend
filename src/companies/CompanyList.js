import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import JoblyApi from "../api";
import SearchBar from "../common/Search";
import CompanyCard from "./CompanyCard";
import NoSearchResults from "../common/NoSearchResults";
import Loading from "../common/Loading";

/** CompanyList functional component
 *
 * State:
 * - companies: [{ handle, name, description, numEmployees, logoUrl }, ... ]
 *
 * RouteList -> CompanyList -> CompanyCard
 */

function CompanyList() {
  const [companies, setCompanies] = useState(null);

  console.log("CompanyList rendering. companies=", companies);

  /**
   * Helper function for getting companies from the API and updating companies state.
   * Takes searchTerm string.
   */

  async function fetchCompanies(searchTerm) {
    const companies = await JoblyApi.getCompanies(searchTerm);
    setCompanies(companies);
    console.log("CompanyList. updating companies=", companies);
  }

  /** Effect for getting all companies on initial render. */

  useEffect(function fetchCompaniesWhenMounted() {
    fetchCompanies();
  }, []);


  /** function for handling search submit */

  async function handleSearch(term) {
    console.log("handleSearch term=", term);
    await fetchCompanies(term);
  }

  if (companies === null) {
    return <Loading />;
  }

  return (
    <div className="CompanyList col-md-4 offset-md-4">
      <SearchBar handleSearch={handleSearch} />
      {companies.length === 0
        ? <NoSearchResults />
        : <div className="CompanyCardList p-3">
            {companies.map(c => (
              <Link
                to={`/companies/${c.handle}`}
                className="navbar-brand"
                key={c.handle}>
                <CompanyCard key={c.handle}
                             name={c.name}
                             description={c.description}
                             numEmployees={c.numEmployees}
                             logoUrl={c.logoUrl} />
              </Link>
            ))}
          </div>
      }
    </div>
  );
}

export default CompanyList;