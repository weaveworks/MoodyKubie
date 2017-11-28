var clm = require('./js/clm.js');
var Canvas = require('canvas');
var fs = require('fs');
var emotionClassifier = require('./js/emotion_classifier.js');
var emotionModel = require('./js/emotion_model.js');
var pModel = require('./js/models/model_pca_20_svm_emotionDetection.js');

var Image = Canvas.Image;

function filename2image(filename){
  var img = new Image();
  var imgFile = fs.readFileSync(__dirname + '/' + filename);
  img.src = imgFile;
  return img;
}

function image2canvas(img){
  var canvas = new Canvas(img.width, img.height);
  var overlay = new Canvas(img.width, img.height);
  var ctx = canvas.getContext('2d');
  var overlayCtx = overlay.getContext('2d');
  ctx.drawImage(img, 0,0);
  return canvas;
}

function configuredTracker(){
  var ctrack = new clm.tracker({
    'searchWindow': 11,
    'scoreThreshold': 0.4, 
    'stopOnConvergence': true
  });
  ctrack.setResponseMode('single',  ['lbp']);
  ctrack.init(pModel);
  return ctrack;
}

function configuredClassifier(){
  var ec = new emotionClassifier();
  ec.init(emotionModel);
  return ec;
}

var imageName = '../franck_01829.jpg';
var canvas = image2canvas(filename2image(imageName));
var ctrack = configuredTracker();
var emotionClassifier = configuredClassifier(); 

ctrack.start(canvas);

ctrack.emitter.on('clmtrackrNotFound', function(){
    console.log('clmtrackrNotFound');
});

ctrack.emitter.on('clmtrackrLost', function(){
    console.log('clmtrackrLost');
});

var c = 0;
ctrack.emitter.on('clmtrackrIteration', function(){
    console.log('clmtrackrIteration', c++);
});

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

ctrack.emitter.on('clmtrackrConverged', function(){
    console.log('clmtrackrConverged');
    var cp = ctrack.getCurrentParameters();
    var er = emotionClassifier.predict(cp);
    console.log(er);
    console.log(getHighestEmotion(er));
});

