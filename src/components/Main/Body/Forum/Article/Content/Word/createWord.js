import { scrollTo } from "util/inputControll";
import { BX_EXP, IMG_URL_EXP, URL_EXP } from "util/regexp";

let k = 0;
let id = "";

const createWord = (inputId, word) => {
  k = 0;;//TO-DO: need test that is init will restart??
  id = inputId
  const allLine = [];
  word.split("\n").forEach((row, i) => {
    const lineNodes = createLine(row);
    allLine.push(
      <div key={i} className={lineNodes[0].type === "img" ? "no-padding" : ""}>{lineNodes}</div>
    )
  });
  return allLine;
}

const createLine = (line) => {//build each line
  if (line.trim() === "") return [createBr()];

  const allNode = [];
  const markToNode = new Map();
  line = replaceTargetToMark(line, markToNode);

  let last = 0;
  for (let i = 0; i < line.length; i++) {
    if (markToNode.has(line[i])) {
      if (last < i) allNode.push(createSpan(line.substring(last, i)));
      allNode.push(markToNode.get(line[i]));
      last = i + 1;//skip this mark
    }
  }

  if (last < line.length) {//add last string
    allNode.push(createSpan(line.substring(last, line.length)));
  }

  return allNode;
}

const replaceTargetToMark = (line, m) => {
  let mark = 0xf490;//private in UTF-16, unlikely to occur

  return line.replace(IMG_URL_EXP, (imgUrl) => {//replace imgUrl before url
    const key = String.fromCharCode(mark++);
    m.set(key, createImg(imgUrl));
    return key;
  }).replace(URL_EXP, (url) => {
    const key = String.fromCharCode(mark++);
    m.set(key, createA(url));
    return key;
  }).replace(BX_EXP, (bx) => {
    const key = String.fromCharCode(mark++);
    m.set(key, createBx(id, bx));
    return key;
  });
}

const createImg = (imgUrl) => <img key={k++} src={imgUrl} alt={imgUrl} />;
const createA = (url) => <a key={k++} href={url} target="_blank" rel="noreferrer">{url}</a>;
const createBx = (id, bx) => <span key={k++} className="bx" onClick={goToBx(id, bx.substr(1))}>{bx}</span>;
const createSpan = (str) => { console.log(k, id); return <span key={k++}>{str}</span> };
const createBr = () => <br key={k++}></br>;

const goToBx = (id, no) => {
  return () => scrollTo(`${id}_${no}`);
}



export default createWord;