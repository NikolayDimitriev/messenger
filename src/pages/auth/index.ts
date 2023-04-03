import AuthController from '../../controllers/AuthController';
import { TSignInData } from '../../api/AuthAPI';
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
      dataInputs: logIn,
      buttonValue: 'Авторизоваться',
      linkValue: 'Нет аккаунта?',
      linkHref: '/registration',
      onSubmit: (data: TSignInData) => {
        AuthController.signin(data);
      },
    });
  }

  render() {
    return this.compile(tpl, {});
  }
}
