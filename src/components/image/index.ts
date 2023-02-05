import Block, { TProps } from '../../utils/Block';
import tpl from './tpl.hbs';

export default class Image extends Block<TProps> {
  constructor(props: TProps) {
    super('img', props);
  }

  render() {
    return this.compile(tpl, {});
  }
}
