import { getRandomNumber } from '../utils';
import { feedbackMessage } from '../game';

import sword_svg from '../img/actions/sword.svg';

export default {
  generateWand,
  generateSword,
  generateBow,
}

function generateWand(player, swipeActions){
	return {
		name: "wandstart",
		text: function () {return "Prendre le baton"},
		img: function () {return "wand.png"},
		action: function() {
			player.setRole('mage')
			player.setIntel(
				player.getIntel() + 5
			);
		},
	}
}

function generateSword(player, swipeActions){
	return {
		name: "swordstart",
		text: function () {return "Prendre l'épée"},
		img: function () {return sword_svg},
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

function generateBow(player, swipeActions){
	return {
		name: "bowstart",
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