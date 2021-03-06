const GAME = {
  stage: null,
  PI_DEGREE_FACTOR: 180 / Math.PI
};

abstract class Actor {
  abstract render(x: number, y: number): void;
}

class GameEntity {
  actor: Actor;
  x: number;
  y: number;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  render(): void {
    this.actor.render(this.x, this.y);
  }
}

class TurretActor extends Actor {
  turret: Turret;
  body: createjs.Shape;

  constructor(turret: Turret) {
    super();
    this.turret = turret;

    //Prepare skin
    this.body = new createjs.Shape();
    this.body.graphics.beginFill("darkgrey").drawCircle(0, 0, 50);
    this.body.graphics.beginFill("grey").drawRect(-30, 0, 20, 70);
    this.body.graphics.beginFill("grey").drawRect(30, 0, -20, 70);
    this.body.setTransform(undefined, undefined, undefined, undefined, 0);
    GAME.stage.addChild(this.body);
  }

  render(x: number, y: number): void {
    this.body.setTransform(
      x,
      y,
      undefined,
      undefined,
      Math.atan2(GAME.stage.mouseX - x, GAME.stage.mouseY - y) *
        -GAME.PI_DEGREE_FACTOR
    );
  }
}

class Turret extends GameEntity {
  rotationAngle: number;

  constructor(x = 0, y = 0) {
    super(x, y);
    this.actor = new TurretActor(this);
  }

  shoot(): void {}

  turnLeft(degrees: number): void {}

  turnRight(degrees: number): void {}

  turnToAngle(angle: number): void {}

  turnTowardsEntity(entity: GameEntity): void {}
}

//class Projectile extends GameEntity {}
//class SpaceShip extends GameEntity {}

function init() {
  GAME.stage = new createjs.Stage("demoCanvas");
  const turrets = [];
  for (let i = 100; i < 800; i += 150) {
    for (let j = 100; j < 800; j += 150) {
      turrets.push(new Turret(i, j));
    }
  }

  createjs.Ticker.setInterval(0);
  createjs.Ticker.on("tick", () => {
    GAME.stage.update();

    turrets.forEach(turret => {
      turret.render();
    });
  });
}
