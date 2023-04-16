const imgQuality = 1, imgMaxWidth = 450;

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

export const getBase64FromFile = async (file) => {
  return convertToBase64(file)
    .then(base64 => {
      return buildImg(base64);
    }).then(image => {
      return compressImg(image, imgQuality, imgMaxWidth);
    })
}