import TopNav from "./TopNav.jsx";
import Home from "./Home.jsx";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <TopNav />
      <Home />
    </div>
  );
}

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route exact path="/" element={[<TopNav />, <Home />]} />
//       </Routes>
//     </Router>
//   );
// }

export default App;
