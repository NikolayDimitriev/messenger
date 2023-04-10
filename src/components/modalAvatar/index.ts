import Block from '../../core/Block';
import { ModalForm } from '../modalForm';

import { TProps } from '../../typing';
import tpl from './tpl.hbs';
import './style.scss';

type TModalAvatarProps = TProps & {
  title: string;
  fileName: string;
  isOpen: boolean;
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

  public setFileNamePropsToForm(fileName: string) {
    (this.children.form as ModalForm).setProps({ fileName });
  }

  render() {
    return this.compile(tpl, { ...this.props });
  }
}
