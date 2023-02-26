import React, {Component} from 'react';
import ReactDOM from 'react-dom/client';
import Bar from './Bar'
import './index.css';

export default class App extends Component{
  render(){
    return (
      <div>
          <Bar/>
          {/* <ContMain/>
          <Cont/>
          <Move/>
          <Reply/> */}
      </div>
    );
  }
}