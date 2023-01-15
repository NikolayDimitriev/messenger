import tpl from "./tpl.hbs";
import { dialogues } from "../../../data";
import "./style.scss";

export default () => {
  return tpl(dialogues);
};
