import UserController from '../../controllers/UserController';
import store, { withStore } from '../../core/Store';
import { Block } from '../../core/Block';
import { Link } from '../../components/link';
import { ProfileForm } from '../../components/profileForm';

import tpl from './tpl.hbs';

import { isEqual } from '../../utils/isEqual';
import { TChangeProfileData } from '../../typing';

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

  onSubmit(data: TChangeProfileData) {
    // отфильтровал данные для проверки
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { avatar, id, ...userData } = store.getState().user.data;

    if (!isEqual(data, userData)) {
      UserController.changeProfileData(data);
    }
  }

  render() {
    return this.compile(tpl, {});
  }
}

const withUser = withStore((state) => ({ ...state.user.data }));

export const EditDataPage = withUser(EditDataPageBase);
