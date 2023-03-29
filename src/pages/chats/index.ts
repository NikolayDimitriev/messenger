import { Block } from '../../core/Block';
import tpl from './tpl.hbs';
import { Link } from '../../components/link';
import { Dialogue } from '../../components/dialogues';
import { MessagesBlock } from '../../components/messagesBlock';
import { ChatForm } from '../../components/chatForm';

import { dialogues } from '../../data';
import { messages } from '../../data';

import chatMenuDots from '../../../static/chat-menu-dots.svg';

import './style.scss';

export class ChatPage extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.link = new Link({
      value: 'Профиль >',
      to: '/profile',
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
