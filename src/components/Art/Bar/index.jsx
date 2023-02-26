import React, {Component} from 'react';
import ReactDOM from 'react-dom/client';
import Axios from 'axios';
import './index.css';

export default class Bar extends Component{
  post = (url, data, afterFunc, errorFunc) => {
    return new Promise((resolve, reject) => {
      axios.post(url, data)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  }

  render(){
    return (
      // post();
      <div>
          Bar
      </div>
    );
  }
}