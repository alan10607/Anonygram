import React, {Component} from 'react';
import ReactDOM from 'react-dom/client';
import postApi from '../../../postApi';
import './index.css';

export default class Bar extends Component{
  state = {w : "NO"};
  
  test = () => {
    let a = (e) => this.setState({w : JSON.stringify(e)});
    postApi("findIdSet", {}, a, a);
    postApi("findPost", {

      "idList": [
    "2aca4b14-8986-41f9-94b0-2779118ed145","bc3d06cf-6119-49fe-9471-04d8136bb8f3"
      ]
    }, a, a);
  }

  render(){
    const {w} = this.state;
    return (
      // post();
      <div>
          <h5 onClick={this.test}>{w}</h5>

          Bar
      </div>
    );
  }
}