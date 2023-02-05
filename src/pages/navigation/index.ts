import { Block, TProps } from '../../utils/Block';
import tpl from './tpl.hbs';

export class Navigation extends Block<TProps> {
  constructor(props: TProps) {
    super('nav', props);
  }

  render() {
    return this.compile(tpl, {});
  }
}
