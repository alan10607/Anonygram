import { useMemo } from 'react';
import createWord from 'util/createWordUtil';
import './Word.scss';

export default function Word({ article: { id, word } }) {
  const wordMemo = useMemo(() => createWord(id, word), []);

  return (
    <div className="word">
      {wordMemo}
    </div>
  )
}