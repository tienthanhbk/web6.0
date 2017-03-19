class ShipType2Controller extends ShipController{
  constructor(x, y, configs){
    super(x, y, ShipType2Controller.NAME, configs);
    this.sprite.health = ShipType2Controller.MAX_HEIGHT;
  }

  createBullet(direction){
    new BulletType2Controller(
      this.sprite.position,
      direction
    )
  }
}
ShipType1Controller.MAX_HEIGHT = 7;
ShipType1Controller.NAME = "Spaceship1-Player.png";
