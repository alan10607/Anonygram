import { useDispatch } from 'react-redux';
import { likeContent, unlikeContent } from '../redux/actions/post';

export default function useToggleLike() {
  const dispatch = useDispatch();
  const toggleLike = (id, no, isUserLike) => {
    return () => {
      const data = {id, no};
      if(isUserLike){
        dispatch(unlikeContent(data));
      }else{
        dispatch(likeContent(data));
      }
    }
  }
  return toggleLike;
}