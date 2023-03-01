import { Block, TProps } from '../../core/Block';
import { TMessage } from '../../data/data.props';
import tpl from './tpl.hbs';
import './style.scss';

type TMessageProps = TMessage & TProps;

export class Message extends Block<TMessageProps> {
  constructor(props: TMessageProps) {
    super('div', props);
  }

  render() {
    return this.compile(tpl, {
      owner: this.props.owner,
      text: this.props.text,
      isReaded: this.props.isReaded,
      date: this.props.date,
      image: this.props.image,
    });
  }
}
