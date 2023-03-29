import { Block } from '../../core/Block';
import tpl from './tpl.hbs';
import { Login } from '../../components/login';
import { logIn } from '../../data';

export class AuthPage extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.login = new Login({
      title: 'Вход',
      data: logIn,
      buttonValue: 'Авторизоваться',
      linkValue: 'Нет аккаунта?',
      linkHref: '/registration',
    });
  }

  render() {
    return this.compile(tpl, {});
  }
}
