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

    // Tile index 1 = water (blocked)
    if (tile && tile.index === 1) return;

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
