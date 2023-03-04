import React, { Component } from 'react'
import './index.css';

export default class Cont extends Component {
  render() {
    const {openStr, findTopCont} = this.props;
    return (
      <div className="move">
        <p className="open" onClick={findTopCont}>{openStr}</p>
        <p className="reply disable" onClick="openReplyBox(this);">新增留言</p>
      </div>
    )
  }
}
