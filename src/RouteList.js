import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./Homepage";
import CompanyList from "./companies/CompanyList";
import CompanyDetail from "./companies/CompanyDetail";
import JobList from "./jobs/JobList";
import LoginForm from "./auth/LoginForm";
import SignupForm from "./auth/SignupForm";
import userContext from "./user/userContext";
import Profile from "./user/Profile";

/** Component containing app routes
 *
 * JoblyApp -> RouteList -> {
 *  CompanyList,
 *  CompanyDetail,
 *  JobList,
 *  Profile,
 *  Homepage,
 *  LoginForm,
 *  SignupForm,
 * }
 */

function RouteList({ registerUser, loginUser, updateUser }) {
  const currentUser = useContext(userContext);

  function renderProtectedRoutes() {
    return (
      <>
        <Route path="/companies" element={<CompanyList />} />
        <Route path="/companies/:company" element={<CompanyDetail />} />
        <Route path="/jobs" element={<JobList />} />
        <Route path="/profile" element={<Profile updateUser={updateUser} />} />
      </>
    );
  }

  function renderUnprotectedRoutes() {
    return (
      <>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginForm loginUser={loginUser} />} />
        <Route
          path="/signup"
          element={<SignupForm registerUser={registerUser} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </>
    );
  }

  return (
    <div className="RoutesList">
      <Routes>
        {currentUser && renderProtectedRoutes()}
        {renderUnprotectedRoutes()}
      </Routes>
    </div>
  );
}

export default RouteList;