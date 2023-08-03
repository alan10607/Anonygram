import { Routes, Route, Navigate } from "react-router-dom";
import Main from './components/Main';
import Login from './components/Login';
import Register from './components/Register';
import Error from './components/Error'
import Console from './components/Console';
import './App.scss';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/forum' element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/error' element={<Error />} />
        <Route path='*' element={<Navigate to='/login' />} />
      </Routes>
      <Console />
    </div>
  );
}