type TEventCallback = (...args: unknown[]) => void;
type TListener<T extends string> = Record<T, TEventCallback[]>; 

export default class EventBus<T extends string> {
  private listeners: TListener<T>;
  constructor() {
    this.listeners = {} as TListener<T>;
  }

  on(event: T, callback: TEventCallback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: T, callback: TEventCallback) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback
    );
  }

  emit(event: T, ...args: unknown[]) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event].forEach(function (listener) {
      listener(...args);
    });
  }
}
