import tpl from './tpl.hbs'
import './style.scss'

type TProps = {
	errorCode: string
	errorText: string;
	link: () => void;
}

export default ({ errorCode, errorText, link }: TProps) => {
	return tpl({ errorCode, errorText, link })
}
