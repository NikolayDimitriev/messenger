import { Block } from '../../core/Block';
import tpl from './tpl.hbs';
import { Link } from '../../components/link';
import { Dialogue } from '../../components/dialogues';
import { MessagesBlock } from '../../components/messagesBlock';
import { ChatForm } from '../../components/chatForm';
import { withStore } from '../../core/Store';

import { dialogues } from '../../data';
import { messages } from '../../data';

import chatMenuDots from '../../../static/chat-menu-dots.svg';

import './style.scss';

class ChatPageBase extends Block {
  init() {
    this.children.link = new Link({
      value: 'Профиль >',
      to: '/settings',
    });

    this.children.dialogues = dialogues.map(
      (dialogue) =>
        new Dialogue({
          name: dialogue.user.name,
          owner: dialogue.lastMessage.owner,
          text: dialogue.lastMessage.text,
          date: dialogue.lastMessage.date,
          count: dialogue.newMessagesCount,
        })
    );

    this.children.messagesBlock = messages.map(
      (messageBlock) =>
        new MessagesBlock({
          date: messageBlock.date,
          messages: messageBlock.messages,
        })
    );

    this.children.chatForm = new ChatForm({});
  }

  render() {
    return this.compile(tpl, {
      chatMenuDots,
    });
  }
}

const withChat = withStore((state) => ({
  user: state.user,
}));

export const Chats = withChat(ChatPageBase);
