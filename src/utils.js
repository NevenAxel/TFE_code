export function getRandomNumber(min, max) {
  return min + Math.round((Math.random() * (max - min))) ;
  }

export function randomProperties(obj) {
    var keys = Object.keys(obj)
    return obj[keys[ keys.length * Math.random() << 0]];
  };

export function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

export function getRandomArray(arrayList) {
    return arrayList[Math.floor(Math.random() * arrayList.length)];
};



export function getObjectByRarity(objectList){
  var lootTable = []
  objectList.forEach(function(element) {
    var rarity = element.rarity;
    for (var i = 0; i < rarity; i++) {
      lootTable.push(element);
    }    
  });
  return lootTable[Math.floor(Math.random() * lootTable.length)];
}

export function generateTwoActionsNoDupe(availableActions) {
  var actionLeft = getObjectByRarity(availableActions);
  var actionRight = getObjectByRarity(availableActions.filter(function(action) { return action.name !== actionLeft.name }));
  return [actionLeft, actionRight];
}

export function createAvailableActions(player, swipeActions, objectList){
  var availableActions = []

  // Mettre toutes les actions dans la liste d'action dans la liste availableActions
  objectList.forEach(function(element) {
    swipeActions[element].forEach(function(element) {
      availableActions.push(element)
    });
  });

  // Ajouter les actions spécifique à la classe si le joueur est de cette classe
  if(player.getRole() == "Archer"){
    objectList.forEach(function(element) {
      var actionList = element + 'Rogue';
      if(typeof swipeActions[actionList] !== "undefined"){
        swipeActions[actionList].forEach(function(element) {
          availableActions.push(element)
        });
      }
    });
  }

  if(player.getRole() == "Mage"){
    objectList.forEach(function(element) {
      var actionList = element + 'Mage';
      if(typeof swipeActions[actionList] !== "undefined"){
        swipeActions[actionList].forEach(function(element) {
          availableActions.push(element)
        });
      }
    });
  }

  if(player.getRole() == "Guerrier"){
    objectList.forEach(function(element) {
      var actionList = element + 'Warrior';
      if(typeof swipeActions[actionList] !== "undefined"){
        swipeActions[actionList].forEach(function(element) {
          availableActions.push(element)
        });
      }
    });
  }

  if(player.getAgility() > 12){
    objectList.forEach(function(element) {
      var actionList = element + 'Agility';
      if(typeof swipeActions[actionList] !== "undefined"){
        swipeActions[actionList].forEach(function(element) {
          availableActions.push(element)
        });
      }
    });
  }

  if(player.getIntel() > 10){
    objectList.forEach(function(element) {
      var actionList = element + 'Intelligence';
      if(typeof swipeActions[actionList] !== "undefined"){
        swipeActions[actionList].forEach(function(element) {
          availableActions.push(element)
        });
      }
    });
  }

  if(player.getStr() > 10){
    objectList.forEach(function(element) {
      var actionList = element + 'Strenght';
      if(typeof swipeActions[actionList] !== "undefined"){
        swipeActions[actionList].forEach(function(element) {
          availableActions.push(element)
        });
      }
    });
  }

  return availableActions
}