// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({5:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRandomNumber = getRandomNumber;
exports.randomProperties = randomProperties;
exports.randomOne = randomOne;
exports.getRandomAction = getRandomAction;
exports.getObjectByRarity = getObjectByRarity;
exports.generateTwoActionsNoDupe = generateTwoActionsNoDupe;
exports.createAvailableActions = createAvailableActions;
function getRandomNumber(min, max) {
  return min + Math.round(Math.random() * (max - min));
}

function randomProperties(obj) {
  var keys = Object.keys(obj);
  return obj[keys[keys.length * Math.random() << 0]];
};

function randomOne() {
  var args = Array.prototype.slice.call(arguments);
  return randomProperties(args);
}

function getRandomAction(actionList) {
  return actionList[Math.floor(Math.random() * actionList.length)];
};

function getObjectByRarity(objectList) {
  var lootTable = [];
  objectList.forEach(function (element) {
    var rarity = element.rarity;
    for (var i = 0; i < rarity; i++) {
      lootTable.push(element);
    }
  });
  return lootTable[Math.floor(Math.random() * lootTable.length)];
}

function generateTwoActionsNoDupe(availableActions) {
  var actionLeft = getObjectByRarity(availableActions);
  var actionRight = getObjectByRarity(availableActions.filter(function (action) {
    return action.name !== actionLeft.name;
  }));
  return [actionLeft, actionRight];
}

function createAvailableActions(player, swipeActions, objectList) {
  var availableActions = [];

  // Mettre toutes les actions dans la liste d'action dans la liste availableActions
  objectList.forEach(function (element) {
    swipeActions[element].forEach(function (element) {
      availableActions.push(element);
    });
  });

  // Ajouter les actions spécifique à la classe si le joueur est de cette classe
  if (player.getRole() == "rogue") {
    objectList.forEach(function (element) {
      var actionList = element + 'Rogue';
      if (typeof swipeActions[actionList] !== "undefined") {
        swipeActions[actionList].forEach(function (element) {
          availableActions.push(element);
        });
      }
    });
  }

  if (player.getRole() == "mage") {
    objectList.forEach(function (element) {
      var actionList = element + 'Mage';
      if (typeof swipeActions[actionList] !== "undefined") {
        swipeActions[actionList].forEach(function (element) {
          availableActions.push(element);
        });
      }
    });
  }

  if (player.getRole() == "warrior") {
    objectList.forEach(function (element) {
      var actionList = element + 'Warrior';
      if (typeof swipeActions[actionList] !== "undefined") {
        swipeActions[actionList].forEach(function (element) {
          availableActions.push(element);
        });
      }
    });
  }

  if (player.getRole() == "agility") {
    objectList.forEach(function (element) {
      var actionList = element + 'Agility';
      if (typeof swipeActions[actionList] !== "undefined") {
        swipeActions[actionList].forEach(function (element) {
          availableActions.push(element);
        });
      }
    });
  }

  if (player.getRole() == "intelligence") {
    objectList.forEach(function (element) {
      var actionList = element + 'Intelligence';
      if (typeof swipeActions[actionList] !== "undefined") {
        swipeActions[actionList].forEach(function (element) {
          availableActions.push(element);
        });
      }
    });
  }

  if (player.getRole() == "strenght") {
    objectList.forEach(function (element) {
      var actionList = element + 'Strenght';
      if (typeof swipeActions[actionList] !== "undefined") {
        swipeActions[actionList].forEach(function (element) {
          availableActions.push(element);
        });
      }
    });
  }

  return availableActions;
}
},{}],7:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.writeStats = writeStats;
exports.writeRoom = writeRoom;
exports.getNewRoom = getNewRoom;
exports.feedbackMessage = feedbackMessage;

var _utils = require('./utils');

function writeStats(player) {
    switch (player.getRole()) {
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
            player.stats.weaponImg = "bow.png";
            player.stats.defaultAttack = "Tirer une flèche";
            break;
        default:
            console.log("NO Role STATS");
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

function writeRoom(currentRoom) {
    document.getElementById("room_img").innerHTML = currentRoom.img;
    document.getElementById("room_desc").innerHTML = currentRoom.desc;
    document.getElementById("btn_no").textContent = currentRoom.swipeLeft.text();
    document.getElementById("btn_yes").textContent = currentRoom.swipeRight.text();
}

function getNewRoom(room, swipeActions, player) {
    if (player.getLevel() === 1) {
        return room.roomGenerator.starting(player, swipeActions);
    }
    if (player.getLevel() % 5 === 0) {
        var currentRoom = (0, _utils.getObjectByRarity)(room.chestList);
        return room.roomGenerator[currentRoom.name](player, swipeActions);
    } else {
        var currentRoom = (0, _utils.getObjectByRarity)(room.basicMonsterList);
        return room.roomGenerator[currentRoom.name](player, swipeActions);
    }
}

function feedbackMessage(message) {
    var feedbackMessage = document.createElement("div");
    feedbackMessage.classList.add("feedback-message");
    feedbackMessage.innerHTML = message;
    document.body.appendChild(feedbackMessage);
    setTimeout(function () {
        document.body.removeChild(feedbackMessage);
    }, 5000);

    /*
    document.getElementById("feedback-message").innerHTML = message;
    document.getElementById("feedback-message").style.opacity = 1;
    setTimeout(function(){ document.getElementById("feedback-message").style.opacity = 0; }, 8000);
    */
}
},{"./utils":5}],6:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utils = require('./utils');

var _game = require('./game');

// -------------------------------- EXPORT DEFAULT -------------------------------------------------- //

exports.default = {
	monsterGeneral: [{ name: 'escape', rarity: 1 }],
	monsterGeneralRogue: [{ name: 'escape', rarity: 1 }],
	monsterGeneralMage: [
		//{name: 'fireball', rarity: 1},
	],
	monsterGeneralWarrior: [
		//{name: 'block', rarity: 1},
	],

	monsterAnimals: [{ name: 'scream', rarity: 1 }, { name: 'feed', rarity: 1 }],
	monsterAnimalsRogue: [
		//{name: 'trap', rarity: 1},
	],
	monsterAnimalsIntelligence: [{ name: 'feed', rarity: 1 }],

	monsterSmallCreature: [{ name: 'scream', rarity: 1 }],

	monsterHumanoid: [],
	monsterHumanoidRogue: [{ name: 'steal', rarity: 2 }],
	monsterHumanoidAgility: [{ name: 'steal', rarity: 1 }],

	basicChest: [{ name: 'hpPotion', rarity: 10 }, { name: 'bagOfCoins', rarity: 10 }, { name: 'spinach', rarity: 1 }, { name: 'magicBook', rarity: 1 }, { name: 'speedShoes', rarity: 1 }, { name: 'dumbBell', rarity: 1 }, { name: 'magicmushroom', rarity: 5 }],

	starting: [
	//{name: 'wand', rarity: 1},
	{ name: 'sword', rarity: 1 }, { name: 'bow', rarity: 1 }],

	actionsGenerator: {
		wand: generateWand,
		sword: generateSword,
		bow: generateBow,

		hpPotion: generateHpPotion,
		bagOfCoins: generateBagOfCoins,
		spinach: generateSpinach,
		magicBook: generateMagicBook,
		speedShoes: generateSpeedShoes,
		dumbBell: generateDumbBell,
		magicmushroom: generateMagicMushroom,

		escape: generateEscape,
		scream: generateScream,
		feed: generateFeed,
		steal: generateSteal,

		attack: generateAttack,
		giveCoins: generateGiveCoins
		/*
  Faire des actions complexes (en plusieurs cartes)
  ça rend les actions plus intéressantes que d'avoir 
  une seule réponse (50% de chance de réussite et c'est tout)
   Et fonctionner avec plus d'actions typique à la classe
   certaines actions peuvent loot un objet certaine non
  (s'echapper ne permettra pas de loot d'objet)
  les loot sont en général des choix entre deux objets
  certaines actions finissent le combat, d'autres pas.
  Voler des pièces en voleur ne finit pas le combat?
  Quand une action rate ça ne finit pas le combat?
  
   Action "préparer son armure"
  prend du dmg maintenant mais pas la prochaine carte
  ou donne un certain nombre d'armure
   action "coup de bouclier"
  si on a de l'armure a beaucoup de chance d'arriver
  et permet de ne pas prendre de dmg
   classe guerrier passif: berserk, si le guerrier a moins de 20% de pv
  il se passe quelqueschose, plus de dmg, accès à d'autres abilité
  (Plus de chance de chopper des loot par exemple)
   Objet bière : gagner 10pv mais rend les 5 prochaines actions aléateoire
  
  */
	} };

// -------------------------------- ACTIONS_FUNCTIONS ------------------------------------------- //

function generateWand(player, swipeActions) {
	return {
		name: "wandstart",
		text: function text() {
			return "Prendre le baton magique";
		},
		img: function img() {
			return "wand.png";
		},
		action: function action() {
			player.setRole('mage');
			player.setIntel(player.getIntel() + 5);
		}
	};
}

function generateSword(player, swipeActions) {
	return {
		name: "swordstart",
		text: function text() {
			return "Prendre l'epée";
		},
		img: function img() {
			return "epee.png";
		},
		action: function action() {
			player.setRole('warrior');
			player.setStr(player.getStr() + 5);
			player.setMaxHp(player.getMaxHp() + 5);
			player.setHp(player.getHp() + 5, player);
		}
	};
}

function generateBow(player, swipeActions) {
	return {
		name: "bowstart",
		text: function text() {
			return "Prendre l'arc";
		},
		img: function img() {
			return "arc.png";
		},
		action: function action() {
			player.setRole('rogue');
			player.setAgility(player.getAgility() + 5);
		}
	};
}

// -------------------------------- MONSTERS ------------------------------------------------------------------------------------------ //
// -------------------------------- MONSTERS ------------------------------------------------------------------------------------------ //
// -------------------------------- MONSTERS ------------------------------------------------------------------------------------------ //


function generateAttack(player, swipeActions) {
	return {
		name: "attack",
		damage: 3,
		text: function text() {
			return player.stats.defaultAttack;
		},
		img: function img() {
			return player.stats.weaponImg;
		},
		action: function action() {
			switch (player.getRole()) {
				case "mage":
					player.setHp(player.getHp() - this.damage, player);
					break;
				case "warrior":
					player.setHp(player.getHp() - this.damage, player);
					break;
				case "rogue":
					if (Math.random() < 0.45) {
						player.setHp(player.getHp() - this.damage * 2, player);
						(0, _game.feedbackMessage)("Vous avez raté votre cible");
					} else {
						(0, _game.feedbackMessage)("Touché!");
					}
					break;
				default:
					player.setHp(player.getHp() - this.damage, player);
			}
		}
	};
}

function generateGiveCoins(player, swipeActions) {
	return {
		name: "givecoins",
		coinsGiven: (0, _utils.getRandomNumber)(1, 6),
		text: function text() {
			return "Donner " + this.coinsGiven + " pièces";
		},
		img: function img() {
			return "giveCoins.png";
		},
		action: function action() {
			if (player.getCoin() - this.coinsGiven < 0) {
				(0, _game.feedbackMessage)("J'ai vu que tu n'avais pas assez de pièces, j'aime pas les arnaqueur moi!");
				player.setCoin(0);
				player.setHp(player.getHp() - 10, player);
			} else if (this.coinsGiven == 1) {
				(0, _game.feedbackMessage)("Seulement une pièce ? Tu te fout de moi ?!");
				player.setCoin(player.getCoin() - this.coinsGiven);
				player.thisRoom.isLastRoom = false;
				// Permet un noveau dialogue sur la même carte
				player.thisRoom.nextRoom = {
					desc: "Seulement une pièce ? Tu te fout de moi ?!",
					swipeLeft: {
						coinsGiven2: (0, _utils.getRandomNumber)(3, 8),
						text: function text() {
							return "Donner " + this.coinsGiven2 + " pièces en plus";
						},
						img: function img() {
							return "giveCoins.png";
						},
						action: function action() {
							(0, _game.feedbackMessage)("J'aime mieux ça!");
							player.setCoin(player.getCoin() - this.coinsGiven2);
						}
					},
					swipeRight: swipeActions.actionsGenerator.attack(player, swipeActions)
				};
			} else {
				player.setCoin(player.getCoin() - this.coinsGiven);
			}
		}
	};
}

function generateScream(player, swipeActions) {
	return {
		name: "scream",
		require: 10,
		damage: 5,
		text: function text() {
			return "Crier pour l'effrayer";
		},
		img: function img() {
			return "scream.png";
		},
		action: function action() {
			if (player.getStr() >= this.require) {
				(0, _game.feedbackMessage)("L'ennemi a eu peur et s'est enfuis en courant");
			} else {
				(0, _game.feedbackMessage)("Votre cris n'est pas assez fort, gagnez un peu plus de force!");
				player.setHp(player.getHp() - this.damage, player);
			}
		}
	};
}

function generateEscape(player, swipeActions) {
	return {
		name: "escape",
		text: function text() {
			return "S'echapper";
		},
		img: function img() {
			return "escape.png";
		},
		require: 8,
		damage: 3,
		action: function action() {
			if (player.getAgility() >= this.require) {
				if (Math.random() < 0.3 * 5 / player.getAgility()) {
					(0, _game.feedbackMessage)('Pas de chance, vous avez trébucher sur une pierre');
					player.setHp(player.getHp() - this.damage, player);
				} else {
					(0, _game.feedbackMessage)("Vous vous êtes enfuis avec succes");
				}
			} else {
				(0, _game.feedbackMessage)("Vous n'êtes pas assez rapide! Ouch!");
				player.setHp(player.getHp() - this.damage, player);
			}
		}
	};
}

function generateFeed(player, swipeActions) {
	return {
		name: "feed",
		text: function text() {
			return "Nourrir l'animal";
		},
		img: function img() {
			return "feed.png";
		},
		action: function action() {
			if (player.getAgility() <= 5) {
				(0, _game.feedbackMessage)("Maladroit comme vous l'êtes, vous êtes tombé sur l'animal en le nourissant, il vous a attaqué");
				player.setHp(player.getHp() - 5, player);
			} else if (player.getIntel() <= 5) {
				(0, _game.feedbackMessage)("Vous avez oublié de retirer votre main, l'animal l'a mangé, essayez d'être plus intelligent");
				player.setHp(player.getHp() - 5, player);
			} else {
				(0, _game.feedbackMessage)('Il a tout mangé et ne vous a pas attaqué');
			}
		}
	};
}

function generateSteal(player, swipeActions) {
	var coinsStealed = (0, _utils.getRandomNumber)(3, 10);
	return {
		name: "steal",
		text: function text() {
			return "Steal " + coinsStealed + " coins";
		},
		img: function img() {
			return "steal.png";
		},
		damage: 5,
		action: function action() {
			if (Math.random() < 0.4 * 10 / player.getAgility()) {
				(0, _game.feedbackMessage)('Vous avez été pris sur le fait');
				player.setHp(player.getHp() - this.damage, player);
			} else {
				(0, _game.feedbackMessage)("Cool, " + coinsStealed + " pièces recuperées");
				player.setCoin(player.getCoin() + coinsStealed);
			}
		}
	};
}

// -----------

// -------------------------------- LOOT ------------------------------------------------------------------------------------------ //
// -------------------------------- LOOT ------------------------------------------------------------------------------------------ //
// -------------------------------- LOOT ------------------------------------------------------------------------------------------ //

function generateHpPotion(player, swipeActions) {
	return {
		name: "hppotion",
		text: function text() {
			return "Prendre la potion (+5 Hp)";
		},
		img: function img() {
			return "hpPotion.png";
		},
		action: function action() {
			player.setHp(player.getHp() + 5, player);
		}
	};
}

function generateMagicMushroom(player, swipeActions) {
	return {
		name: "magicmushroom",
		text: function text() {
			return "Prendre le champignon magique (+5 MaxHp";
		},
		img: function img() {
			return "champignon.png";
		},
		action: function action() {
			player.setMaxHp(player.getMaxHp() + 5);
			player.setHp(player.getHp() + 5, player);
		}
	};
}

function generateBagOfCoins(player, swipeActions) {
	var coinsGained = (0, _utils.getRandomNumber)(3, 6);
	return {
		name: "bagofcoins",
		text: function text() {
			return "Prendre le sac de pièces (" + coinsGained + " pièces)";
		},
		img: function img() {
			return "coinsBag.png";
		},
		action: function action() {
			player.setCoin(player.getCoin() + coinsGained);
		}
	};
}

function generateSpinach(player, swipeActions) {
	return {
		name: "spinach",
		text: function text() {
			return "Prendre les épinards (+2 Hp + 2 Force";
		},
		img: function img() {
			return "spinach.png";
		},
		action: function action() {
			player.setHp(player.getHp() + 2, player);
			player.setStr(player.getStr() + 2);
		}
	};
}

function generateMagicBook(player, swipeActions) {
	return {
		name: "magicbook",
		text: function text() {
			return "Prendre le livre sur la magie (+5 Intel)";
		},
		img: function img() {
			return "magicBook.png";
		},
		action: function action() {
			player.setIntel(player.getIntel() + 5);
		}
	};
}

function generateSpeedShoes(player, swipeActions) {
	return {
		name: "speedshoes",
		text: function text() {
			return "Prendre les chaussures (+3 Agilité)";
		},
		img: function img() {
			return "speedShoes.png";
		},
		action: function action() {
			player.setAgility(player.getAgility() + 3);
		}
	};
}

function generateDumbBell(player, swipeActions) {
	return {
		name: "dumbbell",
		text: function text() {
			return "Prendre l'altère et faire quelques répetitions (+5 Force)";
		},
		img: function img() {
			return "DumbBell.png";
		},
		action: function action() {
			if (player.getIntel() >= 5) {
				player.setStr(player.getStr() + 5);
			} else {
				if (Math.random() < 0.7) {
					(0, _game.feedbackMessage)("Vous n'êtes pas assez intelligent pour porter l'altère, vous vous êtes blaissé");
					player.setHp(player.getHp() - 5, player);
				} else {
					player.setStr(player.getStr() + 5);
				}
			}
		}
	};
}
},{"./utils":5,"./game":7}],8:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('../utils');

var _game = require('../game');

exports.default = {
  startingGenerator: startingGenerator
};


function startingGenerator(player, swipeActions) {
  var name = 'Garde du donjon';
  var desc = 'Equipe toi aventurier';
  var img = 'dungeonGuard.png';

  var availableActions = swipeActions.starting;
  var actionNoDupe = (0, _utils.generateTwoActionsNoDupe)(availableActions);
  var actionLeft = swipeActions.actionsGenerator[actionNoDupe[0].name](player, swipeActions);
  var actionRight = swipeActions.actionsGenerator[actionNoDupe[1].name](player, swipeActions);
  return {
    name: name,
    desc: desc,
    img: img,
    swipeLeft: actionLeft,
    swipeRight: actionRight
  };
}
},{"../utils":5,"../game":7}],14:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('../utils');

var _game = require('../game');

exports.default = {
  rogueGenerator: rogueGenerator,
  wolfGenerator: wolfGenerator,
  spiderGenerator: spiderGenerator,
  gobelinGenerator: gobelinGenerator,
  hugeOgreGenerator: hugeOgreGenerator

};


function rogueGenerator(player, swipeActions) {
  var name = 'voleur';
  var img = 'voleur.png';
  var desc = "Donne moi des pièces ou je te tue!";
  var swipeLeft = swipeActions.actionsGenerator.giveCoins(player, swipeActions);
  var swipeRight = swipeActions.actionsGenerator.attack(player, swipeActions);

  return {
    name: name,
    desc: desc,
    img: img,
    swipeLeft: swipeLeft,
    swipeRight: swipeRight
  };
}

function wolfGenerator(player, swipeActions) {
  var name = 'loup sauvage';
  var img = 'wolf.png';
  var desc = "*Le loup hurle et fonce sur toi*";
  var availableActions = (0, _utils.createAvailableActions)(player, swipeActions, ['monsterGeneral', 'monsterAnimals']);
  var swipeLeft = swipeActions.actionsGenerator[(0, _utils.getObjectByRarity)(availableActions).name](player, swipeActions);
  var swipeRight = swipeActions.actionsGenerator.attack(player, swipeActions);
  // Exceptions 

  if (swipeLeft.name == "scream") {
    var desc = "*Le loup vous regarde avec des yeux rouges*";
  }

  return {
    name: name,
    desc: desc,
    img: img,
    swipeLeft: swipeLeft,
    swipeRight: swipeRight
  };
}

function spiderGenerator(player, swipeActions) {
  var name = 'araignée géante';
  var img = 'spider.png';
  var desc = "*Elle est prête à bondir*";
  var availableActions = (0, _utils.createAvailableActions)(player, swipeActions, ['monsterGeneral', 'monsterAnimals']);
  var swipeLeft = swipeActions.actionsGenerator[(0, _utils.getObjectByRarity)(availableActions).name](player, swipeActions);
  var swipeRight = swipeActions.actionsGenerator.attack(player, swipeActions);
  // Exceptions 

  if (swipeLeft.name == "feed") {
    var desc = "*On dirait qu'elle veut te manger*";
    swipeLeft.damage = 2;
  }

  return {
    name: name,
    desc: desc,
    img: img,
    swipeLeft: swipeLeft,
    swipeRight: swipeRight
  };
}

function gobelinGenerator(player, swipeActions) {
  var name = 'Petit gobelin';
  var img = 'gobelin.png';
  var desc = "Je suis sur que tu as pleins de pièces d'or sur toi!";
  var availableActions = (0, _utils.createAvailableActions)(player, swipeActions, ['monsterGeneral', 'monsterHumanoid']);
  var swipeLeft = swipeActions.actionsGenerator[(0, _utils.getObjectByRarity)(availableActions).name](player, swipeActions);
  var swipeRight = swipeActions.actionsGenerator.attack(player, swipeActions);
  // Exceptions 

  return {
    name: name,
    desc: desc,
    img: img,
    swipeLeft: swipeLeft,
    swipeRight: swipeRight
  };
}

function hugeOgreGenerator(player, swipeActions) {
  var name = 'Enorme Ogre';
  var img = 'ogre.png';
  var desc = "*Il a l'air plutôt robuste*";
  var availableActions = (0, _utils.createAvailableActions)(player, swipeActions, ['monsterGeneral', 'monsterHumanoid']);
  // ajouter l'action fuir en gros nombre dans les availableactions car ça doit arriver plus souvent pour ce mob
  var swipeLeft = swipeActions.actionsGenerator[(0, _utils.getObjectByRarity)(availableActions).name](player, swipeActions);
  var swipeRight = swipeActions.actionsGenerator.attack(player, swipeActions);
  // Exceptions 
  // Prend plus de dmg en général, sur la fuite etc.
  // Il a l'air facile a esquiver en description (50% de chance d'avoir cette description)
  swipeLeft.damage = 5;
  if (swipeLeft.name == "escape") {
    var descF = function descF() {
      if (Math.random() < 0.30) {
        return "*Il a l'air facile à esquiver*";
      } else {
        return "*Il a l'air plutôt robuste*";
      }
    };
    desc = descF();
    swipeLeft.require = 2;
  }

  return {
    name: name,
    desc: desc,
    img: img,
    swipeLeft: swipeLeft,
    swipeRight: swipeRight
  };
}
},{"../utils":5,"../game":7}],13:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('../utils');

var _game = require('../game');

exports.default = {
  BasicChestGenerator: BasicChestGenerator

};


function BasicChestGenerator(player, swipeActions) {
  var name = "coffre";
  var desc = "Il y a deux objets dans ce coffre, lequel utiliser ?";
  var img = "coffre.png";

  var availableActions = swipeActions.basicChest;
  var actionNoDupe = (0, _utils.generateTwoActionsNoDupe)(availableActions);
  var swipeLeft = swipeActions.actionsGenerator[actionNoDupe[0].name](player, swipeActions);
  var swipeRight = swipeActions.actionsGenerator[actionNoDupe[1].name](player, swipeActions);
  return {
    name: name,
    desc: desc,
    img: img,
    swipeLeft: swipeLeft,
    swipeRight: swipeRight
  };
}
},{"../utils":5,"../game":7}],3:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('./utils');

var _swipeActions = require('./swipeActions');

var _swipeActions2 = _interopRequireDefault(_swipeActions);

var _startingroom = require('./rooms/startingroom');

var _startingroom2 = _interopRequireDefault(_startingroom);

var _monsters = require('./rooms/monsters');

var _monsters2 = _interopRequireDefault(_monsters);

var _chest = require('./rooms/chest');

var _chest2 = _interopRequireDefault(_chest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  basicMonsterList: [{ name: 'wolf', rarity: 5 }, { name: 'rogue', rarity: 2 }, { name: 'gobelin', rarity: 3 }, { name: 'spider', rarity: 4 }, { name: 'ogre', rarity: 2 }],

  forestMonsterList: [{ name: 'wolf', rarity: 5 }, { name: 'rogue', rarity: 2 }, { name: 'gobelin', rarity: 3 }, { name: 'spider', rarity: 2 }, { name: 'boar', rarity: 5 }, { name: 'shroom', rarity: 4 },
  // Monstre plus complexe (un buisson qui fait du bruit, que faire, en fait c'est un monstre caché)
  { name: 'unicorn', rarity: 1 }],

  chestList: [{ name: 'basicChest', rarity: 100 }],

  roomGenerator: {
    basicChest: _chest2.default.BasicChestGenerator,
    starting: _startingroom2.default.startingGenerator,

    wolf: _monsters2.default.wolfGenerator,
    rogue: _monsters2.default.rogueGenerator,
    gobelin: _monsters2.default.gobelinGenerator,
    spider: _monsters2.default.spiderGenerator,
    ogre: _monsters2.default.hugeOgreGenerator
  }

  /*
      Sérieusement les actions ont besoins d'avoir accès aux info du monstre (qui a l'action)
      pour pouvoir personnalisé les feedbackMessage
      Les actions doivent aussi avoir accès aux loot car on peut loot des objets avec certaines actions
  
      Mettre au point le systeme de require (le niveau requis pour qu'une action marche, et le % de réussite)
      Mettre au point le systeme de difficulté progressive(plus difficile de réussir les actions en fonction du niveau)
  
  
  
      Monstre zombie : si tu lui suce le sang (si ton perso est devenu un vampire)
      tu perds de la vie, tu attrappe une maladie(prendre du dmg sur plusieurs tour)
  
      possibilité d'apprendre des nouvelles aptitudes au près de personnage divers
  
      ce serait une bonne idée de ne pas avoir le choix de droit lock sur une action!
      --> mettre en point un algorithme qui permet d'avoir toujours 2 choix sensé ?
      --> peut être juste deux type d'action, les actions attaques (à droite)
      --> et les actions plus funky à gauche
  
  */
  /*
  
      est ce qu'on met un systeme de vie au monstres ?? si oui comment ça fonctionne?
      avec des action dans le genre nourrir, caresser l'animal, crier etc.
      est ce que les dmg du monstre seraient indiquer sur la carte (bof, bof..)
      
      Scenario:
      - on commence dans une auberge
      - un personnage nous parle d'un trésor qui rend immortel caché dans la forêt
      - grosse partie de dialogue
      - finalement on décide de partir à la recherche du trésor
      - que prendre pour partir à l'aventure (un arc, une épée ou un baton magique?)
      - aller dans la forêt maudite où pourrait trouver le fameux trésor
      - On peut passer par différentes zone, le chemin feuillu ou le chemin aux arbres morts
      - puis après quelqu'un indique la direction du trésor, dans une grotte par exemple
      - le perso rentre dans la grotte pour y trouver le fameux trésor
  
  */

};
},{"./utils":5,"./swipeActions":6,"./rooms/startingroom":8,"./rooms/monsters":14,"./rooms/chest":13}],4:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gainLevel = gainLevel;

var _utils = require("./utils");

exports.default = {
  stats: {
    hp: 20,
    maxHp: 20,
    coin: 20,
    str: (0, _utils.getRandomNumber)(3, 7),
    intel: (0, _utils.getRandomNumber)(3, 7),
    agility: (0, _utils.getRandomNumber)(3, 7),
    level: 1,
    roleStats: 5,
    role: "none",
    weapon: "sword",
    weaponImg: "sword.png",
    defaultAttack: "Attaquer"
  },
  thisRoom: {
    isLastRoom: true,
    nextRoom: function nextRoom() {
      console.log("newRoom");
    }
  },
  setHp: function setHp(nbr, player) {
    if (nbr > player.getMaxHp()) {
      this.stats.hp = player.getMaxHp();
    } else {
      this.stats.hp = nbr;
    }
  },
  getHp: function getHp() {
    return this.stats.hp;
  },
  setMaxHp: function setMaxHp(nbr) {
    this.stats.maxHp = nbr;
  },
  getMaxHp: function getMaxHp() {
    return this.stats.maxHp;
  },
  setCoin: function setCoin(nbr) {
    this.stats.coin = nbr;
  },
  getCoin: function getCoin() {
    return this.stats.coin;
  },
  setStr: function setStr(nbr) {
    this.stats.str = nbr;
  },
  getStr: function getStr() {
    return this.stats.str;
  },
  setIntel: function setIntel(nbr) {
    this.stats.intel = nbr;
  },
  getIntel: function getIntel() {
    return this.stats.intel;
  },
  setAgility: function setAgility(nbr) {
    this.stats.agility = nbr;
  },
  getAgility: function getAgility() {
    return this.stats.agility;
  },
  setLevel: function setLevel(nbr) {
    this.stats.level = nbr;
  },
  getLevel: function getLevel() {
    return this.stats.level;
  },
  setRole: function setRole(role) {
    this.stats.role = role;
  },
  getRole: function getRole() {
    return this.stats.role;
  },
  setRoleStats: function setRoleStats(nbr) {
    this.stats.roleStats = nbr;
  },
  getRoleStats: function getRoleStats() {
    return this.role.mainStats;
  }
};
function gainLevel(player) {
  player.setLevel(player.getLevel() + 1);
}
},{"./utils":5}],2:[function(require,module,exports) {
'use strict';

var _room = require('./room');

var _room2 = _interopRequireDefault(_room);

var _player = require('./player');

var _player2 = _interopRequireDefault(_player);

var _swipeActions = require('./swipeActions');

var _swipeActions2 = _interopRequireDefault(_swipeActions);

var _utils = require('./utils');

var _game = require('./game');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

$(document).ready(function () {

	var currentRoom = (0, _game.getNewRoom)(_room2.default, _swipeActions2.default, _player2.default);
	(0, _game.writeStats)(_player2.default);
	(0, _game.writeRoom)(currentRoom);
	console.log(_player2.default);

	var card = document.getElementsByClassName('card-visible')[0];
	var tracker = document.getElementById('card-tracker');
	var mc = new Hammer(tracker);

	// add a "PAN" recognizer to it (all directions)
	mc.add(new Hammer.Pan({ direction: Hammer.DIRECTION_HORIZONTAL, threshold: 20 }));

	// tie in the handler that will be called
	mc.on("pan", handleDrag);

	var lastPosX = 0;
	var lastPosY = 0;
	var isDragging = false;
	function handleDrag(ev) {

		// for convience, let's get a reference to our object
		var elem = ev.target;

		// DRAG STARTED
		// here, let's snag the current position
		// and keep track of the fact that we're dragging
		if (!isDragging) {
			isDragging = true;
			lastPosX = elem.offsetLeft;
		}

		if (elem.offsetLeft > 50) {
			card.classList.add("yes");
			card.classList.remove("no");
		} else if (elem.offsetLeft < -50) {
			card.classList.add("no");
			card.classList.remove("yes");
		} else {
			card.classList.remove("yes");
			card.classList.remove("no");
		}

		// we simply need to determine where the x,y of this
		// object is relative to where it's "last" known position is
		// NOTE: 
		//    deltaX and deltaY are cumulative
		// Thus we need to always calculate 'real x and y' relative
		// to the "lastPosX/Y"
		var posX = ev.deltaX + lastPosX;

		// move our element to that position
		elem.style.left = posX + "px";

		// DRAG ENDED
		// this is where we simply forget we are dragging
		if (ev.isFinal) {
			isDragging = false;

			if (elem.offsetLeft > 50) {
				elem.style.left = 0 + "px";
				card.classList.add("yesFade");
				card.classList.remove("noFade");
				setTimeout(function () {
					card.classList.remove("yesFade");card.classList.remove("yes");
				}, 500);
				currentRoom.swipeRight.action();
				(0, _player.gainLevel)(_player2.default);
				currentRoom = (0, _game.getNewRoom)(_room2.default, _swipeActions2.default, _player2.default);
				(0, _game.writeStats)(_player2.default);
				(0, _game.writeRoom)(currentRoom);
			} else if (elem.offsetLeft < -50) {
				elem.style.left = 0 + "px";
				card.classList.add("noFade");
				card.classList.remove("yesFade");
				setTimeout(function () {
					card.classList.remove("noFade");card.classList.remove("no");
				}, 500);
				_player2.default.thisRoom.isLastRoom = true;
				currentRoom.swipeLeft.action();
				if (_player2.default.thisRoom.isLastRoom == false) {
					/*
     Mettre en place un système qui si la desc, l'img ou le swipeLeft/swipeRight n'est pas définis
     ne pas le remplacer par un "undefined" et donc laisser la valeur existante
     */
					currentRoom.desc = _player2.default.thisRoom.nextRoom.desc;
					currentRoom.swipeLeft = _player2.default.thisRoom.nextRoom.swipeLeft;
					(0, _game.writeStats)(_player2.default);
					(0, _game.writeRoom)(currentRoom);
				} else {
					(0, _player.gainLevel)(_player2.default);
					currentRoom = (0, _game.getNewRoom)(_room2.default, _swipeActions2.default, _player2.default);
					(0, _game.writeStats)(_player2.default);
					(0, _game.writeRoom)(currentRoom);
				}
			} else {
				elem.style.left = 0 + "px";
				card.classList.remove("yesFade");
				card.classList.remove("noFade");
			}
		}
	}
});
},{"./room":3,"./player":4,"./swipeActions":6,"./utils":5,"./game":7}],17:[function(require,module,exports) {

var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '52474' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + 'data.error.stack');
    }
  };
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id);
  });
}
},{}]},{},[17,2])
//# sourceMappingURL=/dist/6a126c7d272723ad8a0d8e06d571db3b.map