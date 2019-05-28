import {
  generatePageTransitionAnimation,
  generateBaseLoadAnimation
} from 'tools';

export const routes = {
  '/': { label: 'Home', url: '/', selector: 'home-page', el: '' },
  '/login': { label: 'Login', url: '/login', selector: 'login-page', el: '' },
  '/admin': { label: 'Admin', url: '/admin', selector: 'admin-page', el: '' },
  '/about': { label: 'About', url: '/about', selector: 'about-page', el: '' }
};

export const navigate = async (path) => {
  const page = path === '/' ? '/' : path.slice(1);
  
  if (isDynamic(page)) {
    // todo load dynamic page (ajax to the server)
  } else {
    await load(page);
  }
  
};

export const load = async (route) => {
  switch (route) {
    case '/':
      await import('./pages/home');
      break;
    case 'about':
      await import('./pages/about');
      break;
    case 'login':
      await import('./pages/login');
      break;
    case 'admin':
      await import('./pages/admin');
      break;
    default:
      await import('./pages/not-found');
      break;
  }
}

export const isDynamic = (route) => route.includes("articles");

export const baseUrl = () => {
  return "/api/";
}

export const route = (href) => {
  window.history.pushState({}, '', href);
  viewChange(window.location);
}

export let currentLocation = "unset";

export const viewChange = async (location) => {
  if (currentLocation === "unset") {
    await navigate(window.decodeURIComponent(location.pathname));
    // todo write a function to check if route is dynamic
    if (isDynamic(location.pathname)) {

    } else {
      // todo move this into a function
      const firstView = document.querySelector(routes[location.pathname].selector);
      generateBaseLoadAnimation(firstView, 'forwards');
      firstView.classList.add('active');
    }

    currentLocation = location.pathname;
    return;
  }

  // the same is dynamic check needs to happen here

  const oldView = document.querySelector(routes[currentLocation].selector);
  generatePageTransitionAnimation(oldView, 'backwards');
  oldView.classList.remove('active');

  // toss up a spinner

  await navigate(window.decodeURIComponent(location.pathname));
  currentLocation = location.pathname;

  // catch scnenario where new pathname is not-found

  const newView = document.querySelector(routes[location.pathname].selector);
  generatePageTransitionAnimation(newView, 'forwards');
  newView.classList.add('active')
};