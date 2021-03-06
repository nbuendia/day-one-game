import MainScene from "./scenes/MainScene";
import HomeScene from "./scenes/HomeScene";
import LostWoodsScene from "./scenes/LostWoodsScene";
import ForestScene2 from "./scenes/ForestScene2";
import ForestScene3 from "./scenes/ForestScene3";

import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";

const config = {
  width: 512,
  height: 512,
  backgroundColor: "black",
  type: Phaser.AUTO,
  scene: [MainScene, LostWoodsScene, HomeScene, ForestScene2, ForestScene3],
  scale: {
    zoom: 2,
  },
  physics: {
    default: "arcade",
    arcade: {
      // debug: true,
      gravity: {
        y: 0,
      },
    },
  },
  // plugins: {
  //   scene: [
  //     {
  //       plugin: PhaserMatterCollisionPlugin, // The plugin class
  //       key: "matterCollision", // Where to store in Scene.Systems, e.g. scene.sys.matterCollision
  //       mapping: "matterCollision", // Where to store in the Scene, e.g. scene.matterCollision
  //     },
  //   ],
  // },
};

new Phaser.Game(config);
