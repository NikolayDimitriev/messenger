import { Block } from '../../core/Block';
import { TProps } from '../../typing';

import tpl from './tpl.hbs';
import './style.scss';
import { Button } from '../button';

type TAddUserModalProps = TProps & {
  isOpen: boolean;
  onRemoveChat: () => void;
};

export class AddUserModal extends Block {
  constructor(props: TAddUserModalProps) {
    super(props);
  }

  init() {
    this.children.addUserBtn = new Button({
      value: 'Добавить пользователя',
      attr: {
        class: 'chat-modal__btn',
      },
    });
    this.children.removeUserBtn = new Button({
      value: 'Удалить пользователя',
      attr: {
        class: 'chat-modal__btn chat-modal__btn--red',
      },
    });
    this.children.removeChatBtn = new Button({
      value: 'Удалить чат',
      attr: {
        class: 'chat-modal__btn chat-modal__btn--red',
      },
      events: {
        click: this.props.onRemoveChat,
      },
    });
  }

  render() {
    return this.compile(tpl, { ...this.props });
  }
}
