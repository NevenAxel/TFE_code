import { getRandomNumber } from './utils';
import { feedbackMessage } from './game';

function generateWand(player){
	return {
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

function generateSword(player){
	return {
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

function generateBow(player){
	return {
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


function generateAttack(player, damage){
	return {
		text: function () {return player.stats.defaultAttack},
		img: function () {return player.stats.weaponImg},
		action: function() {
			switch(player.getRole()) {
			    case "mage":
			        player.setHp(
						player.getHp() - damage, player
					);
			        break;
			    case "warrior":
			        player.setHp(
						player.getHp() - damage, player
					);
			        break;
			    case "rogue":		        
			        if(Math.random() < 0.45){
						player.setHp(
							player.getHp() - damage * 2, player
						);
						feedbackMessage("Vous avez raté votre cible")
					}
					else{
						feedbackMessage("Touché!")
					}
			        break;
			    default:
        			console.log("NO Role STATS")
    		}
		},
	}
}

function generateGivecoins(player){
var coinsGiven = getRandomNumber(1, 6);
  	return {
		text: function () {return "Donner " + coinsGiven + " pièces"},
		img: function () {return "giveCoins.png"},
		action: function() {
			if (player.getCoin() - coinsGiven < 0){
				feedbackMessage("N'ESSAYER PAS DE M'ARNAQUER J'AI VU QUE VOUS N'AVIEZ PAS ASSEZ!");
				player.setCoin(0);
				player.setHp(
					player.getHp() - 10, player
				);
			}
			else {
				player.setCoin(
					player.getCoin() - coinsGiven
				);
			}
		},
	}
}

function generateScream(player, damage, require){
  	return {
		text: function () {return "Crier pour l'effrayer"},
		img: function () {return "scream.png"},
		action: function() {
			if (player.getStr() >= require) {
				feedbackMessage("L'ennemi s'est chier dessus et est partit en courant")
			}
			else {
				feedbackMessage("Votre cris n'est pas assez fort, gagnez un peu plus de force!")
				player.setHp(
					player.getHp() - damage, player
				);
			}
		},
	}
}

function generateEscape(player, damage, require){
  	return {
		text: function () {return "S'echapper"},
		img: function () {return "escape.png"},
		action: function() {
			if (player.getAgility() >= require) {
				if(Math.random() < 0.3 * require / player.getAgility()){
					feedbackMessage('Pas de chance, vous avez trébucher sur une pierre')
					player.setHp(
						player.getHp() - damage, player
					);					
				}
				else{
					feedbackMessage("Vous vous êtes enfuis avec succes")
				}				
			}
			else {
				feedbackMessage("Vous n'êtes pas assez rapide! Ouch!")
				player.setHp(
					player.getHp() - damage, player
				);
			}
		},
	}
}

function generateFeed(player, damage, require){
  	return {
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

function generateSteal(player, damage, require){
	var coinsStealed = getRandomNumber(3, 10);
  	return {
		text: function () {return "Steal " + coinsStealed + " coins"},
		img: function () {return "steal.png"},
		action: function() {
			if(Math.random() < 0.4 * require / player.getAgility()){
				feedbackMessage('Vous avez été pris sur le fait')
				player.setHp(
					player.getHp() - damage, player
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

function generateHpPotion(player){
  	return {
		text: function () {return "Prendre la potion (+5 Hp)"},
		img: function () {return "hpPotion.png"},
		action: function() {
			player.setHp(
				player.getHp() + 5, player
			);
		},
	}
}

function generateMagicMushroom(player){
  	return {
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

function generateBagOfCoins(player){
	var coinsGained = getRandomNumber(3, 6);
  	return {
		text: function () {return "Prendre le sac de pièces (" + coinsGained + " pièces)" },
		img: function () {return "coinsBag.png"},
		action: function() {
			player.setCoin(
				player.getCoin() + coinsGained
			);
		},
	}
}

function generateSpinach(player){
  	return {
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

function generateMagicBook(player){
  	return {
		text: function () {return "Prendre le livre sur la magie (+5 Intel)"},
		img: function () {return "magicBook.png"},
		action: function() {
			player.setIntel(
				player.getIntel() + 5
			);
		},
	}
}

function generateSpeedShoes(player){
  	return {
		text: function () {return "Prendre les chaussures (+3 Agilité)"},
		img: function () {return "speedShoes.png"},
		action: function() {
			player.setAgility(
				player.getAgility() + 3
			);
		},
	}
}

function generateDumbBell(player){
  	return {
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

// -------------------------------- EXPORT DEFAULT -------------------------------------------------- //

export default {
  monsters: {
  	attack: generateAttack,
  	givecoins: generateGivecoins,
  	scream: generateScream,
  	feed: generateFeed,
  	escape: generateEscape,
  	steal: generateSteal,
  },
  loot: [
  	generateHpPotion,
  	generateBagOfCoins,
  	generateSpinach,
  	generateMagicBook,
  	generateSpeedShoes,
  	generateDumbBell,
  	generateMagicMushroom,
  ],
  starting: [
  	generateWand,
  	generateSword,
  	generateBow,
  ]
  /*
  feed: generateFeed(),
  pet: generatePet(),
  escape: generateEscape(),
  scream: generateScream(),
  givecoins: generateGivecoins(),*/
};