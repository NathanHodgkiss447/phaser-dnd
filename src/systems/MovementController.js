export class MovementController {
  constructor(sprite, map, tileSize = 16) {
    this.sprite = sprite;
    this.map = map;
    this.tileSize = tileSize;
    this.isMoving = false;
  }

  move(dx, dy) {
  if (this.isMoving) return;

  const targetX = this.sprite.x + dx * this.tileSize;
  const targetY = this.sprite.y + dy * this.tileSize;

  const tile = this.map.getTileAtWorldXY(targetX, targetY);
  if (tile && tile.index === 1) return; // water blocked

  // --- NPC COLLISION ---
  const scene = this.sprite.scene;
  if (scene.npc) {
    const dist = Phaser.Math.Distance.Between(
      targetX, targetY,
      scene.npc.x, scene.npc.y
    );
    if (dist < this.tileSize / 2) return;
  }

  this.isMoving = true;

  this.sprite.scene.tweens.add({
    targets: this.sprite,
    x: targetX,
    y: targetY,
    duration: 150,
    onComplete: () => {
      this.isMoving = false;
    }
  });
}

}
