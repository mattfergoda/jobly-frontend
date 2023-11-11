import JobCard from "./JobCard";

/** JobCardList presentational component
 * Renders JobCard for each job
 * Props:
 * - jobs: [{ id, title, salary, equity, companyHandle, companyName }, ... ]
 *
 * { JobList, CompanyDetail } -> JobCardList -> JobCard
 */

function JobCardList({ jobs }) {
  return (
    <div className="JobCardList m-3 ">
      {jobs.map(job => <JobCard
                          key={job.id}
                          title={job.title}
                          companyName={job.companyNAme}
                          salary={job.salary}
                          equity={job.equity}/>)}
    </div>
  );
}

export default JobCardList;