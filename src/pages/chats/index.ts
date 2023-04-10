import Block from '../../core/Block';
import { Link } from '../../components/link';
import { ChatsList } from '../../components/chatList';
import { Messenger } from '../../components/messenger';
import { ChatModal } from '../../components/chatModal';
import { Button } from '../../components/button';

import tpl from './tpl.hbs';
import './style.scss';

export class ChatPage extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.link = new Link({
      value: 'Профиль >',
      to: '/settings',
    });

    this.children.chatsList = new ChatsList({});

    this.children.messenger = new Messenger({});

    this.children.addChatsBtn = new Button({
      value: 'Создать новый чат',
      attr: {
        class: 'main-btn',
      },
      events: {
        click: (e) => {
          const target = e?.target as HTMLDivElement;
          if (target && target.classList.contains('main-btn')) {
            (this.children.chatModal as ChatModal).openModal();
          }

          (this.children.chatModal as ChatModal).setInputValue('');
        },
      },
    });

    this.children.chatModal = new ChatModal({
      events: {
        click: (e) => {
          const target = e?.target as HTMLElement;
          if (target && !target.closest('.modal-chat')) {
            (this.children.chatModal as ChatModal).closeModal();
          }
        },
      },
    });
  }

  render() {
    return this.compile(tpl, {});
  }
}
