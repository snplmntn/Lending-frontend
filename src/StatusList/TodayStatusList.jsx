import { useEffect, useState } from "react";
import "./StatusList.css";
import LendStatus from "../LendStatus.jsx";
import axios from "axios";

export default function StatusList() {
  const [dueDates, setDueDates] = useState([]);

  useEffect(() => {
    const fetchDueDates = async () => {
      const date = new Date(Date.now());
      await axios
        .get(`http://localhost:8080/api/dueDates/date/${date}`)
        .then((dueDates) => setDueDates(dueDates.data));
    };
    fetchDueDates();
  }, []);

  return (
    <div className="status-lists">
      {dueDates.map((el) => (
        <div className="container" key={el._id}>
          <p>{el.username}</p>
          <p>{el.amountToPay}</p>
          <LendStatus
            id={el._id}
            name={el.username}
            amount={el.amountToPay}
            status={el.status}
            statusPlaceholder="..."
          />
        </div>
      ))}
    </div>
  );
}
