function Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, scale) {
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.sheetWidth = sheetWidth;
    this.elapsedTime = 0;
    this.scale = scale;
    this.currentState = "";
    this.animationStates = new Map();
}

function AnimationState(name, xIndex, yIndex, frames, rotationAngle, frameDuration, loop, reflect) {
    this.name = name;//string
    this.xIndex = xIndex;//int
    this.yIndex = yIndex;//int
    this.frames = frames;//int
    this.rotationAngle = rotationAngle;//Angle of rotation for the sprite.
    this.frameDuration = frameDuration;//Double
    this.loop = loop;//boolean
    this.reflect = reflect;//boolean
    this.totalTime = frameDuration * frames;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }

    var state = this.animationStates[this.currentState];
    var frame = this.currentFrame();
    var xindex = state.xIndex;
    var yindex = state.yIndex;

    yindex = (state.yIndex-1) + Math.floor(frame % state.frames);

    if (state.reflect) {
        ctx.scale(1, -1);
        ctx.translate(-this.frameHeight, -this.frameWidth);
    }

    ctx.drawImage(this.spriteSheet,
        xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
        this.frameWidth, this.frameHeight,
        x, y,
        this.frameWidth * this.scale,
        this.frameHeight * this.scale);
}

Animation.prototype.currentFrame = function () {
    var state = this.animationStates[this.currentState];
    return Math.floor(this.elapsedTime / state.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}