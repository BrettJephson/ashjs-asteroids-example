define([
    'ash', 'game/components/spaceship', 'game/components/position'
], function (Ash, Spaceship, Position) {
    var SpaceshipCollision = Ash.Node.create({
        spaceship : Spaceship,
        position : Position
    });

    return SpaceshipCollision;
});
