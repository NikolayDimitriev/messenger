import { Block } from '../../core/Block';
import tpl from './tpl.hbs';

export class Image extends Block {
  constructor() {
    super({});
  }

  render() {
    return this.compile(tpl, {});
  }
}
