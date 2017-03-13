class EnemyShipController {
  constructor(x, y, spriteName) {
    this.sprite = Nakama.game.add.sprite(x, y, 'assets', spriteName);
    Nakama.game.physics.arcade.enable(this.sprite);
    this.sprite.body.collideWorldBounds = true;
  }

  update() {
    //move by x-side
    if(this.sprite.body.velocity.x > 0){  //if is moving right
      if(this.sprite.position.x > 550) {
        this.sprite.body.velocity.x = -EnemyShipController.SHIP_SPEED; //if cross the right line, move left
      }
    }
    else if(this.sprite.body.velocity.x < 0){ //if is moving left
      if(this.sprite.position.x < 40) {
        this.sprite.body.velocity.x = EnemyShipController.SHIP_SPEED; //if cross the left line, move right
      }
    }
    else { //if(this.sprite.body.velocity.x == 0)
      this.sprite.body.velocity.x = EnemyShipController.SHIP_SPEED; //if is not moving left or right, move right
    }

    //move by y-side
    if(this.sprite.body.velocity.y > 0){  //if is moving down
      if(this.sprite.position.y > 400) {
        this.sprite.body.velocity.y = -EnemyShipController.SHIP_SPEED; //if cross the lower line, move up
      }
    }
    else if(this.sprite.body.velocity.y < 0){ //if is moving up
      if(this.sprite.position.y < 40) {
        this.sprite.body.velocity.y = EnemyShipController.SHIP_SPEED; //if cross the upper line, move down
      }
    }
    else {// if(this.sprite.body.velocity.y == 0)
      this.sprite.body.velocity.y = EnemyShipController.SHIP_SPEED; //if is not moving up or down, move down
    }

  }
}

EnemyShipController.SHIP_SPEED = 200;
