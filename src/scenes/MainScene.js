import Phaser from "phaser";
import Player from "./Player";
import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";

class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  preload() {
    Player.preload(this);
    this.load.image("collider", "assets/collider.png");
    this.load.image("tiles", "assets/Aurora Tileset.png");
    this.load.tilemapTiledJSON("map", "assets/lostWoods.json");
  }

  create() {
    this.cameras.main.fadeIn(250, 0, 0, 0);
    this.instantiateColliders();
    this.createPlayer();
    this.createmap();
    this.createColliders();
  }

  update() {
    this.player.update();
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

    const layer1 = map.createLayer("Tile Layer 1", tileSet, 0, 0).setDepth(-1);
    const layer2 = map.createLayer("Tile Layer 2", tileSet, 0, 0).setDepth(-1);
    const layer3 = map.createLayer("Tile Layer 3", tileSet, 0, 0).setDepth(-1);
    const layer5 = map.createLayer("Tile Layer 5", tileSet, 0, 0).setDepth(-1);
    const layer4 = map.createLayer("Tile Layer 4", tileSet, 0, 0).setDepth(-1);
  }

  createPlayer() {
    this.player = this.physics.add.existing(
      new Player(this, 175, 285, "player-idle")
    );

    this.resizeCollider(this.player, 50);
  }

  resizeCollider(obj, num) {
    obj.body.setSize(obj.width - num, obj.height - num, true);
  }

  instantiateColliders() {
    this.doorCollider = this.physics.add
      .sprite(160, 225, "collider")
      .setOrigin(0, 0)
      .setSize(25, 10, true)
      .setDepth(-1);

    this.forestCollider = this.physics.add
      .sprite(475, 250, "collider")
      .setOrigin(0, 0)
      .setSize(10, 75, true)
      .setDepth(-1);

    this.fenceCollider1 = this.physics.add
      .sprite(400, 295, "collider")
      .setOrigin(0, 0)
      .setSize(200, 10, true)
      .setDepth(-1)
      .setImmovable(true);

    this.fenceCollider2 = this.physics.add
      .sprite(400, 200, "collider")
      .setOrigin(0, 0)
      .setSize(190, 10, true)
      .setDepth(-1);

    this.fenceCollider3 = this.physics.add
      .sprite(300, 40, "collider")
      .setOrigin(0, 0)
      .setSize(10, 115, true)
      .setDepth(-1);

    this.fenceCollider4 = this.physics.add
      .sprite(310, 145, "collider")
      .setOrigin(0, 0)
      .setSize(10, 100, true)
      .setDepth(-1);

    this.fenceCollider5 = this.physics.add
      .sprite(300, 400, "collider")
      .setOrigin(0, 0)
      .setSize(10, 200, true)
      .setDepth(-1);
  }

  createColliders() {
    this.physics.add.collider(
      this.player,
      this.doorCollider,
      this.onDoorCollision,
      null,
      this
    );

    this.physics.add.collider(
      this.player,
      this.forestCollider,
      this.onForestCollision,
      null,
      this
    );

    this.fenceColliders(this.fenceCollider1);
    this.fenceColliders(this.fenceCollider2);
    this.fenceColliders(this.fenceCollider3);
    this.fenceColliders(this.fenceCollider4);
    this.fenceColliders(this.fenceCollider5);
  }

  fenceColliders(fenceID) {
    this.physics.add.collider(
      fenceID,
      this.player,
      this.onFenceCollision,
      null,
      this
    );
  }

  onFenceCollision(fence, player) {
    fence.setVelocity(0, 0).setImmovable(true);
  }

  onDoorCollision(player, door) {
    door.setImmovable(true).setVelocity(0);
    player.disableBody(false, false);
    this.cameras.main.fadeOut(250, 0, 0, 0);
    this.cameras.main.once(
      Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
      (cam, effect) => {
        this.scene.stop("MainScene");
        this.scene.start("HomeScene");
      }
    );
  }

  onForestCollision(player, entry) {
    player.disableBody(false, false);
    this.cameras.main.fadeOut(250, 0, 0, 0);
    this.cameras.main.once(
      Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
      (cam, effect) => {
        this.scene.stop("MainScene");
        this.scene.start("LostWoodsScene");
      }
    );
  }
}

export default MainScene;
