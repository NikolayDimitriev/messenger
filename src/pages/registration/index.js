import tpl from "./tpl.hbs";
import { signUp } from "../../../data";
import login from "../../components/login";
import button from "../../components/button";
import link from "../../components/link";
import form from "../../components/form";

export default () => {
  return tpl({
    login: login({
      title: "Регистрация",
      form: form({
        data: signUp,
        button: button({
          value: "Зарегистрироваться",
        }),
        link: link({
          href: "/auth",
          value: "Войти",
          className: "form-link",
        }),
      }),
    }),
  });
};
