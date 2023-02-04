import Block, { TProps } from '../../utils/Block';
import Link from '../link';
import tpl from './tpl.hbs';
import './style.scss';

type TErrorProps = TProps & {
  errorCode: string;
  errorText: string;
};

export default class Error extends Block<TErrorProps> {
  constructor(props: TErrorProps) {
    super('div', props);
  }

  init() {
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
