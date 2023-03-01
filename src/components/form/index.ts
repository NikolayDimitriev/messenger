import { Block, TProps } from '../../core/Block';
import { FormValidation } from '../../core/FormValidation';
import { InputsBlock } from '../InputsBlock';
import { Button } from '../button';
import { Link } from '../link';
import { TAuth } from '../../data/data.props';
import tpl from './tpl.hbs';
import './style.scss';

type TFormProps = TProps & {
  data?: TAuth;
  buttonValue?: string;
  linkValue?: string;
  linkHref?: string;
  inputBlockClass?: string;
  disabled?: boolean;
};

export class Form extends Block<TFormProps> {
  private _formValidation: FormValidation;

  constructor(props: TFormProps) {
    super('form', props);
    this._formValidation = new FormValidation(this);
  }

  init() {
    this.children.inputs = this.props.data?.map(
      (input) =>
        new InputsBlock({
          id: input.id,
          labelText: input.labelText,
          name: input.name,
          inputType: input.inputType,
          labelClass: input.labelClass,
          inputClass: input.inputClass,
          errMessage: input.errMessage,
          value: input.value,
          disabled: this.props.disabled,
          isError: input.isError,
          attr: {
            class: this.props.inputBlockClass || 'field',
          },
        })
    );

    if (this.props.buttonValue) {
      this.children.button = new Button({
        value: this.props.buttonValue,
        attr: {
          class: 'main-btn',
          type: 'submit',
        },
      });
    }

    if (this.props.linkValue && this.props.linkHref) {
      this.children.link = new Link({
        value: this.props.linkValue,
        attr: {
          class: 'form-link',
          href: this.props.linkHref,
        },
      });
    }
  }

  render() {
    return this.compile(tpl, {});
  }
}
