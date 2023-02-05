import Block, { TProps } from '../../utils/Block';
import tpl from './tpl.hbs';

type TErrorLabelProps = {
  errMessage: string;
} & TProps;

export default class ErrorLabel extends Block<TErrorLabelProps> {
  constructor(props: TErrorLabelProps) {
    super('label', props);
  }

  render() {
    return this.compile(tpl, {
      errMessage: this.props.errMessage,
    });
  }
}
