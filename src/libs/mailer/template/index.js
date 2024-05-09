const handlebars = require('handlebars');

exports.generateEmailTemplate = ({ subject, greeting, message}) => {
  const templateString = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${subject}</title>
        </head>
        <body>
            <h1>${greeting}</h1>
            <p>${message}</p>
        </body>
        </html>
    `;
  const template = handlebars.compile(templateString);
  const generatedTemplate =  template({subject, greeting, message})
  return generatedTemplate
}