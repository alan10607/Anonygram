import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useJwt from "../../utli/useJwt";
import Header from "./Header";
import BigBox from "./BigBox";
import Art from "./Art";

export default function Hub() {
  const navigate = useNavigate();
  const [jwtToken, setJwtToken] = useJwt();

  useEffect(() => {
    if(!jwtToken) navigate("/login");
  }, jwtToken);

  return (
    <div>
      {/* <Header /> */}
      <Art />
      {/* <BigBox /> */}
    </div>
  )
}