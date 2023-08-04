import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext.jsx";
import Home from "./Home.jsx";
import Login from "./LoginPage/Login.jsx";
import AddPage from "./AddPage/AddPage.jsx";
import Contracts from "./ListPage/ListLinksPages/Contracts.jsx";
import DueDates from "./ListPage/ListLinksPages/DueDates.jsx";
import Unpaid from "./ListPage/ListLinksPages/Unpaid.jsx";

export const URL = import.meta.env.VITE_SERVER_URL;

function App() {
  const { user, dispatch } = useContext(AuthContext);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    // Check for user data in localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      dispatch({ type: "LOGIN_SUCCESS", payload: storedUser });
    }

    setIsCheckingAuth(false);
  }, [dispatch]);

  if (isCheckingAuth) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Login />} />
        <Route
          path="/login"
          element={user ? <Navigate replace to="/" /> : <Login />}
        />
        <Route
          path="/Home"
          element={user ? <Home /> : <Navigate replace to="/" />}
        />
        <Route
          path="/AddPage"
          element={user ? <AddPage /> : <Navigate replace to="/" />}
        />
        <Route
          path="/Contracts"
          element={user ? <Contracts /> : <Navigate replace to="/" />}
        />
        <Route
          path="/Unpaid"
          element={user ? <Unpaid /> : <Navigate replace to="/" />}
        />
        <Route
          path="/DueDates"
          element={user ? <DueDates /> : <Navigate replace to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
