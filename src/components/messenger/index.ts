import MessagesController from '../../controllers/MessagesController';
import ChatsController from '../../controllers/ChatsController';
import { Block } from '../../core/Block';
import { withStore } from '../../core/Store';
import { Message } from '../message';
import { ChatForm } from '../chatForm';

import { isEqual } from '../../utils/isEqual';
import { TMessage } from '../../typing';

import chatMenuDots from '../../../static/chat-menu-dots.svg';
import tpl from './tpl.hbs';
import './style.scss';
import { Input } from '../input';
import { Button } from '../button';
import { Image } from '../image';
import { AddUserModal } from '../addUserModal';

type TMessagePageProps = {
  selectedChat: number | undefined;
  messages: TMessage[];
  userId: number;
};

class MessengerBase extends Block {
  init() {
    this.children.settingChatBtn = new Button({
      value: new Image({
        attr: {
          src: chatMenuDots,
          alt: 'Иконка доп. возможностей',
        },
      }),
      attr: {
        class: 'chat-right__menu',
      },
      events: {
        click: () => {
          const isOpen = (this.children.modalAddRemoveUser as AddUserModal)
            .props.isOpen;
          (this.children.modalAddRemoveUser as AddUserModal).setProps({
            isOpen: !isOpen,
          });
        },
      },
    });

    this.children.modalAddRemoveUser = new AddUserModal({
      isOpen: false,
      onRemoveChat: () => {
        ChatsController.delete(this.props.selectedChat);
      },
    });

    this.children.messages = this._createMessages(this.props);

    this.children.chatForm = new ChatForm({
      onSubmit: (data) => {
        MessagesController.sendMessage(this.props.selectedChat!, data);
        (
          (
            (this.children.chatForm as ChatForm).children.inputs as Input
          ).getContent() as HTMLInputElement
        ).value = '';
      },
    });
  }

  protected componentDidUpdate(oldProps: any, newProps: any): boolean {
    const response = !isEqual(oldProps, newProps);
    if (response) {
      this.children.messages = this._createMessages(newProps);
    }

    return response;
  }

  private _createMessages(props: TMessagePageProps) {
    return props.messages.map((data) => {
      return new Message({
        ...data,
        isMine: props.userId === Number(data.user_id),
      });
    });
  }

  render() {
    return this.compile(tpl, { ...this.props });
  }
}

const withSelectedChatMessages = withStore((state) => {
  const selectedChatId = state.selectedChat;

  if (!selectedChatId) {
    return {
      messages: [],
      selectedChat: undefined,
      userId: state.user.data.id,
    };
  }
  return {
    messages: (state.messages || {})[selectedChatId] || [],
    selectedChat: state.selectedChat,
    userId: state.user.data.id,
  };
});

export const Messenger = withSelectedChatMessages(MessengerBase);
