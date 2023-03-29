const Router = require('express').Router();
const apiRoutes = require('./api');

Router.use('/api', apiRoutes);

Router.use((req, res) => {
  res.status(404).send('<h1>😝 404 Error!</h1>');
});

module.exports = Router;

