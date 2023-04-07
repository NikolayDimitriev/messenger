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
    await MessagesController.closeAll();

    const chats = await this._api.read();

    chats.map(async (chat) => {
      const token = await this.getToken(chat.id);

      await MessagesController.connect(chat.id, token);
    });

    store.set('chats', chats);
  }

  async getUsers(id: number) {
    const users = await this._api.getUsers(id);

    store.set('usersSelectedChat', users);
  }

  addUserToChat(id: number, userId: number) {
    this._api.addUsers(id, [userId]);
  }

  removeUserFromChat(id: number, userId: number) {
    this._api.removeUsers(id, [userId]);

    store.set(
      'usersSelectedChat',
      store.getState().usersSelectedChat?.filter((user) => user.id !== userId)
    );
  }

  async delete(id: number) {
    await this._api.delete(id);

    store.set(
      'chats',
      store.getState().chats.filter((chat) => chat.id !== id)
    );

    store.set('selectedChat', undefined);
  }

  getToken(id: number) {
    return this._api.getToken(id);
  }

  selectChat(id: number) {
    this.getUsers(id);

    store.set('selectedChat', id);
  }
}

export default new ChatsController();
