import { getRandomNumber } from '../utils';
import { feedbackMessage } from '../game';

import feed_svg from '../img/actions/feed.svg';
import escape_svg from '../img/actions/escape.svg';
import givecoins_svg from '../img/actions/givecoins.svg';
import coinsbag_svg from '../img/loot/coinsbag.svg';
import scream_svg from '../img/actions/scream.svg';

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
			    case "Mage":
			        player.setHp(
						player.getHp() - this.damage, player
					);
			        break;
			    case "Guerrier":
			        player.setHp(
						player.getHp() - this.damage, player
					);
			        break;
			    case "Archer":		        
			        if(Math.random() < 0.45){
						player.setHp(
							player.getHp() - this.damage * 2, player
						);
						feedbackMessage(player, "Vous avez raté votre cible")
					}
					else{
						feedbackMessage(player, "Touché!")
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
  		coinsGiven: getRandomNumber(1, 3),
		text: function () {return "Donner " + this.coinsGiven + " pièces"},
		img: function () {return givecoins_svg},
		action: function () {
			if (player.getCoin() - this.coinsGiven < 0){
				feedbackMessage(player, "Tu n'as pas assez de pièces! J'aime pas les arnaqueurs moi!");
				player.setCoin(0);
				player.setHp(
					player.getHp() - 10, player
				);
			}
			else if(this.coinsGiven == 1){
				player.setCoin(
					player.getCoin() - this.coinsGiven
				);
				player.thisRoom.isLastRoom = false;		
				// Permet un noveau dialogue sur la même carte
				player.thisRoom.nextRoom = {
					desc: "Seulement une pièce ? Tu te fout de moi ?!",
					swipeLeft: {
						coinsGiven2: getRandomNumber(2, 5),
						text: function () {return "Donner " + this.coinsGiven2 + " pièces en plus"},
						img: function () {return givecoins_svg},
						action: function() {
							if (player.getCoin() - this.coinsGiven2 < 0){
								feedbackMessage(player, "Tu n'as pas assez de pièces! J'aime pas les arnaqueurs moi!");
								player.setCoin(0);
								player.setHp(
									player.getHp() - 10, player
								);
							}
							else{
								feedbackMessage(player, "J'aime mieux ça!");
								player.setCoin(
									player.getCoin() - this.coinsGiven2
								);	
							}
							
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
		text: function () {return "Crier"},
		img: function () {return scream_svg},
		action: function() {
			if (player.getStr() >= this.require) {
				feedbackMessage(player, "L'ennemi a eu peur et s'est enfuis")
			}
			else {
				feedbackMessage(player, "Votre cris n'est pas assez fort, gagnez un peu plus de force!")
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
		text: function () {return "S'échapper"},
		img: function () {return escape_svg},
		require: 8,
		damage: 4,
		action: function() {
			if (player.getAgility() >= this.require) {
				if(Math.random() < 0.3 * 5 / player.getAgility()){
					feedbackMessage(player, 'Pas de chance, vous avez trébuché sur une pierre')
					player.setHp(
						player.getHp() - this.damage, player
					);					
				}
				else{
					feedbackMessage(player, "Vous vous êtes enfuis avec succes")
				}				
			}
			else {
				feedbackMessage(player, "Vous n'êtes pas assez rapide! Ouch!")
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
		text: function () {return "Nourrir"},
		img: function () {return feed_svg},
		action: function() {
			if(player.getAgility() <= 5){
				feedbackMessage(player, "Maladroit comme vous l'êtes, vous êtes tombé sur l'animal en le nourissant, il vous a attaqué");
				player.setHp(
					player.getHp() - 5, player
				);
			}
			else if(player.getIntel() <= 5){
				feedbackMessage(player, "Vous avez oublié de retirer votre main, l'animal l'a mangé, essayez d'être plus intelligent");
				player.setHp(
					player.getHp() - 5, player
				);
			}
			else {
				feedbackMessage(player, "L'animal a tout mangé et ne vous a pas attaqué");
			}			
		},
	}
}

function generateSteal(player, swipeActions){
	var coinsStealed = getRandomNumber(3, 10);
  	return {
  		name: "steal",
		text: function () {return "Voler " + coinsStealed + " pièces"},
		img: function () {return coinsbag_svg},
		damage: 5,
		action: function() {
			if(Math.random() < 0.6 * 10 / player.getAgility()){
				feedbackMessage(player, 'Vous avez été pris sur le fait')
				player.setHp(
					player.getHp() - this.damage, player
				);
			}
			else{
				feedbackMessage(player, "Cool, " + coinsStealed + " pièces recuperées")
				player.setCoin(
					player.getCoin() + coinsStealed
				);
			}
		},
	}
}