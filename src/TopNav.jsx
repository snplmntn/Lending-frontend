import "./TopNav.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function TopNav() {
  const [isListClicked, setIsListClicked] = useState(false);

  function handleOpenListNav () {
    setIsListClicked(!isListClicked);
    console.log(isListClicked)
  }

  function handleCloseListNav () {
    setIsListClicked(false);
    console.log(isListClicked)
  }

  return (
    <>
    <div className="topnav">
      <NavLink to="/AddPage" onClick={handleCloseListNav} activeclassname="active">Add</NavLink>
      <NavLink to="/Home" onClick={handleCloseListNav} activeclassname="active">Home</NavLink>
      <a onClick={handleOpenListNav}>List</a>
    </div>
    {isListClicked && (
      <>
      <div className="list-links-container">
        <NavLink to="/Contracts" activeclassname="active">Contracts</NavLink>
        <NavLink to="/DueDates" activeclassname="active">Due Dates</NavLink>
        <NavLink to="/Unpaid" activeclassname="active">Unpaid</NavLink>
        {console.log("running")}
      </div>
      <div id="overlay"></div>
      </>
    )}
    </>
  );
}
