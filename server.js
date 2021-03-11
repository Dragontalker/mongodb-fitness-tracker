const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');

const app = express();

const mongoParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
};

app.use(logger('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get('/exercise', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/exercise.html'));
});

app.get('/stats', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/stats.html'));
});

// app.get('/api/workout', (req, res) => {
//   res.send('Hello world!');
// });

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workout', mongoParams)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`==> 🌎  Listening on port ${PORT}. Visit http://localhost:${PORT} in your browser.`);
    });
  });