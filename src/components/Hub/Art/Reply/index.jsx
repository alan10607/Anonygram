import { useRef } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { replyPost } from '../../../../redux/actions/post';
import { getNowTime } from '../../../../utli/time';
import { getContentWord } from '../../../../utli/inputControll';
import { ICON_USER, REPLY_BOX_ATTR } from '../../../../utli/constant';
import useConsole from '../../../../utli/useConsole';
import ReplyInput from '../ReplyInput';
import './index.scss';

export default function Reply({ id }) {
  const inputRef = useRef();
  const { contNum, username, isOpen } = useSelector(state => ({
    contNum: state.post.get(id).contNum,
    username: state.user.username,
    isOpen: state.reply.isOpen
  }), shallowEqual);
  const dispatch = useDispatch();
  const showConsole = useConsole();
  const { t } = useTranslation();

  const doReplyPost = () => {
    const word = getContentWord(inputRef.current);
    if (word.trim() == "") return showConsole(t("empty-word"));
    dispatch(replyPost({ id, word }));
  };

  const submitRender = () => {
    return (
      <div className="reply-summit" onClick={doReplyPost}>{t("submit")}</div>
    )
  }

  return (
    <div className={"reply " + (isOpen ? "" : "disable")} {...REPLY_BOX_ATTR}>
      <div className="reply-bar">
        <img className="reply-head icon" src={ICON_USER} />
        <div className="reply-author">{username}</div>
      </div>
      <div className="reply-info">B{contNum}, {getNowTime()}</div>
      <div className="reply-input-box">
        <ReplyInput id={id} inputRef={inputRef} render={submitRender} />
      </div>
    </div>
  )
}