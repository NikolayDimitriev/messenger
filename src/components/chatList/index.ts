import ChatsController from '../../controllers/ChatsController';
import { Block } from '../../core/Block';
import { withStore } from '../../core/Store';
import { Dialogue } from '../dialogue';

import { TChatInfo } from '../../typing';
import tpl from './tpl.hbs';

type TChatsListProps = {
  chats: TChatInfo[];
};

class ChatsListBase extends Block {
  init() {
    this.children.chats = this._createChats(this.props);
  }

  // protected componentDidUpdate(
  //   oldProps: TChatsListProps,
  //   newProps: TChatsListProps
  // ): boolean {
  //   this.children.chats = this.createChats(newProps);

  //   return true;
  // }

  private _createChats(props: TChatsListProps) {
    return props.chats.map(
      (data) =>
        new Dialogue({
          ...data,
          events: {
            click: () => {
              ChatsController.selectChat(data.id);
            },
          },
        })
    );
  }

  render() {
    return this.compile(tpl, { ...this.props });
  }
}

const withChats = withStore((state) => ({ chats: [...(state.chats || [])] }));

export const ChatsList = withChats(ChatsListBase);
