import Block from '../../core/Block';
import { withStore } from '../../core/Store';
import { ChatUser } from '../chatUser';

import { isEqual } from '../../utils/isEqual';
import { TProps, TUser } from '../../typing';
import tpl from './tpl.hbs';
import './style.scss';

type TUserListChatModalProps = TProps & {
  users: Array<TUser & { role: string }> | undefined;
  isOpen: boolean;
  selectedChatId: number | undefined;
};

export class UserListChatModalBase extends Block<TUserListChatModalProps> {
  constructor(props: TUserListChatModalProps) {
    super(props);
  }

  init() {
    if (this.props.users) {
      this.children.users = this._createUsers(this.props.users);
    }
  }

  protected componentDidUpdate(
    oldProps: TUserListChatModalProps,
    newProps: TUserListChatModalProps
  ): boolean {
    const response = !isEqual(oldProps, newProps);
    if (response && this.props.users) {
      this.children.users = this._createUsers(newProps.users!);
    }

    return response;
  }

  private _createUsers(props: Array<TUser & { role: string }>) {
    return props?.map(
      (user) =>
        new ChatUser({
          ...user,
          avatar: user.avatar
            ? `https://ya-praktikum.tech/api/v2/resources/${user.avatar}`
            : '',
          initialAvatar: user.avatar,
          role: user.role === 'admin' ? user.role : '',
          isAdd: false,
          selectedChatId: this.props.selectedChatId!,
        })
    );
  }

  render() {
    return this.compile(tpl, { ...this.props });
  }
}

const withSelectedChatUsers = withStore((state) => {
  return {
    selectedChatId: state.selectedChat,
    users: state.usersSelectedChat,
  };
});

export const UserListChatModal = withSelectedChatUsers(
  UserListChatModalBase as unknown as typeof Block
);
