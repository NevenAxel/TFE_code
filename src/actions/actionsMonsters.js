import { getRandomNumber } from '../utils';
import { feedbackMessage } from '../game';

import sword_svg from '../img/actions/sword.svg';

export default {
  generateAttack,
  generateGiveCoins,
  generateScream,
  generateEscape,  
  generateFeed,
  generateSteal,
}

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