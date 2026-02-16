export class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload() {
    this.load.image('tiles', '/assets/tilesets/fantasy_tiles.png');
    this.load.image('player', '/assets/sprites/player.png');
    this.load.image('npc', '/assets/sprites/npc.png');

    this.load.tilemapTiledJSON(
      'overworld',
      '/assets/maps/overworld.json'
    );
  }

  create() {
    this.scene.start('OverworldScene');
  }
}
