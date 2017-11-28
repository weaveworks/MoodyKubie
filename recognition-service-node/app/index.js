

var express = require('express')
var bodyParser = require('body-parser');

var emotions = require("./emotions");

var tracker = emotions.configuredTracker();
var classifier = emotions.configuredClassifier();

var app = express()
app.use(bodyParser.raw({
    inflate: true,
    limit: '100kb',
    type: 'application/octet-stream'
}));

function once(fn, context){
    var execd = false;
    return function(){
        if (!execd){
            execd = true;
            return fn.apply(context || this, arguments);
        }
    }
}

app.post('/classify-emotions', function (req, res) {
    console.log("Classifying image")
    var canvas = null;
    emotions.getEmotions(tracker, classifier, req.body, once(function (reply){
        console.log(reply)
        res.json(reply)
    }));
})

console.log("Emotion detection service live on port 8989")
app.listen(8989)

