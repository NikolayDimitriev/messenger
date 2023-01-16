import tpl from "./tpl.hbs";
import "./style.scss";
import button from "../../components/button";
import link from "../../components/link";
import form from "../../components/form";
import { logIn } from "../../../data";

export default () => {
  return tpl({
    form: form({
      data: logIn,
      button: button({
        value: "Авторизоваться",
        className: "main-btn",
      }),
      link: link({
        href: "/registration",
        value: "Нет аккаунта?",
        className: "form-link",
      }),
    }),
  });
};
