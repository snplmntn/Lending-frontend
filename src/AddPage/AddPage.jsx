import React, { useRef, useState } from "react";
import TopNav from "../TopNav";
import "./AddPage.css";
import axios from "axios";

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

  let [isError, setIsError] = useState(false);
  let [errorMsg, setErrorMsg] = useState("");
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

    setErrorMsg("");
    displayData.push(formData);

    //Creating photo files
    const letterFile = letterRef.current.files[0];
    const proofFile = proofRef.current.files[0];
    const contractFullName = fullNameRef.current.value;

    displayData.push(formData);

    setIsConfirmed(!isConfirmed);

    if (isAdded) {
      const letterData = new FormData();
      letterData.append("file", letterFile);
      letterData.append("name", contractFullName);

      const proofData = new FormData();
      proofData.append("file", proofFile);
      proofData.append("name", contractFullName);

      const letterPath = await axios.post(
        `http://localhost:8080/api/upload`,
        letterData
      );

      const proofPath = await axios.post(
        `http://localhost:8080/api/upload`,
        proofData
      );

      const contractData = {
        username: fullNameRef.current.value,
        lendingType: validatedLendingType,
        amount: amountRef.current.value,
        payMethod: validatedPaymentMethod,
        letter: letterPath.data.DownloadURL,
        proof: proofPath.data.DownloadURL,
      };

      console.log(contractData.payMethod, contractData.lendingType);

      await axios.post(`http://localhost:8080/api/contract`, contractData);

      console.log("formData/your data is added to our database! ;)");
      e.target.reset();
    }
  }

  function handleEdit() {
    setIsConfirmed((isConfirmed = false));
  }

  const changeErrorMessage = () => {
    setErrorMsg(errorMsg.current.value);
  };

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
                  onSubmit={handleEdit}
                  ref={fullNameRef}
                />
                <label htmlFor="lendingtype">Lending Type:</label>
                <input
                  type="text"
                  id="lendingtype"
                  onSubmit={handleEdit}
                  ref={lendingTypeRef}
                />
                <label htmlFor="amount">Amount:</label>
                <input
                  type="text"
                  id="amount"
                  onSubmit={handleEdit}
                  ref={amountRef}
                />
                <label htmlFor="paymethod">Paying Method:</label>
                <input
                  type="text"
                  id="paymethod"
                  onSubmit={handleEdit}
                  ref={paymentMethodRef}
                />
                <label htmlFor="date">Due Date:</label>
                <input
                  type="date"
                  id="date"
                  onSubmit={handleEdit}
                  ref={dueDateRef}
                />
                <div className="error-msg">{isError && errorMsg}</div>
              </div>{" "}
              <div className="wrapper-2">
                <label htmlFor="letter">Letter:</label>
                <input
                  type="file"
                  id="letter"
                  onSubmit={handleEdit}
                  ref={letterRef}
                />
                <label htmlFor="proof">Proof:</label>
                <input
                  type="file"
                  id="proof"
                  onSubmit={handleEdit}
                  ref={proofRef}
                />
              </div>
              {isConfirmed ? (
                <button
                  type="submit"
                  id="form-submit--add"
                  onClick={() => setIsAdded(!isAdded)}
                >
                  Confirm
                </button>
              ) : (
                <button type="submit" id="form-submit">
                  Add
                </button>
              )}
            </form>
          </div>
          <div className="final">
            <div className="wrapper-1">
              {isConfirmed || displayData.length > 0 ? (
                <>
                  <p>
                    Full Name: {displayData[displayData.length - 1].fullName}
                  </p>
                  <p>
                    Lending Type:{" "}
                    {displayData[displayData.length - 1].lendingType}
                  </p>
                  <p>Amount: {displayData[displayData.length - 1].amount}</p>
                  <p>
                    Paying Method:{" "}
                    {displayData[displayData.length - 1].paymentMethod}
                  </p>
                  <p>Due Date: {displayData[displayData.length - 1].dueDate}</p>
                </>
              ) : (
                <>
                  <p>Full Name: </p>
                  <p>Lending Type: </p>
                  <p>Amount: </p>
                  <p>Paying Method: </p>
                  <p>Due Date: </p>
                </>
              )}
            </div>
            <div className="wrapper-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
