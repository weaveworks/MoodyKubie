const express = require('express');
const bodyParser = require('body-parser');
const emotions = require("./emotions");

const prom = require('prom-client');
const counter = new prom.Counter({
  name: 'emotions_total',
  help: 'Total number of recognised emotions.',
  labelNames: ['emotion']
});

const app = express();
app.use(bodyParser.raw({
    inflate: true,
    limit: '50mb',
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
            counter.labels(reply.emotion).inc();
            res.json(reply);
        }));
    } catch (e) {
        console.error(e);
        res.status(500).json({error: "Failed to process image."});
    }
});

console.log("Emotion detection service live on port 8989");
const server = app.listen(8989);

app.get('/metrics', (req, res) => {
  res.set('Content-Type', prom.register.contentType);
  res.end(prom.register.metrics());
});

process.on('uncaughtException', function(err) {
    console.error(err);
});

process.on('SIGINT', () => {
  server.close((err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    process.exit(0);
  });
});
