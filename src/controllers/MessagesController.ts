import store from '../core/Store';
import WSTransport, { WSTransportEvents } from '../core/WSTransport';
import { TMessage } from '../typing';

class MessagesController {
  private _sockets: Map<number, WSTransport> = new Map();

  async connect(id: number, token: string) {
    if (this._sockets.has(id)) {
      return;
    }

    const userId = store.getState().user.data.id;

    const wsTransport = new WSTransport(
      `wss://ya-praktikum.tech/ws/chats/${userId}/${id}/${token}`
    );

    await wsTransport.connect();

    this._sockets.set(id, wsTransport);

    this._subscribe(wsTransport, id);

    this.getOldMessages(id);
  }

  sendMessage(id: number, message: string) {
    const wsTransport = this._sockets.get(id);

    if (!wsTransport) {
      throw new Error(`Chat ${id} is not connected`);
    }

    wsTransport.send({ type: 'message', content: message });
  }

  getOldMessages(id: number) {
    const wsTransport = this._sockets.get(id);

    if (!wsTransport) {
      throw new Error(`Chat ${id} is not connected`);
    }

    wsTransport.send({ type: 'get old', content: '0' });
  }

  closeAll() {
    Array.from(this._sockets.values()).forEach((socket) => socket.close());
  }

  private _onMessage(id: number, messages: TMessage | TMessage[]) {
    let messagesToAdd: TMessage[] = [];

    if (Array.isArray(messages)) {
      messagesToAdd = messages.reverse();
    } else {
      messagesToAdd.push(messages);
    }

    const currectMessages = (store.getState().messages || {})[id] || [];

    messagesToAdd = [...currectMessages, ...messagesToAdd];

    store.set(`messages.${id}`, messagesToAdd);
  }

  private _onClose(id: number) {
    this._sockets.delete(id);
  }

  private _subscribe(transport: WSTransport, id: number) {
    transport.on(WSTransportEvents.MESSAGE, (messages) =>
      this._onMessage(id, messages)
    );
    transport.on(WSTransportEvents.CLOSE, () => this._onClose(id));
  }
}

export default new MessagesController();
