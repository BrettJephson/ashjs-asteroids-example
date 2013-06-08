define([
    'ash', 'game/components/bullet', 'game/components/position'
], function (Ash, Bullet, Position) {
    var BulletCollision = Ash.Node.extend({
        bullet: null,
        position: null,
        types: {
            bullet : Bullet,
            position : Position
        },

        constructor: function () { }
    });

    return BulletCollision;
});
