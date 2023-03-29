import { Block } from '../../core/Block';
import tpl from './tpl.hbs';
import { Login } from '../../components/login';
import { signUp } from '../../data';

export class RegistrationPage extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.login = new Login({
      title: 'Регистрация',
      data: signUp,
      buttonValue: 'Зарегистрироваться',
      linkValue: 'Войти',
      linkHref: '/auth',
    });
  }

  render() {
    return this.compile(tpl, {});
  }
}
