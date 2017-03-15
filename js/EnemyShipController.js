class EnemyShipController {
  constructor(x, y, spriteName, configs) {
    this.sprite = Nakama.enemyGroup.create(x, y, 'assets', spriteName);
    Nakama.game.physics.arcade.enable(this.sprite);
    this.sprite.body.collideWorldBounds = true;
    this.configs = configs;
    this.sprite.health = this.configs.health;
  }

  update() {
    //move by x-side
    if(this.sprite.body.velocity.x > 0){  //if is moving right
      if(this.sprite.position.x > EnemyShipController.RIGHT_LINE) {
        this.sprite.body.velocity.x = -EnemyShipController.SHIP_SPEED; //if cross the right line, move left
      }
    }
    else if(this.sprite.body.velocity.x < 0){ //else if is moving left
      if(this.sprite.position.x < EnemyShipController.LEFT_LINE) {
        this.sprite.body.velocity.x = EnemyShipController.SHIP_SPEED; //if cross the left line, move right
      }
    }
    else { //if(this.sprite.body.velocity.x == 0)
      this.sprite.body.velocity.x = EnemyShipController.SHIP_SPEED; //if is not moving left or right, move right
    }

    //move by y-side
    if(this.sprite.body.velocity.y > 0){  //if is moving down
      if(this.sprite.position.y > EnemyShipController.LOWER_LINE) {
        this.sprite.body.velocity.y = -EnemyShipController.SHIP_SPEED; //if cross the lower line, move up
      }
    }
    else if(this.sprite.body.velocity.y < 0){ //else if is moving up
      if(this.sprite.position.y < EnemyShipController.UPPER_LINE) {
        this.sprite.body.velocity.y = EnemyShipController.SHIP_SPEED; //if cross the upper line, move down
      }
    }
    else {// if(this.sprite.body.velocity.y == 0)
      this.sprite.body.velocity.y = EnemyShipController.SHIP_SPEED; //if is not moving up or down, move down
    }

  }
}

EnemyShipController.SHIP_SPEED = 200;
EnemyShipController.LEFT_LINE = 40;
EnemyShipController.RIGHT_LINE = 550;
EnemyShipController.UPPER_LINE = 40;
EnemyShipController.LOWER_LINE = 400;
