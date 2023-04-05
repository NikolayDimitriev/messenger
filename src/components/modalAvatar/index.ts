import { Block } from '../../core/Block';
import { ModalForm } from '../modalForm';

import tpl from './tpl.hbs';
import './style.scss';
import { TProps } from '../../typing';

type TModalAvatarProps = TProps & {
  title: string;
  fileName: string;
  onSubmit: (e: Event) => void;
  onChange: (e: Event) => void;
};

export class ModalAvatar extends Block {
  constructor(props: TModalAvatarProps) {
    super(props);
  }

  init() {
    this.children.form = new ModalForm({
      fileName: this.props.fileName,
      onChange: this.props.onChange,
      events: {
        submit: this.props.onSubmit,
      },
    });
  }

  render() {
    return this.compile(tpl, { ...this.props });
  }
}
