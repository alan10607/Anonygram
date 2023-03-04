import React, { Component } from 'react'
import { ICON_LIKE } from '../../../constant';
import './index.css';

export default class Cont extends Component {
  getLikeStr = (isUserLike, likes) => {
    if(isUserLike){
        if(likes - 1 == 0){
            return "你說讚";
        }else{
            return `你與${likes - 1}人都說讚`
        }
    }
    return `${likes}人說讚`;
  }

  getTimeFromStr = (dateStr) => {
    if(dateStr == "") return "";

    var date = new Date(dateStr);
    var now = new Date();
    var gap = now - date;
    var s = 1000;
    var m = 60000;
    var h = 3600000;
    var day = 86400000;
    var week = 604800000;

    //超過一個月採另一種計算方式, 忽略時間部分計算
    //    var countMonth = (now.getYear() - date.getYear()) * 12
    //                    + now.getMonth() - date.getMonth()
    //                    + (now.getDate() < date.getDate() ? -1 : 0);//補回不足的月
    //
    //    if(countMonth >= 12)
    //        return Math.floor(countMonth / 12) + "年前";
    //
    //    if(countMonth > 0)
    //        return countMonth + "個月前";

    if(gap >= week)//超過一周直接顯示日期
        return (now.getYear() > date.getYear() ? date.getYear() + "年 " : "")
                + date.getMonth() + "月 " + date.getDate() + "日";

    if(gap >= day)
        return Math.floor(gap / day) + "天前";

    if(gap >= h)
        return Math.floor(gap / h) + "小時前";

    if(gap >= m)
        return Math.floor(gap / m) + "分鐘前";

    if(gap >= s)
        return Math.floor(gap / s) + "秒前";

    if(gap >= 0)
        return "剛剛";

    return "";
  }

  render() {
    const {title, word, isUserLike, likes, createDate} = this.props;
    return (
      <div className="cont">
        <div className="title">{title}</div>
        <div className="word">{word}</div>
        <div className="info">
          <img className="likes-icon" src={ICON_LIKE} onClick="toggleLike(this);"/>
          <div className="likes likes-out">{this.getLikeStr(isUserLike, likes)}</div>
          <span className="splitter">, </span>
          <span className="time">{this.getTimeFromStr(createDate)}</span>
        </div>
      </div>
    )
  }
}
