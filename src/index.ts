// import AuthPage from './pages/auth';
// import registerPage from './pages/registration';
// import profilePage from './pages/profile';
// import chatsPage from './pages/chats';
import Page404 from './pages/404';
import Page500 from './pages/500';
import Navigation from './pages/navigation';

import Layout from './components/layout';

import render from './utils/render';

const routes = [
  { path: '/', page: Navigation },
  // { path: '/auth', page: new AuthPage() },
  // { path: '/registration', page: registerPage() },
  // { path: '/profile', page: profilePage() },
  // { path: '/chats', page: chatsPage() },
  { path: '/404', page: Page404 },
  { path: '/500', page: Page500 },
];

function router() {
  const url = window.location.pathname;

  const { page } = routes.find(({ path }) => path === url) || {
    page: Page404,
  };

  render(
    '#root',
    new Layout({
      page: new page({
        attr: {
          class: 'page',
        },
      }),
      attr: {
        class: 'layout',
      },
    })
  );
}

window.addEventListener('load', router);
