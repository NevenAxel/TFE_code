import { getRandomNumber } from '../utils';
import { feedbackMessage } from '../game';
import { generateDifficultyMultiplier } from '../game';
import { getRandomArray } from '../utils';

import potionhp_svg from '../img/loot/potionhp.svg';
import coinsbag_svg from '../img/loot/coinsbag.svg';
import dumbbell_svg from '../img/loot/dumbbell.svg';
import magicbook_svg from '../img/loot/magicbook.svg';

export default {
  generateHpPotion,
  generateBagOfCoins,
  generateMagicBook,
  generateDumbBell,
}

function generateHpPotion(player, swipeActions){
  	return {
  		name: "hppotion",
		text: function () {return "Potion de vie (+5 Pv)"},
		img: function () {return potionhp_svg},
		action: function() {
			player.setHp(
				player.getHp() + 5, player
			);
		},
	}
}

function generateBagOfCoins(player, swipeActions){
	var coinsGained = getRandomNumber(3, 10);
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

function generateMagicBook(player, swipeActions){
  	return {
  		name: "magicbook",
		text: function () {return "Livre sur la magie (+3 Intel)"},
		img: function () {return magicbook_svg},
		action: function() {
			player.setIntel(
				player.getIntel() + 3
			);
		},
	}
}

function generateDumbBell(player, swipeActions){
  	return {
  		name: "dumbbell",
		text: function () {return "Haltères (+5 Force)"},
		img: function () {return dumbbell_svg},
		action: function() {
			if(player.getIntel() >= generateDifficultyMultiplier(player, 6, 1.2)){
			player.setStr(
				player.getStr() + 5
			);
			}
			else{
				if(Math.random() < 0.7){
					feedbackMessage(player, "Vous n'êtes pas assez intelligent pour porter l'haltère, vous vous êtes blessé.")
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