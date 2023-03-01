// import { Route } from './Route';
// import { Block, TProps } from './Block';

// export class Router {
//   private router: Array<Route>;
//   private history: History;
//   private _currentRoute: Route | null;
//   private rootQuery: string;

//   constructor(rootQuery = "#root") {
//     this.routes = [];
//     this.history = window.history;
//     this._currentRoute = null;
//     this._rootQuery = rootQuery;
//   }

//   use(pathname:string, block: Block<TProps>) {
//     const route = new Route(pathname, block, { rootQuery: this._rootQuery });

//     this.routes.push(route);

//     return this;
//   }

//   start() {
//     window.onpopstate = ((event: PopStateEvent) => {
//       this._onRoute(event.currentTarget?.location.pathname);
//     }).bind(this);

//     this._onRoute(window.location.pathname);
//   }

//   _onRoute(pathname) {
//     const route = this.getRoute(pathname);
//     if (!route) {
//       return;
//     }

//     if (this._currentRoute && this._currentRoute !== route) {
//       this._currentRoute.leave();
//     }

//     this._currentRoute = route;
//     route.render(route, pathname);
//   }

//   go(pathname) {
//     this.history.pushState({}, '', pathname);
//     this._onRoute(pathname);
//   }

//   back() {
//     this.history.back();
//   }

//   forward() {
//     this.history.forward();
//   }

//   getRoute(pathname) {
//     return this.routes.find((route) => route.match(pathname));
//   }
// }
