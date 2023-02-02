import Block, { TProps } from '../../utils/Block';
import tpl from './tpl.hbs';
import './style.scss';

export default class Link extends Block<TProps> {
  constructor(props: TProps) {
    super('a', props);
  }

  render() {
    return this.compile(tpl, {
      value: this.props.value,
      attr: this.props.attr,
    });
  }
}
