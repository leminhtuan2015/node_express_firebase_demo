var functions = require('firebase-functions')
var express = require('express')
var router = express.Router()
var path = require('path')

var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

var app = express()

global.app_root = path.resolve(__dirname)


setting_routers()
setting_view_engine()
setting_express()

// ---------------------------- BEGIN TEST ----------------------------
//https://us-central1-languagelistening.cloudfunctions.net/app/api
//https://us-central1-languagelistening.cloudfunctions.net/app/test
//https://us-central1-languagelistening.cloudfunctions.net/home

exports.home = functions.https.onRequest((request, response) => {
    response.send("HOME");
})

app.get('/api', (request, response) => {
    response.send("API");
});

// ---------------------------- END TEST ----------------------------

function setting_routers(){
    require("./router")(router)

    app.use(router);
}

function setting_view_engine(){
    app.set('views', path.join(__dirname, 'app/views'));
    app.use(express.static(path.join(__dirname, 'app/public')))
    app.set('view engine', 'ejs');
}

function setting_express(){
    app.use(logger('dev'))
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(cookieParser())
}

// ---------------------------- BEGIN RUNNING ----------------------------
// IF YOU RUN WITH NODEJS RUN ON SYSTEM -> ./start_node_server
global.app_function = ""
module.exports = app

// IF YOU DEPLOY ON FIREBASE FUNCTIONS -> ./deploy
//global.app_function = "app"
//exports.app = functions.https.onRequest(app)

// ---------------------------- END RUNNING ----------------------------










