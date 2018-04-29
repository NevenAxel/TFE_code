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
       
    }
    document.getElementById("level").innerHTML = player.getLevel();
    document.getElementById("stats_hp").innerHTML = player.getHp();
    document.getElementById("hpRemaining").style.width = player.stats.hp / player.getMaxHp() * 100 + "%";
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
    console.log("Friend : " + player.special.frogFriend + " Hater " + player.special.frogHater)
    if (player.getLevel() === 1) {
        return room.roomGenerator.starting(player, swipeActions);
    }
    if (player.getLevel() % 5 === 0) {
        var currentRoom = getObjectByRarity(room.forestLootList);
        return room.roomGenerator[currentRoom.name](player, swipeActions);
    }
    else {

        var availableRoom = room.forestMonsterList.slice();
        if((player.special.frogHater >= 4 || player.special.frogFriend >= 4) && player.special.frogKingNotPresent){
            availableRoom.push(room.unique.frogKing)
            console.log("frogKing In the game")
        };
        var currentRoom = getObjectByRarity(availableRoom);
        return room.roomGenerator[currentRoom.name](player, swipeActions);
    }
}

export function feedbackMessage(player, message){
    player.thisRoom.isLastRoom = false; 
    player.thisRoom.nextRoom = {
        swipeLeft: {
            img: function () {return "swipe_svg"},
            action: function() {
                document.getElementById("feedback").style.display = "none";
                document.getElementById("filter-feedback").style.display = "none";
            },
            text: function () {return "Carte suivante"},
        },
        swipeRight: {
            img: function () {return "swipe_svg"},
            action: function() {
                document.getElementById("feedback").style.display = "none";
                document.getElementById("filter-feedback").style.display = "none";
            },
            text: function () {return "Carte suivante"},
        }
    }  
    var feedbackMessage = document.getElementById("card");
    document.getElementById("filter-feedback").style.display = "block";
    document.getElementById("feedback").style.display = "block";
    document.getElementById("feedback").innerHTML = message;
}

export function gameOver(player, deathMessage){
    player.stats.alive = false;
    document.getElementById('gameover-message').innerHTML = deathMessage;
    document.getElementById('gameover-lvl').innerHTML = player.stats.level;
    document.getElementById('card-tracker').style.display = "none";
    function retry(){
        window.location.reload(false);
    }
    document.getElementById("gameover-retry").addEventListener("click", retry);
    if(document.getElementById("feedback").style.display != "none"){
        setTimeout(function(){
            document.getElementsByClassName("gameover")[0].classList.add("on")
            document.getElementById('gameover-filter').style.display = "block";
            document.getElementById('gameover-filter').style.opacity = ".75";
        }, 1500);   
    }
    else{
        setTimeout(function(){ 
            document.getElementsByClassName("gameover")[0].classList.add("on")
            document.getElementById('gameover-filter').style.display = "block";
            document.getElementById('gameover-filter').style.opacity = ".75";
        }, 1500); 
    }
}