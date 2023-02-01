import Block from '../../utils/Block';
import { TProps } from '../../utils/typing';
import tpl from './tpl.hbs';

type LayoutProps = {
  page: Block;
} & TProps;

export default class Layout extends Block {
  constructor(props: LayoutProps) {
    super('div', props);
  }

  render() {
    return this.compile(tpl, { page: this.props.page });
  }
}
