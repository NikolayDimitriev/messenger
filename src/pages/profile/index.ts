import tpl from './tpl.hbs'
import avatar from '../../../static/avatar.svg'
import profileInputs from '../../components/profileInputs'
import button from '../../components/button'
import link from '../../components/link'
import { user } from '../../data'
import './style.scss'

const changeUserInfo = () => {
	const inputs = document.querySelectorAll('.profile-field__input')
	document.querySelector<HTMLElement>(
		'.profile-wrapper__actions'
	).style.display = 'none'
	document.querySelector<HTMLElement>('.profile-wrapper__save').style.display =
		'block'

	inputs.forEach((input) => {
		input.removeAttribute('disabled')
	})
}

const saveInfo = () => {
	const inputs = document.querySelectorAll('.profile-field__input')
	document.querySelector<HTMLElement>(
		'.profile-wrapper__fields'
	).style.display = 'block'
	document.querySelector<HTMLElement>('.profile-wrapper__save').style.display =
		'none'
	document.querySelector<HTMLElement>(
		'.profile-wrapper__passwords'
	).style.display = 'none'
	document.querySelector<HTMLElement>(
		'.profile-wrapper__actions'
	).style.display = 'flex'

	inputs.forEach((input) => {
		input.setAttribute('disabled', '')
	})
}

const changePassword = () => {
	document.querySelector<HTMLElement>(
		'.profile-wrapper__fields'
	).style.display = 'none'
	document.querySelector<HTMLElement>(
		'.profile-wrapper__passwords'
	).style.display = 'block'
	document.querySelector<HTMLElement>(
		'.profile-wrapper__actions'
	).style.display = 'none'
	document.querySelector<HTMLElement>('.profile-wrapper__save').style.display =
		'block'
}

export default () => {
	return tpl({
		avatar: avatar,
		name: user.shortFormat.first_name,
		fields: profileInputs({ data: user.inputs }),
		passwords: profileInputs({ data: user.passwords }),
		link: link({
			href: '/chats',
			value: 'Выйти',
			className: 'profile-wrapper__btn profile-wrapper__btn--red',
		}),
		button: button({
			value: 'Сохранить',
			onClick: 'saveInfo()',
		}),
	})
}
