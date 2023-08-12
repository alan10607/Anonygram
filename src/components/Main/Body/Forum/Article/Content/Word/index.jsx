import { useMemo } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import createWord from './createWord';
import './word.scss';

export default function Word({ id, no }) {
  const { word } = useSelector(state => ({
    word: state.forum.get(id).contentList[no].word
  }), shallowEqual);
  const wordMemo = useMemo(() => createWord(id, word), []);

  return (
    <div className="word">
      {wordMemo}
    </div>
  )
}