import tpl from './tpl.hbs'
import './style.scss'

export default ({ href, value, className }) => {
	return tpl({ href, value, className })
}
