import { MovementController } from '../systems/MovementController.js';
import { EncounterSystem } from '../systems/EncounterSystem.js';

export class OverworldScene extends Phaser.Scene {
  constructor() {
    super('OverworldScene');
  }

  create() {
    const map = this.make.tilemap({ key: 'overworld' });
    const tileset = map.addTilesetImage('fantasy', 'tiles');

    map.createLayer('Ground', tileset);
    this.collisionLayer = map.createLayer('Collision', tileset);
    this.grassLayer = map.createLayer('Grass', tileset);

    this.collisionLayer.setCollisionByProperty({ collides: true });

    this.player = this.physics.add.sprite(64, 64, 'player', 0);
    this.player.setSize(16, 16).setOffset(0, 8);

    this.movement = new MovementController(
      this.player,
      map,
      this.collisionLayer
    );

    this.cursors = this.input.keyboard.createCursorKeys();
    this.cameras.main.startFollow(this.player);
  }

  update() {
    if (this.movement.isMoving) return;

    if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) this.tryMove(-1, 0);
    if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) this.tryMove(1, 0);
    if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) this.tryMove(0, -1);
    if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) this.tryMove(0, 1);
  }

  tryMove(dx, dy) {
    if (!this.movement.canMove(dx, dy)) return;

    this.movement.move(dx, dy, () => {
      if (EncounterSystem.check(this.player, this.grassLayer)) {
        this.scene.pause();
        this.scene.launch('CombatScene');
      }
    });
  }
}
