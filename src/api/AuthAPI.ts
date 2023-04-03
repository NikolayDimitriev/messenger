import { BaseAPI } from './BaseAPI';

export type TSignUpData = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type TSignInData = {
  login: string;
  password: string;
};

export type TUser = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
};

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
