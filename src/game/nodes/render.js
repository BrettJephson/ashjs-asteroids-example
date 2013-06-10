define([
    'ash', 'game/components/position', 'game/components/display'
], function (Ash, Position, Display ) {
    var Render = Ash.Node.create({
        position : Position,
        display : Display
    });

    return Render;
});
