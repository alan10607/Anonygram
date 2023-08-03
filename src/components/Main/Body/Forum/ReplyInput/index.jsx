import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { uploadImg } from '../../../../redux/actions/post';
import { replySetHtml } from '../../../../redux/actions/reply';
import { pasteAsPlain } from '../../../../util/inputControll';
import { getBase64FromFile } from '../../../../util/image';
import { ICON_UPLOAD_IMG } from '../../../../util/constant';
import useConsole from '../../../../util/useConsole';
import useThrottle from '../../../../util/useThrottle';
import './index.scss';

export default function ReplyInput({ id, inputRef, render = () => <div></div>}) {
  const { html } = useSelector(state => ({
    html: state.reply.html
  }), shallowEqual);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const showConsole = useConsole();

  const doUploadImg = useThrottle(async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0 || !files[0])
      return showConsole(t("empty-img"));

    const file = files[0], fileTypeExp = /image\/\w+/g;//必須為MIME image type
    if (!fileTypeExp.test(file.type)) 
      return showConsole(t("not-img"));

    const base64 = await getBase64FromFile(file).catch(e => {
      console.log("Image load failed", e);
      return showConsole(t("load-img-err"));
    });

    dispatch(uploadImg({
      id,
      imgBase64 : base64.replace(/^data:image\/\w+;base64,/g, "")
    }));
  })

  return (
    <div className="reply-input">
      <div 
        ref={inputRef}
        className="input-box"
        onPaste={pasteAsPlain}
        onBlur={(event) => { dispatch(replySetHtml(event.target.innerHTML)) }}
        contentEditable="true"
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
      <div className="move">
        <label className="upload-img">
          <img className="icon" src={ICON_UPLOAD_IMG} alt="ICON_UPLOAD_IMG"/>
          <input type="file" accept="image/*" onChange={doUploadImg}/>
        </label>
        <div className="flex-empty"></div>
        {render()}
      </div>
    </div>
  )
}