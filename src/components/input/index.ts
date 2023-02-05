import { Block, TProps } from '../../utils/Block';
import { TInput } from '../../data/data.props';
import tpl from './tpl.hbs';

type TInputsBlockProps = Partial<TInput> & TProps;

export class Input extends Block<TInputsBlockProps> {
  constructor(props: TInputsBlockProps) {
    super('input', props);
  }

  override addAttribute(): void {
    super.addAttribute();
    Object.entries(this.props).forEach(([key, value]) => {
      if (typeof value === 'undefined') {
        return;
      }
      if (key === 'events') {
        return;
      }

      if (key === 'disabled' && value === false) {
        this.element?.removeAttribute(key);
        return;
      }

      this.element?.setAttribute(key, value);
    });
  }

  render() {
    return this.compile(tpl, {});
  }
}
