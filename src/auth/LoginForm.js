import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertList from "../common/AlertList";
import "../common/background.css";



/** Login Form
 * State:
 * - formData: { username, password }
 * - alerts: array of strings.
 *
 * RouteList -> LoginForm
 */

function LoginForm({ loginUser }) {
  const blankForm = {
    "username": "",
    "password": ""
  };
  const [formData, setFormData] = useState(blankForm);
  const [alerts, setAlerts] = useState([]);
  const navigate = useNavigate();

  console.log("LoginForm formData=", formData);

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
      await loginUser(formData);
      navigate("/");
    } catch (errs) {
      setAlerts(errs.map(err => ( { message: err, type: "danger" } )));
    }
  }

  return (
    <div className="LoginForm bg-image background min-vh-100">

      <div className="card bg-secondary col-md-4 offset-md-4">
        <div className="card-body m-3">

          <h3>Login</h3>

          <form className=" form-group " onSubmit={handleSubmit}>
            {alerts.length > 0 && <AlertList alerts={alerts} />}
            <fieldset>
              <label htmlFor="username" className="form-label">Username</label>
              <input
                required
                className="form-control my-2"
                onChange={handleChange}
                id="username"
                name="username"
                value={formData.username}
                aria-label="username" />
              <label htmlFor="password" className="form-label mt-4">Password</label>
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
            </fieldset>
            <button className="btn btn-primary mt-3">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;