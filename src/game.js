import { getObjectByRarity } from './utils';
import { getRandomNumber } from './utils';

import sword_svg from './img/actions/sword.svg';


export function writeStats(player){
    switch(player.getRole()) {
    case "mage":
        player.setRoleStats(player.getIntel());
        player.stats.weapon = "wand";
        player.stats.weaponImg = "wand.png";
        player.stats.defaultAttack = "Lancer un sort";
        break;
    case "warrior":
        player.setRoleStats(player.getStr());
        player.stats.weapon = "sword";
        player.stats.weaponImg = sword_svg;
        player.stats.defaultAttack = "Donner un coup d'épée";
        break;
    case "rogue":
        player.setRoleStats(player.getAgility());
        player.stats.weapon = "bow";
        player.stats.weaponImg = "bow.png"
        player.stats.defaultAttack = "Tirer une flèche";
        break;
    default:
        console.log("NO Role STATS")
    }
    document.getElementById("level").innerHTML = player.getLevel();
    document.getElementById("stats_hp").innerHTML = player.getHp();
    document.getElementById("stats_maxhp").innerHTML = player.getMaxHp();
    document.getElementById("stats_coins").innerHTML = player.getCoin();
    document.getElementById("stats_str").innerHTML = player.getStr();
    document.getElementById("stats_intel").innerHTML = player.getIntel();
    document.getElementById("stats_agility").innerHTML = player.getAgility();
    document.getElementById("stats_class").innerHTML = player.getRole();

  }

export function writeRoom(currentRoom){
    document.getElementById("room_img").style.backgroundImage = "url("+ currentRoom.img; + ")";
    document.getElementById("room_desc").innerHTML= currentRoom.desc;
    document.getElementById("btn_no").textContent = currentRoom.swipeLeft.text();
    document.getElementById("btn_no").style.backgroundImage = "url("+ currentRoom.swipeLeft.img() + ")";
    document.getElementById("btn_yes").textContent = currentRoom.swipeRight.text();
    document.getElementById("btn_yes").style.backgroundImage = "url("+ currentRoom.swipeRight.img() + ")";
  }

export function getNewRoom(room, swipeActions, player){
    if (player.getLevel() === 1) {
        return room.roomGenerator.starting(player, swipeActions);
    }
    if (player.getLevel() % 5 === 0) {
        var currentRoom = getObjectByRarity(room.forestLootList);
        return room.roomGenerator[currentRoom.name](player, swipeActions);
    }
    else {       
        var currentRoom = getObjectByRarity(room.forestMonsterList);
        return room.roomGenerator[currentRoom.name](player, swipeActions);
    }
}

export function feedbackMessage(message){
    var feedbackMessage = document.createElement("div");
    feedbackMessage.classList.add("feedback-message");
    feedbackMessage.innerHTML = message;
    document.body.appendChild(feedbackMessage);
    setTimeout(function(){ document.body.removeChild(feedbackMessage); }, 5000);

    /*
    document.getElementById("feedback-message").innerHTML = message;
    document.getElementById("feedback-message").style.opacity = 1;
    setTimeout(function(){ document.getElementById("feedback-message").style.opacity = 0; }, 8000);
    */
}