import "./Add.css";

export default function Add() {
  function handleAdd() {
    return (
      <>
        <div className="add-person">
          <div className="person-info">
            <p>Sean</p>
            <p>Amount to be paid:</p>
            <p>$2000</p>
          </div>
          <button className="pink">PAID</button>
          <button>CHANGE DATE</button>
        </div>
        <div className="overlay"></div>
      </>
    );
  }

  return (
    <>
      <p onClick={handleAdd()}>Add</p>
    </>
  );
}
