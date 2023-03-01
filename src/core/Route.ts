import { Block, TProps } from './Block';
import { render } from '../utils/render';

type TRouteProps = TProps & {
  rootQuery: string;
};

export class Route {
  private _pathname: string;
  private _blockConstructor: Block<TProps>;
  private _block: Block<TProps> | null;
  private _props: TRouteProps;
  constructor(pathname: string, view: Block<TProps>, props: TRouteProps) {
    this._pathname = pathname;
    this._blockConstructor = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  render() {
    if (!this._block) {
      this._block = new this._blockConstructor();
      render(this._props.rootQuery, this._block);
      return;
    }

    this._block.show();
  }
}
