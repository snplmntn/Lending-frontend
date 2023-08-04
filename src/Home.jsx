import "./Home.css";
import TodayStatusList from "./StatusList/TodayStatusList";
import YesterdayStatusList from "./StatusList/YesterdayStatusList";
import TomorrowStatusList from "./StatusList/TomorrowStatusList";
import { AuthContext } from "./context/AuthContext";
import { useContext, useState } from "react";
import TopNav from "./TopNav";

async function logOutHere(dispatch) {
  localStorage.removeItem("user");
  dispatch({ type: "LOGIN_SUCCESS", payload: null });
  location.replace("/");
}

export default function Home() {
  const { user, dispatch } = useContext(AuthContext);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  function logOut() {
    logOutHere(dispatch);
  }

  function handleLogoutModal() {
    setIsLogoutOpen(!isLogoutOpen)
  }

  return (
    <>
      <TopNav />
      <div className="greet" onClick={handleLogoutModal}>{`Hi ${user.username}!`}</div>
      <div className="content-wrapper">
        <div className="to-pay">
          <h3>Yesterday</h3>
          <div className="namelists">
            <p>Name</p>
            <p>Amount</p>
            <p>Status</p>
          </div>
          <YesterdayStatusList />
        </div>
        <div className="to-pay today">
          <h3>To Pay Today</h3>
          <div className="namelists">
            <p>Name</p>
            <p>Amount</p>
            <p>Status</p>
          </div>
          <TodayStatusList />
        </div>
        <div className="to-pay">
          <h3>Tomorrow</h3>
          <div className="namelists">
            <p>Name</p>
            <p>Amount</p>
            <p>Status</p>
          </div>
          <TomorrowStatusList />
        </div>
      </div>
     
      {isLogoutOpen && (
        <>
        <div className="logout-modal" >
        <input
           type="button"
           className="btn-close"
           onClick={handleLogoutModal}
           value="&times;"
         />
         <h2>Are you sure you want to log out?</h2>
         <button className="logout-btn" onClick={logOut}>Log Out</button>
       </div>
       <div className="overlay" onClick={handleLogoutModal}></div>
       </>
       )}
    </>
  );
}
