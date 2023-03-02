import React, {Component} from 'react';
import ReactDOM from 'react-dom/client';
import Bar from './Bar'
import Cmn from '../../cmn';
import postApi from '../../postApi';
import './index.css';

export default class App extends Component{
  state = {
    idList : []
  };

  findIdSetAfter = (returnList) => {
    this.setState({idList : returnList})
    console.log("idList size=" + returnList.length);
  }
  
  findIdSetError(e){
    Cmn.showConsoleBox("看起來泡麵打翻機台了, 請稍後再進來試試");
  }

  componentDidMount() {
    postApi("findIdSet", {}, this.findIdSetAfter, this.findIdSetError);
  }

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