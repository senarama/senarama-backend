const express = require('express');
const fileUpload = require('express-fileupload');
const { PORT } = require('./config/common');
const connectDB = require('./config/database');

// create server
const app = express();

// connect to DB_HOST
connectDB();

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
