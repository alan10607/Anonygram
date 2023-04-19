/* --- 白板內容讀取 --- */
export const getContentWord = (e) => {
  const row = [];
  for(let node of e.childNodes){
    switch (node.nodeName) {
      case "IMG":
        row.push(node.src);
        break;
  
      default:
        row.push(node.textContent.trim());
    }
  }

  console.log(row);
  return row.join("\n").trim();
}

/* --- 貼上自動為純文字 --- */
export const pasteAsPlain = (e) => {
  const text = (e.originalEvent || e).clipboardData.getData("text/plain");
  document.execCommand("insertText", false, text);//已過時的方法
  console.log("Paste as plain", text);
  e.preventDefault();
}