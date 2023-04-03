/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventBus } from './EventBus';
import { nanoid } from 'nanoid';
import { isEqual } from '../utils/isEqual';

enum EVENTS {
  INIT = 'init',
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_CDU = 'flow:component-did-update',
  FLOW_RENDER = 'flow:render',
}

type TChildren = Record<string, Block | Block[]>;

export class Block<T extends Record<string, any> = any> {
  public id: string = nanoid(6);
  public props: T;
  public children: TChildren;
  private eventBus: () => EventBus;
  private _element: HTMLElement | null = null;

  constructor(propsWithChildren: T) {
    const eventBus = new EventBus();

    const { props, children } = this._getChildrenAndProps(propsWithChildren);

    this.children = this._makePropsProxy(children as T);

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
        value instanceof Block ||
        (Array.isArray(childrenAndProps) &&
          childrenAndProps[key].every((block: any) => block instanceof Block))
      ) {
        children[key] = value;
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

    if (this._element) {
      Object.values(this._element).forEach((child) => {
        child.dispatchComponentDidMount();
      });
    }
  }

  protected componentDidMount(): void {
    return;
  }

  public dispatchComponentDidMount(): void {
    this.eventBus().emit(EVENTS.FLOW_CDM);
    if (this._element) {
      if (Object.keys(this._element).length) {
        this.eventBus().emit(EVENTS.FLOW_RENDER);
      }
    }
  }

  private _componentDidUpdate(oldProps: any, newProps: any): void {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      this.eventBus().emit(EVENTS.FLOW_RENDER);
    }
  }

  protected componentDidUpdate(oldProps: T, newProps: T) {
    return isEqual(oldProps, newProps);
  }

  public setProps = (nextProps: T) => {
    if (!nextProps) {
      return;
    }

    const { children, props } = this._getChildrenAndProps(nextProps);

    if (Object.values(children).length) {
      Object.assign(this.children, children);
    }

    if (Object.values(props).length) {
      Object.assign(this.props, props);
    }
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

  getContent() {
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
