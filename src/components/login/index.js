import tpl from "./tpl.hbs";
import "./style.scss";

export default ({ title, form }) => {
  return tpl({ title, form });
};
