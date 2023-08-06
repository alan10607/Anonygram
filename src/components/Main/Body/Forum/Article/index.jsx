import { Fragment } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import Content from 'components/Main/Body/Forum/Article/Content';
import { STATUS_TYPE } from 'util/constant';
import './index.scss';
import Move from 'components/Main/Body/Forum/Article/Move';
import ContDel from 'components/Main/Body/Forum/Article/Content/ContDel';

export default function Article({ id }) {
  const { title, contList } = useSelector(state => ({
    title: state.forum.get(id).title,
    contList: state.forum.get(id).contList
  }), shallowEqual);

  const getContentNode = (contList) => {
    console.log("getAllContents")
    const allContent = [];
    for (let no = 0; no < contList.length; ++no) {
      const key = `${id}_${no}`;
      const content = contList[no];
      if (!content) continue;//not load yet
      if (content.status === STATUS_TYPE.NORMAL) {
        allContent.push(<Content key={key} id={id} no={no} />);
      } else if (content.status === STATUS_TYPE.DELETED) {
        allContent.push(<ContDel key={key} id={id} no={no} />);
      }
    }
    return allContent;
  }

  return (
    <div id={id} className="art-cont">
      <div className="title">{title}</div>
      <Fragment>{getContentNode(contList)}</Fragment>
      <Move id={id} />
      {/* <Reply id={id} /> */}
    </div>
  )
}