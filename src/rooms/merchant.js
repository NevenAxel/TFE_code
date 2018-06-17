import { createAvailableActions } from '../utils';
import { feedbackMessage } from '../game';
import { generateTwoActionsNoDupe } from '../utils';
import { getRandomNumber } from '../utils';
import { getObjectByRarity } from '../utils';
import { shuffle } from '../utils';
import { getRandomArray } from '../utils';

import merchant_svg from '../img/monsters/merchant.svg';

import m_hppotion_svg from '../img/merchantObjets/m-hppotion.svg';
import m_vigorpotion_svg from '../img/merchantObjets/m-vigorpotion.svg';
import m_strpotion_svg from '../img/merchantObjets/m-strpotion.svg';
import m_intelpotion_svg from '../img/merchantObjets/m-intelpotion.svg';

import m_intelbook_svg from '../img/merchantObjets/m-intelbook.svg';
import m_eloquencebook_svg from '../img/merchantObjets/m-eloquencebook.svg';
import m_mushroombook_svg from '../img/merchantObjets/m-mushroombook.svg';
import m_equalityscroll_svg from '../img/merchantObjets/m-equalityscroll.svg';
import m_powerstone_svg from '../img/merchantObjets/m-powerstone.svg';

import merchantbg_svg from '../img/bg/bg-merchant.svg';

import no_svg from '../img/actions/no.svg';
import coinsbag_svg from '../img/loot/coinsbag.svg';
import givecoins_svg from '../img/actions/givecoins.svg';

export default{
  merchantGenerator,
}

var objectsList = [
  {name: 'm_hpPotion', rarity: 11},

  {name: 'm_vigorPotion', rarity: 4},
  {name: 'm_intelPotion', rarity: 4},
  {name: 'm_strPotion', rarity: 4},

  {name: 'm_eloquenceBook', rarity: 1},
  {name: 'm_intelBook', rarity: 2},
  {name: 'm_powerStone', rarity: 11},
  {name: 'm_mushroomBook', rarity: 2},
  {name: 'm_equalityScroll', rarity: 1},
]

var objectsGenerator = {
  m_hpPotion: m_hpPotionGenerator,

  m_vigorPotion: m_vigorPotionGenerator,
  m_strPotion: m_strPotionGenerator,
  m_intelPotion: m_intelPotionGenerator,

  m_eloquenceBook: m_eloquenceBookGenerator,
  m_intelBook: m_intelBookGenerator,
  m_mushroomBook: m_mushroomBookGenerator,
  m_powerStone: m_powerStoneGenerator,
  m_equalityScroll: m_equalityScrollGenerator,
}

var currentShopList = []
var currentItem = 0;

function merchantGenerator(player, swipeActions) {
  var name = "Dealer de potions";
  var desc = getRandomArray([
    "Vous cherchez quelque chose ?",
    "J'ai tout ce qui vous intéresse !",
    "Vous voulez... des potions ?",
    "C'est de la bonne, venez voir !",
    ]);
  var img =  merchant_svg;

  var swipeLeft = generateNoShop(player, swipeActions);
  var swipeRight = generateYesShop(player, swipeActions);
  swipeRight.text = function () {return "Voir les objets"}
  swipeRight.img = function () {return coinsbag_svg},
  swipeRight.action = function () {    
    generateShopList(player)
    player.thisRoom.background = merchantbg_svg;
    if(currentItem < currentShopList.length){
      player.thisRoom.isLastRoom = false; 
      player.thisRoom.nextRoom = objectsGenerator[currentShopList[0].name](player, swipeActions);
      currentItem += 1;
    }
  }
  swipeLeft.text = function () {return "Ne rien acheter"};
  swipeLeft.action = function () {};
  return {
    name: name,
    desc: desc, 
    img: img, 
    swipeLeft: swipeLeft,
    swipeRight: swipeRight,
  }
}

function generateNoShop(player, swipeActions){
  return {
    name: "no",
    text: function () {return "Ne pas acheter"},
    img: function () {return no_svg},
    action: function() {
      if(currentItem < currentShopList.length){
        player.thisRoom.isLastRoom = false; 
        player.thisRoom.nextRoom = objectsGenerator[currentShopList[currentItem].name](player, swipeActions);
        currentItem += 1;
      }
      else{
        setTimeout(function(){ player.thisRoom.background = player.thisRoom.theme; }, 500);
      }
    },
  }
}

function generateYesShop(player, swipeActions){
  return {
      name: "buy",
      text: function () {return "Acheter"},
      img: function () {return givecoins_svg},
      action: function() {},
    }
}

function generateShopList(player){
  var numberOfObjects = getRandomNumber(3, 5);
  var shopObjects = objectsList;
  if(player.getRole() != "Mage"){shopObjects = shopObjects.filter(element => element.name != "m_powerStone")}
  var shopList = [];
  
  for (var i = numberOfObjects - 1; i >= 0; i--) {
    var newObject = getObjectByRarity(shopObjects);
    shopObjects = shopObjects.filter(element => element != newObject)
    shopList.push(newObject)
  }
  currentItem = 0;
  currentShopList = shopList;
}

function m_hpPotionGenerator(player, swipeActions){
  var price = getRandomNumber(4, 6)
  var name = "Potion de vie";
  var desc = "Vous rend 5 point de vie pour " + price +" pièces."
  var img =  m_hppotion_svg;

  var swipeLeft = generateNoShop(player, swipeActions);
  var swipeRight = generateYesShop(player, swipeActions);
  swipeRight.action = function() {
    if(player.getCoin() - price >= 0){
      if(currentItem < currentShopList.length){
        player.thisRoom.isLastRoom = false; 
        player.thisRoom.nextRoom = objectsGenerator[currentShopList[currentItem].name](player, swipeActions);
        currentItem += 1;
      }
      else{
        player.thisRoom.background = player.thisRoom.theme;
      }
      player.setHp(
        player.getHp() + 5, player
      );
      player.setCoin(
        player.getCoin() - price
      );
    }
    else{
      feedbackMessage(player, "Vous n'avez pas assez de pièces, je ne vends pas aux pauvres.")
    }
  }

  return {
    name: name,
    desc: desc, 
    img: img, 
    swipeLeft: swipeLeft,
    swipeRight: swipeRight,
  }
}

function m_vigorPotionGenerator(player, swipeActions){
  var price = getRandomNumber(6, 9)
  var name = "Potion de vigueur";
  var desc = "Vous donne 2 d'agilité pour " + price +" pièces."
  var img =  m_vigorpotion_svg;

  var swipeLeft = generateNoShop(player, swipeActions);
  var swipeRight = generateYesShop(player, swipeActions);
  swipeRight.action = function() {

    if(player.getCoin() - price >= 0){
      if(currentItem < currentShopList.length){
        player.thisRoom.isLastRoom = false; 
        player.thisRoom.nextRoom = objectsGenerator[currentShopList[currentItem].name](player, swipeActions);
        currentItem += 1;
      }
      else{
        player.thisRoom.background = player.thisRoom.theme;
      }
      player.setAgility(
        player.getAgility() + 2, player
      );
      player.setCoin(
        player.getCoin() - price
      );
    }
    else{
      feedbackMessage(player, "Vous n'avez pas assez de pièces, je ne vends pas aux pauvres.")
    }
  }

  return {
    name: name,
    desc: desc, 
    img: img, 
    swipeLeft: swipeLeft,
    swipeRight: swipeRight,
  }
}

function m_strPotionGenerator(player, swipeActions){
  var price = getRandomNumber(6, 9)
  var name = "Potion de force";
  var desc = "Vous donne 2 de force pour " + price +" pièces."
  var img =  m_strpotion_svg;

  var swipeLeft = generateNoShop(player, swipeActions);
  var swipeRight = generateYesShop(player, swipeActions);
  swipeRight.action = function() {

    if(player.getCoin() - price >= 0){
      if(currentItem < currentShopList.length){
        player.thisRoom.isLastRoom = false; 
        player.thisRoom.nextRoom = objectsGenerator[currentShopList[currentItem].name](player, swipeActions);
        currentItem += 1;
      }
      else{
        player.thisRoom.background = player.thisRoom.theme;
      }
      player.setStr(
        player.getStr() + 2, player
      );
      player.setCoin(
        player.getCoin() - price
      );
    }
    else{
      feedbackMessage(player, "Vous n'avez pas assez de pièces, je ne vends pas aux pauvres.")
    }
  }

  return {
    name: name,
    desc: desc, 
    img: img, 
    swipeLeft: swipeLeft,
    swipeRight: swipeRight,
  }
}

function m_intelPotionGenerator(player, swipeActions){
  var price = getRandomNumber(6, 9)
  var name = "Potion d'intelligence";
  var desc = "Vous donne 2 d'intelligence pour " + price +" pièces."
  var img =  m_intelpotion_svg;

  var swipeLeft = generateNoShop(player, swipeActions);
  var swipeRight = generateYesShop(player, swipeActions);
  swipeRight.action = function() {

    if(player.getCoin() - price >= 0){
      if(currentItem < currentShopList.length){
        player.thisRoom.isLastRoom = false; 
        player.thisRoom.nextRoom = objectsGenerator[currentShopList[currentItem].name](player, swipeActions);
        currentItem += 1;
      }
      else{
        player.thisRoom.background = player.thisRoom.theme;
      }
      player.setIntel(
        player.getIntel() + 2, player
      );
      player.setCoin(
        player.getCoin() - price
      );
    }
    else{
      feedbackMessage(player, "Vous n'avez pas assez de pièces, je ne vends pas aux pauvres.")
    }
  }

  return {
    name: name,
    desc: desc, 
    img: img, 
    swipeLeft: swipeLeft,
    swipeRight: swipeRight,
  }
}



function m_intelBookGenerator(player, swipeActions){
  var price = getRandomNumber(10, 14)
  var name = "Livre jaune";
  var desc = "Vous donne 5 d'intelligence pour " + price +" pièces."
  var img =  m_intelbook_svg;

  var swipeLeft = generateNoShop(player, swipeActions);
  var swipeRight = generateYesShop(player, swipeActions);
  swipeRight.action = function() {
    if(player.getCoin() - price >= 0){
      if(currentItem < currentShopList.length){
        player.thisRoom.isLastRoom = false; 
        player.thisRoom.nextRoom = objectsGenerator[currentShopList[currentItem].name](player, swipeActions);
        currentItem += 1;
      }
      else{
        player.thisRoom.background = player.thisRoom.theme;
      }
      player.setIntel(
        player.getIntel() + 5, player
      );
      player.setCoin(
        player.getCoin() - price
      );
    }
    else{
      feedbackMessage(player, "Vous n'avez pas assez de pièces, je ne vends pas aux pauvres.")
    }
  }

  return {
    name: name,
    desc: desc, 
    img: img, 
    swipeLeft: swipeLeft,
    swipeRight: swipeRight,
  }
}

function m_eloquenceBookGenerator(player, swipeActions){
  var price = getRandomNumber(5, 10)
  var name = "Livre orange";
  var desc = "Augmente votre éloquence pour " + price +" pièces."
  var img =  m_eloquencebook_svg;

  var swipeLeft = generateNoShop(player, swipeActions);
  var swipeRight = generateYesShop(player, swipeActions);
  swipeRight.action = function() {
    if(player.getCoin() - price >= 0){
      if(currentItem < currentShopList.length){
        player.thisRoom.isLastRoom = false; 
        player.thisRoom.nextRoom = objectsGenerator[currentShopList[currentItem].name](player, swipeActions);
        currentItem += 1;
      }
      else{
        player.thisRoom.background = player.thisRoom.theme;
      }
      player.stats.eloquence += 3 
      player.setCoin(
        player.getCoin() - price
      );
    }
    else{
      feedbackMessage(player, "Vous n'avez pas assez de pièces, je ne vends pas aux pauvres.")
    }
  }

  return {
    name: name,
    desc: desc, 
    img: img, 
    swipeLeft: swipeLeft,
    swipeRight: swipeRight,
  }
}

function m_mushroomBookGenerator(player, swipeActions){
  var price = getRandomNumber(3, 12)
  var name = "Livre bleu";
  var desc = "Vous permet d'identifier les différents champignons pour " + price +" pièces."
  var img =  m_mushroombook_svg;

  var swipeLeft = generateNoShop(player, swipeActions);
  var swipeRight = generateYesShop(player, swipeActions);
  swipeRight.action = function() {
    if(player.getCoin() - price >= 0){
      if(currentItem < currentShopList.length){
        player.thisRoom.isLastRoom = false; 
        player.thisRoom.nextRoom = objectsGenerator[currentShopList[currentItem].name](player, swipeActions);
        currentItem += 1;
      }
      else{
        player.thisRoom.background = player.thisRoom.theme;
      }
      player.setCoin(
        player.getCoin() - price
      );
      objectsList = objectsList.filter(element => element.name != "m_mushroomBook")
      player.special.mushroomKnowledge = true;
    }
    else{
      feedbackMessage(player, "Vous n'avez pas assez de pièces, je ne vends pas aux pauvres.")
    }
  }

  return {
    name: name,
    desc: desc, 
    img: img, 
    swipeLeft: swipeLeft,
    swipeRight: swipeRight,
  }
}


function m_powerStoneGenerator(player, swipeActions){
  var price = 25;
  var name = "Pierre bleue";
  var desc = "Votre baguette est défectueuse ? Changez la pierre pour " + price +" pièces."
  var img =  m_powerstone_svg;

  var swipeLeft = generateNoShop(player, swipeActions);
  var swipeRight = generateYesShop(player, swipeActions);
  swipeRight.action = function() {
    if(player.getCoin() - price >= 0){
      if(currentItem < currentShopList.length){
        player.thisRoom.isLastRoom = false; 
        player.thisRoom.nextRoom = objectsGenerator[currentShopList[currentItem].name](player, swipeActions);
        currentItem += 1;
      }
      else{
        player.thisRoom.background = player.thisRoom.theme;
      }
      player.setCoin(
        player.getCoin() - price
      );
      objectsList = objectsList.filter(element => element.name != "m_powerStone")
      player.special.powerStone = true;
    }
    else{
      feedbackMessage(player, "Vous n'avez pas assez de pièces, je ne vends pas aux pauvres.")
    }
  }

  return {
    name: name,
    desc: desc, 
    img: img, 
    swipeLeft: swipeLeft,
    swipeRight: swipeRight,
  }
}

function m_equalityScrollGenerator(player, swipeActions){
  var price = getRandomNumber(6, 9)
  var name = "Parchemin d'égalité";
  var desc = "Egalise le niveau de vos aptitudes pour " + price +" pièces."
  var img =  m_equalityscroll_svg;

  var swipeLeft = generateNoShop(player, swipeActions);
  var swipeRight = generateYesShop(player, swipeActions);
  swipeRight.action = function() {
    if(player.getCoin() - price >= 0){
      if(currentItem < currentShopList.length){
        player.thisRoom.isLastRoom = false; 
        player.thisRoom.nextRoom = objectsGenerator[currentShopList[currentItem].name](player, swipeActions);
        currentItem += 1;
      }
      else{
        player.thisRoom.background = player.thisRoom.theme;
      }
      var statsTotal = player.getIntel() + player.getStr() + player.getAgility();
      var equalStat = Math.round(statsTotal / 3);
      player.setIntel(equalStat);
      player.setAgility(equalStat);
      player.setStr(equalStat);
      player.setCoin(
        player.getCoin() - price
      );
    }
    else{
      feedbackMessage(player, "Vous n'avez pas assez de pièces, je ne vends pas aux pauvres.")
    }
  }

  return {
    name: name,
    desc: desc, 
    img: img, 
    swipeLeft: swipeLeft,
    swipeRight: swipeRight,
  }
}