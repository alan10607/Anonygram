import { useDispatch } from 'react-redux';
import { showConsole } from '../redux/actions/common';

export default function useConsole() {
  const dispatch = useDispatch();
  const show = (str) => {
    dispatch(showConsole(str));
  }
  return show;
}