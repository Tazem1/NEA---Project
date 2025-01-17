const Engine = Matter.Engine,
World = Matter.World,
Bodies = Matter.Bodies,
Events = Matter.Events,
Collision = Matter.Collision,

keys = {}
const n = 1.5
opacity = 200

inputs = [] 
buttons = []
CharChange = []
sFX = []

datalvl = 1

seconds = minutes = 0
levelState = MenuState = 0
checkHide = paused = false
let players

function preload(){LoadGameAssets()}

function setup(){
  canvas = createCanvas(screen.width*n,screen.height*n);

  engine = Engine.create()
  world = engine.world

  world.gravity.y = 1;
  world.gravity.x = 0
  move = 0
  
  level()

  Matter.Runner.run(engine)
 
  bPlay(),bSetting(),bHTP(),bBack(),volumeButtons(),AvatarSelection(),pauseGame(),Speedrun()

  mainMusic = createjs.Sound.registerSound("Game Files/Sounds/Sound Tracks/Menu Main Music.mp3", "sound")
  levelOneST = createjs.Sound.registerSound("Game Files/Sounds/Sound Tracks/Level 1 Music - Forest.mp3", "1")
  levelTwoST = createjs.Sound.registerSound("Game Files/Sounds/Sound Tracks/Level 2 Music - Cave.mp3", "2")
  levelThreeST = createjs.Sound.registerSound("Game Files/Sounds/Sound Tracks/Level 4 Music - Temple.mp3", "3")

  window.addEventListener('click', (()=>{createjs.Sound.play("sound", {loop: -1})}), { once: true })

  levelOne = new LevelButtons(false,oneImg,oneHImg)
  levelOne.createbutton(1060,-200,300)

  levelTwo = new LevelButtons(twoLImg,twoImg,twoHImg)
  levelTwo.createbutton(1060,300,300)

  levelThree = new LevelButtons(threeLImg,threeImg,threeHImg)
  levelThree.createbutton(1060,800,300)

  levelBoss = new LevelButtons(bossLImg,bossImg,bossHImg)
  levelBoss.createbutton(1860,300,300)

  player1 = new Player()
  dragon = new Dragon(width/2,50,player1.getBody())

  levels = [levelOne,levelTwo,levelThree,levelBoss]
  levelComp = 0

  gameSetup()

  buttonPlay.mouseClicked(()=>{
    if(window.devicePixelRatio*100 === 100){
    MenuState = 1
    checkHide = true
    menuSelection.play()
    backChange = backButtonImg
    
    for(i of levels){
      i.showImg()
      i.show()
    }

    avatarChange = CharSIMG
    if(b === 0){lb= lblimg}
    else{lb = lbimg}
    select = false
  }
  });
  buttonHTP.mouseClicked(()=>{
    if(window.devicePixelRatio*100 === 100){
    MenuState = 3
    checkHide = true
    menuSelection.play()
    backChange = backButtonImg
  }
  });
  buttonSetting.mouseClicked(()=>{
    if(window.devicePixelRatio*100 === 100){
    MenuState = 2
    checkHide = true
    menuSelection.play()
    backChange = backButtonImg

    inputs.forEach(element =>{element.show()})
    nameInput.show()

    posMC = posSC = volumePlus
    negMC = negSC = volumeNeg

    if(m === 0){muteMC = switchOff}
    else{muteMC = switchOn}
      
    if(s === 0){muteSC = switchOff}
    else{muteSC = switchOn}

    if(b === 0){c = switchOff}
    else{c = switchOn}

  }
  });
  buttonBack.mouseClicked(()=>{
    if(window.devicePixelRatio*100 === 100){
    if(MenuState != 4){
    MenuState = 0

    checkHide = paused = select = false
    menuSelection.play()

    playChange = playIMG
    settingsChange = settingsImg
    htpChange = guideButtonImg

    inputs.forEach(element =>{element.hid()})

    buttonRightA.hide()
    buttonLeftA.hide()
    switchb.hide()
    nameInput.hide()
    l.forEach(element => element.hide())

    posMC = posSC = negMC = negSC = doneC = muteSC = muteMC = paCge = plCge = avatarChange = c = lb = null_;

    buttonAva.hide()

    for(i of levels){i.hid()}
    for(i of volumes){i.hide()}
    for(i of switches){i.hide()}
      
  }
  else if(clicks === 1&&lives != 0||LEVEL[`level${levelState}`]["complete"].isComplete() === true){
    deleteLevel(levelState)
    MenuState = 1

    if(levelState === 3){
      LEVEL["level3"]["spikes"] = [
        new Spikes(width/4-100,height-50,width/4+600,70),
        new Spikes(width/4*3-290,height-50,width/4+600,70),
        new Spikes(300,1100,350,20)
            ]
    }
    else if(levelState === 4){
      LEVEL["level3"]["spikes"] = []
    }

  if (LEVEL[`level${levelState}`]["complete"].isComplete() === true&&levelComp === levelState-1){
    if(b === 1){player1.saveTimes(nameInput.value(),seconds,minutes,levelComp+1)}
    levelComp += 1
    levels[levelComp].updateLock(true)
  }

    levelState = 0
    checkHide = true
    menuSelection.play()
    backChange = backButtonImg

    buttonBack.position(-20,-340)

    createjs.Sound.stop()
    createjs.Sound.play("sound",{loop:-1})

    clicks = 0
    
    for(i of levels){i.showImg(),i.show()}

    avatarChange = CharSIMG
    lb = lbimg
    select = false
  }
  else if(MenuState === 4&&lives != 0){clicks += 1}
  else if(lives === 0){
    lives = 3
    deleteLevel(levelState)

    for(let i = 1;i <= 3; i++){
      LEVEL["level"+i]["complete"].changefinish(false)
      levels[i].updateLock(false)}
  
    MenuState = 1
    levelState = clicks = levelComp = 0
    checkHide = true
    menuSelection.play()
    
    backChange = backButtonImg
    buttonBack.position(-20,-340)

    avatarChange = CharSIMG
    select = false

    createjs.Sound.stop()
    createjs.Sound.play("sound",{loop:-1})
    
    for(i of levels){
      i.showImg()
      i.show()
    }
  }
}
  })

  buttonAva.mouseClicked(()=>{
    if(window.devicePixelRatio*100 === 100){
    select = true
    menuSelection.play()
    doneC = DoneR
    CharIteration = Character

    lChange = arrowL
    rChange = arrowR
    }
  })

  buttonDone.mouseClicked(()=>{
    select = false
    buttonDone.hide()
    menuSelection.play()

    backChange = backButtonImg
    avatarChange = CharSIMG
    if(b === 0){lb = lblimg}
    else{lb = lbimg}

    for(i of levels){
      i.showImg()
      i.show()
    }

    Character = CharIteration
    player1.LoadAssets(Character)
    CharIteration = 0
  })

  buttonLeftA.mouseClicked(()=>{
    if(CharIteration != 1){
    CharIteration = CharIteration-1
    }
  })

  buttonRightA.mouseClicked(()=>{
    if(CharIteration != 4){
    CharIteration = CharIteration+1
    }
  })
  pB.mouseClicked(()=>{
    paused = true

    buttonBack.show()
    backChange = backButtonImg

    paCge = null_
    plCge = playR

    pB.hide()
    plB.show()
  })
  plB.mouseClicked(()=>{
    if(lives != 0){
    paused = false
    plB.hide()
    pB.show()

    clicks = 0

    paCge = pauseR
    plCge = null_}
  })

    levelOne.mousePressed(()=>{levelfunction(1,[70,300],[2,3,4])},SFXvolume)
    levelTwo.mousePressed(()=>{levelfunction(2,[500,300],[1,3,4])},SFXvolume)
    levelThree.mousePressed(()=>{levelfunction(3,[70,70],[1,2,4])},SFXvolume)
    levelBoss.mousePressed(()=>{levelfunction(4,[400,850],[1,2,3])},SFXvolume)

}
 

function draw(){
  if(window.devicePixelRatio*100 === 100){
  background(bgChange)

  // Makes the buttons hide when the menu changes
  if (checkHide) {
    buttonPlay.hide()
    buttonSetting.hide();
    buttonHTP.hide();
    buttonBack.show();

    bgChange = clear
    titleC = null_
  } 
  else {
    buttonBack.hide()
    buttonPlay.show();
    buttonSetting.show();
    buttonHTP.show();

    backChange = null_
    titleC = title
  }

  Hover()  // Makes the buttons hover
  images()
    
  //clearDatabase()

  if(!checkHide){
    play = image(playChange,(width - playIMG.width) / 2, 550)
    settings = image(settingsChange,buttonSetting.x,buttonSetting.y+235)
    guide = image(htpChange,buttonHTP.x, buttonHTP.y+205)
  }
  else if(MenuState == 1){ // levels menu
    if(!select&&levelState === 0){
    buttonAva.show()
    buttonBack.show()
    lbButton.show()

    buttonRightA.hide()
    buttonLeftA.hide()
    
    doneC = rChange = lChange = null_

  }
    else if(select){
    bgChange = "black"

    buttonDone.show()
    buttonAva.hide()
    buttonBack.hide()
    lbButton.hide()

    buttonRightA.show()
    buttonLeftA.show()
   
    for(i of levels){i.hid()}
      
    backChange = avatarChange = lb = null_
    }

  }
  else if(MenuState === 2){ // settings

    for(i of volumes){i.show()}
    for(i of switches){i.show()}
    switchb.show()
      
    push()
    textFont('VT323')
    textSize(120)
    fill("white")
    strokeWeight(100)

    text("Master Volume",500,500)
    text("SFX Volume",500,1000)
    text("Keybinds",1850,500)

    textSize(95)
    text("Move left: ",1865,650)
    text("Move right: ",1865,800)
    text("Jump: ",1865,950)

    text("Mute: ",515,845)
    text("Mute: ",515,1345)
    textSize(120)
    text("Speedrun Mode: ",1700,1200)
    textSize(40)
    if(nameInput.value().length <= 0){text("You must enter your name before playing this mode:",1550,1290)}
    pop()

    push()
    textAlign(CENTER)
    textFont('VT323')
    textSize(95)
    fill("white")
    strokeWeight(100)

    text(Mvolume,880,670)
    text(SFXvolume,880,1160)
    pop()
    
  }
  else if(MenuState === 3){// how to play
    push()
    textFont('VT323')
    textSize(90)
    fill("white")
    strokeWeight(5)
    
    text(leftI.returnKey().toUpperCase()+" : Move left", 1160,680)
    text(rightI.returnKey().toUpperCase()+" : Move Right", 1160,760)

    if(jumpI.returnKey() === " "){text("SPACE: Jump", 1160, 840)}
    else{text(jumpI.returnKey().toUpperCase()+" : Jump", 1160, 840)}   
    
    text("These keybinds can be changed in settings (the wrench)",420,920)
    text("Progress through the levels with only three hearts",580,1000)
    text("and defeat the boss to win!",1000,1080)
    pop()
  }
  else if(MenuState === 4){
   
    if(levelState != 4){
       translate(
    (-player1.getPlayerPos("x") + width * 0.3) / 0.9,
    ((-player1.getPlayerPos("y") * 0.1) / 0.9)
  )
    }
   
  
  if(levelState === 1){
    bgChange = Level1bg
    displayLevel(1)
    resX = resY = 70
  }
  else if(levelState === 2){
    bgChange = Level2bg
    displayLevel(2)
    resX = 500, resY = 300
    }
  else if(levelState === 3){
    bgChange = Level4bg
    displayLevel(3)
    resX = resY = 70

    if(frameCount%70 === 0){
      //left side
        LEVEL["level3"]["spikes"].push(new Projectile("fSpikes",1000,0,30))
        LEVEL["level3"]["spikes"].push(new Projectile("fSpikes",700,0,30))
        LEVEL["level3"]["spikes"].push(new Projectile("fSpikes",400,0,30))

      //right side
        LEVEL["level3"]["spikes"].push(new Projectile("fSpikes",1950,0,30))
        LEVEL["level3"]["spikes"].push(new Projectile("fSpikes",2250,0,30))

      LEVEL["level3"]["spikes"].forEach(element => {if(element instanceof Projectile){element.deleteBody(LEVEL["level3"]["platforms"])}})
       }   

  else if(LEVEL["level3"]["spikes"].length >= 10000){LEVEL["level3"]["spikes"].forEach(element => element.deleteBody(LEVEL["level3"]["platforms"]),
    LEVEL["level3"]["spikes"] = [
      new Spikes(width/4-100,height-50,width/4+600,70),
      new Spikes(width/4*3-290,height-50,width/4+600,70),
      new Spikes(300,1100,350,20)
          ])}
}

  else if(levelState === 4){
    bgChange = LevelBossbg
    displayLevel(4)
    resX = resY = 70

    dragon.display()
    dragon.initiatePhase()
    LEVEL["level4"]["spikes"].forEach(element => {if(element instanceof Projectile){element.deleteBody(LEVEL["level4"]["spikes"][0])}})
  }

  select = false

  buttonAva.hide()
  avatarChange = null_

  player1.display()
  for(i of levels){i.hid()}

  //LEVEL[`level${levelState}`]["spikes"].forEach(element =>{(element.damage(player1,player1.isDead(),(()=>{ player1.dying(resX,resY,element.isDead(),(()=>{if(!player1.isDead()){lives -= 1,LEVEL[`level${levelState}`]["falls"].forEach(element => element.replace())}}))})) )})
  LEVEL[`level${levelState}`]["complete"].complete(player1,(()=>{}))
  LEVEL[`level${levelState}`]["falls"].forEach(element => element.fall(player1))

  if(!paused){
    rectMode(CENTER);
  
    Engine.update(engine);
    
    buttonBack.hide()
    backChange = null_
  
    player1.updateMovement(LEVEL[`level${levelState}`]["platforms"],LEVEL[`level${levelState}`]["falls"],leftI.returnKey(),rightI.returnKey(),jumpI.returnKey())

    if(b === 1){
      push()
      resetMatrix()
      textSize(120)
      textAlign(CENTER)
      textFont("VT323")
      fill("white")

      milliseconds = frameCount - time
      if(milliseconds%100 === 0){seconds += 1}
      if(milliseconds%6000 === 0){minutes += 1,seconds = 0}
  
      text(`${minutes}:${String(seconds).padStart(2,'0')}`,width/2,150)
      pop()
    }
      
  push()
  resetMatrix()
  imageMode(CENTER)
  image(paCge,100,100)
  pop()
}
else{  
  
  push()
  resetMatrix()
  rectMode(CENTER)
  fill(0, 0, 0, opacity);
  rect(width/2,height/2, width*1.5, height*1.5);
  textSize(120)
  textAlign(CENTER)
  textFont("VT323")
  fill("white")
  text(`${minutes}:${String(seconds).padStart(2,'0')}`,width/2,150)
  pop()

push()
  if(lives != 0&&LEVEL[`level${levelState}`]["complete"].isComplete(player1,(()=>{})) === false){
  opacity = 200

  resetMatrix()
  textSize(150)
  textAlign(CENTER)
  fill("white")
  textFont("VT323")
  text("Paused", width/2,height/2-300)
  
  
  if(clicks === 1){
    fill("red")
    text("ARE YOU SURE YOU WANT TO QUIT?",width/2,height/2+600)
  }
 
  imageMode(CENTER)
  image(plCge,width/2,height/2)
  pop()

  }
}
}
else if(MenuState === 5){
  push()
    buttonAva.hide()
    lb = null_
    avatarChange = null_
    rectMode(CENTER)
    fill("black")
    stroke("orange")
    rect(width/2-50,height/2+300,1500,1000)
    rect(width/4+20,560,200,100)
    rect(width/2-275,560,650,100)
    rect(width/2+375,560,650,100)

    noStroke()
    fill("white")
    textFont("VT323")
    textAlign(CENTER)
    textSize(200)
    text("Leaderboard",width/2,200)
    textSize(50)
    text('Places',width/4+20,580)
    text("Player Name",width/2-275,580)
    text("Time Completed",width/2+375,580)
    

    for (let index = 0; index < 10; index++) {
      let change
      stroke("orange")
      fill("black")
      rect(width/4+20,660+(index*100),200,100)
      rect(width/2-275,660+(index*100),650,100)
      rect(width/2+375,660+(index*100),650,100)

      fill("white")
      textFont("VT323")
      textAlign(CENTER)
      textSize(50)
      

      if(index === 0){change = "st"}
      else if(index === 1){change = "nd"}  
      else if(index === 2){change = "rd"}
      else{change = "th"}
        
      text(`${index+1}${change}`,width/4+20,680+(index*100))
    }
    noFill()
    displayBoard(datalvl)

    l.forEach(element => element.show())
    pop()
}
else{
  textFont('VT323')
  textSize(140)
  fill("red")
  strokeWeight(5)
  text("Back to 100% zoom pls else the game will not work.",width/2-1360,height/2-10)
  MenuState = 0
  checkHide = false

  bgChange = clear
  
  playChange = playIMG
  settingsChange = settingsImg
  htpChange = guideButtonImg

  buttonRightA.hide()
  buttonLeftA.hide()

  posMC = posSC = negMC = negSC = doneC = muteSC = muteMC = paCge = plCge = avatarChange = c = null_
  select = false

  buttonAva.hide()

  for(i of levels){i.hid()}
  for(i of volumes){i.hide()}
  for(i of switches){i.hide()}
    
}
push()
resetMatrix()
back = image(backChange,buttonBack.x,buttonBack.y+205)

if(MenuState === 1&&!select||MenuState === 4&&!select){for(let i = 0;i <= lives;i++){image(heartImg,width-80-i * 250, -50)}}
  if(MenuState === 4){
  if(lives === 0){
    textSize(250)
    textAlign(CENTER)
    textFont("VT323")
    fill("white")
    opacity = 1000

    buttonBack.show()
    
    backChange = backButtonImg
    paCge = null_

    pB.hide()
    player1.isFullyDead(lives)

    paused = true
    
    text("YOU DIED!",width/2,height/2-200)
    buttonBack.position(width/2-300,height/2-300)

    if(levelState === 3){
      LEVEL["level3"]["spikes"] = [
        new Spikes(width/4-100,height-50,width/4+600,70),
        new Spikes(width/4*3-290,height-50,width/4+600,70),
        new Spikes(300,1100,350,20)
            ]
    }
  }
  else if(LEVEL[`level${levelState}`]["complete"].isComplete(player1,(()=>{})) === true&&levelState != 0){
    textSize(250)
    textAlign(CENTER)
    textFont("VT323")
    fill("white")

    buttonBack.show()
    backChange = backButtonImg
    opacity = 1000

    paCge = null_
    paused = true
    levels[levelComp].updateLock(true)
    text("You've completed Level "+levelState,width/2,height/2-200)
    buttonBack.position(width/2-300,height/2-300)

    pB.hide()
    player1.isFullyDead(lives)
  }
}
pop()
}
} 