import tpl from "./tpl.hbs";
import link from "../../components/link";
import dialogues from '../../components/dialogues'
import "./style.scss";

export default () => {
  return tpl({ link: link("/setting", "Профиль >"), dialogues: dialogues() });
};
