import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useJwt from "../../utli/useJwt";
import Header from "./Header";
import New from "./New";
import Setting from "./Setting";
import Art from "./Art";

export default function Hub() {
  const navigate = useNavigate();
  const { jwt } = useJwt();

  useEffect(() => {
    if(!jwt) {
      console.log("Hub check jwt not found");
      navigate("/login");
    }
  }, [jwt]);

  return (
    <div>
      <Header />
      <New />
      <Setting />
      <Art />
    </div>
  )
}