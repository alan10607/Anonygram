import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CONT_STATUS_TYPE } from '../../constant';
import Bar from './Bar'
import ArtCont from './ArtCont';
import { Cont, ContDelete } from './Cont';
import Move from './Move'
import { Reply } from './Reply';
import "./index.css";
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
  
  createArt = (post) => {
    const allPost = [];
    console.log(post);
    for(let [id, a] of post) {
      if(!a) continue;//未讀取, 就跳過

      const c = a.contList[0];
      allPost.push(
        <div className="art" key={id}>
          <Bar authorName={c.authorName}/>
          <ArtCont title={a.title} word={c.word} isUserLike={c.isUserLike} likes={c.likes} time={this.getTimeFromStr(c.createDate)}/>
          {this.createCont(a.contList)}
          <Move openStr={this.getOpenStr(a.contNum, a.contList.length)} findTopCont={this.findTopCont(id)}/>
          <div className="reply-box disable"></div>
          <Reply userName={"???"} no={a.contNum + 1} time={""}/>
        </div>
      );
    }

    return allPost;
  }

  createCont = (contList) => {
    const allCont = [];
    for(let i=1; i<contList.length; ++i){
      const c = contList[i];
      allCont.push(
        c.status == CONT_STATUS_TYPE.DELETED ?
        <ContDelete key={`${c.id}-${c.no}`} no={c.no}/> :
        <Cont key={`${c.id}-${c.no}`} authorName={c.authorName} likes={c.likes} word={c.word} no={c.no} time={this.getTimeFromStr(c.createDate)}/> 
      ); 
    }
    return allCont;
  }

  getOpenStr = (contNum, startNo) => {
    if(contNum == 1) return "該文章尚無留言";//只有本文
    const remain = contNum - startNo;
    if(remain == 0) return "";//已展開全部留言
    if(startNo == 1) return `查看全部${contNum - startNo}則留言`;//尚未展開
    return `查看剩餘${contNum - startNo}則留言`;
  }

  getTimeFromStr = (dateStr) => {
    if(dateStr == "") return "";

    const date = new Date(dateStr);
    const now = new Date();
    const gap = now - date;
    const s = 1000;
    const m = 60000;
    const h = 3600000;
    const day = 86400000;
    const week = 604800000;

    //超過一個月採另一種計算方式, 忽略時間部分計算
    //    var countMonth = (now.getYear() - date.getYear()) * 12
    //                    + now.getMonth() - date.getMonth()
    //                    + (now.getDate() < date.getDate() ? -1 : 0);//補回不足的月
    //    if(countMonth >= 12) return Math.floor(countMonth / 12) + "年前";
    //    if(countMonth > 0) return countMonth + "個月前";

    if(gap >= week)//超過一周直接顯示日期
        return (now.getYear() > date.getYear() ? date.getYear() + "年 " : "")
                + date.getMonth() + "月 " + date.getDate() + "日";
    if(gap >= day) return Math.floor(gap / day) + "天前";
    if(gap >= h) return Math.floor(gap / h) + "小時前";
    if(gap >= m) return Math.floor(gap / m) + "分鐘前";
    if(gap >= s) return Math.floor(gap / s) + "秒前";
    if(gap >= 0) return "剛剛";
    return "";
  }

  componentDidMount(){
    this.props.findIdSet();
  }
  
  render(){
    const {post} = this.props;
    return (
      <div>
        <button onClick={this.go}>gogo</button>
        {this.createArt(post)}
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