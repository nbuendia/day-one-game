import Phaser from "phaser";
import Player from "./Player";

class LostWoodsScene extends Phaser.Scene {
  constructor() {
    super("LostWoodsScene");
  }

  preload() {
    Player.preload(this);
    this.load.image("collider", "assets/collider.png");
    this.load.image("tiles", "assets/Aurora Tileset.png");
    this.load.tilemapTiledJSON("map2", "assets/lostWoodsScene.json");
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
    const map = this.make.tilemap({ key: "map2" });
    const tileSet = map.addTilesetImage(
      "Aurora Tileset",
      "tiles",
      32,
      32,
      0,
      0
    );

    const layer1 = map.createLayer("Dirt Layer", tileSet, 0, 0).setDepth(-1);
    const layer2 = map.createLayer("Grass Layer", tileSet, 0, 0).setDepth(-1);
    const layer3 = map
      .createLayer("Floor Spots Layer", tileSet, 0, 0)
      .setDepth(-1);
    const layer4 = map.createLayer("Shrooms Layer", tileSet, 0, 0).setDepth(-1);
    const layer5 = map.createLayer("Rocks Layer", tileSet, 0, 0).setDepth(-1);
    const layer6 = map.createLayer("Rocks Layer 2", tileSet, 0, 0).setDepth(-1);
    const layer7 = map.createLayer("Fence Layer", tileSet, 0, 0).setDepth(-1);
    const layer8 = map.createLayer("Tree Layer 1", tileSet, 0, 0).setDepth(-1);
    const layer9 = map.createLayer("Tree Layer 2", tileSet, 0, 0).setDepth(-1);
    const layer10 = map.createLayer("Spooky Layer", tileSet, 0, 0).setDepth(-1);
    const layer11 = map
      .createLayer("Spooky Layer 2", tileSet, 0, 0)
      .setDepth(-1);
  }

  createPlayer() {
    this.player = this.physics.add.existing(
      new Player(this, 25, 260, "player-run")
    );
    this.resizeCollider(this.player, 50);
  }

  resizeCollider(obj, num) {
    obj.body.setSize(obj.width - num, obj.height - num, true);
  }

  instantiateColliders() {
    this.exitSceneCollider1 = this.physics.add
      .sprite(-15, 250, "collider")
      .setOrigin(0, 0)
      .setSize(10, 65, true)
      .setDepth(-1);

    this.exitSceneCollider2 = this.physics.add
      .sprite(233, -15, "collider")
      .setOrigin(0, 0)
      .setSize(100, 10, true)
      .setDepth(-1);

    this.exitSceneCollider3 = this.physics.add
      .sprite(250, 495, "collider")
      .setOrigin(0, 0)
      .setSize(315, 10, true)
      .setDepth(-1);

    this.fenceCollider1 = this.physics.add
      .sprite(30, 295, "collider")
      .setOrigin(0, 0)
      .setSize(90, 10, true)
      .setDepth(-1);

    this.fenceCollider2 = this.physics.add
      .sprite(80, 200, "collider")
      .setOrigin(0, 0)
      .setSize(190, 10, true)
      .setDepth(-1);

    this.fenceCollider3 = this.physics.add
      .sprite(360, 135, "collider")
      .setOrigin(0, 0)
      .setSize(135, 10, true)
      .setDepth(-1);

    this.fenceCollider4 = this.physics.add
      .sprite(170, 90, "collider")
      .setOrigin(0, 0)
      .setSize(10, 210, true)
      .setDepth(-1);

    this.fenceCollider5 = this.physics.add
      .sprite(298, 55, "collider")
      .setOrigin(0, 0)
      .setSize(10, 150, true)
      .setDepth(-1);

    this.fenceCollider6 = this.physics.add
      .sprite(425, 313, "collider")
      .setOrigin(0, 0)
      .setSize(10, 365, true)
      .setDepth(-1);

    this.fenceCollider7 = this.physics.add
      .sprite(70, 393, "collider")
      .setOrigin(0, 0)
      .setSize(10, 205, true)
      .setDepth(-1);
  }

  createColliders() {
    // this.physics.add.collider(
    //   this.player,
    //   this.exitSceneCollider1,
    //   this.onExitCollision1,
    //   null,
    //   this
    // );

    this.physics.add.collider(
      this.player,
      this.exitSceneCollider2,
      this.onExitCollision2,
      null,
      this
    );

    this.physics.add.collider(
      this.player,
      this.exitSceneCollider3,
      this.onExitCollision3,
      null,
      this
    );

    this.fenceColliders(this.fenceCollider1);
    this.fenceColliders(this.fenceCollider2);
    this.fenceColliders(this.fenceCollider3);
    this.fenceColliders(this.fenceCollider4);
    this.fenceColliders(this.fenceCollider5);
    this.fenceColliders(this.fenceCollider6);
    this.fenceColliders(this.fenceCollider7);
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

  // onExitCollision1(player, entry) {
  //   player.disableBody(false, false);
  //   this.cameras.main.fadeOut(250, 0, 0, 0);
  //   this.cameras.main.once(
  //     Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
  //     () => {
  //       this.scene.stop("LostWoodsScene");
  //       this.scene.start("ForestScene1");
  //     }
  //   );
  // }

  onExitCollision2(player, entry) {
    player.disableBody(false, false);
    this.cameras.main.fadeOut(250, 0, 0, 0);
    this.cameras.main.once(
      Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
      () => {
        this.scene.stop("LostWoodsScene");
        this.scene.start("ForestScene2");
      }
    );
  }

  onExitCollision3(player, entry) {
    player.disableBody(false, false);
    this.cameras.main.fadeOut(250, 0, 0, 0);
    this.cameras.main.once(
      Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
      () => {
        this.scene.stop("LostWoodsScene");
        this.scene.start("ForestScene3");
      }
    );
  }
}

export default LostWoodsScene;
