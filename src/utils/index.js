const path = require('path');
const fs = require('fs');
const Handlebars = require('handlebars');

const { convertBufferToString, listReturnsHandlebar } = require('./functions');

const createPdf = async (templatePath, data) => {
    templatePath = `templates/${templatePath}.html`;
    const htmlPath = path.resolve(__dirname, templatePath);

    const sourceHtml = convertBufferToString(fs.readFileSync(htmlPath));
    const template = Handlebars.compile(sourceHtml);

    Handlebars.registerHelper('returns', listReturnsHandlebar);

    const resultHtml = template(data);

    return resultHtml;
};

module.exports = { createPdf };
