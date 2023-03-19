import { useDispatch } from 'react-redux';
import { showConsole } from '../redux/actions/common';

export default function useShowConsole () {
  const dispatch = useDispatch();
  const doShowConsole = (str) => {
    dispatch(showConsole(str));
  }
  return doShowConsole;
}