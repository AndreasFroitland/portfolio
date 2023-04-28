const player = document.querySelector('.player');
const container = document.querySelector('.container');
const keysDown = new Set();

let lastTimestamp = null;

function updatePlayer(timestamp) {
  let playerX = parseFloat(getComputedStyle(player).getPropertyValue('--translate-x')) || 0;
  let playerY = parseFloat(getComputedStyle(player).getPropertyValue('--translate-y')) || 0;

  if (!lastTimestamp) {
    lastTimestamp = timestamp;
  }
  const deltaTime = timestamp - lastTimestamp;
  lastTimestamp = timestamp;

  const speed = 350; // pixels per second
  const distance = speed * (deltaTime / 1000); // pixels per frame

  if (keysDown.has('KeyW')) {
    playerY -= distance;
  }
  if (keysDown.has('KeyS')) {
    playerY += distance;
  }
  if (keysDown.has('KeyA')) {
    playerX -= distance;
  }
  if (keysDown.has('KeyD')) {
    playerX += distance;
  }

  const containerWidth = parseFloat(getComputedStyle(container).width);
  const containerHeight = parseFloat(getComputedStyle(container).height);
  const playerWidth = parseFloat(getComputedStyle(player).width);
  const playerHeight = parseFloat(getComputedStyle(player).height);

  playerX = Math.max(-playerWidth / 2, Math.min(containerWidth - playerWidth / 2, playerX));
  playerY = Math.max(-playerHeight / 2, Math.min(containerHeight - playerHeight / 2, playerY));

  player.style.setProperty('--translate-x', `${playerX}px`);
  player.style.setProperty('--translate-y', `${playerY}px`);
}

document.addEventListener('keydown', (event) => {
  keysDown.add(event.code);
});

document.addEventListener('keyup', (event) => {
  keysDown.delete(event.code);
});

requestAnimationFrame(function animate() {
  updatePlayer(performance.now());
  requestAnimationFrame(animate);
});