import { useRef, useEffect, useState } from "react";
import TopNav from "../../TopNav";
import "./Contracts.css";
import axios from "axios";
import LendStatus from "../../LendStatus";
import { URL } from "../../App";

export default function DueDates() {
  const [contracts, setContracts] = useState([]);
  const status = useRef();
  //1 Ongoing
  //2 Completed
  //3 NOT Completed

  //Getting Ongoing Due Dates
  // useEffect(() => {
  //   const fetchContracts = async () => {
  //     await axios.get(`${URL}/contract/status/${status.current.value}`).then((contracts) => {
  //       // Sort the contracts array by dateLended in ascending order
  //       const sortedContracts = contracts.data.sort(
  //         (a, b) => new Date(a.dateLended) - new Date(b.dateLended)
  //       );
  //       setContracts(sortedContracts);
  //     });
  //   };
  //   fetchContracts();
  // }, []);

  //Testing
  useEffect(() => {
    const fetchContracts = async () => {
      await axios.get(`${URL}/contract/status/1`).then((contracts) => {
        // Sort the contracts array by dateLended in ascending order
        const sortedContracts = contracts.data.sort(
          (a, b) => new Date(a.dateLended) - new Date(b.dateLended)
        );
        setContracts(sortedContracts);
      });
    };
    fetchContracts();
  }, []);

  return (
    <>
      <TopNav />
      <div className="unpaid-list-container">
        <div className="unpaid-list">
          <div className="headings">
            <p>Name</p>
            <p>Amount Lended</p>
            <p>Amount to Pay</p>
            <p>Date Lended</p>
            <p>Lending Type</p>
            <p>Paying Method</p>
            <p>Lend Status</p>
            <p>More Details</p>
          </div>
          {contracts.length === 0 ? (
            <div>
              <p style={{ fontWeight: "bold" }}>
                It seems that there's nothing here
              </p>
            </div>
          ) : (
            contracts.map((el) => (
              <div className="lists">
                <p>{el.username}</p>
                <p>{el.amount}</p>
                <p>{el.amountToPay}</p>
                <p>{el.dateLended.slice(0, 10)}</p>
                <p>{el.lendingType === 1 ? "Utang" : "Sangla"}</p>
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
                  {el.status === 1
                    ? "Ongoing"
                    : el.payMethod === 2
                    ? "Completed"
                    : "NOT Completed"}
                </p>
                <p>...</p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
