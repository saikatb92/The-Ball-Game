var ballSize = 50;
var ball;
var xSpeed = window.innerWidth/2;
var ySpeed = 51;
var xProgress = 7;
var yProgress = 7;
var stickSize = 100;
var xStickStart = window.innerWidth/2-stickSize;
var yStickStart = window.innerHeight-100;
var stick;
var angle;
var score = 0;
var level = 1;
var scoreX = 10;
var scoreY = 30;
var levelX = window.innerWidth-60;
var levelY = 30;
var level2Score = 2;
var level3Score = 5;
var winScore = 8;
var stickSpeed = 12;
var won = false;
function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    background(20, 20, 200);
    ball = new CreateBall();
    stick = new CreateStick();
}

function draw() {
    frameRate(60);
    background(60, 120, 220);
    fill(255);
    textSize(20);
    noStroke();
    text("Score\n "+score, scoreX, scoreY);
    if(won == false)
    text("Level\n"+level, levelX, levelY);
    else
    text("       Congratulations!!\n You Completed Successfully.", levelX-220, levelY);    
    ball.move();
    stick.showStick();
    stick.moveStick();
    
}

function CreateBall() {
    this.x = ballSize;
    this.y = ballSize;
    fill(240, 30, 70);
    ellipse(xSpeed, ySpeed, this.x, this.y);
    
    this.move = function() {
        fill(240, 30, 70);
        this.xSpeed = xSpeed; 
        this.ySpeed = ySpeed;
        noStroke();
        ellipse(this.xSpeed, this.ySpeed, this.x, this.y);
        xSpeed += xProgress;
        ySpeed += yProgress;
        
        if(xSpeed <=0+(ballSize/2) || xSpeed >= window.innerWidth-(ballSize/2)) {
            xProgress = -xProgress;
        }
        
         if(ySpeed <= 0+(ballSize/2)) {
            yProgress = -yProgress;
        }
         if(ySpeed >= window.innerHeight) {                    // When you miss then start from the begining
             level = 1;
             this.resetBall();
             stick.resetStick();
        }
        
         if((xSpeed >= xStickStart-ballSize/2-10 && xSpeed <= xStickStart+stickSize+ballSize/2+10) && (ySpeed >= yStickStart-ballSize/2-2 && ySpeed <= yStickStart-ballSize/2+10)) {
           
            score++;                                            // Increase Score when dodged properly
             
//__________________________________________________Level 2 Calculation_____________________________________________________
             if(score >= level2Score && score < level3Score){ 
              level = 2;
              stickSize = 70;
                if(score === level2Score){
              xProgress = xProgress+xProgress*0.2;
              yProgress = yProgress+yProgress*0.2;
                }
            }
        
//___________________________________________________Level 3 Calculation____________________________________________________
             if(score >=level3Score && score < winScore){
              level = 3;
              stickSize = 50; 
             if(score === level3Score){
              xProgress = xProgress+xProgress*0.2;
              yProgress = yProgress+yProgress*0.2;
                }
             }
             if(score>=winScore)
              won = true;
            yProgress = -yProgress;
            
        }
        
          if((xSpeed >= xStickStart-ballSize/2-10 && xSpeed <= xStickStart+stickSize+ballSize/2+10) && (ySpeed > yStickStart-ballSize/2+11 && ySpeed <= yStickStart+ballSize/2+15)) {
            
            
            xProgress = -xProgress;
           
        }
        
    }
    
    this.resetBall = function(){
        if(frameCount%180 == 0){
            xSpeed = window.innerWidth/2;
            ySpeed = 51;
            xProgress = 7;
            yProgress = 7;
                
            }
             score = 0;
        
    }
}

function CreateStick() {
    
    this.showStick = function() {
        this.x = xStickStart;
        this.y = yStickStart;
        this.p = this.x+stickSize;
        this.q = yStickStart;
        stroke(160, 165, 5);
        strokeWeight(5);
        line(this.x, this.y, this.p, this. q);
    }
      
    this.moveStick = function(){
        
        if(keyIsDown(RIGHT_ARROW) && this.p<window.innerWidth ) {
            xStickStart += stickSpeed;
            this.p = this.x+stickSize;
        }
        
        else if(keyIsDown(LEFT_ARROW) && this.x>0) {
            xStickStart -= stickSpeed;
            this.p = this.x+stickSize;
        }
    }
    
    this.resetStick = function(){
        stickSize = 100;
        xStickStart = window.innerWidth/2-stickSize;
        yStickStart = window.innerHeight-100;
        this.p = xStickStart+stickSize;
    }
}

