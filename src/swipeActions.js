import { getRandomNumber } from './utils';
import { feedbackMessage } from './game';

// -------------------------------- EXPORT DEFAULT -------------------------------------------------- //

export default {
  monsters: {
  	general: function getActionGeneral(player){
		var actions = [];
		actions.push(generateEscape(player, 100));
		return actions
	},
	animals: function getActionAnimals(player){
		var actions = [];
		actions.push(generateScream(player, 100));
		actions.push(generateFeed(player, 100));
		//actions.push(generatePet(player, 100));
		return actions
	},
	humanoid: function getActionHumanoid(player){
		var actions = [];
		actions.push(generateSteal(player, 100));
		return actions
	},
	unique: {
		attack: generateAttack,
		givecoins: generateGiveCoins,
	},
  },
  loot: {
  	chest: function getActionChest(player){
		var actions = [];
		actions.push(generateHpPotion(player, 100));
		actions.push(generateBagOfCoins(player, 100));
		actions.push(generateSpinach(player, 50));
		actions.push(generateMagicBook(player, 50));
		actions.push(generateSpeedShoes(player, 50));
		actions.push(generateDumbBell(player, 50));
		actions.push(generateMagicMushroom(player, 30));
		return actions
	},
  },
  special: {
  	starting: function getActionStarting(player){
		var actions = [];
		actions.push(generateWand(player, 100));
		actions.push(generateSword(player, 100));
		actions.push(generateBow(player, 100));
		return actions
	},
  },
};

// -------------------------------- ACTIONS_FUNCTIONS ------------------------------------------- //

function generateWand(player, rarity){
	return {
		name: "wandstart",
		rarity: rarity,
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

function generateSword(player, rarity){
	return {
		name: "swordstart",
		rarity: rarity,
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

function generateBow(player, rarity){
	return {
		name: "bowstart",
		rarity: rarity,
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


function generateAttack(player, rarity){
	return {
		name: "attack",
		rarity: rarity,
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

function generateGiveCoins(player, rarity){
  	return {
  		name: "givecoins",
  		rarity: rarity,
  		coinsGiven: getRandomNumber(1, 6),
		text: function () {return "Donner " + this.coinsGiven + " pièces"},
		img: function () {return "giveCoins.png"},
		action: function() {
			if (player.getCoin() - this.coinsGiven < 0){
				feedbackMessage("N'ESSAYER PAS DE M'ARNAQUER J'AI VU QUE VOUS N'AVIEZ PAS ASSEZ!");
				player.setCoin(0);
				player.setHp(
					player.getHp() - 10, player
				);
			}
			else if(this.coinsGiven == 1){
				feedbackMessage("Seulement une pièce ? Tu te fout de moi ?!");
				// nouveau dialogue, avec comme réponses "heuu non" ou "tien prend ces pièces en plus"
				player.setHp(
					player.getHp() - 5, player
				);
			}
			else {
				player.setCoin(
					player.getCoin() - this.coinsGiven
				);
			}
		},
	}
}

function generateScream(player, rarity){
  	return {
  		name: "scream",
		rarity: rarity,
		require: 10,
		damage: 5,
		text: function () {return "Crier pour l'effrayer"},
		img: function () {return "scream.png"},
		action: function() {
			if (player.getStr() >= this.require) {
				feedbackMessage("L'ennemi s'est chier dessus et est partit en courant")
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

function generateEscape(player, rarity){
  	return {
  		name: "escape",
		rarity: rarity,
		text: function () {return "S'echapper"},
		img: function () {return "escape.png"},
		action: function() {
			if (player.getAgility() >= 5) {
				if(Math.random() < 0.3 * 5 / player.getAgility()){
					feedbackMessage('Pas de chance, vous avez trébucher sur une pierre')
					player.setHp(
						player.getHp() - 3, player
					);					
				}
				else{
					feedbackMessage("Vous vous êtes enfuis avec succes")
				}				
			}
			else {
				feedbackMessage("Vous n'êtes pas assez rapide! Ouch!")
				player.setHp(
					player.getHp() - 3, player
				);
			}
		},
	}
}

function generateFeed(player, rarity){
  	return {
  		name: "feed",
		rarity: rarity,
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

function generateSteal(player, rarity){
	var coinsStealed = getRandomNumber(3, 10);
  	return {
  		name: "steal",
		rarity: rarity,
		text: function () {return "Steal " + coinsStealed + " coins"},
		img: function () {return "steal.png"},
		action: function() {
			if(Math.random() < 0.4 * 10 / player.getAgility()){
				feedbackMessage('Vous avez été pris sur le fait')
				player.setHp(
					player.getHp() - 3, player
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

function generateHpPotion(player, rarity){
  	return {
  		name: "hppotion",
		rarity: rarity,
		text: function () {return "Prendre la potion (+5 Hp)"},
		img: function () {return "hpPotion.png"},
		action: function() {
			player.setHp(
				player.getHp() + 5, player
			);
		},
	}
}

function generateMagicMushroom(player, rarity){
  	return {
  		name: "magicmushroom",
		rarity: rarity,
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

function generateBagOfCoins(player, rarity){
	var coinsGained = getRandomNumber(3, 6);
  	return {
  		name: "bagofcoins",
		rarity: rarity,
		text: function () {return "Prendre le sac de pièces (" + coinsGained + " pièces)" },
		img: function () {return "coinsBag.png"},
		action: function() {
			player.setCoin(
				player.getCoin() + coinsGained
			);
		},
	}
}

function generateSpinach(player, rarity){
  	return {
  		name: "spinach",
		rarity: rarity,
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

function generateMagicBook(player, rarity){
  	return {
  		name: "magicbook",
		rarity: rarity,
		text: function () {return "Prendre le livre sur la magie (+5 Intel)"},
		img: function () {return "magicBook.png"},
		action: function() {
			player.setIntel(
				player.getIntel() + 5
			);
		},
	}
}

function generateSpeedShoes(player, rarity){
  	return {
  		name: "speedshoes",
		rarity: rarity,
		text: function () {return "Prendre les chaussures (+3 Agilité)"},
		img: function () {return "speedShoes.png"},
		action: function() {
			player.setAgility(
				player.getAgility() + 3
			);
		},
	}
}

function generateDumbBell(player, rarity){
  	return {
  		name: "dumbbell",
		rarity: rarity,
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



