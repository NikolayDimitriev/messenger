import API, { AuthAPI } from '../api/AuthAPI';
import MessagesController from './MessagesController';
import ChatsController from './ChatsController';
import router from '../core/Router';
import store from '../core/Store';

import { TSignUpData, TSignInData } from '../typing';

class AuthController {
  private _api: AuthAPI;

  constructor() {
    this._api = API;
  }

  async signup(data: TSignUpData) {
    try {
      await this._api.signup(data);

      await this.getUser();

      router.go('/messenger');
    } catch (e) {
      store.set('user.errorMessage', (e as Error).message);
    }
  }

  async signin(data: TSignInData) {
    try {
      await this._api.signin(data);

      await this.getUser();

      router.go('/messenger');
    } catch (e) {
      store.set('user.errorMessage', (e as Error).message);
    }
  }

  async logout() {
    try {
      MessagesController.closeAll();

      await this._api.logout();

      router.go('/');

      store.set('user', undefined);
    } catch (e) {
      store.set('user.errorMessage', (e as Error).message);
    }
  }

  async getUser() {
    try {
      const user = await this._api.getUser();

      store.set('user', user);

      await ChatsController.getChats();
    } catch (e) {
      store.set('user.errorMessage', (e as Error).message);
      throw new Error((e as Error).message);
    }
  }
}

export default new AuthController();
