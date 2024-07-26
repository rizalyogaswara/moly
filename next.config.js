const withPWA = require("@ducanh2912/next-pwa").default({
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  dest: "public",
  fallbacks: {
    // image: {
    //   homeBackground: "/assets/monopoly-bg.webp",
    //   // Icon
    //   cancelIcon: "/assets/icon/cancel-btn.png",
    //   muteIcon: "/assets/icon/mute.png",
    //   unmuteIcon: "/assets/icon/unmute.png",
    //   warningIcon: "/assets/icon/warning.png",
    //   //  Alat-tulis
    //   bolpenImage: "/assets/alat-tulis/bolpen.png",
    //   bukuImage: "/assets/alat-tulis/buku.png",
    //   jangkaImage: "/assets/alat-tulis/jangka.png",
    //   pencilImage: "/assets/alat-tulis/pencil.png",
    //   penggarisImage: "/assets/alat-tulis/penggaris.png",
    //   penghapusImage: "/assets/alat-tulis/penghapus.png",
    //   rautanImage: "/assets/alat-tulis/rautan.png",
    //   stabiloImage: "/assets/alat-tulis/stabilo.png",
    //   stickyNoteImage: "/assets/alat-tulis/sticky-note.png",
    //   tapeImage: "/assets/alat-tulis/tape.png",
    //   // Avatar
    //   bajaiAvatar: "/src/assets/avatar/bajai.png",
    //   shipAvatar: "/src/assets/avatar/ship.png",
    //   kangorooAvatar: "/src/assets/avatar/kangoroo.png",
    //   penguinAvatar: "/src/assets/avatar/penguin.png",
    //   // Board-Background
    //   cyr: "/src/assets/background/cry.png",
    //   rupiah: "/src/assets/background/rupiah.png",
    //   startFlag: "/src/assets/background/start-flag.webp",
    //   store: "/src/assets/background/store.png",
    //   // Game-Instruction
    //   blokGame: "/src/assets/information-game/blok-game.png",
    //   diceGame: "/src/assets/information-game/dice-game.png",
    //   itemGame: "/src/assets/information-game/item-game.png",
    //   listItemGame: "/src/assets/information-game/list-item-game.png",
    //   resultDiceGame: "/src/assets/information-game/result-dice-game.png",
    //   sesiGame: "/src/assets/information-game/sesi-game.png",
    //   tokoGame: "/src/assets/information-game/toko-game.png",
    //   // Game-Images
    //   homeIcon: "/src/assets/home-icon.png",
    //   homeBg: "/src/assets/monopoly-bg.webp",
    //   textHomeMonopoly: "/src/assets/monopoly-icon.png",
    //   versusTextFont: "/src/assets/VS-Font.png",
    //   lineBg: "/src/assets/background/bgline2.svg",
    //   childLearn: "/src/assets/background/chil-learn.jpg",
    // },
    // image: "/offline",
    document: "/offline",
    // audio: "/offline",
    // if you want to fallback to a custom page rather than /_offline
    // font: '/static/font/fallback.woff2',
    // audio: {
    //   clickButton: "/assets/sounds/clickButton.mp3",
    //   ClownCom: "/assets/sounds/Clown-com.mp3",
    //   diceClick: "/assets/sounds/diceClick.mp3",
    //   lobbyTimes: "/assets/sounds/Lobby-Times.mp3",
    //   ohMyGod: "/assets/sounds/oh-my-god.mp3",
    //   result: "/assets/sounds/result.mp3",
    //   rollingDice: "/assets/sounds/rolling-dice.mp3",
    //   walk: "/assets/sounds/walk.mp3",
    //   yay: "/assets/sounds/yay.mp3",
    // },
    // video: ...,
  },
  workboxOptions: {
    disableDevLogs: true,
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = withPWA(nextConfig);
