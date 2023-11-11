/** CompanyCard presentational component
 * Props:
 * - company, like { handle, name, description, numEmployees, logoUrl }
 *
 * CompanyList -> CompanyCard
 */

function CompanyCard({ name, description, numEmployees, logoUrl }) {
  return (
    <div className="CompanyCard card bg-secondary mb-3">
      <div className="card-body">
      {logoUrl && (
          <img
            src={logoUrl}
            alt={name}
            className="img-thumbnail rounded d-block img-fluid mb-3 companylogo"
            style={{"maxWidth": "30rem"}} />
          )
        }
        <h4 className="card-title text-wrap">{name}</h4>
        <p className="card-text text-wrap">{description}</p>
        <p className="card-text">Employees: {numEmployees}</p>
      </div>
    </div>
  );
}

export default CompanyCard;