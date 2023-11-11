import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api";
import JobCardList from "../jobs/JobCardList";
import Loading from "../common/Loading";
import NotFound from "../common/NotFound";

/** CompanyDetail functional component
 *
 * State:
 * - companyDetail: { handle, name, description, numEmployees, logoUrl, jobs }
   * where jobs is like [{ id, title, salary, equity }, ...]
 *
 * RouteList -> CompanyDetail -> JobCardList
 */

function CompanyDetail() {
  const urlParams = useParams();
  const companyHandle = urlParams.company;

  const [companyDetail, setCompanyDetail] = useState(null);
  const [errors, setErrors] = useState([]);

  console.log("CompanyDetail rendering. companyDetail=", companyDetail);

  /** Effect for getting company detail on initial render. */

  useEffect(function fetchCompanyDetailWhenMounted() {
    async function fetchCompanyDetail() {
      let companyDetail;
      try {
        companyDetail = await JoblyApi.getCompany(companyHandle);
      } catch (errors) {
        setErrors(errors);
      }

      setCompanyDetail(companyDetail)
      console.log("CompanyDetail. updating companyDetail=", companyDetail);
    }
    fetchCompanyDetail();
  }, [ ]);

  if (errors.length > 0) {
    return <NotFound item={companyHandle} />
  }

  if (!companyDetail) {
    return <Loading />
  }

  return (
    <div className="CompanyDetail col-md-4 offset-md-4">
      <div className="card text-white bg-primary mb-3 m-3 p-3">
      <h1>{companyDetail.name}</h1>
      <p>{companyDetail.description}</p>
      <p>Employees: {companyDetail.numEmployees}</p>
      {companyHandle.logoUrl && (
          <img src={companyHandle.logoUrl}
               alt={companyHandle.name}
               className="d-block user-select-none"
               width="50%"
               height="25%" />
          )
        }
      <JobCardList jobs={companyDetail.jobs}/>
    </div>
    </div>
  );
}

export default CompanyDetail;