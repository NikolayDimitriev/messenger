import Block, { TProps } from '../../utils/Block';
import Button from '../button';
import tpl from './tpl.hbs';
import attach from '../../../static/attach.svg';
import Image from '../image';
import Input from '../input';
import FormValidation from '../../utils/FormValidation';
import ErrorLabel from '../errorLabel';

export default class ChatForm extends Block<TProps> {
  _formValidation: FormValidation;
  constructor(props: TProps) {
    super('form', props);
    this._formValidation = new FormValidation(this);
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
