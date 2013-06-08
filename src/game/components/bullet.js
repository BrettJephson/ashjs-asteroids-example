define(['ash'], function (Ash) {
    var Bullet = Ash.Class.extend({
        constructor: function (lifeTime) {
            this.lifeRemaining = lifeTime;
        }
    });

    return Bullet;
});
