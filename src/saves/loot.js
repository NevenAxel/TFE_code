import { randomProperties } from './utils';
import { getRandomAction } from './utils';

function classicGenerator(swipeActions, player) {
  var availableActions = swipeActions.loot;
  var actionNoDupe = generateTwoActionsNoDupe(availableActions);
  var actionLeft = actionNoDupe[0];
  var actionRight = actionNoDupe[1];
  return {
    name: 'Coffre',
    desc:function () {return 'Il y a deux objets dans ce coffre, lequel utiliser ?'}, 
    img:'coffre.png', 
    swipeRight: actionRight(player),
    swipeLeft: actionLeft(player),
  }
}

function startingGenerator(swipeActions, player) {
  var availableActions = swipeActions.starting;
  var actionNoDupe = generateTwoActionsNoDupe(availableActions);
  var actionLeft = actionNoDupe[0];
  var actionRight = actionNoDupe[1];
  return {
    name: 'Garde du donjon',
    desc:function () {return 'Equipe toi aventurier'}, 
    img:'dungeonGuard.png',
    swipeRight: actionRight(player),
    swipeLeft: actionLeft(player),
  }
}


export default {
    classic: classicGenerator,
    starting: startingGenerator,
};

function generateTwoActionsNoDupe(availableActions) {
  var actionLeft = getRandomAction(availableActions);
  var actionRight = getRandomAction(availableActions.filter(function(action) { return action.name !== actionLeft.name }));
  return [actionLeft, actionRight];
}