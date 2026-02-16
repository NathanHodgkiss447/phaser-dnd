export class MovementController {
  constructor(sprite, map, collisionLayer, tileSize = 16) {
    this.sprite = sprite;
    this.map = map;
    this.collisionLayer = collisionLayer;
    this.tileSize = tileSize;
    this.isMoving = false;
  }

  canMove(dx, dy) {
    const x = this.sprite.x + dx * this.tileSize;
    const y = this.sprite.y + dy * this.tileSize;
    return !this.collisionLayer.getTileAtWorldXY(x, y);
  }

  move(dx, dy, onComplete) {
    this.isMoving = true;

    this.sprite.scene.tweens.add({
      targets: this.sprite,
      x: this.sprite.x + dx * this.tileSize,
      y: this.sprite.y + dy * this.tileSize,
      duration: 150,
      onComplete: () => {
        this.isMoving = false;
        if (onComplete) onComplete();
      }
    });
  }
}
