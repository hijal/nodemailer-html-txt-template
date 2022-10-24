require('dotenv').config();

const express = require('express');
const mailer = require('./mailer');
const app = express();

app.get('/html', async (req, res) => {
  await mailer.send({
    from: 'imh1j4l@gmail.com',
    to: 'hijal.browser@gmail.com',
    subject: 'Hello from Nodemailer',
    template: {
      name: 'hello.html',
      data: {
        first_name: 'Hello',
        last_name: 'World!'
      }
    }
  });
  res.send('Mail send successfully!');
});

app.get('/txt', async (req, res) => {
  await mailer.send({
    from: 'imh1j4l@gmail.com',
    to: 'hijal.browser@gmail.com',
    subject: 'Hello from Nodemailer',
    template: {
      name: 'hello.txt',
      data: {
        first_name: 'Hello',
        last_name: 'World!'
      }
    }
  });
  res.send('Mail send successfully!');
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`listen on http://localhost:${port}`);
});
