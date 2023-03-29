const Router = require('express').Router();
const users = require('./users');
const thoughts = require('./thoughts');

Router.use('/users', users);
Router.use('/thoughts', thoughts);

module.exports = Router;