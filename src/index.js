import MainScene from "./scenes/MainScene";

const config = {
  width: 500,
  height: 500,
  backgroundColor: "black",
  type: Phaser.AUTO,
  scene: [MainScene],
  scale: {
    zoom: 2,
  },
  physics: {
    default: "matter",
    matter: {
      debug: true,
      gravity: {
        y: 0,
      },
    },
  },
};

new Phaser.Game(config);
