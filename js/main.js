var Nakama = {};
Nakama.configs = {
  GAME_WIDTH  : 640,
  GAME_HEIGHT : 960,
  MIN_WIDTH   : 320,
  MIN_HEIGHT  : 480,
  MAX_WIDTH   : 640,
  MAX_HEIGHT  : 960,
  PLAYER1_POS : {
    x : 200,
    y : 600
  },
  PLAYER2_POS : {
    x : 400,
    y : 600
  },
  ENEMY1_POS    : {
    x : 200,
    y : 200
  }
};

window.onload = function(){
  Nakama.game = new Phaser.Game(Nakama.configs.GAME_WIDTH,Nakama.configs.GAME_HEIGHT,Phaser.AUTO,'',
    {
      preload: preload,
      create: create,
      update: update,
      render: render
    }, false, false
  );
}

// preparations before game starts
var preload = function(){
  Nakama.game.scale.minWidth = Nakama.configs.MIN_WIDTH;
  Nakama.game.scale.minHeight = Nakama.configs.MIN_HEIGHT;
  Nakama.game.scale.maxWidth = Nakama.configs.MAX_WIDTH;
  Nakama.game.scale.maxHeight = Nakama.configs.MAX_HEIGHT;
  Nakama.game.scale.pageAlignHorizontally = true;
  Nakama.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

  Nakama.game.time.advancedTiming = true;

  Nakama.game.load.atlasJSONHash('assets', 'Assets/assets.png', 'Assets/assets.json');
  Nakama.game.load.image('background', 'Assets/Map1.png');
}

// initialize the game
var create = function(){
  Nakama.game.physics.startSystem(Phaser.Physics.ARCADE);
  Nakama.keyboard = Nakama.game.input.keyboard;
  Nakama.game.add.sprite(0, 0, 'background');

  Nakama.bulletGroup = Nakama.game.add.physicsGroup();
  Nakama.runningBulletGroup = Nakama.game.add.physicsGroup();
  Nakama.playerGroup = Nakama.game.add.physicsGroup();
  Nakama.enemyGroup = Nakama.game.add.physicsGroup();

  Nakama.players = [];
  Nakama.enemies = [];
  Nakama.runningBullets = [];

  Nakama.players.push(
    new ShipController(
      Nakama.configs.PLAYER1_POS.x,
      Nakama.configs.PLAYER1_POS.y,
      "Spaceship1-Player.png",
      {
        up : Phaser.Keyboard.UP,
        down : Phaser.Keyboard.DOWN,
        left : Phaser.Keyboard.LEFT,
        right : Phaser.Keyboard.RIGHT,
        fire : Phaser.Keyboard.SPACEBAR,
        bulletCollDown: 0.1
      }
    ),
    new ShipController(
      Nakama.configs.PLAYER2_POS.x,
      Nakama.configs.PLAYER2_POS.y,
      "Spaceship2-Player.png",
      {
        up : Phaser.Keyboard.W,
        down : Phaser.Keyboard.S,
        left : Phaser.Keyboard.A,
        right : Phaser.Keyboard.D,
        fire : Phaser.Keyboard.F,
        bulletCollDown: 0.1
      }
    )
  );

  Nakama.enemies.push(
    new EnemyShipController(
      Nakama.configs.ENEMY1_POS.x,
      Nakama.configs.ENEMY1_POS.y,
      "EnemyType3.png",
      {
        health : 200
      }
    ),
    new EnemyShipController(
      Nakama.configs.ENEMY1_POS.x + 50,
      Nakama.configs.ENEMY1_POS.y - 50,
      "EnemyType2.png",
      {
        health : 150
      }
    )
  );

  Nakama.enemyGroup.getFirstAlive = function() {
    shipReturn = null;
    Nakama.enemies.forEach(function(ship){
      if(ship.sprite._exists == true ){
        shipReturn = ship.sprite;
      }
    });
    return shipReturn;
  }
}

// update game state each frame
var update = function(){
  Nakama.enemyGroup.getFirstAlive();

  Nakama.players.forEach(function(ship){
    ship.update();
  });

  Nakama.enemies.forEach(function(ship){
    ship.update();
  });
  
  Nakama.runningBullets.forEach(function(runningBullet){
    runningBullet.update();
  });

  Nakama.game.physics.arcade.overlap(
    Nakama.bulletGroup,
    Nakama.enemyGroup,
    onBulletHitEnemy
  );

  Nakama.game.physics.arcade.overlap(
    Nakama.runningBulletGroup,
    Nakama.enemyGroup,
    onRunningBulletHitEnemy
  )
}

var onBulletHitEnemy = function(bulletSprite, enemySprite){
  enemySprite.damage(1);
  bulletSprite.kill();
}

var onRunningBulletHitEnemy = function(bulletSprite, enemySprite){
  enemySprite.damage(10);
  bulletSprite.kill();
  console.log("hit");
}



// before camera render (mostly for debug)
var render = function(){}
