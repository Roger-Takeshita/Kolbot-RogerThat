//! Generic
//? ██████╗  ██████╗  ██████╗ ███████╗██████╗       ████████╗██╗  ██╗ █████╗ ████████╗    ███╗   ███╗ █████╗ ███████╗████████╗███████╗██████╗ 
//? ██╔══██╗██╔═══██╗██╔════╝ ██╔════╝██╔══██╗      ╚══██╔══╝██║  ██║██╔══██╗╚══██╔══╝    ████╗ ████║██╔══██╗██╔════╝╚══██╔══╝██╔════╝██╔══██╗
//? ██████╔╝██║   ██║██║  ███╗█████╗  ██████╔╝█████╗   ██║   ███████║███████║   ██║       ██╔████╔██║███████║███████╗   ██║   █████╗  ██████╔╝
//? ██╔══██╗██║   ██║██║   ██║██╔══╝  ██╔══██╗╚════╝   ██║   ██╔══██║██╔══██║   ██║       ██║╚██╔╝██║██╔══██║╚════██║   ██║   ██╔══╝  ██╔══██╗
//? ██║  ██║╚██████╔╝╚██████╔╝███████╗██║  ██║         ██║   ██║  ██║██║  ██║   ██║       ██║ ╚═╝ ██║██║  ██║███████║   ██║   ███████╗██║  ██║
//? ╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚══════╝╚═╝  ╚═╝         ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝       ╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝   ╚═╝   ╚══════╝╚═╝  ╚═╝ 

function LoadConfig() {
   //! FOLLOW LEADER -------------------------------------------------------------------
      Config.Leader   =  "";
      Config.QuitList = [""];
      Config.QuitListMode = 0;
      Config.QuitListDelay = [1, 20];
   //! ROGER-THAT ----------------------------------------------------------------------
      Config.RogerThatInventoryFlag    = true;           //Set true to use custom inventory configuration
      Config.RogerThatLeaderList       = ["TMFLeader"];
      Config.RogerThatFollower1List    = ["TMFSorc-I"];
      Config.RogerThatFollower2List    = ["TMFSorc-II"];
      Config.RogerThatFollower3List    = [];
      Config.RogerThatFollower4List    = [];
      Config.RogerThatFollower5List    = [];
      Config.RogerThatFollower6List    = [];
      Config.RogerThatFollower7List    = [];
   //! SCRIPTS -------------------------------------------------------------------------
      Scripts.Diablo = true;
         Config.Diablo.Entrance = true;
      Scripts.Baal = true;
         Config.Baal.HotTPMessage = "chegay";
         Config.Baal.SafeTPMessage = "come";
         Config.Baal.BaalMessage = "baal";
         Config.Baal.SoulQuit = false;
         Config.Baal.DollQuit = false;
      Config.Baal.KillBaal = true;
   //! INVENTORY SETTINGS --------------------------------------------------------------
      //+ Leader Inventory Pally ----------------------------------------------------
         Config.InventoryLeader[0]    = [1,1,1,1,1,1,0,0,0,0];
         Config.InventoryLeader[1]    = [1,1,1,1,1,1,0,0,0,0];
         Config.InventoryLeader[2]    = [1,1,1,1,1,1,0,0,0,0];
         Config.InventoryLeader[3]    = [1,1,1,1,1,0,0,0,0,0];
      //+ Follower 1 Inventory Follower - Sorc Light --------------------------------
         Config.InventoryFollower1[0] = [1,1,1,1,1,1,0,0,0,0];
         Config.InventoryFollower1[1] = [1,1,1,1,1,1,0,0,0,0];
         Config.InventoryFollower1[2] = [1,1,1,1,1,1,0,0,0,0];
         Config.InventoryFollower1[3] = [1,1,1,1,1,1,0,0,0,0];
      //+ Follower 2 Inventory Follower - Sorc Cold ---------------------------------
         Config.InventoryFollower2[0] = [1,1,1,1,1,1,0,0,0,0];
         Config.InventoryFollower2[1] = [1,1,1,1,1,1,0,0,0,0];
         Config.InventoryFollower2[2] = [1,1,1,1,1,1,0,0,0,0];
         Config.InventoryFollower2[3] = [1,1,1,1,1,1,0,0,0,0];
      //+ Follower 3 Inventory Follower ---------------------------------------------
         Config.InventoryFollower3[0] = [0,0,0,0,0,0,0,0,0,0];
         Config.InventoryFollower3[1] = [0,0,0,0,0,0,0,0,0,0];
         Config.InventoryFollower3[2] = [0,0,0,0,0,0,0,0,0,0];
         Config.InventoryFollower3[3] = [0,0,0,0,0,0,0,0,0,0];
      //+ Follower 4 Inventory Follower ---------------------------------------------
         Config.InventoryFollower4[0] = [0,0,0,0,0,0,0,0,0,0];
         Config.InventoryFollower4[1] = [0,0,0,0,0,0,0,0,0,0];
         Config.InventoryFollower4[2] = [0,0,0,0,0,0,0,0,0,0];
         Config.InventoryFollower4[3] = [0,0,0,0,0,0,0,0,0,0];
      //+ Follower 5 Inventory Follower ---------------------------------------------
         Config.InventoryFollower5[0] = [0,0,0,0,0,0,0,0,0,0];
         Config.InventoryFollower5[1] = [0,0,0,0,0,0,0,0,0,0];
         Config.InventoryFollower5[2] = [0,0,0,0,0,0,0,0,0,0];
         Config.InventoryFollower5[3] = [0,0,0,0,0,0,0,0,0,0];
      //+ Follower 6 Inventory Follower ---------------------------------------------
         Config.InventoryFollower6[0] = [0,0,0,0,0,0,0,0,0,0];
         Config.InventoryFollower6[1] = [0,0,0,0,0,0,0,0,0,0];
         Config.InventoryFollower6[2] = [0,0,0,0,0,0,0,0,0,0];
         Config.InventoryFollower6[3] = [0,0,0,0,0,0,0,0,0,0];
      //+ Follower 7 Inventory Follower ---------------------------------------------
         Config.InventoryFollower7[0] = [0,0,0,0,0,0,0,0,0,0];
         Config.InventoryFollower7[1] = [0,0,0,0,0,0,0,0,0,0];
         Config.InventoryFollower7[2] = [0,0,0,0,0,0,0,0,0,0];
         Config.InventoryFollower7[3] = [0,0,0,0,0,0,0,0,0,0];
      //+ Generic Inventory ---------------------------------------------------------
         Config.InventoryGeneric[0]   = [1,1,1,1,1,1,1,1,1,1];
         Config.InventoryGeneric[1]   = [1,1,1,1,1,1,1,1,1,1];
         Config.InventoryGeneric[2]   = [1,1,1,1,1,1,1,1,1,1];
         Config.InventoryGeneric[3]   = [1,1,1,1,1,1,1,1,1,1];

      Config.BeltColumn = ["hp", "mp", "mp", "rv"];
      Config.MinColumn  = [3, 3, 3, 0];
      Config.StashGold  = 200000;
   //! TOWN SETTINGS / POTION SETTINGS / CHICKEN SETTINGS ------------------------------
      //+ Town settings -------------------------------------------------------------
         Config.HealHP        = 90;                      // Go to a healer if under designated percent of life.
         Config.HealMP        =  0;                      // Go to a healer if under designated percent of mana.
         Config.HealStatus    =  true;                   // Go to a healer if poisoned or cursed
         Config.UseMerc       =  true;                   // Use merc. This is ignored and always false in d2classic.
         Config.MercWatch     =  true;                   // Instant merc revive during battle.
      //+ Potion settings -----------------------------------------------------------
         Config.UseHP         = 85;                      // Drink a healing potion if life is under designated percent.
         Config.UseRejuvHP    = 65;                      // Drink a rejuvenation potion if life is under designated percent.
         Config.UseMP         = 40;                      // Drink a mana potion if mana is under designated percent.
         Config.UseRejuvMP    = 10;                      // Drink a rejuvenation potion if mana is under designated percent.
         Config.UseMercHP     = 85;                      // Give a healing potion to your merc if his/her life is under designated percent.
         Config.UseMercRejuv  = 40;                      // Give a rejuvenation potion to your merc if his/her life is under designated percent.
         Config.HPBuffer      =  0;                      // Number of healing potions to keep in inventory.
         Config.MPBuffer      =  0;                      // Number of mana potions to keep in inventory.
         Config.RejuvBuffer   =  0;                      // Number of rejuvenation potions to keep in inventory.
      //+ Chicken settings ----------------------------------------------------------
         Config.LifeChicken   = 35;                      // Exit game if life is less or equal to designated percent.
         Config.ManaChicken   =  0;                      // Exit game if mana is less or equal to designated percent.
         Config.MercChicken   =  0;                      // Exit game if merc's life is less or equal to designated percent.
         Config.TownHP        = 55;                      // Go to town if life is under designated percent.
         Config.TownMP        =  0;                      // Go to town if mana is under designated percent.
   //! PICK LIST -----------------------------------------------------------------------
      // Config.PickitFiles.push("w-bot1.nip");
      // Config.PickitFiles.push("w-bot2.nip");
      // Config.PickitFiles.push("w-bot3.nip");
      // Config.PickitFiles.push("w-bot4.nip");
      Config.PickitFiles.push("w-potions.nip");
      // Config.PickitFiles.push("w-koltonEarlyLadder.nip");
      // Config.PickitFiles.push("w-koltonEndLadder.nip");
      Config.PickitFiles.push("w-kolton.nip");
      Config.PickitFiles.push("w-LLD.nip");
      Config.PickRange = 40;
      Config.FastPick  = true;
   //! ADDITION CONFIG -----------------------------------------------------------------
      //+ Print to console ----------------------------------------------------------
         Config.D2BotPrintGameTime = false;              // Game time in the end of each game
         Config.D2BotPrintChicken  = false;              // Chicken location
         Config.D2BotPrintCrash    = false;              // Crash location
         Config.D2BotPrintDie      = false;              // When you die
         Config.D2BotPrintLostXp   = false;              // When you lose experience
      //+ Additional item info log settings. All info goes to \logs\ItemLog.txt -----
         Config.ItemInfo = false;                        // Log stashed, skipped (due to no space) or sold items.
         Config.ItemInfoQuality = [];                    // The quality of sold items to log. See NTItemAlias.dbl for values. Example: Config.ItemInfoQuality = [6, 7, 8];
      //+ Item identification settings ----------------------------------------------
         Config.CainID.Enable = true;                    // Identify items at Cain
         Config.CainID.MinGold = 500000;                 // Minimum gold (stash + character) to have in order to use Cain.
         Config.CainID.MinUnids = 3;                     // Minimum number of unid items in order to use Cain.
         Config.FieldID = false;                         // Identify items in the field instead of going to town.
         Config.DroppedItemsAnnounce.Enable = false;     // Announce Dropped Items to in-game newbs
         Config.DroppedItemsAnnounce.Quality = [];       // Quality of item to announce. See NTItemAlias.dbl for values. Example: Config.DroppedItemsAnnounce.Quality = [6, 7, 8];
      //+ Manager item log screen ---------------------------------------------------
         Config.LogKeys = false;                         // Log keys on item viewer
         Config.LogOrgans = false;                       // Log organs on item viewer
         Config.LogLowRunes = false;                     // Log low runes (El - Dol) on item viewer
         Config.LogMiddleRunes = false;                  // Log middle runes (Hel - Mal) on item viewer
         Config.LogHighRunes = true;                     // Log high runes (Ist - Zod) on item viewer
         Config.LogLowGems = false;                      // Log low gems (chipped, flawed, normal) on item viewer
         Config.LogHighGems = false;                     // Log high gems (flawless, perfect) on item viewer
         Config.SkipLogging = [];                        // Custom log skip list. Set as three digit item code or classid. Example: ["tes", "ceh", 656, 657] will ignore logging of essences.
         Config.ShowCubingInfo = false;                  // Show cubing messages on console
      //+ Repair settings -----------------------------------------------------------
         Config.CubeRepair = false;                      // Repair weapons with Ort and armor with Ral rune. Don't use it if you don't understand the risk of losing items.
         Config.RepairPercent = 40;                      // Durability percent of any equipped item that will trigger repairs.
      //+ Gambling config -----------------------------------------------------------
         Config.Gamble = false;
         Config.GambleGoldStart = 2000000;
         Config.GambleGoldStop  =  500000;
         Config.GambleItems.push("Amulet");
         Config.GambleItems.push("Ring");
         Config.GambleItems.push("Circlet");
         Config.GambleItems.push("Coronet");
         Config.GambleItems.push("monarch");
   //! CUBING CONFIG -------------------------------------------------------------------
      Config.Cubing        =  true;
         //+ GEMS -------------------------------------------------------------------
            // Config.Recipes.push([Recipe.Gem,          "Flawless Amethyst"]);       // Make Perfect Amethyst
            // Config.Recipes.push([Recipe.Gem,              "Flawless Ruby"]);       // Make Perfect Ruby
            // Config.Recipes.push([Recipe.Gem,           "Flawless Diamond"]);       // Make Perfect Diamond
            // Config.Recipes.push([Recipe.Gem,           "Flawless Emerald"]);       // Make Perfect Emerald
            // Config.Recipes.push([Recipe.Gem,             "Flawless Topaz"]);       // Make Perfect Topaz
            // Config.Recipes.push([Recipe.Gem,          "Flawless Sapphire"]);       // Make Perfect Sapphire
            // Config.Recipes.push([Recipe.Gem,             "Flawless Skull"]);       // Make Perfect Skull
         //+ CRAFT ------------------------------------------------------------------
            Config.Recipes.push([Recipe.Caster.Amulet]);                              // Craft Caster Amulet
            Config.Recipes.push([Recipe.Blood.Ring]);                                 // Craft Blood Ring
            // Config.Recipes.push([Recipe.Caster.Belt,     "Sharkskin Belt"]);       // Craft Caster Sharkskin Belt
            // Config.Recipes.push([Recipe.Caster.Belt,   "Vampirefang Belt"]);       // Craft Caster Vampirefang Belt
            Config.Recipes.push([Recipe.Blood.Gloves,     "Sharkskin Gloves"]);       // Craft Blood Sharkskin Gloves
            Config.Recipes.push([Recipe.Blood.Gloves,   "Vampirebone Gloves"]);       // Craft Blood Vampirebone Gloves	
            // Config.Recipes.push([Recipe.HitPower.Gloves,      "Vambraces"]);       // Craft Hit Power Vambraces
            // Config.Recipes.push([Recipe.HitPower.Gloves,   "Chain Gloves"]);       // Craft Hit Power Chain Gloves
            // Config.Recipes.push([Recipe.HitPower.Gloves,  "Heavy Bracers"]);       // Craft Hit Power Heavy Bracers
            // Config.Recipes.push([Recipe.Blood.Helm,               "Armet"]);       // Craft Blood Armet
         //+ OTHERS -----------------------------------------------------------------
            Config.Recipes.push([Recipe.Reroll.Magic,          "Grand Charm"]);       // Reroll magic Grand Charm (ilvl 91+)
            // Config.Recipes.push([Recipe.Reroll.Magic,            "Diadem"]);       // Reroll magic Diadem
            // Config.Recipes.push([Recipe.Reroll.Rare,             "Diadem"]);       // Reroll rare Diadem
            // Config.Recipes.push([Recipe.Token]);                                   // Make Token of Absolution
         //+ SOCKET -----------------------------------------------------------------
            Config.Recipes.push([Recipe.Socket.Weapon, "Great Poleaxe",        Roll.Eth]);
            Config.Recipes.push([Recipe.Socket.Weapon, "Thresher",             Roll.Eth]);
            Config.Recipes.push([Recipe.Socket.Weapon, "Cryptic Axe",          Roll.Eth]);
            Config.Recipes.push([Recipe.Socket.Weapon, "Colossus Voulge",      Roll.Eth]);
            Config.Recipes.push([Recipe.Socket.Weapon, "Thresher",             Roll.Eth]);
            Config.Recipes.push([Recipe.Socket.Weapon, "Giant Thresher",       Roll.Eth]);
            Config.Recipes.push([Recipe.Socket.Weapon, "Berserker Axe",        Roll.Eth]);
            Config.Recipes.push([Recipe.Socket.Weapon, "Colossus Blade",       Roll.Eth]);
            Config.Recipes.push([Recipe.Socket.Shield, "Monarch",           Roll.NonEth]);
            Config.Recipes.push([Recipe.Socket.Armor,  "Sacred Armor",         Roll.Eth]);
            Config.Recipes.push([Recipe.Socket.Armor,  "Archon Plate",         Roll.Eth]);
            Config.Recipes.push([Recipe.Socket.Armor,  "Dusk Shroud",          Roll.Eth]);
            Config.Recipes.push([Recipe.Socket.Armor,  "Wyrmhide",             Roll.Eth]);
            Config.Recipes.push([Recipe.Socket.Armor,  "Scarab Husk",          Roll.Eth]);
            Config.Recipes.push([Recipe.Socket.Armor,  "Wire Fleece",          Roll.Eth]);
            Config.Recipes.push([Recipe.Socket.Armor,  "Diamond Mail",         Roll.Eth]);
            Config.Recipes.push([Recipe.Socket.Armor,  "Loricated Mail",       Roll.Eth]);
            Config.Recipes.push([Recipe.Socket.Armor,  "Great Hauberk",        Roll.Eth]);
            Config.Recipes.push([Recipe.Socket.Armor,  "Boneweave",            Roll.Eth]);
            Config.Recipes.push([Recipe.Socket.Armor,  "Balrog Skin",          Roll.Eth]);
            Config.Recipes.push([Recipe.Socket.Armor,  "KrakenShell",          Roll.Eth]);
            Config.Recipes.push([Recipe.Socket.Armor,  "Hellforge Plate",      Roll.Eth]);
            Config.Recipes.push([Recipe.Socket.Armor,  "Lacquered Plate",      Roll.Eth]);
            Config.Recipes.push([Recipe.Socket.Armor,  "Shadow Plate",         Roll.Eth]);
         //+ UPGRADE ----------------------------------------------------------------
            // Config.Recipes.push([Recipe.Unique.Armor.ToExceptional, "Heavy Gloves",       Roll.NonEth]);    // Upgrade Bloodfist to Exceptional
            // Config.Recipes.push([Recipe.Unique.Armor.ToExceptional, "Light Gauntlets",    Roll.NonEth]);    // Upgrade Magefist to Exceptional
            // Config.Recipes.push([Recipe.Unique.Armor.ToElite,       "Sharkskin Gloves",   Roll.NonEth]);    // Upgrade Bloodfist or Grave Palm to Elite
            // Config.Recipes.push([Recipe.Unique.Armor.ToElite,       "Battle Gauntlets",   Roll.NonEth]);    // Upgrade Magefist or Lavagout to Elite
            // Config.Recipes.push([Recipe.Unique.Armor.ToElite,       "War Boots",          Roll.NonEth]);    // Upgrade Gore Rider to Elite
      Config.MakeRunewords = false;
         Config.Runewords.push([Runeword.Insight,                       "Thresher",             Roll.Eth]);    // Make ethereal Insight Thresher
         Config.Runewords.push([Runeword.Insight,                       "Cryptic Axe",          Roll.Eth]);    // Make ethereal Insight Cryptic Axe
         Config.Runewords.push([Runeword.Insight,                       "Colossus Voulge",      Roll.Eth]);    // Make ethereal Insight Colossus Voulge
         Config.Runewords.push([Runeword.Insight,                       "Thresher",             Roll.Eth]);    // Make ethereal Insight Thresher
         Config.Runewords.push([Runeword.Insight,                       "Giant Thresher",       Roll.Eth]);    // Make ethereal Insight Giant Thresher
         Config.Runewords.push([Runeword.Insight,                       "Elder Staff",       Roll.NonEth]);    // Make ethereal Insight Elder Staff
         Config.Runewords.push([Runeword.Insight,                       "Cedar Staff",       Roll.NonEth]);    // Make ethereal Insight Cedar Staff
         Config.Runewords.push([Runeword.Insight,                       "Cedar Staff",          Roll.Eth]);    // Make ethereal Insight Cedar Staff
         Config.Runewords.push([Runeword.Insight,                       "Battle Staff",      Roll.NonEth]);    // Make ethereal Insight Battle Staff
         Config.Runewords.push([Runeword.Sanctuary,                     "Hyperion",          Roll.NonEth]);    // Make Hyperion Sanctuary
         Config.Runewords.push([Runeword.Sanctuary,                     "Sacred Targe",      Roll.NonEth]);    // Make Sanctuary Sacred Targe
         Config.Runewords.push([Runeword.Spirit,                        "Monarch",           Roll.NonEth]);    // Make Spirit Monarch
         Config.Runewords.push([Runeword.Spirit,                        "Sacred Targe",      Roll.NonEth]);    // Make Spirit Sacred Targe
         Config.Runewords.push([Runeword.Spirit,                        "Akaran Targe",      Roll.NonEth]);    // Make Spirit Akaran Targe
         Config.Runewords.push([Runeword.Spirit,                        "Aerin Shield",      Roll.NonEth]);    // Make Spirit Aerin Shield
         Config.Runewords.push([Runeword.Spirit,                        "Protector Shield",  Roll.NonEth]);    // Make Spirit Protector Shield
         Config.Runewords.push([Runeword.Spirit,                        "Heraldic Shield",   Roll.NonEth]);    // Make Spirit Heraldic Shield
         Config.Runewords.push([Runeword.Spirit,                        "Royal Shield",      Roll.NonEth]);    // Make Spirit Royal Shield
         // Config.Runewords.push([Runeword.Spirit,                     "Sacred Hondache",   Roll.NonEth]);    // Make Spirit Sacred Hondache
         // Config.Runewords.push([Runeword.Spirit,                     "Hondache",          Roll.NonEth]);    // Make Spirit Hondache
         Config.Runewords.push([Runeword.Harmony,                       "Matriarchal Bow",   Roll.NonEth]);    // Make Harmony Matriarchal Bow
         Config.Runewords.push([Runeword.Oath,                          "Ettin Axe",            Roll.Eth]);    // Make Oath Ettin Axe
         Config.Runewords.push([Runeword.Oath,                          "Berserker Axe",        Roll.Eth]);    // Make Oath Beserker Axe
         Config.Runewords.push([Runeword.Oath,                          "Small Crescent",       Roll.Eth]);    // Make Oath Small Crescent
         Config.KeepRunewords.push("      [type] == shield # ([coldresist] == 70 || [coldresist] == 115)");    // Resist 70/115 Sanctuary
         Config.KeepRunewords.push("     ([type] == polearm || [type] == staff) # [meditationaura] == 17");    // Insight Meditation lvl 17
         Config.KeepRunewords.push("            [type] == shield || [type] == auricshields # [fcr] == 35");    // 35% Fcr Spirit
         Config.KeepRunewords.push("[type] == bow # ([enhanceddamage] == 275 || [enhanceddamage] == 290)");    // 275% or 290% ed Harmony
         Config.KeepRunewords.push("[type] == axe # ([enhanceddamage] == 340 || [enhanceddamage] == 355)");    // 340% or 355% ed Oath
   //! PUBLIC GAMES OPTIONS ------------------------------------------------------------
      Config.LocalChat.Enabled = false;                  // enable the LocalChat system
      Config.LocalChat.Toggle = false;                   // optional, set to KEY value to toggle through modes 0, 1, 2
      Config.LocalChat.Mode = 0;                         // 0 = disabled, 1 = chat from 'say' (recommended), 2 = all chat (for manual play)
      Config.PublicMode = 3;                             // 1 = invite and accept, 2 = accept only, 3 = invite only, 0 = disable
   //! GENERAL CONFIG ------------------------------------------------------------------
      Config.AutoMap = false;                            // Set to true to open automap at the beginning of the game.
      Config.LastMessage = "";                           // Message or array of messages to say at the end of the run. Use $nextgame to say next game - "Next game: $nextgame" (works with lead entry point)
      Config.MinGameTime = 0;                            // Min game time in seconds. Bot will TP to town and stay in game if the run is completed before.
      Config.MaxGameTime = 0;                            // Maximum game time in seconds. Quit game when limit is reached.
      Config.TeleSwitch = false;                         // Switch to secondary (non-primary) slot when teleporting more than 5 nodes.
      Config.OpenChests = false;                         // Open chests. Controls key buying.
      Config.MiniShopBot = true;                         // Scan items in NPC shops.
      Config.PacketShopping = false;                     // Use packets to shop. Improves shopping speed.
      Config.TownCheck = false;                          // Go to town if out of potions
      Config.LogExperience = false;                      // Print experience statistics in the manager.
      Config.PingQuit = [{Ping: 0, Duration: 0}];        // Quit if ping is over the given value for over the given time period in seconds.
      Config.Silence = false;                            // Make the bot not say a word. Do not use in combination with LocalChat
      Config.ScanShrines = [15, 2, 3];                   // 15 = XP, 2 = Health, 3 = Mana
      Config.WaypointMenu = true;
      Config.WalkIfManaLessThan = 10;
   //! DIABLO CLONE CONFIG -------------------------------------------------------------
      Config.StopOnDClone = false;                       // Go to town and idle as soon as Diablo walks the Earth
      Config.SoJWaitTime = 5;                            // Time in minutes to wait for another SoJ sale before leaving game. 0 = disabled
      Config.KillDclone = false;                         // Go to Palace Cellar 3 and try to kill Diablo Clone. Pointless if you already have Annihilus.
      Config.DCloneQuit = false;                         // 1 = quit when Diablo walks, 2 = quit on soj sales, 0 = disabled
   //! MONSTER SKIP CONFIG -------------------------------------------------------------
      Config.SkipImmune  = [];
      Config.SkipEnchant = [];
      Config.SkipAura    = [];
   //! ATTACK CONFIG -------------------------------------------------------------------
      //+ SORCERESS -----------------------------------------------------------------
         //- Cold ---------------------------------------------------------------
            Config.AttackSorcColdSkill  = [55, 59, 45, 59, 55, -1, -1]; 
            Config.LowManaSorcColdSkill = [-1, -1];
         //- Light --------------------------------------------------------------
            Config.AttackSorcLightSkill  = [53, 49, 49, 53, 53, -1, -1]; 
            Config.LowManaSorcLightSkill = [-1, -1];
         //- Fire ---------------------------------------------------------------
            Config.AttackSorcFireSkill  = [47, 56, 47, 47, 47, -1, -1]; 
            Config.LowManaSorcFireSkill = [-1, -1];
      //+ PALADIN -------------------------------------------------------------------
         Config.AttackPallySkill  = [112, 112, 113, 112, 113, 97, 122]; 
         Config.LowManaPallySkill = [112, 124];
      //+ BARBARIAN -----------------------------------------------------------------
         Config.AttackBarbSkill   = [126, 126, 126, 126, 126, -1, -1]; 
         Config.LowManaBarbSkill  = [-1, -1];
      //+ AMAZON --------------------------------------------------------------------
         Config.AttackZonSkill    = [10, 10, 10, 10, 10, -1, -1]; 
         Config.LowManaZonSkill   = [-1, -1];
      //+ DRUID ---------------------------------------------------------------------
         Config.AttackDruidSkill  = [245, 245, 245, 245, 245, -1, -1]; 
         Config.LowManaDruidSkill = [-1, -1];
      //+ NECROMANCER ---------------------------------------------------------------
         Config.AttackNecSkill    = [88, 84, 84, 84, 84, 88, 88]; 
         Config.LowManaNecSkill   = [-1, -1];
      //+ ASSASSIN ------------------------------------------------------------------
         Config.AttackSinSkill    = [271, 271, 271, 271, 271, -1, -1]; 
         Config.LowManaSinSkill   = [-1, -1];

      Config.CustomAttack = {
         //"Monster Name": [-1, -1]
      };

      Config.Dodge             = true;                   // Move away from monsters that get too close. Don't use with short-ranged attacks like Poison Dagger.
      Config.DodgeRange        =  10;                    // Distance to keep from monsters.
      Config.DodgeHP           = 100;                    // Dodge only if HP percent is less than or equal to Config.DodgeHP. 100 = always dodge.
      Config.BossPriority      = true;                   // Set to true to attack Unique/SuperUnique monsters first when clearing
      Config.ClearType         = 0xF;                    // Monster spectype to kill in level clear scripts (ie. Mausoleum). 0xF = skip normal, 0x7 = champions/bosses, 0 = all
      Config.TeleStomp         = true;                   // Use merc to attack bosses if they're immune to attacks, but not to physical damage
}