import Block from '../../utils/Block';
import { TProps } from '../../utils/typing';
import tpl from './tpl.hbs';
import './style.scss';

type LinkProps = {
  value: string;
} & TProps;

export default class Link extends Block {
  constructor(props: LinkProps) {
    super('a', props);
  }

  render() {
    return this.compile(tpl, { value: this.props.value });
  }
}
