import { Block } from '../../core/Block';
import { Message } from '../message';
import { TMessageBlock } from '../../mock/mock.props';

import tpl from './tpl.hbs';
import './style.scss';

type TMessageBlockProps = Partial<TMessageBlock>;

export class MessagesBlock extends Block<TMessageBlockProps> {
  constructor(props: TMessageBlockProps) {
    super(props);
  }

  init() {
    if (this.props.messages) {
      this.children.messages = this.props.messages.map(
        (message) =>
          new Message({
            owner: message.owner,
            text: message.text,
            isReaded: message.isReaded,
            date: message.date,
            image: message.image,
            attr: {
              class: message.owner ? 'message message--owner' : 'message',
            },
          })
      );
    }
  }

  render() {
    return this.compile(tpl, {
      date: this.props.date,
    });
  }
}
