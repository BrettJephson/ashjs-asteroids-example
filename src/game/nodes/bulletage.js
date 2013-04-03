define([
    'ash', 'game/components/bullet'
], function(Ash, Bullet ) {
    var BulletAge = Ash.Node.extend({
        bullet: null,
        types: {
            bullet : Bullet
        },

        constructor: function () { }
    });

    return BulletAge;
});
