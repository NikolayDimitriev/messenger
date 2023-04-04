import { Block } from '../../core/Block';
import { TProps } from '../../typing';
import { Button } from '../button';
import tpl from './tpl.hbs';
import attach from '../../../static/attach.svg';
import { Image } from '../image';
import { Input } from '../input';
import { FormValidation } from '../../core/FormValidation';
import { ErrorLabel } from '../errorLabel';

type TChatFormProps = TProps & {
  onSubmit?: (data: any) => void;
};

export class ChatForm extends Block<TChatFormProps> {
  private _formValidation: FormValidation;
  constructor(props: TChatFormProps) {
    super(props);
    this._formValidation = new FormValidation(this, (data: unknown) => {
      this.props.onSubmit!(data);
    });
  }

  init() {
    this.children.attachBtn = new Button({
      value: new Image({
        attr: {
          src: attach,
          alt: 'Иконка прикрепить',
        },
      }),
      attr: {
        class: 'chat-right__attach',
      },
    });

    const id: string = Date.now().toString();
    this.children.inputs = new Input({
      id,
      type: 'text',
      name: 'message',
      placeholder: 'Сообщение',
      attr: {
        class: 'chat-right__input',
      },
    });

    this.children.errorLabel = new ErrorLabel({
      errMessage: 'Не должно быть пустым!',
      attr: {
        id,
        class: 'input__label',
      },
    });

    this.children.submitBtn = new Button({
      value: '',
      attr: {
        type: 'submit',
        class: 'chat-right__submit',
      },
    });
  }

  render() {
    return this.compile(tpl, {});
  }
}
