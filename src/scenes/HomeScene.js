import Phaser from "phaser";
import Player from "./Player";

class HomeScene extends Phaser.Scene {
  constructor() {
    super("HomeScene");
  }

  preload() {
    Player.preload(this);
    this.load.image("collider", "assets/collider");
    this.load.image("tiles", "assets/Aurora Tileset.png");
    this.load.tilemapTiledJSON("map3", "assets/HomeScene.json");
  }

  create() {
    this.cameras.main.fadeIn(250, 0, 0, 0);
    this.instantiateCollider();
    this.createPlayer();
    this.createmap();
    this.createColliders();
  }

  update() {
    this.player.update();
  }

  createmap() {
    const map = this.make.tilemap({ key: "map3" });
    const tileSet = map.addTilesetImage(
      "Aurora Tileset",
      "tiles",
      32,
      32,
      0,
      0
    );

    const layer1 = map
      .createLayer("Foundation Layer", tileSet, 0, 0)
      .setDepth(-1);
    const layer2 = map
      .createLayer("Furniture Layer", tileSet, 0, 0)
      .setDepth(-1);
    const layer3 = map
      .createLayer("Extras Layer 1", tileSet, 0, 0)
      .setDepth(-1);
    const layer4 = map
      .createLayer("Extras Layer 2", tileSet, 0, 0)
      .setDepth(-1);
  }

  createPlayer() {
    this.player = this.physics.add.existing(
      new Player(this, 275, 405, "player-idle")
    );

    this.resizeCollider(this.player, 50);
  }

  resizeCollider(obj, num) {
    obj.body.setSize(obj.width - num, obj.height - num, true);
  }

  instantiateCollider() {
    this.doorCollider = this.physics.add
      .sprite(255, 420, "collider")
      .setOrigin(0, 0)
      .setSize(45, 10, true)
      .setDepth(-1);
  }

  createColliders() {
    this.physics.add.overlap(
      this.player,
      this.doorCollider,
      this.onExitCollision,
      null,
      this
    );
  }

  onExitCollision() {
    this.cameras.main.fadeOut(250, 0, 0, 0);
    this.cameras.main.once(
      Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
      (cam, effect) => {
        this.scene.stop("HomeScene");
        this.scene.start("MainScene");
      }
    );
  }
}

export default HomeScene;
