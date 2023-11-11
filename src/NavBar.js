import { useContext, useState, useEffect } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { useLocation } from "react-router-dom";
import userContext from "./user/userContext";

/** NavBar Presentational Component
 *
 * App -> NavBar -> { Link, ... }
 */

function NavBar({ logoutUser }) {
  const currentUser = useContext(userContext);

  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);

  const location = useLocation();
  const [url, setUrl] = useState(null);
  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);

  /** Renders items that will appear on left side of NavBar */

  function renderLeftItems() {
    return (
      <Nav className="me-auto p-0" navbar>
        {currentUser && (
          <>
            <NavItem >
              <NavLink
                href="/companies"
                className={(url === "/companies" ? "active" : "")}>
                Companies
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="/jobs"
                className={(url === "/jobs" ? "active" : "")}>
                Jobs
              </NavLink>
            </NavItem>
          </>
        )}
      </Nav>
    );
  }

  /** Renders items that will appear on right side of NavBar depending on
   * anon vs logged in user.
   */

  function renderRightItems() {
    return (
      <Nav navbar>
        {currentUser
          ?
          <>
            <NavItem >
              <NavLink
                href="/profile"
                className={(url === "/profile" ? "active" : "")}>
                Profile
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="/"
                onClick={logoutUser}>
                Logout
              </NavLink>
            </NavItem>
          </>
          : (
            <>
              <NavItem >
                <NavLink
                  href="/login"
                  className={(url === "/login" ? "active" : "")}>
                  Login
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="/signup"
                  className={(url === "/signup" ? "active" : "")}>
                  Signup
                </NavLink>
              </NavItem>
            </>
          )}
      </Nav>
    );
  }

  return (
    <div className="NavBar">
      <Navbar expand={"md"} dark className="bg-primary">
        <NavbarBrand href="/">
          Jobly
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="me-2" />
        <Collapse isOpen={!collapsed} navbar>
          {renderLeftItems()}
          {renderRightItems()}
        </Collapse>
      </Navbar>

    </div>
  );
}

export default NavBar;