import Block from '../../core/Block';
import { Image } from '../image';

import { TProps } from '../../typing';
import tpl from './tpl.hbs';
import './style.scss';

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
