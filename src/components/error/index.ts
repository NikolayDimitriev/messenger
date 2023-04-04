import { Block } from '../../core/Block';

import { Link } from '../link';
import tpl from './tpl.hbs';
import './style.scss';

type TErrorProps = {
  errorCode: string;
  errorText: string;
};

export class Error extends Block<TErrorProps> {
  constructor(props: TErrorProps) {
    super(props);
  }

  init() {
    this.children.link = new Link({
      value: 'Назад к чатам',
      attr: {
        href: '/messenger',
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
