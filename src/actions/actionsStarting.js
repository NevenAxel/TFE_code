import { getRandomNumber } from '../utils';
import { feedbackMessage } from '../game';

import sword_svg from '../img/actions/sword.svg';
import bow_svg from '../img/actions/bow.svg';
import wand_svg from '../img/actions/wand.svg';

export default {
  generateWand,
  generateSword,
  generateBow,
}

function generateWand(player, swipeActions){
	return {
		name: "wandstart",
		text: function () {return "Prendre le baton"},
		img: function () {return wand_svg},
		action: function() {
			player.thisRoom.isTuto = false;
			player.setRole('Mage')
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
			player.thisRoom.isTuto = false;
			player.setRole('Guerrier')
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
		img: function () {return bow_svg},
		action: function() {
			player.thisRoom.isTuto = false;
			player.setRole('Archer')
			player.setAgility(
				player.getAgility() + 5
			);
		},
	}
}