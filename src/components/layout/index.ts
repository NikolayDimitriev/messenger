import { Block, TProps } from '../../core/Block';
import tpl from './tpl.hbs';

export class Layout extends Block<TProps> {
  constructor(props: TProps) {
    super('div', props);
  }

  render() {
    return this.compile(tpl, { page: this.props.page });
  }
}
