import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ICON_UPLOAD_IMG } from 'util/constant';
import useThrottle from 'util/useThrottle';
import { uploadImageFromTargetFiles } from 'util/image';
import "./index.scss";
import { addReplyHtml, setConsole } from 'redux/actions/common';
import ValidationError from 'util/validationError';
import forumRequest from 'service/request/forumRequest';


export default function UploadImageBtn({ id }) {
  const { replyHtml } = useSelector(state => ({
    replyHtml: state.common.replyHtml[id]
  }), shallowEqual);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const uploadImage = useThrottle((event) => {
    uploadImageFromTargetFiles(event.target.files).then((imageUrl) => {
      dispatch(addReplyHtml(id, `<img src="${imageUrl}" alt="${imageUrl}"/>`));
    }).catch(e => {
      console.log("Image load failed", e);
      if(e instanceof ValidationError){
        dispatch(setConsole(t("load-img-err-reason", {reason : e.message})));
      }else{
        dispatch(setConsole(t("load-img-err")));
      }
    }).finally(() => {
      event.target.value = "";//remove file
    })
  })

  return (
    <label className="upload-img-btn">
      <img className="icon" src={ICON_UPLOAD_IMG} alt="ICON_UPLOAD_IMG" />
      <input type="file" accept="image/*" onChange={uploadImage} />
    </label>
  )
}