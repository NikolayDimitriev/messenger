import tpl from './tpl.hbs'
import './style.scss'

export default ({ value, className = 'main-btn', onClick = '' }) => {
	return tpl({ value, className, onClick })
}
