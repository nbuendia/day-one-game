import Phaser from "phaser";
import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";

class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  preload() {
    this.load.spritesheet("player-idle", "assets/idle-sheet.png", {
      frameWidth: 80,
      frameHeight: 80,
    });

    this.load.spritesheet("player-run", "assets/run-sheet.png", {
      frameWidth: 80,
      frameHeight: 80,
    });

    this.load.image("tiles", "assets/Aurora Tileset.png");
    this.load.tilemapTiledJSON("map", "assets/lostWoods.json");
  }

  create() {
    this.createmap();
    this.createPlayer();
  }

  update() {
    this.handleInputs();
  }

  resizeCollider(obj, num) {
    obj.body.setSize(obj.width - num, obj.height - num, true);
  }
  createmap() {
    const map = this.make.tilemap({ key: "map" });
    const tileSet = map.addTilesetImage(
      "Aurora Tileset",
      "tiles",
      32,
      32,
      0,
      0
    );

    const layer1 = map.createLayer("Tile Layer 1", tileSet, 0, 0);
    const layer2 = map.createLayer("Tile Layer 2", tileSet, 0, 0);
    const layer3 = map.createLayer("Tile Layer 3", tileSet, 0, 0);
    const layer5 = map.createLayer("Tile Layer 5", tileSet, 0, 0);
    const layer4 = map.createLayer("Tile Layer 4", tileSet, 0, 0);
  }

  createPlayer() {
    //PLAYER IDLE CONFIG
    this.player = this.physics.add
      .sprite(250, 250, "player-idle")
      .setOrigin(0, 0);

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

    this.player.play("player-idle-anim");
    this.resizeCollider(this.player, 35);
  }

  handleInputs() {
    let speed = 2;

    const upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    const downKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.DOWN
    );
    const rightKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.RIGHT
    );
    const leftKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.LEFT
    );

    if (upKey.isDown) {
      this.player.y -= speed;
    }
    if (downKey.isDown) {
      this.player.y += speed;
    }
    if (rightKey.isDown) {
      this.player.x += speed;
    }
    if (leftKey.isDown) {
      this.player.x -= speed;
    }

    if (upKey.isDown || downKey.isDown || rightKey.isDown || leftKey.isDown) {
      if (rightKey.isDown) {
        this.player.play("player-run-anim", true).flipX = false;
      } else if (leftKey.isDown) {
        this.player.play("player-run-anim", true).flipX = true;
      }
      this.player.play("player-run-anim", true);
    } else {
      this.player.play("player-idle-anim", true);
    }
  }
}

export default MainScene;
