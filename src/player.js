import { getRandomNumber } from './utils';
import { gameOver } from './game';

import sword_svg from './img/actions/sword.svg';

export default {
  stats: {
    hp: 20,
    maxHp: 20,
    coin: 5,
    str: getRandomNumber(3, 7),
    intel: getRandomNumber(3, 7),
    agility: getRandomNumber(3, 7),
    level: 1,
    roleStats: 5,
    role: "Aventurier",
    weapon: "sword",
    weaponImg: "sword.png",
    defaultAttack: "Attaquer",
    alive: true,
  },  
  thisRoom: {
    isLastRoom: true,
    nextRoom: function() {console.log("newRoom")},
  },
  special: {
    frogFriend: 0,
    frogHater: 0,
  },
  setHp: function(nbr, player) {
    if(nbr <= 0){
      this.stats.hp = 0;
      gameOver(player, "Vous êtes mort!");
    }
    if(nbr > player.getMaxHp()){
      this.stats.hp = player.getMaxHp();
    }
    else{
      this.stats.hp = nbr;
    }
    document.getElementById("hpRemaining").style.width = this.stats.hp / player.getMaxHp() * 100 + "%";
  },
  getHp: function() {
    return this.stats.hp;
  },
  setMaxHp: function(nbr) {
    this.stats.maxHp = nbr;
  },
  getMaxHp: function() {
    return this.stats.maxHp;
  },
  setCoin: function(nbr) {
    if(this.stats.coin < nbr ){
      document.getElementById("stats_coins").classList.add("stats-up");
      setTimeout(function(){ document.getElementById("stats_coins").classList.remove("stats-up"); }, 500);
    }
    if(this.stats.coin > nbr ){
      document.getElementById("stats_coins").classList.add("stats-down");
      setTimeout(function(){ document.getElementById("stats_coins").classList.remove("stats-down"); }, 500);
    }
    this.stats.coin = nbr;
  },
  getCoin: function() {
    return this.stats.coin;
  },
  setStr: function(nbr) {
    if(this.stats.str < nbr ){
      document.getElementById("stats_str").classList.add("stats-up");
      setTimeout(function(){ document.getElementById("stats_str").classList.remove("stats-up"); }, 500);
    }
    if(this.stats.str > nbr ){
      document.getElementById("stats_str").classList.add("stats-down");
      setTimeout(function(){ document.getElementById("stats_str").classList.remove("stats-down"); }, 500);
    }
    this.stats.str = nbr;
  },
  getStr: function() {
    return this.stats.str;
  },
  setIntel: function(nbr) {
    if(this.stats.intel < nbr ){
      document.getElementById("stats_intel").classList.add("stats-up");
      setTimeout(function(){ document.getElementById("stats_intel").classList.remove("stats-up"); }, 500);
    }
    if(this.stats.intel > nbr ){
      document.getElementById("stats_intel").classList.add("stats-down");
      setTimeout(function(){ document.getElementById("stats_intel").classList.remove("stats-down"); }, 500);
    }
    this.stats.intel = nbr;
  },
  getIntel: function() {
    return this.stats.intel;
  },
  setAgility: function(nbr) {
    if(this.stats.agility < nbr ){
      document.getElementById("stats_agility").classList.add("stats-up");
      setTimeout(function(){ document.getElementById("stats_agility").classList.remove("stats-up"); }, 500);
    }
    if(this.stats.agility > nbr ){
      document.getElementById("stats_agility").classList.add("stats-down");
      setTimeout(function(){ document.getElementById("stats_agility").classList.remove("stats-down"); }, 500);
    }
    this.stats.agility = nbr;
  },
  getAgility: function() {
    return this.stats.agility;
  },
  setLevel: function(nbr) {
    this.stats.level = nbr;
  },
  getLevel: function() {
    return this.stats.level;
  },
  setRole: function(role) {
    this.stats.role = role;
  },
  getRole: function() {
    return this.stats.role;
  },
  setRoleStats: function(nbr) {
    this.stats.roleStats = nbr;
  },
  getRoleStats: function() {
    return this.role.mainStats;
  },
};

export function gainLevel(player) { player.setLevel(player.getLevel() + 1); }