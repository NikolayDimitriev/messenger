import Block from '../../core/Block';
import store, { withStore } from '../../core/Store';
import { ChatUser } from '../chatUser';
import { Input } from '../input';

import { isEqual } from '../../utils/isEqual';
import { TProps, TUserProps } from '../../typing';
import tpl from './tpl.hbs';
import './style.scss';
import { Button } from '../button';
import UserController from '../../controllers/UserController';

type TAddToChatUsersModalProps = TProps & {
  isOpen: boolean;
  users: TUserProps[];
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
      },
    });

    this.children.btnSearch = new Button({
      value: 'Поиск',
      attr: {
        class: '',
      },
      events: {
        click: () => {
          const inputValue = (
            (this.children.input as Input).getContent() as HTMLInputElement
          ).value;
          if (inputValue === '') {
            return;
          }
          UserController.searchUsers(inputValue);
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

  private _createUsers(props: TUserProps[]) {
    return props.map(
      (user) =>
        new ChatUser({
          ...user,
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
