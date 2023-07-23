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

  return (
    <>
      <TopNav />
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
      <div className="greet" onClick={logOut}>{`Hi ${user.username}!`}</div>
    </>
  );
}
