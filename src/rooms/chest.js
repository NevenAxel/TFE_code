import { createAvailableActions } from '../utils';
import { feedbackMessage } from '../game';
import { generateTwoActionsNoDupe } from '../utils';
import { getRandomNumber } from '../utils';
import { getObjectByRarity } from '../utils';

export default{
  BasicChestGenerator,

}

function BasicChestGenerator(player, swipeActions) {
    var name = "coffre";
    var desc = "Il y a deux objets dans ce coffre, lequel utiliser ?";
    var img = "coffre.png";

    var availableActions = swipeActions.basicChest;
    var actionNoDupe = generateTwoActionsNoDupe(availableActions);
    var swipeLeft = swipeActions.actionsGenerator[actionNoDupe[0].name](player, swipeActions);
    var swipeRight = swipeActions.actionsGenerator[actionNoDupe[1].name](player, swipeActions);
    return {
      name: name,
      desc: desc, 
      img: img, 
      swipeLeft: swipeLeft,
      swipeRight: swipeRight,
    }
  }