import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import {storage} from "./firebase/Index"
import { ToastContainer } from "react-toastify";
// import './App.css'
import Routes from "./Routes/Index";
import { useNavigate } from "react-router-dom";
function App() {
  // const navigate=useNavigate()
  const [count, setCount] = useState(0);
 

  return (
    <div>
      <ToastContainer />
      <Routes />
    </div>
  );
}

export default App;
