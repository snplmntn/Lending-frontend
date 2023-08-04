import "./TopNav.css";
import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
// import { AuthContext } from "./context/AuthContext";

// async function logOutHere(dispatch) {
//   localStorage.removeItem("user");
//   dispatch({ type: "LOGIN_SUCCESS", payload: null });
//   location.replace("/");
// }

export default function TopNav() {
  // const { user, dispatch } = useContext(AuthContext);

  const [isListClicked, setIsListClicked] = useState(false);

  function handleOpenListNav() {
    setIsListClicked(!isListClicked);
  }

  function handleCloseListNav() {
    setIsListClicked(false);
  }

  return (
    <>
      <div className="topnav">
        <NavLink
          to="/AddPage"
          onClick={handleCloseListNav}
          activeclassname="active"
        >
          Add
        </NavLink>
        <NavLink
          to="/Home"
          onClick={handleCloseListNav}
          activeclassname="active"
        >
          Home
        </NavLink>
        <a onClick={handleOpenListNav}>List</a>
      </div>
      {isListClicked && (
        <>
          <div className="list-links-container">
            <NavLink to="/Contracts" activeclassname="active">
              Contracts
            </NavLink>
            <NavLink to="/DueDates" activeclassname="active">
              Due Dates
            </NavLink>
            <NavLink to="/Unpaid" activeclassname="active">
              Unpaid
            </NavLink>
          </div>
          <div id="overlay" onClick={handleOpenListNav}></div>
        </>
      )}
    </>
  );
}
