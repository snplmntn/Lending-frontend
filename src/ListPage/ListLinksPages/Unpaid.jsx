import { useEffect, useState } from "react";
import TopNav from "../../TopNav";
import "./Unpaid.css";
import axios from "axios";
import LendStatus from "../../LendStatus";
import { URL } from "../../App";

export default function Unpaid() {
  const [UnpaidDue, setUnpaidDues] = useState([]);

  useEffect(() => {
    const fetchDueDates = async () => {
      await axios.get(`${URL}/dueDates/status/2`).then((UnpaidDue) => {
        // Sort the due dates array by dueDate in ascending order
        const sortedDueDates = UnpaidDue.data.sort(
          (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
        );
        setUnpaidDues(sortedDueDates);
      });
    };
    fetchDueDates();
  }, []);

  return (
    <>
      <TopNav />
      <div className="unpaid-list-container">
        <div className="unpaid-list">
          <h3 className="indicator">Unpaid</h3>
          <div className="headings">
            <p>Name</p>
            <p>Amount</p>
            <p>Due Date(yy/mm/dd)</p>
            <p>Paying Method</p>
            <p>Status</p>
          </div>
          {UnpaidDue.length === 0 ? (
            <div>
              <p style={{ fontWeight: "bold" }}>
                It seems that there's nothing here
              </p>
            </div>
          ) : (
            UnpaidDue.map((el) => (
              <div className="lists">
                <p>{el.username}</p>
                <p>{el.amountToPay}</p>
                <p>{el.dueDate.slice(0, 10)}</p>
                <p>
                  {el.payMethod === 1
                    ? "Daily"
                    : el.payMethod === 2
                    ? "Weekly"
                    : el.payMethod === 3
                    ? "15 30"
                    : el.payMethod === 4
                    ? "10 25"
                    : "Monthly"}
                </p>
                <p>
                  <LendStatus
                    id={el._id}
                    name={el.username}
                    amount={el.amountToPay}
                    status={el.status}
                    statusPlaceholder="❌"
                  />
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
