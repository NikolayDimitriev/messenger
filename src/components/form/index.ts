import Block, { TProps } from '../../utils/Block';
import tpl from './tpl.hbs';
import './style.scss';
import Inputs from '../input';
import Button from '../button';
import Link from '../link';
import { TAuth } from '../../data/data.props';

type TFormProps = TProps & {
  data?: TAuth;
  buttonValue?: string;
  linkValue?: string;
  linkHref?: string;
};

export default class Form extends Block<TFormProps> {
  constructor(props: TFormProps) {
    super('form', props);
  }

  init() {
    this.children.inputs = this.props.data.map(
      (input) =>
        new Inputs({
          id: input.id,
          labelText: input.labelText,
          name: input.name,
          inputType: input.inputType,
          labelClass: input.labelClass,
          inputClass: input.inputClass,
          placeholder: input.placeholder,
          attr: {
            class: 'field',
          },
        })
    );

    this.children.button = new Button({
      value: this.props.buttonValue,
      attr: {
        class: 'main-btn',
      },
    });

    this.children.link = new Link({
      value: this.props.linkValue,
      attr: {
        class: 'form-link',
        href: this.props.linkHref,
      },
    });
  }

  render() {
    return this.compile(tpl, {});
  }
}
