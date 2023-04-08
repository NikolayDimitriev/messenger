import { BaseAPI } from './BaseAPI';
import { TChatInfo, TUser } from '../typing';

export class ChatsAPI extends BaseAPI {
  constructor() {
    super('/chats');
  }

  create(title: string) {
    return this.http.post('', { title });
  }

  delete(id: number): Promise<unknown> {
    return this.http.delete('', { chatId: id });
  }

  read(): Promise<TChatInfo[]> {
    return this.http.get('');
  }

  getUsers(id: number): Promise<Array<TUser & { role: string }>> {
    return this.http.get(`/${id}/users`);
  }

  addUsers(id: number, users: number[]): Promise<unknown> {
    return this.http.put('/users', { users, chatId: id });
  }

  removeUsers(id: number, users: number[]): Promise<unknown> {
    return this.http.delete('/users', { users, chatId: id });
  }

  async getToken(id: number): Promise<string> {
    const response = await this.http.post<{ token: string }>(`/token/${id}`);

    return response.token;
  }

  update = undefined;
}

export default new ChatsAPI();
