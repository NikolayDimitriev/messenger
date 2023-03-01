import { Block, TProps } from '../../core/Block';
import tpl from './tpl.hbs';
import { Login } from '../../components/login';
import { logIn } from '../../data';

export class AuthPage extends Block<TProps> {
  constructor(props: TProps) {
    super('div', props);
  }

  init() {
    this.children.login = new Login({
      title: 'Вход',
      data: logIn,
      buttonValue: 'Авторизоваться',
      linkValue: 'Нет аккаунта?',
      linkHref: '/registration',
      attr: {
        class: 'login',
      },
    });
  }

  render() {
    return this.compile(tpl, {});
  }
}
