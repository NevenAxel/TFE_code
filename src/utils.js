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