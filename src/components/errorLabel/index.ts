import Block from '../../core/Block';
import { TProps } from '../../typing';
import tpl from './tpl.hbs';

type TErrorLabelProps = {
  errMessage?: string;
} & TProps;

export class ErrorLabel extends Block<TErrorLabelProps> {
  constructor(props: TErrorLabelProps) {
    super(props);
  }

  render() {
    return this.compile(tpl, {
      errMessage: this.props.errMessage,
    });
  }
}
