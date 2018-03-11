import { getRandomNumber } from './utils';
import { getObjectByRarity } from './utils';
import { createAvailableActions } from './utils';
import { feedbackMessage } from './game';

export default {
  basicMonsterList : [
    {name: 'wolf', rarity: 0},
    {name: 'rogue', rarity: 2},
    {name: 'gobelin', rarity: 0},
  ],

  monsterGenerator : {
    wolf: wolfGenerator,
    rogue: rogueGenerator,
    gobelin: gobelinGenerator,
  }
}

function rogueGenerator(player, swipeActions) {
  var name = 'voleur';
  var img = 'voleur.png';
  var desc = "Donne moi des pièces ou je te tue!";
  var swipeLeft = swipeActions.actionsGenerator.giveCoins(player);
  var swipeRight = swipeActions.actionsGenerator.attack(player);

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
  var desc = "Wouaf wouaf!";
  var availableActions = createAvailableActions(player, swipeActions,[
    'monsterGeneral',
    'monsterAnimals',
  ]);
  var swipeLeft = swipeActions.actionsGenerator[getObjectByRarity(availableActions).name](player);
  var swipeRight = swipeActions.actionsGenerator.attack(player);
  // Exceptions 

  if(swipeLeft.name == "scream"){
    var desc = "*feared* wouaf wouaf!";
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
/*
    Monstre zombie : si tu lui suce le sang (si ton perso est devenu un vampire)
    tu perds de la vie, tu attrappe une maladie(prendre du dmg sur plusieurs tour)

    possibilité d'apprendre des nouvelles aptitudes au près de personnage divers

    ce serait une bonne idée de ne pas avoir le choix de droit lock sur une action!
    --> mettre en point un algorithme qui permet d'avoir toujours 2 choix sensé ?
    --> peut être juste deux type d'action, les actions attaques (à droite)
    --> et les actions plus funky à gauche

*/

function gobelinGenerator(player, swipeActions) {
  var name = 'Petit gobelin';
  var img = 'gobelin.png';
  var desc = "Je suis sur que tu as pleins de pièces d'or sur toi!";
  var availableActions = createAvailableActions(player, swipeActions,[
    'monsterGeneral',
    'monsterHumanoid',
  ]);
  var swipeLeft = swipeActions.actionsGenerator[getObjectByRarity(availableActions).name](player);
  var swipeRight = swipeActions.actionsGenerator.attack(player);
  // Exceptions 

  return {
    name: name,
    desc: desc,
    img: img, 
    swipeLeft: swipeLeft,
    swipeRight: swipeRight,
  }
}

/*
function gobelinGenerator(swipeActions, player) {
  return {
    name: 'Petit gobelin',
    desc:function () {return "* Il ne vous a pas encore vu *"}, 
    img:'gobelin.png', 
    swipeRight: swipeActions.monsters.attack(player, 3),
    swipeLeft: gobelinGeneratorSwipeLeft(swipeActions, player)
    
  }
}
function gobelinGeneratorSwipeLeft(swipeActions, player) {
  var availableActions = [
        swipeActions.monsters.escape(player, 5, 8),
        swipeActions.monsters.scream(player, 4, 12),
      ];
      if (player.getAgility() > 10){
        availableActions.push(swipeActions.monsters.steal(player, 5, 10))
      }
      return randomProperties(availableActions);
}
*/
/*

    est ce qu'on met un systeme de vie au monstres ?? si oui comment ça fonctionne?
    avec des action dans le genre nourrir, caresser l'animal, crier etc.
    est ce que les dmg du monstre seraient indiquer sur la carte (bof, bof..)
    
    Scenario:
    - on commence dans une auberge
    - un personnage nous parle d'un trésor qui rend immortel caché dans la forêt
    - grosse partie de dialogue
    - finalement on décide de partir à la recherche du trésor
    - que prendre pour partir à l'aventure (un arc, une épée ou un baton magique?)
    - aller dans la forêt maudite où pourrait trouver le fameux trésor
    - On peut passer par différentes zone, le chemin feuillu ou le chemin aux arbres morts
    - puis après quelqu'un indique la direction du trésor, dans une grotte par exemple
    - le perso rentre dans la grotte pour y trouver le fameux trésor

*/

/*
function hugeOgreGenerator(swipeActions, player) {
  return {
    name: 'Ogre gigantesque',
    desc:function () {return 'Viens, rapproche toi...'}, 
    img:'Ogre.png', 
    swipeRight: swipeActions.monsters.attack(player, 5),
    swipeLeft: randomOne(
      swipeActions.monsters.escape(player, 10, 2),
    ),
  }
}

function gobelinGenerator(swipeActions, player) {
  return {
    name: 'Petit gobelin',
    desc:function () {return "* Il ne vous a pas encore vu *"}, 
    img:'gobelin.png', 
    swipeRight: swipeActions.monsters.attack(player, 3),
    swipeLeft: gobelinGeneratorSwipeLeft(swipeActions, player)
    
  }
}
function gobelinGeneratorSwipeLeft(swipeActions, player) {
  var availableActions = [
        swipeActions.monsters.escape(player, 5, 8),
        swipeActions.monsters.scream(player, 4, 12),
      ];
      if (player.getAgility() > 10){
        availableActions.push(swipeActions.monsters.steal(player, 5, 10))
      }
      return randomProperties(availableActions);
}
*/