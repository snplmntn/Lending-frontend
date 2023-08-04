import { useContext, useRef, useState } from "react";

import "./LendStatus.css";
import axios from "axios";
import { URL } from "./App";
import { AuthContext } from "./context/AuthContext";

export default function LendStatus({
  contractId,
  id,
  name,
  amount,
  status,
  statusPlaceholder,
}) {
  const user = useContext(AuthContext);

  const [isModalOpen, setModalOpen] = useState(false);
  let [isHidden, setIsHidden] = useState(true);
  let [isEqual, setIsEqual] = useState(false);
  const [Paid, setPaid] = useState(statusPlaceholder);

  const amtRef = useRef();
  const selectedDateRef = useRef();

  function handleOpen() {
    setModalOpen(!isModalOpen);
    setIsHidden((isHidden = true));
  }

  const handlePay = async () => {
    handleOpen();

    const contract = await axios.get(`${URL}/contract/${contractId}`);
    const currentTotalPaid = contract.data.totalPaid + amount;

    const dueDateData = {
      status: 1,
      changedToPaidBy: user.user.username,
    };

    const contractData = {
      totalPaid: currentTotalPaid,
    };

    try {
      await axios.put(`${URL}/contract/${contractId}`, contractData);
      try {
        await axios.put(`${URL}/dueDates/${id}`, dueDateData);
        location.reload();
      } catch (err) {
        console.error(err);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChangeDate = async () => {
    handleOpen();

    const newDueDate = new Date(selectedDateRef.current.value)
      .toISOString()
      .slice(0, 10);

    const data = {
      dueDate: newDueDate,
    };

    try {
      await axios.put(`${URL}/dueDates/${id}`, data);
      location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const handleReceiveAmount = () => {
    let inputAmount = Number(amtRef.current.value);
    if (amount === inputAmount) {
      setIsEqual(true);
    } else {
      setIsEqual(false);
    }
  };

  return (
    <>
      {/* <div></div> */}
      {isModalOpen && (
        <>
          <div className="add-person">
            <input
              type="button"
              className="btn-close"
              value="&times;"
              onClick={handleOpen}
            />
            <div className="person-info">
              <p>{name}</p>
              <p>Amount to be paid:</p>
              <span>P</span>
              <span>{amount}</span>
            </div>
            <input
              type="text"
              className="input-payment"
              ref={amtRef}
              onChange={handleReceiveAmount}
              placeholder="Enter amount"
            />
            {isEqual ? (
              <button className="pink" onClick={handlePay}>
                PAID
              </button>
            ) : (
              <button
                className="pink"
                style={{
                  cursor: "not-allowed",
                  backgroundColor: "rgba(54, 69, 79, 0.5)",
                }}
              >
                PAID
              </button>
            )}

            <button
              onClick={() => {
                setIsHidden(!isHidden);
              }}
            >
              CHANGE DATE
            </button>
            {isHidden ? (
              <></>
            ) : (
              <>
                <input
                  type="date"
                  className="input-date"
                  ref={selectedDateRef}
                />
                <button
                  className="pink"
                  style={{ fontSize: "11px", color: "black" }}
                  onClick={handleChangeDate}
                >
                  SUBMIT CHANGE DATE
                </button>
              </>
            )}
          </div>
          <div className="overlay"></div>
        </>
      )}
      <button className="add-btn" onClick={handleOpen} disabled={status === 1}>
        {status === 0 ? "..." : status === 1 ? "✔" : "❌"}
      </button>
    </>
  );
}
