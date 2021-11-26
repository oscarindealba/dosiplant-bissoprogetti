const hbs = require('hbs');

//helpers
hbs.registerHelper('getAnio', () => {
    let aniomod = new Date().getFullYear()
    return aniomod;
});