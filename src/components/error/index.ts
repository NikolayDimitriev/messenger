import Block from '../../utils/Block';
import { TProps } from '../../utils/typing';
import Link from '../link';
import tpl from './tpl.hbs';
import './style.scss';

type ErrorProps = {
  errorCode: string;
  errorText: string;
} & TProps;

export default class Error extends Block {
  constructor(props: ErrorProps) {
    super('div', props);
  }

  init() {
    this.children.link = new Link({
      value: 'Назад к чатам',
    });
  }

  render() {
    return this.compile(tpl, {
      errorCode: this.props.errorCode,
      errorText: this.props.errorText,
    });
  }
}
