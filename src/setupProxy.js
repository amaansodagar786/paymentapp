// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/checkout',
    createProxyMiddleware({
      target: 'http://localhost:4000',  // Replace with your backend URL
      changeOrigin: true,
    })
  );
};
