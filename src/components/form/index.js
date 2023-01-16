import tpl from "./tpl.hbs";
import "./style.scss";
import inputs from "../inputs";

export default ({ data, button, link }) => {
  return tpl({
    inputs: inputs({ data }),
    button,
    link,
  });
};
