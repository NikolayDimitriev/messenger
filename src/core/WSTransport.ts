import { EventBus } from './EventBus';

export enum WSTransportEvents {
  CONNECTED = 'connected',
  MESSAGE = 'message',
  CLOSE = 'close',
  ERROR = 'error',
}

export default class WSTransport extends EventBus {
  private _socket: WebSocket | null = null;
  private _pingInterval = 0;

  constructor(private _url: string) {
    super();
  }

  public send(data: unknown) {
    if (!this._socket) {
      throw new Error('socket is not connected');
    }

    this._socket.send(JSON.stringify(data));
  }

  public connect(): Promise<void> {
    this._socket = new WebSocket(this._url);

    this._subscribe(this._socket);
    
    this._setupPing();

    return new Promise((resolve) => {
      this.on(WSTransportEvents.CONNECTED, () => {
        resolve();
      });
    });
  }

  public close() {
    if (!this._socket) {
      throw new Error('socket is not connected');
    }

    this._socket.close();
  }

  private _setupPing() {
    this._pingInterval = window.setInterval(() => {
      this.send({ type: 'ping' });
    }, 5000);

    this.on(WSTransportEvents.CLOSE, () => {
      clearInterval(this._pingInterval);

      this._pingInterval = 0;
    });
  }

  private _subscribe(socket: WebSocket) {
    socket.addEventListener('open', () => {
      this.emit(WSTransportEvents.CONNECTED);
    });

    socket.addEventListener('close', () => {
      this.emit(WSTransportEvents.CLOSE);
    });

    socket.addEventListener('error', (e) => {
      this.emit(WSTransportEvents.ERROR, e);
    });

    socket.addEventListener('message', (message) => {
      const data = JSON.parse(message.data);

      if (data.type && data.type === 'pong') {
        return;
      }

      this.emit(WSTransportEvents.MESSAGE, data);
    });
  }
}
