window.onload = function () {
  // Initialize Kaboom...
  const k = kaboom({
    global: true,
    scale: 3,
    clearColor: [0, 0, 0, 1],
    canvas: document.getElementById('game'),
    width: 180,
    height: 180
  });

  // Load the various sprite graphics.
  loadRoot('/');
  loadSprite('player', 'sprites/player.png');
  loadSprite('wall', 'sprites/wall.png');
  loadSprite('key', 'sprites/key.png');
  loadSprite('door', 'sprites/door.png');
  loadSprite('lockeddoor', 'sprites/lockeddoor.png');

  scene('room', () => {
    const layout = [
      "=====d======",
      "=          =",
      "=   k      =",
      "=          =",
      "=          =",
      "=     @    l",
      "=          =",
      "=          =",
      "=          =",
      "=          =",
      "======d====="
    ];

    const roomConf = {
      width: layout[0].length,
      height: layout.length,
      pos: vec2(20, 20),
      '@': [
        sprite('player'),
        'player'
      ],
      '=': [
        sprite('wall'),
        solid()
      ],
      'k': [
        sprite('key'),
        'key',
      ],
      'd': [
        sprite('door'),
        solid(),
        'door'
      ],
      'l': [
        sprite('lockeddoor'),
        solid(),
        'lockeddoor'
      ]
    };

    addLevel(layout, roomConf);

    const player = get('player')[0];

    const directions = {
      'left': vec2(-1, 0),
      'right': vec2(1, 0),
      'up': vec2(0, -1),
      'down': vec2(0, 1)
    };

    // Map key presses to player movement actions.
    for (const direction in directions) {
		  keyDown(direction, () => {
        // Move the player.
			  player.move(directions[direction].scale(60));
		  });
	  }

    player.overlaps('door', (d) => {
      camShake(10);
    });

    player.overlaps('lockeddoor', (d) => {
      camShake(10);
    });

    player.action(() => {
      player.resolve();
    });
  });

  scene('start', () => {
    add([
      text('press space to begin!', 6),
      pos(width() / 2, height() / 2),
      origin('center'),
    ]);

    keyPress('space', () => {
      go('room');
    });
  });

  start('start');
};
