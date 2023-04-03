import { AuthPage } from './pages/auth';
import { ProfilePage } from './pages/profile';
import { RegistrationPage } from './pages/registration';
import { ChatPage } from './pages/chats';
// import { Page404 } from './pages/404';
// import { Page500 } from './pages/500';

import router from './core/Router';

import AuthController from './controllers/AuthController';

enum Routes {
  Index = '/',
  Register = '/sign-up',
  Profile = '/settings',
  Chats = '/messenger',
  Error404 = '/404',
  Error500 = '/500',
}

window.addEventListener('DOMContentLoaded', async () => {
  router
    .use(Routes.Index, AuthPage)
    .use(Routes.Profile, ProfilePage)
    .use(Routes.Register, RegistrationPage)
    .use(Routes.Chats, ChatPage);
  // .use(Routes.Error404, Page404)
  // .use(Routes.Error500, Page500);

  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case Routes.Index:
    case Routes.Register:
      isProtectedRoute = false;
      break;
  }

  try {
    await AuthController.getUser();

    router.start();

    if (!isProtectedRoute) {
      router.go(Routes.Profile);
    }
  } catch (e) {
    router.start();

    if (isProtectedRoute) {
      router.go(Routes.Index);
    }
  }
});
