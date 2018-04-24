import { getRandomNumber } from '../utils';
import { getRandomArray } from '../utils';
import { feedbackMessage } from '../game';

import feed_svg from '../img/actions/feed.svg';
import escape_svg from '../img/actions/escape.svg';

export default {
  generateKillFrog,
  generateFeedFrog,
  generateTalkFrog,
  generateKissFrog,  
  generateEatFrog,
}

function generateKillFrog(player, swipeActions){
	return {
		name: "killfrog",
		coinsGiven: getRandomNumber(3, 8),
		text: function () {return "Dépecer"},
		img: function () {return "knife"},
		action: function() {
			if(Math.random() < 0.3 * 10 / player.getAgility()){
			player.special.frogHater += 1;
			player.special.frogFriend = 0;
				if(Math.random() < 0.5){
					player.setCoin(
						player.getCoin() + this.coinsGiven
					);
					var message = "Vous avez trouvé " + this.coinsGiven + " pièces dans son estomac"
					feedbackMessage(player, message);
				}
				else{
					feedbackMessage(player, "Cet exercice méticuleux a augmenté votre dextérité");
					player.setAgility(
						player.getAgility() + 1
					);
				}
				
			}
			else{
				feedbackMessage(player, "Ça ne vous a rien apporter à part la souffrance d'un animal...");
			}
			
		},
	}
}

function generateFeedFrog(player, swipeActions){
  	return {
  		name: "feedfrog",
  		coinsGiven: getRandomNumber(3, 8),
		text: function () {return "Nourrir"},
		img: function () {return feed_svg},
		action: function () {
			player.special.frogFriend += 1;
			if(Math.random() < 0.20){
					player.setCoin(
						player.getCoin() + this.coinsGiven
					);
					var message = this.coinsGiven + " pièces sont tombées quand l'amphibien a ouvert la bouche pour manger"
					feedbackMessage(player, message);
			}
		}
	}
}


function generateTalkFrog(player, swipeActions){
  	return {
  		name: "talkFrog",
		text: function () {return "Lui parler"},
		img: function () {return "scream_svg"},
		action: function() {
			player.thisRoom.isLastRoom = false;	
			player.thisRoom.nextRoom = {
				desc: "Vous entendez un bruit bizarre mais difficile de distinguer si c'est une voix",
				swipeLeft: {
					text: function () {return "Se raprocher"},
					img: function () {return "givecoins_svg"},
					action: function() {
						if(img == frogregular_svg){
							if(player.special.frogFriend > 3){
								feedbackMessage(player, "Merci d'avoir nourrit mes amies, je t'offre ma bénédiction")
								player.setMaxHp(
									player.getMaxHp() + 2
								);
								player.setHp(
									player.getHp() + 2, player
								);
							}
							var message = getRandomArray([
									"Croâ Croâ, t'es moche",
									"Croâ Croâ, si tu m'avais embrassé, je me serai transformé",
									"Croâ Croâ, tu sens mauvais",
									"Croâ Croâ, je veux un bisou magique",
								])
							feedbackMessage(player, message)
						}
						else{
							feedbackMessage(player, "Le crapaud vous a sauté dans la bouche, beurk!")
							player.setHp(
								player.getHp() - 4, player
							);
						}
					},
				},
				swipeRight: {
					text: function () {return "Partir"},
					img: function () {return escape_svg},
					action: function() {},
				}
			}
		},
	}
}

function generateKissFrog(player, swipeActions){
  	return {
  		name: "escape",
		text: function () {return "S'échapper"},
		img: function () {return escape_svg},
		require: 8,
		damage: 3,
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

function generateEatFrog(player, swipeActions){
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