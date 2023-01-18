import tpl from './tpl.hbs'
import './style.scss'

export default ({ errorCode, errorText, link }) => {
	return tpl({ errorCode, errorText, link })
}
