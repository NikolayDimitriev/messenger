import ChatsController from '../../controllers/ChatsController';
import { Block } from '../../core/Block';
import { withStore } from '../../core/Store';
import { Dialogue } from '../dialogue';

import { TChatInfo } from '../../typing';
import tpl from './tpl.hbs';
import { isEqual } from '../../utils/isEqual';

type TChatsListProps = {
  chats: TChatInfo[];
  selectedChat: number | undefined;
};

class ChatsListBase extends Block {
  init() {
    this.children.chats = this._createChats(this.props);
  }

  protected componentDidUpdate(oldProps: any, newProps: any): boolean {
    const response = !isEqual(oldProps, newProps);
    if (response) {
      this.children.chats = this._createChats(newProps);
    }

    return response;
  }

  private _createChats(props: TChatsListProps) {
    return props.chats.map((data) => {
      let time = '';

      if (data.last_message) {
        const hour = String(
          new Date(data.last_message.time).getHours()
        ).padStart(2, '0');
        const minutes = String(
          new Date(data.last_message.time).getMinutes()
        ).padStart(2, '0');

        time = `${hour}:${minutes}`;
      }

      return new Dialogue({
        ...data,
        time,
        isSelected: this.props.selectedChat === data.id,
        events: {
          click: () => {
            ChatsController.selectChat(data.id);
          },
        },
      });
    });
  }

  render() {
    return this.compile(tpl, { ...this.props });
  }
}

const withChats = withStore((state) => ({
  chats: [...(state.chats || [])],
  selectedChat: state.selectedChat,
}));

export const ChatsList = withChats(ChatsListBase);
