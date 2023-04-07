import ChatsController from '../../controllers/ChatsController';
import Block from '../../core/Block';
import { TProps } from '../../typing';
import { Input } from '../input';

import tpl from './tpl.hbs';
import './style.scss';
import { Button } from '../button';

export class ChatModal extends Block<TProps> {
  constructor(props: TProps) {
    super(props);
  }

  init() {
    this.children.input = new Input({
      attr: {
        class: 'modal-input',
        placeholder: 'Название',
      },
    });

    this.children.button = new Button({
      value: 'Создать',
      attr: {
        class: 'main-btn',
      },
      events: {
        click: () => {
          const text = (
            (this.children.input as Input).getContent() as HTMLInputElement
          )?.value;

          if (!text.length) {
            return;
          }

          ChatsController.create(text);

          this.getContent()?.classList.remove('modal--active');
        },
      },
    });
  }

  render() {
    return this.compile(tpl, {});
  }
}
