import UserController from '../../controllers/UserController';
import { Block } from '../../core/Block';
import { Link } from '../../components/link';
import { ProfileForm } from '../../components/profileForm';

import { TChangePassword } from '../../typing';

import tpl from './tpl.hbs';

export class EditPassPage extends Block {
  constructor() {
    super({});
  }

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

  onSubmit(data: TChangePassword) {
    UserController.changePassword(data);
  }

  render() {
    return this.compile(tpl, {});
  }
}
