import AuthController from '../../controllers/AuthController';
import { Block } from '../../core/Block';
import { Link } from '../../components/link';
import { Button } from '../../components/button';
import { ProfileForm } from '../../components/profileForm';

import { withStore } from '../../core/Store';

import './style.scss';
import tpl from './tpl.hbs';

class ProfilePageBase extends Block {
  init() {
    this.children.form = new ProfileForm({
      ...this.props,
      isEditData: false,
    });

    this.children.changeUserInfoLink = new Link({
      value: 'Изменить данные',
      to: '/settings-edit-data',
      attr: {
        class: 'profile-wrapper__btn profile-wrapper__btn--primary',
      },
    });

    this.children.changePasswordLink = new Link({
      value: 'Изменить пароль',
      to: '/settings-edit-pass',
      attr: {
        class: 'profile-wrapper__btn profile-wrapper__btn--primary',
      },
    });

    this.children.exitBtn = new Button({
      value: 'Выйти',
      attr: {
        class: 'profile-wrapper__btn profile-wrapper__btn--red',
      },
      events: {
        click: (e?: Event) => {
          e?.preventDefault();
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
    return this.compile(tpl, {});
  }
}

const withUser = withStore((state) => ({ ...state.user.data }));

export const ProfilePage = withUser(ProfilePageBase);
