
var trex ,trex_running,ground,groundImage,ground2,Cloud,cloud,obsacle4,obst1,obs1,obs2,obs3,obs4,obs5,obs6,defeat,cloudgrp,obsgrp, score = 0,play = 1,end = 0, gameState = play,gameOver,restart,jump,checkpoint,die ;

localStorage["highscore" ] = 0;

function preload(){
  trex_running =  loadAnimation("trex1.png","trex3.png","trex4.png")
 groundImage = loadImage("ground2.png")
  Cloud = loadImage("cloud.png")
  obs1=loadImage("obstacle1.png")
  obs2=loadImage("obstacle2.png")
  obs3=loadImage("obstacle3.png")
  obs4=loadImage("obstacle4.png")
  obs5=loadImage("obstacle5.png")
  obs6=loadImage("obstacle6.png")
  defeat = loadAnimation("trex_collided.png")
  gameover=loadImage("gameOver.png")
  restrt = loadImage("restart.png")
  jump=loadSound("jump.mp3")
  die = loadSound("die.mp3")
  checkpoint = loadSound("checkPoint.mp3")

}

function setup(){
  createCanvas(600,300)
  
  gameOver = createSprite(300,150)
    gameOver.addImage("over",gameover)
    restart = createSprite(300,190,20,20)
    restart.addImage("again?",restrt)
    restart.scale = 0.1
  
  
  cloudgrp = new Group ()
  obsgrp = new Group()

  trex =  createSprite(50,270)
  trex.addAnimation("run", trex_running)
  trex.addAnimation("lost",defeat)
  trex.scale = 0.7
  
  ground2 = createSprite(300,280,600,10)
  ground2.visible = false
  
  ground = createSprite(300,270)
  ground.addImage("dirt", groundImage)
  ground.x = ground.width/2
  
  
  edges = createEdgeSprites()
  
   // trex.debug = true
  // obst1.debug = true
  trex.setCollider("circle",0,0,34)
}

function draw(){
     
 
  
 console.log(trex.y)
  
  background("#fdfdfc")
  
  textSize(15)
  fill("black")
  text("score: "+ score , 520,20 )
  stroke("black")
  fill("black")
   text("HS: "+localStorage["highscore"],420 , 20 );
  
  
  if(gameState === play){
if(keyDown("space") && (trex.y >=251 )){    
 trex.velocityY = -15
  jump.play()
  
}
    if(score%100===0 && score> 0 ){
      checkpoint.play()
      
      
    }
    
    ground.velocityX = -(6 + score/100)
     gameOver.visible = false
  restart.visible = false
    
    // text("made by Khushal Ratre",50,50)
    // textSize(140)
    // fill("#dfcf63")
    // textFont("MineCrafter")
    // text(" 𝕂𝕙𝕦𝕤𝕙𝕒𝕝 ",-50,300)

    
if(ground.x<0){

  ground.x = ground.width/2
    
} 
    if ( trex.isTouching(obsgrp)){
      gameState = end
      // jump.play()
      // trex.velocityY = -12
    }
    trex.velocityY = trex.velocityY + 1.0
     
    score = Math.round(getFrameRate()/ 30 + score)
   trex.changeAnimation("run", trex_running)
    
      cloudNo()
  obstacle()
 }
    
    
    
  else if(gameState === end){

    trex.velocityY = 0
    
     gameOver.visible= true
      restart.visible = true
    ground.velocityX = 0
    trex.changeAnimation("lost",defeat)
   obsgrp.setVelocityXEach(0);
    cloudgrp.setVelocityXEach(0);
    obsgrp.setLifetimeEach(-1);
    cloudgrp.setLifetimeEach(-1);
  }
  
  
   
  //mousePressedOver (restart);
  // text(score,550,20)
  //function - function call and function definition
 
      if(mousePressedOver(restart) && (gameState === end)){  
        reset();
    }
  //trex.collide(edges[2])
  //trex.collide(ground)
  trex.collide(ground2)
  
 
drawSprites();
}

function cloudNo(){
  if(frameCount%150 === 0 ){
     cloud = createSprite(width,Math.round(random(10,150)),20,20)
  cloud.velocityX = -3
  cloud.addImage("cloud",Cloud)
  cloud.scale = 0.8
  //console.log(cloud.depth)
  trex.depth = cloud.depth+1
 cloud.lifetime = 210
    cloudgrp.add(cloud)
  }
}

  function obstacle(){
    
 
    
  if(frameCount%100 === 0 ){
     obst1 = createSprite(width,260,20,20)
     obst1.velocityX = -(6 + score/100 )
     obst1.lifetime = 210
    obst1.scale = 0.6
        obsgrp.add( obst1 )  
  
    
    var r = Math.round(random(1,6))

    switch(r){
           case 1:
           obst1.addImage ("obs1", obs1 );
        
        break;
           case 2:
           obst1.addImage ("obs1", obs2 );
        
        break;
           case 3:
           obst1.addImage ("obs1", obs3 );
       
        break;
           case 4:
           obst1.addImage ("obs1", obs4 );
       
        break;
        case 5 :
        obst1.addImage ("obs1",obs5)
        break;
           case 6:
           obst1.addImage ("obs1", obs6 );
        
           break;
           }
   // console.log(r)
    }
  }

    function reset(){
      
      gameState = play;
      obsgrp.destroyEach()
     cloudgrp.destroyEach()
       
  if (localStorage["highscore"] < score){ 
    localStorage["highscore"] = score ;
    
  }   
      
  score = 0      
     }






  
 