const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0
});

/** JobCard presentational component
 * Props:
 * - job: { id, title, salary, equity, companyHandle, companyName }
 *
 * JobCardList -> JobCard
 */

function JobCard({ title, companyName, salary, equity }) {
  return (
    <div className="JobCard card bg-secondary mb-3">
      <div className="card-body">
        <h4 className="card-title">{title}</h4>
        <p className="card-text">{companyName}</p>
        { salary && (
          <p className="card-text">Salary: {formatter.format(salary)}</p>
        ) }
        <p className="card-text">Equity: {equity}</p>
      </div>
    </div>
  );
}

export default JobCard;