import Block from '../../core/Block';
import { Button } from '../button';
import { Image } from '../image';
import { Input } from '../input';
import { FormValidation } from '../../core/FormValidation';
import { ErrorLabel } from '../errorLabel';

import attach from '../../../static/attach.svg';
import { TProps } from '../../typing';
import tpl from './tpl.hbs';

type TChatFormProps = TProps & {
  onSubmit?: (data: any) => void;
};

export class ChatForm extends Block<TChatFormProps> {
  constructor(props: TChatFormProps) {
    super(props);
    new FormValidation(this, (data: unknown) => {
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
      attr: {
        id,
        type: 'text',
        name: 'message',
        placeholder: 'Сообщение',
        class: 'chat-right__input',
      },
    });

    this.children.errorLabel = new ErrorLabel({
      errMessage: 'Не должно быть пустым!',
      attr: {
        for: id,
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

  public setInputValue(value: string) {
    ((this.children.inputs as Input).getContent() as HTMLInputElement).value =
      value;
  }

  render() {
    return this.compile(tpl, {});
  }
}
