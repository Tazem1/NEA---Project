function volumeButtons(){
    volumePosM = createButton(' ')
    volumePosS = createButton(' ')
    volumeNegM = createButton(' ')
    volumeNegS = createButton(' ')
  
    muteM = createButton(' ')
    muteS = createButton(' ')
  
    s = 0
    m = 0
  
    volumePosM.position(500,220)
    volumeNegM.position(1100,220)
    volumePosS.position(500,710)
    volumeNegS.position(1100,710)
  
    muteM.position(780,430)
    muteS.position(780,930)
  
    volumes = [volumePosM,volumePosS,volumeNegM,volumeNegS]
    switches = [muteM,muteS]
  
    for(i of volumes){
      i.size(200,200)
      i.style('background-color','transparent')
      i.style('border-color','transparent')
    }
  
    for(i of switches){
      i.size(250,100)
      i.style('background-color','transparent')
      i.style('border-color','transparent')
    }
  
    volumePosM.mouseClicked(()=>{
      if(Mvolume != 100){Mvolume = Mvolume+10}
      if(m === 0){createjs.Sound.volume = Mvolume/100}
    })
  
    volumeNegM.mouseClicked(()=>{
      if(Mvolume != 0){Mvolume = Mvolume-10}
      if(m === 0){createjs.Sound.volume = Mvolume/100} 
    })
  
    volumePosS.mouseClicked(()=>{
      if(SFXvolume != 100){SFXvolume = SFXvolume+10}
      if(s === 0){for(sfx of sFX){sfx.setVolume(SFXvolume/100)}} 
    })
  
    volumeNegS.mouseClicked(()=>{
      if(SFXvolume != 0){SFXvolume = SFXvolume-10}
      if(s === 0){for(sfx of sFX){sfx.setVolume(SFXvolume/100)}}
    })
  
      muteM.mouseClicked(()=>{
        if(m === 0){
          m = 1
          muteMC = switchOn
          createjs.Sound.volume = 0}
  
        else if(m === 1){
          m = 0
          muteMC = switchOff
          createjs.Sound.volume = Mvolume/100}
      })
  
      muteS.mouseClicked(()=>{
        if(s === 0){
          s = 1
          muteSC = switchOn
        for(sfxSounds of sFX){sfxSounds.setVolume(0)}
        }
        else if(s === 1){
          s = 0
          muteSC = switchOff
        for(sfxSounds of sFX){sfxSounds.setVolume(SFXvolume/100)}}
      })
    }
  
  function bPlay(){
    buttonPlay = createButton(' ');
    buttonPlay.position((width - playIMG.width) / 2, 315);
    buttonPlay.size(playIMG.width,300)
    buttonPlay.style('background-color','transparent')
    buttonPlay.style('border-color','transparent')
  }
  function bSetting(){
    buttonSetting = createButton(' ')
    buttonSetting.position(580, 800)
    buttonSetting.size(settingsImg.width,300)
    buttonSetting.style('background-color','transparent')
    buttonSetting.style('border-color','transparent')
  }
  
  function bHTP(){
    buttonHTP =  createButton(' ')
    buttonHTP.position(1750, 800)
    buttonHTP.size(guideButtonImg.width,300)
    buttonHTP.style('background-color','transparent')
    buttonHTP.style('border-color','transparent')
  }
  
  function bBack(){
    buttonBack = createButton(' ')
    buttonBack.position(-20,-340)
    buttonBack.size(backButtonImg.width,300)
    buttonBack.style('background-color','transparent')
    buttonBack.style('border-color','transparent')
  }
  
  function AvatarSelection(){
    buttonAva = createButton(' ')
    buttonAva.position(-30,340)
    buttonAva.size(CharSIMG.width,300)
    buttonAva.style('background-color','transparent')
    buttonAva.style('border-color','transparent')
  
    buttonDone = createButton(' ')
    buttonDone.position(width/2-DoneR.width/2,height-DoneR.height-50)
    buttonDone.size(DoneR.width,300)
    buttonDone.style('background-color','transparent')
    buttonDone.style('border-color','transparent')
  
    buttonRightA = createButton(' ')
    buttonRightA.position(2160,200)
    buttonRightA.size(arrowR.width-200,arrowR.width-200)
    buttonRightA.style('background-color','transparent')
    buttonRightA.style('border-color','transparent')
  
    buttonLeftA = createButton(' ')
    buttonLeftA.position(350,200)
    buttonLeftA.size(arrowL.width-200,arrowL.width-200)
    buttonLeftA.style('background-color','transparent')
    buttonLeftA.style('border-color','transparent')
  
  }
  
  function pauseGame(){
    pB = createButton(' ')
    pB.position(10,-345)
    pB.size(200,200)
    pB.style('background-color','transparent')
    pB.style('border-color','transparent')
    pB.class('center')
  
    plB = createButton(' ')
    plB.position(width/2-100,height/2-450)
    plB.size(200,200)
    plB.style('background-color','transparent')
    plB.style('border-color','transparent')
  }

  function Speedrun(){
    switchb = createButton(' ')
    lbButton = createButton(' ')

    switchb.position(2400,780)
    lbButton.position(-30,800)

    switchb.size(250,100)
    lbButton.size(DoneR.width,300)

    l = [l1 = createButton('Level 1'),
          l2 = createButton('Level 2'),
          l3 = createButton('Level 3'),
          l4 = createButton('Level 4')]

    l1.position(500,-30)
    l2.position(1000,-30)
    l3.position(1500,-30)
    l4.position(2000,-30)

    l.forEach(element => {element.size(250,100)});
    l.forEach(element => element.style('font-size', '56px'))

    l1.mouseClicked(()=> datalvl = 1)
    l2.mouseClicked(()=> datalvl = 2)
    l3.mouseClicked(()=> datalvl = 3)
    l4.mouseClicked(()=> datalvl = 4)

    nameInput = createInput()
    nameInput.position(2400,900)
    nameInput.size(200,50)
    nameInput.attribute("placeholder", "Enter your name")
    nameInput.style('font-size','20px')

        
    b = 0

    switchb.mouseClicked(()=>{
      if(nameInput.value().length > 0){
      if(b === 0){
        b = 1
        c = switchOn
      }
      else if(b === 1){
        b = 0
        c = switchOff
      }}
    })

    lbButton.mouseClicked(()=>{
      if(b === 1){
      MenuState = 5
      avatarChange = null_
      lb = null_
      buttonAva.hide()
      lbButton.hide()
      for(i of levels){i.hid()}}
    })
    switchb.style('background-color','transparent')
    switchb.style('border-color','transparent')

    lbButton.style('background-color','transparent')
    lbButton.style('border-color','transparent')

    l.forEach(element=>{
      element.style('border-radius','10%')
      element.style('background-color','black')
      element.style('border-color','orange')
      element.style('color','white')
      element.style('border-width','5px')
      
      //element.attribute("style","background-color:black; border-color:orange; border:10px")
    })
  }