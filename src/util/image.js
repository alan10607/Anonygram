import i18next from "i18next";
import forumRequest from "service/request/forumRequest";

const imgQuality = 1, imgMaxWidth = 450;

/* --- image convert and compress --- */
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

export const uploadImageFromFile = (id, file) => {
  return convertFileToBase64(file).then(base64 => {
    return buildImg(base64);
  }).then(image => {
    return compressImg(image, imgQuality, imgMaxWidth);
  }).then(compressed => {
    return forumRequest.uploadImg(id, compressed);
  })
}