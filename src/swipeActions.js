import { getRandomNumber } from './utils';
import { feedbackMessage } from './game';

import loot from './actions/actionsLoots';
import monster from './actions/actionsMonsters';
import starting from './actions/actionsStarting';
import forestMushroom from './actions/forestMushroom';

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
  	{name: 'steal', rarity: 2},
  ],
  monsterHumanoidAgility: [
  	{name: 'steal', rarity: 1},
  ],


  basicChest: [
  	{name: 'hpPotion', rarity: 10},
  	{name: 'bagOfCoins', rarity: 10},
  	{name: 'spinach', rarity: 1},
  	{name: 'magicBook', rarity: 1},
  	{name: 'speedShoes', rarity: 1},
  	{name: 'dumbBell', rarity: 1},
  ],

  mushroom: [
  	{name: 'toxicMushroom', rarity: 20},
  	{name: 'sleepMushroom', rarity: 12},
  	{name: 'stupidMushroom', rarity: 8},
  	{name: 'magicMushroom', rarity: 5},
  	{name: 'agilityMushroom', rarity: 10},
  	{name: 'yummyMushroom', rarity: 20},
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

  	toxicMushroom: forestMushroom.generateToxicMushroom,
  	sleepMushroom: forestMushroom.generateSleepMushroom,
  	stupidMushroom: forestMushroom.generateStupidMushroom,
  	magicMushroom: forestMushroom.generateMagicMushroom,
  	agilityMushroom: forestMushroom.generateAgilityMushroom,
  	yummyMushroom: forestMushroom.generateYummyMushroom,

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
  	noEat: forestMushroom.generateNoEat,
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

// -------------------------------- ACTIONS_FUNCTIONS ------------------------------------------- //

function generateWand(player, swipeActions){
	return {
		name: "wandstart",
		text: function () {return "Prendre le baton magique"},
		img: function () {return "wand.png"},
		action: function() {
			player.setRole('mage')
			player.setIntel(
				player.getIntel() + 5
			);
		},
	}
}

function generateSword(player, swipeActions){
	return {
		name: "swordstart",
		text: function () {return "Prendre l'epée"},
		img: function () {return "epee.png"},
		action: function() {
			player.setRole('warrior')
			player.setStr(
				player.getStr() + 5
			);
			player.setMaxHp(
				player.getMaxHp() + 5
			);
			player.setHp(
				player.getHp() + 5, player
			);
		},
	}
}

function generateBow(player, swipeActions){
	return {
		name: "bowstart",
		text: function () {return "Prendre l'arc"},
		img: function () {return "arc.png"},
		action: function() {
			player.setRole('rogue')
			player.setAgility(
				player.getAgility() + 5
			);
		},
	}
}

// -------------------------------- MONSTERS ------------------------------------------------------------------------------------------ //
// -------------------------------- MONSTERS ------------------------------------------------------------------------------------------ //
// -------------------------------- MONSTERS ------------------------------------------------------------------------------------------ //


function generateAttack(player, swipeActions){
	return {
		name: "attack",
		damage: 3,
		text: function () {return player.stats.defaultAttack},
		img: function () {return player.stats.weaponImg},
		action: function() {
			switch(player.getRole()) {
			    case "mage":
			        player.setHp(
						player.getHp() - this.damage, player
					);
			        break;
			    case "warrior":
			        player.setHp(
						player.getHp() - this.damage, player
					);
			        break;
			    case "rogue":		        
			        if(Math.random() < 0.45){
						player.setHp(
							player.getHp() - this.damage * 2, player
						);
						feedbackMessage("Vous avez raté votre cible")
					}
					else{
						feedbackMessage("Touché!")
					}
			        break;
			    default:
        			player.setHp(
						player.getHp() - this.damage, player
					);
    		}
		},
	}
}

function generateGiveCoins(player, swipeActions){
  	return {
  		name: "givecoins",
  		coinsGiven: getRandomNumber(1, 6),
		text: function () {return "Donner " + this.coinsGiven + " pièces"},
		img: function () {return "giveCoins.png"},
		action: function () {
			if (player.getCoin() - this.coinsGiven < 0){
				feedbackMessage("J'ai vu que tu n'avais pas assez de pièces, j'aime pas les arnaqueur moi!");
				player.setCoin(0);
				player.setHp(
					player.getHp() - 10, player
				);
			}
			else if(this.coinsGiven == 1){
				feedbackMessage("Seulement une pièce ? Tu te fout de moi ?!");
				player.setCoin(
					player.getCoin() - this.coinsGiven
				);
				player.thisRoom.isLastRoom = false;		
				// Permet un noveau dialogue sur la même carte
				player.thisRoom.nextRoom = {
					desc: "Seulement une pièce ? Tu te fout de moi ?!",
					swipeLeft: {
						coinsGiven2: getRandomNumber(3, 8),
						text: function () {return "Donner " + this.coinsGiven2 + " pièces en plus"},
						img: function () {return "giveCoins.png"},
						action: function() {
							feedbackMessage("J'aime mieux ça!");
							player.setCoin(
								player.getCoin() - this.coinsGiven2
							);
						}
					},
					swipeRight: swipeActions.actionsGenerator.attack(player, swipeActions),
				}
			}
			else {
				player.setCoin(
					player.getCoin() - this.coinsGiven
				);
			}
		},
	}
}


function generateScream(player, swipeActions){
  	return {
  		name: "scream",
		require: 10,
		damage: 5,
		text: function () {return "Crier pour l'effrayer"},
		img: function () {return "scream.png"},
		action: function() {
			if (player.getStr() >= this.require) {
				feedbackMessage("L'ennemi a eu peur et s'est enfuis en courant")
			}
			else {
				feedbackMessage("Votre cris n'est pas assez fort, gagnez un peu plus de force!")
				player.setHp(
					player.getHp() - this.damage, player
				);
			}
		},
	}
}

function generateEscape(player, swipeActions){
  	return {
  		name: "escape",
		text: function () {return "S'echapper"},
		img: function () {return "escape.png"},
		require: 8,
		damage: 3,
		action: function() {
			if (player.getAgility() >= this.require) {
				if(Math.random() < 0.3 * 5 / player.getAgility()){
					feedbackMessage('Pas de chance, vous avez trébucher sur une pierre')
					player.setHp(
						player.getHp() - this.damage, player
					);					
				}
				else{
					feedbackMessage("Vous vous êtes enfuis avec succes")
				}				
			}
			else {
				feedbackMessage("Vous n'êtes pas assez rapide! Ouch!")
				player.setHp(
					player.getHp() - this.damage, player
				);
			}
		},
	}
}

function generateFeed(player, swipeActions){
  	return {
  		name: "feed",
		text: function () {return "Nourrir l'animal"},
		img: function () {return "feed.png"},
		action: function() {
			if(player.getAgility() <= 5){
				feedbackMessage("Maladroit comme vous l'êtes, vous êtes tombé sur l'animal en le nourissant, il vous a attaqué");
				player.setHp(
					player.getHp() - 5, player
				);
			}
			else if(player.getIntel() <= 5){
				feedbackMessage("Vous avez oublié de retirer votre main, l'animal l'a mangé, essayez d'être plus intelligent");
				player.setHp(
					player.getHp() - 5, player
				);
			}
			else {
				feedbackMessage('Il a tout mangé et ne vous a pas attaqué');
			}			
		},
	}
}

function generateSteal(player, swipeActions){
	var coinsStealed = getRandomNumber(3, 10);
  	return {
  		name: "steal",
		text: function () {return "Steal " + coinsStealed + " coins"},
		img: function () {return "steal.png"},
		damage: 5,
		action: function() {
			if(Math.random() < 0.4 * 10 / player.getAgility()){
				feedbackMessage('Vous avez été pris sur le fait')
				player.setHp(
					player.getHp() - this.damage, player
				);
			}
			else{
				feedbackMessage("Cool, " + coinsStealed + " pièces recuperées")
				player.setCoin(
					player.getCoin() + coinsStealed
				);
			}
		},
	}
}

// -----------

// -------------------------------- LOOT ------------------------------------------------------------------------------------------ //
// -------------------------------- LOOT ------------------------------------------------------------------------------------------ //
// -------------------------------- LOOT ------------------------------------------------------------------------------------------ //

function generateHpPotion(player, swipeActions){
  	return {
  		name: "hppotion",
		text: function () {return "Prendre la potion (+5 Hp)"},
		img: function () {return "hpPotion.png"},
		action: function() {
			player.setHp(
				player.getHp() + 5, player
			);
		},
	}
}

function generateMagicMushroom(player, swipeActions){
  	return {
  		name: "magicmushroom",
		text: function () {return "Prendre le champignon magique (+5 MaxHp"},
		img: function () {return "champignon.png"},
		action: function() {
			player.setMaxHp(
				player.getMaxHp() + 5
			);
			player.setHp(
				player.getHp() + 5, player
			);
		},
	}
}

function generateBagOfCoins(player, swipeActions){
	var coinsGained = getRandomNumber(3, 6);
  	return {
  		name: "bagofcoins",
		text: function () {return "Prendre le sac de pièces (" + coinsGained + " pièces)" },
		img: function () {return "coinsBag.png"},
		action: function() {
			player.setCoin(
				player.getCoin() + coinsGained
			);
		},
	}
}

function generateSpinach(player, swipeActions){
  	return {
  		name: "spinach",
		text: function () {return "Prendre les épinards (+2 Hp + 2 Force"},
		img: function () {return "spinach.png"},
		action: function() {
			player.setHp(
				player.getHp() + 2, player
			);
			player.setStr(
				player.getStr() + 2
			);
		},
	}
}

function generateMagicBook(player, swipeActions){
  	return {
  		name: "magicbook",
		text: function () {return "Prendre le livre sur la magie (+5 Intel)"},
		img: function () {return "magicBook.png"},
		action: function() {
			player.setIntel(
				player.getIntel() + 5
			);
		},
	}
}

function generateSpeedShoes(player, swipeActions){
  	return {
  		name: "speedshoes",
		text: function () {return "Prendre les chaussures (+3 Agilité)"},
		img: function () {return "speedShoes.png"},
		action: function() {
			player.setAgility(
				player.getAgility() + 3
			);
		},
	}
}

function generateDumbBell(player, swipeActions){
  	return {
  		name: "dumbbell",
		text: function () {return "Prendre l'altère et faire quelques répetitions (+5 Force)"},
		img: function () {return "DumbBell.png"},
		action: function() {
			if(player.getIntel() >= 5){
			player.setStr(
				player.getStr() + 5
			);
			}
			else{
				if(Math.random() < 0.7){
					feedbackMessage("Vous n'êtes pas assez intelligent pour porter l'altère, vous vous êtes blaissé")
					player.setHp(
						player.getHp() - 5, player
					);
				}
				else{
					player.setStr(
						player.getStr() + 5
					);
				}
			}
		},
	}
}



