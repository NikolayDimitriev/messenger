import Block, { TProps } from '../../utils/Block';
import tpl from './tpl.hbs';
import Link from '../../components/link';
import Dialogue from '../../components/dialogues';
// import Messages from '../../components/messages';

import { TDialogue } from '../../data/data.props';
import { dialogues as data } from '../../data';

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

    // Не знаю как пофиксить
    // Type 'Dialogue[]' is missing the following properties from type 'Block<TProps>': id...
    this.children.dialogues = (data as any).map(
      (dialogue: TDialogue) =>
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
  }

  render() {
    return this.compile(tpl, {
      attach,
      chatMenuDots,
    });
  }
}

// export default () => {
// 	return tpl({
// 		link: link({
// 			href: '/profile',
// 			value: 'Профиль >',
// 		}),
// 		dialogues: dialogues(),
// 		messages: messages(),
// 		chatMenuDots,
// 		attach,
// 	});
// };
