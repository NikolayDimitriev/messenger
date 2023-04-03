import { Block, TProps } from '../../core/Block';
import tpl from './tpl.hbs';

export class Image extends Block<TProps> {
  constructor(props: TProps) {
    super(props);
  }

  render() {
    return this.compile(tpl, {});
  }
}
