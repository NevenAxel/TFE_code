import { getRandomNumber } from './utils';
import { getObjectByRarity } from './utils';
import { feedbackMessage } from './game';

export default {
  basicMonsterList : basicMonsterList,

  
  monsterGenerator : monsterGenerator,
}

var basicMonsterList = [
  {name: 'wolf', rarity: 100},
  {name: 'rogue', rarity: 100},
]

var monsterGenerator = {
  wolf: wolfGenerator,
  rogue: rogueGenerator,
}


function rogueGenerator(player, swipeActions, rarity) {
  var name = 'voleur';
  var rarity = rarity;
  var img = 'voleur.png';
  var desc = "Donne moi des pièces ou je te tue!";
  var swipeLeft = swipeActions.monsters.unique.givecoins(player, 100);
  var swipeRight = swipeActions.monsters.unique.attack(player, 100);

  return {
    name: name,
    rarity: rarity,
    desc: desc,
    img: img, 
    swipeLeft: swipeLeft,
    swipeRight: swipeRight,
  }
}


function wolfGenerator(player, swipeActions, rarity) {
  var name = 'loup sauvage';
  var rarity = rarity;
  var img = 'wolf.png';
  var desc = "Wouaf wouaf!";
  var availableActions = swipeActions.monsters.animals(player);
  var swipeLeft = getObjectByRarity(availableActions);
  var swipeRight = swipeActions.monsters.unique.attack(player, 100);

  // Exceptions 

  if(swipeLeft.name == "scream"){
    var desc = "*feared* wouaf wouaf!";
    swipeLeft.damage = 2;
  }

  return {
    name: name,
    rarity: rarity,
    desc: desc,
    img: img, 
    swipeLeft: swipeLeft,
    swipeRight: swipeRight,
  }
}


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


/*
  var basicMonsterList = [
    {name: 'troll', rarity: 100},
    {name: 'goblin', rarity: 100},
    {name: 'wolf', rarity: 100},
  ]

  var monsterGenerator = {
  troll: generateTroll,
  goblin: generateGobelin,
  wolf: generateWolf,
}
*/