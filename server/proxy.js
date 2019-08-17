const express = require('express');
const proxy = require('http-proxy-middleware');
const app = express();
const path = require('path');
const ssr = require('./ssr');
const { getMetaTags, injectMetaTags } = require('./cms-service');

let apiTarget;
if (process.env.NODE_ENV === 'development') {
  apiTarget = 'http://localhost:8000';
} else {
  apiTarget = 'http://cms_backend:8000';
}

app.use('/api', proxy({
  changeOrigin: true,
  target: apiTarget,
  pathRewrite: (path) => path.replace('/api', '')
}));


if (process.env.NODE_ENV === 'development') {
  app.use('/', proxy({
    changeOrigin: true,
    target: 'http://localhost:8081'
  }));
}
else {
  app.use('/articles/*', async (req, res) => {
    const url = `${req.protocol}://${req.get('host')}`;
    
    const { html, ttRenderMs } = await ssr(url);
    
    const start = Date.now();
    
    const metaList = await getMetaTags(url, req);
    const page = injectMetaTags(metaList, html);
  
    const timeToRenderArticle = Date.now() - start;
  
    console.log('time to render article: ', timeToRenderArticle, 'ms')
  
    res.setHeader('Server-Timing', `Prerender;dur=${ttRenderMs};desc="Headless render time (ms)"`);
    res.status(200).send(page);
  });

	const root = path.resolve(__dirname, '../dist');
	app.use('/', express.static(root));
	app.all('/*', (req, res) => {
		res.sendFile('/index.html', { root });
	});
}


app.listen(8080);