import Block from '../../core/Block';
import { TProps } from '../../typing';
import { UserListChatModal } from '../userListChatModal';

import tpl from './tpl.hbs';
import './style.scss';
import { Button } from '../button';

type TSettingChatModalProps = TProps & {
  isOpen: boolean;
  onRemoveChat: () => void;
};

export class SettingChatModal extends Block {
  constructor(props: TSettingChatModalProps) {
    super(props);
  }

  init() {
    this.children.listUsers = new Button({
      value: 'Список пользователей',
      attr: {
        class: 'chat-modal__btn',
      },
      events: {
        click: () => {
          this.setProps({ isOpen: false });
          // this.children.userListChatModal).setProps({
          //   isOpen: true,
          // });
        },
      },
    });

    this.children.removeChatBtn = new Button({
      value: 'Удалить чат',
      attr: {
        class: 'chat-modal__btn chat-modal__btn--red',
      },
      events: {
        click: () => {
          this.props.onRemoveChat();
          this.setProps({ isOpen: false });
        },
      },
    });

    this.children.userListChatModal = new UserListChatModal({
      isOpen: false,
    });
  }

  render() {
    return this.compile(tpl, { ...this.props });
  }
}
