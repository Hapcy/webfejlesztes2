function random(min, max) {
  const zeroBasedIntervalEnd = max - min;
  const randomInZeroBasedInterval = Math.floor(
    Math.random() * (zeroBasedIntervalEnd + 1),
  );
  return randomInZeroBasedInterval + min;
}

function isSamePosition(position1, position2) {
  return position1.x === position2.x && position1.y === position2.y;
}
