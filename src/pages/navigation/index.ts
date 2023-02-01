import Block from '../../utils/Block';
import tpl from './tpl.hbs';

export default class Navigation extends Block {
  constructor() {
    super('nav');
  }

  render() {
    return this.compile(tpl);
  }
}
