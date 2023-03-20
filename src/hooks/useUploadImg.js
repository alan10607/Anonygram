import { useSelector, useDispatch } from 'react-redux';
import { uploadImg } from '../redux/actions/post';

export default function useUploadImg () {
  const dispatch = useDispatch();
  const {imgUrl} = useSelector(state => ({
    imgUrl : state.console.uploadImgUrl
  }));
  const doUploadImg = (id, imgBase64) => {
    imgBase64 = imgBase64.replace(/^data:image\/\w+;base64,/g, "");
    const data = {
      id,
      imgBase64
    };
    dispatch(uploadImg(data));
  }
  return [doUploadImg, imgUrl];
}
