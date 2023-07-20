import { useEffect, useState } from "react";
import TopNav from "../../TopNav";
import "./Unpaid.css";
import axios from "axios";
import LendStatus from "../../LendStatus";

export default function DueDates() {
  const [dueDates, setDueDates] = useState([]);
  const [pastDueDates, setPastDueDates] = useState([]);

  //Getting Ongoing Due Dates
  useEffect(() => {
    const fetchDueDates = async () => {
      const date = new Date(Date.now());
      date.setDate(date.getDate());
      await axios
        .get(`http://localhost:8080/api/dueDates/date/ongoing/${date}`)
        .then((dueDates) => setDueDates(dueDates.data));
    };
    fetchDueDates();
  }, []);

  //Getting Past Due Dates
  useEffect(() => {
    const fetchPastDueDates = async () => {
      const date = new Date(Date.now());
      date.setDate(date.getDate());
      await axios
        .get(`http://localhost:8080/api/dueDates/date/past/${date}`)
        .then((pastDueDates) => setPastDueDates(pastDueDates.data));
    };
    fetchPastDueDates();
  }, []);

  return (
    <>
      <TopNav />
      <div className="unpaid-list-container">
        <div className="unpaid-list">
          <div className="headings">
            <p>Name</p>
            <p>Amount</p>
            <p>Due Date(yy/mm/dd)</p>
            <p>Paying Method</p>
            <p>Status</p>
          </div>
          {dueDates.length === 0 ? (
            <div>
              <p style={{ fontWeight: "bold" }}>
                It seems that there's nothing here
              </p>
            </div>
          ) : (
            dueDates.map((el) => (
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
                    statusPlaceholder="..."
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
