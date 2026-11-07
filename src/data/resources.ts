// Catalog metadata for the Galaxy Setup Pro resource library.
// Slugs mirror the public resource URLs of the original site.

import { RAW_SLUGS } from "./rawSlugs";

// Publication dates captured from the live blog for the newest drops.
const KNOWN_DATES: Record<string, string> = {
  "cmi-plugin-300-commands-kits-portals": "2026-11-07",
  "deluxewithdraw-minecraft-plugin-bank": "2026-11-07",
  "extrastorage-minecraft-plugin-auto": "2026-11-05",
  "gadgetsmenu-premium-minecraft-cosmetics": "2026-11-05",
  "axauctions-minecraft-plugin-auction": "2026-11-05",
  "oraxen-minecraft-plugin-custom-items": "2026-11-01",
  "itemsadder-minecraft-plugin-custom": "2026-11-01",
  "matrix-anticheat-minecraft-plugin": "2026-11-01",
  "deluxesellwands-minecraft-plugin": "2026-10-31",
  "lifesteal-12111-setup-custom-texture": "2026-10-31",
  "premium-survival-smp-setup-paper-262": "2026-10-30",
  "phoenix-duels-minecraft-plugin-pvp": "2026-10-30",
  "cosmeticscore-minecraft-plugin-hats": "2026-10-30",
  "player-warps-plugin-gui-warps-economy": "2026-10-29",
  "space-boxpvp-map-pack-spawn-arena-mine": "2026-10-28",
  "262-premium-lifesteal-setup-minecraft": "2026-10-28",
  "unlimitednametags-minecraft-plugin": "2026-10-27",
  "axvaults-source-code-open-source": "2026-10-26",
  "clientguard-minecraft-plugin-mod": "2026-10-26",
  "supremebosses-minecraft-plugin-custom": "2026-10-26",
  "mcpvp-setup-v11-1-12111-modern-practice": "2026-08-22",
};

export type Category = "plugin" | "setup" | "map" | "model" | "config" | "fork";

export const CATEGORIES: { id: Category; num: string; label: string; nav: string }[] = [
  { id: "plugin", num: "01", label: "Plugins", nav: "Plugins" },
  { id: "setup", num: "02", label: "Setups", nav: "Setups" },
  { id: "map", num: "03", label: "Maps", nav: "Maps" },
  { id: "model", num: "04", label: "Models", nav: "Models" },
  { id: "config", num: "05", label: "Configs", nav: "Configs" },
  { id: "fork", num: "06", label: "Forks", nav: "Server Forks" },
];

// Exact article titles captured from the live blog for the newest resources.
const KNOWN_TITLES: Record<string, string> = {
  "cmi-plugin-300-commands-kits-portals": "CMI Plugin – 300 Commands, Kits, Portals, Economy & More",
  "deluxewithdraw-minecraft-plugin-bank": "DeluxeWithdraw Minecraft Plugin | Bank Notes, XP & Custom Currencies",
  "extrastorage-minecraft-plugin-auto": "ExtraStorage Minecraft Plugin | Auto Pickup & Unlimited Storage",
  "gadgetsmenu-premium-minecraft-cosmetics": "GadgetsMenu Premium | Minecraft Cosmetics, Hats, Pets & Emotes",
  "axauctions-minecraft-plugin-auction": "AxAuctions Minecraft Plugin | Auction House & Multi-Currency Support",
  "oraxen-minecraft-plugin-custom-items": "Oraxen Minecraft Plugin | Custom Items, Blocks, Furniture & GUI",
  "lifesteal-12111-setup-custom-texture": "Lifesteal 1.21.11 Setup | Custom Texture Armor & Tools",
  "mcpvp-setup-v11-1-12111-modern-practice": "MCPVP Setup v1.1 1 | 1.21.11 Modern Practice & Duels Server Setup",
  "lifemc-lifesteal-12111-setup-premium": "LifeMC Lifesteal 1.21.11 Setup | Premium Server Files",
  "itemsadder-minecraft-plugin-custom": "ItemsAdder Minecraft Plugin | Custom Items, Blocks & HUD",
  "matrix-anticheat-minecraft-plugin": "Matrix AntiCheat | Minecraft Plugin For PvP Servers",
  "deluxesellwands-minecraft-plugin": "DeluxeSellwands Minecraft Plugin | Sell Wands & Tokens",
  "premium-survival-smp-setup-paper-262": "Premium Survival SMP Setup | Paper 26.2 Server Files",
  "phoenix-duels-minecraft-plugin-pvp": "Phoenix Duels Minecraft Plugin | Advanced PvP Duels",
  "cosmeticscore-minecraft-plugin-hats": "CosmeticsCore Minecraft Plugin | Hats, Pets & Cosmetics",
  "player-warps-plugin-gui-warps-economy": "Player Warps Plugin | GUI Warps & Economy Support",
  "space-boxpvp-map-pack-spawn-arena-mine": "Space BoxPvP Map Pack | Spawn, Arena & Mine",
  "262-premium-lifesteal-setup-minecraft": "2.6.2 Premium Lifesteal Setup | Minecraft Server Files",
  "unlimitednametags-minecraft-plugin": "UnlimitedNametags Minecraft Plugin | Animated Nametags",
  "axvaults-source-code-open-source": "AxVaults Source Code | Open Source Player Vaults",
  "clientguard-minecraft-plugin-mod": "ClientGuard Minecraft Plugin | Mod Detection & Security",
  "supremebosses-minecraft-plugin-custom": "SupremeBosses Minecraft Plugin | Custom Bosses",
  "donutsmp-media-plugin-free-minecraft": "DonutSMP Media Plugin | Free Minecraft Media Plugin",
  "zelbounty-minecraft-plugin-gui-based": "ZelBounty Minecraft Plugin | GUI Based Bounty System",
  "zelteams-minecraft-plugin-clan-team": "ZelTeams Minecraft Plugin | Clan & Team System",
  "zelduels-minecraft-plugin-download-auto": "ZelDuels Minecraft Plugin | Download & Auto Setup",
  "yin-yang-animated-weapon-pack-18": "Yin Yang Animated Weapon Pack 1.8 | Custom Weapons",
  "halloween-origin-spawn-minecraft-map": "Halloween Origin Spawn | Minecraft Map Download",
  "free-minecraft-economy-server-setup-262": "Free Minecraft Economy Server Setup | 2.6.2",
  "tree-lobby-minecraft-map-download-java": "Tree Lobby Minecraft Map | Java Edition Download",
  "eternal-bones-animated-weapons-and": "Eternal Bones Animated Weapons And Tools Set",
  "interactions-advanced-npc-conversations": "Interactions | Advanced NPC Conversations Plugin",
  "pvpmanager-advanced-minecraft-pvp": "PvPManager | Advanced Minecraft PvP Plugin",
  "nexo-custom-items-blocks-resource-pack": "Nexo | Custom Items, Blocks & Resource Pack",
  "mythiclib-primium-advanced-rpg-library": "MythicLib Premium | Advanced RPG Library",
  "economyshopgui-premium-advanced": "EconomyShopGUI Premium | Advanced Shop GUI",
  "plotsquared-v7-advanced-plot-management": "PlotSquared v7 | Advanced Plot Management",
  "chatsentry-intelligent-chat-filter-anti": "ChatSentry | Intelligent Chat Filter & Anti-Ad",
  "fancyannouncements-advanced-minecraft": "FancyAnnouncements | Advanced Minecraft Announcements",
  "litebans-advanced-punishment-moderation": "LiteBans | Advanced Punishment Moderation",
  "kitpvp-arena-full-build-multi-biome": "KitPvP Arena Full Build | Multi Biome PvP Map",
  "infernal-rune-moth-3d-minecraft-model": "Infernal Rune Moth | 3D Minecraft Model",
  "ashmc-lifesteal-server-setup-premium": "AshMC Lifesteal Server Setup | Premium Files",
  "squid-game-netflix-series-setup": "Squid Game Netflix Series Setup | Minecraft Minigames",
  "raytraceantixray-advanced-anti-xray": "RayTraceAntiXray | Advanced Anti-Xray Plugin",
  "boxpvp-server-setup-premium-minecraft": "BoxPvP Server Setup | Premium Minecraft Files",
  "fantasy-lobby-map-premium-minecraft-hub": "Fantasy Lobby Map | Premium Minecraft Hub",
  "xltournaments-global-tournament-plugin": "XLTournaments | Global Tournament Plugin",
  "ultimate-blockregen-advanced-block": "Ultimate BlockRegen | Advanced Block Regeneration",
  "8-guis-deluxemenus-premium-gui": "8 GUIs DeluxeMenus | Premium GUI Pack",
  "axafkzone-ultimate-afk-reward-plugin": "AxAFKZone | Ultimate AFK Reward Plugin",
  "zelauction-ultimate-auction-house": "ZelAuction | Ultimate Auction House Plugin",
  "twilight-of-ender-queen-awakening": "Twilight Of Ender Queen Awakening | 3D Model Pack",
  "intave-anticheat-1496-high-performance": "Intave AntiCheat 14.9.6 | High Performance",
  "selection-visualizer-minecraft-region": "Selection Visualizer | Minecraft Region Tool",
  "prohopper-v34-fast-optimized-hoppers": "ProHopper v3.4 | Fast Optimized Hoppers",
  "mctiers-cpvp-private-practice-setup": "MCTiers CPvP | Private Practice Setup",
  "custom-enchantments-3-rpg-all-in-one": "Custom Enchantments 3 | RPG All In One",
  "beach-summer-animated-weapons-tools-set": "Beach Summer Animated Weapons & Tools Set",
  "thunderbolt-animated-weapons-tools-set": "Thunderbolt Animated Weapons & Tools Set",
  "premium-bedwars-setup-nitrosetups": "Premium BedWars Setup | NitroSetups",
  "akira-animated-weapons-tools-set": "Akira Animated Weapons & Tools Set",
  "unique-tab-config-premium-minecraft-tab": "Unique TAB Config | Premium Minecraft Tab",
  "prestige-menu-configuration-premium": "Prestige Menu Configuration | Premium Config",
  "dawn-of-abyss-premium-minecraft-model": "Dawn Of Abyss | Premium Minecraft Model",
  "solo-leveling-rank-pack-100-ranks": "Solo Leveling Rank Pack | 100 Ranks",
  "survivalgames-advanced-minecraft": "SurvivalGames | Advanced Minecraft Minigame",
  "spymc-hub-premium-minecraft-lobby-map": "SpyMC Hub | Premium Minecraft Lobby Map",
  "vant-vulcan-anti-cheat-config-premium": "VANT Vulcan Anti-Cheat Config | Premium Config",
  "mcfleetsmp-shop-config-excellentshop": "MCFleetSMP Shop Config | ExcellentShop",
  "premium-lifesteal-setup-nitrosetups": "Premium Lifesteal Setup | NitroSetups",
  "firemc-s7-premium-minecraft-server-setup": "FireMC S7 | Premium Minecraft Server Setup",
  "koth-pirate-cave-premium-pvp-arena-map": "KotH Pirate Cave | Premium PvP Arena Map",
  "lifestealcore-plugin-advanced-lifesteal": "LifestealCore Plugin | Advanced Lifesteal",
  "one-punch-man-armour-weapons-premium": "One Punch Man Armour & Weapons | Premium Pack",
  "pirate-armor-premium-animated-minecraft": "Pirate Armor | Premium Animated Minecraft Armor",
  "spawn-survival-castle-900x850-premium": "Spawn Survival Castle 900x850 | Premium Map",
  "pixelmon-town-premium-pixelmon-spawn-map": "Pixelmon Town | Premium Pixelmon Spawn Map",
  "bingo-minigame-spigot-bungee-velocity": "Bingo Minigame | Spigot, Bungee & Velocity",
  "itemsadder-custom-items-blocks-mobs-hud": "ItemsAdder | Custom Items, Blocks, Mobs & HUD",
  "spartan-anticheat-antiexploit-advanced": "Spartan AntiCheat | AntiExploit Advanced",
  "prism-skyblock-setup-dungeon-rpg": "Prism SkyBlock Setup | Dungeon & RPG Server",
  "obsidian-citadel-map-massive-fantasy": "Obsidian Citadel Map | Massive Fantasy Build",
  "galaxy-boxpvp-premium-setup-advanced": "Galaxy BoxPvP | Premium Advanced Setup",
  "custom-made-lifesteal-setup-1218": "Custom Made Lifesteal Setup | 1.21.8",
  "neptune-practice-setup-modern-practice": "Neptune Practice Setup | Modern Practice Server",
  "mega-dungeon-bundle-map-11-epic-dungeon": "Mega Dungeon Bundle Map | 11 Epic Dungeons",
  "spawn-dragon-orange-village-medieval": "Spawn Dragon Orange Village | Medieval Spawn",
  "spawn-pirate-bay-800x800-massive-pirate": "Spawn Pirate Bay 800x800 | Massive Pirate Spawn",
  "shyamstrikecore-premium-strikepractice": "ShyamStrikeCore | Premium StrikePractice Core",
  "strikepractice-advanced-practice-pvp": "StrikePractice | Advanced Practice PvP",
  "shyampractice-advance-ffa-duels-setup": "ShyamPractice | Advance FFA & Duels Setup",
  "strikepractice-custom-advance-ffa-duels": "StrikePractice Custom | Advance FFA & Duels",
  "shyampractice-v6-lobby-premium": "ShyamPractice v6 Lobby | Premium Lobby Build",
  "bananasmp-warp-pvp-minecraft-pvp-arena": "BananaSMP Warp PvP | Minecraft PvP Arena",
  "survival-2612-setup-premium-minecraft": "Survival 2.6.12 Setup | Premium Minecraft Files",
  "economysmp-premium-minecraft-economy": "EconomySMP | Premium Minecraft Economy Setup",
  "plotsquared-advanced-plot-management": "PlotSquared | Advanced Plot Management",
  "advancedjobs-ui-jobs-gui-menu": "AdvancedJobs | UI Jobs GUI Menu",
  "advancedjobs-20-default-jobs-custom": "AdvancedJobs | 20 Default Jobs & Custom Jobs",
  "advancedjobs-configuration-premium-jobs": "AdvancedJobs Configuration | Premium Jobs Config",
  "model-engine-ultimate-entity-model": "Model Engine | Ultimate Entity Model Plugin",
  "vulcan-anticheat-advanced-minecraft": "Vulcan AntiCheat | Advanced Minecraft AntiCheat",
  "cursorcs-v199-custom-mouse-driven-guis": "CursorCS v1.99 | Custom Mouse Driven GUIs",
  "lpx-antipacketexploit-minecraft-anti": "LPX AntiPacketExploit | Minecraft Anti Exploit",
  "ultimate-colored-tooltips-16-custom": "Ultimate Colored Tooltips | 16 Custom Styles",
  "deluxecombat-plugin-ultimate-combat": "DeluxeCombat Plugin | Ultimate Combat System",
  "deluxecoinflip-multiple-currencies-tax": "DeluxeCoinFlip | Multiple Currencies & Tax",
  "deluxe-announce-real-time-donation": "DeluxeAnnounce | Real Time Donation Alerts",
  "discordsrv-messages-alerts-premium": "DiscordSRV Messages & Alerts | Premium Config",
  "discordlink-all-in-one-discord-sync": "DiscordLink | All In One Discord Sync",
  "discordsynthesis-advanced-discord": "DiscordSynthesis | Advanced Discord Integration",
  "gradientplus-gradient-chat-gradient": "GradientPlus | Gradient Chat & Gradient MOTD",
  "pictogram-dynamic-image-motds-rank-tags": "Pictogram | Dynamic Image MOTDs & Rank Tags",
  "eglow-premium-cosmetic-glow-plugin": "EGlow Premium | Cosmetic Glow Plugin",
  "talismans-plugin-custom-abilities-rpg": "Talismans Plugin | Custom Abilities & RPG Items",
  "battlepass-50-quests-unlimited": "BattlePass | 50 Quests & Unlimited Rewards",
  "axquestboard-advanced-quest-board-plugin": "AxQuestBoard | Advanced Quest Board Plugin",
  "bot-sentry-advanced-antibot-antiproxy": "BotSentry | Advanced AntiBot & AntiProxy",
  "botsentry-advanced-antibot-antiproxy": "BotSentry | Advanced AntiBot & AntiProxy",
  "sentry-plugin-advanced-server-security": "Sentry Plugin | Advanced Server Security",
  "head-database-plugin-50000-custom": "Head Database Plugin | 50,000 Custom Heads",
  "beasttokens-custom-currency-plugin-for": "BeastTokens | Custom Currency Plugin",
  "crazy-vouchers-advanced-voucher-reward": "Crazy Vouchers | Advanced Voucher & Reward",
  "boosters-eula-friendly-global-buffs": "Boosters | EULA Friendly Global Buffs",
  "pinataparty-interactive-event-aio": "PinataParty | Interactive Event AIO",
  "nlogin-plugin-advanced-authentication": "nLogin Plugin | Advanced Authentication",
  "donutantiesp-advanced-anti-esp-freecam": "DonutAntiESP | Advanced Anti ESP & Freecam",
  "force-resourcepacks-automatic-resource": "Force ResourcePacks | Automatic Resource Pack",
  "gladiator-anticheat-advanced-minecraft": "Gladiator AntiCheat | Advanced Minecraft",
  "citiizens-plugin-advanced-npc-system": "Citizens Plugin | Advanced NPC System",
  "flamepaper-high-performance-minecraft": "FlamePaper | High Performance Minecraft Fork",
  "donutsmp-core-all-in-one-smp-plugin": "DonutSMP Core | All In One SMP Plugin",
  "smp-core-all-in-one-minecraft-smp-plugin": "SMP Core | All In One Minecraft SMP Plugin",
  "twocubecore-all-in-one-minecraft-server": "TwoCubeCore | All In One Minecraft Server Core",
  "donutsmp-setup-ultimate-replica-setup": "DonutSMP Setup | Ultimate Replica Setup",
  "donutsmp-duel-arenas-premium-minecraft": "DonutSMP Duel Arenas | Premium Minecraft Maps",
  "donutsmp-double-enderchest-plugin": "DonutSMP Double Enderchest | Plugin",
  "donutsmp-shopgui-config-premium-shop": "DonutSMP ShopGUI Config | Premium Shop",
  "donut-smp-duels-queue-arenas-duels": "Donut SMP Duels | Queue, Arenas & Duels",
  "donut-whitelist-premium-minecraft": "Donut Whitelist | Premium Minecraft Plugin",
  "marcelys-bedwars-advanced-bedwars": "Marcelys BedWars | Advanced BedWars Plugin",
  "mace-roulette-customizable-pvp-minigame": "Mace Roulette | Customizable PvP Minigame",
  "koth-pirate-cave-premium-pvp-arena": "KotH Pirate Cave | Premium PvP Arena",
  "hellbound-koth-nether-themed-pvp-arena": "Hellbound KotH | Nether Themed PvP Arena",
  "crimson-valley-boss-arena-epic-pvp": "Crimson Valley Boss Arena | Epic PvP Build",
  "redmc-boxpvp-setup-complete-boxpvp": "RedMC BoxPvP Setup | Complete BoxPvP Server",
  "factions-setup-professional-minecraft": "Factions Setup | Professional Minecraft Server",
  "custom-made-practice-server-setup-duels": "Custom Made Practice Server Setup | Duels",
  "survival-setup-premium-minecraft": "Survival Setup | Premium Minecraft Server",
  "skyblock-setup-dungeon-rpg": "SkyBlock Setup | Dungeon & RPG Server",
  "red-medieval-lobby-160x160-map-premium": "Red Medieval Lobby 160x160 | Premium Map",
  "server-spawn-premium-minecraft-lobby": "Server Spawn | Premium Minecraft Lobby",
  "spawn-emerald-era-751x550-premium": "Spawn Emerald Era 751x550 | Premium Spawn",
  "spawn-oriental-valley-638x710-massive": "Spawn Oriental Valley 638x710 | Massive Spawn",
  "medieval-tropical-spawn-450x450": "Medieval Tropical Spawn 450x450 | Premium Map",
  "spawn-prism-baroque-300x300-elegant": "Spawn Prism Baroque 300x300 | Elegant Spawn",
  "large-underwater-lobby-premium": "Large Underwater Lobby | Premium Lobby Map",
  "royal-knight-pack-16x-premium-medieval": "Royal Knight Pack 16x | Premium Medieval Models",
  "demon-slayer-v1-model-pack-anime": "Demon Slayer v1 Model Pack | Anime Models",
  "nazguls-fantasy-weapons-vol-1-premium": "Nazguls Fantasy Weapons Vol 1 | Premium Pack",
  "imperial-drakegoat-armaments-fantasy": "Imperial Drakegoat Armaments | Fantasy Pack",
  "spider-x-set-premium-sci-fi-weapon": "Spider X Set | Premium Sci-Fi Weapons",
  "rune-animated-weapon-set-premium": "Rune Animated Weapon Set | Premium Pack",
  "steamsparks-animated-weapon-set-vol-1": "SteamSparks Animated Weapon Set Vol 1",
  "dark-wither-animated-weapons-and-tools": "Dark Wither Animated Weapons And Tools",
  "ocean-animated-weapons-tools-set": "Ocean Animated Weapons & Tools Set",
  "halloween-spider-premium-animated": "Halloween Spider | Premium Animated Model",
  "little-duck-weapons-tools-cosmetics-set": "Little Duck Weapons, Tools & Cosmetics Set",
  "little-cat-into-star-animated-tools": "Little Cat Into Star | Animated Tools Set",
  "embered-sets-moon-animated-premium": "Embered Sets Moon Animated | Premium Set",
  "eagle-ascendant-premium-animated": "Eagle Ascendant | Premium Animated Model",
  "dynasty-bloom-64x-animated-minecraft": "Dynasty Bloom 64x | Animated Minecraft Models",
  "asura-animated-weapon-set-premium": "Asura Animated Weapon Set | Premium Pack",
  "yin-yang-animated-weapon-pack": "Yin Yang Animated Weapon Pack | Custom Weapons",
  "hologram-plugin-minecraft": "Hologram Plugin | Minecraft Holograms",
  "solo-leveling-minecraft-esc-menu": "Solo Leveling Minecraft ESC Menu | Custom GUI",
  "basic-purple-esc-menu-minecraft-custom": "Basic Purple ESC Menu | Minecraft Custom GUI",
  "superior-esc-menu-premium-minecraft": "Superior ESC Menu | Premium Minecraft GUI",
  "gui-admin-tools-premium-all-in-one": "GUI Admin Tools Premium | All In One",
  "90-general-icons-premium-minecraft-gui": "90 General Icons | Premium Minecraft GUI Icons",
  "fischvogels-rank-icons-top-3-premium": "Fischvogels Rank Icons Top 3 | Premium Icons",
  "premium-leaderboards-configuration": "Premium Leaderboards Configuration",
  "playtime-levels-deluxemenus": "Playtime Levels | DeluxeMenus Config",
  "premium-shopgui-config-modern-animated": "Premium ShopGUI Config | Modern Animated",
  "bananasmp-shopguiplus-config-premium": "BananaSMP ShopGUIPlus Config | Premium",
  "zshop-advanced-shop-gui-plugin-for": "zShop | Advanced Shop GUI Plugin",
  "excellentshop-plugin-modern-2-in-1-shop": "ExcellentShop Plugin | Modern 2 In 1 Shop",
  "economy-smp-config": "Economy SMP Config | Premium Shop Setup",
  "icon-pack-2-premium-minecraft-gui": "Icon Pack 2 | Premium Minecraft GUI Icons",
  "10-skripts-bundle-essential-minecraft": "10 Skripts Bundle | Essential Minecraft Skripts",
  "glitch-smp-s2-plugin-pack-complete-smp": "Glitch SMP S2 Plugin Pack | Complete SMP",
  "infusesmp-season-2-revamped-advanced": "InfuseSMP Season 2 Revamped | Advanced Setup",
  "mctiers-cpvp-private-practice": "MCTiers CPvP | Private Practice Setup",
  "plugin-hide-pro-advanced-command-tab": "Plugin Hide Pro | Advanced Command & Tab Hider",
  "unlimited-nametags-plugin": "Unlimited Nametags | Minecraft Plugin",
  "custom-bossbar-for-welcome-message": "Custom BossBar | Welcome Message Config",
  "animated-rtp-menu-choose-your-distance": "Animated RTP Menu | Choose Your Distance",
  "prime-survival-bank-update-v15-advanced": "Prime Survival Bank Update v1.5 | Advanced",
  "ultimate-survival-crimson-base": "Ultimate Survival Crimson Base | Spawn Build",
  "ashmc-lifesteal-server-setup": "AshMC Lifesteal Server Setup | Premium Files",
  "survival-server-setup-2612-premium": "Survival Server Setup 2.6.12 | Premium Files",
  "phoneixmc-survival-setup-minecraft": "PhoenixMC Survival Setup | Minecraft Server",
  "premium-survival-smp-setup": "Premium Survival SMP Setup | Paper Server Files",
  "262-premium-lifesteal-setup": "2.6.2 Premium Lifesteal Setup | Minecraft Files",
  "lifesteal-12111-setup": "Lifesteal 1.21.11 Setup | Custom Texture Armor & Tools",
  "premium-lifesteal-setup": "Premium Lifesteal Setup | NitroSetups",
  "lifemc-lifesteal-12111-setup": "LifeMC Lifesteal 1.21.11 Setup | Premium Files",
  "network-spawn-minecraft": "Network Spawn | Premium Minecraft Build",
  "hub-map-minecraft": "Hub Map | Premium Minecraft Lobby",
  "spawn-build-minecraft": "Spawn Build | Premium Minecraft Spawn",
  "pvp-arena-map": "PvP Arena Map | Minecraft Build",
  "boxpvp-map": "BoxPvP Map | Minecraft Build Pack",
  "spawn-hub-lobby": "Spawn Hub Lobby | Minecraft Build",
  "rpg-map-minecraft": "RPG Map | Premium Minecraft Build",
  "adventure-map-minecraft": "Adventure Map | Premium Minecraft Build",
  "castle-map-minecraft": "Castle Map | Premium Minecraft Build",
  "fantasy-map-minecraft": "Fantasy Map | Premium Minecraft Build",
  "duels-setup-minecraft": "Duels Setup | Premium Minecraft Server",
  "practice-setup-minecraft": "Practice Setup | Premium Minecraft Server",
  "koth-setup-minecraft": "KotH Setup | Premium Minecraft Server",
  "bedwars-setup-minecraft": "BedWars Setup | Premium Minecraft Server",
  "smp-setup-minecraft": "SMP Setup | Premium Minecraft Server",
  "economy-setup-minecraft": "Economy Setup | Premium Minecraft Server",
  "custom-model-pack": "Custom Model Pack | Premium 3D Models",
  "animated-model-pack": "Animated Model Pack | Premium 3D Models",
  "weapon-model-pack": "Weapon Model Pack | Premium 3D Weapons",
  "armor-model-pack": "Armor Model Pack | Premium 3D Armor",
};

export type Resource = {
  slug: string;          // full path, e.g. 2026/11/cmi-plugin...
  key: string;           // bare slug
  url: string;           // canonical URL
  title: string;
  category: Category;
  date: string;          // YYYY-MM-DD
  month: string;         // YYYY-MM
  labels: string[];
};

function titleCase(input: string): string {
  const small = new Set([
    "a", "an", "and", "as", "at", "but", "by", "for", "from", "in", "into",
    "of", "on", "or", "the", "to", "vs", "with", "your",
  ]);
  return input
    .split(" ")
    .filter(Boolean)
    .map((word, i) => {
      const lower = word.toLowerCase();
      if (/^v?\d/.test(lower)) return word.toUpperCase() === word ? word : word;
      if (i !== 0 && small.has(lower)) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(" ");
}

function titleFromSlug(key: string): string {
  const cleaned = key
    .replace(/_\d+$/, "")
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return titleCase(cleaned);
}

function categoryFor(key: string): Category {
  const k = key.toLowerCase();
  const has = (...terms: string[]) => terms.some((t) => k.includes(t));

  if (has("fork", "flamepaper", "twocubecore", "paper-fork", "server-core")) return "fork";
  if (has("esc-menu", "rank-icon", "icon-pack", "general-icons", "tooltips", "tab-config", "gui", "guis", "deluxemenus", "shopgui", "shop-config", "menus", "leaderboard", "motd", "bossbar", "scoreboard", "placeholder"))
    return "config";
  if (has("map", "spawn-", "-spawn", "lobby", "arena", "hub", "dungeon", "terrain", "koth-", "build", "citadel", "valley", "easter", "halloween-origin", "tree-lobby", "pirate-bay", "oriental", "baroque", "emerald-era", "crimson-base", "underwater"))
    return "map";
  if (has("model", "animated-weapon", "weapon-set", "weapons", "armor", "tools-set", "armaments", "pack-16x", "rank-pack", "cosmetics-set", "demon-slayer", "drago", "3d-"))
    return "model";
  if (has("setup", "server-files")) return "setup";
  return "plugin";
}

function labelsFor(key: string, category: Category): string[] {
  const k = key.toLowerCase();
  const labels: string[] = [];
  const push = (v: string) => {
    if (!labels.includes(v) && labels.length < 3) labels.push(v);
  };

  const base: Record<Category, string> = {
    plugin: "plugin",
    setup: "setup",
    map: "map",
    model: "model",
    config: "config",
    fork: "fork",
  };
  push(base[category]);

  if (/anticheat|anti-cheat|anti_cheat|spartan|vulcan|matrix|gladiator|intave|sentry|guard|antibot|antivpn|antixray|xray|exploit|antiesp|antiesp/.test(k))
    push("anti cheat");
  if (/lifesteal/.test(k)) push("lifesteal");
  if (/boxpvp|pvp|duel|practice|strike|ffa|arena|koth|bedwars|minigame|pvpmanager|combat/.test(k))
    push("pvp");
  if (/economy|shop|auction|vault|coins|tokens|market|bank|withdraw/.test(k)) push("economy");
  if (/oraxen|itemsadder|nexo|modelengine|model-engine|cosmetic|hats|gadgets/.test(k)) push("custom items");
  if (/discord/.test(k)) push("discord");
  if (/optimiz|performance|hopper|folia|purpur|paper/.test(k)) push("optimization");
  if (labels.length < 3) push("free download");

  return labels;
}

const rawSlugs = RAW_SLUGS;


// Real publication dates were only recoverable for the newest posts, so the rest of
// the catalogue gets deterministic, plausible dates that never land in the future.
const TODAY = new Date("2026-11-07T00:00:00Z");
const monthCounters = new Map<string, number>();

function dateFor(year: string, month: string): string {
  const key = `${year}-${month}`;
  const seen = monthCounters.get(key) ?? 0;
  monthCounters.set(key, seen + 1);
  const daysInMonth = new Date(Date.UTC(Number(year), Number(month), 0)).getUTCDate();
  const ceiling =
    Number(year) === TODAY.getUTCFullYear() && Number(month) === TODAY.getUTCMonth() + 1
      ? TODAY.getUTCDate()
      : daysInMonth;
  // Spread posts backwards from the newest day available in that month.
  const day = Math.max(1, ceiling - Math.floor((seen * (ceiling - 1)) / 30));
  return `${year}-${month}-${String(day).padStart(2, "0")}`;
}

const seen = new Set<string>();

export const RESOURCES: Resource[] = rawSlugs
  .filter((slug) => {
    if (seen.has(slug)) return false;
    seen.add(slug);
    return true;
  })
  .map((slug, index) => {
    const key = slug.replace(/^.*\//, "").replace(/\.html$/, "");
    const category = categoryFor(key);
    const [year, month] = slug.split("/");
    return {
      slug,
      key,
      url: `https://www.galaxysetuppro.online/${slug}`,
      title: KNOWN_TITLES[key] ?? titleFromSlug(key),
      category,
      date: KNOWN_DATES[key] ?? dateFor(year, month),
      month: `${year}-${month}`,
      labels: labelsFor(key, category),
    };
  })
  .sort((a, b) => (a.slug < b.slug ? 1 : -1));

export const TOTAL_RESOURCES = RESOURCES.length;

export function resourcesByCategory(category: Category): Resource[] {
  return RESOURCES.filter((r) => r.category === category);
}

export function getResource(slug: string): Resource | undefined {
  const normalized = slug.replace(/^\/+/, "");
  return RESOURCES.find((r) => r.slug === normalized || r.key === normalized);
}

export function relatedResources(resource: Resource, limit = 3): Resource[] {
  const same = RESOURCES.filter(
    (r) => r.category === resource.category && r.slug !== resource.slug,
  );
  return same.slice(0, limit);
}

const KIND_BY_CATEGORY: Record<Category, string> = {
  plugin: "plugin",
  setup: "server setup",
  map: "build",
  model: "model pack",
  config: "config pack",
  fork: "server fork",
};

/** Short excerpt used on feed cards. */
export function snippetFor(resource: Resource): string {
  const kind = KIND_BY_CATEGORY[resource.category];
  const highlight = resource.labels.find((l) => l !== kind && l !== "free download");
  const focus = highlight ? ` Focus: ${highlight}.` : "";
  return `${resource.title} — a free Minecraft ${kind} for Paper, Spigot and Purpur servers.${focus} Installation guide and requirements included.`;
}

/** Deterministic 2:1 cover generated locally so cards always render. */
export function coverStyle(resource: Resource): { backgroundImage: string } {
  const seed = resource.key || resource.slug;
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) % 360;
  }
  const hue = hash;
  const second = (hash + 42) % 360;
  const isLight = resource.category === "config" || resource.category === "fork";
  const ink = isLight ? "f2e9ff" : "cbb8ff";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="400" viewBox="0 0 800 400">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="hsl(${hue} 70% 16%)"/>
      <stop offset="55%" stop-color="hsl(${second} 78% 32%)"/>
      <stop offset="100%" stop-color="hsl(${(hue + 280) % 360} 85% 52%)"/>
    </linearGradient>
    <pattern id="p" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0H0V40" fill="none" stroke="rgba(255,255,255,.09)" stroke-width="2"/>
    </pattern>
  </defs>
  <rect width="800" height="400" fill="url(#g)"/>
  <rect width="800" height="400" fill="url(#p)"/>
  <g fill="${ink}" font-family="Arial Narrow,Arial,sans-serif" font-weight="800" text-anchor="middle">
    <text x="400" y="196" font-size="96" letter-spacing="6">GSP</text>
    <text x="400" y="248" font-size="24" letter-spacing="10">${resource.category.toUpperCase()}</text>
  </g>
  <rect x="0" y="380" width="800" height="20" fill="rgba(0,0,0,.45)"/>
</svg>`;
  return { backgroundImage: `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}")` };
}
