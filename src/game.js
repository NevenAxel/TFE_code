import { getObjectByRarity } from './utils';
import { getRandomNumber } from './utils';

import sword_svg from './img/actions/sword.svg';
import bow_svg from './img/actions/bow.svg';
import wand_svg from './img/actions/wand.svg';
import powerwand_svg from './img/actions/powerwand.svg';

import warrior_svg from './img/stats/warrior.svg';
import archer_svg from './img/stats/archer.svg';
import mage_svg from './img/stats/mage.svg';
import powermage_svg from './img/stats/powermage.svg';



export function writeStats(player){
    switch(player.getRole()) {
    case "Mage":
        player.setRoleStats(player.getIntel());
        player.stats.weapon = "wand";
        player.stats.weaponImg = wand_svg;
        player.stats.defaultAttack = "Lancer un sort";
        player.stats.roleImg = mage_svg
        if(player.special.powerStone){
            player.stats.weaponImg = powerwand_svg;
            player.stats.roleImg = powermage_svg;
        }
        break;
    case "Guerrier":
        player.setRoleStats(player.getStr());
        player.stats.weapon = "sword";
        player.stats.weaponImg = sword_svg;
        player.stats.defaultAttack = "Attaquer";
        player.stats.roleImg = warrior_svg
        break;
    case "Archer":
        player.setRoleStats(player.getAgility());
        player.stats.weapon = "bow";
        player.stats.weaponImg = bow_svg;
        player.stats.defaultAttack = "Tirer";
        player.stats.roleImg = archer_svg
        break;
    default:  
    }
    if(player.getLevel() === 0){
        if(player.thisRoom.tutoLevel === 0){
            document.getElementById("level").innerHTML = "Tutoriel";
        }
        else if(player.thisRoom.tutoLevel === 8){
            document.getElementById("level").innerHTML = "Niveau 0";
        }
        else{
           document.getElementById("level").innerHTML = "Tutoriel " + player.thisRoom.tutoLevel + "/7"; 
        }  
    }
    else{
        document.getElementById("level").innerHTML = "Niveau " + player.getLevel(); 
    }
   
    document.getElementById("stats_hp").innerHTML = player.getHp();
    document.getElementById("hpRemaining").style.width = player.stats.hp / player.getMaxHp() * 100 + "%";
    document.getElementById("stats_maxhp").innerHTML = player.getMaxHp();
    document.getElementById("stats_coins").innerHTML = player.getCoin();
    document.getElementById("stats_str").innerHTML = player.getStr();
    document.getElementById("stats_intel").innerHTML = player.getIntel();
    document.getElementById("stats_agility").innerHTML = player.getAgility();
    document.getElementById("stats_class").style.backgroundImage = "url("+ player.stats.roleImg  + ")";
    document.getElementById("card").style.backgroundImage = "url("+ player.thisRoom.background  + ")";
  }

export function writeRoom(currentRoom){
    document.getElementById("room_img").style.backgroundImage = "url("+ currentRoom.img + ")";
    document.getElementById("room_name").innerHTML= currentRoom.name.charAt(0).toUpperCase() + currentRoom.name.slice(1);
    document.getElementById("room_desc").innerHTML= currentRoom.desc;
    document.getElementById("btn_no-text").textContent = currentRoom.swipeLeft.text();
    document.getElementById("btn_no").style.backgroundImage = "url("+ currentRoom.swipeLeft.img() + ")";
    document.getElementById("btn_yes-text").textContent = currentRoom.swipeRight.text();
    document.getElementById("btn_yes").style.backgroundImage = "url("+ currentRoom.swipeRight.img() + ")";
  }

export function getNewRoom(room, swipeActions, player){
    if (player.getLevel() === 0) {
        return room.roomGenerator.starting(player, swipeActions);
    }
    if (player.getLevel() % 5 === 0) {
        var currentRoom = getObjectByRarity(room.forestLootList);
        return room.roomGenerator[currentRoom.name](player, swipeActions);
    }
    else {

        var availableRoom = room.forestMonsterList.slice();
        if((player.special.frogHater >= 5 || player.special.frogFriend >= 5) && player.special.frogKingNotPresent){
            availableRoom.push(room.unique.frogKing)
        };
        var currentRoom = getObjectByRarity(availableRoom);
        return room.roomGenerator[currentRoom.name](player, swipeActions);
    }
}

export function feedbackMessage(player, message){
    var feedback = document.getElementsByClassName('feedback')[0];
    var filterFeedback = document.getElementsByClassName('filter-feedback')[0];
    player.thisRoom.isLastRoom = false; 
    player.thisRoom.nextRoom = {
        swipeLeft: {
            img: function () {},
            action: function() {
                setTimeout(function(){
                    feedback.classList.remove("on");
                    filterFeedback.classList.remove("on");
                    player.thisRoom.background = player.thisRoom.theme;
                }, 500);  
                player.feedback = false;
            },
            text: function () {return "Carte suivante"},
        },
        swipeRight: {
            img: function () {},
            action: function() {
                setTimeout(function(){
                    feedback.classList.remove("on");
                    filterFeedback.classList.remove("on");
                    player.thisRoom.background = player.thisRoom.theme;
                }, 500);  
                player.feedback = false;
            },
            text: function () {return "Carte suivante"},
        }
    }  
    player.feedback = true;
    filterFeedback.classList.add("on");
    feedback.innerHTML = message;
    feedback.classList.add("on");
    
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
        setTimeout(function(){ 
            document.getElementsByClassName("gameover")[0].classList.add("on")
            document.getElementById('gameover-filter').style.display = "block";
            document.getElementById('gameover-filter').style.opacity = ".75";
        }, 3000); 
}
export function generateDifficultyMultiplier(player, number, difficultyMultiplier){
    var LevelRequiredForMultiplier = 30;
    var realMultiplier = (difficultyMultiplier - 1) / 2 + player.getLevel() / LevelRequiredForMultiplier / 10 + 0.9;
    var finalNumber = number * Math.pow(realMultiplier, 2);
    /* ConsoleLog pour traquer le changement de chiffre par rapport à la difficultée */ 
    /*
    console.log("First Number " + difficultyMultiplier + " : " + number);
    console.log("realMultiplier " + difficultyMultiplier + " : " + Math.pow(realMultiplier, 2));
    console.log("Final Number " + difficultyMultiplier + " : " + Math.round(finalNumber));
    */
    return Math.round(finalNumber);
}