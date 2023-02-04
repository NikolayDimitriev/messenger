import Block, { TProps } from '../../utils/Block';
import tpl from './tpl.hbs';
import './style.scss';

export default class Message extends Block<TProps> {
  constructor(props: TProps) {
    super('div', props);
  }

  render() {
    return this.compile(tpl, {
      owner: this.props.owner,
      text: this.props.text,
      isReaded: this.props.isReaded,
      date: this.props.date,
    });
  }
}
