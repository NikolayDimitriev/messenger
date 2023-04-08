import AuthController from '../../controllers/AuthController';
import Block from '../../core/Block';
import tpl from './tpl.hbs';
import { Login } from '../../components/login';
import { TSignUpData } from '../../typing';
import { signUp } from '../../mock';

export class SignUpPage extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.login = new Login({
      title: 'Регистрация',
      dataInputs: signUp,
      buttonValue: 'Зарегистрироваться',
      linkValue: 'Войти',
      linkHref: '/',
      onSubmit: async (data: TSignUpData) => {
        await AuthController.signup(data);
      },
    });
  }

  render() {
    return this.compile(tpl, {});
  }
}
