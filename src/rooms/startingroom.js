import { createAvailableActions } from '../utils';
import { feedbackMessage } from '../game';
import { generateTwoActionsNoDupe } from '../utils';
import { getRandomNumber } from '../utils';
import { getObjectByRarity } from '../utils';

import forgeron_svg from '../img/monsters/forgeron.svg';
import no_svg from '../img/actions/no.svg';
import yes_svg from '../img/actions/yes.svg';
import swipe_svg from '../img/actions/swipe.svg';
import escape_svg from '../img/actions/escape.svg';


export default {
  startingGenerator
};
  

function startingGenerator(player, swipeActions) {
  var name = 'Forgeron';
  var desc = 'Voulez-vous suivre le tutoriel ? Glissez la carte pour choisir';
  var img = forgeron_svg;
  var actionLeft = {
    name: "no",
    text: function () {return "Non merci"},
    img: function () {return no_svg},
    action: function () {
      player.thisRoom.tutoLevel = 8;
      document.getElementById("stats_class").style.opacity = "1";
      document.getElementById("stats_coins").style.opacity = "1";
      document.getElementById("stats_str").style.opacity = "1";
      document.getElementById("stats_intel").style.opacity = "1";
      document.getElementById("stats_agility").style.opacity = "1";
      document.getElementsByClassName("hp-bar")[0].style.opacity = "1";
      player.thisRoom.isLastRoom = false;
      player.thisRoom.nextRoom = weaponChoiceGenerator(player, swipeActions)
    }
  }
  var actionRight = {
    name: "yes",
    text: function () {return "Suivre le tuto"},
    img: function () {return yes_svg},
    action: function () { 
      player.thisRoom.isLastRoom = false;
      player.thisRoom.tutoLevel += 1;
      player.thisRoom.nextRoom = lifeTutoGenerator(player, swipeActions)
      document.getElementsByClassName("hp-bar")[0].style.opacity = "1";
      document.getElementById("stats_class").style.opacity = "1";
      document.getElementById("stats_coins").style.opacity = "0";
      document.getElementById("stats_str").style.opacity = "0";
      document.getElementById("stats_intel").style.opacity = "0";
      document.getElementById("stats_agility").style.opacity = "0"; 
      document.getElementById("level").innerHTML = "Tutoriel 1/6";
    }
  }
  return {
    name: name,
    desc: desc, 
    img: img,
    swipeLeft: actionLeft,
    swipeRight: actionRight,
  }
}

function lifeTutoGenerator(player, swipeActions) {
  var name = 'Forgeron';
  var desc = "Votre barre de vie augmente et diminue en fonction de vos décision";
  var img = forgeron_svg;
  var actionLeft = {
    name: "next",
    text: function () {return "Carte précédente"},
    img: function () {return swipe_svg},
    action: function () {
      player.thisRoom.isLastRoom = false;
      player.thisRoom.tutoLevel -= 1;
      player.thisRoom.nextRoom = startingGenerator(player, swipeActions)
      document.getElementsByClassName("hp-bar")[0].style.opacity = "0";
      document.getElementById("stats_class").style.opacity = "0";
      document.getElementById("stats_coins").style.opacity = "0";
      document.getElementById("stats_str").style.opacity = "0";
      document.getElementById("stats_intel").style.opacity = "0";
      document.getElementById("stats_agility").style.opacity = "0";  
    }
  }
  var actionRight = {
    name: "next",
    text: function () {return "Carte suivante"},
    img: function () {return swipe_svg},
    action: function () {
      player.thisRoom.isLastRoom = false;
      player.thisRoom.tutoLevel += 1;
      player.thisRoom.nextRoom = lifeTuto2Generator(player, swipeActions)
      document.getElementsByClassName("hp-bar")[0].style.opacity = "1";
      document.getElementById("stats_class").style.opacity = "1";
      document.getElementById("stats_coins").style.opacity = "0";
      document.getElementById("stats_str").style.opacity = "0";
      document.getElementById("stats_intel").style.opacity = "0";
      document.getElementById("stats_agility").style.opacity = "0"; 
    }
  }
  return {
    name: name,
    desc: desc, 
    img: img,
    swipeLeft: actionLeft,
    swipeRight: actionRight,
  }
}
function lifeTuto2Generator(player, swipeActions) {
  var name = 'Forgeron';
  var desc = "Si vous tombez à 0 point de vie (Pv), vous perdez la partie";
  var img = forgeron_svg;
  var actionLeft = {
    name: "next",
    text: function () {return "Carte précédente"},
    img: function () {return swipe_svg},
    action: function () {
      player.thisRoom.isLastRoom = false;
      player.thisRoom.tutoLevel -= 1;
      player.thisRoom.nextRoom = lifeTutoGenerator(player, swipeActions)
      document.getElementsByClassName("hp-bar")[0].style.opacity = "1";
      document.getElementById("stats_class").style.opacity = "1";
      document.getElementById("stats_coins").style.opacity = "0";
      document.getElementById("stats_str").style.opacity = "0";
      document.getElementById("stats_intel").style.opacity = "0";
      document.getElementById("stats_agility").style.opacity = "0";  
    }
  }
  var actionRight = {
    name: "next",
    text: function () {return "Carte suivante"},
    img: function () {return swipe_svg},
    action: function () {
      player.thisRoom.isLastRoom = false;
      player.thisRoom.tutoLevel += 1;
      player.thisRoom.nextRoom = coinsTutoGenerator(player, swipeActions)
      document.getElementsByClassName("hp-bar")[0].style.opacity = "1";
      document.getElementById("stats_class").style.opacity = "1";
      document.getElementById("stats_coins").style.opacity = "1";
      document.getElementById("stats_str").style.opacity = "0";
      document.getElementById("stats_intel").style.opacity = "0";
      document.getElementById("stats_agility").style.opacity = "0"; 
    }
  }
  return {
    name: name,
    desc: desc, 
    img: img,
    swipeLeft: actionLeft,
    swipeRight: actionRight,
  }
}
function coinsTutoGenerator(player, swipeActions){
  var name = 'Forgeron';
  var desc = "Les pièces permettent d'acheter des objets";
  var img = forgeron_svg;
  var actionLeft = {
    name: "next",
    text: function () {return "Carte précédente"},
    img: function () {return swipe_svg},
    action: function () {
      player.thisRoom.isLastRoom = false;
      player.thisRoom.tutoLevel -= 1;
      player.thisRoom.nextRoom = lifeTuto2Generator(player, swipeActions)
      document.getElementsByClassName("hp-bar")[0].style.opacity = "1";
      document.getElementById("stats_class").style.opacity = "1";
      document.getElementById("stats_coins").style.opacity = "0";
      document.getElementById("stats_str").style.opacity = "0";
      document.getElementById("stats_intel").style.opacity = "0";
      document.getElementById("stats_agility").style.opacity = "0"; 
    }
  }
  var actionRight = {
    name: "next",
    text: function () {return "Carte suivante"},
    img: function () {return swipe_svg},
    action: function () {
      player.thisRoom.isLastRoom = false;
      player.thisRoom.tutoLevel += 1;
      player.thisRoom.nextRoom = strTutoGenerator(player, swipeActions)
      document.getElementsByClassName("hp-bar")[0].style.opacity = "1";
      document.getElementById("stats_class").style.opacity = "1";
      document.getElementById("stats_coins").style.opacity = "1";
      document.getElementById("stats_str").style.opacity = "1";
      document.getElementById("stats_intel").style.opacity = "0";
      document.getElementById("stats_agility").style.opacity = "0"; 
    }
  }
  return {
    name: name,
    desc: desc, 
    img: img,
    swipeLeft: actionLeft,
    swipeRight: actionRight,
  }
}
function strTutoGenerator(player, swipeActions){
  var name = 'Forgeron';
  var desc = "La force permet de réussir certaines actions (crier par exemple)";
  var img = forgeron_svg;
  var actionLeft = {
    name: "next",
    text: function () {return "Carte précédente"},
    img: function () {return swipe_svg},
    action: function () {
      player.thisRoom.isLastRoom = false;
      player.thisRoom.tutoLevel -= 1;
      player.thisRoom.nextRoom = coinsTutoGenerator(player, swipeActions)
      document.getElementsByClassName("hp-bar")[0].style.opacity = "1";
      document.getElementById("stats_class").style.opacity = "1";
      document.getElementById("stats_coins").style.opacity = "1";
      document.getElementById("stats_str").style.opacity = "0";
      document.getElementById("stats_intel").style.opacity = "0";
      document.getElementById("stats_agility").style.opacity = "0"; 
    }
  }
  var actionRight = {
    name: "next",
    text: function () {return "Carte suivante"},
    img: function () {return swipe_svg},
    action: function () {
      player.thisRoom.isLastRoom = false;
      player.thisRoom.tutoLevel += 1;
      player.thisRoom.nextRoom = intelTutoGenerator(player, swipeActions)
      document.getElementsByClassName("hp-bar")[0].style.opacity = "1";
      document.getElementById("stats_class").style.opacity = "1";
      document.getElementById("stats_coins").style.opacity = "1";
      document.getElementById("stats_str").style.opacity = "1";
      document.getElementById("stats_intel").style.opacity = "1";
      document.getElementById("stats_agility").style.opacity = "0"; 
    }
  }
  return {
    name: name,
    desc: desc, 
    img: img,
    swipeLeft: actionLeft,
    swipeRight: actionRight,
  }
}
function intelTutoGenerator(player, swipeActions){
  var name = 'Forgeron';
  var desc = "L'intelligence permet nourrir les animaux, mieux méditer...";
  var img = forgeron_svg;
  var actionLeft = {
    name: "next",
    text: function () {return "Carte précédente"},
    img: function () {return swipe_svg},
    action: function () {
      player.thisRoom.isLastRoom = false;
      player.thisRoom.tutoLevel -= 1;
      player.thisRoom.nextRoom = strTutoGenerator(player, swipeActions)
      document.getElementsByClassName("hp-bar")[0].style.opacity = "1";
      document.getElementById("stats_class").style.opacity = "1";
      document.getElementById("stats_coins").style.opacity = "1";
      document.getElementById("stats_str").style.opacity = "1";
      document.getElementById("stats_intel").style.opacity = "0";
      document.getElementById("stats_agility").style.opacity = "0"; 
    }
  }
  var actionRight = {
    name: "next",
    text: function () {return "Carte suivante"},
    img: function () {return swipe_svg},
    action: function () {
      player.thisRoom.isLastRoom = false;
      player.thisRoom.tutoLevel += 1;
      player.thisRoom.nextRoom = agilityTutoGenerator(player, swipeActions)
      document.getElementsByClassName("hp-bar")[0].style.opacity = "1";
      document.getElementById("stats_class").style.opacity = "1";
      document.getElementById("stats_coins").style.opacity = "1";
      document.getElementById("stats_str").style.opacity = "1";
      document.getElementById("stats_intel").style.opacity = "1";
      document.getElementById("stats_agility").style.opacity = "1"; 
    }
  }
  return {
    name: name,
    desc: desc, 
    img: img,
    swipeLeft: actionLeft,
    swipeRight: actionRight,
  }
}
function agilityTutoGenerator(player, swipeActions){
  var name = 'Forgeron';
  var desc = "L'agilité permet de fuir, mieux dépecer, voler des pièces...";
  var img = forgeron_svg;
  var actionLeft = {
    name: "next",
    text: function () {return "Carte précédente"},
    img: function () {return swipe_svg},
    action: function () {
      player.thisRoom.isLastRoom = false;
      player.thisRoom.tutoLevel -= 1;
      player.thisRoom.nextRoom = intelTutoGenerator(player, swipeActions)
      document.getElementsByClassName("hp-bar")[0].style.opacity = "1";
      document.getElementById("stats_class").style.opacity = "1";
      document.getElementById("stats_coins").style.opacity = "1";
      document.getElementById("stats_str").style.opacity = "1";
      document.getElementById("stats_intel").style.opacity = "1";
      document.getElementById("stats_agility").style.opacity = "0"; 
    }
  }
  var actionRight = {
    name: "next",
    text: function () {return "Carte suivante"},
    img: function () {return swipe_svg},
    action: function () {
      player.thisRoom.isLastRoom = false;
      player.thisRoom.tutoLevel += 1;
      player.thisRoom.nextRoom = finalTutoGenerator(player, swipeActions)
      document.getElementsByClassName("hp-bar")[0].style.opacity = "1";
      document.getElementById("stats_class").style.opacity = "1";
      document.getElementById("stats_coins").style.opacity = "1";
      document.getElementById("stats_str").style.opacity = "1";
      document.getElementById("stats_intel").style.opacity = "1";
      document.getElementById("stats_agility").style.opacity = "1"; 
    }
  }
  return {
    name: name,
    desc: desc, 
    img: img,
    swipeLeft: actionLeft,
    swipeRight: actionRight,
  }
}
function finalTutoGenerator(player, swipeActions){
  var name = 'Forgeron';
  var desc = "Tu as toutes les clés pour réussir ton aventure, je t'offre une arme";
  var img = forgeron_svg;
  var actionLeft = {
    name: "next",
    text: function () {return "Carte précédente"},
    img: function () {return swipe_svg},
    action: function () {
      player.thisRoom.isLastRoom = false;
      player.thisRoom.tutoLevel -= 1;
      player.thisRoom.nextRoom = agilityTutoGenerator(player, swipeActions)
      document.getElementsByClassName("hp-bar")[0].style.opacity = "1";
      document.getElementById("stats_class").style.opacity = "1";
      document.getElementById("stats_coins").style.opacity = "1";
      document.getElementById("stats_str").style.opacity = "1";
      document.getElementById("stats_intel").style.opacity = "1";
      document.getElementById("stats_agility").style.opacity = "1"; 
    }
  }
  var actionRight = {
    name: "next",
    text: function () {return "Finir le tuto"},
    img: function () {return yes_svg},
    action: function () {
      player.thisRoom.isLastRoom = false;
      player.thisRoom.tutoLevel += 1;
      player.thisRoom.nextRoom = weaponChoiceGenerator(player, swipeActions)
      document.getElementsByClassName("hp-bar")[0].style.opacity = "1";
      document.getElementById("stats_class").style.opacity = "1";
      document.getElementById("stats_coins").style.opacity = "1";
      document.getElementById("stats_str").style.opacity = "1";
      document.getElementById("stats_intel").style.opacity = "1";
      document.getElementById("stats_agility").style.opacity = "1"; 
    }
  }
  return {
    name: name,
    desc: desc, 
    img: img,
    swipeLeft: actionLeft,
    swipeRight: actionRight,
  }
}


function weaponChoiceGenerator(player, swipeActions) {
  var name = 'Forgeron';
  var desc = 'Equipe-toi aventurier';
  var img = forgeron_svg;

  var availableActions = swipeActions.starting;
  var actionNoDupe = generateTwoActionsNoDupe(availableActions);
  var actionLeft = swipeActions.actionsGenerator[actionNoDupe[0].name](player, swipeActions);
  var actionRight = swipeActions.actionsGenerator[actionNoDupe[1].name](player, swipeActions);
  return {
    name: name,
    desc: desc, 
    img: img,
    swipeLeft: actionLeft,
    swipeRight: actionRight,
  }
}

