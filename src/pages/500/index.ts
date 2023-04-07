import Block from '../../core/Block';
import tpl from './tpl.hbs';
import { Error } from '../../components/error';

export class Page500 extends Block {
  constructor() {
    super({});
  }

  override init() {
    this.children.error = new Error({
      errorCode: '500',
      errorText: 'Мы уже фиксим',
      attr: {
        class: 'error',
      },
    });
  }

  render() {
    return this.compile(tpl, {});
  }
}
