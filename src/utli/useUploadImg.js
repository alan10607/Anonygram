import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useShowConsole from './useShowConsole';
import { uploadImg } from '../redux/actions/post';

export default function useUploadImg(id, inputRef) {
  const imgQuality = 0.97, imgMaxWidth = 450, plainHtml = "<div><br></div>";
  const [html, setHtml] = useState(plainHtml);
  const showConsole = useShowConsole();
  const { imgUrl } = useSelector(state => ({
    imgUrl : state.common.uploadImgUrl
  }));
  const dispatch = useDispatch();

  /* --- 將上傳圖片傳回畫面--- */
  useEffect(() => {
    if (imgUrl !== "") {
      const html = inputRef.current.innerHTML;
      setHtml(`${html}<img src="${imgUrl}" alt="${imgUrl}"/>${plainHtml}`);
    }
  }, [imgUrl])

  /* --- 影像壓鎖與預覽 --- */
  const startUpload = (event) => {
    const files = event.target.files;
    if (files == null || files.length == 0 || files[0] == null) {
      showConsole("選擇圖片為空");
      return;
    }

    const file = files[0];
    const fileTypeExp = /image\/\w+/g;//必須為MIME image type
    if (!fileTypeExp.test(file.type)) {
      showConsole("圖片格式錯誤");
      return;
    }
    
    convertToBase64(file).then(base64 => {
      return buildImg(base64);
    }).then(image => {
      return compressImg(image, imgQuality, imgMaxWidth);
    }).then(newBase64 => {
      doUploadImg(newBase64);
    }).catch(e => {
      console.log("Image read failed", e);
      showConsole("圖片上傳失敗");
    });
  }

  /* --- 影像讀取與壓鎖 --- */
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

  const compressImg = (image, quality, maxWidth) => {
    return new Promise((resolve, reject) => {
      let width = image.width, height = image.height;
      if (width > maxWidth) {
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

  const doUploadImg = (imgBase64) => {
    const data = {
      id,
      imgBase64 : imgBase64.replace(/^data:image\/\w+;base64,/g, "")
    };
    dispatch(uploadImg(data));
  }

  return [startUpload, html, imgUrl];
}
