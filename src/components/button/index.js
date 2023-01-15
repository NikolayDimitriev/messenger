import tpl from './tpl.hbs';
import './style.css';

export default (id, value) => {
    return tpl({id, value})
}