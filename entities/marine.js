function Marine(game, spritesheet) {
    this.animation = new Animation(spritesheet, 64, 64, 17, 2);
    this.animation.currentState = "walking0";
	this.lastAnimChange = 0;

    //Mapping walking sprites

    var p = 4//Starting with the 5th sprite(0 based), going clockwise while recording the accurate angle.
    for (i = 0; i < 16; i++) {
        var x = 2 * (Math.abs(p));//x position on the sprite-sheet
        var angle = i * 22.5;//Angle the sprite is facing.
        var reflect = angle > 90 && angle < 270;

        console.log("Adding animation state: x = " + x + " angle = " + angle + " reflecting = " + reflect);


        this.animation.animationStates["walking" + angle] = new AnimationState("walking" + angle, x, 5, 9, angle, .1, true, reflect);
        p -= 1;
        //p = realMod(p, 9);
    }
    
    this.movementFactor = new MovementFactor(100);

    this.ctx = game.ctx;
    Entity.call(this, game, 0, this.ctx.canvas.height - (this.animation.frameHeight * this.animation.scale));
}

function realMod(a, n) {
    return a - (n * Math.floor(a / n));
}

Marine.prototype = new Entity();
Marine.prototype.constructor = Marine;


Marine.prototype.update = function () {

    var delta = this.game.clockTick;
    var speed = this.movementFactor.speed;
	this.lastAnimChange += delta;
	this.lastAnimChange %= 2;

    //Walking direction
	if(this.lastAnimChange <= 1){
		this.x += delta * speed * 1;
		if(this.x > this.ctx.canvas.width){
			this.x = -this.animation.frameWidth * this.animation.scale;
		}
		this.animation.currentState = "walking0";	
	} else {
		this.x += delta * speed * 1;
		this.y -= delta * speed * 1;
		if(this.x > this.ctx.canvas.width){
			this.x = -this.animation.frameWidth * this.animation.scale;
		}
		if(this.y < -this.animation.frameHeight * this.animation.scale){
			this.y = this.ctx.canvas.height + (this.animation.frameHeight * this.animation.scale);
		}
		this.animation.currentState = "walking45";	
	}

    Entity.prototype.update.call(this);
    this.lastUpdated = this.game.gameTime;
}

Marine.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}