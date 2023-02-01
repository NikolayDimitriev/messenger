import Block from '../../utils/Block';
import tpl from './tpl.hbs';
import button from '../../components/button';
import link from '../../components/link';
import form from '../../components/form';
import { logIn } from '../../data';
import login from '../../components/login';

export default class AuthPage extends Block {
  constructor() {
    super('div');
  }

  render() {
    console.log('auth');

    return this.compile(tpl, {});
  }
}

// export default () => {
// 	return tpl({
// 		login: login({
// 			title: 'Вход',
// 			form: form({
// 				data: logIn,
// 				button: button({
// 					value: 'Авторизоваться',
// 				}),
// 				link: link({
// 					href: '/registration',
// 					value: 'Нет аккаунта?',
// 					className: 'form-link',
// 				}),
// 			}),
// 		}),
// 	});
// };
