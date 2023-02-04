import Block, { TProps } from '../../utils/Block';
import tpl from './tpl.hbs';
import './style.scss';

type TButtonProps = TProps & {
  value: string;
};

export default class Button extends Block<TButtonProps> {
  constructor(props: TButtonProps) {
    super('button', props);
  }

  render() {
    return this.compile(tpl, { value: this.props.value });
  }
}
