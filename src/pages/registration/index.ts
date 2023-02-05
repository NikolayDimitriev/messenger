import { Block, TProps } from '../../utils/Block';
import tpl from './tpl.hbs';
import { Login } from '../../components/login';
import { signUp } from '../../data';

export class RegistrationPage extends Block<TProps> {
  constructor(props: TProps) {
    super('div', props);
  }

  init() {
    this.children.login = new Login({
      title: 'Регистрация',
      data: signUp,
      buttonValue: 'Зарегистрироваться',
      linkValue: 'Войти',
      linkHref: '/auth',
      attr: {
        class: 'login',
      },
    });
  }

  render() {
    return this.compile(tpl, {});
  }
}
