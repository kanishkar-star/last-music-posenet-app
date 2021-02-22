var harryPotterSong = "";
var peterPanSong = "";

var leftWristX = 0;
var rightWristX = 0;

var leftWristY = 0;
var rightWristY = 0;

var scoreLeftWristY = 0;
harryPotterSongStatus = '';
var color_timer;

function preload(){
    harryPotterSong = loadSound('music.mp3');
    peterPanSong = loadSound('music2.mp3');
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotpose);

}

function modelLoaded(){
    console.log("PoseNet is Intialized");
}

function gotpose(results){
    if(results.length > 0){
        console.log(results);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log('The X Position of the Left Wrist is = ' + leftWristX
         + " and The Y Position of Left Wrist = " + leftWristY + ' The X Position of the Right Wrist is = ' + rightWristX 
         + 'and The Y Position of the right Wrist = ' + rightWristY);

         scoreLeftWristY = results[0].pose.keypoints[9].score;
    }
}

function draw(){
    image(video, 0, 0, 600, 500);
    canvas.mousePressed(canvasPressed);
    color_timer = color(random(255), random(255), random(255));
    function canvasPressed(){
        tint(color_timer)
    }

    if(scoreLeftWristY > 0.2){
        fill('#ff0000');
        circle(leftWristX, leftWristY, 20);

        harryPotterSong.play();
        harryPotterSong.setVolume(1);
        harryPotterSong.speed(1);
        harryPotterSongStatus = harryPotterSong.isPlaying();
        console.log(harryPotterSongStatus);
        document.getElementById('harry_potter').innerHTML = "Harry Potter Song is Playing";
    }

    if(harryPotterSongStatus = 'false'){
        harryPotterSong.stop();
    }
}

function change_color(){
    document.getElementById('say_timer').style.color = color_timer;
}

