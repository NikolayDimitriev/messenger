import Block from '../../core/Block';
import UserController from '../../controllers/UserController';
import store, { withStore } from '../../core/Store';
import { ChatUser } from '../chatUser';
import { Input } from '../input';

import { isEqual } from '../../utils/isEqual';
import { TProps, TUser } from '../../typing';
import tpl from './tpl.hbs';
import './style.scss';
import { Button } from '../button';

type TAddToChatUsersModalProps = TProps & {
  isOpen: boolean;
  users: TUser[];
  selectedChatId: number | undefined;
};

export class AddToChatUsersModalBase extends Block<TAddToChatUsersModalProps> {
  constructor(props: TAddToChatUsersModalProps) {
    super(props);
  }

  init() {
    this.children.users = this._createUsers(this.props.users);

    this.children.input = new Input({
      attr: {
        placeholder: 'Логин',
        class: 'chat-add__input',
      },
    });

    this.children.btnSearch = new Button({
      value: 'Поиск',
      attr: {
        class: 'chat-add__search',
      },
      events: {
        click: async () => {
          const inputValue = (
            (this.children.input as Input).getContent() as HTMLInputElement
          ).value;
          if (inputValue === '') {
            return;
          }
          await UserController.searchUsers(inputValue);
        },
      },
    });
  }

  protected componentDidUpdate(
    oldProps: TAddToChatUsersModalProps,
    newProps: TAddToChatUsersModalProps
  ): boolean {
    const response = !isEqual(oldProps, newProps);
    if (response) {
      this.children.users = this._createUsers(newProps.users!);
    }

    return response;
  }

  private _createUsers(props: TUser[]) {
    return props.map(
      (user) =>
        new ChatUser({
          ...user,
          avatar: user.avatar
            ? `https://ya-praktikum.tech/api/v2/resources${user.avatar}`
            : '',
          initialAvatar: user.avatar,
          role: 'delete',
          isAdd: true,
          selectedChatId: this.props.selectedChatId!,
          onAdded: () => {
            (
              (this.children.input as Input).getContent() as HTMLInputElement
            ).value = '';
            store.set('searchedUsers', undefined);
            this.setProps({ isOpen: false });
          },
        })
    );
  }

  render() {
    return this.compile(tpl, { ...this.props });
  }
}

const withSearchedUsers = withStore((state) => ({
  selectedChatId: state.selectedChat,
  users: state.searchedUsers || [],
}));

export const AddToChatUsersModal = withSearchedUsers(
  AddToChatUsersModalBase as unknown as typeof Block
);
