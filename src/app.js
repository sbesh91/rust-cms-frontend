export const routes = {
  '/': { label: 'Home', url: '/', selector: 'home-page', el: '' },
  '/login': { label: 'Login', url: '/login', selector: 'login-page', el: '' },
  '/admin': { label: 'Admin', url: '/admin', selector: 'admin-page', el: '' },
  '/about': { label: 'About', url: '/about', selector: 'about-page', el: '' }
};

export const navigate = async (path) => {
  const page = path === '/' ? '/' : path.slice(1);
  
  if (isDynamic(page)) {
    // todo load dynamic page (ajax to the server with )
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