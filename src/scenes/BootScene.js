export class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload() {
    this.load.image('tiles', 'assets/tilesets/fantasy_tiles.png');
    this.load.tilemapTiledJSON('overworld', 'assets/maps/overworld.json');

    this.load.spritesheet('player', 'assets/sprites/player.png', {
      frameWidth: 16,
      frameHeight: 24
    });
  }

  create() {
    this.scene.start('OverworldScene');
    this.scene.launch('UIScene');
  }
}
