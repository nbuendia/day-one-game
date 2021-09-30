import Phaser from "phaser";

class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  preload() {
    console.log("preload");
  }

  create() {
    console.log("create");
  }

  update() {
    //
  }
}

export default MainScene;
