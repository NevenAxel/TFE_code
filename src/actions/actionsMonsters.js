import { getRandomNumber } from '../utils';
import { getObjectByRarity } from '../utils';
import { feedbackMessage } from '../game';
import { generateDifficultyMultiplier } from '../game';

import feed_svg from '../img/actions/feed.svg';
import escape_svg from '../img/actions/escape.svg';
import givecoins_svg from '../img/actions/givecoins.svg';
import coinsbag_svg from '../img/loot/coinsbag.svg';
import scream_svg from '../img/actions/scream.svg';
import meditate_svg from '../img/actions/meditate.svg';
import cook_svg from '../img/actions/cook.svg';

export default {
  generateAttack,
  generateGiveCoins,
  generateScream,
  generateEscape,  
  generateFeed,
  generateSteal,
  generateMeditate,
  generateCook,
}

function generateAttack(player, swipeActions){
	return {
		name: "attack",
		damage: generateDifficultyMultiplier(player, 3, 1.1),
		text: function () {return player.stats.defaultAttack},
		img: function () {return player.stats.weaponImg},
		action: function() {
			switch(player.getRole()) {
			    case "Mage":
			    	if(player.special.powerStone){
			    		var availableActions = [
			    		{name: 'polymorph', rarity: 0},
			    		{name: 'protection', rarity: 4},
			    		{name: 'destruction', rarity: 1},
			    		{name: 'bonus', rarity: 1},
				    	]
				    	var theAction = getObjectByRarity(availableActions).name
				    	switch(theAction) {
				    		case "protection":
					    		player.setHp(
									player.getHp() - (this.damage - 2), player
								);
								feedbackMessage(player, "Vous avez pris moins de dégât grâce à votre sort de protection")
							break;
							case "destruction":
								feedbackMessage(player, "Votre sort de destruction a marché à merveille, il ne reste que des cendres")
							break;
							case "bonus":
								player.setHp(
									player.getHp() + Math.round(this.damage / 3), player
								);
								feedbackMessage(player, "Vous avez détruis l'ennemi et absorbé son energie")
							break;
				    	}
			    	}
			    	else{
			    		var availableActions = [
			    		{name: 'polymorph', rarity: 0},
			    		{name: 'explode', rarity: 2},
			    		{name: 'reparo', rarity: 1},
			    		{name: 'leviosa', rarity: 1},
				    	]
				    	var theAction = getObjectByRarity(availableActions).name
				    	switch(theAction) {
				    		case "explode":
					    		player.setHp(
									player.getHp() - Math.round(this.damage * 1.5), player
								);
								feedbackMessage(player, "Votre baguette a explosé, elle est surêment défectueuse")
							break;
							case "reparo":
								player.setHp(
									player.getHp() - this.damage, player
								);
								feedbackMessage(player, "*Occulus Reparo* :Vos lunettes sont réparées, mais vous vous êtes quand même fait attaqué")
							break;
							case "leviosa":
								player.setHp(
									player.getHp() - this.damage, player
								);
								feedbackMessage(player, "*Wingardium Leviosa* : Non! c'est LEV-I-OSA et ça n'a eu aucun effet")
							break;
				    	}
			    	}
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
  		coinsGiven: getRandomNumber(1, 4),
		text: function () {return "Donner " + this.coinsGiven + " pièces"},
		img: function () {return givecoins_svg},
		action: function () {
			if (player.getCoin() - this.coinsGiven < 0){
				feedbackMessage(player, "Tu n'as pas assez de pièces! J'aime pas les arnaqueurs moi!");
				player.setCoin(0);
				player.setHp(
					player.getHp() - generateDifficultyMultiplier(player, 10, 1.1), player
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
									player.getHp() - generateDifficultyMultiplier(player, 10, 1.1), player
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
		require: generateDifficultyMultiplier(player, 10, 1.2),
		damage: generateDifficultyMultiplier(player, 5, 1.1),
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
		require: generateDifficultyMultiplier(player, 10, 1.2),
		damage: generateDifficultyMultiplier(player, 5, 1.1),
		action: function() {
			if (player.getAgility() >= this.require) {
				if(Math.random() < 0.3 * 10 / player.getAgility()){
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
		damage: generateDifficultyMultiplier(player, 5, 1.1),
		require: generateDifficultyMultiplier(player, 5, 1.2),
		action: function() {
			if(player.getAgility() <= this.require){
				feedbackMessage(player, "Maladroit comme vous l'êtes, vous êtes tombé sur l'animal en le nourissant, il vous a attaqué");
				player.setHp(
					player.getHp() - this.damage, player
				);
			}
			else if(player.getIntel() <= this.require){
				feedbackMessage(player, "Vous avez oublié de retirer votre main, l'animal l'a mangé, essayez d'être plus intelligent");
				player.setHp(
					player.getHp() - this.damage, player
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
		damage: generateDifficultyMultiplier(player, 6, 1.1),
		require: generateDifficultyMultiplier(player, 10, 1.2),
		action: function() {
			if(Math.random() < 0.6 * this.require / player.getAgility()){
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

function generateMeditate(player, swipeActions){
  	return {
  		name: "meditate",
		text: function () {return "Méditer"},
		img: function () {return meditate_svg},
		damage: generateDifficultyMultiplier(player, 5, 1.1),
		require: generateDifficultyMultiplier(player, 5, 1.25),
		action: function() {
			if(Math.random() > 0.25 * player.getIntel() / this.require){
				feedbackMessage(player, 'Vous vous êtes fais attaqué pendant votre méditation, vous avez malgré tout gagné +2 Intel')
				player.setHp(
					player.getHp() - this.damage, player
				);
				player.setIntel(
					player.getIntel() + 2
				);
			}
			else{
				feedbackMessage(player, "Votre force mentale a su détruire l'ennemi")
			}
		},
	}
}
function generateCook(player, swipeActions){
  	return {
  		name: "cook",
		text: function () {return "brûler, cuir, manger"},
		img: function () {return cook_svg},
		damage: generateDifficultyMultiplier(player, 5, 1.1),
		require: generateDifficultyMultiplier(player, 6, 1.2),
		action: function() {
			if(Math.random() > 0.25 * player.getIntel() / this.require){
				feedbackMessage(player, "Vous avez raté votre sort de cuisson, vous avez besoin de plus d'intelligence")
				player.setHp(
					player.getHp() - this.damage, player
				);
			}
			else{
				feedbackMessage(player, "C'était bien bon!")
				player.setHp(
					player.getHp() + 5, player
				);
			}
		},
	}
}