import React, { useRef, useState } from "react";
import TopNav from "../TopNav";
import "./AddPage.css";
import axios from "axios";
import { URL } from "../App";

const displayData = [];

export default function AddPage() {
  // access the input values
  const fullNameRef = useRef();
  const lendingTypeRef = useRef();
  const amountRef = useRef();
  const paymentMethodRef = useRef();
  const dueDateRef = useRef();
  const letterRef = useRef();
  const proofRef = useRef();
  let [isConfirmed, setIsConfirmed] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [isRequestSuccess, setIsRequestSuccess] = useState(2); //0 - success-modal, 1 - processing, 2 - moodal closed
  const [isDisabled, setIsDisabled] = useState(false);
  let [isError, setIsError] = useState(false);
  let [errorMsg, setErrorMsg] = useState("");
  let [contractRes, setContractRes] = useState({});
  let validatedLendingType, validatedPaymentMethod;

  async function handleSubmit(e) {
    e.preventDefault();

    // Get the form data from the refs
    const formData = {
      fullName: fullNameRef.current.value,
      lendingType: lendingTypeRef.current.value,
      amount: amountRef.current.value,
      paymentMethod: paymentMethodRef.current.value,
      dueDate: dueDateRef.current.value,
      letterRef: letterRef.current.files[0],
      proofRef: proofRef.current.files[0],
    };

    if (fullNameRef.current.value === "") {
      setIsError((isError = true));
      setErrorMsg("Name may be empty.");
      return;
    } else if (amountRef.current.value === "") {
      setIsError((isError = true));
      setErrorMsg("Amount may be empty.");
      return;
    } else if (!dueDateRef.current.value) {
      setIsError((isError = true));
      setErrorMsg("Due date may be empty.");
      return;
    } else if (letterRef.current.value === "") {
      setIsError((isError = true));
      setErrorMsg("Letter picture may be empty.");
      return;
    } else if (proofRef.current.value === "") {
      setIsError((isError = true));
      setErrorMsg("Proof picture may be empty.");
      return;
    }

    setErrorMsg("");
    displayData.push(formData);

    //Creating photo files
    const letterFile = letterRef.current.files[0];
    const proofFile = proofRef.current.files[0];
    const contractFullName = fullNameRef.current.value;

    //will show the confirm button
    setIsConfirmed(!isConfirmed);

    if (isAdded) {
      setIsRequestSuccess(1);
      const picturesData = new FormData();
      picturesData.append("name", contractFullName);
      picturesData.append("file1", letterFile);
      picturesData.append("file2", proofFile);

      try {
        const uploadRes = await axios.post(`${URL}/upload`, picturesData);
        const contractData = {
          username: contractFullName,
          lendingType: lendingTypeRef.current.value,
          amount: amountRef.current.value,
          payMethod: paymentMethodRef.current.value,
          dateLended: dueDateRef.current.value,
          letter: uploadRes.data.letterURL,
          proof: uploadRes.data.proofURL,
        };

        try {
          const res = await axios.post(`${URL}/contract`, contractData);
          setContractRes(res.data);
          setIsRequestSuccess(0);
        } catch (err) {
          console.log(err);
        }
      } catch (err) {
        console.log(err);
      }

      e.target.reset();
    }
  }

  //this will close the success--modal once "ok!" is clicked
  function handleSuccessModal() {
    setIsRequestSuccess(2);
    setIsConfirmed(false);
    location.reload();
  }

  function handleEdit() {
    setIsConfirmed(false);
  }

  function handleConfirmBtn() {
    setTimeout(() => {
      setIsDisabled(true);
    }, 5000);
  }

  return (
    <div>
      <TopNav />
      <div className="addpage-container">
        <div className="addpage-container--contents">
          <div className="inputs">
            <form onSubmit={handleSubmit}>
              <div className="wrapper-1">
                <label htmlFor="name">Full Name:</label>
                <input
                  type="text"
                  id="name"
                  disabled={isConfirmed ? true : false}
                  ref={fullNameRef}
                />
                <label htmlFor="lendingtype">Lending Type:</label>
                {/* <input
                  type="text"
                  id="lendingtype"
                  disabled={isConfirmed ? true : false}
                  ref={lendingTypeRef}
                /> */}
                <select
                  name="lending-type"
                  id="lendingtype"
                  disabled={isConfirmed ? true : false}
                  defaultValue="1"
                  ref={lendingTypeRef}
                >
                  <option value="1">Utang</option>
                  <option value="2">Sangla</option>
                </select>
                <label htmlFor="amount">Amount:</label>
                <input
                  type="text"
                  id="amount"
                  disabled={isConfirmed ? true : false}
                  ref={amountRef}
                />
                <label htmlFor="paymethod">Paying Method:</label>
                <select
                  name="paying-method"
                  id="paymethod"
                  disabled={isConfirmed ? true : false}
                  defaultValue="5"
                  ref={paymentMethodRef}
                >
                  <option value="1">Daily</option>
                  <option value="2">Weekly</option>
                  <option value="3">15th and 30th day of the Month</option>
                  <option value="4">10th and 25th day of the Month</option>
                  <option value="5">Buwanan</option>
                </select>
                <label htmlFor="date">Lend Date:</label>
                <input
                  type="date"
                  id="date"
                  disabled={isConfirmed ? true : false}
                  ref={dueDateRef}
                />
                <div className="error-msg">{isError && errorMsg}</div>
              </div>{" "}
              <div className="wrapper-2">
                <label htmlFor="letter">Letter:</label>
                <input
                  type="file"
                  id="letter"
                  disabled={isConfirmed ? true : false}
                  ref={letterRef}
                />
                <label htmlFor="proof">Proof:</label>
                <input
                  type="file"
                  id="proof"
                  disabled={isConfirmed ? true : false}
                  ref={proofRef}
                />
              </div>
              {isConfirmed ? (
                <div className="button-wrapper">
                  <button
                    type="submit"
                    id="form-submit--add"
                    onClick={() => setIsAdded(!isAdded)}
                    className={isConfirmed && "confirm-btn"}
                    style={{
                      cursor: isDisabled ? "not-allowed" : "pointer",
                      backgroundColor: "#09af5f",
                    }}
                    disabled={isDisabled ? true : false}
                  >
                    Confirm
                  </button>{" "}
                  {/* if this is clicked this will submit the form*/}
                  <button type="submit" id="cancel-btn" onClick={handleEdit}>
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  type="submit"
                  onClick={handleConfirmBtn}
                  id="form-submit"
                >
                  Add
                </button>
              )}
            </form>
          </div>
          <div className="final">
            <div className="wrapper-1">
              {isConfirmed && displayData.length > 0 ? (
                <>
                  <p>
                    Full Name: {displayData[displayData.length - 1].fullName}
                  </p>
                  <p>
                    Lending Type:{" "}
                    {displayData[displayData.length - 1].lendingType === "1" ? (
                      "Utang"
                    ) : displayData[displayData.length - 1].lendingType ===
                      "2" ? (
                      "Sangla"
                    ) : (
                      <></>
                    )}
                  </p>
                  <p>Amount: {displayData[displayData.length - 1].amount}</p>
                  <p>
                    Paying Method:{" "}
                    {displayData[displayData.length - 1].paymentMethod ===
                    "1" ? (
                      "Daily"
                    ) : displayData[displayData.length - 1].paymentMethod ===
                      "2" ? (
                      "Weekly"
                    ) : displayData[displayData.length - 1].paymentMethod ===
                      "3" ? (
                      "15th and 30th of the month"
                    ) : displayData[displayData.length - 1].paymentMethod ===
                      "4" ? (
                      "10th and 25th of the month"
                    ) : displayData[displayData.length - 1].paymentMethod ===
                      "5" ? (
                      "Buwanan"
                    ) : (
                      <></>
                    )}
                  </p>
                  <p>
                    Lend Date: {displayData[displayData.length - 1].dueDate}
                  </p>
                </>
              ) : (
                !isConfirmed && (
                  <>
                    <p>Full Name: </p>
                    <p>Lending Type: </p>
                    <p>Amount: </p>
                    <p>Paying Method: </p>
                    <p>Lend Date: </p>
                  </>
                )
              )}
            </div>
          </div>
        </div>
      </div>
      {isRequestSuccess === 0 ? (
        <>
          <div className="success-modal">
            <h3>Contract Successfully created!</h3>
            <p>Name: {contractRes.username}</p>
            <p>
              Lending Type: {contractRes.lendingType === 1 ? "Utang" : "Sangla"}
            </p>
            <p>Amount to Pay: P{contractRes.amountToPay}</p>
            <p>
              Paying Method:{" "}
              {contractRes.payMethod === 1
                ? "Daily"
                : contractRes.payMethod === 2
                ? "Weekly"
                : contractRes.payMethod === 3
                ? "15th and 30th of the month"
                : contractRes.payMethod === 4
                ? "10th and 25th of the month"
                : "Buwanan"}
            </p>
            <p>
              Expected Date of Completion: {contractRes.finalDate.slice(0, 10)}
            </p>
            <p>Thank You!</p>
            <button id="success--add" onClick={handleSuccessModal}>
              OK!
            </button>
          </div>
          <div className="overlay"></div>
        </>
      ) : isRequestSuccess === 1 ? (
        <>
          <div className="success-modal">
            <h3>Processing</h3>
          </div>
          <div className="overlay"></div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
