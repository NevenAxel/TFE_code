import { getRandomNumber } from '../utils';
import { feedbackMessage } from '../game';

import potionhp_svg from '../img/loot/potionhp.svg';
import coinsbag_svg from '../img/loot/coinsbag.svg';

export default {
  generateHpPotion,
  generateBagOfCoins,
  generateSpinach,  
  generateMagicBook,
  generateSpeedShoes,
  generateDumbBell,
}

function generateHpPotion(player, swipeActions){
  	return {
  		name: "hppotion",
		text: function () {return "Potion de vie (+5 Hp)"},
		img: function () {return potionhp_svg},
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
		text: function () {return "Champignon magique (+5 MaxHp"},
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
		text: function () {return "Sac de pièces (" + coinsGained + " pièces)" },
		img: function () {return coinsbag_svg},
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
		text: function () {return "Épinards (+2 Hp, +2 Force"},
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
		text: function () {return "Livre sur la magie (+5 Intel)"},
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
		text: function () {return "Chaussures (+3 Agilité)"},
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
		text: function () {return "Haltères (+5 Force)"},
		img: function () {return "DumbBell.png"},
		action: function() {
			if(player.getIntel() >= 5){
			player.setStr(
				player.getStr() + 5
			);
			}
			else{
				if(Math.random() < 0.7){
					feedbackMessage(player, "Vous n'êtes pas assez intelligent pour porter l'haltère, vous vous êtes blaissé")
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