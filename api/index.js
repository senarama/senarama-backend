const express = require('express');
const fileUpload = require('express-fileupload');
const { PORT } = require('./config/common');

// create server
const app = express();

// middlewares
app.use(fileUpload({ useTempFiles: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes
app.use('/api', require('./routes'));

// start server
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
