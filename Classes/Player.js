const SAT = Matter.SAT
const Query = Matter.Query

document.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    e.preventDefault()}
  
  keys[e.key] = true;});

document.addEventListener("keyup", (e) => {keys[e.key] = false;});

class Player{
    constructor(){
        this.dead = false
        this.looking = false
        this.save = []

        this.frameDuration = 100
        this.lastFrameTime = 0
        this.currentFrame = 0

        var options = {restitution: 0, friction:0, mass: 10};
        this.body = Bodies.rectangle(400, 700, 70, 70, options);
        World.add(world, this.body);
    }
    LoadAssets(char){
      if(char === 1){
        var MoveLC = []
        var MoveRC = []

         var idleC = loadImage('Game Files/Sprites/Characters/White Man/White Moving/white f1.png')
          for (let i = 1; i <= 4; i++) {MoveRC.push(loadImage(`Game Files/Sprites/Characters/White Man/White Moving/white f${i}.png`))}
          for (let i = 1; i <= 4; i++) {MoveLC.push(loadImage(`Game Files/Sprites/Characters/White Man/White Moving B/white b${i}.png`))}

          var jumpLC = loadImage(`Game Files/Sprites/Characters/White Man/White Jumping/jump L.png`)
          var jumpRC = loadImage(`Game Files/Sprites/Characters/White Man/White Jumping/jump R.png`)
      }
      else if(char === 2){
          var MoveLC = []
          var MoveRC = []

          var idleC = loadImage('Game Files/Sprites/Characters/Tanned Man/Tanned Man Running Forwards/tanned f1.png')
          for (let i = 1;i <= 4; i++) {MoveRC.push(loadImage(`Game Files/Sprites/Characters/Tanned Man/Tanned Man Running Forwards/tanned f${i}.png`))}
          for (let i = 1;i <= 4; i++) {MoveLC.push(loadImage(`Game Files/Sprites/Characters/Tanned Man/Tanned Man Running Backwards/tanned b${i}.png`))}

          var jumpLC = loadImage('Game Files/Sprites/Characters/Tanned Man/Tanned Man Jumping/tan Jump Left.png')
          var jumpRC = loadImage('Game Files/Sprites/Characters/Tanned Man/Tanned Man Jumping/tan Jump Right.png')
      }
      else if(char === 3){
        var MoveLC = []
        var MoveRC = []

        var idleC = loadImage('Game Files/Sprites/Characters/Brown Man/Brown Man Running/brown f2.png')
        for (let i = 1;i <= 4; i++) {MoveRC.push(loadImage(`Game Files/Sprites/Characters/Brown Man/Brown Man Running/brown f${i}.png`))}
        for (let i = 1;i <= 4; i++) {MoveLC.push(loadImage(`Game Files/Sprites/Characters/Brown Man/Brown Man Running Backwards/brown b${i}.png`))}
        
        var jumpLC = loadImage('Game Files/Sprites/Characters/Brown Man/Brown Man Jumping/bro jumping left.png')
        var jumpRC = loadImage('Game Files/Sprites/Characters/Brown Man/Brown Man Jumping/bro jumping right.png')
      }
      else if(char === 4){
        var MoveLC = []
        var MoveRC = []

        var idleC = loadImage('Game Files/Sprites/Characters/Dark Skin Man/Dark Skin Man Running Forward/DS f2.png')
        for (let i = 1;i <= 4; i++) {MoveRC.push(loadImage(`Game Files/Sprites/Characters/Dark Skin Man/Dark Skin Man Running Forward/DS f${i}.png`))}
        for (let i = 1;i <= 4; i++) {MoveLC.push(loadImage(`Game Files/Sprites/Characters/Dark Skin Man/Dark Skin Man Running Backwards/DS b${i}.png`))}
        
        var jumpLC = loadImage('Game Files/Sprites/Characters/Dark Skin Man/Dark Skin Man Jumping/DS jump L.png')
        var jumpRC = loadImage('Game Files/Sprites/Characters/Dark Skin Man/Dark Skin Man Jumping/DS jump R.png')
      }
      else{
        char = 1
      }

      this.idle = idleC;
      this.change = idleC;
        
      this.moveRightFrames = MoveRC;
      this.moveLeftFrames = MoveLC;
      this.jumpLeftImage = jumpLC;
      this.jumpRightImage = jumpRC;
     
    }
    frame(){
        if (millis() - this.lastFrameTime > this.frameDuration) {
            this.currentFrame = (this.currentFrame + 1) % 4
            this.lastFrameTime = millis() 
          }
            
          return this.currentFrame
           }

    colliding(body){return(Matter.SAT.collides(this.body, body.body).collided)}
    
    updateMovement(body,falling,left,right,jump){
      body.forEach(element => {
        if (this.colliding(element) === true&&!this.dead) {
          let currentVelocityX = this.body.velocity.x;
          falling.forEach(falling => {
            if (keys[jump]&&Matter.SAT.collides(this.body,falling.body).collided === false) {
            let horizontalDirection = 0;
            this.change = this.jumpRightImage;
    
            if (keys[left]) {
              horizontalDirection = -1;
              this.change = this.jumpLeftImage;
              this.looking = true

            } else if (keys[right]) {
              horizontalDirection = 1;
              this.change = this.jumpRightImage;
              this.looking = false

            }
    
            Matter.Body.setVelocity(this.body, { x: currentVelocityX + horizontalDirection, y: -15 });
          }})
      
          if (!keys[jump]) {
            if (keys[left]) {
              Matter.Body.setVelocity(this.body, { x: -5, y: 0});
              this.change = this.moveLeftFrames[this.frame()];
              this.looking = true
            } else if (keys[right]) {
              Matter.Body.setVelocity(this.body, { x: 5, y: 0 });
              this.change = this.moveRightFrames[this.frame()];
              this.looking = false
            } else {
              Matter.Body.setVelocity(this.body, { x: 0, y: 0 });

              switch(this.looking){
                case true:
                  this.change = this.moveLeftFrames[1]
                  break
                case false:
                  this.change = this.idle
                  break
                default:
                  this.change = this.idle
                  break
              }
            }
  
        }
    }
      });
    
    
}
lookingright(){
      this.looking = false
    }

    display(){
        //Matter.Body.setInertia(this.body, 0)
        push()
        imageMode(CENTER);
        rectMode(CENTER)
        image(this.change, this.body.position.x, this.body.position.y - 9);
        fill("red")
        pop(); 
    }

    getPlayerPos(pos){
      if(pos === "x"){return(this.body.position.x)}
      else{return(this.body.position.y)}
      }
    
    dying(x, y, dead, func) {
      this.death = [];
      for (let i = 1; i <= 2; i++) {
        this.death.push(loadImage(`Game Files/Sprites/Player Dying/dying f${i}.png`));
      }
        this.death.push(loadImage('Game Files/Sprites/Player Dying/dying f6.png'))

    let currentFrame = 0;

      if (dead) {
        Matter.Body.setPosition(this.body,{x:width/2,y:height/2})
        Matter.Body.setStatic(this.body,true)
        this.dead = true;
        
        this.interval = setInterval(() => {
          this.change = this.death[currentFrame]

          if (currentFrame === 2) {
            clearInterval(this.interval)
            this.change = this.idle
            Matter.Body.setStatic(this.body,false)
            this.respawn(x, y);
            this.dead = false;
            if (typeof func === 'function') {
              func();
            }
            
          }
          else{
          currentFrame += 1
          }
        }, 500);

      }
    }
      
    respawn(x,y){
      Matter.Body.setPosition(this.body,{x:x,y:y})
      Matter.Body.setVelocity(this.body,{x:0,y:0})

      this.change = this.idle
      }
    isDead(){
      return this.dead
    }
    isFullyDead(lives){
    if(lives === 0){
    this.change = this.death[2]
    }
    
}
  getBody(){
      return this.body
    }
saveTimes(name,seconds,minutes,levelKey){
  this.save.push({
    name:name, 
    time:`${minutes}:${String(seconds).padStart(2,'0')}` , 
    level:`Level ${levelKey}`
  })
  
  addToBoard({
    name:name, 
    time:`${minutes}:${String(seconds).padStart(2,'0')}`,
    level:`Level${levelKey}`
  },levelKey)
}
}

class Dragon{
  constructor(x,y,player,w=100,h=100){
    let options = {isStatic:true}
    this.playerBody = player
    this.body = Bodies.rectangle(x,y,w,h,options)

    this.w = w
    this.h = h
    World.add(world,this.body)
  }
  display(){
    push()
    var pos =this.body.position;
    rectMode(CENTER);
    noStroke()
    fill("red");
    rect(pos.x, pos.y, this.w,this.h);
    pop()
}
initiatePhase(Phase=1){
  console.log(Phase)
  if (Phase === 1) {
    let pos = this.body.position;

    let direction = {
        x: this.playerBody.position.x - pos.x,
        y: this.playerBody.position.y - pos.y
    };

    let magnitude = Math.sqrt(direction.x * direction.x + direction.y * direction.y);
    direction.x /= magnitude
    direction.y /= magnitude

    let speed = 6
    let newX = pos.x + direction.x * speed
    let newY = pos.y + direction.y * speed

    let platforms = []
    if(platforms.length != LEVEL["level4"]["platforms"].length){
      LEVEL["level4"]["platforms"].forEach(element=>{
      platforms.push(element.getBody())
    })
    }

    let sensor = Bodies.rectangle(newX,newY,this.w,this.h)
    let collisionList = Matter.Query.collides(sensor,platforms)


    if(collisionList.length === 0){
      Matter.Body.setPosition(this.body, { x: newX, y: newY })
    }
    
    if (frameCount % this.number === 0) {
        this.count += 1;
        //LEVEL["level4"]["spikes"].push(new Projectile("fireBall", pos.x, pos.y + 55, 10));
    }

    if (this.count === 3) {
        this.number = this.number - 10;
        this.count = 0;
    }

    if (this.number === 60) {
        //Matter.Body.setPosition(this.body, { x: 250, y: 0 });
        //this.initiatePhase(2);
    }
}
  else if(Phase === 2){
     setTimeout(()=>{

     })

  }
}}
