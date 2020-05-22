/**
*	@filename	ToolsThread.js
*	@author		kolton
*	@desc		several tools to help the player - potion use, chicken, Diablo clone stop, map reveal, quit with player
*/

js_strict(true);

include("json2.js");
include("NTItemParser.dbl");
include("OOG.js");
include("AutoMule.js");
include("Gambling.js");
include("CraftingSystem.js");
include("TorchSystem.js");
include("MuleLogger.js");
include("common/Attack.js");
include("common/Cubing.js");
include("common/CollMap.js");
include("common/Config.js");
include("common/Loader.js");
include("common/misc.js");
include("common/util.js");
include("common/Pickit.js");
include("common/Pather.js");
include("common/Precast.js");
include("common/Prototypes.js");
include("common/Runewords.js");
include("common/Storage.js");
include("common/Town.js");
include("AutoRogerThat.js");
const sdk = require('../libs/modules/sdk')

function main() {
	var i, mercHP, ironGolem, tick, merc,
		preArea,
		preAct,
		debugInfo = {area: 0, currScript: "no entry"},
		pingTimer = [],
		quitFlag = false,
		lastGameFlag = false,
		pvpTimeFlag = false,
		quitListDelayTime,
		cloneWalked = false,
		canQuit = true,
		timerLastDrink = [];

	print("ÿc3Start ToolsThread script");
	D2Bot.init();
	Config.init(false);
	Pickit.init(false);
	Attack.init();
	Storage.Init();
	CraftingSystem.buildLists();
	Runewords.init();
	Cubing.init();

	for (i = 0; i < 5; i += 1) {
		timerLastDrink[i] = 0;
	}

	// Reset core chicken
	me.chickenhp = -1;
	me.chickenmp = -1;

	// General functions
	this.checkPing = function (print) {
		// Quit after at least 5 seconds in game
		if (getTickCount() - me.gamestarttime < 5000) {
			return false;
		}

		var i;

		for (i = 0; i < Config.PingQuit.length; i += 1) {
			if (Config.PingQuit[i].Ping > 0) {
				if (me.ping >= Config.PingQuit[i].Ping) {
					// me.overhead("High Ping");

					if (pingTimer[i] === undefined || pingTimer[i] === 0) {
						pingTimer[i] = getTickCount();
					}

					if (getTickCount() - pingTimer[i] >= Config.PingQuit[i].Duration * 1000) {
						if (print) {
							D2Bot.printToConsole("High ping (" + me.ping + "/" + Config.PingQuit[i].Ping + ") - leaving game.", 9);
						}

						scriptBroadcast("pingquit");

						return true;
					}
				} else {
					pingTimer[i] = 0;
				}
			}
		}

		return false;
	};

	this.initQuitList = function () {
		var i, string, obj,
			temp = [];

		for (i = 0; i < Config.QuitList.length; i += 1) {
			if (FileTools.exists("data/" + Config.QuitList[i] + ".json")) {
				string = Misc.fileAction("data/" + Config.QuitList[i] + ".json", 0);

				if (string) {
					obj = JSON.parse(string);

					if (obj && obj.hasOwnProperty("name")) {
						temp.push(obj.name);
					}
				}
			}
		}

		Config.QuitList = temp.slice(0);
	};

	this.getPotion = function (pottype, type) {
		var i,
			items = me.getItems();

		if (!items || items.length === 0) {
			return false;
		}

		// Get highest id = highest potion first
		items.sort(function (a, b) {
			return b.classid - a.classid;
		});

		for (i = 0; i < items.length; i += 1) {
			if (type < 3 && items[i].mode === 0 && items[i].location === 3 && items[i].itemType === pottype) {
				print("ÿc2Drinking potion from inventory.");

				return copyUnit(items[i]);
			}

			if (items[i].mode === 2 && items[i].itemType === pottype) {
				return copyUnit(items[i]);
			}
		}

		return false;
	};

	this.togglePause = function () {
		var i,	script,
			scripts = ["default.dbj", "tools/townchicken.js", "tools/antihostile.js", "tools/party.js", "tools/rushthread.js"];

		for (i = 0; i < scripts.length; i += 1) {
			script = getScript(scripts[i]);

			if (script) {
				if (script.running) {
					if (i === 0) { // default.dbj
						print("ÿc1Pausing.");
					}

					// don't pause townchicken during clone walk
					if (scripts[i] !== "tools/townchicken.js" || !cloneWalked) {
						script.pause();
					}
				} else {
					if (i === 0) { // default.dbj
						print("ÿc2Resuming.");
					}

					script.resume();
				}
			}
		}

		return true;
	};

	this.stopDefault = function () {
		var script = getScript("default.dbj");

		if (script && script.running) {
			script.stop();
		}

		return true;
	};

	this.exit = function () {
		this.stopDefault();
		quit();
	};

	this.drinkPotion = function (type) {
		var pottype, potion,
			tNow = getTickCount();

		switch (type) {
		case 0:
		case 1:
			if ((timerLastDrink[type] && (tNow - timerLastDrink[type] < 1000)) || me.getState(type === 0 ? 100 : 106)) {
				return false;
			}

			break;
		case 2:
			if (timerLastDrink[type] && (tNow - timerLastDrink[type] < 300)) { // small delay for juvs just to prevent using more at once
				return false;
			}

			break;
		case 4:
			if (timerLastDrink[type] && (tNow - timerLastDrink[type] < 2000)) { // larger delay for juvs just to prevent using more at once, considering merc update rate
				return false;
			}

			break;
		default:
			if (timerLastDrink[type] && (tNow - timerLastDrink[type] < 8000)) {
				return false;
			}

			break;
		}

		if (me.mode === 0 || me.mode === 17 || me.mode === 18) { // mode 18 - can't drink while leaping/whirling etc.
			return false;
		}

		switch (type) {
		case 0:
		case 3:
			pottype = 76;

			break;
		case 1:
			pottype = 77;

			break;
		default:
			pottype = 78;

			break;
		}

		potion = this.getPotion(pottype, type);

		if (potion) {
			if (me.mode === 0 || me.mode === 17) {
				return false;
			}

			if (type < 3) {
				potion.interact();
			} else {
				try {
					clickItem(2, potion);
				} catch (e) {
					print("Couldn't give the potion to merc.");
				}
			}

			timerLastDrink[type] = getTickCount();

			return true;
		}

		return false;
	};

	this.getNearestMonster = function () {
		var gid, distance,
			monster = getUnit(1),
			range = 30;

		if (monster) {
			do {
				if (monster.hp > 0 && Attack.checkMonster(monster) && !monster.getParent()) {
					distance = getDistance(me, monster);

					if (distance < range) {
						range = distance;
						gid = monster.gid;
					}
				}
			} while (monster.getNext());
		}

		if (gid) {
			monster = getUnit(1, -1, -1, gid);
		} else {
			monster = false;
		}

		if (monster) {
			return " to " + monster.name;
		}

		return "";
	};

	this.checkVipers = function () {
		var owner,
			monster = getUnit(1, 597);

		if (monster) {
			do {
				if (monster.getState(96)) {
					owner = monster.getParent();

					if (owner && owner.name !== me.name) {
						return true;
					}
				}
			} while (monster.getNext());
		}

		return false;
	};

	this.getIronGolem = function () {
		var owner,
			golem = getUnit(1, 291);

		if (golem) {
			do {
				owner = golem.getParent();

				if (owner && owner.name === me.name) {
					return copyUnit(golem);
				}
			} while (golem.getNext());
		}

		return false;
	};

	this.getNearestPreset = function () {
		var i, unit, dist, id;

		unit = getPresetUnits(me.area);
		dist = 99;

		for (i = 0; i < unit.length; i += 1) {
			if (getDistance(me, unit[i].roomx * 5 + unit[i].x, unit[i].roomy * 5 + unit[i].y) < dist) {
				dist = getDistance(me, unit[i].roomx * 5 + unit[i].x, unit[i].roomy * 5 + unit[i].y);
				id = unit[i].type + " " + unit[i].id;
			}
		}

		return id || "";
	};

	this.getStatsString = function (unit) {
		var realFCR = unit.getStat(sdk.stats.Fastercastrate);
		var realIAS = unit.getStat(sdk.stats.Fasterattackrate);
		var realFBR = unit.getStat(sdk.stats.Fasterblockrate);
		var realFHR = unit.getStat(sdk.stats.Fastergethitrate);
		// me.getStat(105) will return real FCR from gear + Config.FCR from char cfg
		if (unit == me)
		{
		        realFCR -= Config.FCR;
		        realIAS -= Config.IAS;
		        realFBR -= Config.FBR;
		        realFHR -= Config.FHR;
		}
		var maxHellFireRes = 75 + unit.getStat(sdk.stats.Maxfireresist);
		var hellFireRes = unit.getStat(sdk.stats.Fireresist) - 100;
		if (hellFireRes > maxHellFireRes)
		        hellFireRes = maxHellFireRes;
		var maxHellColdRes = 75 + unit.getStat(sdk.stats.Maxcoldresist);
		var hellColdRes = unit.getStat(sdk.stats.Coldresist) - 100;
		if (hellColdRes > maxHellColdRes)
		        hellColdRes = maxHellColdRes;
		var maxHellLightRes = 75 + unit.getStat(sdk.stats.Maxlightresist);
		var hellLightRes = unit.getStat(sdk.stats.Lightresist) - 100;
		if (hellLightRes > maxHellLightRes)
		        hellLightRes = maxHellLightRes;
		var maxHellPoisonRes = 75 + unit.getStat(sdk.stats.Maxpoisonresist);
		var hellPoisonRes = unit.getStat(sdk.stats.Poisonresist) - 100;
		if (hellPoisonRes > maxHellPoisonRes)
		        hellPoisonRes = maxHellPoisonRes;
		var str = "ÿc4MF: ÿc0" + unit.getStat(sdk.stats.Magicbonus) + "ÿc4 GF: ÿc0" + unit.getStat(sdk.stats.Goldbonus) +
		"ÿc1 FR: ÿc0" + unit.getStat(sdk.stats.Fireresist) + "ÿc1 Max FR: ÿc0" + unit.getStat(sdk.stats.Maxfireresist) +
		"ÿc3 CR: ÿc0" + unit.getStat(sdk.stats.Coldresist) + "ÿc3 Max CR: ÿc0" + unit.getStat(sdk.stats.Maxcoldresist) +
		"ÿc9 LR: ÿc0" + unit.getStat(sdk.stats.Lightresist) + "ÿc9 Max LR: ÿc0" + unit.getStat(sdk.stats.Maxlightresist) +
		"ÿc2 PR: ÿc0" + unit.getStat(sdk.stats.Poisonresist) + "ÿc2 Max PR: ÿc0" + unit.getStat(sdk.stats.Maxpoisonresist) +
		"\n" +
		"Hell res: ÿc1" + hellFireRes + "ÿc0/ÿc3" + hellColdRes + "ÿc0/ÿc9" + hellLightRes + "ÿc0/ÿc2" + hellPoisonRes +
		"ÿc0\n" +
		"FCR: " + realFCR + " IAS: " + realIAS + " FBR: " + realFBR +
		" FHR: " + realFHR + " FRW: " + unit.getStat(sdk.stats.Fastermovevelocity) +
		"\n" +
		"CB: " + unit.getStat(sdk.stats.Crushingblow) + " DS: " + unit.getStat(sdk.stats.Deadlystrike) +
		" OW: " + unit.getStat(sdk.stats.Openwounds) +
		" ÿc1LL: ÿc0" + unit.getStat(sdk.stats.Lifedrainmindam) + " ÿc3ML: ÿc0" + unit.getStat(sdk.stats.Manadrainmindam) +
		" DR: " + unit.getStat(sdk.stats.Damageresist) + "% + " + unit.getStat(sdk.stats.NormalDamageReduction) +
		" MDR: " + unit.getStat(sdk.stats.Magicresist) + "% + " + unit.getStat(sdk.stats.MagicDamageReduction) +
		"\n" +
		(unit.getStat(sdk.stats.Cannotbefrozen) > 0 ? "ÿc3Cannot be Frozenÿc1\n" : "\n");

		return str;
	};

	// Event functions
	this.keyEvent = function (key) {
		switch (key) {
			case 106: //- * key    - Set Hot IP
				FileTools.writeText("logs/ip.txt", me.gameserverip.split(".")[3]);
				delay(150);
				showConsole();
				print("Hot IP set to: " + "ÿc1" + me.gameserverip.split(".")[3] + "ÿc0");
				delay(100);
				me.overhead("Hot IP set to: " + "ÿc1" + me.gameserverip.split(".")[3] + "ÿc0");

				break;
			case 109: //- Numpad - - Check Hot IP
				let gameIp = me.gameserverip.split(".")[3];

				if (FileTools.readText("logs/ip.txt") !== gameIp) {
					print("Not the right IP: " + "ÿc3" + gameIp + "ÿc0");
					me.overhead("Not the right IP: " + "ÿc3" + gameIp + "ÿc0");
				} else {
					showConsole();
					print("Here we go! IP: " + "ÿc1" + gameIp + "ÿc0" + " is ÿc1HOT!ÿc0");
					me.overhead("Here we go! IP: " + "ÿc1" + gameIp + "ÿc0" + " is ÿc1HOT!ÿc0");
				}

				break;
			case 107: //- Numpad + - Check Stats
				showConsole();

				// me.getStat(105) will return real FCR from gear + Config.FCR from char cfg
				var realFCR = me.getStat(105) - Config.FCR;
				var realIAS = me.getStat(93) - Config.IAS;
				var realFBR = me.getStat(102) - Config.FBR;
				var realFHR = me.getStat(99) - Config.FHR;

				print("ÿc4MF: ÿc0" + me.getStat(80) + " ÿc4GF: ÿc0" + me.getStat(79) + " ÿc1FR: ÿc0" + me.getStat(39) + " ÿc3CR: ÿc0" + me.getStat(43) + " ÿc9LR: ÿc0" + me.getStat(41) + " ÿc2PR: ÿc0" + me.getStat(45) + "\n" + "FCR: " + realFCR + " IAS: " + realIAS + " FBR: " + realFBR + " FHR: " + realFHR + " FRW: " + me.getStat(96) + "\n" + "CB: " + me.getStat(136) + " DS: " + me.getStat(141) + " OW: " + me.getStat(135) + " ÿc1LL: ÿc0" + me.getStat(60) + " ÿc3ML: ÿc0" + me.getStat(62) + " DR: " + me.getStat(36) + "% + " + me.getStat(34) + " MDR: " + me.getStat(37) + "% + " + me.getStat(35) + "\n" + (me.getStat(153) > 0 ? "ÿc3Cannot be Frozenÿc1" : ""));

				break;
			case 187: //- Equal    - Go To Shenk
				if (pvpTimeFlag) break;
				var target;

				if (me.act !== 5) {
					me.cancel();
					Town.goToTown(5);
					Town.move(NPC.Larzuk);
					target = getUnit(1, NPC.Larzuk);
					target.openMenu();
					if (!target.useMenu(0x58dc)) me.cancel();
				} else if (me.act !== 1) {
					Town.goToTown(1);
					Town.move("stash");
				}

				break;
			case 219: //- [        - Drop Everything
				if (pvpTimeFlag) break;
				me.cancel();

				if (AutoRogerThat.dropStuff()) {
					me.overhead("Done boos!");
				} else {
					me.overhead("Sorry! I'm poor!");
				}

				Pather.moveTo(me.x + rand(-6, 6), me.y + rand(-6, 6));

				break;
			case 221: //- ]        - Pick Everything
				if (pvpTimeFlag) break;
				var pickStatus;
				me.cancel();
				Config.PickitTries = 0;
				pickStatus = AutoRogerThat.pickItems();
				Pather.moveTo(me.x + rand(-6, 6), me.y + rand(-6, 6));

				if (pickStatus === "full") {
					me.overhead("I'm full");
				} else if (pickStatus) {
					me.overhead("Done boss!");
				} else {
					me.overhead("There is nothing good to be picked");
				}

				break;
			case 111: //- /        - PVP Time
				pvpTimeFlag = !pvpTimeFlag;

				if (pvpTimeFlag) {
					//* Town settings
						Config.HealHP = 0;
						Config.HealMP = 0;
						Config.HealStatus = false;
						Config.UseMerc = false;
						Config.MercWatch = false;
					//* Potion settings
						Config.UseHP = 0;
						Config.UseRejuvHP = 0;
						Config.UseMP = 40;
						Config.UseRejuvMP = 0;
						Config.UseMercHP = 0;
						Config.UseMercRejuv = 0;
						Config.HPBuffer = 0;
						Config.MPBuffer = 0;
						Config.RejuvBuffer = 0;
					//* Chicken settings
						Config.LifeChicken = 0;
						Config.ManaChicken = 0;
						Config.MercChicken = 0;
						Config.TownHP = 0;
						Config.TownMP = 0;
				} else {
					//* Town settings
						Config.HealHP = 90;
						Config.HealMP = 0;
						Config.HealStatus = true;
						Config.UseMerc = true;
						Config.MercWatch = true;
					//* Potion settings
						Config.UseHP = 85;
						Config.UseRejuvHP = 60;
						Config.UseMP = 40;
						Config.UseRejuvMP = 10;
						Config.UseMercHP = 85;
						Config.UseMercRejuv = 50;
						Config.HPBuffer = 0;
						Config.MPBuffer = 0;
						Config.RejuvBuffer = 0;
					//* Chicken settings
						Config.LifeChicken = 35;
						Config.ManaChicken = 0;
						Config.MercChicken = 0;
						Config.TownHP = 50;
						Config.TownMP = 5;
				}

				scriptBroadcast("PVP Time");

				break;
			case 35:  //- End      - Pause
				if (pvpTimeFlag) break;

				if (!Config.PauseFlag) {
					preArea = me.area;
					preAct = me.act;
					this.togglePause();

					if (me.inTown) {
						Town.openStash()
					}

					try {
						Town.goToTown();
						Town.openStash();
					} catch (e) { }
					
					Config.PauseFlag = true;
				} else {
					me.cancel();
					if (me.act !== preAct) Town.goToTown(preAct);
					Town.move("portalspot");

					if (!Pather.usePortal(preArea, me.name)) {
						throw new Error("Town.visitTown: Failed to go back from town");
					}

					this.togglePause();
					Config.PauseFlag = false;
				}

				break;
			case 96:  //- Numpad 0 - Test
				if (pvpTimeFlag) break;
				//= NEW
					var target = getUnit(1, 265);

					if (target && target.openMenu()) {
						delay(300);
						me.cancel();
					}
					// Town.clearInventory();
					// Cubing.emptyCube();
				//= MOVE
					// me.overhead(me.x + " x " + me.y);
					// Pather.walkTo(4401 + rand(-5,5),4550 + rand(-5,5));
					// Pather.moveTo(4393,4548);        //initial position
					// Pather.moveTo(4393 + rand(-8,8), 4548 + rand(-8,8));
				break;
			case 97:  //- Numpad 1 - Run Bitch
				if (pvpTimeFlag) break;
				scriptBroadcast("Run Bitch");

				break;
			case 98:  //- Numpad 2 - Message Log
				if (pvpTimeFlag) break;
				Config.MessageLogFlag = !Config.MessageLogFlag;
				scriptBroadcast("Message Log");

				break;
			case 99:  //- Numpad 3 - Drop Drop Trash
				if (pvpTimeFlag) break;
				me.cancel();

				if (AutoRogerThat.dropTrash()) {
					me.overhead("Dropped some trash!");
				} else {
					me.overhead("All Good!");
				}

				Pather.moveTo(me.x + rand(-6, 6), me.y + rand(-6, 6));

				break
			case 100: //- Numpad 4 - Open Stash
				if (pvpTimeFlag) break;
				if (!me.inTown) Town.goToTown();

				if (getUIFlag(0x19)) {
					me.cancel();
					Pather.moveTo(me.x + rand(-6, 6), me.y + rand(-6, 6));
				} else {
					me.cancel();
					Town.openStash();
				}

				break;
			case 101: //- Numpad 5 - Auto Mule
				if (pvpTimeFlag) break;

				if (AutoMule.getInfo() && AutoMule.getInfo().hasOwnProperty("muleInfo")) {
					if (AutoMule.getMuleItems().length > 0) {
						print("ÿc2Mule triggered");
						scriptBroadcast("mule");
						this.exit();
					} else {
						me.overhead("No items to mule.");
					}
				} else {
					me.overhead("Profile not enabled for muling.");
				}

				break;
			case 46:  //- Delete   - Mule Log
				MuleLogger.LogEquipped = true;
				MuleLogger.LogMerc = true;
				MuleLogger.logCharRogerThat();
				delay(150);
				print("Logged char: ÿc2" + me.name + "ÿc0");
				me.overhead("Logged char: ÿc2" + me.name + "ÿc0");

				break;
			case 102: //- Numpad 6 - Mule Log
				if (pvpTimeFlag) break;
				MuleLogger.LogEquipped = true;
				MuleLogger.LogMerc = true;
				MuleLogger.logCharRogerThat();
				delay(150);
				print("Logged char: ÿc2" + me.name + "ÿc0");
				me.overhead("Logged char: ÿc2" + me.name + "ÿc0");

				break;
			case 103: //- Numpad 7 - I Am The Boss
				if (pvpTimeFlag) break;
				FileTools.writeText("logs/leader.txt", me.name);
				Config.Leader = "";
				say("I am the boss");

				break;
			case 104: //- Numpad 8 - Last Game Button
				if (pvpTimeFlag) break;
				lastGameFlag = !lastGameFlag;

				if (lastGameFlag) {
					Messaging.sendToScript("D2BotLead.dbj", "lastGameON");
					print("Last Game: " + "ÿc2ONÿc0");
					me.overhead("Last Game: " + "ÿc2ONÿc0");
				} else {
					Messaging.sendToScript("D2BotLead.dbj", "lastGameOFF");
					print("Last Game: " + "ÿc1OFFÿc0");
					me.overhead("Last Game: " + "ÿc1OFFÿc0");
				}

				break;
			case 105: //- Numpad 9 - Disable Mule Chat
				pvpTimeFlag = false;
				scriptBroadcast("Chat OnOff");

				break;
			case 110: //- .        - MH
				if (!pvpTimeFlag) load("tools/mapthread.js");

				break;
			case 32:  //- Space    - Pause/Break
				if (pvpTimeFlag) break;
				this.togglePause();

				break;
		}
	};

	this.gameEvent = function (mode, param1, param2, name1, name2) {
		switch (mode) {
		case 0x00: // "%Name1(%Name2) dropped due to time out."
		case 0x01: // "%Name1(%Name2) dropped due to errors."
		case 0x03: // "%Name1(%Name2) left our world. Diablo's minions weaken."
			if ((typeof Config.QuitList === "string" && Config.QuitList.toLowerCase() === "any") ||
					(Config.QuitList instanceof Array && Config.QuitList.indexOf(name1) > -1)) {
				print(name1 + (mode === 0 ? " timed out" : " left"));

				if (typeof Config.QuitListDelay !== "undefined" && typeof quitListDelayTime === "undefined" && Config.QuitListDelay.length > 0) {
					Config.QuitListDelay.sort(function(a, b){return a-b});
					quitListDelayTime = getTickCount() + rand(Config.QuitListDelay[0] * 1e3, Config.QuitListDelay[1] * 1e3);
				} else {
					quitListDelayTime = getTickCount();
				}

				quitFlag = true;
			}

			if (Config.AntiHostile) {
				scriptBroadcast("remove " + name1);
			}

			break;
		case 0x06: // "%Name1 was Slain by %Name2"
			if (Config.AntiHostile && param2 === 0x00 && name2 === me.name) {
				scriptBroadcast("mugshot " + name1);
			}

			break;
		case 0x07:
			if (Config.AntiHostile && param2 === 0x03) { // "%Player has declared hostility towards you."
				scriptBroadcast("findHostiles");
			}

			break;
		case 0x11: // "%Param1 Stones of Jordan Sold to Merchants"
			if (Config.DCloneQuit === 2) {
				D2Bot.printToConsole("SoJ sold in game. Leaving.");

				quitFlag = true;

				break;
			}

			if (Config.SoJWaitTime && me.gametype === 1) { // only do this in expansion
				D2Bot.printToConsole(param1 + " Stones of Jordan Sold to Merchants on IP " + me.gameserverip.split(".")[3], 7);
				Messaging.sendToScript("default.dbj", "soj");
			}

			break;
		case 0x12: // "Diablo Walks the Earth"
			if (Config.DCloneQuit > 0) {
				D2Bot.printToConsole("Diablo walked in game. Leaving.");

				quitFlag = true;

				break;
			}

			if (Config.StopOnDClone && me.gametype === 1) { // only do this in expansion
				D2Bot.printToConsole("Diablo Walks the Earth", 7);

				cloneWalked = true;

				this.togglePause();
				Town.goToTown();
				showConsole();
				print("ÿc4Diablo Walks the Earth");

				me.maxgametime = 0;

				if (Config.KillDclone) {
					load("tools/clonekilla.js");
				}
			}

			break;
		}
	};

	this.scriptEvent = function (msg) {
		var obj;

		switch (msg) {
		case "broadcastToToolsThread":
			print("broadcast from script to here");

			break;
		case "MFHelper, you are free":
			Config.MFLeader = false;
			Config.MFHelper = false;

			break;
		case "toggleQuitlist":
			canQuit = !canQuit;

			break;
		case me.profile:
			AutoRogerThat.chatFlag = true;
			me.overhead("ToolsThread");

			break;
		case "quit":
			quitFlag = true;

			break;
		default:
			try {
				obj = JSON.parse(msg);
			} catch (e) {
				return;
			}

			if (obj) {
				if (obj.hasOwnProperty("currScript")) {
					debugInfo.currScript = obj.currScript;
				}

				if (obj.hasOwnProperty("lastAction")) {
					debugInfo.lastAction = obj.lastAction;
				}

				//D2Bot.store(JSON.stringify(debugInfo));
				DataFile.updateStats("debugInfo", JSON.stringify(debugInfo));
			}

			break;
		}
	};

	// Cache variables to prevent a bug where d2bs loses the reference to Config object
	Config = Misc.copy(Config);
	tick = getTickCount();

	addEventListener("keyup", this.keyEvent);
	addEventListener("gameevent", this.gameEvent);
	addEventListener("scriptmsg", this.scriptEvent);
	//addEventListener("gamepacket", Events.gamePacket);

	// Load Fastmod
	Packet.changeStat(105, Config.FCR);
	Packet.changeStat(99, Config.FHR);
	Packet.changeStat(102, Config.FBR);
	Packet.changeStat(93, Config.IAS);

	if (Config.QuitListMode > 0) {
		this.initQuitList();
	}

	// Start
	while (true) {
		try {
			if (me.gameReady && !me.inTown) {
				if (Config.UseHP > 0 && me.hp < Math.floor(me.hpmax * Config.UseHP / 100)) {
					this.drinkPotion(0);
				}

				if (Config.UseRejuvHP > 0 && me.hp < Math.floor(me.hpmax * Config.UseRejuvHP / 100)) {
					this.drinkPotion(2);
				}

				if (Config.LifeChicken > 0 && me.hp <= Math.floor(me.hpmax * Config.LifeChicken / 100)) {
					D2Bot.printToConsole("Life Chicken (" + me.hp + "/" + me.hpmax + ")" + this.getNearestMonster() + " in " + Pather.getAreaName(me.area) + ". Ping: " + me.ping, 9);
					D2Bot.updateChickens();
					this.exit();

					break;
				}

				if (Config.UseMP > 0 && me.mp < Math.floor(me.mpmax * Config.UseMP / 100)) {
					this.drinkPotion(1);
				}

				if (Config.UseRejuvMP > 0 && me.mp < Math.floor(me.mpmax * Config.UseRejuvMP / 100)) {
					this.drinkPotion(2);
				}

				if (Config.ManaChicken > 0 && me.mp <= Math.floor(me.mpmax * Config.ManaChicken / 100)) {
					D2Bot.printToConsole("Mana Chicken: (" + me.mp + "/" + me.mpmax + ") in " + Pather.getAreaName(me.area), 9);
					D2Bot.updateChickens();
					this.exit();

					break;
				}

				if (Config.IronGolemChicken > 0 && me.classid === 2) {
					if (!ironGolem || copyUnit(ironGolem).x === undefined) {
						ironGolem = this.getIronGolem();
					}

					if (ironGolem) {
						if (ironGolem.hp <= Math.floor(128 * Config.IronGolemChicken / 100)) { // ironGolem.hpmax is bugged with BO
							D2Bot.printToConsole("Irom Golem Chicken in " + Pather.getAreaName(me.area), 9);
							D2Bot.updateChickens();
							this.exit();

							break;
						}
					}
				}

				if (Config.UseMerc) {
					mercHP = getMercHP();
					merc = me.getMerc();

					if (mercHP > 0 && merc && merc.mode !== 12) {
						if (mercHP < Config.MercChicken) {
							D2Bot.printToConsole("Merc Chicken in " + Pather.getAreaName(me.area), 9);
							D2Bot.updateChickens();
							this.exit();

							break;
						}

						if (mercHP < Config.UseMercHP) {
							this.drinkPotion(3);
						}

						if (mercHP < Config.UseMercRejuv) {
							this.drinkPotion(4);
						}
					}
				}

				if (Config.ViperCheck && getTickCount() - tick >= 250) {
					if (this.checkVipers()) {
						D2Bot.printToConsole("Revived Tomb Vipers found. Leaving game.", 9);

						quitFlag = true;
					}

					tick = getTickCount();
				}

				if (this.checkPing(true)) {
					quitFlag = true;
				}
			}
		} catch (e) {
			Misc.errorReport(e, "ToolsThread");

			quitFlag = true;
		}

		if (quitFlag && canQuit && (typeof quitListDelayTime === "undefined" || getTickCount() >= quitListDelayTime)) {
			print("ÿc8Run duration ÿc2" + ((getTickCount() - me.gamestarttime) / 1000));

			if (Config.LogExperience) {
				Experience.log();
			}

			this.checkPing(false); // In case of quitlist triggering first
			this.exit();

			break;
		}

		if (debugInfo.area !== Pather.getAreaName(me.area)) {
			debugInfo.area = Pather.getAreaName(me.area);

			//D2Bot.store(JSON.stringify(debugInfo));
			DataFile.updateStats("debugInfo", JSON.stringify(debugInfo));
		}

		delay(20);
	}

	return true;
}