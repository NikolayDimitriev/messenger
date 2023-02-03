import Block, { TProps } from '../../utils/Block';
import tpl from './tpl.hbs';
import './style.scss';

export default class Input extends Block<TProps> {
  constructor(props: TProps) {
    super('div', props);
  }

  render() {
    return this.compile(tpl, {
      id: this.props.id,
      placeholder: this.props.placeholder,
      name: this.props.name,
      inputType: this.props.inputType
    });
  }
}
