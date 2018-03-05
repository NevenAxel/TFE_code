import { randomProperties } from './utils';
import { getRandomAction } from './utils';
import { getObjectByRarity } from './utils';

function chestGenerator(player, swipeActions, rarity) {
  var name = "coffre";
  var rarity = rarity;
  var desc = "Il y a deux objets dans ce coffre, lequel utiliser ?";
  var img = "coffre.png";

  var availableActions = swipeActions.loot.chest(player);
  var actionNoDupe = generateTwoActionsNoDupe(availableActions);
  var swipeLeft = actionNoDupe[0];
  var swipeRight = actionNoDupe[1];
  return {
    name: name,
    rarity: rarity,
    desc: desc, 
    img: img, 
    swipeLeft: swipeLeft,
    swipeRight: swipeRight,
  }
}

function startingGenerator(player, swipeActions, rarity) {
  var name = 'Garde du donjon';
  var rarity = rarity;
  var desc = 'Equipe toi aventurier';
  var img = 'dungeonGuard.png';

  var availableActions = swipeActions.special.starting(player);
  var actionNoDupe = generateTwoActionsNoDupe(availableActions);
  var actionLeft = actionNoDupe[0];
  var actionRight = actionNoDupe[1];
  return {
    name: name,
    rarity: rarity,
    desc: desc, 
    img: img,
    swipeLeft: actionLeft,
    swipeRight: actionRight,
  }
}


export default {
  chest: function getChest(player, swipeActions){
    var chest = [];
    chest.push(chestGenerator(player, swipeActions, 100));
    return chest
  },
  unique: {
    starting: startingGenerator,
  }
};

function generateTwoActionsNoDupe(availableActions) {
  var actionLeft = getObjectByRarity(availableActions);
  var actionRight = getObjectByRarity(availableActions.filter(function(action) { return action.name !== actionLeft.name }));
  return [actionLeft, actionRight];
}