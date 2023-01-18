import tpl from "./tpl.hbs";
import { messages } from "../../../data";
import "./style.scss";

export default () => {
  return tpl(messages);
};
