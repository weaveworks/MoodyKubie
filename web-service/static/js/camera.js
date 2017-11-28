

var spinner;

var spinnerOptions = {
  lines: 13, // The number of lines to draw
  length: 21, // The length of each line
  width: 17, // The line thickness
  radius: 29, // The radius of the inner circle
  scale: 1, // Scales overall size of the spinner
  corners: 1, // Corner roundness (0..1)
  color: '#ffffff', // CSS color or array of colors
  fadeColor: 'transparent', // CSS color or array of colors
  opacity: 0.25, // Opacity of the lines
  rotate: 0, // The rotation offset
  direction: 1, // 1: clockwise, -1: counterclockwise
  speed: 1, // Rounds per second
  trail: 60, // Afterglow percentage
  fps: 20, // Frames per second when using setTimeout() as a fallback in IE 9
  zIndex: 2e9, // The z-index (defaults to 2000000000)
  className: 'spinner', // The CSS class to assign to the spinner
  top: '50%', // Top position relative to parent
  left: '50%', // Left position relative to parent
  shadow: "none", // Box-shadow for the lines
  position: 'absolute' // Element positioning
}



function showSnapshot(snapshot){
  return new Promise(function(resolve, reject){
    snapshot.get_canvas(function(canvas){
      $("#snap-container").html("").append(canvas);
      resolve(snapshot);
    });
  });

}

function showSpinner(snapshot){
  spinner = new Spinner.Spinner(spinnerOptions).spin();
  document.getElementById('snap-container').appendChild(spinner.el);
  return Promise.resolve(snapshot);
}

function hideSpinner(info){
  spinner.stop();
  return Promise.resolve(info);
}

function getEmotions(snapshot){
  return new Promise(function(resolve, reject){
    snapshot
      .upload({api_url: "/classify_emotions"})
      .done(function(info){
        resolve(JSON.parse(info));
      })
      .fail(function(status_code, error_message, response) {
        console.error("Upload failed with status " + status_code);
        reject(new Error("Upload failed with status "+status_code+": "+error_message));
      });
  });
};

function showEmotions(info){
  console.log(info)
  
  // Show most likely emotion
  $(".emotion").html(info.emotion)

  var canvas = $('#snap-container canvas')[0];
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = "#00ff00";
  
  info.face.forEach(function(point){
    ctx.fillRect(point[0], point[1], 10,10);
  })

  return Promise.resolve(info);
};

function getAndShowEmotions(){
  getEmotions(showEmotions);
}

$(function(){
  var camera = new JpegCamera("#camera");

  $(".uploadbutton").click(function(){

    showSnapshot(camera.capture())
      .then(showSpinner)
      .then(getEmotions)
      .then(hideSpinner)
      .then(showEmotions)
      .catch(function(err){
        console.error(err);
      })

  })

});
