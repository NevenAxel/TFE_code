import { getRandomNumber } from './utils';

export default {
  stats: {
    hp: 20,
    maxHp: 20,
    coin: 20,
    str: getRandomNumber(3, 7),
    intel: getRandomNumber(3, 7),
    agility: getRandomNumber(3, 7),
    level: 1,
    roleStats: 5,
    role: "none",
    weapon: "sword",
    weaponImg: "sword.png",
    defaultAttack: "Attaquer",
  },  
  thisRoom: {
    isLastRoom: true,
    nextRoom: function() {console.log("newRoom")},
  },
  setHp: function(nbr, player) {
    if(nbr > player.getMaxHp()){
      this.stats.hp = player.getMaxHp();
    }
    else{
      this.stats.hp = nbr;
    }  
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
    this.stats.coin = nbr;
  },
  getCoin: function() {
    return this.stats.coin;
  },
  setStr: function(nbr) {
    this.stats.str = nbr;
  },
  getStr: function() {
    return this.stats.str;
  },
  setIntel: function(nbr) {
    this.stats.intel = nbr;
  },
  getIntel: function() {
    return this.stats.intel;
  },
  setAgility: function(nbr) {
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