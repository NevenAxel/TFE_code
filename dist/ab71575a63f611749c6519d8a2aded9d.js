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

      var module = cache[name] = new newRequire.Module;

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

  function Module() {
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({7:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRandomNumber = getRandomNumber;
exports.randomProperties = randomProperties;
exports.randomOne = randomOne;
exports.getRandomAction = getRandomAction;
exports.getObjectByRarity = getObjectByRarity;
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
  var minimRarity = Math.random() * 100;
  var availableObjects = objectList.filter(object => object.rarity > minimRarity);
  return availableObjects[Math.floor(Math.random() * availableObjects.length)];
}
},{}],8:[function(require,module,exports) {
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

function getNewRoom(monsters, loot, swipeActions, player) {
    if (player.getLevel() === 1) {
        return loot.unique.starting(player, swipeActions, 100);
    }
    if (player.getLevel() % 5 === 0) {
        return (0, _utils.getObjectByRarity)(loot.chest(player, swipeActions));
    } else {
        return (0, _utils.getObjectByRarity)(monsters.basic(player, swipeActions));
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
},{"./utils":7}],3:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('./utils');

var _game = require('./game');

function rogueGenerator(player, swipeActions, rarity) {
  var name = 'voleur';
  var rarity = rarity;
  var img = 'voleur.png';
  var desc = "Donne moi des pièces ou je te tue!";
  var swipeLeft = swipeActions.monsters.unique.givecoins(player, 100);
  var swipeRight = swipeActions.monsters.unique.attack(player, 100);

  return {
    name: name,
    rarity: rarity,
    desc: desc,
    img: img,
    swipeLeft: swipeLeft,
    swipeRight: swipeRight
  };
}

function wolfGenerator(player, swipeActions, rarity) {
  var name = 'loup sauvage';
  var rarity = rarity;
  var img = 'wolf.png';
  var desc = "Wouaf wouaf!";
  var availableActions = swipeActions.monsters.animals(player);
  var swipeLeft = (0, _utils.getObjectByRarity)(availableActions);
  var swipeRight = swipeActions.monsters.unique.attack(player, 100);

  // Exceptions 

  if (swipeLeft.name == "scream") {
    var desc = "*feared* wouaf wouaf!";
    swipeLeft.damage = 2;
  }

  return {
    name: name,
    rarity: rarity,
    desc: desc,
    img: img,
    swipeLeft: swipeLeft,
    swipeRight: swipeRight
  };
}

/*
function hugeOgreGenerator(swipeActions, player) {
  return {
    name: 'Ogre gigantesque',
    desc:function () {return 'Viens, rapproche toi...'}, 
    img:'Ogre.png', 
    swipeRight: swipeActions.monsters.attack(player, 5),
    swipeLeft: randomOne(
      swipeActions.monsters.escape(player, 10, 2),
    ),
  }
}

function gobelinGenerator(swipeActions, player) {
  return {
    name: 'Petit gobelin',
    desc:function () {return "* Il ne vous a pas encore vu *"}, 
    img:'gobelin.png', 
    swipeRight: swipeActions.monsters.attack(player, 3),
    swipeLeft: gobelinGeneratorSwipeLeft(swipeActions, player)
    
  }
}
function gobelinGeneratorSwipeLeft(swipeActions, player) {
  var availableActions = [
        swipeActions.monsters.escape(player, 5, 8),
        swipeActions.monsters.scream(player, 4, 12),
      ];
      if (player.getAgility() > 10){
        availableActions.push(swipeActions.monsters.steal(player, 5, 10))
      }
      return randomProperties(availableActions);
}
*/

exports.default = {
  basic: function getMonsterBasic(player, swipeActions) {
    var monsters = [];
    monsters.push(rogueGenerator(player, swipeActions, 50));
    monsters.push(wolfGenerator(player, swipeActions, 100));
    return monsters;
  }
};
},{"./utils":7,"./game":8}],4:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('./utils');

function chestGenerator(player, swipeActions, rarity) {
  var name = "coffre";
  var rarity = rarity;
  var desc = "Il y a deux objets dans ce coffre, lequel utiliser ?";
  var img = "coffre.png";

  var availableActions = swipeActions.loot.chest(player);
  var actionNoDupe = generateTwoActionsNoDupe(availableActions);
  var swipeLeft = actionNoDupe[0];
  var swipeRight = actionNoDupe[1];
  return {
    name: name,
    rarity: rarity,
    desc: desc,
    img: img,
    swipeLeft: swipeLeft,
    swipeRight: swipeRight
  };
}

function startingGenerator(player, swipeActions, rarity) {
  var name = 'Garde du donjon';
  var rarity = rarity;
  var desc = 'Equipe toi aventurier';
  var img = 'dungeonGuard.png';

  var availableActions = swipeActions.special.starting(player);
  var actionNoDupe = generateTwoActionsNoDupe(availableActions);
  var actionLeft = actionNoDupe[0];
  var actionRight = actionNoDupe[1];
  return {
    name: name,
    rarity: rarity,
    desc: desc,
    img: img,
    swipeLeft: actionLeft,
    swipeRight: actionRight
  };
}

exports.default = {
  chest: function getChest(player, swipeActions) {
    var chest = [];
    chest.push(chestGenerator(player, swipeActions, 100));
    return chest;
  },
  unique: {
    starting: startingGenerator
  }
};


function generateTwoActionsNoDupe(availableActions) {
  var actionLeft = (0, _utils.getObjectByRarity)(availableActions);
  var actionRight = (0, _utils.getObjectByRarity)(availableActions.filter(function (action) {
    return action.name !== actionLeft.name;
  }));
  return [actionLeft, actionRight];
}
},{"./utils":7}],5:[function(require,module,exports) {
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
  setHp: function (nbr, player) {
    if (nbr > player.getMaxHp()) {
      this.stats.hp = player.getMaxHp();
    } else {
      this.stats.hp = nbr;
    }
  },
  getHp: function () {
    return this.stats.hp;
  },
  setMaxHp: function (nbr) {
    this.stats.maxHp = nbr;
  },
  getMaxHp: function () {
    return this.stats.maxHp;
  },
  setCoin: function (nbr) {
    this.stats.coin = nbr;
  },
  getCoin: function () {
    return this.stats.coin;
  },
  setStr: function (nbr) {
    this.stats.str = nbr;
  },
  getStr: function () {
    return this.stats.str;
  },
  setIntel: function (nbr) {
    this.stats.intel = nbr;
  },
  getIntel: function () {
    return this.stats.intel;
  },
  setAgility: function (nbr) {
    this.stats.agility = nbr;
  },
  getAgility: function () {
    return this.stats.agility;
  },
  setLevel: function (nbr) {
    this.stats.level = nbr;
  },
  getLevel: function () {
    return this.stats.level;
  },
  setRole: function (role) {
    this.stats.role = role;
  },
  getRole: function () {
    return this.stats.role;
  },
  setRoleStats: function (nbr) {
    this.stats.roleStats = nbr;
  },
  getRoleStats: function () {
    return this.role.mainStats;
  }
};
function gainLevel(player) {
  player.setLevel(player.getLevel() + 1);
}
},{"./utils":7}],6:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utils = require('./utils');

var _game = require('./game');

function generateWand(player, rarity) {
	return {
		name: "wandstart",
		rarity: rarity,
		text: function () {
			return "Prendre le baton magique";
		},
		img: function () {
			return "wand.png";
		},
		action: function () {
			player.setRole('mage');
			player.setIntel(player.getIntel() + 5);
		}
	};
}

function generateSword(player, rarity) {
	return {
		name: "swordstart",
		rarity: rarity,
		text: function () {
			return "Prendre l'epée";
		},
		img: function () {
			return "epee.png";
		},
		action: function () {
			player.setRole('warrior');
			player.setStr(player.getStr() + 5);
			player.setMaxHp(player.getMaxHp() + 5);
			player.setHp(player.getHp() + 5, player);
		}
	};
}

function generateBow(player, rarity) {
	return {
		name: "bowstart",
		rarity: rarity,
		text: function () {
			return "Prendre l'arc";
		},
		img: function () {
			return "arc.png";
		},
		action: function () {
			player.setRole('rogue');
			player.setAgility(player.getAgility() + 5);
		}
	};
}

// -------------------------------- MONSTERS ------------------------------------------------------------------------------------------ //
// -------------------------------- MONSTERS ------------------------------------------------------------------------------------------ //
// -------------------------------- MONSTERS ------------------------------------------------------------------------------------------ //


function generateAttack(player, rarity) {
	return {
		name: "attack",
		rarity: rarity,
		damage: 3,
		text: function () {
			return player.stats.defaultAttack;
		},
		img: function () {
			return player.stats.weaponImg;
		},
		action: function () {
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

function generateGiveCoins(player, rarity) {
	return {
		name: "givecoins",
		rarity: rarity,
		coinsGiven: (0, _utils.getRandomNumber)(1, 6),
		text: function () {
			return "Donner " + this.coinsGiven + " pièces";
		},
		img: function () {
			return "giveCoins.png";
		},
		action: function () {
			if (player.getCoin() - this.coinsGiven < 0) {
				(0, _game.feedbackMessage)("N'ESSAYER PAS DE M'ARNAQUER J'AI VU QUE VOUS N'AVIEZ PAS ASSEZ!");
				player.setCoin(0);
				player.setHp(player.getHp() - 10, player);
			} else if (this.coinsGiven == 1) {
				(0, _game.feedbackMessage)("Seulement une pièce ? Tu te fout de moi ?!");
				// nouveau dialogue, avec comme réponses "heuu non" ou "tien prend ces pièces en plus"
				player.setHp(player.getHp() - 5, player);
			} else {
				player.setCoin(player.getCoin() - this.coinsGiven);
			}
		}
	};
}

function generateScream(player, rarity) {
	return {
		name: "scream",
		rarity: rarity,
		require: 10,
		damage: 5,
		text: function () {
			return "Crier pour l'effrayer";
		},
		img: function () {
			return "scream.png";
		},
		action: function () {
			if (player.getStr() >= this.require) {
				(0, _game.feedbackMessage)("L'ennemi s'est chier dessus et est partit en courant");
			} else {
				(0, _game.feedbackMessage)("Votre cris n'est pas assez fort, gagnez un peu plus de force!");
				player.setHp(player.getHp() - this.damage, player);
			}
		}
	};
}

function generateEscape(player, rarity) {
	return {
		name: "escape",
		rarity: rarity,
		text: function () {
			return "S'echapper";
		},
		img: function () {
			return "escape.png";
		},
		action: function () {
			if (player.getAgility() >= 5) {
				if (Math.random() < 0.3 * 5 / player.getAgility()) {
					(0, _game.feedbackMessage)('Pas de chance, vous avez trébucher sur une pierre');
					player.setHp(player.getHp() - 3, player);
				} else {
					(0, _game.feedbackMessage)("Vous vous êtes enfuis avec succes");
				}
			} else {
				(0, _game.feedbackMessage)("Vous n'êtes pas assez rapide! Ouch!");
				player.setHp(player.getHp() - 3, player);
			}
		}
	};
}

function generateFeed(player, rarity) {
	return {
		name: "feed",
		rarity: rarity,
		text: function () {
			return "Nourrir l'animal";
		},
		img: function () {
			return "feed.png";
		},
		action: function () {
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

function generateSteal(player, rarity) {
	var coinsStealed = (0, _utils.getRandomNumber)(3, 10);
	return {
		name: "steal",
		rarity: rarity,
		text: function () {
			return "Steal " + coinsStealed + " coins";
		},
		img: function () {
			return "steal.png";
		},
		action: function () {
			if (Math.random() < 0.4 * 10 / player.getAgility()) {
				(0, _game.feedbackMessage)('Vous avez été pris sur le fait');
				player.setHp(player.getHp() - 3, player);
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

function generateHpPotion(player, rarity) {
	return {
		name: "hppotion",
		rarity: rarity,
		text: function () {
			return "Prendre la potion (+5 Hp)";
		},
		img: function () {
			return "hpPotion.png";
		},
		action: function () {
			player.setHp(player.getHp() + 5, player);
		}
	};
}

function generateMagicMushroom(player, rarity) {
	return {
		name: "magicmushroom",
		rarity: rarity,
		text: function () {
			return "Prendre le champignon magique (+5 MaxHp";
		},
		img: function () {
			return "champignon.png";
		},
		action: function () {
			player.setMaxHp(player.getMaxHp() + 5);
			player.setHp(player.getHp() + 5, player);
		}
	};
}

function generateBagOfCoins(player, rarity) {
	var coinsGained = (0, _utils.getRandomNumber)(3, 6);
	return {
		name: "bagofcoins",
		rarity: rarity,
		text: function () {
			return "Prendre le sac de pièces (" + coinsGained + " pièces)";
		},
		img: function () {
			return "coinsBag.png";
		},
		action: function () {
			player.setCoin(player.getCoin() + coinsGained);
		}
	};
}

function generateSpinach(player, rarity) {
	return {
		name: "spinach",
		rarity: rarity,
		text: function () {
			return "Prendre les épinards (+2 Hp + 2 Force";
		},
		img: function () {
			return "spinach.png";
		},
		action: function () {
			player.setHp(player.getHp() + 2, player);
			player.setStr(player.getStr() + 2);
		}
	};
}

function generateMagicBook(player, rarity) {
	return {
		name: "magicbook",
		rarity: rarity,
		text: function () {
			return "Prendre le livre sur la magie (+5 Intel)";
		},
		img: function () {
			return "magicBook.png";
		},
		action: function () {
			player.setIntel(player.getIntel() + 5);
		}
	};
}

function generateSpeedShoes(player, rarity) {
	return {
		name: "speedshoes",
		rarity: rarity,
		text: function () {
			return "Prendre les chaussures (+3 Agilité)";
		},
		img: function () {
			return "speedShoes.png";
		},
		action: function () {
			player.setAgility(player.getAgility() + 3);
		}
	};
}

function generateDumbBell(player, rarity) {
	return {
		name: "dumbbell",
		rarity: rarity,
		text: function () {
			return "Prendre l'altère et faire quelques répetitions (+5 Force)";
		},
		img: function () {
			return "DumbBell.png";
		},
		action: function () {
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

// -------------------------------- EXPORT DEFAULT -------------------------------------------------- //

exports.default = {
	monsters: {
		general: function getActionGeneral(player) {
			var actions = [];
			actions.push(generateEscape(player, 100));
			return actions;
		},
		animals: function getActionAnimals(player) {
			var actions = [];
			actions.push(generateScream(player, 100));
			actions.push(generateFeed(player, 100));
			//actions.push(generatePet(player, 100));
			return actions;
		},
		humanoid: function getActionHumanoid(player) {
			var actions = [];
			actions.push(generateSteal(player, 100));
			return actions;
		},
		unique: {
			attack: generateAttack,
			givecoins: generateGiveCoins
		}
	},
	loot: {
		chest: function getActionChest(player) {
			var actions = [];
			actions.push(generateHpPotion(player, 100));
			actions.push(generateBagOfCoins(player, 100));
			actions.push(generateSpinach(player, 50));
			actions.push(generateMagicBook(player, 50));
			actions.push(generateSpeedShoes(player, 50));
			actions.push(generateDumbBell(player, 50));
			actions.push(generateMagicMushroom(player, 30));
			return actions;
		}
	},
	special: {
		starting: function getActionStarting(player) {
			var actions = [];
			actions.push(generateWand(player, 100));
			actions.push(generateSword(player, 100));
			actions.push(generateBow(player, 100));
			return actions;
		}
	}
};
},{"./utils":7,"./game":8}],2:[function(require,module,exports) {
'use strict';

var _monsters = require('./monsters');

var _monsters2 = _interopRequireDefault(_monsters);

var _loot = require('./loot');

var _loot2 = _interopRequireDefault(_loot);

var _player = require('./player');

var _player2 = _interopRequireDefault(_player);

var _swipeActions = require('./swipeActions');

var _swipeActions2 = _interopRequireDefault(_swipeActions);

var _utils = require('./utils');

var _game = require('./game');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

$(document).ready(function () {

	var currentRoom = (0, _game.getNewRoom)(_monsters2.default, _loot2.default, _swipeActions2.default, _player2.default);
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
				currentRoom = (0, _game.getNewRoom)(_monsters2.default, _loot2.default, _swipeActions2.default, _player2.default);
				(0, _game.writeStats)(_player2.default);
				(0, _game.writeRoom)(currentRoom);
			} else if (elem.offsetLeft < -50) {
				elem.style.left = 0 + "px";
				card.classList.add("noFade");
				card.classList.remove("yesFade");
				setTimeout(function () {
					card.classList.remove("noFade");card.classList.remove("no");
				}, 500);
				currentRoom.swipeLeft.action();
				(0, _player.gainLevel)(_player2.default);
				currentRoom = (0, _game.getNewRoom)(_monsters2.default, _loot2.default, _swipeActions2.default, _player2.default);
				(0, _game.writeStats)(_player2.default);
				(0, _game.writeRoom)(currentRoom);
			} else {
				elem.style.left = 0 + "px";
				card.classList.remove("yesFade");
				card.classList.remove("noFade");
			}
		}
	}
});

/*
console.log('current room: ', currentRoom);

currentRoom.swipeLeft.action();

console.log('player:', player);
*/
},{"./monsters":3,"./loot":4,"./player":5,"./swipeActions":6,"./utils":7,"./game":8}],20:[function(require,module,exports) {

var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module() {
  OldModule.call(this);
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

if (!module.bundle.parent && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var ws = new WebSocket('ws://' + hostname + ':' + '51385' + '/');
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
},{}]},{},[20,2])
//# sourceMappingURL=/dist/ab71575a63f611749c6519d8a2aded9d.map