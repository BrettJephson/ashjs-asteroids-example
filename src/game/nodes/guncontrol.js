define([
    'ash', 'game/components/guncontrols', 'game/components/gun', 'game/components/position'
], function (Ash, GunControls, Gun, Position) {
    var GunControl = Ash.Node.extend({
        control: null,
        gun: null,
        position: null,
        types: {
            control : GunControls,
            gun : Gun,
            position : Position
        },

        constructor: function () { }
    });

    return GunControl;
});
