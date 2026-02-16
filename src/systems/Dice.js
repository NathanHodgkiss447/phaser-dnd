export function roll(formula) {
  const [count, sides] = formula.split('d').map(Number);
  let total = 0;
  for (let i = 0; i < count; i++) {
    total += Phaser.Math.Between(1, sides);
  }
  return total;
}
