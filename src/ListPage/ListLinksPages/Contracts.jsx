import { useRef, useEffect, useState } from "react";
import TopNav from "../../TopNav";
import "./Contracts.css";
// import "./Unpaid.css"
import axios from "axios";
import ContractInfo from "./ContractInfo/ContractInfo";
import { URL } from "../../App";

export default function DueDates() {
  const [contracts, setContracts] = useState([]);
  const [contractIndicator, setContractIndicator] = useState(0);

  const fetchContracts = async () => {
    try {
      const response = await axios.get(
        `${URL}/contract/status/${contractIndicator}`
      );
      const sortedContracts = response.data.sort(
        (a, b) => new Date(a.dateLended) - new Date(b.dateLended)
      );
      setContracts(sortedContracts);
    } catch (error) {
      console.error("Error fetching contracts:", error);
    }
  };

  useEffect(() => {
    fetchContracts();
  }, [contractIndicator]);

  function handleContractIndicator() {
    setContractIndicator((contractIndicator + 1) % 3);
  }

  const width = window.innerWidth;

  return (
    <>
      <TopNav />
      <div className="unpaid-list-container">
        <div className="unpaid-list">
          <h3
            className="indicator --contract"
            onClick={handleContractIndicator}
          >
            {contractIndicator === 0
              ? "Ongoing Contracts"
              : contractIndicator === 1
              ? "Completed Contracts"
              : "Not Completed Contracts"}
          </h3>
          {width > 1080 && (
            <div className="headings">
              <p>Name</p>
              <p>Amount Lended</p>
              <p>Amount to Pay</p>
              <p>Amount Paid</p>
              <p>Date Lended</p>
              <p>Paying Method</p>
              <p>Lend Status</p>
              <p>More Details</p>
            </div>
          )}

          <div className="lists-container">
            {contracts.length === 0 ? (
              <div>
                <p style={{ fontWeight: "bold" }}>
                  It seems that there's nothing here
                </p>
              </div>
            ) : (
              contracts.map((el) => (
                <div className="lists" key={el._id}>
                  <p>
                    {width < 1080 && "Name: "}
                    {el.username}
                  </p>
                  <p>
                    {width < 1080 && "Amount Lended: "}
                    {el.amount}
                  </p>
                  <p>
                    {width < 1080 && "Amount to Pay: "}
                    {el.amountToPay}
                  </p>
                  <p>
                    {width < 1080 && "Amount Paid: "}
                    {el.totalPaid}
                  </p>
                  <p>
                    {width < 1080 && "Date Lended: "}
                    {el.dateLended.slice(0, 10)}
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
                    {width < 1080 && "Lend Status: "}
                    {el.status === 0
                      ? "Ongoing"
                      : el.status === 1
                      ? "Completed"
                      : "NOT Completed"}
                  </p>

                  <ContractInfo
                    name={el.username}
                    amountLended={el.amount}
                    amountToPay={el.amountToPay}
                    amountPaid={el.totalPaid}
                    dateLended={el.dateLended.slice(0, 10)}
                    dateToPay={el.finalDate.slice(0, 10)}
                    lendingType={el.lendingType}
                    payMethod={el.payMethod}
                    status={el.status}
                    id={el._id}
                    letter={el.letter}
                    proof={el.proof}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
