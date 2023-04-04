import { Block } from '../../core/Block';
import { Link } from '../../components/link';
import { Button } from '../../components/button';
import { Form } from '../../components/form';
import tpl from './tpl.hbs';

import avatar from '../../../static/avatar.svg';
import { user } from '../../data';

import './style.scss';
import { withStore } from '../../core/Store';
import AuthController from '../../controllers/AuthController';

class ProfilePageBase extends Block {
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
      // events: {
      //   click: changeUserInfo.bind(this),
      // },
    });

    this.children.changePasswordBtn = new Button({
      value: 'Изменить пароль',
      attr: {
        class: 'profile-wrapper__btn profile-wrapper__btn--primary',
      },
      // events: {
      //   click: changePassword.bind(this),
      // },
    });

    this.children.link = new Link({
      value: 'Выйти',
      to: '/',
      attr: {
        class: 'profile-wrapper__btn profile-wrapper__btn--red',
      },
      events: {
        click: () => {
          AuthController.logout();
        },
      },
    });

    this.children.linkBack = new Link({
      value: '',
      to: '/messenger',
      attr: {
        class: 'profile-sidebar__link',
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

// function changeUserInfo(this: typeof ProfilePageBase) {
//   this.children.form = new Form({
//     data: user.fields,
//     inputBlockClass: 'profile-field',
//     disabled: false,
//     button: new Button({
//       value: 'Сохранить',
//       attr: {
//         class: 'main-btn',
//         type: 'submit',
//       },
//     }),
//     attr: {
//       class: 'profile-wrapper__fields',
//     },
//   });

//   const actions = document.querySelector<HTMLElement>(
//     '.profile-wrapper__actions'
//   );

//   if (actions) {
//     actions.style.display = 'none';
//   }
// }

// function changePassword(this: typeof ProfilePageBase) {
//   this.children.form = new Form({
//     data: user.passwords,
//     inputBlockClass: 'profile-field',
//     disabled: false,
//     button: new Button({
//       value: 'Сохранить',
//       attr: {
//         class: 'main-btn',
//         type: 'submit',
//       },
//     }),
//     attr: {
//       class: 'profile-wrapper__fields',
//     },
//   });

//   const actions = document.querySelector<HTMLElement>(
//     '.profile-wrapper__actions'
//   );

//   if (actions) {
//     actions.style.display = 'none';
//   }
// }

const withUser = withStore((state) => ({ ...state.user }));

export const ProfilePage = withUser(ProfilePageBase);
