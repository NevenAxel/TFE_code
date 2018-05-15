import { getRandomNumber } from '../utils';
import { getRandomArray } from '../utils';
import { getObjectByRarity } from '../utils';
import { feedbackMessage } from '../game';
import { createAvailableActions } from '../utils';
import { generateDifficultyMultiplier } from '../game';

import feed_svg from '../img/actions/feed.svg';
import escape_svg from '../img/actions/escape.svg';
import eat_svg from '../img/actions/eat.svg';
import depecer_svg from '../img/actions/depecer.svg';
import speak_svg from '../img/actions/speak.svg';
import kiss_svg from '../img/actions/kiss.svg';
import curse_svg from '../img/actions/curse.svg';
import benediction_svg from '../img/actions/benediction.svg';

import princess_svg from '../img/monsters/princess.svg';
import prince_svg from '../img/monsters/prince.svg';
import goblin_svg from '../img/monsters/goblin.svg';

export default {
  generateKillFrog,
  generateKillToad,
  generateFeedFrog,
  generateTalkFrog,
  generateKissFrog,
  generateKissToad, 
  generateEatFrog,
  generateEatToad,
  generateTalkToad,

  generateFrogBenediction,
  generateFrogCurse,
}

function generateKillFrog(player, swipeActions){
	return {
		name: "killfrog",
		coinsGiven: getRandomNumber(3, 6),
		text: function () {return "Dépecer"},
		img: function () {return depecer_svg},
		action: function() {
			player.special.frogHater += 1;
			player.special.frogFriend = -3;
			if(Math.random() < 0.5 * player.getAgility() / generateDifficultyMultiplier(player, 10, 1.2)){
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

function generateKillToad(player, swipeActions){
	return {
		name: "killtoad",
		coinsGiven: getRandomNumber(3, 6),
		text: function () {return "Dépecer"},
		img: function () {return depecer_svg},
		action: function() {
			player.special.frogHater += 1;
			player.special.frogFriend -= -1;
			if(Math.random() < 0.5 * player.getAgility() / generateDifficultyMultiplier(player, 10, 1.2)){
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
  		coinsGiven: getRandomNumber(3, 6),
		text: function () {return "Nourrir"},
		img: function () {return feed_svg},
		action: function () {
			player.special.frogFriend += 1;
			player.special.frogHater -= 0.5;
			if(Math.random() < 0.30){
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
		img: function () {return speak_svg},
		action: function() {
			player.thisRoom.isLastRoom = false;	
			player.thisRoom.nextRoom = {
				desc: "Vous entendez un bruit bizarre mais difficile de distinguer si c'est une voix",
				swipeRight: {
					text: function () {return "Se raprocher"},
					img: function () {return speak_svg},
					action: function() {
						player.special.frogFriend += 0.5;
						if(player.special.frogHater > 3){
							feedbackMessage(player, "Elle vous a sauté dans la bouche pour toutes les autres que vous avez dépecées et mangées avant!")
							player.setHp(
								player.getHp() - generateDifficultyMultiplier(player, 6, 1.1), player
							);
						}
						else if(player.special.frogFriend > 2){
							feedbackMessage(player, "Merci d'avoir nourrit mes amies, je t'offre ma bénédiction")
							player.setMaxHp(
								player.getMaxHp() + 2
							);
						}
						else{
							var message = getRandomArray([
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
		img: function () {return speak_svg},
		action: function() {
			player.thisRoom.isLastRoom = false;	
			player.thisRoom.nextRoom = {
				desc: "Vous entendez un bruit bizarre mais difficile de distinguer si c'est une voix",
				swipeRight: {
					text: function () {return "Se raprocher"},
					img: function () {return speak_svg},
					action: function() {
						feedbackMessage(player, "Le crapaud vous a sauté dessus, beurk!")
						player.setHp(
							player.getHp() - generateDifficultyMultiplier(player, 4, 1.1), player
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
		img: function () {return kiss_svg},
		action: function() {
			player.special.frogFriend += 1;
		
			var action = getObjectByRarity([
			    {name: 'princess', rarity: 1},
			    {name: 'prince', rarity: 1},
			    {name: 'gobelin', rarity: 3},
			],)
			switch(action.name) {
			    case "princess":
			        player.thisRoom.isLastRoom = false;	
					player.thisRoom.nextRoom = {
						desc: "Merci de m'avoir délivré de ma malédiction!",
						img: princess_svg,
						name: "Princesse grenouille",
						swipeRight: {
							text: function () {return "De rien!"},
							img: function () {return speak_svg},
							action: function() {
								player.thisRoom.isLastRoom = false;	
								player.thisRoom.nextRoom = {
									desc: "Je t'offre ces quelques pièces pour ton audace",
									swipeRight: {
										text: function () {return "Merci!"},
										img: function () {return speak_svg},
										coinsGiven: getRandomNumber(5, 10),
										action: function() {
											player.setCoin(
												player.getCoin() + this.coinsGiven
											);
											var message = "Vous recevez " + this.coinsGiven + " pièces !"
											feedbackMessage(player, message);
										},
									},
									swipeLeft: {
										text: function () {return "Quelle gentilesse!"},
										img: function () {return speak_svg},
										coinsGiven: getRandomNumber(7, 8),
										action: function() {
											player.setCoin(
												player.getCoin() + this.coinsGiven
											);
											var message = "Vous recevez " + this.coinsGiven + " pièces !"
											feedbackMessage(player, message);
										},
									}
								}
							},
						},
						swipeLeft: {
							text: function () {return "C'est normal!"},
							img: function () {return speak_svg},
							action: function() {
								player.thisRoom.isLastRoom = false;	
								player.thisRoom.nextRoom = {
									desc: "Je t'offre ces quelques pièces, continues de délivrer mes amies !",
									swipeRight: {
										text: function () {return "Merci!"},
										img: function () {return speak_svg},
										coinsGiven: getRandomNumber(5, 10),
										action: function() {
											player.setCoin(
												player.getCoin() + this.coinsGiven
											);
											var message = "Vous recevez " + this.coinsGiven + " pièces !"
											feedbackMessage(player, message);
										},
									},
									swipeLeft: {
										text: function () {return "J'en ambrasserai d'autres"},
										img: function () {return speak_svg},
										coinsGiven: getRandomNumber(7, 8),
										action: function() {
											player.setCoin(
												player.getCoin() + this.coinsGiven
											);
											var message = "Vous recevez " + this.coinsGiven + " pièces !"
											feedbackMessage(player, message);
										},
									}
								}
							},
						},
					}
			    break;
			    case "prince":
			        player.thisRoom.isLastRoom = false;	
					player.thisRoom.nextRoom = {
						desc: "Je ne sais comment vous remercier pour m'avoir délivré",
						img: prince_svg,
						name: "Un prince",
						swipeRight: {
							text: function () {return "Donne tes pièces!"},
							img: function () {return speak_svg},
							coinsGiven: getRandomNumber(13, 17),
							action: function() {
								if(player.stats.eloquence < generateDifficultyMultiplier(player, 5, 1.2) && Math.random() < 0.60){
									feedbackMessage(player, "Tu pourrai demander plus poliment, je ne te donnes qu'une pièce!");
									player.setCoin(
										player.getCoin() + 1
									);
								}
								else{
									feedbackMessage(player, "Il ne me reste que " + this.coinsGiven + " pièces, je te donnes ce que j'ai!");
									player.setCoin(
										player.getCoin() + this.coinsGiven
									);
								}
								
							},
						},
						swipeLeft: {
							text: function () {return "Je n'ai pas besoin de rien"},
							img: function () {return speak_svg},
							action: function() {
								player.thisRoom.isLastRoom = false;	
								player.thisRoom.nextRoom = {
									desc: "Vous êtes une bonne personne, prenez cette potion magique",
									swipeRight: {
										text: function () {return "Merci!"},
										img: function () {return speak_svg},
										action: function() {
											player.setAgility(
												player.getAgility() + getRandomNumber(1, 2)
											);
											player.setStr(
												player.getStr() + getRandomNumber(1, 2)
											);
											player.setIntel(
												player.getIntel() + getRandomNumber(1, 2)
											);
											player.setMaxHp(
												player.getMaxHp() + getRandomNumber(0, 2)
											);
											var message = "La potion a augmenté vos capacités !"
											feedbackMessage(player, message);
										},
									},
									swipeLeft: {
										text: function () {return "C'est gentil"},
										img: function () {return speak_svg},
										action: function() {
											player.setAgility(
												player.getAgility() + getRandomNumber(1, 2)
											);
											player.setStr(
												player.getStr() + getRandomNumber(1, 2)
											);
											player.setIntel(
												player.getIntel() + getRandomNumber(1, 2)
											);
											player.setMaxHp(
												player.getMaxHp() + getRandomNumber(0, 2)
											);
											var message = "La potion a augmenté vos capacités !"
											feedbackMessage(player, message);
										},
									}
								}
							},
						},
					}
			    break;

			    case "gobelin":
			        player.thisRoom.isLastRoom = false;	
					player.thisRoom.nextRoom = {
						desc: "La grenouille était en fait un gobelin ! Il veut vos pièces",
						img: goblin_svg,
						name: "Petit gobelin",
					    swipeLeft : swipeActions.actionsGenerator.giveCoins(player, swipeActions),
					    swipeRight : swipeActions.actionsGenerator.attack(player, swipeActions),
					}
			    break;
			    default:
			    	player.thisRoom.isLastRoom = false;	
			   	break;
			}
		},
	}
}

function generateKissToad(player, swipeActions){
  	return {
  		name: "kissToad",
		text: function () {return "L'embrasser"},
		img: function () {return kiss_svg},
		action: function() {
			feedbackMessage(player, "Beurk, vous avez attraper de l'herpès en embrassant ce crapaud!");
			player.setHp(
				player.getHp() - generateDifficultyMultiplier(player, 4, 1.1), player
			);
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
			player.special.frogFriend = -2;
			/* Ajouter le choix de la cuisiner avec du feu en mage! */
			if(player.getIntel() < generateDifficultyMultiplier(player, 6, 1.2)){
				feedbackMessage(player, "Vous vous êtes fait mal en mangeant les os de grenouille, soyez plus malin!");
				player.setHp(
					player.getHp() - generateDifficultyMultiplier(player, 4, 1.1), player
				);
			}
			else {
				if(Math.random() < 0.30){
					feedbackMessage(player, "Vous avez mal au ventre...");
					player.setHp(
						player.getHp() - generateDifficultyMultiplier(player, 2, 1.1), player
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
function generateEatToad(player, swipeActions){
	return {
  		name: "eatFrog",
		text: function () {return "Manger"},
		img: function () {return eat_svg},
		action: function() {
			player.special.frogHater += 1;
			player.special.frogFriend -= 1;
			feedbackMessage(player, "Manger un crapaud ? Mais quelle idée!");
			player.setHp(
				player.getHp() - generateDifficultyMultiplier(player, 5, 1.1), player
			);
		},
	}
}
function generateFrogBenediction(player, swipeActions){
  	return {
  		name: "frogBenediction",
		text: function () {return "+ 10 Hp"},
		img: function () {return benediction_svg},
		action: function() {
			player.special.frogKingNotPresent = false
			player.setMaxHp(
				player.getMaxHp() + 10
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
		text: function () {return "- 10 Hp, - 5 agilité"},
		img: function () {return curse_svg},
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