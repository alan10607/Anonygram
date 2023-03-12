import React from 'react';
import './index.css';

export default function Word ({id, word}) {
  const createWord = (id, word) => {//建構內文
    const lines = word.split("\n");
    const allWord = [];
    lines.forEach((line, i) => allWord.push(
      <div key={i}>{createLine(id, line)}</div>
    ));
    return allWord;
  }

  const createLine = (id, line) => {//建構每一行
    if(line.trim() === "") return createBr();

    //url = protocol(https) + domain/port(1~256) + country-code(0~6) + path
    const urlExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.?[a-zA-Z0-9()]{0,6}\b[-a-zA-Z0-9@:%_\+.~#=?&\/()]*/gi;
    const bxExp = /\bB\d+\b/gi;
    const imgExp = /https?:[\/|.|\w|\s|-]*\.(?:jpeg|jpg|gif|png)/gi;

    let mark = 0xf490;//私人區間, 不太可能出現, 分隔符剛好不會重疊
    const m = new Map();
    let allLine = [];

    line = line.replace(imgExp, (imgUrl) => {
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
    for(let i = 0; i < line.length; i++){
      if(m.has(line[i])){
        if(last < i) allLine.push(createSpan(line.substring(last, i)));
        allLine.push(m.get(line[i]));
        last = i + 1;//跳過這個替換元
      }
    }
    
    if(last < line.length){//加入最後
      allLine.push(createSpan(line.substring(last, line.length)));
    }

    //key為const故Object.assign
    allLine = allLine.map((node, i) => Object.assign({}, node, { key : i }));
    return allLine;
  }

  const createImg = (imgUrl) => <img src={imgUrl} alt={imgUrl}/>;
  const createA = (url) => <a href={url} target="_blank">{url}</a>;
  const createBx = (id, bx) => <span className="bx" onClick={goToBx(id, bx.substr(1))}>{bx}</span>;
  const createSpan = (str) => <span>{str}</span> ;
  const createBr = () => <br></br>;

  const goToBx = (id, no) => {
    return () => {
      var contEle =  document.getElementById(`${id}-${no}`);
      if(!contEle) return;
      goTo(contEle);
    }
  }

  const goTo = (ele = "body") => {
    window.scrollTo({top: ele.offsetTop, behavior: 'smooth'});
  }

  return (
    <div className="word">
      {createWord(id, word)}
    </div>
  )
}
