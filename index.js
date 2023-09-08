const express = require("express");
const bodyParser = require("body-parser");
const https = require('node:https');
const app = express();
const ejs = require("ejs");
var axios = require("axios").default;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static("public"));

var api_news = "5R5sP4UheBG7gk5Z6DZ2FbUhSW9oCh2Hered1izDwPY"


var options = {
    method: 'GET',
    url: 'https://api.newscatcherapi.com/v2/search',
    params: { q: 'olympic', lang: 'en', sort_by: 'relevancy', page: '1' },
    headers: {
        'x-api-key': api_news
    }
};
var content;

axios.request(options).then(function(response) {
    content = response.data["articles"];
}).catch(function(error) {
    console.error(error);
});

app.get("/news", function(req, res) {
    res.render("news", {
        content: content
    });
});

app.get("/analysis", function(req, res) {
    res.sendFile(__dirname + "/analysis.html");
});
app.get("/analysis.html", function(req, res) {
    res.sendFile(__dirname + "/analysis.html");
});

app.get("/", function(req, res) {
    res.render("index");
});

app.get("/play", function(req, res) {
    res.render("play")
})
app.get("/about", function(req, res) {
    res.render("about")
})

app.listen(3000, function() {
    console.log("Server started on port 3000");
});