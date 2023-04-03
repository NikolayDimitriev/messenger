import API, { ChatsAPI } from '../api/ChatsAPI';
import store from '../core/Store';
import MessagesController from './MessagesController';

class ChatsController {
  private readonly _api: ChatsAPI;

  constructor() {
    this._api = API;
  }

  async create(title: string) {
    await this._api.create(title);

    this.getChats();
  }

  async getChats() {
    const chats = await this._api.read();

    chats.map(async (chat) => {
      const token = await this.getToken(chat.id);

      await MessagesController.connect(chat.id, token);
    });

    store.set('chats', chats);
  }

  addUserToChat(id: number, userId: number) {
    this._api.addUsers(id, [userId]);
  }

  async delete(id: number) {
    return this._api.delete(id);
  }

  getToken(id: number) {
    return this._api.getToken(id);
  }

  selectChat(id: number) {
    store.set('selectedChat', id);
  }
}

export default new ChatsController();
