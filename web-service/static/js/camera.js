$(function(){
  
  var camera = new JpegCamera("#camera");

  $(".uploadbutton").click(function(){
    var snapshot = camera.capture();
    snapshot.upload({api_url: "/classify_emotions"}).done(function(response) {
      console.log(response);
    }).fail(function(status_code, error_message, response) {
      alert("Upload failed with status " + status_code);
    });
  });

});
/*
var snapshot = camera.capture();

snapshot.show(); // Display the snapshot

snapshot.upload({api_url: "/upload_image"}).done(function(response) {
  response_container.innerHTML = response;
  this.discard(); // discard snapshot and show video stream again
}).fail(function(status_code, error_message, response) {
  alert("Upload failed with status " + status_code);
});
*/
