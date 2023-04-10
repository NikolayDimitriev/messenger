import API, { UserAPI } from '../api/UserAPI';
import Router from '../core/Router';
import store from '../core/Store';

import { TChangePassword, TChangeProfileData } from '../typing';

class UserController {
  private _api: UserAPI;

  constructor() {
    this._api = API;
  }

  async changeAvatar(data: any) {
    try {
      const newUserData = await this._api.changeAvatar(data);
      store.set('user', newUserData);
    } catch (e) {
      console.error(e);
    }
  }

  async changeProfileData(data: TChangeProfileData) {
    try {
      const newUserData = await this._api.changeProfileData(data);

      store.set('user', newUserData);
    } catch (e) {
      console.error(e);
    }
  }

  async changePassword(data: TChangePassword) {
    try {
      await this._api.changePassword(data);

      Router.go('/settings');
    } catch (e) {
      console.error(e);
    }
  }

  async searchUsers(data: string) {
    try {
      const searchedUsers = await this._api.search(data);

      store.set('searchedUsers', searchedUsers);
    } catch (e) {
      console.error(e);
    }
  }
}

export default new UserController();
