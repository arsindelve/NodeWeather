const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const path = require("path");
const express = require('express');
const hbs = require("hbs");
const livereload = require("livereload");

const connectLivereload = require("connect-livereload");

const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));

// define paths for express config
const app = express();
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(path.join(__dirname, "../public")));
app.use(connectLivereload());

// in app.js (or similar)
liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});

app.get("", (req, res) => {
    res.render("index", {
        title: 'Weather',
        name: "Michael"
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: 'About',
        name: "Michael"
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: 'Help',
        helpText: 'This is some help text',
        name: "Michael"
    });
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        res.send({error: "Provide an address"});
        return;
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {

        if (error) {
            return res.send({error: error});
        }

        forecast(latitude, longitude, (error, forecastData = {}) => {

            if (error) {
                return res.send({error: error});
            }

            res.send({
                address: location,
                forecast: forecastData
            });
        })
    })


});

app.get("/products", (req, res) => {

    if (!req.query.search) {
        res.send({error: "Provide a search term"});
        return;
    }
    res.send({
        products: []
    });
})


app.get("/help/*", (req, res) => {
    res.render("404", {
        title: '404',
        text: 'Help article not found',
        name: "Michael"
    });
})

app.get("*", (req, res) => {
    res.render("404", {
        title: '404',
        text: 'Page not found',
        name: "Michael"
    });
})

app.listen(3000, () => {
    console.log("Server running on port 3000");
});