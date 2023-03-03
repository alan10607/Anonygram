import React, { Component } from 'react';
import Art from './components/Art';
import Console from './components/Console';
import './App.css';

export default class App extends Component{
  render(){
    return (
      <div>
        <Art/>
        <Console/>
      </div>
    );
  }
}