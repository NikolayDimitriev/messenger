import { Block, TProps } from '../../core/Block';
import { withRouter } from '../../hoc/withRouter';
import tpl from './tpl.hbs';
import './style.scss';

type TLinkProps = TProps & {
  value: string;
  to: string;
};

class BaseLink extends Block<TLinkProps> {
  constructor(props: TLinkProps) {
    super({
      ...props,
      events: {
        click: () => this.navigate(),
      },
    });
  }

  navigate() {
    this.props.router.go(this.props.to);
  }

  render() {
    return this.compile(tpl, { ...this.props });
  }
}

export const Link = withRouter(BaseLink);
