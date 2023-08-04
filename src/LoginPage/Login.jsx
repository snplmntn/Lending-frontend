import "./Login.css";
import { useContext, useEffect, useRef } from "react";
import axios from "axios";
import { URL } from "../App";
import { AuthContext } from "../context/AuthContext";
import { useState } from "react";

const loginCall = async (userCredentials, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post(`${URL}/auth/login`, userCredentials);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    localStorage.setItem("user", JSON.stringify(res.data));
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};

const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  const emailRef = useRef();
  const passRef = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  const [errorMsg, setErrorMsg] = useState();

  function handleLogin(e) {
    e.preventDefault();

    setErrorMsg("");

    if (emailRef.current.value == "") {
      setErrorMsg("Please enter an email");
      return;
    } else if (!emailValidator.test(emailRef.current.value)) {
      return;
    }

    if (passRef.current.value === "") {
      setErrorMsg("Enter a password");
      return;
    }

    loginCall(
      { email: emailRef.current.value, password: passRef.current.value },
      dispatch
    );
  }

  //validator

  return (
    <div className="login-page-container">
      <div className="login-container">
        <h2>LOGIN</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <label htmlFor="username">Email</label>
          <input ref={emailRef} type="email" id="username" />
          <label htmlFor="pass">Password</label>
          <input ref={passRef} type="password" minLength={"6"} id="pass" />
          <p className="error-msg">{errorMsg}</p>
          <button className="login-btn" disabled={isFetching}>
            {isFetching ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
