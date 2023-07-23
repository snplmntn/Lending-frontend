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
  let [isError, setIsError] = useState(false);
  let [errorMsg, setErrorMsg] = useState("");
  let validatedLendingType, validatedPaymentMethod;

  async function handleSubmit(e) {
    e.preventDefault();

    console.log(dueDateRef.current.value);
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
    } else if (lendingTypeRef.current.value === "") {
      setIsError((isError = true));
      setErrorMsg("Lending may be empty.");
      return;
    } else if (amountRef.current.value === "") {
      setIsError((isError = true));
      setErrorMsg("Amount may be empty.");
      return;
    } else if (paymentMethodRef.current.value === "") {
      setIsError((isError = true));
      setErrorMsg("Paying method may be empty.");
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

    if (lendingTypeRef.current.value.toUpperCase() === "UTANG") {
      validatedLendingType = 1;
    } else if (lendingTypeRef.current.value.toUpperCase() === "SANGLA") {
      validatedLendingType = 2;
    } else if (
      lendingTypeRef.current.value === "1" ||
      lendingTypeRef.current.value === "2"
    ) {
      validatedLendingType = lendingTypeRef.current.value;
    } else {
      setIsError((isError = true));
      setErrorMsg('Lending Type must be either "Utang" or "SANGLA".');
      return;
    }

    if (
      paymentMethodRef.current.value.toUpperCase() === "DAILY" ||
      paymentMethodRef.current.value.toUpperCase() === "ARAWAN"
    ) {
      validatedPaymentMethod = 1;
    } else if (
      paymentMethodRef.current.value.toUpperCase() === "WEEKLY" ||
      paymentMethodRef.current.value.toUpperCase() === "LINGGUHAN" ||
      paymentMethodRef.current.value.toUpperCase() === "LINGGOHAN"
    ) {
      validatedPaymentMethod = 2;
    } else if (
      paymentMethodRef.current.value === "15 30" ||
      paymentMethodRef.current.value.toUpperCase() === "KINSENAS KATAPUSAN"
    ) {
      validatedPaymentMethod = 3;
    } else if (paymentMethodRef.current.value === "10 25") {
      validatedPaymentMethod = 4;
    } else if (paymentMethodRef.current.value.toUpperCase() === "MONTHLY") {
      validatedPaymentMethod = 5;
    } else if (
      paymentMethodRef.current.value === "1" ||
      paymentMethodRef.current.value === "2" ||
      paymentMethodRef.current.value === "3" ||
      paymentMethodRef.current.value === "4" ||
      paymentMethodRef.current.value === "5"
    ) {
      validatedPaymentMethod = paymentMethodRef.current.value;
    } else {
      setIsError((isError = true));
      setErrorMsg(
        'Payment Method must either be "Daily", "Weekly", "15 30", "10 25", "MONTHLY".'
      );
      return;
    }

    // console.log(displayData[displayData.length - 1].paymentMethod)
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
      const letterData = new FormData();
      letterData.append("file", letterFile);
      letterData.append("name", contractFullName);

      const proofData = new FormData();
      proofData.append("file", proofFile);
      proofData.append("name", contractFullName);

      const letterPath = await axios.post(`${URL}/upload`, letterData);

      const proofPath = await axios.post(`${URL}/upload`, proofData);

      const contractData = {
        username: fullNameRef.current.value,
        lendingType: validatedLendingType,
        amount: amountRef.current.value,
        payMethod: validatedPaymentMethod,
        dateLended: dueDateRef.current.value,
        letter: letterPath.data.DownloadURL,
        proof: proofPath.data.DownloadURL,
      };
      setIsRequestSuccess(0);
      await axios.post(`${URL}/contract`, contractData); //nag eerror tong part na to sakin

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
    setTimeout(() => {handleEdit()}, 5000)
  }
  // const changeErrorMessage = () => {
  //   setErrorMsg(errorMsg.current.value);
  // };

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
                <input
                  type="text"
                  id="lendingtype"
                  disabled={isConfirmed ? true : false}
                  ref={lendingTypeRef}
                />
                <label htmlFor="amount">Amount:</label>
                <input
                  type="text"
                  id="amount"
                  disabled={isConfirmed ? true : false}
                  ref={amountRef}
                />
                <label htmlFor="paymethod">Paying Method:</label>
                <input
                  type="text"
                  id="paymethod"
                  disabled={isConfirmed ? true : false}
                  ref={paymentMethodRef}
                />
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
                  >
                    Confirm
                  </button>{" "}
                  {/* if this is clicked this will submit the form*/}
                  <button type="submit" id="cancel-btn" onClick={handleEdit}>
                    Cancel
                  </button>
                </div>
              ) : (
                <button type="submit" onClick={handleConfirmBtn} id="form-submit">
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
            <p>Name: {displayData[displayData.length - 1].fullName}</p>
            <p>
              Lending Type:{" "}
              {displayData[displayData.length - 1].lendingType === 1
                ? "Utang"
                : "Sangla"}
            </p>
            <p>Amount to Pay: P{displayData[displayData.length - 1].amount}</p>
            <p>
              Paying Method:{" "}
              {displayData[displayData.length - 1].paymentMethod === "1" ||
              displayData[displayData.length - 1].paymentMethod === 1
                ? "Daily"
                : displayData[displayData.length - 1].paymentMethod === "2" ||
                  displayData[displayData.length - 1].paymentMethod === 2
                ? "Weekly"
                : displayData[displayData.length - 1].paymentMethod === "3" ||
                  displayData[displayData.length - 1].paymentMethod === 3
                ? "15th and 30th of the month"
                : displayData[displayData.length - 1].paymentMethod === "4" ||
                  displayData[displayData.length - 1].paymentMethod === 4
                ? "10th and 25th of the month"
                : "Buwanan"}
            </p>
            <p>Lend Date: {displayData[displayData.length - 1].dueDate}</p>
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
