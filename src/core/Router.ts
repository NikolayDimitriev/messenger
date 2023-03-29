import { Route } from './Route';
import { Block } from './Block';

class Router {
  private static __instance: Router;
  private _routes: Route[] = [];
  private _history: History = window.history;
  private _currentRoute: Route | null = null;

  constructor(private readonly rootQuery: string = '#root') {
    if (Router.__instance) {
      return Router.__instance;
    }

    this._routes = [];

    Router.__instance = this;
  }

  public use(pathname: string, block: typeof Block) {
    const route = new Route(pathname, block, this.rootQuery);

    this._routes.push(route);

    return this;
  }

  public start() {
    window.onpopstate = (event: PopStateEvent) => {
      const target = event.currentTarget as Window;

      this._onRoute(target.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    this._history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    this._history.back();
  }

  forward() {
    this._history.forward();
  }

  getRoute(pathname: string) {
    return this._routes.find((route) => route.match(pathname));
  }
}

export default new Router('#root');
