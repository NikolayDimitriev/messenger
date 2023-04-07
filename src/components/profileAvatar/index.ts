import Block from '../../core/Block';

import tpl from './tpl.hbs';
import './style.scss';
import { TProps } from '../../typing';

type TProfileAvatarProps = TProps & {
  avatarSrc: string | null;
  name: string;
};

export class ProfileAvatar extends Block<TProfileAvatarProps> {
  constructor(props: TProfileAvatarProps) {
    super(props);
  }

  render() {
    return this.compile(tpl, { ...this.props });
  }
}
