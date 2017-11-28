var Canvas = require('canvas');

var clm = require('./js/clm.js');
var emotionClassifier = require('./js/emotion_classifier.js');
var emotionModel = require('./js/emotion_model.js');
var pModel = require('./js/models/model_pca_20_svm_emotionDetection.js');

var Image = Canvas.Image;

function image2canvas(img){
  var canvas = new Canvas(img.width, img.height);
  var overlay = new Canvas(img.width, img.height);
  var ctx = canvas.getContext('2d');
  var overlayCtx = overlay.getContext('2d');
  ctx.drawImage(img, 0,0);
  return canvas;
}

function configuredTracker(){
  var tracker = new clm.tracker({
    'searchWindow': 11,
    'scoreThreshold': 0.4, 
    'stopOnConvergence': true
  });
  tracker.setResponseMode('single',  ['lbp']);
  tracker.init(pModel);
  return tracker;
}

function configuredClassifier(){
  var ec = new emotionClassifier();
  ec.init(emotionModel);
  return ec;
}

function getHighestEmotion(emotionList){
  var highestEmotionRank = 0;
  var highestEmotionName = 'none';
  for (var a in emotionList){
      if (emotionList[a].value > highestEmotionRank){
          highestEmotionRank = emotionList[a].value; 
          highestEmotionName = emotionList[a].emotion;
      }
  }
  return highestEmotionName;
}

function getEmotions(tracker, emotionClassifier, imgbuf, cb){
  var MAX_ITER_COUNT = 200;
  
  var canvas = buffer2canvas(imgbuf)
  
  tracker.start(canvas);

  function reply(){
    var cp = tracker.getCurrentParameters();
    var er = emotionClassifier.predict(cp);
    tracker.stop();
    cb({
      emotion: getHighestEmotion(er),
      iterations: c,
      details: er,
      face: tracker.getCurrentPosition()
    })
}

  // Keep track of the number of iterations
  // Bail out if it takes too long.
  var c = 0;
  tracker.emitter.on('clmtrackrIteration', function(){
      c++;
      if(c > MAX_ITER_COUNT){ reply(); }
  });

  tracker.emitter.on('clmtrackrConverged', reply);

}

function buf2image(buf){
  var img = new Image();
  img.src = buf;
  return img;
}

function buffer2canvas(buf){
  return image2canvas(buf2image(buf));
}

function filename2image(filename){
  var img = new Image();
  var imgFile = fs.readFileSync(__dirname + '/' + filename);
  img.src = imgFile;
  return img;
}

// If this is run directly...
if (require.main === module) {
  var fs = require('fs');

  var imageName = './resources/franck_01829.jpg';
  var buf = fs.readFileSync(__dirname + '/' + imageName);
  var img = buf2image(buf);
  var ctrack = configuredTracker();
  var emotionClassifier = configuredClassifier(); 
  
  getEmotions(ctrack, emotionClassifier, buf, (d)=>console.log(d))
}

module.exports = {
  getEmotions: getEmotions,
  configuredClassifier: configuredClassifier,
  configuredTracker: configuredTracker
}





