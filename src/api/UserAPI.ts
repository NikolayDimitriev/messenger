import { TChangePassword, TChangeProfileData, TUserProps } from '../typing';
import { BaseAPI } from './BaseAPI';

export class UserAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  changeAvatar(data: FormData): Promise<TUserProps> {
    return this.http.put('/profile/avatar', data);
  }

  changeProfileData(data: TChangeProfileData): Promise<TUserProps> {
    return this.http.put('/profile', data);
  }

  changePassword(data: TChangePassword): Promise<unknown> {
    return this.http.put('/password', data);
  }

  search(login: string): Promise<TUserProps[]> {
    return this.http.post('/search', { login });
  }

  read = undefined;
  create = undefined;
  delete = undefined;
  update = undefined;
}

export default new UserAPI();
