import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useJwt from "../../utli/useJwt";
import Header from "./Header";
import BigBox from "./BigBox";
import Art from "./Art";

export default function Hub() {
  const navigate = useNavigate();
  const { jwt } = useJwt();

  useEffect(() => {
    console.log("Check jwtToken", jwt)
    if(!jwt) navigate("/login");
  }, [jwt]);

  return (
    <div>
      <Header />
      <BigBox />
      <Art />
    </div>
  )
}