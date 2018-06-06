import { getRandomNumber } from '../utils';
import { feedbackMessage } from '../game';
import { getRandomArray } from '../utils';

import eat_svg from '../img/actions/eat.svg';
import no_svg from '../img/actions/no.svg';

export default {
  generateNoEat,

  generateToxicMushroom,
  generateSleepMushroom,
  generateStupidMushroom,
  generateMagicMushroom,
  generateAgilityMushroom,
  generateYummyMushroom,
}

function generateNoEat(player, swipeActions){
  	return {
  		name: "no",
		text: function () {return "Ne pas manger"},
		img: function () {return no_svg},
		action: function() {
		},
	}
}

function generateToxicMushroom(player, swipeActions){
  	return {
  		name: "toxicMushroom",
		text: function () {if(player.special.mushroomKnowledge){return "Manger (-5 Pv)"} else{return "Manger"}},
		img: function () {return eat_svg},
		action: function() {
			feedbackMessage(player, "C'est un champignon toxique !");
			player.setHp(
				player.getHp() - 5, player
			);

		},
	}
}

function generateSleepMushroom(player, swipeActions){
  	return {
  		name: "sleepMushroom",
		text: function () {if(player.special.mushroomKnowledge){return "Manger (-2 Force, -2 Agilité)"} else{return "Manger"}},
		img: function () {return eat_svg},
		action: function() {
			feedbackMessage(player, "Ce champignon vous a amorti, endormi...");
			player.setStr(
				player.getStr() - 2, player
			);
			player.setAgility(
				player.getAgility() - 2, player
			);
		},
	}
}

function generateStupidMushroom(player, swipeActions){
  	return {
  		name: "stupidMushroom",
		text: function () {if(player.special.mushroomKnowledge){return "Manger (-2 Intel)"} else{return "Manger"}},
		img: function () {return eat_svg},
		action: function() {
			feedbackMessage(player, "Vous avez perdu quelques neurones.");
			player.setIntel(
				player.getIntel() - 3, player
			);
		},
	}
}


function generateMagicMushroom(player, swipeActions){
  	return {
  		name: "magicMushroom",
		text: function () {if(player.special.mushroomKnowledge){return "Manger (+3 MaxPv)"} else{return "Manger"}},
		img: function () {return eat_svg},
		action: function() {
			feedbackMessage(player, "Vous ne vous êtes jamais senti aussi vivant !");
			player.setMaxHp(
				player.getMaxHp() + 3
			);
			player.setHp(
				player.getHp() + 3, player
			);
		},
	}
}

function generateAgilityMushroom(player, swipeActions){
  	return {
  		name: "agilityMushroom",
		text: function () {if(player.special.mushroomKnowledge){return "Manger (+2 Agilité)"} else{return "Manger"}},
		img: function () {return eat_svg},
		action: function() {
			feedbackMessage(player, "Vous vous sentez plus vif.");
			player.setAgility(
				player.getAgility() + 2, player
			);
		},
	}
}

function generateYummyMushroom(player, swipeActions){
  	return {
  		name: "yummyMushroom",
		text: function () {if(player.special.mushroomKnowledge){return "Manger (+5 Pv)"} else{return "Manger"}},
		img: function () {return eat_svg},
		action: function() {
			feedbackMessage(player, "Mhhh... il est délicieux !");
			player.setHp(
				player.getHp() + 5, player
			);
		},
	}
}

