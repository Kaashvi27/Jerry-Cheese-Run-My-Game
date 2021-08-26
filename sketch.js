const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var engine, world;
var jerry,jerryImg,bg,path;
var ground,invisibleGround;
var ground1;
var tom;
var butch;
var cheese,cheeseImg,cheeseGroup;
var obstacle,obstacle1, obstacle2, obstacle3, obstacleGroup;

function preload(){
bg = loadImage("Background.jpg");
jerryImg = loadImage("Jerry 3.png");
path = loadImage("Road.jpg");
obstacle1 = loadImage("Tom.png");
obstacle2 = loadImage("Butch 1.png");
obstacle3 = loadImage("Butch 2.png");

cheeseImg = loadImage("Cheese.png");

}

function setup() {
  var canvas = createCanvas(windowWidth,windowHeight);
  engine = Engine.create();
  world = engine.world;
  
  ground1 = createSprite(0,0,windowWidth,windowHeight/2);
  ground1.addImage(bg);
  ground1.scale = 1.8;  
  ground1.velocityX = -2;

  ground = createSprite(0,430);
  ground.addImage(path);
  ground.scale = 2.5;
  ground.velocityX = -3;
  jerry = createSprite(50,360);
  jerry.addImage(jerryImg);
  jerry.scale = 0.5;

  invisibleGround = createSprite(400,580,displayWidth,20);
  invisibleGround.visible = false;

  obstacleGroup = createGroup();
  cheeseGroup = createGroup();
}


function draw() {
  background(0);
  Engine.update(engine);
   if(ground1.x<370 && ground.x<370){
    ground1.x = displayWidth;
    ground.x = displayWidth;
   }

   //if(keyDown("space")&& jerry.y>=200){
     //jerry.velocityY = -10;
   //}
  //jerry.velocityY = jerry.velocityY + 0.8;
  if(keyDown("up")){
    jerry.y = jerry.y - 5;
  }
  if(keyDown("down")){
    jerry.y = jerry.y + 5;
  }
  spawnCheese();
  spawnObstacles();
  jerry.collide(invisibleGround);

  
  drawSprites();
}

function spawnCheese(){
  if(frameCount%80===0){
    cheese = createSprite(800,Math.round(random(250,350)),40,10);
    cheese.addImage(cheeseImg);
    cheese.velocityX = -3;
    cheese.scale = 0.2;
    cheese.lifetime = 400;
    cheeseGroup.add(cheese);
  }
}

function spawnObstacles(){
  if(frameCount%150===0){
    obstacle = createSprite(800,Math.round(random(250,550)),10,40);
    var r = Math.round(random(1,3));
    switch(r){
      case 1:obstacle.addImage(obstacle1);
          obstacle.scale = 0.6;
          break;
      case 2:obstacle.addImage(obstacle2);
          break;
      case 3:obstacle.addImage(obstacle3);
          obstacle.scale = 1.2;
          break;
      default:break;
    }
    
    obstacle.velocityX = -3;
    obstacle.scale = 0.2;
    obstacle.lifetime = 400;
    obstacleGroup.add(obstacle);
  }
}