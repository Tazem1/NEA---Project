class LevelButtons {
    constructor(lockimg, img, himg) {
        
        this.lockimg = lockimg
        this.img = img;
        this.himg = himg;
        this.button = createButton(' ')
        this.null_ = loadImage('Game Files/Background/nothing.png');

        if (lockimg === false) {
            this.lock = null;
        } else {
            this.lock = this.lockimg;
        }
    }

    updateLock(lock){
        if(lock === true){
        this.lock = null
    }
        else if (lock === false){
            this.lock = this.lockimg
        }
    }

    hid() {
        if (this.button) {
            this.button.hide();
        }
        this.image = this.null_;
    }

    show() {
        if (this.button) {
            this.button.show();
        }
        
    }

    showImg(){
        if(this.lock === null){
        this.image = this.img;}
        else{
        this.image = this.lock
        }
    }

    createbutton(x, y, h) {
        this.button.position(x, y);
        this.button.size(600, h);
        this.button.style('background-color', 'transparent');
        this.button.style('border-color', 'transparent');
    }

    hover(sound) {
        if (this.lock === null){
        this.button.mouseOver(() => {
            this.image = this.himg;

            try {
                if (sound && typeof sound.play === 'function') {
                    sound.play();
                } else {
                    throw new ReferenceError("No sound provided or sound.play is not a function");
                }
            } 
            catch (noSound) {} 
            finally {}
        });

        this.button.mouseOut(() => {this.image = this.img;});
    }
    else {
        this.button.mouseOver(()=>{this.image = this.lock}) 
        this.button.mouseOut(()=>{this.image = this.lock})
    }
    }

    mousePressed(callback) {

        this.button.mouseClicked(() => {if (typeof callback === 'function'){

        if(this.lock === null){
            callback()
            selected.play()
        }
        else if(!error.isPlaying()) {
            error.play()
            callback()
        }}})}

    imageR(){
    push()
    image(this.image, this.button.x, this.button.y+200);
    pop()
    }
}

class Input{
    constructor(x,y,def){
        this.button = createButton(def)
        this.button.size(150,100)
        this.button.position(x,y);
        this.button.style('font-family', 'VT323, sans-serif'),this.button.style('font-weight', 'bold'),this.button.style('border-color', 'transparent'),this.button.style('border-width','6px'),this.button.style('border-style', 'solid')
        this.button.elt.style.outline = 'none';

        this.change = false
        if(def === "Space"){
            this.keyi = " "
        }
        else{
         this.keyi =  def.toLowerCase()   
        }

        if(def.length === 1){this.button.style('font-size', '56px')}
        else{this.button.style('font-size', '37px')}
        
    }

    mousePressed(){
        this.button.mouseClicked(()=>{
         if(this.change){
            this.button.style('border-color', 'transparent');
            this.change = false;
        }
        else if (!this.change){
            this.button.style('border-color', 'red');
            this.change = true;
        }   
        })
        
    }

    updateChange(){
        if (this.change) {
            for (let key in keys) {
              if (keys[key] === true) {
                if (key === " ") {
                  this.button.html("Space");
                } else {
                  if(key.length === 1){
                  this.button.html(key.toUpperCase())
                  this.button.style('font-size', '56px')}
                  else{
                  this.button.html(key)
                  this.button.style('font-size', '37px')
                  }
                }
                this.button.style('border-color', 'transparent');
                this.keyi = key;
                this.change = false;
                keys[key] = false;
              }
            }
          }
    }

    hid(){
        this.button.hide()
    }
    show(){
        this.button.show()
        this.change = false
        this.button.style('border-color', 'transparent')
    }
    Ischange(){return this.change}
    returnKey(){return this.keyi}
}
