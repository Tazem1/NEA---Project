const request = indexedDB.open("Leaderboard",11)
var db


request.onupgradeneeded = function (event) {
    db = event.target.result;
    let objectStore;

    if (!db.objectStoreNames.contains("players")) {
        objectStore = db.createObjectStore("players", { keyPath: "id", autoIncrement: true });

    } else {
        objectStore = event.target.transaction.objectStore("players");
    }

    if (!objectStore.indexNames.contains("level")) {
        objectStore.createIndex("level", "level", { unique: false });
    }
};


request.onsuccess = function(event){
    db = event.target.result
    console.log("Connected")

    console.log("Object Stores:", db.objectStoreNames);

    db.objectStoreNames.forEach(storeName => {
        const transaction = db.transaction([storeName], "readonly");
        const objectStore = transaction.objectStore(storeName);
        console.log(`Indexes for ${storeName}:`, objectStore.indexNames)})
}

request.onerror = function(event){
    console.log(event.target.error)
}

function addToBoard(player){
   const transaction = db.transaction(["players"], "readwrite")
   const objectStore = transaction.objectStore("players")
   
   const request = objectStore.put(player)

   request.onsuccess = function(){console.log("User added:",player)}
   request.onerror = function(event){console.log("Error adding:",event.target.error)}
}

function displayBoard(level) {
    const transaction = db.transaction(["players"], "readonly");
    const objectStore = transaction.objectStore("players");
    const index = objectStore.index(`level`)

    const request = index.getAll(`Level${level}`);

    request.onsuccess = function(event) {
        let leaderboardData = event.target.result
        
        bubbleSort(leaderboardData)

    for(let i = 0;i < leaderboardData.length; i++){
        if(i < 10){
        push()
        fill("white")
        textFont("VT323")
        textAlign(CENTER)
        textSize(50)
        text(`${leaderboardData[i].name}`,width/2-275,680+(i*100)) 
        text(`${leaderboardData[i].time}`,width/2+375,680+(i*100)) 
        pop()
        }
    }
    };

    request.onerror = function(event) {
        console.error("Error retrieving players:", event.target.error);
    };
}


function deletePlayer(id){
    const transaction = db.transaction(["players"], "readwrite")
    const objectStore = transaction.objectStore("players")

    if(Array.isArray(id)){
        for(let i = id[0];i<=id[1];i++){
            const request = objectStore.delete(i)

            request.onsuccess = function(){console.log(`user ${i} deleted.`)}
            request.onerror = function(event){console.log(event.target.error)}
        }  
    }
    else{
        const request = objectStore.delete(id)
        request.onsuccess = function(){console.log(`user ${id} deleted.`)}
        request.onerror = function(event){console.log(event.target.error)}
    }
}

function countPlayers(callback){
    const transaction = db.transaction(["players"], "readonly")
    const objectStore = transaction.objectStore("players")

    const request = objectStore.count()

    request.onsuccess = function() {
        callback(request.result)
    };

    request.onerror = function(event) {
        console.error(event.target.error);
        callback(null)
    };
}

function clearDatabase(){
    const transaction = db.transaction(["players"], "readwrite")
    const objectStore = transaction.objectStore("players")

    const request = objectStore.clear()

    request.onsuccess = function() {
        
    };

    request.onerror = function(event) {
        console.error(event.target.error);
        
    };
}

function secondConvert(timeStr){
    let [minutes,seconds] = timeStr.split(":").map(Number)
    return minutes*60+seconds
}

function bubbleSort(arr) {
    let n = arr.length;
  
    for (let i = 0; i < n - 1; i++) {
      let swapped = false;
  
      for (let j = 0; j < n - i - 1; j++) {
        let timeA = secondConvert(arr[j].time);
        let timeB = secondConvert(arr[j + 1].time);
  
        if (timeA > timeB) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          swapped = true;
        }
      }
  
      if (!swapped) break;
    }
  
    return arr;
  }
  

