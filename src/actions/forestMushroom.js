import { getRandomNumber } from '../utils';
import { feedbackMessage } from '../game';

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
		img: function () {return "no.png"},
		action: function() {
		},
	}
}

function generateToxicMushroom(player, swipeActions){
  	return {
  		name: "toxicMushroom",
		text: function () {return "Manger"},
		img: function () {return "eat.png"},
		action: function() {
			feedbackMessage("C'est un champignon toxique!");
			player.setHp(
				player.getHp() - 5, player
			);

		},
	}
}

function generateSleepMushroom(player, swipeActions){
  	return {
  		name: "sleepMushroom",
		text: function () {return "Manger"},
		img: function () {return "eat.png"},
		action: function() {
			feedbackMessage("Ce champignon vous a amorti, endormi...");
			player.setHp(
				player.getStr() - 3, player
			);
		},
	}
}

function generateStupidMushroom(player, swipeActions){
  	return {
  		name: "stupidMushroom",
		text: function () {return "Manger"},
		img: function () {return "eat.png"},
		action: function() {
			feedbackMessage("Vous avez perdu quelques neurones");
			player.setHp(
				player.getIntel() - 3, player
			);
		},
	}
}


function generateMagicMushroom(player, swipeActions){
  	return {
  		name: "magicMushroom",
		text: function () {return "Manger"},
		img: function () {return "eat.png"},
		action: function() {
			feedbackMessage("Ce champignon vous a fait du bien");
			player.setMaxHp(
				player.getMaxHp() + 5
			);
			player.setHp(
				player.getHp() + 5, player
			);
		},
	}
}

function generateAgilityMushroom(player, swipeActions){
  	return {
  		name: "agilityMushroom",
		text: function () {return "Manger"},
		img: function () {return "eat.png"},
		action: function() {
			feedbackMessage("Vous vous sentez plus vif");
			player.setHp(
				player.getAgility() + 3, player
			);
		},
	}
}

function generateYummyMushroom(player, swipeActions){
  	return {
  		name: "yummyMushroom",
		text: function () {return "Manger"},
		img: function () {return "eat.png"},
		action: function() {
			feedbackMessage("Mhhh... il est délicieux!");
			player.setHp(
				player.getHp() + 8, player
			);
		},
	}
}

