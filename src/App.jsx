import React from 'react';
import { Routes, Route } from "react-router-dom";
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
        {/* <Route exact path="/" component={Login} /> */}
        <Route path='/login' element={<Login />} />
        <Route path='/hub' element={<Hub />} />
         {/*
        <Route exact path="/register" component={Register} />
        <Route exact path="/hub" component={Hub} />
        <Route exact path="/error" component={Error} />
        <Redirect to={"/error"} /> */}
      </Routes>
      <Console />
    </div>
  );
}