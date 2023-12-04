import { useContext } from "react";
import userContext from "./user/userContext";
import "./common/background.css";

/** Homepage presentational component
 *
 * RouteList -> Homepage
 */

function Homepage() {
  const user = useContext(userContext);

  /** Display custom message if user is logged in. */

  function renderHomepageText() {
    return (
      <p className="text-light lead">
        {
          user
            ? `Welcome, ${user.firstName}.`
            : (
              <>
                Don't just find a job.<br />
                Find your next adventure.
              </>
            )
        }
      </p>
    );
  }

  return (
    <div
      className="Homepage background text-center d-flex
       align-items-center justify-content-center min-vh-100" >
      <div>
        <h1 className="text-light display-1">Jobly</h1>
        {renderHomepageText()}
      </div>
    </div>
  );
}

export default Homepage;