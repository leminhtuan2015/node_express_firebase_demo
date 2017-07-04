var functions = require('firebase-functions')
var express = require('express')
var router = express.Router()
var path = require('path')

var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

var app = express()

global.app_root = path.resolve(__dirname)

setting_view_engine()
setting_express()
setting_routers()
setup_database()

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

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }))

    // parse application/json
    app.use(bodyParser.json())

    app.use(cookieParser())
}

function setup_database(){
    var firebase = require("firebase")

    var config = {
      apiKey: "AIzaSyB8dDltIyJlJq2Kf_uRBabcEM1ZD27gPAI",
      authDomain: " express123456-b5610.firebaseapp.com",
      databaseURL: "https://express123456-b5610.firebaseio.com/",
      storageBucket: "express123456-b5610.appspot.com",
    }

    firebase.initializeApp(config)

    global.database = firebase.database()
}

// ---------------------------- BEGIN RUNNING ----------------------------
// IF YOU RUN WITH NODEJS RUN ON SYSTEM -> ./start_node_server
module.exports = app
global.app_name = ""

// IF YOU DEPLOY ON FIREBASE FUNCTIONS -> ../deploy
//exports.app = functions.https.onRequest(app)
//global.app_name = "/app"

// ---------------------------- END RUNNING ----------------------------










