import Phaser from "phaser";

class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);

    this.scene = scene;
    this.x = x;
    this.y = y;
    this.texture = texture;

    this.scene.add.existing(this);

    const { LEFT, RIGHT, UP, DOWN } = Phaser.Input.Keyboard.KeyCodes;
    this.keys = this.scene.input.keyboard.addKeys({
      leftKey: LEFT,
      rightKey: RIGHT,
      upKey: UP,
      downKey: DOWN,
    });
  }

  static preload(scene) {
    scene.load.spritesheet("player-idle", "assets/player-idle-sheet.png", {
      frameWidth: 80,
      frameHeight: 80,
    });

    scene.load.spritesheet("player-run", "assets/player-skip-sheet.png", {
      frameWidth: 80,
      frameHeight: 80,
    });
  }

  update() {
    this.handleInputs();
  }

  handleInputs() {
    let speed = 100;
    let playerVelocity = new Phaser.Math.Vector2();
    const { keys } = this;

    //SETS VELOCITY DIRECTION ON KEY PRESS
    if (keys.upKey.isDown) {
      playerVelocity.y = -1;
    }
    if (keys.downKey.isDown) {
      playerVelocity.y = 1;
    }
    if (keys.rightKey.isDown) {
      playerVelocity.x = 1;
    }
    if (keys.leftKey.isDown) {
      playerVelocity.x = -1;
    }

    this.animations();

    //SETS ANIMATIONS DEPENDING ON DIRECTION
    if (
      keys.upKey.isDown ||
      keys.downKey.isDown ||
      keys.rightKey.isDown ||
      keys.leftKey.isDown
    ) {
      if (keys.rightKey.isDown) {
        this.play("player-run-anim", true).flipX = false;
      } else if (keys.leftKey.isDown) {
        this.play("player-run-anim", true).flipX = true;
      } else if (keys.upKey.isDown) {
      } else if (keys.downKey.isDown) {
      }
      this.play("player-run-anim", true);
    } else {
      this.setVelocity(0, 0);
      this.play("player-idle-anim", true);
    }

    //NORMALIZE MAKES SURE PLAYER MOVES IN CONSTANT SPEED WHEN GOING DIAGNALLY
    playerVelocity.normalize();
    playerVelocity.scale(speed);
    this.setVelocity(playerVelocity.x, playerVelocity.y);
  }

  animations() {
    this.anims.create({
      key: "player-idle-anim",
      frames: this.anims.generateFrameNumbers("player-idle"),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "player-run-anim",
      frames: this.anims.generateFrameNumbers("player-run"),
      frameRate: 22,
      repeat: -1,
    });
  }
}

export default Player;
