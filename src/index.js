import "./style.css";
import authPage from "./pages/auth";
import registerPage from "./pages/registration";
import profilePage from "./pages/profile";
import chatsPage from "./pages/chats";
import page404 from "./pages/404";
import page500 from "./pages/500";

import button from "./components/button";

let app = document.getElementById("root");
let routes = {};
let templates = {};

function home() {
    let div = document.createElement('div');
    let link = document.createElement('a');
    link.href = '/about';
    link.innerText = 'About';

    div.innerHTML = '<h1>Home</h1>';
    div.appendChild(link);

    app.appendChild(div);
};

function about() {
    let div = document.createElement('div');
    let link = document.createElement('a');
    link.href = '/';
    link.innerText = 'Home';

    div.innerHTML = '<h1>About</h1>';
    div.appendChild(link);

    app.appendChild(div);
};

function route(path, template) {
    if (typeof template === 'function') {
        return routes[path] = template
    } else if (typeof template === 'string') {
        return routes[path] = templates[template];
    } else {
        return;
    }
}

function template(name, templateFunction) {
    return templates[name] = templateFunction;
}

template('home', () => home())
template('about', () => about())

route('/', 'home')
route('/about', 'about')

function resolveRoute(route) {
    try {
        return routes[route]
    } catch(e) {
        throw new Error(`Route ${route} not found`)
    }
}

function router (event) {
    let url = window.location.hash.slice(1) || '/';
    let route = resolveRoute(url);

    route();
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router);