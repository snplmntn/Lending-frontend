import "./TopNav.css";
import { Link } from "react-router-dom";

export default function TopNav() {
  return (
    <div className="topnav">
      <Link to="/AddPage">Add</Link>
      <Link to="/Home">Home</Link>
      <Link to="/List">List</Link>
    </div>
  );
}
