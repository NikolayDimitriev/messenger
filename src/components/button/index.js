import tpl from "./tpl.hbs";
import './style.scss';

export default ({ value, className }) => {
  return tpl({ value, className });
};
