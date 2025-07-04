import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import NoticeGenerator from "./components/NoticeGenerator";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <NoticeGenerator />
    </>
  );
}

export default App;
