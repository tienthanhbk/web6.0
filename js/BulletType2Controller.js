class BulletType2Controller extends BulletController {
  constructor (position, direction) {
    super(position, direction, BulletType2Controller.SPRITE_NAME);
    this.sprite.body.velocity = this.sprite.body.velocity.setMagnitude(BulletType2Controller.BULLET_SPEED);
    this.sprite.damage = BulletType2Controller.DAMAGE;
  }
}

update() {
  //1. get target
  if(!this.target || !this.target.alive){
    this.getNewTarget();
  }

  //2. If no target available keep on going straight
  if(!this.target) return;

  //3. Change direction toward target
  var direction = Phaser.Point.subtract(this.target.position, this.sprite.position);
  this.sprite.body.velocity = direction.setMagnitude(BulletType2Controller.BULLET_SPEED);
  this.sprite.angle = Math.atan2(direction.x, -direction.y)*(180/Math.PI);
}

getNewTarget(){
  this.target = Nakama.enemyGroup.getFirstAlive();
}

BulletType2Controller.BULLET_SPEED = 900;
BulletType2Controller.SPRITE_NAME = "BulletType1.png";
BulletType2Controller.DAMAGE = 10;
