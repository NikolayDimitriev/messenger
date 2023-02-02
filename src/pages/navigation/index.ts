import Block, { TProps } from '../../utils/Block';
import tpl from './tpl.hbs';

export default class Navigation extends Block<TProps> {
  constructor() {
    super('nav');
  }

  render() {
    return this.compile(tpl, {});
  }
}
