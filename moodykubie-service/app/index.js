const express = require('express');
const bodyParser = require('body-parser');
const emotions = require("./emotions");

const app = express();
app.use(bodyParser.raw({
    inflate: true,
    limit: '100kb',
    type: 'application/octet-stream'
}));

function once(fn, context) {
    var execd = false;
    return function() {
        if (!execd) {
            execd = true;
            return fn.apply(context || this, arguments);
        }
    }
}

app.post('/classify-emotions', function (req, res) {
    console.log("Classifying image");
    var canvas = null;
    try{
        var tracker = emotions.configuredTracker();
        var classifier = emotions.configuredClassifier();
        emotions.getEmotions(tracker, classifier, req.body, once(function (reply) {
            console.log("Image Classified after " + reply.iterations + " iterations");
            res.json(reply);
        }));
    } catch (e) {
        console.error(e);
        res.status(500).json({error: "Failed to process image."});
    }
});

console.log("Emotion detection service live on port 8989");
app.listen(8989);

process.on('uncaughtException', function(err) {
    console.error(err);
});
