import Block from '../../utils/Block';
import { TProps } from '../../utils/typing';
import tpl from './tpl.hbs';
import './style.scss';

type ButtonProps = {
  value: string;
} & TProps;

export default class Button extends Block {
  constructor(props: ButtonProps) {
    props.classname = [...props.classname, "main-btn"];
    super('button', props);
  }

  render() {
    return this.compile(tpl, { value: this.props.value });
  }
}
