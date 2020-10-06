var gamestate;
gamestate = "play";

var bg, bg;

var trex,trex_r,trex_c;

var ig;

var cloud,cloudg,clouda;

var obstacle,obstacle1,obstacle2,obstacle3,obstacleg;

var score;
score = 0;

var gameover,gameovera,restarta,restartb;

function preload(){
  
  bga  = loadImage("bg.png");
  
  trex_r = loadAnimation("trex_1.png","trex_3.png","trex_4.png");
  
  trex_c = loadAnimation("trex_collided.png");
  
  obstacle1 = loadImage("obstacle1.png");
  
  obstacle2 = loadImage("obstacle2.png");
  
  obstacle3 = loadImage("obstacle3.png");

  clouda = loadImage("cloud.png");
  
  restarta = loadImage("restart.png");
}

function setup(){
  
  createCanvas(windowWidth,windowHeight);
  
  bg = createSprite(width/2,height-250,width,height);
  bg.addImage(bga);
  bg.scale = 2;
  
  ig = createSprite(width/2,height-30,600,5);
  ig.visible = false;
  
  trex = createSprite(width-500,height-60,50,50);
  trex.addAnimation("standing",trex_r);
  trex.addAnimation("collided",trex_c);
  trex.scale = 0.6;
  trex.setCollider("rectangle",0,0,50,50);
  
  restartb = createSprite((width/2)+10,height-120,50,50);
  restartb.addImage(restarta);
  restartb.scale = 0.2;
  restartb.visible = false;
  
  cloudg = new Group();
  obstacleg = new Group();
  
}

function draw(){

  
  
  if(gamestate == "play"){
    
  bg.velocityX = -6;
  
    if(bg.x<0){
      bg.x = width/2;
    }
    
    spawnclouds();
  spawnobstacles();
    
    trex.collide(ig);
    
    if(keyDown("space")&&trex.y >= height-200){
      
      trex.velocityY = -12;
    }
    
    trex.velocityY = trex.velocityY+0.8;
    
    score = score+1;
    
    if(trex.isTouching(obstacleg)){
      
      gamestate = "end";
      
    }
  }
  else if(gamestate == "end"){
    
   trex.velocityX = 0;
    trex.velocityY = 0;
    
    bg.velocityX = 0;
    
    obstacleg.setVelocityXEach(0);
    cloudg.setVelocityXEach(0);
    
    obstacleg.setLifetimeEach(-1);
    cloudg.setLifetimeEach(-1);
    
    trex.changeAnimation("collided",trex_c);
    
    restartb.visible = true;
    
    if(mousePressedOver(restartb)){
      
      restart();
      
    }
  }
  
 drawSprites(); 
  
  if(gamestate == "end"){
    
    fill("blue");
    textSize(25);
    text("GAME OVER",width-360,height-160);
  }
  
  fill("red");
  textSize(15);
  text("Score :" + score,400,50);
}

function spawnclouds(){
  
  if(frameCount%60 == 0){
  
  cloud = createSprite(width,height-80,40,10);
    cloud.addImage(clouda);
    
  cloud.y = Math.round(random(50,100));
    
    cloud.velocityX = -6;
    
    cloud.depth = trex.depth;
    trex.depth = trex.depth+1;
    
    cloud.lifetime = 100;
    
    cloudg.add(cloud);
  }
  
  }

function spawnobstacles(){
  
  if(frameCount%60 == 0){
    
   var obstacle = createSprite(width,height-60,10,40);
    
    obstacle.velocityX = -(6 + 3*score/100);
    
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      default: break;
    }
              
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
  
    obstacleg.add(obstacle);
    
    obstacle.depth = trex.depth;
    trex.depth= trex.depth+1;
    
  }
}

function restart(){
  
  gamestate = "play";
  
  restartb.visible = false;
  
  cloudg.destroyEach();
  obstacleg.destroyEach();
  
  trex.changeAnimation("standing",trex_r);
  
  score = 0;
}
  