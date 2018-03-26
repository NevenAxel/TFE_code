import { createAvailableActions } from '../utils';
import { feedbackMessage } from '../game';
import { generateTwoActionsNoDupe } from '../utils';
import { getRandomNumber } from '../utils';
import { getObjectByRarity } from '../utils';

export default {
  startingGenerator
};
  

function startingGenerator(player, swipeActions) {
  var name = 'Garde du donjon';
  var desc = 'Equipe toi aventurier';
  var img = 'dungeonGuard.png';

  var availableActions = swipeActions.starting;
  var actionNoDupe = generateTwoActionsNoDupe(availableActions);
  var actionLeft = swipeActions.actionsGenerator[actionNoDupe[0].name](player, swipeActions);
  var actionRight = swipeActions.actionsGenerator[actionNoDupe[1].name](player, swipeActions);
  return {
    name: name,
    desc: desc, 
    img: img,
    swipeLeft: actionLeft,
    swipeRight: actionRight,
  }
}

