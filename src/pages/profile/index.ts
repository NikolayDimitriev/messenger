import Block, { TProps } from '../../utils/Block';
import Link from '../../components/link';
import Button from '../../components/button';
import Form from '../../components/form';
import tpl from './tpl.hbs';

import avatar from '../../../static/avatar.svg';
import { user } from '../../data';

import './style.scss';

export default class ProfilePage extends Block<TProps> {
  constructor(props: TProps) {
    super('div', props);
  }

  init() {
    this.children.form = new Form({
      data: user.fields,
      inputBlockClass: 'profile-field',
      disabled: true,
      attr: {
        class: 'profile-wrapper__fields',
      },
    });

    this.children.changeUserInfoBtn = new Button({
      value: 'Изменить данные',
      attr: {
        class: 'profile-wrapper__btn profile-wrapper__btn--primary',
      },
      events: {
        click: changeUserInfo.bind(this),
      },
    });

    this.children.changePasswordBtn = new Button({
      value: 'Изменить пароль',
      attr: {
        class: 'profile-wrapper__btn profile-wrapper__btn--primary',
      },
      events: {
        click: changePassword.bind(this),
      },
    });

    this.children.link = new Link({
      value: 'Выйти',
      attr: {
        href: '/chats',
        class: 'profile-wrapper__btn profile-wrapper__btn--red',
      },
    });
  }

  render() {
    return this.compile(tpl, {
      avatar,
      name: user.shortFormat.first_name,
    });
  }
}

function changeUserInfo(this: ProfilePage) {
  this.children.form = new Form({
    data: user.fields,
    inputBlockClass: 'profile-field',
    disabled: false,
    button: new Button({
      value: 'Сохранить',
      attr: {
        class: 'main-btn',
        type: 'submit',
      },
    }),
    attr: {
      class: 'profile-wrapper__fields',
    },
  });

  const actions = document.querySelector<HTMLElement>(
    '.profile-wrapper__actions'
  );

  if (actions) {
    actions.style.display = 'none';
  }
}

function changePassword(this: ProfilePage) {
  this.children.form = new Form({
    data: user.passwords,
    inputBlockClass: 'profile-field',
    disabled: false,
    button: new Button({
      value: 'Сохранить',
      attr: {
        class: 'main-btn',
        type: 'submit',
      },
    }),
    attr: {
      class: 'profile-wrapper__fields',
    },
  });

  const actions = document.querySelector<HTMLElement>(
    '.profile-wrapper__actions'
  );

  if (actions) {
    actions.style.display = 'none';
  }
}
