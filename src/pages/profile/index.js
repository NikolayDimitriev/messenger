import tpl from "./tpl.hbs";
import avatar from "../../../static/avatar.svg";
import profileInputs from "../../components/profileInputs";
import { user } from "../../../data";
import "./style.scss";

export default () => {
  return tpl({
    avatar: avatar,
		name: user.shortFormat.first_name,
    fields: profileInputs({ data: user.inputs }),
    passwords: profileInputs({ data: user.passwords }),
  });
};
