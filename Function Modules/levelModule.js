let LEVEL

function level() {
  LEVEL = {
      level1: {
          barriers: [
            new Platform(-550, height / 2, 1000, height),                        
            new Platform(screen.width * 1.5 / 2, 100, screen.width * 1.5, 200),  
            new Platform(screen.width * 1.5 + 550, height / 2, 1000, height)     
          ],
          platforms: [
              new Platform(width / 2, height + 50, width + 100, 350),

              new Platform(width / 4 - 390, 750, 750, 250),
              new Platform(width / 4 + 560, 750, 750, 250),
              new Platform(width / 4 * 3 + 110, 750, 300, 250),
              new Platform(width / 4 * 3 + 620, 750, 300, 250),
              new Platform(width / 2 + 450, 750, 150, 50)
          ],
          spikes: [
            new Spikes(805,height-135,200,20),
            new Spikes(2525,height-135,750,20)
          ],
          falls: [
              new Fall(805, 750, 200, 250),
              new Fall(2525, 750, 210, 250),
              new Fall(2825,620,200,20,"fakec")
          ],
          complete: new Complete(width-width+50,height-135,200,20)
      },
      level2: {
          barriers: [
              new Platform(-550, height / 2, 1000, height),                        
              new Platform(screen.width * 1.5 / 2, 100, screen.width * 1.5, 200),  
              new Platform(screen.width * 1.5 + 550, height / 2, 1000, height) ],
          platforms: [
              new Platform(width/4*3-100,height+50,width/2+300,200),
              new Platform(1100,1300,200,700),
              new Platform(1300,950,1900,200),
              new Platform(75,1500,250,900),
              new Platform(300,1650,200,700),
              new Platform(450,1550,98,200),
              new Platform(900,1550,198,200),

              new Platform(2330,1550,1200,200),
              
            ],
          spikes: [
              new Spikes(650,1700,500,20,"invis"),
              new Spikes(1450,1570,100,20),
              new Spikes(2705,1450,400,20),
              new Spikes(1840,1450,150,20),
              new Spikes(2200,1450,150,20)
            ],
          falls: [
              new Fall(650,1550,300,200),
              new Fall(2590,950,680,200),
              new Fall(920,1450,150,20,"fakec"), 
              
            ],
          complete: new Complete(1275,1570,150,20)
      },
      level3:{
        barriers:[
          new Platform(-550, height / 2, 1000, height),
          new Platform(screen.width * 1.5 + 550, height / 2, 1000, height) ],
        platforms:[
          new Platform(width/2,height+50,width+100,200),
          new Platform(width/4-100,height/2-100,width/4+600,200),
          new Platform(width/4*3-290,height/2-100,width/4+600,200),
        
          new Platform(2300,1500,350,20),
          new Platform(1800,1300,350,20),
          new Platform(1300,1100,350,20),
          new Platform(800,1300,350,20)
          ],
        spikes:[
          new Spikes(width/4-100,height-50,width/4+600,70),
          new Spikes(width/4*3-290,height-50,width/4+600,70),
          new Spikes(300,1100,350,20,"fakec")
        ],
        falls:[new Fall(width-150, height/2 -100, 400, 200),
          new Fall(1300,1500,350,20)
        ],
        complete:new Complete(300,1500,350,20)
      },
      level4:{ //boss
        barriers:[
          new Platform(-380, height / 2, 1000, height),
          new Platform(screen.width * 1.5+370, height / 2, 1000, height),
          new Platform(width/2,height-261,width+100,200),
        ],
        platforms:[
          new Platform(width/2,height-261,width+100,200),
          new Platform(400,900,350,100),
          new Platform(900,700,350,100),
          new Platform(1400,900,350,100),
          new Platform(1900,700,350,100),
          new Platform(2400,900,350,100)
        ],
        spikes:[new Spikes(width/2,height-370,width-150,50)],
        falls:[
          new Fall(1300,1500,350,20)
        ],
        complete:new Complete(-500,1500,350,20)
      }
        
      }
  };


function displayLevel(levelKey) {
  const newLevel = LEVEL["level" + levelKey];
  
  if (newLevel) {
      Object.keys(newLevel).forEach(category => {
        if(category != "barriers"){
          if(category != "complete"){
            newLevel[category].forEach(element => element.display(levelKey));}
            else{newLevel.complete.display(levelKey)}}

            push()
            rectMode(CENTER)
            fill(0, 0, 0, 50);
            rect(-550,height/2,1000,height*1.5);

            //fill(0, 0, 0, 200);
            rect(screen.width*1.5+1500,height/2,2900,height*1.5);
            pop()
      });
  }
}

function deleteLevel(levelKey){
  const newLevel = LEVEL["level" + levelKey];
  
  if (newLevel) {
      Object.keys(newLevel).forEach(category => {
          if(category != "complete"){
            newLevel[category].forEach(element => element.change("yes"));}
            else{newLevel.complete.change("yes")}}
)}}

function replaceLevel(levelKey){
  const newLevel = LEVEL["level" + levelKey];
  
  if (newLevel) {
      Object.keys(newLevel).forEach(category => {
          if(category != "complete"){
            newLevel[category].forEach(element => element.change("no"));}
            else{newLevel.complete.change("no")}}
)}}

function levelfunction(levelKey,resXY,del){
  const newLevel = LEVEL["level"+levelKey]

  if (newLevel){
  MenuState = 4
  levelState = levelKey

  select = paused = false
  avatarChange = plCge = lb = null_
  paCge = pauseR

  seconds = minutes = 0
  time = frameCount

  buttonAva.hide(),plB.hide(),pB.show(),lbButton.hide()
  for(i of levels){i.hid()}
  player1.lookingright()

  player1.LoadAssets(Character),player1.respawn(resXY[0],resXY[1])
  LEVEL[`level${levelKey}`]["falls"].forEach(element => element.replace())

  createjs.Sound.stop("sound")
  createjs.Sound.play(`${levelKey}`, {loop: -1})
  

  del.forEach(element => deleteLevel(element))
  replaceLevel(levelKey)
}}


