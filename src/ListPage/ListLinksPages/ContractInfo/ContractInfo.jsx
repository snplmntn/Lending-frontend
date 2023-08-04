import { useState } from "react";
import "./ContractInfo.css";
export default function ContractInfo({
  name,
  amountLended,
  amountToPay,
  amountPaid,
  dateLended,
  dateToPay,
  lendingType,
  payMethod,
  status,
  id,
  letter,
  proof,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLetterClicked, setIsLetterClicked] = useState(false);
  const [isProofClicked, setIsProofClicked] = useState(false);
  function handleOpenModalInfo() {
    setIsModalOpen(!isModalOpen);
  }

  const width = window.innerWidth;

  return (
    <>
      {isModalOpen && (
        <>
          <div id="contract-infos" key={id}>
            <input
              type="button"
              className="btn-close"
              value="&times;"
              onClick={handleOpenModalInfo}
            />
            <div className="text-infos">
              <p>Full Name: {name}</p>
              <p>Amount Lended: {amountLended}</p>
              <p>Amount to Pay: {amountToPay}</p>
              <p>Amount Paid: P{amountPaid}</p>
              <p>Date Lended: {dateLended}</p>
              <p>Date of Completion: {dateToPay}</p>
              <p>
                Lending Type:{" "}
                {lendingType === 1 ? (
                  "Utang"
                ) : lendingType === 2 ? (
                  "Sangla"
                ) : (
                  <></>
                )}
              </p>
              <p>
                Paying Method:{" "}
                {payMethod === 1 ? (
                  "Daily"
                ) : payMethod === 2 ? (
                  "Weekly"
                ) : payMethod === 3 ? (
                  "15th and 30th of the month"
                ) : payMethod === 4 ? (
                  "10th and 25th of the month"
                ) : payMethod === 5 ? (
                  "Buwanan"
                ) : (
                  <></>
                )}
              </p>
              <p>
                Lend Status:{" "}
                {status === 0
                  ? "Ongoing"
                  : status === 1
                  ? "Completed"
                  : "NOT Completed"}
              </p>
            </div>
            <div className="photo-infos">
              <div className="photo-wrapper">
                <p>Letter:</p>
                <div
                  className={isLetterClicked ? "image-clicked" : "letter"}
                  style={{
                    backgroundImage: `url(${letter})`,
                    backgroundPosition: "center",
                  }}
                  onClick={() => {
                    setIsLetterClicked(!isLetterClicked);
                  }}
                ></div>
              </div>
              <div className="photo-wrapper">
                <p>Proof:</p>
                <div
                  className={isProofClicked ? "image-clicked" : "proof"}
                  style={{
                    backgroundImage: `url(${proof})`,
                    backgroundPosition: "center",
                  }}
                  onClick={() => {
                    setIsProofClicked(!isProofClicked);
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div className="overlay" onClick={handleOpenModalInfo}></div>
        </>
      )}
      {width < 1080 ? (
        <p>
          More Info:
          <button className="info-btn" onClick={handleOpenModalInfo}>
            ...
          </button>
        </p>
      ) : (
        <button className="info-btn" onClick={handleOpenModalInfo}>
          ...
        </button>
      )}
    </>
  );
}
