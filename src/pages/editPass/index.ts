import UserController from '../../controllers/UserController';
import Block from '../../core/Block';
import { withStore } from '../../core/Store';
import { Link } from '../../components/link';
import { ProfileForm } from '../../components/profileForm';

import { TChangePassword } from '../../typing';

import tpl from './tpl.hbs';

export class EditPassPageBase extends Block {
  init() {
    this.children.form = new ProfileForm({
      isEditData: true,
      isEditPass: true,
      onSubmit: this.onSubmit,
    });

    this.children.linkBack = new Link({
      value: '',
      to: '/settings',
      attr: {
        class: 'profile-sidebar__link',
      },
    });
  }

  async onSubmit(data: TChangePassword) {
    await UserController.changePassword(data);
  }

  render() {
    return this.compile(tpl, {});
  }
}

const withUser = withStore((state) => ({ ...state.user }));

export const EditPassPage = withUser(EditPassPageBase);
