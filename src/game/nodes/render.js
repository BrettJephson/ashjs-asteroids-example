define([
    'ash', 'game/components/position', 'game/components/display'
], function (Ash, Position, Display ) {
    var Render = Ash.Node.extend({
        position: null,
        display: null,
        types: {
            position : Position,
            display : Display
        },

        constructor: function () { }
    });

    return Render;
});
