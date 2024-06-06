if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./routes');
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());

app.use(router);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

module.exports = { app };