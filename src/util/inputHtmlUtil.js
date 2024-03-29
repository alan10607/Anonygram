import DOMPurify from 'dompurify';
import i18next from "i18next";
import ValidationError from "Error/validationError";
import { useDispatch } from "react-redux";
import { setConsole } from "redux/actions/common";

/* --- Input html to string --- */
const htmlToString = (inputElement) => {
  const row = [];
  for (const node of inputElement.childNodes) {
    switch (node.nodeName) {
      case "IMG":
        row.push(node.src);
        break;
      default:
        row.push(node.textContent.trim());
    }
  }

  const string = row.join("\n").trim();
  console.log(`Input content string:\n${string}`);
  return string;
}

const checkWord = (string) => {
  const maxLength = 5000;
  const length = string.length;

  if (length === 0) {
    throw new ValidationError(i18next.t("tip.word.error.empty"));
  }

  if (length > maxLength) {
    throw new ValidationError(i18next.t("tip.word.error.max", { maxLength, length }));
  }
}

export const useInputFilter = () => {
  const dispatch = useDispatch();

  const inputFilter = (inputElement) => {
    try {
      const string = htmlToString(inputElement);
      // const purifiedString = DOMPurify.sanitize(string)
      checkWord(string);
      return Promise.resolve(string);
    } catch (e) {
      if (e instanceof ValidationError) {
        dispatch(setConsole(e.message));
      } else {
        console.log("InputFilter error", e);
      }
      return Promise.reject(e);
    }
  }

  return inputFilter;
}

/* --- Paste auto to plain text --- */
export const pasteAsPlain = (e) => {
  const text = (e.originalEvent || e).clipboardData.getData("text/plain");
  document.execCommand("insertText", false, text);//deprecated
  console.log("Paste as plain", text);
  e.preventDefault();
}

/* --- Scroll to a element with animation --- */
export const scrollTo = (elementId) => {
  const element = document.getElementById(elementId);
  if (!element) return;
  const buffer = document.getElementById("header").offsetHeight;
  window.scrollTo({ top: element.offsetTop - buffer, behavior: "smooth" });
}