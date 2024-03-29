import Block from './Block';
import { render } from '../utils/render';

export class Route {
  private _block: Block | null = null;

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
    if (this._block) {
      this._block = null;
    }
  }

  match(pathname: string) {
    return pathname === this.pathname;
  }

  render() {
    if (!this._block) {
      this._block = new this.blockConstructor({});

      render(this.query, this._block);
      return;
    }
  }
}
