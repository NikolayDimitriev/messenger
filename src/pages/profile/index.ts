import Block, { TProps } from '../../utils/Block';
import Link from '../../components/link';
import Button from '../../components/button';
import Input from '../../components/input';
import tpl from './tpl.hbs';

import avatar from '../../../static/avatar.svg';
import { user } from '../../data';

import './style.scss';

export default class ProfilePage extends Block<TProps> {
  constructor(props: TProps) {
    super('div', props);
  }

  init() {
    this.children.fields = user.fields.map(
      (input) =>
        new Input({
          id: input.id,
          labelText: input.labelText,
          name: input.name,
          inputType: input.inputType,
          value: input.value,
          disabled: input.disabled,
          inputClass: input.inputClass,
          labelClass: input.labelClass,
          attr: {
            class: 'profile-field',
          },
        })
    );

    this.children.passwords = user.passwords.map(
      (input) =>
        new Input({
          id: input.id,
          labelText: input.labelText,
          name: input.name,
          inputType: input.inputType,
          value: input.value,
          disabled: input.disabled,
          inputClass: input.inputClass,
          labelClass: input.labelClass,
          attr: {
            class: 'profile-field',
          },
        })
    );

    this.children.changeUserInfoBtn = new Button({
      value: 'Изменить данные',
      attr: {
        class: 'profile-wrapper__btn profile-wrapper__btn--primary',
      },
      events: {
        click: changeUserInfo,
      },
    });

    this.children.changePasswordBtn = new Button({
      value: 'Изменить пароль',
      attr: {
        class: 'profile-wrapper__btn profile-wrapper__btn--primary',
      },
      events: {
        click: changePassword,
      },
    });

    this.children.link = new Link({
      value: 'Выйти',
      attr: {
        href: '/chats',
        class: 'profile-wrapper__btn profile-wrapper__btn--red',
      },
    });

    this.children.buttonSave = new Button({
      value: 'Сохранить',
      attr: {
        class: 'main-btn',
      },
      events: {
        click: saveInfo,
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

function changeUserInfo() {
  const inputs = document.querySelectorAll('.profile-field__input');
  document.querySelector<HTMLElement>(
    '.profile-wrapper__actions'
  ).style.display = 'none';
  document.querySelector<HTMLElement>('.profile-wrapper__save').style.display =
    'block';

  inputs.forEach((input) => {
    input.removeAttribute('disabled');
  });
}

function saveInfo() {
  const inputs = document.querySelectorAll('.profile-field__input');
  document.querySelector<HTMLElement>(
    '.profile-wrapper__fields'
  ).style.display = 'block';
  document.querySelector<HTMLElement>('.profile-wrapper__save').style.display =
    'none';
  document.querySelector<HTMLElement>(
    '.profile-wrapper__passwords'
  ).style.display = 'none';
  document.querySelector<HTMLElement>(
    '.profile-wrapper__actions'
  ).style.display = 'flex';

  inputs.forEach((input) => {
    input.setAttribute('disabled', '');
  });
}

function changePassword() {
  document.querySelector<HTMLElement>(
    '.profile-wrapper__fields'
  ).style.display = 'none';
  document.querySelector<HTMLElement>(
    '.profile-wrapper__passwords'
  ).style.display = 'block';
  document.querySelector<HTMLElement>(
    '.profile-wrapper__actions'
  ).style.display = 'none';
  document.querySelector<HTMLElement>('.profile-wrapper__save').style.display =
    'block';
}
