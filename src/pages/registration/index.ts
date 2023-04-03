import { Block } from '../../core/Block';
import tpl from './tpl.hbs';
import { Login } from '../../components/login';
import { TSignUpData } from '../../api/AuthAPI';
import AuthController from '../../controllers/AuthController';
import { signUp } from '../../data';

export class RegistrationPage extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.login = new Login({
      title: 'Регистрация',
      dataInputs: signUp,
      buttonValue: 'Зарегистрироваться',
      linkValue: 'Войти',
      linkHref: '/auth',
      onSubmit: (data: TSignUpData) => {
        AuthController.signup(data);
      },
    });
  }

  render() {
    return this.compile(tpl, {});
  }
}
