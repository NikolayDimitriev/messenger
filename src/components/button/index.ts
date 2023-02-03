import Block, { TProps } from '../../utils/Block';
import tpl from './tpl.hbs';
import './style.scss';

export default class Button extends Block<TProps> {
  constructor(props: TProps) {
    super('button', props);
  }

  render() {
    return this.compile(tpl, { value: this.props.value });
  }
}
