import Phaser from 'phaser';
import { gameConfig } from './config/gameConfig.js';

import { BootScene } from './scenes/BootScene.js';
import { OverworldScene } from './scenes/OverworldScene.js';
import { CombatScene } from './scenes/CombatScene.js';
import { UIScene } from './scenes/UIScene.js';

gameConfig.scene = [
  BootScene,
  OverworldScene,
  CombatScene,
  UIScene
];

new Phaser.Game(gameConfig);
