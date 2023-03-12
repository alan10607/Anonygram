import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { findPost } from '../redux/actions/post';

export default function useFindPost (data) {
  const [findIdLock, setFindIdLock] = useState(false);
  const {idStart} = useSelector(state => ({
    idStart : state.console.idStart
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    setFindIdLock(true);
    dispatch(findPost(data));
  }, [data]);

  useEffect(() => {
    setFindIdLock(false);
  }, [idStart]);

  return [findIdLock, idStart];
}
