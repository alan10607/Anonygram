import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ICON_UPLOAD_IMG } from 'util/constant';
import useConsole from 'util/useConsole';
import useThrottle from 'util/useThrottle';
import { uploadImageFromFile } from 'util/image';
import "./index.scss";
import { addReplyHtml, setReplyHtml } from 'redux/actions/common';


export default function UploadImageBtn({ id }) {
  const { replyHtml } = useSelector(state => ({
    replyHtml: state.common.replyHtml[id]
  }), shallowEqual);

  const dispatch = useDispatch();
  const showConsole = useConsole();
  const { t } = useTranslation();

  const doUploadImg = useThrottle(async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0 || !files[0])
      return showConsole(t("empty-img"));

    const file = files[0], fileTypeExp = /image\/\w+/g;//must be MIME image type
    if (!fileTypeExp.test(file.type))
      return showConsole(t("not-img"));

    uploadImageFromFile(file).then((res) => {
      const imgUrl = res.imgUrl;
      console.log("Image url", imgUrl);
      dispatch(addReplyHtml(id, `<img src="${imgUrl}" alt="${imgUrl}"/>`));
    }).catch(e => {
      console.log("Image load failed", e);
      return showConsole(t("load-img-err"));
    }).finally(() => {
      event.target.value = "";//remove file
    })
  })

  return (
    <label className="upload-img-btn">
      <img className="icon" src={ICON_UPLOAD_IMG} alt="ICON_UPLOAD_IMG" />
      <input type="file" accept="image/*" onChange={doUploadImg} />
    </label>
  )
}