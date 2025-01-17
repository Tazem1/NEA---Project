function LoadGameAssets(){
    menuSelection = loadSound('Game Files/Sounds/Sound Effects/audio (2).mp3')
    menuHover = loadSound('Game Files/Sounds/Sound Effects/menu-selection-102220.mp3')
    error = loadSound('Game Files/Sounds/Sound Effects/Error.mp3')
    selected = loadSound('Game Files/Sounds/Sound Effects/menu-click-89198.mp3')
  
    null_ = loadImage('Game Files/Background/nothing.png')
  
    backButtonImg = loadImage('Game Files/Backz Buttons/Back R.png')
    backHoverImg = loadImage('Game Files/Backz Buttons/Back H.png')
  
    //main menu
    playIMG = loadImage('Game Files/Play Buttons/play h.png')
    playHoverIMG = loadImage('Game Files/Play Buttons/play.png')
    settingsImg = loadImage('Game Files/Settings Buttons/Setting R.png')
    settingsHoverImg = loadImage('Game Files/Settings Buttons/Settings H.png')
    guideButtonImg = loadImage('Game Files/Guide Buttons/Guide R.png')
    guideHoverButtonImg = loadImage('Game Files/Guide Buttons/Guide H.png')
  
    //play menu
    CharSIMG = loadImage('Game Files/Character Buttons/Avatar Button R.png.png')
    CharSHIMG = loadImage('Game Files/Character Buttons/Avatar Button H.png.png')
  
    arrowL = loadImage('Game Files/Arrow Buttons/Arrow L.png')
    arrowR = loadImage('Game Files/Arrow Buttons/Arrow R.png')
    arrowLH = loadImage('Game Files/Arrow Buttons/Arrow LH.png')
    arrowRH = loadImage('Game Files/Arrow Buttons/Arrow RH.png')
  
    playerW = loadImage('Game Files/Character Selection/White man.png')
    playerT = loadImage('Game Files/Character Selection/Tanned man.png')
    playerB = loadImage('Game Files/Character Selection/Brown man.png')
    playerD = loadImage('Game Files/Character Selection/Dark skin man.png')
    
    DoneR = loadImage('Game Files/Done Button/Done-R.png (1).png')
    DoneH = loadImage('Game Files/Done Button/Done-H.png.png')
  
    oneImg = loadImage('Game Files/Level 1/Level1 R.png')
    oneHImg = loadImage('Game Files/Level 1/Level 1 H.png')
  
    twoImg = loadImage('Game Files/Level 2/Level 2 R.png')
    twoHImg = loadImage('Game Files/Level 2/Level 2 H.png')
    twoLImg = loadImage('Game Files/Level 2/Level 2 L.png')
  
    threeImg = loadImage('Game Files/Level 3/Level 3 R.png')
    threeHImg = loadImage('Game Files/Level 3/Level 3 H.png')
    threeLImg = loadImage('Game Files/Level 3/Level 3 L.png')
  
    fourImg = loadImage('Game Files/Level 4/Level 4 R.png')
    fourHImg = loadImage('Game Files/Level 4/Level 4 H.png')
    fourLImg = loadImage('Game Files/Level 4/Level 4 L.png')
  
    bossImg = loadImage('Game Files/Level Boss/Boss R.png')
    bossHImg = loadImage('Game Files/Level Boss/Boss H.png')
    bossLImg = loadImage('Game Files/Level Boss/Boss L.png')

    lbimg = loadImage('Game Files/Board buttons/Empty Button-1.png.png')
    lbhimg = loadImage('Game Files/Board buttons/Empty Button-2.png.png')
    lblimg = loadImage('Game Files/Board buttons/Empty Button-3.png.png')
  
    //settings things
    switchOn = loadImage('Game Files/Settings Switches/On SettingS.png')
    switchH  = loadImage('Game Files/Settings Switches/SettingS H.png')
    switchOff = loadImage('Game Files/Settings Switches/Off SettingS.png')
  
    volumePlus = loadImage('Game Files/Volume Buttons/Volume Buttons Pos R.png')
    volumePlusH = loadImage('Game Files/Volume Buttons/Volume Buttons Pos H.png')
  
    volumeNeg = loadImage('Game Files/Volume Buttons/Volume Buttons Neg R.png')
    volumeNegH = loadImage('Game Files/Volume Buttons/Volume Buttons Neg H.png')
  
    //backgrounds
    clear = loadImage('Game Files/Background/clear bg.png')
    title = loadImage('Game Files/Background/title 4.png')
  
      heartImg = loadImage('Game Files/Sprites/Other Sprites/heart.png')
  
      pauseR = loadImage('Game Files/Sprites/Pause/pause R.png')
      pauseH = loadImage('Game Files/Sprites/Pause/pause H.png')
      playR = loadImage('Game Files/Sprites/Pause/Play R.png')
      playH = loadImage('Game Files/Sprites/Pause/Play H.png')
    
        //level backgrounds
      Level1bg = loadImage('Game Files/Background/Level 1 - Jungle.png')
      Level2bg = loadImage('Game Files/Background/Level 2 - Cave.png')
      Level3bg = loadImage('Game Files/Background/Level 3 - Snowy Mountains.png')
      Level4bg = loadImage('Game Files/Background/Level 4 - Temple.png')
      LevelBossbg = loadImage('Game Files/Background/Level 5 - The Dragons Lair.png')
  
  }
  function gameSetup(){
    posMC = posSC = negMC = negSC = doneC = muteSC = muteMC = avatarChange = lChange = rChange = backChange = c = lb = null_;
    clicks = CharIteration = 0
    Mvolume = SFXvolume = 100

    for(i of levels){i.hid()}
    for(i of volumes){i.hide()}
    for(i of switches){i.hide()}
    switchb.hide()

    lives = 3
    Character = 1
    select = false
    bgChange = clear

    inputs.push(leftI = new Input(2400,220,"A"),rightI = new Input(2400,375,"D"),jumpI = new Input(2400,530,"Space"))
    inputs.forEach(element =>{element.hid()})
    inputs.forEach(element => {element.mousePressed()});
    l.forEach(element => element.hide())

    buttonDone.hide()
    buttonRightA.hide()
    buttonLeftA.hide()
    buttonAva.hide()
    nameInput.hide()

    playChange = playIMG
    settingsChange = settingsImg
    htpChange = guideButtonImg

    buttons.push(buttonPlay,buttonHTP,buttonSetting,buttonBack)
    CharChange.push(null_,playerW,playerT,playerB,playerD)
    sFX.push(menuHover,menuSelection,error,selected)
  }

  function Hover(){
    buttonHTP.mouseOver(()=>{
      htpChange = guideHoverButtonImg
      menuHover.play()
    })
  
    buttonHTP.mouseOut(()=>{
      htpChange = guideButtonImg
    })
    
    buttonSetting.mouseOver(()=>{
      settingsChange = settingsHoverImg
      menuHover.play()
    })
  
    buttonSetting.mouseOut(()=>{
      settingsChange = settingsImg
    })
    
    buttonPlay.mouseOver(()=>{
      playChange = playHoverIMG
      menuHover.play()
    })
  
    buttonPlay.mouseOut(()=>{
      playChange = playIMG
    })
  
    buttonAva.mouseOver(()=>{
      avatarChange = CharSHIMG
      menuHover.play()
    })
  
    buttonAva.mouseOut(()=>{
      avatarChange = CharSIMG
    })
  
    buttonDone.mouseOver(()=>{
      doneC = DoneH
      menuHover.play()
    })
  
    buttonDone.mouseOut(()=>{
      doneC = DoneR
    })
  
    buttonBack.mouseOver(()=> {
      if(checkHide){
      backChange = backHoverImg;
      menuHover.play();
      }
    });
    
    buttonBack.mouseOut(()=> {
      if(checkHide){
      backChange = backButtonImg;  
      }
    });
    
    volumePosM.mouseOver(()=>{
      posMC = volumePlusH
    })
  
    volumePosM.mouseOut(()=>{
      posMC = volumePlus
    })
  
    volumePosS.mouseOver(()=>{
      posSC = volumePlusH
    })
  
    volumePosS.mouseOut(()=>{
      posSC = volumePlus
    })
  
    volumeNegM.mouseOver(()=>{
      negMC = volumeNegH
    })
  
    volumeNegM.mouseOut(()=>{
      negMC = volumeNeg
    })
  
    volumeNegS.mouseOver(()=>{
      negSC = volumeNegH
    })
  
    volumeNegS.mouseOut(()=>{
      negSC = volumeNeg
    })
  
    buttonLeftA.mouseOver(()=>{
      lChange = arrowLH
    })
  
    buttonLeftA.mouseOut(()=>{
      lChange = arrowL
    })
  
    buttonRightA.mouseOver(()=>{
      rChange = arrowRH
    })
  
    buttonRightA.mouseOut(()=>{
      rChange = arrowR
    })
  
    pB.mouseOver(()=>{
      paCge = pauseH
    })
    pB.mouseOut(()=>{
      paCge = pauseR
    })
  
    plB.mouseOver(()=>{
      plCge = playH
    })
    plB.mouseOut(()=>{
      plCge = playR
    })
    lbButton.mouseOver(()=>{
      if(b === 1){
        lb = lbhimg
      }
    })
    lbButton.mouseOut(()=>{
      if(b === 1){
        lb = lbimg
      }
    })
  }
  function images(){
inputs.forEach(element =>{element.updateChange()})
    
  levelOne.hover(menuHover) 
  levelTwo.hover(menuHover)
  levelThree.hover(menuHover)
  levelBoss.hover(menuHover)

  back = image(backChange,buttonBack.x,buttonBack.y+205)
  avatar = image(avatarChange,buttonAva.x,buttonAva.y+195)
  PosM = image(posMC,volumePosM.x,volumePosM.y+320)
  NegM = image(negMC, volumeNegM.x,volumeNegM.y+320)
  PosS = image(posSC,volumePosS.x,volumePosS.y+320)
  NegS = image(negSC,volumeNegS.x,volumeNegS.y+320)
  muteMas = image(muteMC,muteM.x,muteM.y+305)
  muteSFX = image(muteSC,muteS.x,muteS.y+300)
  sc = image(c,switchb.x,switchb.y+300)
  arrowleft = image(lChange,buttonLeftA.x-100,buttonLeftA.y+215)
  arrowright = image(rChange,buttonRightA.x-100,buttonRightA.y+215)
  image(lb,lbButton.x,lbButton.y+195,600,600)

  push()
  imageMode(CENTER)
  titleImg = image(titleC,width/2,350)
  char = image(CharChange[CharIteration],width/2,height/2-75)
  pop()

  done = image(doneC,buttonDone.x,buttonDone.y+205)
  for(i of levels){i.imageR()}
  }

  