import Block, { TProps } from '../../utils/Block';
import { TInput } from '../../data/data.props';
import tpl from './tpl.hbs';
import './style.scss';

type TInputProps = TInput & TProps;

export default class Input extends Block<TInputProps> {
  constructor(props: TInputProps) {
    super('div', props);
  }

  render() {
    return this.compile(tpl, {
      id: this.props.id,
      labelText: this.props.labelText,
      labelClass: this.props.labelClass,
      inputClass: this.props.inputClass,
      placeholder: this.props.placeholder,
      name: this.props.name,
      inputType: this.props.inputType,
      value: this.props.value,
      disabled: this.props.disabled,
    });
  }
}
