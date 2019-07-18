const express = require('express');
const proxy = require('http-proxy-middleware');
const app = express();
const ssr = require('./ssr');
const fetch = require('node-fetch');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

app.use('/api', proxy({
  changeOrigin: true,
  target: 'http://localhost:8000',
  pathRewrite: (path) => path.replace('/api', '')
}));

async function getMetaTags(url, req) {
  const request = await fetch(`${url}/api/sections?section_type=article&href=${req.originalUrl}`);
  const json = await request.json();
  const article = json[0];

  const { document } = new JSDOM(article.module).window;

  return Array.from(document.querySelectorAll('meta'));
}

function injectMetaTags(metaList, html) {
  const { document } = new JSDOM(html).window;

  Array.from(document.querySelectorAll('meta'))
    .filter(i => i.name.includes('twitter'))
    .forEach(i => document.head.removeChild(i));

  metaList.forEach(i => document.head.appendChild(i));

  return document.documentElement.outerHTML;
}

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

app.use('/', proxy({
  changeOrigin: true,
  target: 'http://localhost:8081'
}));


app.listen(8080);