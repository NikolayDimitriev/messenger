import UserController from '../../controllers/UserController';
import { withStore } from '../../core/Store';
import { Block } from '../../core/Block';
import { Link } from '../../components/link';
import { ProfileForm } from '../../components/profileForm';
import { Avatar } from '../../components/avatar';

import { TChangePassword } from '../../typing';

import avatarStatic from '../../../static/avatar.svg';
import tpl from './tpl.hbs';

export class EditPassPageBase extends Block {
  init() {
    this.children.avatar = new Avatar({
      avatarSrc: this.props.avatar ?? avatarStatic,
      name: this.props.display_name ?? this.props.first_name,
    });

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

const withUser = withStore((state) => ({ ...state.user.data }));

export const EditPassPage = withUser(EditPassPageBase);
