import { Fragment } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { STATUS_TYPE } from 'config/constant';
import Content from './Content';
import DeletedContent from './Content/DeletedContent';
import Move from './Move';
import Reply from './Reply';
import './Article.scss';

export default function Article({ id }) {
  const { title, contentList } = useSelector(state => ({
    title: state.forum.get(id).title,
    contentList: state.forum.get(id).contentList
  }), shallowEqual);

  const getContentNode = (contentList) => {
    const allContent = [];
    for (let no = 0; no < contentList.length; ++no) {
      const key = `${id}_${no}`;
      const content = contentList[no];
      if (!content) continue;//not load yet
      
      if (content.status === STATUS_TYPE.NORMAL) {
        allContent.push(<Content key={key} id={id} no={no} />);
      } else if (content.status === STATUS_TYPE.DELETED) {
        allContent.push(<DeletedContent key={key} id={id} no={no} />);
      }
    }
    return allContent;
  }

  return (
    <div id={id} className="art">
      <div className="title">{title}</div>
      <Fragment>{getContentNode(contentList)}</Fragment>
      <Move id={id} />
      <Reply id={id} />
    </div>
  )
}