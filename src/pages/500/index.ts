import { Block, TProps } from '../../utils/Block';
import tpl from './tpl.hbs';
import { Error } from '../../components/error';

export class Page500 extends Block<TProps> {
  constructor(props: TProps) {
    super('div', props);
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
