import { useDispatch } from 'react-redux';
import { showBigBox } from '../redux/actions/common';

export default function useShowBigBox () {
  const dispatch = useDispatch();
  const doShowBigBox = (isShow = false) => {
    dispatch(showBigBox(isShow));
  }
  return doShowBigBox;
}