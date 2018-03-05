import { getObjectByRarity } from './utils';
import { getRandomNumber } from './utils';

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
        player.stats.weaponImg = "sword.png";
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
    document.getElementById("room_img").innerHTML = currentRoom.img;
    document.getElementById("room_desc").innerHTML= currentRoom.desc;
    document.getElementById("btn_no").textContent = currentRoom.swipeLeft.text();
    document.getElementById("btn_yes").textContent = currentRoom.swipeRight.text();
  }

export function getNewRoom(monsters, loot, swipeActions, player){
    if (player.getLevel() === 1) {
        return loot.lootGenerator.starting(player, swipeActions);
    }
    if (player.getLevel() % 5 === 0) {
        var currentRoom = getObjectByRarity(loot.chestList);
        return loot.lootGenerator[currentRoom.name](player, swipeActions);
    }
    else {       
        var currentRoom = getObjectByRarity(monsters.basicMonsterList);
        return monsters.monsterGenerator[currentRoom.name](player, swipeActions);
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