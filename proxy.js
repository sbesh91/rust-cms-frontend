const express = require('express');
const proxy = require('http-proxy-middleware');

const app = express();


app.use('/api', proxy({
  changeOrigin: true,
  target: 'http://localhost:8000',
  pathRewrite: (path) => path.replace('/api','')
}));

app.use('/', proxy({
  changeOrigin: true,
  target: 'http://localhost:8081'
}));


app.listen(8080);