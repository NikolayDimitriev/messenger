import Block, { TProps } from '../../utils/Block';
import Link from '../link';
import tpl from './tpl.hbs';
import './style.scss';

export default class Error extends Block<TProps> {
  constructor(props: TProps) {
    super('div', props);
  }

  override init() {
    this.children.link = new Link({
      value: 'Назад к чатам',
      attr: {
        href: '/chats',
        class: 'form-link',
      },
    });
  }

  render() {
    return this.compile(tpl, {
      errorCode: this.props.errorCode,
      errorText: this.props.errorText,
    });
  }
}
