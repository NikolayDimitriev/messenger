import Block, { TProps } from '../../utils/Block';
import Input from '../input';
import { TInput } from '../../data/data.props';
import tpl from './tpl.hbs';
import './style.scss';
import { validation } from '../../utils/validation';

type TInputsBlockProps = Partial<TInput> & TProps;

export default class InputsBlock extends Block<TInputsBlockProps> {
  constructor(props: TInputsBlockProps) {
    super('div', props);
  }

  init() {
    this.children.input = new Input({
      id: this.props.id,
      class: this.props.inputClass,
      placeholder: this.props.placeholder,
      name: this.props.name,
      type: this.props.inputType,
      value: this.props.value,
      disabled: this.props.disabled,
      events: {
        focus: (e?: Event) => {
          console.log('focus');
          validation(e?.target as HTMLInputElement, this.props.name as string);
        },
        blur: (e?: Event) => {
          console.log('blur');
          validation(
            e?.target as HTMLInputElement,
            this.props.inputType as string
          );
        },
      },
    });
  }

  render() {
    return this.compile(tpl, {
      id: this.props.id,
      labelText: this.props.labelText,
      labelClass: this.props.labelClass,
    });
  }
}
