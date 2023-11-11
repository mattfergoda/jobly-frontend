import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import JoblyApi from "../api";
import SearchBar from "../common/Search";
import JobCardList from "./JobCardList";
import NoSearchResults from "../common/NoSearchResults";
import Loading from "../common/Loading";

/** JobList functional component
 *
 * State:
 * - jobs: [{ id, title, salary, equity, companyHandle, companyName }, ... ]
 *
 * RouteList -> JobList -> JobCardList
 */

function JobList() {
  const [jobs, setJobs] = useState(null);

  console.log("JobsList rendering. jobs=", jobs);

  /**
   * Helper function for getting jobs from the API and updating jobs state.
   * Takes searchTerm string.
   */

  async function fetchJobs(searchTerm) {
    const jobs = await JoblyApi.getJobs(searchTerm);
    setJobs(jobs)
    console.log("JobsList. updating jobs=", jobs);
  }

  /** Effect for getting all jobs on initial render. */

  useEffect(function fetchJobsWhenMounted() {
    fetchJobs();
  }, [ ]);

  /**   function for handling search submit */

  async function handleSearch(term) {
    console.log("handleSearch term=", term);
    await fetchJobs(term);
  }

  if (jobs === null) {
    return <Loading />
  }

  return (
    <div className="JobsList col-md-4 offset-md-4">
      <SearchBar handleSearch={handleSearch} />
      {jobs.length === 0
        ? <NoSearchResults />
        : <JobCardList jobs={jobs} />}
    </div>
  );
}

export default JobList;