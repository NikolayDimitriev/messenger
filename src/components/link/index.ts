import Block, { TProps } from '../../utils/Block';
import tpl from './tpl.hbs';
import './style.scss';

type TLinkProps = TProps & {
  value: string;
};

export default class Link extends Block<TLinkProps> {
  constructor(props: TLinkProps) {
    super('a', props);
  }

  render() {
    return this.compile(tpl, { value: this.props.value });
  }
}
