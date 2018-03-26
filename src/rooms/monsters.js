import { createAvailableActions } from '../utils';
import { feedbackMessage } from '../game';
import { generateTwoActionsNoDupe } from '../utils';
import { getRandomNumber } from '../utils';
import { getObjectByRarity } from '../utils';

export default {
  rogueGenerator,
  wolfGenerator,
  spiderGenerator,
  gobelinGenerator,  
  hugeOgreGenerator,

}

  function rogueGenerator(player, swipeActions) {
    var name = 'voleur';
    var img = 'voleur.png';
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
    var img = 'wolf.png';
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
    var img = 'spider.png';
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
    var img = 'gobelin.png';
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

  function hugeOgreGenerator(player, swipeActions) {
    var name = 'Enorme Ogre';
    var img = 'ogre.png';
    var desc = "*Il a l'air plutôt robuste*";
    var availableActions = createAvailableActions(player, swipeActions,[
      'monsterGeneral',
      'monsterHumanoid',
    ]);
    // ajouter l'action fuir en gros nombre dans les availableactions car ça doit arriver plus souvent pour ce mob
    var swipeLeft = swipeActions.actionsGenerator[getObjectByRarity(availableActions).name](player, swipeActions);
    var swipeRight = swipeActions.actionsGenerator.attack(player, swipeActions);
    // Exceptions 
    // Prend plus de dmg en général, sur la fuite etc.
    // Il a l'air facile a esquiver en description (50% de chance d'avoir cette description)
    swipeLeft.damage = 5
    if(swipeLeft.name == "escape"){
      var descF = function() {if(Math.random() < 0.30){return"*Il a l'air facile à esquiver*"} else{return"*Il a l'air plutôt robuste*"}}
      desc = descF();
      swipeLeft.require = 2
    }

    return {
      name: name,
      desc: desc,
      img: img, 
      swipeLeft: swipeLeft,
      swipeRight: swipeRight,
    }
  }

  

