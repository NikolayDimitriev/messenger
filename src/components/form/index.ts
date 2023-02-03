import Block, { TProps } from '../../utils/Block';
import tpl from './tpl.hbs';
import './style.scss';
import Inputs from '../input';
import Button from '../button';
import Link from '../link';
import { TInput } from '../../data/data.props';

export default class Form extends Block<TProps> {
  constructor(props: TProps) {
    super('form', props);
  }

  init() {
    this.children.inputs = this.props.data.map(
      (input: TInput) =>
        new Inputs({
          id: input.id,
          placeholder: input.placeholder,
          name: input.name,
          inputType: input.inputType,
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
