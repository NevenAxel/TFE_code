export function getRandomNumber(min, max) {
  return min + Math.round((Math.random() * (max - min))) ;
  }

export function randomProperties(obj) {
    var keys = Object.keys(obj)
    return obj[keys[ keys.length * Math.random() << 0]];
  };


export function randomOne() {
	var args = Array.prototype.slice.call(arguments);
	return randomProperties(args)
}

export function getRandomAction(actionList) {
    return actionList[Math.floor(Math.random() * actionList.length)];
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

export function createAvailableActions(player, swipeActions, objectList){
  var availableActions = []

  // Mettre toutes les actions dans la liste d'action dans la liste availableActions
  objectList.forEach(function(element) {
    swipeActions[element].forEach(function(element) {
      availableActions.push(element)
    });
  });

  // Ajouter les actions spécifique à la classe si le joueur est de cette classe
  if(player.getRole() == "rogue"){
    objectList.forEach(function(element) {
      var actionList = element + 'Rogue';
      if(typeof swipeActions[actionList] !== "undefined"){
        swipeActions[actionList].forEach(function(element) {
          availableActions.push(element)
        });
      }
    });
  }

  if(player.getRole() == "mage"){
    objectList.forEach(function(element) {
      var actionList = element + 'Mage';
      if(typeof swipeActions[actionList] !== "undefined"){
        swipeActions[actionList].forEach(function(element) {
          availableActions.push(element)
        });
      }
    });
  }

  if(player.getRole() == "warrior"){
    objectList.forEach(function(element) {
      var actionList = element + 'Warrior';
      if(typeof swipeActions[actionList] !== "undefined"){
        swipeActions[actionList].forEach(function(element) {
          availableActions.push(element)
        });
      }
    });
  }

  if(player.getRole() == "agility"){
    objectList.forEach(function(element) {
      var actionList = element + 'Agility';
      if(typeof swipeActions[actionList] !== "undefined"){
        swipeActions[actionList].forEach(function(element) {
          availableActions.push(element)
        });
      }
    });
  }

  if(player.getRole() == "intelligence"){
    objectList.forEach(function(element) {
      var actionList = element + 'Intelligence';
      if(typeof swipeActions[actionList] !== "undefined"){
        swipeActions[actionList].forEach(function(element) {
          availableActions.push(element)
        });
      }
    });
  }

  if(player.getRole() == "strenght"){
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