import { createAvailableActions } from '../utils';
import { feedbackMessage } from '../game';
import { generateTwoActionsNoDupe } from '../utils';
import { getRandomNumber } from '../utils';
import { getObjectByRarity } from '../utils';

import goblin_svg from '../img/monsters/goblin.svg';
import spider_svg from '../img/monsters/spider.svg';


export default {
  rogueGenerator,
  wolfGenerator,
  spiderGenerator,
  gobelinGenerator,  
}

  function rogueGenerator(player, swipeActions) {
    var name = 'gobelin voleur';
    var img = goblin_svg;
    var desc = "Donne moi des pièces ou je te tue!";
    var swipeLeft = swipeActions.actionsGenerator.giveCoins(player, swipeActions);
    var swipeRight = swipeActions.actionsGenerator.attack(player, swipeActions);

    return {
      name: name,
      desc: desc,
      img: img, 
      swipeLeft: swipeLeft,
      swipeRight: swipeRight,
    }
  }


  function wolfGenerator(player, swipeActions) {
    var name = 'loup sauvage';
    var img = 'gobelin.svg';
    var desc = "*Le loup hurle et fonce sur toi*";
    var availableActions = createAvailableActions(player, swipeActions,[
      'monsterGeneral',
      'monsterAnimals',
    ]);
    var swipeLeft = swipeActions.actionsGenerator[getObjectByRarity(availableActions).name](player, swipeActions);
    var swipeRight = swipeActions.actionsGenerator.attack(player, swipeActions);
    // Exceptions 

    if(swipeLeft.name == "scream"){
      var desc = "*Le loup vous regarde avec des yeux rouges*";
    }

    return {
      name: name,
      desc: desc,
      img: img, 
      swipeLeft: swipeLeft,
      swipeRight: swipeRight,
    }
  }

  function spiderGenerator(player, swipeActions) {
    var name = 'araignée géante';
    var img = spider_svg;
    var desc = "*Elle est prête à bondir*";
    var availableActions = createAvailableActions(player, swipeActions,[
      'monsterGeneral',
      'monsterAnimals',
    ]);
    var swipeLeft = swipeActions.actionsGenerator[getObjectByRarity(availableActions).name](player, swipeActions);
    var swipeRight = swipeActions.actionsGenerator.attack(player, swipeActions);
    // Exceptions 

    if(swipeLeft.name == "feed"){
      var desc = "*On dirait qu'elle veut te manger*";
      swipeLeft.damage = 2;
    }

    return {
      name: name,
      desc: desc,
      img: img, 
      swipeLeft: swipeLeft,
      swipeRight: swipeRight,
    }
  }


  function gobelinGenerator(player, swipeActions) {
    var name = 'Petit gobelin';
    var img = goblin_svg;
    var desc = "Je suis sur que tu as pleins de pièces d'or sur toi!";
    var availableActions = createAvailableActions(player, swipeActions,[
      'monsterGeneral',
      'monsterHumanoid',
    ]);
    var swipeLeft = swipeActions.actionsGenerator[getObjectByRarity(availableActions).name](player, swipeActions);
    var swipeRight = swipeActions.actionsGenerator.attack(player, swipeActions);
    // Exceptions 

    return {
      name: name,
      desc: desc,
      img: img, 
      swipeLeft: swipeLeft,
      swipeRight: swipeRight,
    }
  }

  

