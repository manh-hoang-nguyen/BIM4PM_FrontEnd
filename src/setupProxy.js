const proxy = require('http-proxy-middleware');
// eslint-disable-next-line func-names
module.exports = function(app) {
  app.use(
    '/api',
    proxy({
      target: 'http://localhost:5000',
      changeOrigin: true,
    }),
  );
};
