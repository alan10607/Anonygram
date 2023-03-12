import React from 'react';
import './index.css';
import { ICON_USER } from '../../../constant';
import { useSelector } from 'react-redux';

export default function Bar ({id}) {
  const {authorName} = useSelector(state => ({
    authorName : state.post.get(id).contList[0].authorName
  }));
  
  return (
    <div className="bar">
      <img className="bar-head" src={ICON_USER}/>
      <div className="author">{authorName}</div>
    </div>
  )
}