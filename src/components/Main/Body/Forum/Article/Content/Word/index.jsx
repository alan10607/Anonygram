import { useMemo } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import './word.scss';
import createWord from './createWord';

export default function Word({ id, no }) {
  const { word } = useSelector(state => ({
    word: state.forum.get(id).contList[no].word
  }), shallowEqual);
  const wordMemo = useMemo(() => createWord(id, word), []);

  return (
    <div className="word">
      {wordMemo}
    </div>
  )
}