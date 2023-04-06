import MessagesController from '../../controllers/MessagesController';
import { Block } from '../../core/Block';
import { withStore } from '../../core/Store';
import { Message } from '../message';
import { ChatForm } from '../chatForm';

import { TMessage } from '../../typing';
import tpl from './tpl.hbs';
import './style.scss';
import { isEqual } from '../../utils/isEqual';

type TMessagePageProps = {
  selectedChat: number | undefined;
  messages: TMessage[];
  userId: number;
};

class MessengerBase extends Block {
  init() {
    this.children.messages = this._createMessages(this.props);

    this.children.chatForm = new ChatForm({
      onSubmit: (data) => {
        MessagesController.sendMessage(this.props.selectedChat!, data);
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
