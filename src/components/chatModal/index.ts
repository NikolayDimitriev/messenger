import ChatsController from '../../controllers/ChatsController';
import Block from '../../core/Block';
import { TProps } from '../../typing';
import { Input } from '../input';
import { Button } from '../button';

import tpl from './tpl.hbs';
import './style.scss';

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
        click: async () => {
          const text = (
            (this.children.input as Input).getContent() as HTMLInputElement
          )?.value;

          if (!text.length) {
            return;
          }

          await ChatsController.create(text);

          this.closeModal();
        },
      },
    });
  }

  public openModal() {
    this.getContent()?.classList.add('modal--active');
  }

  public closeModal() {
    this.getContent()?.classList.remove('modal--active');
  }

  public setInputValue(value: string) {
    ((this.children.input as Input).getContent() as HTMLInputElement).value =
      value;
  }

  render() {
    return this.compile(tpl, {});
  }
}
