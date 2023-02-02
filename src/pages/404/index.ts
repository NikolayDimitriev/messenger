import Block, { TProps } from '../../utils/Block';
import tpl from './tpl.hbs';
import Error from '../../components/error';

export default class Page404 extends Block<TProps> {
  constructor(props: TProps) {
    super('div', props);
  }

  override init() {
    this.children.error = new Error({
      errorCode: '400',
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
