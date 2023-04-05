import { Block } from '../../core/Block';
import { TProps } from '../../typing';
import { Button } from '../button';
import { Input } from '../input';

import tpl from './tpl.hbs';

type TModalFormProps = TProps & {
  fileName: string;
  onChange: () => void;
};

export class ModalForm extends Block {
  constructor(props: TModalFormProps) {
    super(props);
  }

  init() {
    this.children.button = new Button({
      value: 'Поменять',
      attr: {
        class: 'main-btn',
        type: 'submit',
      },
    });

    this.children.input = new Input({
      attr: {
        type: 'file',
        name: 'file',
      },
      events: {
        change: this.props.onChange,
      },
    });
  }

  render() {
    return this.compile(tpl, { ...this.props });
  }
}
