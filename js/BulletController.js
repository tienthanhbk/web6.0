class BulletController {
  constructor (position, direction, spriteName) {
    this.sprite = Nakama.bulletGroup.create(position.x, position.y, 'assets', spriteName);

    this.sprite.angle = (Math.atan(-direction.x / direction.y)*180/Math.PI);
    Nakama.game.physics.arcade.enable(this.sprite);
    this.sprite.anchor = new Phaser.Point(0.5, 0.5);
    this.sprite.body.velocity = direction.setMagnitude(
      BulletController.BULLET_SPEED
    );
    //Đạn ra khỏi WorldBounds thì kill
    this.sprite.body.checkWorldBounds = true;
    this.sprite.outOfBoundsKill = true;

  }

  onKilled(){
  }

}
BulletController.BULLET_SPEED = 300;
