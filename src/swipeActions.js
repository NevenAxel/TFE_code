import { getRandomNumber } from './utils';
import { feedbackMessage } from './game';

import loot from './actions/actionsLoots';
import monster from './actions/actionsMonsters';
import starting from './actions/actionsStarting';
import mushroom from './actions/actionsMushroom';
import frog from './actions/actionsFrog';

// -------------------------------- EXPORT DEFAULT -------------------------------------------------- //

export default {
  monsterGeneral: [
  	{name: 'escape', rarity: 1},
  ],
  monsterGeneralRogue: [
  	{name: 'escape', rarity: 1},
  ],
  monsterGeneralMage: [
  	//{name: 'fireball', rarity: 1},
  ],
  monsterGeneralWarrior: [
  	//{name: 'block', rarity: 1},
  ],


  monsterAnimals: [
  	{name: 'scream', rarity: 1},
  	{name: 'feed', rarity: 1},
  	//{name: 'pet', rarity: 1},
  ],
  monsterAnimalsRogue: [
  	//{name: 'trap', rarity: 1},
  ],
  monsterAnimalsIntelligence: [
  	{name: 'feed', rarity: 1},
  	//{name: 'pet', rarity: 1},
  ],


  monsterSmallCreature: [
  	{name: 'scream', rarity: 1},
  ],


  monsterHumanoid: [
  ],
  monsterHumanoidRogue: [
  	{name: 'steal', rarity: 1},
  ],
  monsterHumanoidAgility: [
  	{name: 'steal', rarity: 3},
  ],


  basicChest: [
  	{name: 'hpPotion', rarity: 10},
  	{name: 'bagOfCoins', rarity: 10},
  	{name: 'spinach', rarity: 0},
  	{name: 'magicBook', rarity: 4},
  	{name: 'speedShoes', rarity: 0},
  	{name: 'dumbBell', rarity: 4},
  ],

  mushroom: [
  	{name: 'toxicMushroom', rarity: 20},
  	{name: 'sleepMushroom', rarity: 12},
  	{name: 'stupidMushroom', rarity: 8},
  	{name: 'magicMushroom', rarity: 5},
  	{name: 'agilityMushroom', rarity: 10},
  	{name: 'yummyMushroom', rarity: 20},
  ],

  frog: [
    {name: 'eatFrog', rarity: 10},
    {name: 'kissFrog', rarity: 0},
    {name: 'talkFrog', rarity: 10},
    {name: 'feedFrog', rarity: 10},
    {name: 'killFrog', rarity: 10},
  ],
  toad:[
    {name: 'eatToad', rarity: 10},
    {name: 'kissFrog', rarity: 0},
    {name: 'talkToad', rarity: 10},
    {name: 'feedFrog', rarity: 10},
    {name: 'killFrog', rarity: 10},
  ],

  starting: [
  	//{name: 'wand', rarity: 1},
  	{name: 'sword', rarity: 1},
  	{name: 'bow', rarity: 1},
  ],

  actionsGenerator: {
  	wand: starting.generateWand,
  	sword: starting.generateSword,
  	bow: starting.generateBow,

  	toxicMushroom: mushroom.generateToxicMushroom,
  	sleepMushroom: mushroom.generateSleepMushroom,
  	stupidMushroom: mushroom.generateStupidMushroom,
  	magicMushroom: mushroom.generateMagicMushroom,
  	agilityMushroom: mushroom.generateAgilityMushroom,
  	yummyMushroom: mushroom.generateYummyMushroom,

  	eatFrog: frog.generateEatFrog,
  	eatToad: frog.generateEatToad,
  	kissFrog: frog.generateKissFrog,
  	talkFrog: frog.generateTalkFrog,
  	feedFrog: frog.generateFeedFrog,
  	killFrog: frog.generateKillFrog,
    talkToad: frog.generateTalkToad,
    frogBenediction: frog.generateFrogBenediction,
    frogCurse: frog.generateFrogCurse,

  	hpPotion: loot.generateHpPotion,
  	bagOfCoins: loot.generateBagOfCoins,
  	spinach: loot.generateSpinach,
  	magicBook: loot.generateMagicBook,
  	speedShoes: loot.generateSpeedShoes,
  	dumbBell: loot.generateDumbBell,

  	escape: monster.generateEscape,
  	scream: monster.generateScream,
  	feed: monster.generateFeed,
  	steal: monster.generateSteal,

  	attack: monster.generateAttack,
  	noEat: mushroom.generateNoEat,
  	giveCoins: monster.generateGiveCoins,
  }
  /*
  Faire des actions complexes (en plusieurs cartes)
  ça rend les actions plus intéressantes que d'avoir 
  une seule réponse (50% de chance de réussite et c'est tout)

  Et fonctionner avec plus d'actions typique à la classe

  certaines actions peuvent loot un objet certaine non
  (s'echapper ne permettra pas de loot d'objet)
  les loot sont en général des choix entre deux objets
  certaines actions finissent le combat, d'autres pas.
  Voler des pièces en voleur ne finit pas le combat?
  Quand une action rate ça ne finit pas le combat?
  

  Action "préparer son armure"
  prend du dmg maintenant mais pas la prochaine carte
  ou donne un certain nombre d'armure

  action "coup de bouclier"
  si on a de l'armure a beaucoup de chance d'arriver
  et permet de ne pas prendre de dmg

  classe guerrier passif: berserk, si le guerrier a moins de 20% de pv
  il se passe quelqueschose, plus de dmg, accès à d'autres abilité
  (Plus de chance de chopper des loot par exemple)

  Objet bière : gagner 10pv mais rend les 5 prochaines actions aléateoire
  
  */
};

