import { getRandomNumber } from '../utils';
import { getRandomArray } from '../utils';
import { feedbackMessage } from '../game';

import feed_svg from '../img/actions/feed.svg';
import escape_svg from '../img/actions/escape.svg';
import eat_svg from '../img/actions/eat.svg';

export default {
  generateKillFrog,
  generateFeedFrog,
  generateTalkFrog,
  generateKissFrog,  
  generateEatFrog,
  generateTalkToad,

  generateFrogBenediction,
  generateFrogCurse,
}

function generateKillFrog(player, swipeActions){
	return {
		name: "killfrog",
		coinsGiven: getRandomNumber(3, 8),
		text: function () {return "Dépecer"},
		img: function () {return "knife_svg"},
		action: function() {
			player.special.frogHater += 1;
			if(Math.random() < 0.3 * 10 / player.getAgility()){
			player.special.frogFriend = -3;
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
		img: function () {return "speak_svg"},
		action: function() {
			player.thisRoom.isLastRoom = false;	
			player.thisRoom.nextRoom = {
				desc: "Vous entendez un bruit bizarre mais difficile de distinguer si c'est une voix",
				swipeRight: {
					text: function () {return "Se raprocher"},
					img: function () {return "givecoins_svg"},
					action: function() {
						if(player.special.frogFriend > 2){
							player.special.frogFriend += 1;
							feedbackMessage(player, "Merci d'avoir nourrit mes amies, je t'offre ma bénédiction")
							player.setMaxHp(
								player.getMaxHp() + 4
							);
						}
						else if(player.special.frogHater > 2){
							feedbackMessage(player, "Elle vous a sauté dans la bouche pour toutes les autres que vous avez dépecées et mangées avant!")
							player.setHp(
								player.getHp() - 7, player
							);
						}
						else{
							player.special.frogFriend += 1;
							var message = getRandomArray([
								"Croâ Croâ, t'es moche",
								"Croâ Croâ, si tu m'avais embrassé, je me serai transformé",
								"Croâ Croâ, tu sens mauvais",
								"Croâ Croâ, je veux un bisou magique",
							])
							feedbackMessage(player, message)
						}							
					},
				},
				swipeLeft: {
					text: function () {return "Partir"},
					img: function () {return escape_svg},
					action: function() {},
				}
			}
		},
	}
}

function generateTalkToad(player, swipeActions){
  	return {
  		name: "talkToad",
		text: function () {return "Lui parler"},
		img: function () {return "speak_svg"},
		action: function() {
			player.thisRoom.isLastRoom = false;	
			player.thisRoom.nextRoom = {
				desc: "Vous entendez un bruit bizarre mais difficile de distinguer si c'est une voix",
				swipeRight: {
					text: function () {return "Se raprocher"},
					img: function () {return "givecoins_svg"},
					action: function() {
						feedbackMessage(player, "Le crapaud vous a sauté dessus, beurk!")
						player.setHp(
							player.getHp() - 4, player
						);						
					},
				},
				swipeLeft: {
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
  		name: "kissFrog",
		text: function () {return "L'embrasser"},
		img: function () {return "kiss_svg"},
		action: function() {
			
		},
	}
}

function generateEatFrog(player, swipeActions){
  	return {
  		name: "eatFrog",
		text: function () {return "Manger"},
		img: function () {return eat_svg},
		action: function() {
			player.special.frogHater += 1;
			player.special.frogFriend = -3;
			/* Ajouter le choix de la cuisiner avec du feu en mage! */
			if(player.getIntel() <= 10){
				feedbackMessage(player, "Vous vous êtes fait mal en mangeant les os, soyez plus malin!");
				player.setHp(
					player.getHp() - 5, player
				);
			}
			else {
				if(Math.random() < 0.40){
					feedbackMessage(player, "Vous avez mal au ventre...");
					player.setHp(
						player.getHp() - 2, player
					);	
				}
				else{
					feedbackMessage(player, "C'est un délice!");
					player.setHp(
						player.getHp() + 3, player
					);	
				}
				
			}	
		},
	}
}
function generateFrogBenediction(player, swipeActions){
  	return {
  		name: "frogBenediction",
		text: function () {return "+ 10 pv"},
		img: function () {return "benediction_svg"},
		action: function() {
			player.special.frogKingNotPresent = false
			player.setMaxHp(
				player.getMaxHp() +10
			);
			player.setHp(
				player.getHp() + 10, player
			);		
		},
	}
}
function generateFrogCurse(player, swipeActions){
  	return {
  		name: "frogCurse",
		text: function () {return "- 10 pv, - 5 agilité"},
		img: function () {return "curse_svg"},
		action: function() {
			player.special.frogKingNotPresent = false
			player.setHp(
				player.getHp() - 10, player
			);	
			player.setMaxHp(
				player.getMaxHp() -10
			);
			player.setAgility(
				player.getAgility() -5
			);
		},
	}
}