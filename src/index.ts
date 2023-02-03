import AuthPage from './pages/auth';
import RegistrationPage from './pages/registration';
// import profilePage from './pages/profile';
import Chat from './pages/chats';
import Page404 from './pages/404';
import Page500 from './pages/500';
import Navigation from './pages/navigation';

import Layout from './components/layout';

import render from './utils/render';

const routes = [
  { path: '/', Page: Navigation },
  { path: '/auth', Page: AuthPage },
  { path: '/registration', Page: RegistrationPage },
  // { path: '/profile', page: profilePage() },
  { path: '/chats', Page: Chat },
  { path: '/404', Page: Page404 },
  { path: '/500', Page: Page500 },
];

function router() {
  const url = window.location.pathname;

  const { Page } = routes.find(({ path }) => path === url) || {
    Page: Page404,
  };

  render(
    '#root',
    new Layout({
      page: new Page({
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
