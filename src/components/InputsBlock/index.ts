import { Block, TProps } from '../../core/Block';
import { Input } from '../input';
import { ErrorLabel } from '../errorLabel';
import tpl from './tpl.hbs';

import { TInput } from '../../data/data.props';
import './style.scss';

type TInputsBlockProps = Partial<TInput> & TProps;

export class InputsBlock extends Block<TInputsBlockProps> {
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
    });

    this.children.errorLabel = new ErrorLabel({
      errMessage: this.props.errMessage as string,
      attr: {
        id: this.props.id as string,
        class: 'input__label',
      },
    });
  }

  render() {
    return this.compile(tpl, {
      id: this.props.id,
      labelText: this.props.labelText,
      labelClass: this.props.labelClass,
      isError: this.props.isError,
      errMessage: this.props.errMessage,
    });
  }
}
