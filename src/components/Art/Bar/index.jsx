import React, { Component } from 'react'
import { ICON_USER } from '../../../constant';
import './index.css';

export default class Bar extends Component {
  render() {
    const {authorName} = this.props;
    return (
      <div className="bar">
        <img className="bar-head" src={ICON_USER}/>
        <span className="author">{authorName}</span>
      </div>
    )
  }
}
