import {
  generatePageTransitionAnimation,
  generateBaseLoadAnimation
} from 'tools';

const routes = {
  '/': { label: 'Home', url: '/', selector: 'home-page', el: '' },
  '/login': { label: 'Login', url: '/login', selector: 'login-page', el: '' },
  '/admin': { label: 'Admin', url: '/admin', selector: 'admin-page', el: '' },
  '/about': { label: 'About', url: '/about', selector: 'about-page', el: '' },
  '/not-found': { label: 'Not Found', url: '/not-found', selector: 'not-found', el: '' }
};

const navigate = async (path) => {
  const page = path === '/' ? '/' : path.slice(1);
  
  if (isDynamic(page)) {
    await import('./pages/home/index')
    await getArticle(page);
  } else {
    await load(page);
  }
  
};

const getListings = async () => {
  const request = await fetch(`${baseUrl()}sections?section_type=listing&href=`);
  const response = await request.json();  

  return response;
}

const getArticle = async (page) => {
  const request = await fetch(`${baseUrl()}sections?section_type=article&href=${page}`);
  const response = await request.json();
  
  if (response.length === 0) {
    route('/not-found');
    return response;
  }

  const article = response[0];
  document.dispatchEvent(new CustomEvent('load-article', { detail: article }));
  return article;
}

const load = async (route) => {
  switch (route) {
    case '/':
      await import('./pages/home/index');
      document.dispatchEvent(new Event('load-listings'));
      break;
    case 'about':
      await import('./pages/about');
      break;
    case 'login':
    case 'admin':
      await import('./pages/cms/index');
      break;
    default:
      await import('./pages/not-found');
      break;
  }
}

const isDynamic = (route) => route.includes("articles");

const baseUrl = () => {
  return "/api/";
}

const route = (href) => {
  window.history.pushState({}, '', href);
  viewChange(window.location);
}

let currentLocation = "unset";

const viewChange = async (location) => {
  if (currentLocation === "unset") {
    await navigate(window.decodeURIComponent(location.pathname));
    // todo write a function to check if route is dynamic
    if (isDynamic(location.pathname)) {
      const dynamic = document.querySelector('article-page');
      // animate
      dynamic.classList.add('active');
    } else {
      // todo move this into a function
      try {
        const firstView = document.querySelector(routes[location.pathname].selector);
        generateBaseLoadAnimation(firstView, 'forwards');
        firstView.classList.add('active');
        firstView.setAttribute('loaded', true);
      } catch (error) {
        route('/not-found'); 
      }
    }

    currentLocation = location.pathname;
    return;
  }

  // the same is dynamic check needs to happen here
  if (isDynamic(currentLocation)) {
    const dynamic = document.querySelector('article-page');
    // animate
    dynamic.classList.remove('active');
  } else {
    const oldView = document.querySelector(routes[currentLocation].selector);
    generatePageTransitionAnimation(oldView, 'backwards');
    oldView.classList.remove('active');
  }


  // toss up a spinner

  await navigate(window.decodeURIComponent(location.pathname));
  currentLocation = location.pathname;

  // catch scnenario where new pathname is not-found

  if (isDynamic(currentLocation)) {
    const dynamic = document.querySelector('article-page');
    // animate
    dynamic.classList.add('active');
  } else {
    const newView = document.querySelector(routes[location.pathname].selector);
    generatePageTransitionAnimation(newView, 'forwards');
    newView.classList.add('active');
    newView.setAttribute('loaded', true);
  }
};

export {
  viewChange,
  currentLocation,
  getArticle,
  getListings,
  route,
  baseUrl,
  isDynamic,
  load,
  navigate,
  routes
}