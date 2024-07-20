import "./logins.css";
import Loginform from "./loginform";
import Signup from "./signupform";
import { useState } from "react";
export default function Lframe({ setmessage }) {
  const [currpage, setcurrpage] = useState("login");
  let render;

  if (currpage === "login") {
    render = <Loginform setchange={setcurrpage} setmessage={setmessage} />;
  } else if (currpage === "signup") {
    render = <Signup setchange={setcurrpage} setmessage={setmessage} />;
  }
  return <div className="login-page">{render}</div>;
}
