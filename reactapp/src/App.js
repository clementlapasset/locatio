import React from "react";
import Documents from './pages/Documents';
import Signup from './pages/Signup';
import Homepage from './pages/Homepage';
import Charges from "./pages/Charges";
import './App.css';

function App() {
  return (
    <>
      <Homepage/>
      <Signup/>
      <Documents/>
      <Charges/>
    </>
  );
}

export default App;
