import { Block } from '../../core/Block';
import tpl from './tpl.hbs';

type TInputProps = {
  attr: Record<string, string>;
};

export class Input extends Block<TInputProps> {
  constructor(props: TInputProps) {
    super(props);
  }

  render() {
    return this.compile(tpl, { ...this.props });
  }
}
