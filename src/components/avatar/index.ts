import { Block } from '../../core/Block';

import tpl from './tpl.hbs';
import './style.scss';
import { TProps } from '../../typing';

type TAvatarProps = TProps & {
  avatarSrc: string;
  name: string;
};

export class Avatar extends Block {
  constructor(props: TAvatarProps) {
    super(props);
  }

  render() {
    return this.compile(tpl, { ...this.props });
  }
}
