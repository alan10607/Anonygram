import React, { Component } from 'react';
import { connect } from 'react-redux';
import Bar from './Bar'
import { findIdSet } from '../../redux/actions/idSet';
import { findPost } from '../../redux/actions/post';

class Art extends Component{

  go = () => {
    const {idSet} = this.props;

      const data = {
        idSet : idSet.slice(0, 0 + 10)
      };
      this.props.findPost(data);
    
  }
  

  componentDidMount(){
    this.props.findIdSet();
  }
  
  render(){
    const {idSet} = this.props;
    return (
      <div>
        {idSet.map(x => <div key={x}>{x}</div>)}
        <Bar/>
        <button onClick={this.go}>gogo</button>
        {/* <ContMain/>
        <Cont/>
        <Move/>
        <Reply/> */}
      </div>
    );
  }
}

export default connect(
  state => ({
    idSet : state.idSet
  }), {
    findIdSet,
    findPost
  }
)(Art);