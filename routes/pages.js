const { Router } = require('express');
const Pages = Router();

Pages.get("/", (req, res) => {
    res.render("home"); //, {
    // userlogin: "Oscar de Alba",
    //});
});

Pages.get("/produccion", (req, res) => {
    res.render("produccion", {
        userlogin: "Oscar de Alba",

    });
});

Pages.get("/realvssp", (req, res) => {
    res.render("realvssp", {
        userlogin: "Oscar de Alba",

    });
});

Pages.get("/operacion", (req, res) => {
    res.render("operacion", {
        userlogin: "Oscar de Alba",

    });
});


Pages.get("/login", (req, res) => {
    res.render("login", {
        userlogin: "Oscar de Alba",

    });
});

module.exports = Pages;