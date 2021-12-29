var nature,natureImg;
var bot,botImg;
var bolt,boltImg;
var energy,energyImg;
var red,redImg;
var bom,bomImg;
var bot1,bot1Img;
var gameover,gameoverImg;
var redG,energyG,boltG,bomG;
var mego, megoImg;
var mesi, mesiImg;
var level = 1;
var points = 0;

var PLAY=1;
var END=0;
var gameState=PLAY;


function preload(){
  natureImg = loadImage("assets/nature.png");
  botImg = loadAnimation("assets/bot.png");
  boltImg = loadImage("assets/bolt.png");
  energyImg = loadImage("assets/energy.png");
  redImg = loadImage("assets/red.png");
  bomImg = loadImage("assets/bom.png","assets/bot1.png");
  bot1Img = loadAnimation("assets/bot1.png");
  gameoverImg = loadImage("assets/gameover.png");
}

function setup() {
  createCanvas(800,800);
  edges= createEdgeSprites();
  nature=createSprite(400,200,width,height);
  nature.addImage("nature",natureImg);
  nature.velocityX = -5;
  //nature.x = nature.width /2;
  nature.scale=0.5;

  bot=createSprite(200,20,50,50);
  bot.addAnimation("bot",botImg);
  bot.addAnimation("bot1",bot1Img)
  bot.scale = 0.05;

  redG=new Group();
  energyG=new Group();
  bomG=new Group();
  boltG=new Group();

  gameOver = createSprite(200,100,20,20);
  gameOver.addImage("gameover",gameoverImg);
  gameOver.scale = 0.5;
  gameOver.visible = false;

}

function draw() {
  
    if(gameState===PLAY){
      background(0);
      if (nature.x < 0){
      nature.x = 400;
    }
      bot.x = World.mouseX;
      bot.y = World.mouseY;
      bot.collide(edges);

      if(level === 1){
        spawnBolt();
        spwanRed();
        spawnBom();
        spawnEnergy();
        
        
  
        if (boltG.isTouching(bot)) {
          boltG.destroyEach();
          points=points+30;
        }
        else if (energyG.isTouching(bot)) {
          energyG.destroyEach();
          points=points+80; 
                
        }else if(redG.isTouching(bot)) {
          redG.destroyEach();
           points=points-100; 
          
        }else{
            if(bomG.isTouching(bot)) {
                gameState = END;
          }
        }

        if(points >= 1000){
          text("Completed Level 1",250,250);
          text("Press space Key to move to the next level",250, 300);
          
          if(keyDown("space")){
            level = 2;
          }
        }
      }
      
    }


    else if (gameState === END){
      text("Press Up Arrow to Restart The Game",500,200);
      if(level === 1){
      energyG.setVelocityYEach(0);
      boltG.setVelocityYEach(0);
      redG.setVelocityYEach(0);
      bomG.setVelocityYEach(0);
      }
      
      gameOver.visible = true;
      bot.changeAnimation("bot1", bot1Img);
      bot.x = 200;
      bot.y = 200;

      if(keyDown("up")) {
        reset();
      }
     }


  
  drawSprites();
  textSize(20);
  fill(255);
  text("point: "+ points,150,30);
}

function spawnBolt(){
    if (frameCount % 200 == 0) {
    bolt = createSprite(Math.round(random(50, 750),40, 10, 10));
    //bolt.addImage(boltImg);
    bolt.scale=0.5;
    bolt.velocityY = 3;
    bolt.lifetime = width/3;
    boltG.add(bolt);
    }
  }

  function spawnEnergy() {
    if (frameCount % 200 == 0) {
    energy = createSprite(Math.round(random(50, 750),40, 10, 10));
    //energy.addImage(energyImg);
    energy.scale=0.5;
    energy.velocityY = 3;
    energy.lifetime = width/3;
    energyG.add(energy);
    }
  }

  function spwanRed() {
    if (frameCount % 200 == 0) {
    red = createSprite(Math.round(random(50, 750),40, 10, 10));
    //red.addImage(redImg);
    red.scale=0.5;
    red.velocityY = 3;
    red.lifetime = width/3;
    redG.add(red);
    }
  }

  function spawnBom(){
    if (frameCount % 530 == 0) {
    bom = createSprite(Math.round(random(50, 750),40, 10, 10));
    //bom.addImage(bomImg);
    bom.scale=0.5;
    bom.velocityY = 3;
    bom.lifetime = width/3;
    bom.depth = bom.depth;
    bom.depth = bom.depth + 1;  
    bomG.add(bom);     
    }
  }

  function reset (){
    gameState = PLAY;
    gameOver.visible = false;
    bot1.visible = false;  
    boltG.destroyEach();
    redG.destroyEach();
    energy.destroyEach();
    bomG.destroyEach();
    point = 0;    
  }