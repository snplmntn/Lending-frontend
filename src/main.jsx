import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import AddPage from './AddPage/AddPage.jsx';
import Home from './Home.jsx';
import Lists from './ListPage/Lists.jsx';
import Contracts from './ListPage/ListLinksPages/Contracts.jsx';
import DueDates from './ListPage/ListLinksPages/DueDates.jsx';
import Unpaid from './ListPage/ListLinksPages/Unpaid.jsx';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <Router>
    <Routes>
      <Route path="/" element={<App/>}></Route>
      <Route path="/Home" element={<Home/>}></Route>
      <Route path="/List" element={<Lists/>}></Route>
      <Route path="/AddPage" element={<AddPage/>}></Route>
      <Route path="/Contracts" element={<Contracts/>}></Route>
      <Route path="/Unpaid" element={<Unpaid/>}></Route>
      <Route path="/DueDates" element={<DueDates/>}></Route>
    </Routes>
  </Router>
)
