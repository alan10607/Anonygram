let k = 0;

const createWord = (word) => {
  k = 0;
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
  //url = protocol(https) + domain/port(1~256) + country-code(0~6) + path
  const urlExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.?[a-zA-Z0-9()]{0,6}\b[-a-zA-Z0-9@:%_+.~#=?&/()]*/gi;
  const imgExp = /https?:[/|.|\w|\s|-]*\.(?:jpeg|jpg|gif|png)/gi;
  const bxExp = /\b#\d+\b/gi;
  let mark = 0xf490;//private in UTF-16, unlikely to occur

  return line.replace(imgExp, (imgUrl) => {//replace imgUrl before url
    const key = String.fromCharCode(mark++);
    m.set(key, createImg(imgUrl));
    return key;
  }).replace(urlExp, (url) => {
    const key = String.fromCharCode(mark++);
    m.set(key, createA(url));
    return key;
  }).replace(bxExp, (bx) => {
    const key = String.fromCharCode(mark++);
    m.set(key, createBx(id, bx));
    return key;
  });
}

const createImg = (imgUrl) => <img key={k++} src={imgUrl} alt={imgUrl} />;
const createA =      (url) => <a key={k++} href={url} target="_blank" rel="noreferrer">{url}</a>;
const createBx =  (id, bx) => <span key={k++} className="bx" onClick={goToBx(id, bx.substr(1))}>{bx}</span>;
const createSpan =   (str) => <span key={k++}>{str}</span>;
const createBr =        () => <br key={k++}></br>;

const goToBx = (id, no) => {
  return () => {
    var contEle = document.getElementById(`${id}_${no}`);
    if (!contEle) return;
    goTo(contEle);
  }
}

const goTo = (ele = "body") => {
  const buffer = document.getElementById("header").offsetHeight;
  window.scrollTo({ top : ele.offsetTop - buffer, behavior : "smooth" });
}

export default createWord;