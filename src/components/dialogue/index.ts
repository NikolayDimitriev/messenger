import { Block } from '../../core/Block';
import { TProps, TChatInfo } from '../../typing';

import tpl from './tpl.hbs';
import './style.scss';

type TDialogueProps = TProps &
  TChatInfo & {
    time: string;
  };

export class Dialogue extends Block<TDialogueProps> {
  constructor(props: TDialogueProps) {
    super(props);
  }

  render() {
    return this.compile(tpl, { ...this.props });
  }
}
