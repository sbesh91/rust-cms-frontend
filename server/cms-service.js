const fetch = require('node-fetch');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const getMetaTags = async (url, req) => {
  try {
    const request = await fetch(`${url}/api/sections?section_type=article&href=${req.originalUrl}`);
    const json = await request.json();
    const article = json[0];
  
    const { document } = new JSDOM(article.module).window;
  
    return Array.from(document.querySelectorAll('meta'));
  } catch (error) {
    console.log(error);
    return [];
  }
}

function injectMetaTags(metaList, html) {
  const { document } = new JSDOM(html).window;

  Array.from(document.querySelectorAll('meta'))
    .filter(i => i.name.includes('twitter'))
    .forEach(i => document.head.removeChild(i));

  Array.from(document.querySelectorAll('script'))
    .filter(i => i.src.includes('cms_frontend'))
    .forEach(i => document.head.removeChild(i));

  metaList.forEach(i => document.head.appendChild(i));

  return document.documentElement.outerHTML;
}

module.exports = {
  getMetaTags,
  injectMetaTags
}