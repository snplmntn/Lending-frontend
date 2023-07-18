import "./Home.css";
import TodayStatusList from "./StatusList/TodayStatusList";
import YesterdayStatusList from "./StatusList/YesterdayStatusList";
import TomorrowStatusList from "./StatusList/TomorrowStatusList";

export default function Home() {
  return (
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
  );
}
