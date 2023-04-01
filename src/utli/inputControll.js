/* --- 白板內容讀取 --- */
export const getContentWord = (e) => {
  // const row = [];
  // e.childNodes.forEach((node, i) => {
  //   if (node.nodeName == "IMG") {
  //     row.push(node.src);
  //   } else {
  //     row.push((node.innerText || "").replaceAll("\n", ""));
  //   }
  // });

  const childNodes = e.childNodes;
  const row = [];
  debugger
  for(let node of childNodes){
    if (node.nodeName == "IMG") {
      row.push(node.src);
    } else{
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