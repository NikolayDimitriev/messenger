import ChatsController from '../../controllers/ChatsController';
import Block from '../../core/Block';
import { Button } from '../button';
import { Image } from '../image';

import addIcon from '../../../static/addIcon.svg';
import deleteIcon from '../../../static/deleteIcon.svg';
import crown from '../../../static/crown.svg';
import { TUserProps } from '../../typing';
import tpl from './tpl.hbs';
import './style.scss';

type TChatUserProps = TUserProps & {
  role: string;
  selectedChatId: number;
  isAdd: boolean;
  initialAvatar: string;
  onAdded?: () => void;
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

    this.children.btnAddUser = new Button({
      value: new Image({
        attr: {
          src: addIcon,
          alt: 'Добавить',
        },
      }),
      attr: {
        class: 'list-user__btn',
      },
      events: {
        click: (e?) => {
          e?.stopPropagation();

          const addedUser: TUserProps & { role: string } = {
            id: this.props.id,
            first_name: this.props.first_name,
            second_name: this.props.second_name,
            display_name: this.props.display_name,
            login: this.props.login,
            email: this.props.email,
            phone: this.props.phone,
            avatar: this.props.initialAvatar,
            role: 'regular',
          };
          ChatsController.addUserToChat(
            this.props.selectedChatId,
            this.props.id,
            addedUser
          );

          this.props.onAdded();
        },
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
        click: (e) => {
          e?.stopPropagation();
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
