import React from 'react';
import './index.css';

export default function Word({ id, word }) {
  const createWord = () => {//建構內文
    const row = word.split("\n");
    const allLine = [];
    row.forEach((line, i) => allLine.push(
      <div key={i}>{createLine(line)}</div>
    ));
    return allLine;
  }

  const createLine = (line) => {//建構每一行
    if (line.trim() === "") return createBr();

    //url = protocol(https) + domain/port(1~256) + country-code(0~6) + path
    const urlExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.?[a-zA-Z0-9()]{0,6}\b[-a-zA-Z0-9@:%_\+.~#=?&\/()]*/gi;
    const imgExp = /https?:[\/|.|\w|\s|-]*\.(?:jpeg|jpg|gif|png)/gi;
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

    //key為const故Object.assign
    allNode = allNode.map((node, i) => Object.assign({}, node, { key : i }));
    return allNode;
  }

  const createImg = (imgUrl) => <img src={imgUrl} alt={imgUrl} />;
  const createA =      (url) => <a href={url} target="_blank">{url}</a>;
  const createBx =  (id, bx) => <span className="bx" onClick={goToBx(id, bx.substr(1))}>{bx}</span>;
  const createSpan =   (str) => <span>{str}</span>;
  const createBr =        () => <br></br>;

  const goToBx = (id, no) => {
    return () => {
      var contEle = document.getElementById(`${id}_${no}`);
      if (!contEle) return;
      goTo(contEle);
    }
  }

  const goTo = (ele = "body") => {
    window.scrollTo({ top : ele.offsetTop, behavior : "smooth" });
  }

  return (
    <div className="word">
      {createWord()}
    </div>
  )
}