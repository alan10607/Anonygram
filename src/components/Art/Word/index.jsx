import React, { Component } from 'react'
import './index.css';

export default class Word extends Component {
  createWord = (str) => {
    const lines = str.split("\n");
    const allWord = [];
    for(let line of lines){
      allWord.push(<div>{this.createLine(line)}</div>);
    }
    return allWord;
  }

  createLine = (line) => {
    if(line.trim() === "") return <br></br>;
    //url = protocol(https) + domain/port(1~256) + country-code(1~6) + path
    const urlExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b[-a-zA-Z0-9@:%_\+.~#=?&\/()]*/gi;
    const bxExp = /\bB\d+\b/gi;
    const imgExp = /https?:[\/|.|\w|\s|-]*\.(?:jpeg|jpg|gif|png)/gi;

    let mark = 0xf490;//私人區間, 不太可能出現, 分隔符剛好不會重疊
    const m = new Map();
    const allLine = [];
    line = line.replace(imgExp, (imgUrl) => {
      const key = String.fromCharCode(mark++);
      m.set(key, <img src={imgUrl} alt={imgUrl}/>);
      return key;
    }).replace(urlExp, (url) => {
      const key = String.fromCharCode(mark++);
      m.set(key, <a href={url} target="_blank">{url}</a>);
      return key;
    }).replace(bxExp, (bx) => {
      const key = String.fromCharCode(mark++);
      m.set(key, <span className="bx" onClick="goToBx(this, 1);">{bx}</span>);
      return key;
    });
    
    let last = 0;
    for(let i = 0; i < line.length; i++){
      if(m.has(line[i])){
        if(last < i) allLine.push(<span>{line.substring(last, i)}</span>);
        allLine.push(m.get(line[i]));
        last = i + 1;//跳過這個替換元
      }
    }
    
    if(last < line.length){//加入最後
      allLine.push(<span>{line.substring(last, line.length)}</span>);
    }

    return allLine;
  }

  render() {
    const {word} = this.props;
    return (
      <div className='word'>
        {this.createWord(word)}
      </div>
    )
  }
}
