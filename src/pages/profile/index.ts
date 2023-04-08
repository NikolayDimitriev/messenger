import AuthController from '../../controllers/AuthController';
import UserController from '../../controllers/UserController';
import Block from '../../core/Block';
import { withStore } from '../../core/Store';

import { Link } from '../../components/link';
import { Button } from '../../components/button';
import { ProfileForm } from '../../components/profileForm';
import { ProfileAvatar } from '../../components/profileAvatar';
import { ModalAvatar } from '../../components/modalAvatar';

import { isEqual } from '../../utils/isEqual';

import { TUser } from '../../typing';
import tpl from './tpl.hbs';
import './style.scss';

class ProfilePageBase extends Block<TUser> {
  constructor(props: TUser) {
    super(props);
  }

  init() {
    this.children.avatar = this._createAvatar(this.props);

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
        click: async (e: Event) => {
          e.preventDefault();
          await AuthController.logout();
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
      isOpen: false,
      onSubmit: async (e: Event) => {
        e.preventDefault();
        if (e.target) {
          const target = e.target as HTMLFormElement;
          const formData = new FormData();
          const input = target[0] as HTMLInputElement;

          if (input.files?.length) {
            const file = input.files[0];
            formData.append('avatar', file);

            await UserController.changeAvatar(formData);

            (this.children.modalAvatar as ModalAvatar).setProps({
              isOpen: false,
            });

            (this.children.modalAvatar as ModalAvatar).setProps({
              title: 'Загрузите файл',
            });

            (this.children.modalAvatar as ModalAvatar).setFileNamePropsToForm(
              'Выбрать файл на компьютере'
            );

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

        (this.children.modalAvatar as ModalAvatar).setProps({
          title: 'Файл загружен',
        });

        (this.children.modalAvatar as ModalAvatar).setFileNamePropsToForm(
          fileName
        );
      },

      events: {
        click: (e: Event) => {
          const target = e?.target as HTMLElement;
          if (target && target.classList.contains('modal--active')) {
            (this.children.modalAvatar as ModalAvatar).setProps({
              isOpen: false,
            });
          }
        },
      },
    });
  }

  protected componentDidUpdate(oldProps: TUser, newProps: TUser): boolean {
    const response = !isEqual(oldProps, newProps);
    if (response) {
      this.children.avatar = this._createAvatar(newProps);
    }

    return response;
  }

  private _createAvatar(props: TUser) {
    return new ProfileAvatar({
      avatarSrc: props.avatar
        ? `https://ya-praktikum.tech/api/v2/resources/${props.avatar}`
        : null,
      name: props.display_name ?? props.first_name,
      events: {
        click: (e) => {
          const target = e.target as HTMLDivElement;
          if (target && target.closest('.profile-wrapper__avatar')) {
            (this.children.modalAvatar as ModalAvatar).setProps({
              isOpen: true,
            });
          }
        },
      },
    });
  }

  render() {
    return this.compile(tpl, { ...this.props });
  }
}

const withUser = withStore((state) => ({ ...state.user }));

export const ProfilePage = withUser(ProfilePageBase as unknown as typeof Block);
