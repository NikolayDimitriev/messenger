import { AuthPage } from './pages/auth';
import { ProfilePage } from './pages/profile';
import { SignUpPage } from './pages/signUp';
import { EditDataPage } from './pages/editData';
import { EditPassPage } from './pages/editPass';
import { ChatPage } from './pages/chats';
// import { Page404 } from './pages/404';
// import { Page500 } from './pages/500';

import router from './core/Router';

import AuthController from './controllers/AuthController';
import ChatsController from './controllers/ChatsController';

enum Routes {
  SignIn = '/',
  SignUp = '/sign-up',
  Profile = '/settings',
  EditData = '/settings-edit-data',
  EditPass = '/settings-edit-pass',
  Chats = '/messenger',
  Error404 = '/404',
  Error500 = '/500',
}

window.addEventListener('DOMContentLoaded', async () => {
  router
    .use(Routes.SignIn, AuthPage)
    .use(Routes.Profile, ProfilePage)
    .use(Routes.EditData, EditDataPage)
    .use(Routes.EditPass, EditPassPage)
    .use(Routes.SignUp, SignUpPage)
    .use(Routes.Chats, ChatPage);
  // .use(Routes.Error404, Page404)
  // .use(Routes.Error500, Page500);

  let isProtectedRoute = true;
  switch (window.location.pathname) {
    case Routes.SignIn:
    case Routes.SignUp:
      isProtectedRoute = false;
      break;
  }

  try {
    await AuthController.getUser();
    await ChatsController.getChats();

    router.start();

    if (!isProtectedRoute) {
      router.go(Routes.Chats);
    }
  } catch (e) {
    router.start();

    if (isProtectedRoute) {
      router.go(Routes.SignIn);
    }
  }
});
