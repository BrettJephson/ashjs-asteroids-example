define([
    'ash', 'game/components/bullet'
], function(Ash, Bullet ) {
    var BulletAge = Ash.Node.create({
        bullet : Bullet
    });

    return BulletAge;
});
