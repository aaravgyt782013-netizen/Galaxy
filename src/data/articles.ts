export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "kv"; rows: [string, string][] }
  | { type: "note"; text: string }
  | { type: "quote"; text: string }
  | { type: "tagline"; text: string };

export type Article = {
  kicker?: string;
  sub?: string;
  blocks: Block[];
};

const generic = (name: string, kind: string, category: string): Article => ({
  blocks: [
    { type: "tagline", text: `${name} — free ${kind} for Minecraft servers` },
    {
      type: "p",
      text: `${name} is part of the Galaxy Setup Pro library: a curated free ${kind} that server owners can drop straight into a live Minecraft network. Everything listed here is shared for the community at no cost.`,
    },
    { type: "h2", text: `About ${name}` },
    {
      type: "p",
      text: `This ${kind} is built for modern Java Edition servers running Paper, Spigot or Purpur and fits naturally into ${category} workflows. Review the bundled files, adjust the configuration to your own branding, and test on a staging server before opening it to players.`,
    },
    { type: "h2", text: "Main Highlights" },
    {
      type: "ul",
      items: [
        "Ready to install on modern Paper / Spigot servers",
        "Clean, documented configuration files",
        "Compatible with PlaceholderAPI where relevant",
        "Free to download from Galaxy Setup Pro",
        "Easy to re-brand for your own community",
      ],
    },
    { type: "h2", text: "Installation Guide" },
    {
      type: "ol",
      items: [
        "Back up your existing server files and configuration.",
        "Stop the server before replacing or adding anything.",
        "Place the downloaded files in the correct server directory.",
        "Review the configuration files and adjust settings for your network.",
        "Start the server and check the console for errors.",
        "Test all features on a staging server before going public.",
      ],
    },
    {
      type: "note",
      text: "All files are shared for educational and community use. Plugin names, builds and trademarks belong to their original authors. Support the developers by using official marketplaces for premium resources.",
    },
  ],
});

const ARTICLES: Record<string, Article> = {
  "cmi-plugin-300-commands-kits-portals": {
    kicker: "CMI",
    sub: "300 Commands • Economy • Kits • Portals",
    blocks: [
      { type: "tagline", text: "Ultimate Minecraft Server Plugin" },
      {
        type: "p",
        text: "Looking for an all-in-one Minecraft server management plugin? CMI by Zrips offers nearly 300 commands and a massive collection of useful features for Minecraft server owners.",
      },
      {
        type: "p",
        text: "From economy and custom kits to portals, holograms, chat management and advanced administration tools, CMI helps you manage your server with fewer separate plugins.",
      },
      { type: "h2", text: "About CMI Plugin" },
      {
        type: "p",
        text: "CMI is one of the longest running all-in-one management plugins in the Minecraft scene. Instead of installing a dozen small utilities, server owners get economy, kits, warps, portals, holograms, chat formatting, bossbars, tab lists and moderation tools from a single JAR.",
      },
      { type: "h2", text: "Main Features" },
      {
        type: "ul",
        items: [
          "Nearly 300 commands for players, moderators and administrators",
          "Economy system with balances and top balance tracking",
          "Custom kit system with an in-game GUI kit editor",
          "Portal system with particles, commands and network support",
          "Interactive holograms with clickable commands and PlaceholderAPI support",
          "Chat manager with advanced formatting and hex colors",
          "MySQL and SQLite database support",
          "BossBar and TabList customization",
          "Administration tools: jail, maintenance mode and player management",
        ],
      },
      { type: "h2", text: "Advanced Kit Editor" },
      {
        type: "p",
        text: "CMI provides an integrated kit editor that allows server owners to create and configure kits directly through an in-game interface. You can define kit contents, cooldowns, permissions and per-kit messages without ever touching a YAML file.",
      },
      { type: "h2", text: "Hologram System" },
      {
        type: "p",
        text: "Create attractive server holograms to display information, player statistics, server rules and interactive messages. Holograms support PlaceholderAPI, so leaderboards such as playtime or balance can update live.",
      },
      { type: "h2", text: "Plugin Information" },
      {
        type: "kv",
        rows: [
          ["Plugin", "CMI"],
          ["Author", "Zrips"],
          ["Category", "Server Management"],
          ["Platform", "Spigot / Paper"],
          ["Commands", "Nearly 300"],
          ["Database", "MySQL / SQLite"],
          ["Type", "Premium"],
          ["Required Library", "CMILib"],
        ],
      },
      { type: "h2", text: "Installation Guide" },
      {
        type: "ol",
        items: [
          "Obtain the official licensed CMI plugin.",
          "Download the required CMILib library.",
          "Stop your Minecraft server.",
          "Upload both JAR files into your server's plugins folder.",
          "Start your server and check the console.",
          "Configure CMI according to your requirements.",
        ],
      },
      {
        type: "note",
        text: "CMI is a premium plugin. CMILib is its required free library. Check the official documentation for compatible versions and setup requirements.",
      },
      { type: "h2", text: "Disclaimer" },
      {
        type: "p",
        text: "CMI is developed and maintained by Zrips. It is a premium resource — please obtain it through the official marketplace. All plugin trademarks and screenshots belong to their respective owners.",
      },
    ],
  },
  "deluxewithdraw-minecraft-plugin-bank": {
    kicker: "DeluxeWithdraw",
    sub: "Bank Notes • XP Withdrawal • Custom Currencies • Satchel Textures",
    blocks: [
      { type: "tagline", text: "Physical bank notes for your Minecraft economy" },
      {
        type: "p",
        text: "Looking for a flexible withdrawal system for your Minecraft economy? DeluxeWithdraw by Norska is a modular plugin that allows players to convert supported currencies into physical, redeemable items.",
      },
      {
        type: "p",
        text: "Players can withdraw money, experience, tokens and other supported currencies into custom notes or satchels. These items can be stored, traded and redeemed according to the rules configured by the server administrator.",
      },
      {
        type: "p",
        text: "Server owners can customize item tiers, textures, names, lore, withdrawal amounts, taxes, allowed worlds and redemption effects.",
      },
      { type: "h2", text: "Main Features" },
      {
        type: "ul",
        items: [
          "Money withdrawal into physical, redeemable notes",
          "Experience withdrawal through the dedicated XP addon",
          "Custom currency support for tokens, hearts, coins and more",
          "Custom item tiers with individual settings",
          "Bundled resource pack with seven satchel textures",
          "Custom names, lore, glow, item flags and custom heads",
          "Configurable minimum and maximum withdrawal amounts",
          "High value withdrawals documented up to 10 trillion",
          "Custom redemption taxes and world restrictions",
          "Particle effects and animations when satchels are redeemed",
          "Admin item distribution via /dw give",
          "Fix for the Infinite Decimal Points exploit",
          "Modular addons plus a developer API",
        ],
      },
      { type: "h2", text: "Supported Currencies & Addons" },
      {
        type: "ul",
        items: [
          "Vault — withdraw supported economy balances",
          "Experience — convert Minecraft XP into redeemable items",
          "LifestealCore — support for LifestealCore hearts",
          "DeluxeSellwands — support for DeluxeSellwands tokens",
          "SuperMobcoins — withdraw Mobcoins currency",
          "CoinsEngine — support for configured currencies",
          "TokenManager — integrate supported token balances",
          "PlayerPoints — convert PlayerPoints into redeemable items",
        ],
      },
      {
        type: "p",
        text: "These integrations are separate addons, not all built into the core plugin. Each addon may require its corresponding plugin to be installed and configured.",
      },
      { type: "h2", text: "Useful Commands" },
      {
        type: "ul",
        items: [
          "/dw give [user] [tier] [value] [amount] [-s] — give configured withdrawable items",
          "/dw reload — reload plugin configuration",
          "/dw version — view plugin version and update information",
          "/dw debuginfo — display plugin debug information",
        ],
      },
      { type: "h2", text: "Permissions" },
      {
        type: "ul",
        items: [
          "dw.admin — access to the admin menu and tab completion",
          "dw.admin.give — permission to use the give command",
          "dw.admin.reload — permission to reload configurations",
          "dw.user.use — permission to use redeemable items",
          "dw.user.create — permission to create withdrawal items",
          "dw.user.bypass.worlds — bypass configured world restrictions",
          "dw.user.bypass.tax — bypass configured redemption taxes",
        ],
      },
      { type: "h2", text: "Resource Pack & Custom Textures" },
      {
        type: "p",
        text: "DeluxeWithdraw comes bundled with a free resource pack containing seven custom satchel textures for its supported default items. All satchels use the FEATHER material, while animations use TOTEM_OF_UNDYING.",
      },
      { type: "h2", text: "Compatibility & Requirements" },
      {
        type: "kv",
        rows: [
          ["Plugin", "DeluxeWithdraw"],
          ["Developer", "Norska"],
          ["Currency system", "Modular addons"],
          ["Resource pack", "Optional, needed for satchel textures"],
          ["Additional currencies", "Install the relevant addon"],
        ],
      },
      { type: "h2", text: "Installation Guide" },
      {
        type: "ol",
        items: [
          "Obtain DeluxeWithdraw through the authorized purchase process.",
          "Back up your server files and existing configuration.",
          "Place the DeluxeWithdraw JAR inside your server's plugins folder.",
          "Restart the server and check the console for startup errors.",
          "Configure tiers, textures, taxes and world rules in config.yml.",
          "Install the currency addons you need and test redemption in-game.",
        ],
      },
    ],
  },
  "extrastorage-minecraft-plugin-auto": {
    kicker: "ExtraStorage",
    sub: "Virtual Storage • Auto Pickup • Sorting • Selling",
    blocks: [
      { type: "tagline", text: "Never lose a drop again" },
      {
        type: "p",
        text: "Looking for a better storage system for your Minecraft server? ExtraStorage by HSGamer introduces virtual storage that allows players to collect, organize and manage mined or picked-up items without relying entirely on their normal inventory.",
      },
      {
        type: "p",
        text: "Instead of letting eligible item drops accumulate on the ground, the plugin can collect them directly into a player's virtual storage. Players can filter specific items, organize their storage through sorting and sell stored items using the available selling system.",
      },
      {
        type: "p",
        text: "ExtraStorage is particularly useful for SkyBlock and Prison servers, where players regularly collect large quantities of resources.",
      },
      { type: "h2", text: "Main Features" },
      {
        type: "ul",
        items: [
          "Virtual player storage for collected items",
          "Automatic item pickup from mined blocks and drops",
          "Storage filtering to choose what gets collected",
          "Built-in sorting system",
          "Sell eligible items directly from virtual storage",
          "Configurable item worth values",
          "Custom storage UI",
          "SkyBlock, economy and marketplace integrations",
          "PlaceholderAPI, HeadDatabase, ItemsAdder and Oraxen support",
          "Folia support",
          "Developer API",
          "Detailed, commented configuration files",
        ],
      },
      { type: "h2", text: "How ExtraStorage Works" },
      {
        type: "ol",
        items: [
          "A player mines a block or picks up an eligible item.",
          "The plugin detects the eligible item drop or pickup.",
          "The item is collected into the player's virtual storage.",
          "The player opens the storage interface to view collected items.",
          "Players can filter, sort or sell eligible stored items.",
        ],
      },
      { type: "h2", text: "Selling & Economy Features" },
      {
        type: "ul",
        items: [
          "Configure item values through the worth configuration",
          "Connect supported economy providers",
          "Integrate supported marketplace plugins",
          "Use storage placeholders in external menus",
          "Configure custom items through compatible item integrations",
        ],
      },
      { type: "h2", text: "Useful Placeholders" },
      {
        type: "ul",
        items: [
          "%exstorage_items% — lists items in the player's storage",
          "%exstorage_items_material% — lists stored items alphabetically by material",
          "%exstorage_status% — displays the storage status",
        ],
      },
      { type: "h2", text: "Compatibility & Requirements" },
      {
        type: "kv",
        rows: [
          ["Plugin", "ExtraStorage"],
          ["Developer", "HSGamer"],
          ["Server software", "Bukkit, Spigot, Paper, Purpur, Folia"],
          ["License", "MIT on the public source repository"],
          ["Optional", "PlaceholderAPI, HeadDatabase, ItemsAdder, Oraxen, economy"],
        ],
      },
      {
        type: "note",
        text: "Some third-party plugins modify block drops or create their own item drops. Test your mining setup with custom-drop plugins before opening the server to players, and keep a backup before updating ExtraStorage.",
      },
      { type: "h2", text: "Installation Guide" },
      {
        type: "ol",
        items: [
          "Download ExtraStorage from the official SpigotMC or Modrinth resource page.",
          "Back up your existing server files and storage data.",
          "Place the plugin JAR inside your server's plugins folder.",
          "Restart the server and check the console for startup errors.",
          "Review the generated configuration files.",
          "Configure pickup, filters, sorting and selling options.",
          "Set up economy or custom item integrations if required.",
          "Test mining, filtering, sorting and selling before launch.",
        ],
      },
    ],
  },
  "gadgetsmenu-premium-minecraft-cosmetics": {
    kicker: "GadgetsMenu",
    sub: "Minecraft Cosmetics • Hats • Pets • Suits • Emotes • Cloaks",
    blocks: [
      { type: "tagline", text: "Premium cosmetics system for hubs and lobbies" },
      {
        type: "p",
        text: "Want to make your Minecraft hub or lobby more exciting with player cosmetics? GadgetsMenu Premium by Yap Zhen Yie is a feature-rich cosmetics plugin that allows players to customize their appearance using different cosmetic items and visual effects.",
      },
      {
        type: "p",
        text: "Players can equip hats, animated hats, particles, suits, pets, miniatures, morphs, banners, emotes and cloaks through an organized menu system.",
      },
      {
        type: "p",
        text: "Server administrators can configure cosmetic permissions, menus, player storage, cosmetic availability and integrations to create a customized experience for their community.",
      },
      { type: "h2", text: "Main Features" },
      {
        type: "ul",
        items: [
          "Hats and animated hats",
          "Particle effects and visual trails",
          "Cosmetic suits and themed outfits",
          "Pets and miniatures, with pet renaming",
          "Morphs that transform the player's appearance",
          "Banners, emotes and cloak accessories",
          "Cosmetic wardrobe GUI for browsing and equipping",
          "Fine grained cosmetic permissions",
          "Cosmetic purchases with supported currencies",
          "SQLite or MySQL player data storage",
          "Automatic cosmetic sync on join",
          "Multi-server synchronization with MySQL",
          "WorldGuard region restrictions",
          "Custom messages and PlaceholderAPI support",
          "Anti-lag system that unequips cosmetics on low TPS",
        ],
      },
      { type: "h2", text: "Cosmetic Categories" },
      {
        type: "ul",
        items: [
          "Hats and animated hats",
          "Particle effects",
          "Cosmetic suits",
          "Pets and miniatures",
          "Morph appearances",
          "Banners and emotes",
          "Decorative cloaks",
        ],
      },
      { type: "h2", text: "Player Data & Storage" },
      {
        type: "ul",
        items: [
          "SQLite storage for local persistence",
          "MySQL storage for networks",
          "Cosmetic synchronization when players join",
          "Network support across connected servers",
          "Performance management via the anti-lag controls",
        ],
      },
      { type: "h2", text: "Useful Commands" },
      {
        type: "ul",
        items: [
          "/gmenu main — open the main cosmetics menu",
          "/gmenu help [page] — view available commands",
          "/gmenu about — display plugin information",
          "/gmenu menu <cosmetic> [page] — open a cosmetic category",
          "/gmenu namepet <name> — rename your supported pet",
          "/gmenu reset <all|cosmetic> <player|all> — reset active cosmetics",
          "/gmenu reload <confirm> — reload plugin settings",
        ],
      },
      { type: "h2", text: "Optional Dependencies & Integrations" },
      {
        type: "ul",
        items: [
          "Lib's Disguises or iDisguise — required for morph features",
          "PlaceholderAPI — supported placeholders",
          "Vault — compatible currency integrations",
          "PlayerPoints / CoinsAPI — optional cosmetic currencies",
          "WorldGuard — region based cosmetic restrictions",
          "MySQL — persistent storage and network sync",
        ],
      },
      { type: "h2", text: "Installation Guide" },
      {
        type: "ol",
        items: [
          "Obtain GadgetsMenu Premium through the official resource page.",
          "Back up your existing server files and plugin configurations.",
          "Place GadgetsMenu.jar inside your server's plugins folder.",
          "Restart the server and let the configuration files generate.",
          "Stop the server and review the generated configuration.",
          "Configure categories, permissions, storage and integrations.",
          "Set up MySQL if you need network wide cosmetic sync.",
          "Start the server and test the menu with a non-admin account.",
        ],
      },
    ],
  },
  "lifesteal-12111-setup-custom-texture": {
    kicker: "Lifesteal 1.21.11 Setup",
    sub: "Custom Texture Armor & Tools • Minecraft Survival PvP",
    blocks: [
      {
        type: "p",
        text: "Ready to create a Lifesteal SMP with a unique visual style? This Lifesteal 1.21.11 Setup brings together Minecraft survival PvP gameplay and custom-texture armor and tools.",
      },
      {
        type: "p",
        text: "The custom visual designs give the equipment a distinctive appearance, helping your server develop its own identity. The setup provides a starting point for building a Lifesteal multiplayer experience that you can customize for your community.",
      },
      { type: "h2", text: "About This Lifesteal Setup" },
      {
        type: "p",
        text: "Lifesteal is a survival-based multiplayer game mode where player hearts are connected to PvP progression. Players compete, survive and develop their gameplay strategies while building their place in the server community.",
      },
      {
        type: "p",
        text: "This setup is intended for server owners who want a Lifesteal experience with a custom equipment appearance instead of relying only on default Minecraft item textures.",
      },
      { type: "h2", text: "Main Highlights" },
      {
        type: "ul",
        items: [
          "Lifesteal gameplay built around survival PvP",
          "Custom texture armor with its own visual identity",
          "Custom texture tools instead of default item skins",
          "PvP survival balance for competitive play",
          "Room to personalize the server for your community",
          "Recognizable look for your Lifesteal SMP",
        ],
      },
      { type: "h2", text: "Custom Armor & Tools" },
      {
        type: "ul",
        items: [
          "Custom armor appearance",
          "Custom tool appearance",
          "A distinctive visual theme for server equipment",
          "A more personalized experience for players",
        ],
      },
      { type: "h2", text: "Setup Information" },
      {
        type: "kv",
        rows: [
          ["Setup Name", "Lifesteal Setup"],
          ["Minecraft Edition", "Java Edition"],
          ["Minecraft Version", "1.21.11"],
          ["Game Mode", "Lifesteal SMP"],
          ["Special Feature", "Custom Texture Armor & Tools"],
        ],
      },
      { type: "h2", text: "Installation & Setup" },
      {
        type: "ol",
        items: [
          "Prepare a Minecraft Java Edition server running the required version.",
          "Back up your existing server files before installing anything.",
          "Place the setup files in their appropriate server directories.",
          "Review the configuration files and customize server settings.",
          "Configure the custom texture assets or resource pack.",
          "Check that the custom armor and tools display correctly in-game.",
          "Verify plugin and dependency compatibility before launching.",
          "Test the Lifesteal gameplay before inviting players.",
        ],
      },
      { type: "h2", text: "Customization Ideas" },
      {
        type: "p",
        text: "Make your Lifesteal server stand out with your own branding, server rules, community features and gameplay settings. You can also personalize the names and presentation of equipment where the included systems allow it.",
      },
      { type: "h2", text: "Important Notes" },
      {
        type: "ul",
        items: [
          "Use the correct Minecraft version for the setup",
          "Check the custom resource pack configuration before launching",
          "Test the equipment textures with the intended client settings",
          "Verify that all installed plugins and dependencies are compatible",
          "Keep regular backups of your server and world files",
        ],
      },
    ],
  },
  "mcpvp-setup-v11-1-12111-modern-practice": {
    kicker: "MCPVP Setup v1.1",
    sub: "Modern Practice & Duels • Paper 1.21.11",
    blocks: [
      {
        type: "p",
        text: "MCPVP Setup is a modern Minecraft Practice & Duels server setup built around a complete PvP experience with configurable queues, kits, arenas, GUIs, lobby features, player settings, and more.",
      },
      {
        type: "p",
        text: "The setup's native version is 1.21.11 and it is designed for modern Paper servers.",
      },
      { type: "h2", text: "Features" },
      {
        type: "ul",
        items: [
          "Duels system",
          "Queue system",
          "Built-in kit editor",
          "Arena management",
          "Arena editor mode",
          "Custom GUIs",
          "Configurable lobby items",
          "Player settings menu",
          "Display tags",
          "Friends system",
          "Private messages",
          "Nick system",
          "Round selection",
          "PlaceholderAPI support",
          "TAB support",
          "MC Tiers support",
          "Custom messages and animations",
          "Custom sounds and actionbars",
          "YAML based configuration",
          "Optimized data system",
        ],
      },
      { type: "h2", text: "Version Information" },
      {
        type: "kv",
        rows: [
          ["Native version", "Minecraft 1.21.11"],
          ["Software", "Paper"],
          ["Game mode", "Practice & Duels"],
          ["Setup type", "Premium server files"],
        ],
      },
      { type: "h2", text: "Installation Guide" },
      {
        type: "ol",
        items: [
          "Create a fresh Paper 1.21.11 server.",
          "Back up any existing configuration.",
          "Upload the setup files into the server directory.",
          "Install the required dependencies used by the practice core.",
          "Review queue, kit and arena configuration.",
          "Test duels, queues and the kit editor before launch.",
        ],
      },
    ],
  },
};

export function getArticle(slug: string, title: string, category: string): Article {
  const found = ARTICLES[slug];
  if (found) return found;

  const kind =
    category === "plugin" ? "plugin" :
    category === "setup" ? "server setup" :
    category === "map" ? "map" :
    category === "model" ? "3D model pack" :
    category === "config" ? "configuration pack" :
    "server fork";

  const categoryLabel =
    category === "plugin" ? "plugin" :
    category === "setup" ? "server setup" :
    category === "map" ? "map and build" :
    category === "model" ? "model" :
    category === "config" ? "configuration" :
    "server software";

  return generic(title, kind, categoryLabel);
}
