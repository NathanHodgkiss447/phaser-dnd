export class EncounterSystem {
  static check(player, grassLayer) {
    const tile = grassLayer.getTileAtWorldXY(player.x, player.y);
    if (!tile || !tile.properties.encounter) return false;
    return Math.random() < 0.15;
  }
}
