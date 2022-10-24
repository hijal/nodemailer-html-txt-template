'use strict';

module.exports = {
  mail_config: {
    port: 465,
    host: 'smtp.gmail.com',
    secure: true,
    service: 'Gmail',
    auth: {
      user: process.env.USER,
      pass: process.env.PASS
    }
  }
};
