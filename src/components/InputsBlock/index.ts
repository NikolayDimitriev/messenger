import Block from '../../core/Block';
import { TProps } from '../../typing';
import { Input } from '../input';
import { ErrorLabel } from '../errorLabel';

import { TInputBlock } from '../../mock/mock.props';
import tpl from './tpl.hbs';

import './style.scss';

type TInputsBlockProps = TInputBlock & TProps;

export class InputsBlock extends Block<TInputsBlockProps> {
  constructor(props: TInputsBlockProps) {
    super(props);
  }

  init() {
    this.children.input = new Input({
      attr: {
        id: this.props.id,
        class: this.props.inputClass,
        name: this.props.name,
        type: this.props.type,
        value: this.props.value,
        disabled: this.props.disabled,
      },
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
      ...this.props,
    });
  }
}
