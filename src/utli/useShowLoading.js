import { useDispatch } from 'react-redux';
import { showLoading } from '../redux/actions/common';

export default function useShowLoading () {
  const dispatch = useDispatch();
  const doShowLoading = (isShow = false) => {
    dispatch(showLoading(isShow));
  }
  return doShowLoading;
}