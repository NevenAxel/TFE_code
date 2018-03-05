import { randomProperties } from './utils';
import { randomOne } from './utils';

function rogueGenerator(swipeActions, player) {
  return {
    name: 'Voleur',
    desc:function () {return 'Donne moi tes pieces ou je te tue!'}, 
    img:'voleur.png', 
    swipeRight: swipeActions.monsters.attack(player, 3),
    swipeLeft: swipeActions.monsters.givecoins(player),
  }
}

function boarGenerator(swipeActions, player) {
  return {
    name: 'Loup sauvage',
    desc:function () {return 'Wouaf wouaf!'}, 
    img:'loup.png', 
    swipeRight: swipeActions.monsters.attack(player, 3),
    swipeLeft: randomOne(
      swipeActions.monsters.feed(player, 5, 5),
      swipeActions.monsters.scream(player, 4, 10),
      swipeActions.monsters.escape(player, 5, 10),
    ),  //[swipeActions.scream(90%, 5), swipeActions.feed(50%, 4), swipeActions.escape(90%, 5), swipeActions.pet(50%, 5)] percentage of sucess if stats are alright
  }
}

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


export default {
    rogue: rogueGenerator,
    boar: boarGenerator,
    hugeogre: hugeOgreGenerator,
    gobelin: gobelinGenerator,
};