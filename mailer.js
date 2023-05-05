// 'use strict';

// const path = require('path');
// const nodemailer = require('nodemailer');
// const { mail_config } = require('./config');

// const template = require('./template');

// class Mailer {
//   constructor() {
//     this.template = template;
//     this.transport = nodemailer.createTransport({
//       ...mail_config,
//       pool: true
//     });
//     this.template.register('thousands', (amt) => {
//       return amt.toString().replace(/\d(?=(\d{3})+\.)/g, '$&,');
//     });
//   }

//   async send(message) {
//     if (message.template) {
//       let template = message.template;
//       let extension = path.extname(template.name);
//       if (['.html', '.txt'].includes(extension)) {
//         let type = extension === '.html' ? 'html' : 'text';
//         message[type] = await this.render(template.name, template.data);
//       } else {
//         [message.html, message.text] = await Promise.all([
//           this.render(`${template.name}.html`, template.data),
//           this.render(`${template.name}.txt`, template.data)
//         ]);
//       }
//       delete message.template;
//     }
//     return this.transport.sendMail(message);
//   }

//   render(template_file, data) {
//     let template_path = path.resolve(__dirname, 'assets', template_file);
//     return this.template.render(template_path, data);
//   }
// }

// module.exports = new Mailer();

'use strict';

const path = require('path');
const nodemailer = require('nodemailer');
const { mail_config } = require('./config');
const template = require('./template');

const render = (template_file, data) => {
  const template_path = path.resolve(__dirname, 'assets', template_file);
  return template.render(template_path, data);
};

const mailer = () => {
  const transport = nodemailer.createTransport({
    ...mail_config,
    pool: true
  });

  const send = async (message) => {
    if (message.template) {
      const { name, data } = message.template;
      const extension = path.extname(name);
      if (['.html', '.txt'].includes(extension)) {
        const type = extension === '.html' ? 'html' : 'text';
        message[type] = await render(name, data);
      } else {
        const [html, text] = await Promise.all([
          render(`${name}.html`, data),
          render(`${name}.txt`, data)
        ]);
        message.html = html;
        message.text = text;
      }
      delete message.template;
    }
    return transport.sendMail(message);
  };

  return { send };
};

module.exports = mailer();
