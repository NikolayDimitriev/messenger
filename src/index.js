import authPage from './pages/auth'
import registerPage from './pages/registration'
import profilePage from './pages/profile'
import chatsPage from './pages/chats'
import page404 from './pages/404'
import page500 from './pages/500'
import navPage from './pages/navigation'

import tpl from './index.hbs'

const app = document.getElementById('root')

const routes = [
	{ path: '/', page: navPage() },
	{ path: '/auth', page: authPage() },
	{ path: '/registration', page: registerPage() },
	{ path: '/profile', page: profilePage() },
	{ path: '/chats', page: chatsPage() },
	{ path: '/404', page: page404() },
	{ path: '/500', page: page500() },
]

function router() {
	const url = window.location.pathname
	const { page } = routes.find(({ path }) => path === url) || {
		page: page404(),
	}

	app.innerHTML = tpl({
		page,
	})
}

window.addEventListener('load', router)
