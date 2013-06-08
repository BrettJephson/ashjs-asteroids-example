define(['ash', 'brejep/point'], function (Ash, Point) {
    var Gun = Ash.Class.extend({
        constructor: function (offsetX, offsetY, minimumShotInterval, bulletLifetime) {
            this.shooting = false;
            this.offsetFromParent = null;
            this.timeSinceLastShot = 0;
            this.offsetFromParent = new Point(offsetX, offsetY);
            this.minimumShotInterval = minimumShotInterval;
            this.bulletLifetime = bulletLifetime;
        }
    });

    return Gun;
});
