class RunningBulletController {
  constructor (position, direction, spriteName) {
    this.sprite = Nakama.runningBulletGroup.create(position.x, position.y, 'assets', spriteName);

    this.sprite.angle = (Math.atan(-direction.x / direction.y)*180/Math.PI);
    Nakama.game.physics.arcade.enable(this.sprite);
    this.sprite.anchor = new Phaser.Point(0.5, 0.5);
    this.sprite.body.velocity = direction.setMagnitude(
      RunningBulletController.BULLET_SPEED
    );
    //Đạn ra khỏi WorldBounds thì kill
    this.sprite.body.checkWorldBounds = true;
    this.sprite.body.outOfBoundsKill = true;
    this.target = null;
  }

  update() {

  }

  updateTarget() {

  }

}
RunningBulletController.BULLET_SPEED = 100;
