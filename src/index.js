import authPage from "./pages/auth";
import registerPage from "./pages/registration";
import profilePage from "./pages/profile";
import chatsPage from "./pages/chats";
import page404 from "./pages/404";
import page500 from "./pages/500";

import button from "./components/button";

import tpl from "./index.hbs";

const app = document.getElementById("root");
const routes = {};
const templates = {};

function chats() {
  app.innerHTML = tpl({
    page: chatsPage,
  });
}

function route(path, template) {
  if (typeof template === "function") {
    return (routes[path] = template);
  } else if (typeof template === "string") {
    return (routes[path] = templates[template]);
  } else {
    return;
  }
}

function template(name, templateFunction) {
  return (templates[name] = templateFunction);
}

template("chats", () => chats());

route("/", "chats");
route("/chats", "chats");


function resolveRoute(route) {
  try {
    return routes[route];
  } catch (e) {
    throw new Error(`Route ${route} not found`);
  }
}

function router(event) {
  const url = window.location.hash.slice(1) || "/";
  const route = resolveRoute(url);

  route();
}

window.addEventListener("load", router);
window.addEventListener("hashchange", router);
