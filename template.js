// const fs = require('fs');
// const handlebars = require('handlebars');

// class Template {
//   constructor() {
//     this.templates = {};
//   }

//   async render(template_path, data) {
//     let template = this.templates[template_path];

//     if (!template) {
//       template = await new Promise((resolve, reject) => {
//         fs.readFile(template_path, 'utf-8', (err, template_data) => {
//           if (err) {
//             return reject(err);
//           }
//           return resolve(handlebars.compile(template_data));
//         });
//       });
//       this.templates[template_path] = template;
//     }
//     return template(data);
//   }

//   register(helper_name, fn) {
//     handlebars.registerHelper(helper_name, fn);
//   }
// }

// module.exports = new Template();


const fs = require('fs');
const handlebars = require('handlebars');

const templates = {};

async function render(template_path, data) {
  let template = templates[template_path];

  if (!template) {
    template = await new Promise((resolve, reject) => {
      fs.readFile(template_path, 'utf-8', (err, template_data) => {
        if (err) {
          return reject(err);
        }
        return resolve(handlebars.compile(template_data));
      });
    });
    templates[template_path] = template;
  }

  return template(data);
}

function register(helper_name, fn) {
  handlebars.registerHelper(helper_name, fn);
}

module.exports = {
  render,
  register
};
