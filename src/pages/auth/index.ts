import AuthController from '../../controllers/AuthController';
import Block from '../../core/Block';
import { Login } from '../../components/login';

import { TSignInData } from '../../typing';
import { logIn } from '../../mock';
import tpl from './tpl.hbs';

export class AuthPage extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.login = new Login({
      title: 'Вход',
      dataInputs: logIn,
      buttonValue: 'Авторизоваться',
      linkValue: 'Нет аккаунта?',
      linkHref: '/sign-up',
      onSubmit: (data: TSignInData) => {
        AuthController.signin(data);
      },
    });
  }

  render() {
    return this.compile(tpl, {});
  }
}
