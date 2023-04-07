import Block from '../../core/Block';
import { FormValidation } from '../../core/FormValidation';
import { InputsBlock } from '../InputsBlock';
import { Button } from '../button';
import { Link } from '../link';
import { TInputBlock } from '../../mock/mock.props';
import tpl from './tpl.hbs';
import './style.scss';

type TFormProps = {
  data: TInputBlock[];
  buttonValue: string;
  linkValue: string;
  linkHref: string;
  onSubmit: (data: any) => void;
  inputBlockClass?: string;
};

export class Form extends Block<TFormProps> {
  private _formValidation: FormValidation;

  constructor(props: TFormProps) {
    super(props);
    this._formValidation = new FormValidation(this, this.props.onSubmit);
  }

  init() {
    this.children.inputs = this.props.data.map(
      (input) =>
        new InputsBlock({
          ...input,
          attr: {
            class: this.props.inputBlockClass || 'field',
          },
        })
    );

    this.children.button = new Button({
      value: this.props.buttonValue,
      attr: {
        class: 'main-btn',
        type: 'submit',
      },
    });

    this.children.link = new Link({
      value: this.props.linkValue,
      to: this.props.linkHref,
      attr: {
        class: 'form-link',
      },
    });
  }

  render() {
    return this.compile(tpl, { ...this.props });
  }
}
