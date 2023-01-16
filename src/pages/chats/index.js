import tpl from "./tpl.hbs";
import link from "../../components/link";
import dialogues from "../../components/dialogues";
import "./style.scss";

export default () => {
  return tpl({
    link: link({
      href: "/setting",
      value: "Профиль >",
    }),
    dialogues: dialogues(),
  });
};
