import { Block } from './Block';
import { render } from '../utils/render';
import { Layout } from '../components/layout';

export class Route {
  private block: Block | null = null;

  constructor(
    private pathname: string,
    private readonly blockConstructor: typeof Block,
    private readonly query: string
  ) {}

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this.pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this.block) {
      this.block = null;
    }
  }

  match(pathname: string) {
    return pathname === this.pathname;
  }

  render() {
    if (!this.block) {
      this.block = new Layout({
        page: new this.blockConstructor({}),
      });

      render(this.query, this.block);
      return;
    }
  }
}
