import { Block } from '../../core/Block';
import { Link } from '../../components/link';
import tpl from './tpl.hbs';
import { TChangeProfileData } from '../../typing';
import UserController from '../../controllers/UserController';

import { withStore } from '../../core/Store';
import { ProfileForm } from '../../components/profileForm';

class EditDataPageBase extends Block {
  init() {
    this.children.form = new ProfileForm({
      ...this.props,
      isEditData: true,
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

  onSubmit(data: TChangeProfileData) {
    UserController.changeProfileData(data);
  }

  render() {
    return this.compile(tpl, {});
  }
}

const withUser = withStore((state) => ({ ...state.user.data }));

export const EditDataPage = withUser(EditDataPageBase);
