import { roll } from '../systems/Dice.js';

export class CombatScene extends Phaser.Scene {
  constructor() {
    super('CombatScene');
  }

  create() {
    this.party = [
      { name: 'Hero', hp: 20, ac: 14, dex: 2 }
    ];

    this.enemies = [
      { name: 'Goblin', hp: 7, ac: 13, dex: 2 }
    ];

    this.combatants = this.rollInitiative([
      ...this.party,
      ...this.enemies
    ]);

    this.turnIndex = 0;
    this.nextTurn();
  }

  rollInitiative(combatants) {
    return combatants
      .map(c => ({
        ...c,
        initiative: roll('1d20') + c.dex
      }))
      .sort((a, b) => b.initiative - a.initiative);
  }

  nextTurn() {
    const actor = this.combatants[this.turnIndex];
    this.events.emit('log', `${actor.name}'s turn`);

    this.time.delayedCall(800, () => {
      this.turnIndex =
        (this.turnIndex + 1) % this.combatants.length;
      this.nextTurn();
    });
  }
}
