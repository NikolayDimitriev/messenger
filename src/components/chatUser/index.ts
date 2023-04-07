import { Block } from '../../core/Block';
import { Button } from '../button';
import { Image } from '../image';

import deleteIcon from '../../../static/deleteIcon.svg';
import crown from '../../../static/crown.svg';
import { TUserProps } from '../../typing';
import tpl from './tpl.hbs';
import './style.scss';
import ChatsController from '../../controllers/ChatsController';

type TChatUserProps = TUserProps & {
  role: string;
  selectedChatId: number;
};

export class ChatUser extends Block {
  constructor(props: TChatUserProps) {
    super(props);
  }

  init() {
    this.children.admin = new Image({
      attr: {
        src: crown,
        alt: 'Админ',
        class: 'list-user__admin',
      },
    });

    this.children.btnDeleteUser = new Button({
      value: new Image({
        attr: {
          src: deleteIcon,
          alt: 'Удалить',
        },
      }),
      attr: {
        class: 'list-user__btn',
      },
      events: {
        click: () => {
          debugger;
          ChatsController.removeUserFromChat(
            this.props.selectedChatId,
            this.props.id
          );
        },
      },
    });
  }

  render() {
    return this.compile(tpl, { ...this.props });
  }
}
