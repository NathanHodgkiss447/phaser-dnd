import Phaser from 'phaser';

export const gameConfig = {
  type: Phaser.AUTO,

  backgroundColor: '#000000',

  scale: {
    mode: Phaser.Scale.FIT,      // full screen with aspect ratio
    width: 320,                  // internal resolution
    height: 180
  },

  pixelArt: true,
  roundPixels: true,

  physics: {
    default: 'arcade',
    arcade: { debug: false }
  }
};
