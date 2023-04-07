import Block from '../../core/Block';
import { TProps } from '../../typing';
import tpl from './tpl.hbs';

export class Input extends Block<TProps> {
  constructor(props: TProps) {
    super(props);
  }

  render() {
    return this.compile(tpl, { ...this.props });
  }
}
