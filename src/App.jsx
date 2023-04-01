import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Hub from './components/Hub';
import Login from './components/Login';
import Register from './components/Register';
import Error from './components/Error'
import Console from './components/Console';
import './App.css';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register/' element={<Register />} />
        <Route path='/hub/' element={<Hub />} />
        <Route path='/error/' element={<Error />} /> 
        {/* <Navigate to={"/error"} /> */}
      </Routes>
      <Console />
    </div>
  );
}