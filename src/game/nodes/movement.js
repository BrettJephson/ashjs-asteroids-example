define([
    'ash', 'game/components/position', 'game/components/motion'
], function (Ash, Position, Motion) {
    var Movement = Ash.Node.create({
        position : Position,
        motion : Motion
    });

    return Movement;
});
