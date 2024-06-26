import { ICON_UPLOAD_IMG } from 'config/constant';
import { useDispatch } from 'react-redux';
import { addReplyHtml } from 'redux/actions/common';
import { useUploadImage } from 'util/imageUtil';
import useThrottle from 'util/useThrottle';
import './UploadImgBtn.scss';

export default function UploadImageBtn({ id }) {
  const dispatch = useDispatch();
  const uploadImage = useUploadImage();

  const uploadImageToInput = useThrottle((event) => {
    uploadImage(event)
      .then(imageUrl => dispatch(addReplyHtml(id, `<img src="${imageUrl}" alt="${imageUrl}"/>`)))
      .catch(e => console.log("Failed to add image to input html", e));
  })

  return (
    <label className="upload-img-btn">
      <img className="icon" src={ICON_UPLOAD_IMG} alt="ICON_UPLOAD_IMG" />
      <input type="file" accept="image/*" onChange={uploadImageToInput} />
    </label>
  )
}