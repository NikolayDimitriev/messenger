import UserController from '../../controllers/UserController';
import store, { withStore } from '../../core/Store';
import Block from '../../core/Block';
import { Link } from '../../components/link';
import { ProfileForm } from '../../components/profileForm';

import { isEqual } from '../../utils/isEqual';
import { TChangeProfileData } from '../../typing';
import tpl from './tpl.hbs';

class EditDataPageBase extends Block {
  init() {
    this.children.form = new ProfileForm({
      ...this.props,
      isEditData: true,
      isEditPass: false,
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

  async onSubmit(data: TChangeProfileData) {
    // отфильтровал данные для проверки
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { avatar, id, ...userData } = store.getState().user;

    if (!isEqual(data, userData)) {
      await UserController.changeProfileData(data);
    }
  }

  render() {
    return this.compile(tpl, {});
  }
}

const withUser = withStore((state) => ({ ...state.user }));

export const EditDataPage = withUser(EditDataPageBase);
