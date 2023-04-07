import Block from '../../core/Block';

import { TMessage } from '../../typing';
import tpl from './tpl.hbs';
import './style.scss';

type TMessageProps = TMessage & {
  isMine: boolean;
};

export class Message extends Block<TMessageProps> {
  constructor(props: TMessageProps) {
    super(props);
  }

  render() {
    const hour = String(new Date(this.props.time).getHours()).padStart(2, '0');
    const minutes = String(new Date(this.props.time).getMinutes()).padStart(
      2,
      '0'
    );

    const time = `${hour}:${minutes}`;

    return this.compile(tpl, { ...this.props, time });
  }
}
