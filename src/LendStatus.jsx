import { useRef, useState } from "react";

import "./LendStatus.css";
import axios from "axios";

export default function LendStatus({
  id,
  name,
  amount,
  status,
  statusPlaceholder,
}) {
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

    const data = {
      status: 1,
    };

    await axios
      .put(`http://localhost:8080/api/dueDates/${id}`, data)
      .then(location.reload());
  };

  const handleChangeDate = async () => {
    handleOpen();

    const newDueDate = new Date(selectedDateRef.current.value)
      .toISOString()
      .slice(0, 10);

    const data = {
      dueDate: newDueDate,
    };

    await axios
      .put(`http://localhost:8080/api/dueDates/${id}`, data)
      .then(location.reload());
  };

  const handleReceiveAmount = () => {
    let inputAmount = parseInt(amtRef.current.value);
    console.log(inputAmount);
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
                <button className="pink" onClick={handleChangeDate}>
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
      {console.log(status)}
    </>
  );
}
