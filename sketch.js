// will speech only works well with chrome
// using this cdn 
// <script src="https://cdn.jsdelivr.net/gh/IDMNYU/p5.js-speech@0.0.3/lib/p5.speech.js"></script>

// another cdn I am not sure which will work in china 
let off=10; // offset for sine wave
let x; // x pos for word
let story;
let myline;
let bard;
let speakButton;
let fwd;
let bkw;
function preload() {
  story = loadStrings("raven.txt");
}

function setup() {
  createCanvas(800, 600);
  colorMode(HSB,story.length,100,100)
  bard = new p5.Speech(); // speech synthesis object
  bard.onLoad = loaded;
  speakButton = createButton("Speak it");
  speakButton.size(100,100);
  speakButton.mousePressed(speakit); // callback for speech
  fwd = createButton("Forward");
  fwd.size(100,100);
  fwd.mousePressed(goForward);
  bkw = createButton("Back");
  bkw.size(100,100);
  bkw.mousePressed(goBack);
  myline = 0;
  //print(story);
}

function draw() {
  background(0);
  textSize(height/15);
  text(myline,width-50,height-50);
  fill(myline+' of '+story.length,100,100);
  x= width; // to start set x at width
  let mywords = split(story[myline],' ');
  print(mywords, myline)
  for (let i =0; i <mywords.length;i++){
    textSize(height/8);
    if (x-off <0 && i == mywords.length-1){
      x = width;
      off = 10;
    }
    text(mywords[i], x-off,(height/2)-(sin(i)*(height/3)))
    x+=textWidth(mywords[i]+50);
  }
  off +=5;

}

function speakit() {
  bard.speak(story[myline]);
  
}

function goBack() {
  if ( myline > 0) {
    myline--;
    x=width;
    off = 10;
  }
}

function goForward() {
  if (myline < story.length-1) {
    myline++;
    x=width;
    off = 10
  }
}

function loaded(){
  print("loaded");
  bard.listVoices();
}
