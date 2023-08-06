/* --- Input html to string --- */
export const inputFilter = (e) => {
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
  return row.join("\n").trim();
}

/* --- Paste auto to plain text --- */
export const pasteAsPlain = (e) => {
  const text = (e.originalEvent || e).clipboardData.getData("text/plain");
  document.execCommand("insertText", false, text);//已過時的方法
  console.log("Paste as plain", text);
  e.preventDefault();
}

/* --- Scroll to a element with animation --- */
export const scrollTo = (elementId) => {
  const element = document.getElementById(elementId);
  if (!element) return;
  const buffer = document.getElementById("header").offsetHeight;
  window.scrollTo({ top : element.offsetTop - buffer, behavior : "smooth" });
}