import React from "react";
import { Routes, Route } from "react-router-dom";

import Homepage from './pages/Homepage';
import Signup from './pages/Signup';
import InformationProperty from './pages/InformationProperty';
import InformationLocation from './pages/InformationLocation';
import InformationTenant from './pages/InformationTenant';
import Documents from './pages/Documents';
import Finances from './pages/Finances';
import Charges from './pages/Charges';


import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="signup" element={<Signup />} />
        <Route path="information-property" element={<InformationProperty />} />
        <Route path="information-location" element={<InformationLocation />} />
        <Route path="information-tenant" element={<InformationTenant />} />
        <Route path="documents" element={<Documents />} />
        <Route path="finances" element={<Finances />} />
        <Route path="charges" element={<Charges />} />
      </Routes>    
    </>
  );
}

export default App;
