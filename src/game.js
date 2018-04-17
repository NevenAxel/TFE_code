import { getObjectByRarity } from './utils';
import { getRandomNumber } from './utils';

import sword_svg from './img/actions/sword.svg';
import bow_svg from './img/actions/bow.svg';


export function writeStats(player){
    switch(player.getRole()) {
    case "Mage":
        player.setRoleStats(player.getIntel());
        player.stats.weapon = "wand";
        player.stats.weaponImg = "wand.png";
        player.stats.defaultAttack = "Attaquer";
        break;
    case "Guerrier":
        player.setRoleStats(player.getStr());
        player.stats.weapon = "sword";
        player.stats.weaponImg = sword_svg;
        player.stats.defaultAttack = "Attaquer";
        break;
    case "Archer":
        player.setRoleStats(player.getAgility());
        player.stats.weapon = "bow";
        player.stats.weaponImg = bow_svg;
        player.stats.defaultAttack = "Tirer";
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
    document.getElementById("room_name").innerHTML= currentRoom.name.charAt(0).toUpperCase() + currentRoom.name.slice(1);
    document.getElementById("room_desc").innerHTML= currentRoom.desc;
    document.getElementById("btn_no-text").textContent = currentRoom.swipeLeft.text();
    document.getElementById("btn_no").style.backgroundImage = "url("+ currentRoom.swipeLeft.img() + ")";
    document.getElementById("btn_yes-text").textContent = currentRoom.swipeRight.text();
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

export function feedbackMessage(player, message){
    player.thisRoom.isLastRoom = false; 
    player.thisRoom.nextRoom = {
                    swipeLeft: {
                        img: function () {return },
                        action: function() {
                            document.getElementById("feedback").style.opacity = 0;
                        },
                        text: function () {return ""},
                    },
                    swipeRight: {
                        img: function () {return },
                        action: function() {
                            document.getElementById("feedback").style.opacity = 0;
                        },
                        text: function () {return ""},
                    }
                }

    
    var feedbackMessage = document.getElementById("card");
    feedbackMessage.classList.add("feedback-message");
    document.getElementById("feedback").style.opacity = 1;
    document.getElementById("feedback").innerHTML = message;
    

    /*
    document.getElementById("feedback-message").innerHTML = message;
    document.getElementById("feedback-message").style.opacity = 1;
    setTimeout(function(){ document.getElementById("feedback-message").style.opacity = 0; }, 8000);
    */
}