define([
    'ash', 'game/components/asteroid', 'game/components/position'
], function (Ash, Asteroid, Position) {
    var AsteroidCollision = Ash.Node.create({
        asteroid : Asteroid,
        position : Position
    });

    return AsteroidCollision;
});
