import tpl from "./tpl.hbs";
import link from "../../components/link";
import dialogues from "../../components/dialogues";

import attach from "../../../static/attach.svg";
import chatMenuDots from "../../../static/chat-menu-dots.svg";

import "./style.scss";

export default () => {
  return tpl({
    link: link({
      href: "/profile",
      value: "Профиль >",
    }),
    dialogues: dialogues(),
    chatMenuDots,
    attach,
  });
};
