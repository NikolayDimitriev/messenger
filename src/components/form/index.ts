import Block, { TProps } from '../../utils/Block';
import tpl from './tpl.hbs';
import './style.scss';
import InputsBlock from '../InputsBlock';
import Button from '../button';
import Link from '../link';
import { TAuth } from '../../data/data.props';
import { onSubmit } from '../../utils/validation';

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

  override addEvents(): void {
    super.addEvents();
    this.element?.addEventListener('submit', onSubmit);
  }

  override removeEvents(): void {
    super.removeEvents();
    this.element?.removeEventListener('submit', onSubmit);
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
          isError: input.isError,
          attr: {
            class: 'field',
          },
        })
    );

    this.children.button = new Button({
      value: this.props.buttonValue as string,
      attr: {
        class: 'main-btn',
        type: 'submit',
      },
      events: {
        submit: (e?: Event) => {
          e?.preventDefault();
        },
      },
    });

    this.children.link = new Link({
      value: this.props.linkValue as string,
      attr: {
        class: 'form-link',
        href: this.props.linkHref as string,
      },
    });
  }

  render() {
    return this.compile(tpl, {});
  }
}
