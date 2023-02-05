import { Block, TProps } from '../../utils/Block';
import { Form } from '../form';
import tpl from './tpl.hbs';
import './style.scss';
import { TAuth } from '../../data/data.props';

export type TLoginProps = TProps & {
  title: string;
  data?: TAuth;
  buttonValue?: string;
  linkValue?: string;
  linkHref?: string;
};

export class Login extends Block<TLoginProps> {
  constructor(props: TLoginProps) {
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
