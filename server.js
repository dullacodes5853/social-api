const express = require('express');
const mongoose = require('mongoose');

const web = express();
const PORT = process.env.PORT || 3001;

web.use(express.json());
web.use(express.urlencoded({ extended: true }));
web.use(express.static('public'));

web.use(require('./routes'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-API', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.set('debug', true);


web.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));