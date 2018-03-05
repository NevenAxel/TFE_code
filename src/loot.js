import { randomProperties } from './utils';
import { getRandomAction } from './utils';
import { getObjectByRarity } from './utils';

export default {
  chestList : [
    {name: 'basicChest', rarity: 100},
  ],

  lootGenerator: {
    basicChest: BasicChestGenerator,
    starting: startingGenerator,
  },
};


function BasicChestGenerator(player, swipeActions) {
  var name = "coffre";
  var desc = "Il y a deux objets dans ce coffre, lequel utiliser ?";
  var img = "coffre.png";

  var availableActions = swipeActions.basicChest;
  var actionNoDupe = generateTwoActionsNoDupe(availableActions);
  var swipeLeft = swipeActions.actionsGenerator[actionNoDupe[0].name](player);
  var swipeRight = swipeActions.actionsGenerator[actionNoDupe[1].name](player);
  return {
    name: name,
    desc: desc, 
    img: img, 
    swipeLeft: swipeLeft,
    swipeRight: swipeRight,
  }
}

function startingGenerator(player, swipeActions) {
  var name = 'Garde du donjon';
  var desc = 'Equipe toi aventurier';
  var img = 'dungeonGuard.png';

  var availableActions = swipeActions.starting;
  var actionNoDupe = generateTwoActionsNoDupe(availableActions);
  var actionLeft = swipeActions.actionsGenerator[actionNoDupe[0].name](player);
  var actionRight = swipeActions.actionsGenerator[actionNoDupe[1].name](player);
  return {
    name: name,
    desc: desc, 
    img: img,
    swipeLeft: actionLeft,
    swipeRight: actionRight,
  }
}

function generateTwoActionsNoDupe(availableActions) {
  var actionLeft = getObjectByRarity(availableActions);
  var actionRight = getObjectByRarity(availableActions.filter(function(action) { return action.name !== actionLeft.name }));
  return [actionLeft, actionRight];
}