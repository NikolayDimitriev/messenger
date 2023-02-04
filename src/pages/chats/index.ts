import Block, { TProps } from '../../utils/Block';
import tpl from './tpl.hbs';
import Link from '../../components/link';
import Dialogue from '../../components/dialogues';
import MessagesBlock from '../../components/messagesBlock';

import { dialogues } from '../../data';
import { messages } from '../../data';

import attach from '../../../static/attach.svg';
import chatMenuDots from '../../../static/chat-menu-dots.svg';

import './style.scss';

export default class Chat extends Block<TProps> {
  constructor(props: TProps) {
    super('div', props);
  }

  init() {
    this.children.link = new Link({
      value: 'Профиль >',
      attr: {
        href: '/profile',
      },
    });

    this.children.dialogues = dialogues.map(
      (dialogue) =>
        new Dialogue({
          name: dialogue.user.name,
          owner: dialogue.lastMessage.owner,
          text: dialogue.lastMessage.text,
          date: dialogue.lastMessage.date,
          count: dialogue.newMessagesCount,
          attr: {
            class: 'dialogue',
          },
        })
    );

    this.children.messagesBlock = messages.map(
      (messageBlock) =>
        new MessagesBlock({
          date: messageBlock.date,
          messages: messageBlock.messages,
          attr: {
            class: 'messages',
          },
        })
    );
  }

  render() {
    return this.compile(tpl, {
      attach,
      chatMenuDots,
    });
  }
}
