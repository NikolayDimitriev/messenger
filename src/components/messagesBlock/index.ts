import Block, { TProps } from '../../utils/Block';
import Message from '../message';
import { TMessage } from '../../data/data.props';

import tpl from './tpl.hbs';
import './style.scss';

export default class MessagesBlock extends Block<TProps> {
  constructor(props: TProps) {
    super('div', props);
  }

  init() {
    this.children.messages = this.props.messages.map(
      (message: TMessage) =>
        new Message({
          owner: message.owner,
          text: message.text,
          isReaded: message.isReaded,
          date: message.date,
          attr: {
            class: message.owner ? 'message message--owner' : 'message',
          },
        })
    );
  }

  render() {
    return this.compile(tpl, {
      date: this.props.date,
    });
  }
}
