import { useState } from "react";
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
  const [Paid, setPaid] = useState(statusPlaceholder);

  function handleOpen() {
    setModalOpen(!isModalOpen);
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
            <button className="pink" onClick={handlePay}>
              PAID
            </button>
            <button>CHANGE DATE</button>
          </div>
          <div className="overlay"></div>
        </>
      )}
      <button className="add-btn" onClick={handleOpen} disabled={status === 1}>
        {status === 0 ? "..." : status === 1 ? "✔" : "❌"}
      </button>
      {/* {console.log(status)} */}
    </>
  );
}
