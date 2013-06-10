define([
    'ash', 'game/components/bullet', 'game/components/position'
], function (Ash, Bullet, Position) {
    var BulletCollision = Ash.Node.create({
        bullet : Bullet,
        position : Position
    });

    return BulletCollision;
});
