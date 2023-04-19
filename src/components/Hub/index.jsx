import React from "react";
import Header from "./Header";
import New from "./New";
import Setting from "./Setting";
import Art from "./Art";

export default function Hub() {
  return (
    <div id="hub">
      <Header />
      <New />
      <Setting />
      <Art />
    </div>
  )
}