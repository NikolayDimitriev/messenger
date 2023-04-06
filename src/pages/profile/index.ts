import AuthController from '../../controllers/AuthController';
import UserController from '../../controllers/UserController';
import { Block } from '../../core/Block';
import { Link } from '../../components/link';
import { Button } from '../../components/button';
import { ProfileForm } from '../../components/profileForm';
import { Avatar } from '../../components/avatar';

import { withStore } from '../../core/Store';

import avatarStatic from '../../../static/avatar.svg';
import './style.scss';
import tpl from './tpl.hbs';
import { ModalAvatar } from '../../components/modalAvatar';
import { ModalForm } from '../../components/modalForm';

class ProfilePageBase extends Block {
  init() {
    this.children.avatar = new Avatar({
      avatarSrc: this.props.avatar
        ? `https://ya-praktikum.tech/api/v2/resources/${this.props.avatar}`
        : avatarStatic,
      name: this.props.display_name ?? this.props.first_name,
      events: {
        click: (e) => {
          const target = e?.target as HTMLDivElement;
          if (target && target.closest('.profile-wrapper__avatar')) {
            (this.children.modalAvatar as ModalAvatar)
              .getContent()
              ?.classList.add('modal--active');
          }
        },
      },
    });

    this.children.form = new ProfileForm({
      ...this.props,
      isEditData: false,
      isEditPass: false,
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

    this.children.modalAvatar = new ModalAvatar({
      title: 'Загрузите файл',
      fileName: 'Выбрать файл на компьютере',
      onSubmit: (e: Event) => {
        e.preventDefault();
        if (e.target) {
          const target = e.target as HTMLFormElement;
          const formData = new FormData();
          const input = target[0] as HTMLInputElement;

          if (input.files?.length) {
            const file = input.files[0];
            formData.append('avatar', file);
            UserController.changeAvatar(formData);
          }
        }
      },
      onChange: (e: Event) => {
        let fileName = 'Выбрать файл на компьютере';
        const target = e.target as HTMLInputElement;
        if (!target) {
          return;
        }
        const files = target.files;

        if (!files || !files.length) {
          return;
        }

        fileName = files[0].name;

        (this.children.modalAvatar as ModalAvatar).updateProps({
          title: 'Файл загружен',
        });

        (
          (this.children.modalAvatar as ModalAvatar).children.form as ModalForm
        ).updateProps({
          fileName,
        });
      },
      events: {
        click: (e) => {
          const target = e?.target as HTMLElement;
          if (target && !target.closest('.modal-dialog')) {
            (this.children.modalAvatar as ModalAvatar)
              .getContent()
              ?.classList.remove('modal--active');
          }
        },
      },
    });
  }

  render() {
    return this.compile(tpl, {});
  }
}

const withUser = withStore((state) => ({ ...state.user.data }));

export const ProfilePage = withUser(ProfilePageBase);
