import tpl from './tpl.hbs';
import './style.scss';

export default ({ data }) => {
	return tpl(data);
};
