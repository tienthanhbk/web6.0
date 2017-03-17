class RunningBulletController {
  constructor (position, direction, spriteName) {
    this.sprite = Nakama.runningBulletGroup.create(position.x, position.y, 'assets', spriteName);
    Nakama.runningBullets.push(this);
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
    this.target = this.updateTarget();
    if(this.target != null) {
      var newDirection = new Phaser.Point(
        this.target.position.x - this.sprite.position.x,
        this.target.position.y - this.sprite.position.y
      );
      var newAngle;
      //Tính góc quay mới
      if(newDirection.x <= 0){
        if(newDirection.y >= 0) {
          newAngle = (Math.atan(-newDirection.x / newDirection.y)*180/Math.PI) - 180;
        }
        else if(newDirection.y <= 0) {
          newAngle = (Math.atan(-newDirection.x / newDirection.y)*180/Math.PI);
        }
      }
      else if(newDirection.x >= 0){
        if(newDirection.y >= 0 ){
          newAngle = (Math.atan(-newDirection.x / newDirection.y)*180/Math.PI) + 180 ;
        }
        else if(newDirection.y <= 0) {
          newAngle = (Math.atan(-newDirection.x / newDirection.y)*180/Math.PI) ;
        }
      }
      //Đổi góc quay
      if(
          (newAngle - this.sprite.angle < RunningBulletController.ANGULAR_VELOCITY*Nakama.game.time.physicsElapsed/1.0) &&
          (newAngle - this.sprite.angle > -RunningBulletController.ANGULAR_VELOCITY*Nakama.game.time.physicsElapsed/1.0)
        )
      {
        this.sprite.angle = newAngle;
      }
      else{
        if(newAngle > this.sprite.angle){
          this.sprite.angle += RunningBulletController.ANGULAR_VELOCITY*Nakama.game.time.physicsElapsed/1.0;
        }
        else{
          this.sprite.angle -= RunningBulletController.ANGULAR_VELOCITY*Nakama.game.time.physicsElapsed/1.0;
        }
      }
      //Đổi hướng di chuyển theo goc quay
      newDirection.x = Math.cos(Math.PI/2 - this.sprite.angle/180*Math.PI);
      newDirection.y = -Math.sin(Math.PI/2 - this.sprite.angle/180*Math.PI);
      this.sprite.body.velocity = newDirection.setMagnitude(
        RunningBulletController.BULLET_SPEED
      );

    }

  }

  updateTarget() {
    return Nakama.enemyGroup.getFirstAlive();
  }

}
RunningBulletController.BULLET_SPEED = 300.0;
RunningBulletController.ANGULAR_VELOCITY = 60.0;
