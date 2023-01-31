import Block from "../../core/Block";
import tpl from './tpl.hbs';

type LayoutProps = {
  page: Block;
}

export default class Layout extends Block<LayoutProps> {
  constructor(props: LayoutProps) {
    super(props);
  }

  render() {
    return this.compile(tpl, this.props);
  }
}
