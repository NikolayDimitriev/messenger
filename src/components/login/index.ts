import Block, { TProps } from '../../utils/Block';
import Form from '../form';
import tpl from './tpl.hbs';
import './style.scss';

export default class Login extends Block<TProps> {
  constructor(props: TProps) {
    super('div', props);
  }

  init() {
    this.children.form = new Form({
      data: this.props.data,
      buttonValue: this.props.buttonValue,
      linkValue: this.props.linkValue,
      linkHref: this.props.linkHref,
      attr: { class: 'form' },
    });
  }

  render() {
    return this.compile(tpl, {
      title: this.props.title,
    });
  }
}
