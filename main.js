music1 = "";
music2 = "";
leftwristx = 0;
leftwristy = 0;
rightwristx = 0;
rightwristy = 0;
song1_status = "";
song2_status = "";
scoreleftwrist = 0;
scorerightwrist = 0;

function preload() {
  music1=loadSound("music.mp3");
  music2=loadSound("music2.mp3")
}

function setup() {
  canvas = createCanvas(600, 500);
  canvas.center();

  video = createCapture(VIDEO);
  video.hide();

  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on("pose", gotPoses);
}

function modelLoaded() {
  console.log("posenet is initialized");
}

function gotPoses(results) {
  if (results.length > 0) {
    console.log(results);
    scorerightwrist=results[0].pose.keypoints[10].score;
    scoreleftwrist=results[0].pose.keypoints[9].score;
    rightwristx=results[0].pose.rightWrist.x;
    rightwristy=results[0].pose.rightWrist.y;
    leftwristx=results[0].pose.leftWrist.x;
    leftwristy=results[0].pose.leftWrist.y;
  }


}
function draw() {
image(video, 0, 0, 600, 500);
song1_status=music1.isPlaying();
song2_status=music2.isPlaying();
if(scorerightwrist > 0.2){
circle(rightwristx, rightwristy, 20);
music2.stop();

if(song1_status == false)
{
music1.play();
document.getElementById("Song").innerHTML="Playing harry potter"
}
}

if(scoreleftwrist > 0.2)
{
  circle(leftwristx, leftwristy, 20);
music1.stop();

if(song2_status == false)
{
music2.play();
document.getElementById("Song").innerHTML="Playign peter pan"
}
}

}


function play(){
song.play();
song.setVolume(1);
song.rate(1);
}
