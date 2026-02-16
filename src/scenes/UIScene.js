export class UIScene extends Phaser.Scene {
  constructor() {
    super('UIScene');
  }

  create() {
    this.logText = this.add.text(8, 150, '', {
      fontSize: '8px',
      color: '#ffffff'
    }).setScrollFactor(0);

    const combat = this.scene.get('CombatScene');
    if (combat) {
      combat.events.on('log', msg => {
        this.logText.setText(msg);
      });
    }
  }
}
