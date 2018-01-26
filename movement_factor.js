function MovementFactor (speed) {
    this.speed = speed;
    this.north = 0;
    this.east = 0;
    this.south = 0;
    this.west = 0;
}

MovementFactor.prototype = new Object();
MovementFactor.prototype.constructor = MovementFactor;

MovementFactor.prototype.getVerticalDirection = function () {
    return this.north - this.south;
}

MovementFactor.prototype.getHorizontalDirection = function () {
    return this.east - this.west;
}


MovementFactor.prototype.getDirectionalAngle = function () {
    var vertical = this.north - this.south;
    var horizontal = this.east - this.west;

    var angle180Based = Math.atan2(vertical, horizontal) * 180 / Math.PI;//Do to the way Math.atan2 works, this will return between -180 and 180.
    var angle360Based = (angle180Based < 0 ? (angle180Based + 360) : angle180Based);//We want between 0 and 360.

    return angle360Based;

}
