var bg,bgImg1,bgImg2
var monster,monsterImg
var gun,gunImg 
var ammo,ammoImg

function preload(){
   bgImg1 = loadImage("bg-1.jpeg")
   bgImg2 = loadImage("bg-2.jpeg")
   monsterImg = loadImage("monsters.png")
   gunImg = loadImage('gun_1.png')
   bulletImg = loadImage("bullet1.png")
   crosshairImg = loadImage("CROSSHAIR.png")


}

function setup(){
   createCanvas(displayWidth-100,displayHeight-100);
   bg = createSprite(width/2,height/2);
   bg.addImage(bgImg1);
   bg.scale=0.7;

   gun=createSprite(width/2,height-200);
   gun.addImage(gunImg);
   monsterGroup = new Group()
   bulletGroup = new Group()
   crosshair = createSprite(gun.x,gun.y-20)
   crosshair.addImage(crosshairImg)
  // gun.rotation = 90;
//gun.rotateToDirection=true;
//gun.velocityX = 5;
   
}
function draw() {
   background("black")
   

  if (keyDown(LEFT_ARROW)&&gun.x>width/2-100) {
    gun.x-=5
  }
  if (keyDown(RIGHT_ARROW)&&gun.x<width/2+400) {
    gun.x+=5
  } 
  gun.x = mouseX;
  gun.y = mouseY; 
  crosshair.x = gun.x;
  crosshair.y = gun.y-20;
  monsters();
  if(mousePressedOver(bg)||mousePressedOver(monsterGroup)) {
    shoot();
  }
  for(j = 0;j<bulletGroup.length;j++){
  for(i = 0;i<monsterGroup.length;i++){
  
  if(bulletGroup.get(j).isTouching(monsterGroup.get(i))){
      monsterGroup.get(i).destroy()
  } } }
  drawSprites();
    
}
function monsters() {
    if(frameCount%40===0) {
      monster = createSprite(200,200)
      monster.x = Math.round(random(50,width-250))
      monster.y = Math.round(random(100,height-300))
      monster.addImage(monsterImg)
      monster.velocityY = 0.5;
      monster.lifetime = 800;
      monsterGroup.add(monster)
      gun.depth = monster.depth+1
      crosshair.depth = monster.depth+1
      monster.debug = false;
    }

}

function shoot() {
  bullet =createSprite(gun.x+20,gun.y+40) 
  bullet.addImage(bulletImg)
  bullet.velocityZ = -10;
  bulletGroup.add(bullet)
  bullet.lifetime = 20;
  bullet.debug =false;
  bullet.setCollider("circle",0,0,20)
}