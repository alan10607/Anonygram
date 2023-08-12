import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setConsole } from "redux/actions/common";
import forumRequest from "service/request/forumRequest";
import ValidationError from "util/validationError";
import { MIME_IMAGE_EXP } from "util/regexp";

const imgQuality = 1, imgMaxWidth = 450;

/* --- image convert and compress --- */
const checkTargetFiles = (files) => {
  return new Promise((resolve, reject) => {
    if (!files || files.length === 0 || !files[0]) {
      reject(new ValidationError(i18next.t("tip.img.error.empty")));
    }

    const file = files[0];
    if (!MIME_IMAGE_EXP.test(file.type)) {//must be MIME image type
      reject(new ValidationError(i18next.t("tip.img.error.format")));
    }

    resolve(file);
  });
}

const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);//converted to Base64
  });
}

const buildImg = (base64) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = base64;//src in <img> can be Base64 string
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

    const newImg = canvas.toDataURL("image/jpeg", quality);//quality = compression ratio, 1 = no compress 
    const newBase64 = newImg.replace(/^data:image\/\w+;base64,/g, "");
    console.log("After compressed, image size=" + Math.round(0.75 * newBase64.length / 1000) + "kb");//byte size is almost 0.75 of base64
    resolve(newBase64);
  });
};

export const uploadImageFromTargetFiles = (files) => {
  return checkTargetFiles(files).then(file => convertFileToBase64(file))
    .then(base64 => buildImg(base64))
    .then(image => compressImg(image, imgQuality, imgMaxWidth))
    .then(compressedBase64 => forumRequest.uploadImage(compressedBase64))
    .then(res => {
      console.log("Upload image url", res.imageUrl);
      return Promise.resolve(res.imageUrl);
    });
}

export const useUploadImage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const uploadImage = (event) => {
    return checkTargetFiles(event.target.files)
      .then(file => convertFileToBase64(file))
      .then(base64 => buildImg(base64))
      .then(image => compressImg(image, imgQuality, imgMaxWidth))
      .then(compressedBase64 => forumRequest.uploadImage(compressedBase64))
      .then(res => {
        console.log("Upload image url", res.imageUrl);
        return Promise.resolve(res.imageUrl);
      })
      .catch(e => {
        if (e instanceof ValidationError) {
          dispatch(setConsole(e.message));
        } else {
          console.log("Image load failed", e);
          dispatch(setConsole(t("tip.img.error")));
        }
      })
      .finally(() => {
        event.target.value = "";//remove file
      });
  }

  return uploadImage;
}