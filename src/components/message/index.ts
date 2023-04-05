import { Block } from '../../core/Block';

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
    return this.compile(tpl, { ...this.props });
  }
}
