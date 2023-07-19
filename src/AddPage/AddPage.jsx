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

    //Creating photo files
    const letterFile = letterRef.current.files[0];
    const proofFile = proofRef.current.files[0];

    displayData.push(formData);

    setIsConfirmed(!isConfirmed);

    if (isAdded) {
      const letterData = new FormData();
      letterData.append("file", letterFile);

      const proofData = new FormData();
      proofData.append("file", proofFile);

      const letterPath = await axios
        .post(`http://localhost:8080/api/upload`, letterData)
        .then(console.log("letter"));

      const proofPath = await axios
        .post(`http://localhost:8080/api/upload`, proofData)
        .then(console.log("letter"));

      const contractData = {
        username: fullNameRef.current.value,
        lendingType: lendingTypeRef.current.value,
        amount: amountRef.current.value,
        payMethod: paymentMethodRef.current.value,
        letter: letterPath.data.DownloadURL,
        proof: proofPath.data.DownloadURL,
      };

      await axios.post(`http://localhost:8080/api/contract`, contractData);

      console.log("formData/your data is added to our database! ;)");
      e.target.reset();
    }
  }

  function handleEdit() {
    setIsConfirmed((isConfirmed = false));
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
                  onClick={handleEdit}
                  ref={fullNameRef}
                />
                <label htmlFor="lendingtype">Lending Type:</label>
                <input
                  type="text"
                  id="lendingtype"
                  onClick={handleEdit}
                  ref={lendingTypeRef}
                />
                <label htmlFor="amount">Amount:</label>
                <input
                  type="text"
                  id="amount"
                  onClick={handleEdit}
                  ref={amountRef}
                />
                <label htmlFor="paymethod">Paying Method:</label>
                <input
                  type="text"
                  id="paymethod"
                  onClick={handleEdit}
                  ref={paymentMethodRef}
                />
                <label htmlFor="date">Due Date:</label>
                <input
                  type="date"
                  id="date"
                  onClick={handleEdit}
                  ref={dueDateRef}
                />
              </div>
              <div className="wrapper-2">
                <label htmlFor="letter">Letter:</label>
                <input
                  type="file"
                  id="letter"
                  onClick={handleEdit}
                  ref={letterRef}
                />
                <label htmlFor="proof">Proof:</label>
                <input
                  type="file"
                  id="proof"
                  onClick={handleEdit}
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
