import React from 'react';
import { useSelector } from 'react-redux';
import './index.css';
import { ICON_USER } from '../../../utli/constant';

export default function Bar({ id }) {
  const { authorName } = useSelector(state => ({
    authorName : state.post.get(id).contList[0].authorName
  }));

  return (
    <div className="bar-art">
      <img className="bar-head" src={ICON_USER} />
      <div className="author">{authorName}</div>
    </div>
  )
}