import Phaser from 'phaser';
import { MovementController } from '../systems/MovementController.js';

export class OverworldScene extends Phaser.Scene {
  constructor() {
    super('OverworldScene');
  }

  isNearNPC() {
  if (!this.npc) return false;
  return Phaser.Math.Distance.Between(
    this.player.x,
    this.player.y,
    this.npc.x,
    this.npc.y
  ) < 20;
}

showDialogue(text) {
  if (this.dialogueText) return;

  this.dialogueText = this.add.text(
    16,
    this.scale.height - 40,
    text,
    {
      fontSize: '10px',
      backgroundColor: '#000',
      padding: { x: 6, y: 4 },
      color: '#fff'
    }
  ).setScrollFactor(0).setDepth(10);

  this.time.delayedCall(2000, () => {
    this.dialogueText.destroy();
    this.dialogueText = null;
  });
}


  create() {
    // HARD RESET CAMERA STATE
    const cam = this.cameras.main;
    cam.stopFollow();
    cam.setScroll(0, 0);
    cam.setZoom(1);
    cam.setRotation(0);
    cam.setAlpha(1);
    cam.setVisible(true);

    // TILEMAP
    const map = this.make.tilemap({ key: 'overworld' });

    const tileset = map.addTilesetImage('fantasy', 'tiles');
    const layer = map.createLayer('Ground', tileset, 0, 0);

    // 🔥 FORCE LAYER VISIBILITY
    layer.setVisible(true);
    layer.setAlpha(1);
    layer.setDepth(0);
    layer.setPosition(0, 0);
    layer.setScrollFactor(0);   // screen-space render
    layer.setPipeline('TextureTintPipeline');

    // 🔥 FORCE TILE DATA RENDER
    layer.layer.data.forEach(row => {
      row.forEach(tile => {
        if (tile) {
          tile.setVisible(true);
          tile.alpha = 1;
        }
      });
    });

    // DEBUG: draw bounding box over the layer
    this.add.rectangle(
      map.widthInPixels / 2,
      map.heightInPixels / 2,
      map.widthInPixels,
      map.heightInPixels,
      0x00ff00,
      0.1
    ).setDepth(10).setScrollFactor(0);

    // --- NPC ---
    this.npc = this.physics.add.sprite(
      12 * 16 + 8,
      6 * 16 + 12,
      'npc'
  );

  this.npc.setOrigin(0.5, 1);
  this.npc.setImmovable(true);
  this.npc.body.moves = false;
  this.npc.setDepth(5);


    // PLAYER
    this.player = this.physics.add.sprite(160, 96, 'player');
    this.player.setDepth(10);

    this.movement = new MovementController(this.player, map);
    this.cursors = this.input.keyboard.createCursorKeys();

    this.interactKey = this.input.keyboard.addKey(
    Phaser.Input.Keyboard.KeyCodes.SPACE
);


    console.log('🟢 Layer forced visible');
  }

  update() {
    if (!this.movement || this.movement.isMoving) return;

    if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) this.movement.move(-1, 0);
    if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) this.movement.move(1, 0);
    if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) this.movement.move(0, -1);
    if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) this.movement.move(0, 1);

    if (
    Phaser.Input.Keyboard.JustDown(this.interactKey) &&
    this.isNearNPC()
  ) {
    this.showDialogue("Oi! Cuidado com o mar hoje.");
  }

  }
}
