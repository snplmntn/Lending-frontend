import { useEffect, useRef, useState } from "react";
import TopNav from "../../TopNav";
import "./Unpaid.css";
import axios from "axios";
import LendStatus from "../../LendStatus";
import { URL } from "../../App";

export default function DueDates() {
  const [dueDates, setDueDates] = useState([]);
  const [pastDueDates, setPastDueDates] = useState([]);
  const isIndicatorClickedStored = localStorage.getItem("isIndicatorClicked");
  const initialIsIndicatorClicked = isIndicatorClickedStored !== "false";
  const [isIndicatorClicked, setIsIndicatorClicked] = useState(
    initialIsIndicatorClicked
  );

  let type;
  if (isIndicatorClicked) type = "ongoing";
  else type = "past";

  //Getting Due Dates
  const fetchueDates = async (isIndicatorClicked) => {
    const date = new Date(Date.now());
    date.setDate(date.getDate());
    await axios
      .get(`${URL}/dueDates/${type}/${date}`)
      .then((dueDates) => {
        // Sort the pastDueDates array by date in ascending order
        const sortedDueDates = dueDates.data.sort(
          (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
        );
        setDueDates(sortedDueDates);
      })
      .catch((error) => {
        console.error("Error fetching past due dates:", error);
      });
  };

  useEffect(() => {
    fetchueDates(isIndicatorClicked);
  }, [isIndicatorClicked]);

  function lableIndicator() {
    const updatedIsIndicatorClicked = !isIndicatorClicked;
    localStorage.setItem(
      "isIndicatorClicked",
      String(updatedIsIndicatorClicked)
    );
    setIsIndicatorClicked(updatedIsIndicatorClicked);
  }

  return (
    <>
      <TopNav />
      <div className="unpaid-list-container">
        <div className="unpaid-list">
          <h3 className="indicator" onClick={lableIndicator}>
            Due Dates: ({isIndicatorClicked ? "Ongoing" : "Past"})
          </h3>
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
