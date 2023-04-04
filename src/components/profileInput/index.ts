import { Block } from '../../core/Block';
import { Input } from '../input';
import { ErrorLabel } from '../errorLabel';
import tpl from './tpl.hbs';

type TProfileInputProps = {
  label: string;
  id: string;
  value: string;
  type: string;
  name: string;
  disabled: string;
  errMessage?: string;
};

export class ProfileInput extends Block {
  constructor(props: TProfileInputProps) {
    super(props);
  }

  init() {
    this.children.input = new Input({
      attr: {
        id: this.props.id,
        class: 'profile-field__input',
        name: this.props.name,
        type: this.props.type,
        value: this.props.value,
        disabled: this.props.disabled,
      },
    });

    this.children.errorLabel = new ErrorLabel({
      errMessage: this.props.errMessage,
      attr: {
        for: this.props.id,
        class: 'input__label',
      },
    });
  }

  render() {
    return this.compile(tpl, { ...this.props });
  }
}
