import { Block, TProps } from '../../core/Block';
import tpl from './tpl.hbs';
import { Error } from '../../components/error';

export class Page404 extends Block<TProps> {
  constructor(props: TProps) {
    super('div', props);
  }

  init() {
    this.children.error = new Error({
      errorCode: '404',
      errorText: 'Не туда попали',
      attr: {
        class: 'error',
      },
    });
  }

  render() {
    return this.compile(tpl, {});
  }
}
