define(['ash', 'brejep/point'], function (Ash, Point) {
    var Position = Ash.Class.extend({
        constructor: function (x, y, rotation, collisionRadius) {
            this.position = new Point(x, y);
            this.rotation = rotation;
            this.collisionRadius = collisionRadius;
        }
    });

    return Position;
});
