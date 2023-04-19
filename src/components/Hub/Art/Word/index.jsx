import { useSelector, shallowEqual } from 'react-redux';
import './index.scss';

export default function Word({ id, no = 0 }) {
  let k = 0;
  const { word } = useSelector(state => ({
    word: state.post.get(id).contList[no].word
  }), shallowEqual);

  const createWord = (word) => {//建構內文
    const row = word.split("\n");
    const allLine = [];
    row.forEach((line, i) => {
      const nodes = createLine(line);
      allLine.push(
        <div key={i} className={nodes[0].type === "img" ? "no-padding" : ""}>{nodes}</div>
      )
    });
    return allLine;
  }

  const createLine = (line) => {//建構每一行
    if (line.trim() === "") return [createBr()];

    //url = protocol(https) + domain/port(1~256) + country-code(0~6) + path
    const urlExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.?[a-zA-Z0-9()]{0,6}\b[-a-zA-Z0-9@:%_+.~#=?&/()]*/gi;
    const imgExp = /https?:[/|.|\w|\s|-]*\.(?:jpeg|jpg|gif|png)/gi;
    const bxExp = /\bB\d+\b/gi;

    const m = new Map();
    let mark = 0xf490;//私人區間, 不太可能出現, 分隔符剛好不會重疊
    let allNode = [];

    line = line.replace(imgExp, (imgUrl) => {//先取代imgUrl, 再取代url
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

    let last = 0;
    for (let i = 0; i < line.length; i++) {
      if (m.has(line[i])) {
        if (last < i) allNode.push(createSpan(line.substring(last, i)));
        allNode.push(m.get(line[i]));
        last = i + 1;//跳過這個替換元
      }
    }

    if (last < line.length) {//加入最後
      allNode.push(createSpan(line.substring(last, line.length)));
    }

    //加入key, key為const故Object.assign
    // allNode = allNode.map((node, i) => Object.assign({}, node, { 
    //   key : i
    // }));

    return allNode;
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

  return (
    <div className="word">
      {createWord(word)}
    </div>
  )
}