define(['ash', 'brejep/point'], function (Ash, Point) {
    var Motion = Ash.Class.extend({
        constructor: function (velocityX, velocityY, angularVelocity, damping) {
            this.velocity = new Point(velocityX, velocityY);
            this.angularVelocity = angularVelocity;
            this.damping = damping;
        }
    });

    return Motion;
});
