// import AuthPage from './pages/auth';
// import registerPage from './pages/registration';
// import profilePage from './pages/profile';
// import chatsPage from './pages/chats';
import Page404 from './pages/404';
// import page500 from './pages/500';
import Navigation from './pages/navigation';

import Layout from './components/layout';

import render from './utils/render';

const routes = [
  { path: '/', page: new Navigation() },
  // { path: '/auth', page: new AuthPage() },
  // { path: '/registration', page: registerPage() },
  // { path: '/profile', page: profilePage() },
  // { path: '/chats', page: chatsPage() },
  { path: '/404', page: new Page404() },
  // { path: '/500', page: page500() },
];

function router() {
  const url = window.location.pathname;
  const { page } = routes.find(({ path }) => path === url) || {
    page: new Page404(),
  };
  render('#root', new Layout({ page }));
}

window.addEventListener('load', router);
