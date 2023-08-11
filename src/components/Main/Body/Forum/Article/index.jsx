import { Fragment } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import Content from 'components/Main/Body/Forum/Article/Content';
import { STATUS_TYPE } from 'util/constant';
import './article.scss';
import Move from 'components/Main/Body/Forum/Article/Move';
import Reply from 'components/Main/Body/Forum/Article/Reply';
import DeletedContent from 'components/Main/Body/Forum/Article/Content/DeletedContent';

export default function Article({ id }) {
  const { title, contentList } = useSelector(state => ({
    title: state.forum.get(id).title,
    contentList: state.forum.get(id).contentList
  }), shallowEqual);

  const getContentNode = (contentList) => {
    console.log("getAllContents")
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