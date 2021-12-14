import React from "react";
import { Routes, Route } from "react-router-dom";

import {Provider} from 'react-redux'
import {createStore, combineReducers} from 'redux'

import Homepage from './pages/Homepage';
import Signup from './pages/Signup';
import InformationProperty from './pages/InformationProperty';
import InformationLocation from './pages/InformationLocation';
import InformationTenant from './pages/InformationTenant';
import Documents from './pages/Documents';
import Finances from './pages/Finances';
import Charges from './pages/Charges';
import charges from "./reducers/charges";
import token from './reducers/token'
import resetCharges from "./reducers/resetCharges";
import depenses from "./reducers/depenses"


import './App.css';

const store = createStore(combineReducers({charges, token, resetCharges, depenses}))

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
      
  );
}

export default App;
