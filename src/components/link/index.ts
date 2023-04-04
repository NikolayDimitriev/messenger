import { Block } from '../../core/Block';
import { TProps } from '../../typing';

import { withRouter, PropsWithRouter } from '../../hoc/withRouter';

import tpl from './tpl.hbs';
import './style.scss';

type TLinkProps = PropsWithRouter & {
  to: string;
  label: string;
} & TProps;

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
