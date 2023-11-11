import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import RouteList from "./RouteList";
import { BrowserRouter } from "react-router-dom";
import Footer from "./Footer";
import userContext from "./user/userContext";
import JoblyApi from "./api";
import { jwtDecode } from "jwt-decode";
import Loading from "./common/Loading";

const LOCAL_STORAGE_KEY = 'token';

/** JoblyApp
 *
 * State:
 * - currentUser: { username, firstName, lastName, email, isAdmin, jobs}
 * - currentToken: Json Web Token for auth.
 *
 * App -> JoblyApp -> { NavBar, RoutesList }
 */

function JoblyApp() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentToken, setCurrentToken] = useState(
    localStorage.getItem(LOCAL_STORAGE_KEY)
  );

  console.log("JoblyApp rendering. currentUser=", currentUser);
  console.log("JoblyApp rendering. currentToken=", currentToken);


  /** Effect for updating current user on token change */

  useEffect(function updateCurrentUserOnTokenChange() {
    JoblyApi.token = currentToken;

    // User logged out
    if (currentToken === null) {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      setCurrentUser(null);
      return;
    }

    // User logged in
    localStorage.setItem(LOCAL_STORAGE_KEY, currentToken);

    async function fetchCurrentUserInfo() {
      const decodedPayload = jwtDecode(currentToken);
      const username = decodedPayload.username;

      let user = null;
      try {
        user = await JoblyApi.getUserInfo(username);
      } catch (err) { }

      setCurrentUser(user);
    }

    fetchCurrentUserInfo();
  }, [currentToken]);

  /** Call API to register user and update currentToken state.
   * Takes userToAdd: { username, password, firstName, lastName, email }
   */

  async function handleUserSignup(userToAdd) {
    const token = await JoblyApi.registerUser(userToAdd);
    setCurrentToken(token);
  }

  /** Call API to login user and update currentToken state.
   * Takes userLoginInfo: { username, password }
   */

  async function handleUserLogin(userLoginInfo) {
    const token = await JoblyApi.login(userLoginInfo);
    setCurrentToken(token);
  }

  /** Log user out by clearing the token and user states and removing the token
   * from localStorage.
   */

  function handleUserLogout() {
    setCurrentToken(null);
  }

  /** Call the API to update the user. Update currentUser state.
   * Takes newUserInfo: { username, firstName, lastName, email }
   */

  async function handleUserUpdate(updatedUserInfo) {
    const user = await JoblyApi.updateUser(updatedUserInfo);
    setCurrentUser(user);
  }

  if (currentUser === null && currentToken) return <Loading />;

  return (
    <div className="JoblyApp">
      <userContext.Provider value={currentUser}>
        <BrowserRouter>
          <NavBar logoutUser={handleUserLogout} />
          <RouteList
            registerUser={handleUserSignup}
            loginUser={handleUserLogin}
            updateUser={handleUserUpdate} />
          <Footer />
        </BrowserRouter>
      </userContext.Provider>
    </div>
  );
}

export default JoblyApp;