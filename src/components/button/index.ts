import Block from '../../core/Block';
import { TProps } from '../../typing';
import tpl from './tpl.hbs';
import './style.scss';
import { Image } from '../image';

type TButtonProps = {
  value: string | Image;
} & TProps;

export class Button extends Block<TButtonProps> {
  constructor(props: TButtonProps) {
    super(props);
  }

  render() {
    return this.compile(tpl, { value: this.props.value });
  }
}
