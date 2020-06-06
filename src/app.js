import { route } from './tools/router';

const routes = {
  '/': { label: 'Home', url: '/', selector: 'home-page', el: '' },
  '/login': { label: 'Login', url: '/login', selector: 'login-page', el: '' },
  '/admin': { label: 'Admin', url: '/admin', selector: 'admin-page', el: '' },
  '/about': { label: 'About', url: '/about', selector: 'about-page', el: '' },
  '/not-found': { label: 'Not Found', url: '/not-found', selector: 'not-found', el: '' }
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
}

const load = async (route) => {
  switch (route) {
    case '/':
      document.dispatchEvent(new Event('load-listings'));
    case 'about':
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
};


export {
  getArticle,
  getListings,
  baseUrl,
  isDynamic,
  load,
  routes
}