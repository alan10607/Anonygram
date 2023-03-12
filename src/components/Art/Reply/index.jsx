import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './index.css';
import { ICON_USER, ICON_UPLOAD_IMG } from '../../../constant';
import { showConsole } from '../../../redux/actions/console'
import { replyPost, uploadImg } from '../../../redux/actions/post';

export default function Reply({id, isOpen, userName = "???"}) {
  const [replyInputHtml, setReplyInputHtml] = useState("<div><br></div>");
  const replyInput = useRef();
  const dispatch = useDispatch();
  const {contNum, imgUrl, replyHtml} = useSelector(state => ({
    contNum : state.post.get(id).contNum,
    imgUrl : state.post.get(id).local.imgUrl,
    replyHtml : state.post.get(id).local.replyHtml
  }));

  useEffect(() => {
    if(imgUrl){
      const html = replyInput.current.innerHTML;
      const add = `<img src="${imgUrl}" alt="${imgUrl}"/><div><br></div>`;
      dispatch(replyHtml(html + add))
    }
  }, [imgUrl])
  
  const doUploadImg = (imgBase64) => {
    imgBase64 = imgBase64.replace(/^data:image\/\w+;base64,/g, "");
    const data = {
      id,
      imgBase64
    };
    dispatch(uploadImg(data));
  }

  const doReplyPost = () => {
    const word = getContentWord();
    if(word.trim() == ""){
      dispatch(showConsole("留言內容不能為空白!!"));
      return;
    }

    const data = { id, word }
    dispatch(replyPost(data));
  }

  const getReplyTime = () => {
    const now = new Date();
    const yyyy = now.getFullYear(), MM = String(now.getMonth() + 1).padStart(2, "0"), dd = String(now.getDate()).padStart(2, "0"),
          hh = String(now.getHours()).padStart(2, "0"), mm = String(now.getMinutes()).padStart(2, "0");
    return `${yyyy}/${MM}/${dd} ${hh}:${mm}`;
  }

  const pasteAsPlain = (e) => {
    const text = (e.originalEvent || e).clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);//已過時的方法
    console.log("Paste as plain", text);
    e.preventDefault();
  }

  const getContentWord = () => {
    const e = replyInput.current;
    if(!e) return

    const row = [];
    e.childNodes.forEach((node, i) => {
      let str = "";
      if(node.nodeName == "IMG"){
        row.push(node.src);
      }else{
        row.push((node.innerText || "").replaceAll("\n", ""));
      }
    });
    console.log(row);
    return row.join("\n");
  }


  const loadImg = (e) => {
    if(e.target.files == null || e.target.files.length == 0 || e.target.files[0] == null){
      dispatch(showConsole("選擇圖片為空"));
      return;
    }

    const file = e.target.files[0];
    const fileTypeExp = /image\/\w+/g;//必須為MIME image type
    if(!fileTypeExp.test(file.type)){
      dispatch(showConsole("圖片格式錯誤"));
      return;
    }

    convertToBase64(file).then(base64 => {
      return buildImg(base64);
    }).then(image => {
      return compressImg(image, 0.97, 450);
    }).then(newBase64 => {
      doUploadImg(newBase64);
    }).catch(e => {
      console.log("Image read failed", e);
      dispatch(showConsole("圖片上傳失敗"));
    });
  }

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);//轉換成Base64
    });
  }

  const buildImg = (base64) => {
    return new Promise((resolve, reject) => {
      const image = new Image();//先不設定寬度px
      image.src = base64;//img中src可以直接接Base64
      image.onload = () => resolve(image);
      image.onerror = () => reject("Build image failed");
    });
  }

  const compressImg =(image, quality, maxWidth) => {
    return new Promise((resolve, reject) => {
      let width = image.width, height = image.height;
      if(width > maxWidth){
          const scale = maxWidth / width;
          width *= scale;
          height *= scale;
      }
      console.log(`Resize img from (width/height) ${image.width}/${image.height} => ${width}/${height}`);
  
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");
      context.drawImage(image, 0, 0, width, height);
      const newImg = canvas.toDataURL("image/jpeg", quality);//壓縮比例, 1表示無損壓縮
      console.log("After compressed, image size=" + Math.round(0.75 * newImg.length / 1000) + "kb");//byte約為base64編碼的0.75
      resolve(newImg);
    });
  };

  return (
    <div className={"reply " + (isOpen ? "replying" : "disable")}>
      <div className="bar">
        <img className="bar-head" src={ICON_USER}/>
        <div className="author">{userName}</div>
      </div>
      <div className="info">B{contNum}, {getReplyTime()}</div>
      <div ref={replyInput} className="reply-input" contentEditable="true" 
        onPaste={pasteAsPlain} dangerouslySetInnerHTML={{ __html: replyInputHtml }}></div>
      <div className="move">
        <label className="reply-img">
          <img src={ICON_UPLOAD_IMG}/>
          <input type="file" accept="image/*" onChange={loadImg}/>
        </label>
        <div className="flex-empty"></div>
        <div className="reply-summit" onClick={doReplyPost}>送出</div>
      </div>
    </div>
    )
}

