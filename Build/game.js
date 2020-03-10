const GAME = {
    stage: null,
    PI_DEGREE_FACTOR: 180 / Math.PI
};
class Actor {
}
class GameEntity {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    render() {
        this.actor.render(this.x, this.y);
    }
}
class TurretActor extends Actor {
    constructor(turret) {
        super();
        this.turret = turret;
        //Prepare skin colors
        const COLOR_BARREL = "#757575";
        const COLOR_MAIN_CIRCLE = "#aaaaaa";
        const COLOR_INNER_CIRCLE = "#888888";
        //Prepare skin shape settings
        const BODY_RADIUS = 50;
        const BARREL_WIDTH = 20;
        const BARREL_LENGTH = 70;
        const BARREL_OFFSET_X = 40;
        const BARREL_OFFSET_Y = 20;
        const BARREL_END_CIRCLE_RADIUS = BARREL_WIDTH / 2;
        //Prepare skin shapes
        this.shape = new createjs.Shape();
        this.shape.graphics.beginFill(COLOR_MAIN_CIRCLE).drawCircle(0, 0, BODY_RADIUS);
        this.shape.graphics.beginFill(COLOR_INNER_CIRCLE).drawCircle(0, 0, BODY_RADIUS / 2);
        this.shape.graphics.beginFill(COLOR_BARREL).drawRect(-BARREL_OFFSET_X, -BARREL_OFFSET_Y, BARREL_WIDTH, BARREL_LENGTH);
        this.shape.graphics.beginFill(COLOR_BARREL).drawRect(BARREL_OFFSET_X, -BARREL_OFFSET_Y, -BARREL_WIDTH, BARREL_LENGTH);
        this.shape.graphics.beginFill(COLOR_BARREL).drawCircle(BARREL_OFFSET_X - BARREL_END_CIRCLE_RADIUS, -BARREL_WIDTH, BARREL_END_CIRCLE_RADIUS);
        this.shape.graphics.beginFill(COLOR_BARREL).drawCircle(-BARREL_OFFSET_X + BARREL_END_CIRCLE_RADIUS, -BARREL_WIDTH, BARREL_END_CIRCLE_RADIUS);
        GAME.stage.addChild(this.shape);
    }
    render(x, y) {
        this.shape.setTransform(x, y, undefined, undefined, Math.atan2(GAME.stage.mouseX - x, GAME.stage.mouseY - y) *
            -GAME.PI_DEGREE_FACTOR);
    }
}
class Turret extends GameEntity {
    constructor(x = 0, y = 0) {
        super(x, y);
        this.actor = new TurretActor(this);
    }
    shoot() { }
    turnLeft(degrees) { }
    turnRight(degrees) { }
    turnToAngle(angle) { }
    turnTowardsEntity(entity) { }
}
//class Projectile extends GameEntity {}
//class SpaceShip extends GameEntity {}
function init() {
    GAME.stage = new createjs.Stage("gameCanvas");
    const turrets = [];
    for (let x = 100; x < 800; x += 300) {
        for (let y = 100; y < 800; y += 300) {
            turrets.push(new Turret(x, y));
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
