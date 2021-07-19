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
  });

  scene('start', () => {
    add([
      text('press space to begin!', 6),
      pos(width() / 2, height() / 2),
      origin('center')
    ]);

    keyPress('space', () => {
      go('room');
    });
  });

  start('start');
};
