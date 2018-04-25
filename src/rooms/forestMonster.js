import { createAvailableActions } from '../utils';
import { feedbackMessage } from '../game';
import { generateTwoActionsNoDupe } from '../utils';
import { getRandomNumber } from '../utils';
import { getObjectByRarity } from '../utils';

import goblin_svg from '../img/monsters/goblin.svg';
import spider_svg from '../img/monsters/spider.svg';
import frogregular_svg from '../img/monsters/frog-regular.svg';
import frogtoxic_svg from '../img/monsters/frog-toxic.svg';
import frogmagic_svg from '../img/monsters/frog-magic.svg';



export default {
  rogueGenerator,
  wolfGenerator,
  spiderGenerator,
  gobelinGenerator,  
  frogGenerator,
  toadGenerator,
  frogKingGenerator,
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
    var desc = "Je vais te dépouiller!";
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
  

  function frogGenerator(player, swipeActions) {
    var name = 'Un amphibien';
    var img = frogregular_svg;
    var desc = "Croâ Croâ!";
    var availableActions = swipeActions.frog;
    var actionNoDupe = generateTwoActionsNoDupe(availableActions);
    var swipeLeft = swipeActions.actionsGenerator[actionNoDupe[0].name](player, swipeActions);
    var swipeRight = swipeActions.actionsGenerator[actionNoDupe[1].name](player, swipeActions);
    // Exceptions 
    if(Math.random() < 0.60){
      var desc = "Croâ Croâ!";
    }
    else{
      var desc = "Est-ce un crapaud ou une grenouille ?";
    }

    return {
      name: name,
      desc: desc,
      img: img, 
      swipeLeft: swipeLeft,
      swipeRight: swipeRight,
    }
  }

  function toadGenerator(player, swipeActions) {
    var name = 'Un amphibien';
    var img = frogtoxic_svg;
    var desc = "Croâ Croâ!";
    var availableActions = swipeActions.toad;
    var actionNoDupe = generateTwoActionsNoDupe(availableActions);
    var swipeLeft = swipeActions.actionsGenerator[actionNoDupe[0].name](player, swipeActions);
    var swipeRight = swipeActions.actionsGenerator[actionNoDupe[1].name](player, swipeActions);
    // Exceptions 
    if(Math.random() < 0.60){
      var desc = "Croâ Croâ!";
    }
    else{
      var desc = "Est-ce un crapaud ou une grenouille ?";
    }

    return {
      name: name,
      desc: desc,
      img: img, 
      swipeLeft: swipeLeft,
      swipeRight: swipeRight,
    }
  }

  function frogKingGenerator(player, swipeActions) {
    var name = 'Le roi grenouille';
    var img = frogmagic_svg;
    var desc = "Je te lance ce sort de protection, pour les grenouilles!!";
    var swipeLeft = swipeActions.actionsGenerator.frogBenediction(player, swipeActions);
    var swipeRight = swipeActions.actionsGenerator.frogBenediction(player, swipeActions);
    if(player.special.frogHater >= 4){
      var desc = "Es-tu fier du génocide amphibien que tu viens de provoquer ?! Je te maudis!";
      var swipeLeft = swipeActions.actionsGenerator.frogCurse(player, swipeActions);
      var swipeRight = swipeActions.actionsGenerator.frogCurse(player, swipeActions);
    }
    else if(player.special.frogFriend >= 4){
      var desc = "Tu as été bon avec les grenouilles, je te lance ce sort de protection";
      var swipeLeft = swipeActions.actionsGenerator.frogBenediction(player, swipeActions);
      var swipeRight = swipeActions.actionsGenerator.frogBenediction(player, swipeActions);
    }
    

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
