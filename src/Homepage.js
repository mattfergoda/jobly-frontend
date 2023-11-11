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
    <div className="Homepage text-center bg-image background jumbotron" >
      <div className="justify-content-center ">
        <h1 className="text-light display-1">Jobly</h1>
        {renderHomepageText()}
      </div>
    </div>
  );
}

export default Homepage;