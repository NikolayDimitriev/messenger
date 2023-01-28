import tpl from './tpl.hbs'
import './style.scss'

type TProps = {
	value: string;
	className?: string;
	onClick?: string;
}

export default ({ value, className = 'main-btn', onClick = '' }: TProps) => {
	return tpl({ value, className, onClick })
}
