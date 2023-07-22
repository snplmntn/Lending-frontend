import "./Login.css";
import { useContext, useEffect, useRef } from "react";
import axios from "axios";
import { URL } from "../App";
import { AuthContext } from "../context/AuthContext";

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

export default function Login() {
  const emailRef = useRef();
  const passRef = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  function handleLogin(e) {
    e.preventDefault();

    if (emailRef.current.value === "") {
    }
    loginCall(
      { email: emailRef.current.value, password: passRef.current.value },
      dispatch
    );
  }

  return (
    <div className="login-page-container">
      <div className="login-container">
        <h2>LOGIN</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <label htmlFor="username">Email</label>
          <input ref={emailRef} type="email" required id="username" />
          <label htmlFor="pass">Password</label>
          <input
            ref={passRef}
            type="password"
            minLength={"6"}
            required
            id="pass"
          />
          <button className="login-btn" disabled={isFetching}>
            {isFetching ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
