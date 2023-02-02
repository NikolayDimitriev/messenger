import Block, {TProps} from '../../utils/Block';
import tpl from './tpl.hbs';

export default class Layout extends Block<TProps> {
  constructor(props: TProps) {
    super('div', props);
  }

  render() {
    return this.compile(tpl, { page: this.props.page });
  }
}
