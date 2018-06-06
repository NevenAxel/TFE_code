import { createAvailableActions } from '../utils';
import { feedbackMessage } from '../game';
import { generateTwoActionsNoDupe } from '../utils';
import { getRandomNumber } from '../utils';
import { getObjectByRarity } from '../utils';
import { shuffle } from '../utils';
import { getRandomArray } from '../utils';

import mushroomA1_svg from '../img/monsters/mushroom-a1.svg';
import mushroomA2_svg from '../img/monsters/mushroom-a2.svg';
import mushroomB1_svg from '../img/monsters/mushroom-b1.svg';
import mushroomB2_svg from '../img/monsters/mushroom-b2.svg';
import mushroomC1_svg from '../img/monsters/mushroom-c1.svg';
import mushroomC2_svg from '../img/monsters/mushroom-c2.svg';

var mushrooms = [mushroomA1_svg, mushroomA2_svg, mushroomB1_svg, mushroomB2_svg, mushroomC1_svg, mushroomC2_svg]
mushrooms = shuffle(mushrooms);



export default{
  mushroomGenerator,
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
      if(player.special.mushroomKnowledge){
        var name = "Champignon Toxique"
        var desc = "C'est un champignon toxique, mieux vaut ne pas le manger.";
      }
    }
    if(swipeRight.name == "yummyMushroom"){
      var img = mushrooms[1];
      if(player.special.mushroomKnowledge){
        var name = "Champignon Délicieux"
        var desc = "Il est comestible et vous rendra même des points de vie.";
      }
    }
    if(swipeRight.name == "sleepMushroom"){
      var img = mushrooms[2];
      if(player.special.mushroomKnowledge){
        var name = "Champignon de Charleroi"
        var desc = "C'est un champignon qui endort, qui amortit si vous préférez.";
      }
    }
    if(swipeRight.name == "agilityMushroom"){
      var img = mushrooms[3];
      if(player.special.mushroomKnowledge){
        var name = "Champignon Vivace"
        var desc = "Ce champignon vous redonnera votre vigueur d'antan !";
      }
    }
    if(swipeRight.name == "stupidMushroom"){
      var img = mushrooms[4];
      if(player.special.mushroomKnowledge){
        var name = "Champignon Abrutissant"
        var desc = "Plus vous en mangez et plus vous êtes heureux ! Et bête par la même occasion.";
      }
    }
    if(swipeRight.name == "magicMushroom"){
      var img = mushrooms[5];
      if(player.special.mushroomKnowledge){
        var name = "Champignon Magique"
        var desc = "Ce champignon rare est le meilleur de la forêt, il vous augmente vos PvMax.";
      }
    }

    return {
      name: name,
      desc: desc, 
      img: img, 
      swipeLeft: swipeLeft,
      swipeRight: swipeRight,
    }
  }

