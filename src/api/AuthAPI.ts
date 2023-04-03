import { BaseAPI } from './BaseAPI';
import { TSignInData, TSignUpData } from '../typing';

export class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }

  signup(data: TSignUpData) {
    return this.http.post('/signup', data);
  }

  signin(data: TSignInData) {
    return this.http.post('/signin', data);
  }

  logout() {
    return this.http.post('/logout');
  }

  getUser() {
    return this.http.get('/user');
  }

  create = undefined;

  read = undefined;

  update = undefined;

  delete = undefined;
}

export default new AuthAPI();
