import { Block, TProps } from '../../utils/Block';
import tpl from './tpl.hbs';
import './style.scss';
import { Image } from '../image';

type TButtonProps = TProps & {
  value: string | Image;
};

export class Button extends Block<TButtonProps> {
  constructor(props: TButtonProps) {
    super('button', props);
  }

  render() {
    return this.compile(tpl, { value: this.props.value });
  }
}
