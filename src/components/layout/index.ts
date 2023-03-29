import { Block, TProps } from '../../core/Block';
import tpl from './tpl.hbs';

export class Layout extends Block {
  constructor(props: TProps) {
    super(props);
  }

  render() {
    return this.compile(tpl, { page: this.props.page });
  }
}
