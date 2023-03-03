import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeConsole } from '../../redux/actions/console';

class Console extends Component {

  componentDidUpdate() {
    const {str, needReload} = this.props;

    if(needReload) {
      window.location.reload(true);//監測有無需要跳轉
    }
    if(str) {
      setTimeout(() => this.props.closeConsole(), 3000);
    }
  }

  render() {
    const {str} = this.props;
    
    return (
      <div>{str}</div>
    )
  }
}

export default connect(
  state => ({
    str : state.console.str,
    needReload : state.console.needReload,
  }), {
    closeConsole
  }
)(Console);
