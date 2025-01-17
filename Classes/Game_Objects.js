class Platform{
    constructor(x,y,w,h) {
      var options = {
          isStatic: true,
          restitution:0,
          friction:10
      }
      this.body = Bodies.rectangle(x,y,w,h,options);
      this.x = x
      this.y = y
      this.w = w; 
      this.h = h;
      World.add(world, this.body);
    }
    display(levelKey){
    push()
    var pos = this.body.position;

    switch (levelKey) {
        case 1:
            push()
            noStroke()
            rectMode(CENTER);
            fill("#542D1C");
            rect(pos.x, pos.y, this.w+1,this.h+1);
            fill("#3F9B0B")
            rect(pos.x, pos.y-(this.h/2)+25,this.w,50)
            pop()
            break
        case 2:
            push()
            noStroke()
            rectMode(CENTER);
            fill("#38291C")
            rect(pos.x, pos.y, this.w+1,this.h+1);
            fill("#4e3e27")
            rect(pos.x, pos.y-(this.h/2)+25,this.w,50)
            pop()
            break
        case 3:
            push()
            noStroke()
            rectMode(CENTER);
            fill("#e6ae5a")
            rect(pos.x, pos.y, this.w+1,this.h+1);
            if(this.h > 50){
            fill("#d69647")
            rect(pos.x, pos.y-(this.h/2)+25,this.w,50)
            }
            pop() 
            break
        case 4:
            push()
            noStroke()
            rectMode(CENTER);
            fill("#e6ae5a")
            rect(pos.x, pos.y, this.w+1,this.h+1);
            if(this.h > 50){
            fill("#d69647")
            rect(pos.x, pos.y-(this.h/2)+25,this.w,50)
            }
            pop() 
            break
        default:
            break
    }
    pop()
    }
    change(change){
      if(change === "yes"){
        World.remove(world,this.body)
      }
      else if(change === "no"){
        World.add(world,this.body)
      }
    }
    getBody(){return this.body}
  };

class Spikes extends Platform{
    constructor(x,y,w,h,type){
        super(x,y,w,h)
        this.dead = false
        this.moving = false
        this.img = loadImage('Game Files/Sprites/Other Sprites/Spikes-1.png.png')
        this.type = type
    }
    display(levelKey){
    push()
    var pos =this.body.position;
    
    imageMode(CENTER)
    switch(this.type){
        case "invis":
            null_ = loadImage('Game Files/Background/nothing.png')
            image(null_,pos.x,pos.y)
            break
        case "fakec":
            push()
            var pos = this.body.position;
            rectMode(CENTER);
            noStroke()
            fill("#FEE542");
            rect(pos.x, pos.y, this.w+1,this.h+1);
            pop()
        case "fakep":
            super.display(levelKey)
            break
        default:
            var amount = this.w/50
            for(let i = 0;i<=amount;i++){image(this.img,pos.x-this.w/2+(50*i),pos.y-20,250,this.h+150)}
            break
    }
    pop()
    }
    change(change){
        super.change(change)
    }
    damage(body,off,func){
        if(typeof func === 'function'){
            if(Matter.SAT.collides(body.body,this.body).collided === true){
                Matter.Body.setVelocity(body.body,{x:0,y:0})
                this.dead = true
                func()
            }
            if(!off){
                this.dead = false
            }
        }
        
    }
    isDead(){
       return this.dead
    }
    getBody(){
        return this.body
    }
}

class Complete extends Platform{
    constructor(x,y,w,h){
        super(x,y,w,h)
        this.finish = false
    }
    display(){
        push()
        var pos =this.body.position;
        rectMode(CENTER);
        noStroke()
        fill("#FEE542");
        rect(pos.x, pos.y, this.w+1,this.h+1);
        pop()
    }
    change(change){
        super.change(change)
    }
    complete(body,func){
        if(typeof func === 'function'){
            if(Matter.SAT.collides(body.body,this.body).collided === true){
                Matter.Body.setVelocity(body.body,{x:0,y:0})
                this.finish = true
                func()
            }}
    }
    isComplete(){
        return this.finish
    }
    changefinish(bool){
        if(typeof bool === 'boolean'){
            this.finish = false
        }
    }
}

class Fall extends Platform{
    constructor(x,y,w,h,type){
        super(x,y,w,h)

        this.x = x
        this.y = y
        this.gone = false
        this.type = type
    }
    display(levelKey){
        switch(this.type){
            case "fakec":
                push()
                var pos =this.body.position;
                rectMode(CENTER);
                noStroke()
                fill("#FEE542");
                rect(pos.x, pos.y, this.w+1,this.h+1);
                pop()
                break
            default:
                super.display(levelKey)
                break
        }
        
    }
    change(change){
        super.change(change)
    }
    fall(body){

        if(this.gone === false){
            var xChange = this.x
            var yChange = this.y
            Matter.Body.setPosition(this.body,{x:xChange,y:yChange})  
        }
        else{
            var xChange = 10000
            var yChange = 10000
            Matter.Body.setPosition(this.body,{x:xChange,y:yChange})
        }

            if(Matter.SAT.collides(this.body,body.body).collided === true){
                this.gone = true
        }
    }

    replace(){
        this.gone = false
    }

    
}

class Projectile{
    constructor(type,x,y,r){
        let options = {restitution:0,isStatic:false}
        
        this.type = type
        this.body = Bodies.circle(x,y,r,options)
        this.dead = false
        this.remove = false
        this.r = r
        this.img = loadImage('Game Files/Sprites/Other Sprites/New Piskel-1.png (9).png')

        World.add(world,this.body)
    }
    display(){
        if(!this.remove){
       let pos = this.body.position
        push();
        imageMode(CENTER)
        image(this.img,pos.x,pos.y,this.r*8,this.r*8);
        pop();
    } 
        
        Matter.Body.setAngle(this.body,180)
        Matter.Body.setAngularVelocity(this.body,0)
    }
    change(change){
        if(change === "yes"){World.remove(world,this.body)}
        else if(change === "no"){World.add(world,this.body)}      
   }
    damage(body,off,func){
        if(typeof func === 'function'){
            if(Matter.SAT.collides(body.body,this.body).collided === true){
                Matter.Body.setVelocity(body.body,{x:0,y:0})
                World.remove(world,this.body)
                this.remove = true
                this.dead = true
                func()
            }
            if(!off){
                this.dead = false
            }
        }
}
isDead(){
    return this.dead
 } 
 deleteBody(body,func){
    if (Array.isArray(body) === true){body.forEach(element => { if(Matter.SAT.collides(this.body,element.getBody()).collided === true){World.remove(world,this.body),this.remove = true}})}
    else{if(Matter.SAT.collides(this.body,body.getBody()).collided === true){World.remove(world,this.body),this.remove = true}}
        
    if(typeof func === "fucntion"){func()}
 }
 
}
