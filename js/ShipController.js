class ShipController {
  constructor(x, y, spriteName, configs) {
    this.sprite = Nakama.playerGroup.create(x, y, 'assets', spriteName);
    Nakama.game.physics.arcade.enable(this.sprite);
    this.sprite.body.collideWorldBounds = true;
    this.configs = configs;
    this.timeSinceLastFire = 0;
    this.timeSinceLastFireRunBullet = 0;
    this.sprite.anchor = new Phaser.Point(0.5, 0.5);
  }

  update(){
    if(Nakama.keyboard.isDown(this.configs.up)){
      this.sprite.body.velocity.y = -ShipController.SHIP_SPEED;
    }
    else if(Nakama.keyboard.isDown(this.configs.down)){
      this.sprite.body.velocity.y = ShipController.SHIP_SPEED;
    }
    else{
      this.sprite.body.velocity.y = 0;
    }

    if(Nakama.keyboard.isDown(this.configs.left)){
      this.sprite.body.velocity.x = -ShipController.SHIP_SPEED;
    }
    else if(Nakama.keyboard.isDown(this.configs.right)){
      this.sprite.body.velocity.x = ShipController.SHIP_SPEED;
    }
    else{
      this.sprite.body.velocity.x = 0;
    }

    this.timeSinceLastFire += Nakama.game.time.physicsElapsed;
    this.timeSinceLastFireRunBullet += Nakama.game.time.physicsElapsed;

    if(Nakama.keyboard.isDown(this.configs.fire)){
      this.tryFire();
    }
  }

  tryFire() {
    if(this.timeSinceLastFire >= this.configs.bulletCollDown){
      this.fire();
      this.timeSinceLastFire = 0;
    }

    if(this.timeSinceLastFireRunBullet >= 5*this.configs.bulletCollDown){
      this.fireRunningBullet();
      this.timeSinceLastFireRunBullet = 0;
    }
  }

  fire() {
    // this.createBullet(new Phaser.Point(0, -1));
    // this.createBullet(new Phaser.Point(1, -5));
    // this.createBullet(new Phaser.Point(-1, -5));
    // this.createBullet(new Phaser.Point(1, -2));
    // this.createBullet(new Phaser.Point(-1, -2));
  }

  fireRunningBullet() {
    this.createRunningBullet(new Phaser.Point(0, -1));
    this.createRunningBullet(new Phaser.Point(1, -1));
    this.createRunningBullet(new Phaser.Point(-1, -1));

  }

  createBullet(direction){
    new BulletController (
      this.sprite.position,
      direction,
      "BulletType1.png"
    );
  }

  createRunningBullet(direction) {
    new RunningBulletController (
      this.sprite.position,
      direction,
      "BulletType2.png"
    )
  }

}

ShipController.SHIP_SPEED = 400;
