/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventBus } from './EventBus';
import { nanoid } from 'nanoid';
import { isEqual } from '../utils/isEqual';
import { TProps } from '../typing';

const EVENTS = {
  INIT: 'init',
  FLOW_CDM: 'flow:component-did-mount',
  FLOW_CDU :'flow:component-did-update',
  FLOW_RENDER: 'flow:render',
} as const;

type EVENTS = (typeof EVENTS)[keyof typeof EVENTS];

type TChildren = Record<string, Block | Block[]>;

class Block<T extends Record<string, any> = any> {
  public id: string = nanoid(6);
  public props: T;
  public children: TChildren;
  private eventBus: () => EventBus;
  private _element: HTMLElement | null = null;

  constructor(propsWithChildren: T) {
    const eventBus = new EventBus();

    const { props, children } = this._getChildrenAndProps(propsWithChildren);

    this.children = children;

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(EVENTS.INIT);
  }

  private _getChildrenAndProps(childrenAndProps: T): {
    props: T;
    children: TChildren;
  } {
    const props: Record<string, unknown> = {};
    const children: TChildren = {};

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (
        Array.isArray(value) &&
        value.length > 0 &&
        value.every((v) => v instanceof Block)
      ) {
        children[key as string] = value;
      } else if (value instanceof Block) {
        children[key as string] = value;
      } else {
        props[key] = value;
      }
    });

    return { props: props as T, children };
  }

  protected addEvents(): void {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  protected removeEvents(): void {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element?.removeEventListener(eventName, events[eventName]);
    });
  }

  protected addAttribute(): void {
    const { attr = {} } = this.props;

    Object.entries(attr as Record<string, string>).forEach(([key, value]) => {
      this._element?.setAttribute(key, value);
      if (key === 'disabled' && value === 'false') {
        this.element?.removeAttribute(key);
      }
    });
  }

  private _registerEvents(eventBus: EventBus): void {
    eventBus.on(EVENTS.INIT, this._init.bind(this));
    eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _init(): void {
    this.init();

    this.eventBus().emit(EVENTS.FLOW_RENDER);
  }

  protected init(): void {
    return;
  }

  private _componentDidMount(): void {
    this.componentDidMount();
  }

  protected componentDidMount(): void {
    return;
  }

  public dispatchComponentDidMount(): void {
    this.eventBus().emit(EVENTS.FLOW_CDM);

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((ch) => ch.dispatchComponentDidMount());
      } else {
        child.dispatchComponentDidMount();
      }
    });
  }

  private _componentDidUpdate(oldProps: T, newProps: T): void {
    const response = this.componentDidUpdate(oldProps, newProps);

    if (response) {
      this.eventBus().emit(EVENTS.FLOW_RENDER);
    }
  }

  protected componentDidUpdate(oldProps: T, newProps: T) {
    return !isEqual(oldProps, newProps);
  }

  public setProps = (nextProps: Partial<T>) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  public addNewEvents = (newProps: TProps) => {
    if (!newProps) {
      return;
    }

    Object.assign(this.props, newProps);

    this.addEvents();
  };

  get element() {
    return this._element;
  }

  private _render() {
    const block = this.render();

    this.removeEvents();

    const newElement = block.firstElementChild as HTMLElement;

    if (this._element && newElement) {
      this._element.replaceWith(newElement);
    }

    this._element = newElement;

    this.addEvents();

    this.addAttribute();
  }

  protected render() {
    return new DocumentFragment();
  }

  public getContent() {
    return this.element;
  }

  private _makePropsProxy(props: T) {
    return new Proxy(props, {
      get(target: T, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target: T, prop: string, value) => {
        const oldValue = { ...target };
        if (target[prop] !== value) {
          target[prop as keyof T] = value;
          this.eventBus().emit(EVENTS.FLOW_CDU, oldValue, this.props);
        }

        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  protected compile(
    tpl: (context: any) => string,
    context: T = this.props as T
  ) {
    const stubs: Record<string, string | string[]> = {};

    Object.entries(this.children).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        stubs[key] = value
          .map((block) => `<div data-id="${block.id}"></div>`)
          .join('\n');
      } else {
        stubs[key] = `<div data-id="${value.id}"></div>`;
      }
    });

    const html = tpl({ ...context, ...stubs });

    const temp = document.createElement('template');
    temp.innerHTML = html;

    Object.entries(this.children).forEach(([, value]) => {
      const children = Array.isArray(value) ? value : [value];
      children.forEach((child) => {
        const stub = temp.content.querySelector(`[data-id="${child.id}"]`);
        if (!stub) {
          return;
        }
        stub.replaceWith(child.getContent()!);
      });
    });

    return temp.content;
  }
}

export default Block;
