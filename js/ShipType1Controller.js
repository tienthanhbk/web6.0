class ShipType1Controller extends ShipController{
  constructor(x, y, configs){
    super(x, y, ShipType1Controller.NAME, configs);
    this.sprite.health = ShipType1Controller.MAX_HEIGHT;
  }

  createBullet(direction){
    new BulletType1Controller(
      this.sprite.position,
      direction
    )
  }
}
ShipType1Controller.MAX_HEIGHT = 10;
ShipType1Controller.NAME = "Spaceship1-Player.png";
