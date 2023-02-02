import Block, { TProps } from '../../utils/Block';
import Link from '../link';
import tpl from './tpl.hbs';
import './style.scss';

type ErrorProps = {
  errorCode: string;
  errorText: string;
} & TProps;

export default class Error extends Block<ErrorProps> {
  constructor(props: ErrorProps) {
    super('div', props);
  }

  render() {
    return this.compile(tpl, {
      errorCode: this.props.errorCode,
      errorText: this.props.errorText,
      link: new Link({
        value: 'Назад к чатам',
      }),
    });
  }
}
