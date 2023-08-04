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

  const width = window.innerWidth;

  return (
    <>
      <TopNav />
      <div className="unpaid-list-container">
        <div className="unpaid-list">
          <h3 className="indicator">Unpaid</h3>
          {width > 1080 && (
            <div className="headings">
              <p>Name</p>
              <p>Amount</p>
              <p>Due Date(yy/mm/dd)</p>
              <p>Paying Method</p>
              <p>Status</p>
            </div>
          )}
          <div className="lists-container">
            {UnpaidDue.length === 0 ? (
              <div>
                <p style={{ fontWeight: "bold" }}>
                  It seems that there's nothing here
                </p>
              </div>
            ) : (
              UnpaidDue.map((el) => (
                <div className="lists" key={el._id}>
                  <p>
                    {width < 1080 && "Name: "}
                    {el.username}
                  </p>
                  <p>
                    {width < 1080 && "Amount: "}
                    {el.amountToPay}
                  </p>
                  <p>
                    {width < 1080 && "Due Date (yy/mm/dd): "}
                    {el.dueDate.slice(0, 10)}
                  </p>
                  <p>
                    {width < 1080 && "Paying Method: "}
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
                    {width < 1080 && "Status: "}
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
      </div>
    </>
  );
}
