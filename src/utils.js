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
  var minimRarity = Math.random() * 100;
  var availableObjects = objectList.filter(object => object.rarity > minimRarity);
  return availableObjects[Math.floor(Math.random()* availableObjects.length)];
}