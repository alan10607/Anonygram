import React, { Component } from 'react';
import { connect } from 'react-redux';
import Bar from './Bar'
import ArtCont from './ArtCont';
import Move from './Move'
import { 
  findIdSet, 
  findPost, 
  findTopCont } from '../../redux/actions/post';

class Art extends Component{

  go = () => {
    const data = {
      idList : this.props.idSet.slice(0, 0 + 10)
    };
    this.props.findPost(data);
  }

  findTopCont = (id) => {
    return () => {//函数柯里化
      const data = {
        id,
        no : this.props.post.get(id).contList.length
      }
      this.props.findTopCont(data);
    }
  }
  
  createArtBox = (post) => {
    let allpost = [];
    console.log(post);
    for(let [id, a] of post) {
      if(!a) continue;//未讀取, 就跳過

      let c = a.contList[0];
      allpost.push(
        <div key={id}>
          <Bar authorName={c.authorName}/>
          <ArtCont title={a.title} word={c.word} isUserLike={c.isUserLike} likes={c.likes} createDate={c.createDate}/>
          <div className="cont-box"></div>
          <Move openStr={this.getOpenStr(a.contNum, a.contList.length)} findTopCont={this.findTopCont(id)}/>
          <div className="reply-box disable"></div>
        </div>
      );
    }

    

    return allpost;
  }

  getOpenStr = (contNum, startNo) => {
    if(contNum == 1) return "該文章尚無留言";//只有本文
    const remain = contNum - startNo;
    if(remain == 0) return "";//已展開全部留言
    if(startNo == 1) return `查看全部${contNum - startNo}則留言`;//尚未展開
    return `查看剩餘${contNum - startNo}則留言`;
  }

  componentDidMount(){
    this.props.findIdSet();
  }
  
  render(){
    const {post} = this.props;
    return (
      <div>
        <button onClick={this.go}>gogo</button>
        {this.createArtBox(post)}
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
    idSet : Array.from(state.post.keys()),
    post : state.post
  }), {
    findIdSet,
    findPost,
    findTopCont
  }
)(Art);