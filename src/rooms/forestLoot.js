import { createAvailableActions } from '../utils';
import { feedbackMessage } from '../game';
import { generateTwoActionsNoDupe } from '../utils';
import { getRandomNumber } from '../utils';
import { getObjectByRarity } from '../utils';
import { shuffle } from '../utils';

import mushroomA1_svg from '../img/monsters/mushroom-a1.svg';
import mushroomA2_svg from '../img/monsters/mushroom-a2.svg';
import mushroomB1_svg from '../img/monsters/mushroom-b1.svg';
import mushroomB2_svg from '../img/monsters/mushroom-b2.svg';
import mushroomC1_svg from '../img/monsters/mushroom-c1.svg';
import mushroomC2_svg from '../img/monsters/mushroom-c2.svg';

var mushrooms = [mushroomA1_svg, mushroomA2_svg, mushroomB1_svg, mushroomB2_svg, mushroomC1_svg, mushroomC2_svg]
mushrooms = shuffle(mushrooms);



export default{
  basicChestGenerator,
  mushroomGenerator,
}

function basicChestGenerator(player, swipeActions) {
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

function mushroomGenerator(player, swipeActions) {
    var name = "Champignon étrange";
    var desc = "Il a l'air comestible, je tente de le manger ?";
    var img = mushroomA1_svg;
    var availableActions = swipeActions.mushroom;
    var swipeLeft = swipeActions.actionsGenerator.noEat(player, swipeActions);
    var swipeRight = swipeActions.actionsGenerator[getObjectByRarity(availableActions).name](player, swipeActions);

    if(swipeRight.name == "toxicMushroom"){
      var img = mushrooms[0];
    }
    if(swipeRight.name == "yummyMushroom"){
      var img = mushrooms[1];
    }
    if(swipeRight.name == "sleepMushroom"){
      var img = mushrooms[2];
    }
    if(swipeRight.name == "agilityMushroom"){
      var img = mushrooms[3];
    }
    if(swipeRight.name == "stupidMushroom"){
      var img = mushrooms[4];
    }
    if(swipeRight.name == "magicMushroom"){
      var img = mushrooms[5];
    }

    return {
      name: name,
      desc: desc, 
      img: img, 
      swipeLeft: swipeLeft,
      swipeRight: swipeRight,
    }
  }

