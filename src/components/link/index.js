import tpl from "./tpl.hbs";

export default (href, value) => {
  return tpl({ href, value });
};
