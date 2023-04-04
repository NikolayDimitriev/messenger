import { Block } from '../../core/Block';
import { TProps } from '../../typing';
import { Form } from '../form';
import tpl from './tpl.hbs';
import './style.scss';
import { TAuth } from '../../data/data.props';

export type TLoginProps = TProps & {
  title: string;
  onSubmit: (data: any) => void;
  dataInputs?: TAuth;
  buttonValue?: string;
  linkValue?: string;
  linkHref?: string;
};

export class Login extends Block<TLoginProps> {
  constructor(props: TLoginProps) {
    super(props);
  }

  init() {
    this.children.form = new Form({
      data: this.props.dataInputs,
      buttonValue: this.props.buttonValue,
      linkValue: this.props.linkValue,
      linkHref: this.props.linkHref,
      onSubmit: this.props.onSubmit,
    });
  }

  render() {
    return this.compile(tpl, {
      ...this.props,
    });
  }
}
