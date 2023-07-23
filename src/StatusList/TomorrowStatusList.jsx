import { useEffect, useState } from "react";
import "./StatusList.css";
import LendStatus from "../LendStatus.jsx";
import axios from "axios";
import { URL } from "../App";

export default function StatusList() {
  const [dueDates, setDueDates] = useState([]);

  useEffect(() => {
    const fetchDueDates = async () => {
      const date = new Date();
      date.setDate(date.getDate() + 1);

      await axios.get(`${URL}/dueDates/date/${date}`).then((dueDates) => {
        const sortedDueDates = dueDates.data.sort(
          (a, b) => a.status - b.status
        );
        setDueDates(sortedDueDates);
      });
    };
    fetchDueDates();
  }, []);

  return (
    <div className="status-lists">
      {dueDates.length === 0 ? (
        <div>
          <p>It seems that there's nothing here</p>
        </div>
      ) : (
        dueDates.map((el) => (
          <div className="container" key={el._id}>
            <p>{el.username}</p>
            <p>{el.amountToPay}</p>
            <LendStatus
              id={el._id}
              name={el.username}
              amount={el.amountToPay}
              status={el.status}
              contractId={el.contractID}
              statusPlaceholder="..."
            />
          </div>
        ))
      )}
    </div>
  );
}
