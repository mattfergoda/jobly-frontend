import { useState } from "react";
import AlertList from "../common/AlertList";
import { useNavigate } from "react-router-dom";
import "../common/background.css";

/**SignupForm component
 * State:
 * - formData: { username, password, firstName, lastName, email }
 * - alerts: array of strings
 *
 * RouteList -> SignupForm -> { Alert, ... }
 */

function SignupForm({ registerUser }) {
  const blankForm = {
    "username": "",
    "password": "",
    "firstName": "",
    "lastName": "",
    "email": ""
  };
  const [formData, setFormData] = useState(blankForm);
  const [alerts, setAlerts] = useState([]);
  const navigate = useNavigate();

  console.log("SignupForm formData=", formData);

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
      await registerUser(formData);
      navigate("/");
    } catch (errs) {
      setAlerts(errs.map(err => ( { message: err, type: "danger" } )));
    }
  }

  return (
    <div className="SignupForm bg-image background">

      <div className="card bg-secondary col-md-4 offset-md-4">
        <div className="card-body m-3">
          <h3>Sign Up</h3>
          <form className="form-group" onSubmit={handleSubmit}>
            {alerts.length > 0 && <AlertList alerts={alerts} />}
            <fieldset>
              <div className="row">
                <div className="col">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input
                    required
                    className="form-control my-2"
                    onChange={handleChange}
                    id="username"
                    name="username"
                    value={formData.username}
                    aria-label="username" />
                </div>
                <div className="col">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    required
                    className="form-control my-2"
                    onChange={handleChange}
                    id="password"
                    name="password"
                    value={formData.password}
                    aria-label="password"
                    autoComplete="off"
                    type="password" />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label htmlFor="firstName" className="form-label">First Name</label>
                  <input
                    required
                    className="form-control my-2"
                    onChange={handleChange}
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    aria-label="first name" />
                </div>
                <div className="col">
                  <label htmlFor="lastName" className="form-label">Last Name</label>
                  <input
                    required
                    className="form-control my-2"
                    onChange={handleChange}
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    aria-label="last name" />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    required
                    className="form-control my-2"
                    onChange={handleChange}
                    id="email"
                    name="email"
                    value={formData.email}
                    aria-label="email" />
                </div>
                <div className="col">

                </div>
              </div>
            </fieldset>
            <button className="btn btn-primary mt-3" >Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;;