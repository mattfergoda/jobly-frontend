import { useState, useContext } from "react";
import userContext from "./userContext";
import AlertList from "../common/AlertList";

/** Form for updating the user's profile
 * State:
 * - formData: { firstName, lastName, email }
 * - alerts: Array of strings.
 *
 * RouteList -> Profile -> { Alert, ... }
 */

function Profile({ updateUser }) {
  const currentUser = useContext(userContext);
  const { username, firstName, lastName, email } = currentUser;
  const initialFormData = { firstName, lastName, email }

  const [formData, setFormData] = useState(initialFormData);
  const [alerts, setAlerts] = useState([]);

  console.log("Profile formData=", formData);
  console.log("Profile alerts=", alerts);

  /** Update form input. */

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: value
    }));
  }

  /** Call parent function and clear form. */

  async function handleSubmit(evt) {
    evt.preventDefault();

    try {
      await updateUser({...formData, username });
      setAlerts([{message: "Profile successfully updated.", type: "success"}])
    } catch (errs) {
      setAlerts(errs.map(err => ( { message: err, type: "danger" } )));
    }
  }

  return (
    <div className="LoginForm bg-image pt-2 background">

      <div className="card bg-secondary col-md-4 offset-md-4">
        <div className="card-body m-3">

          <h3>{currentUser.username}</h3>

          <form className=" form-group " onSubmit={handleSubmit}>
          {alerts.length > 0 && <AlertList alerts={alerts} />}
            <fieldset>
              <label htmlFor="username" className="form-label">Username</label>
              <input
                disabled
                className="form-control my-2"
                id="username"
                name="username"
                value={username}
                aria-label="username" />
              <label htmlFor="firstName" className="form-label mt-4">
                First Name
              </label>
              <input
                className="form-control my-2"
                onChange={handleChange}
                id="firstName"
                name="firstName"
                value={formData.firstName}
                aria-label="first name" />
              <label htmlFor="lastName" className="form-label mt-4">
                Last Name
              </label>
              <input
                className="form-control my-2"
                onChange={handleChange}
                id="lastName"
                name="lastName"
                value={formData.lastName}
                aria-label="last name" />
              <label htmlFor="email" className="form-label mt-4">
                Email
              </label>
              <input
                className="form-control my-2"
                onChange={handleChange}
                id="email"
                name="email"
                value={formData.email}
                aria-label="email" />
            </fieldset>
            <button className="btn btn-primary mt-3">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;