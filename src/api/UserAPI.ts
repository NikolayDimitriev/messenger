import { TChangePassword, TChangeProfileData, TUser } from '../typing';
import { BaseAPI } from './BaseAPI';

export class UserAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  changeAvatar(data: FormData): Promise<TUser> {
    return this.http.put('/profile/avatar', data);
  }

  changeProfileData(data: TChangeProfileData): Promise<TUser> {
    return this.http.put('/profile', data);
  }

  changePassword(data: TChangePassword): Promise<unknown> {
    return this.http.put('/password', data);
  }

  search(login: string): Promise<TUser[]> {
    return this.http.post('/search', { login });
  }

  getUser(id: number): Promise<TUser> {
    return this.http.get(`/${id}`);
  }

  read = undefined;
  create = undefined;
  delete = undefined;
  update = undefined;
}

export default new UserAPI();
