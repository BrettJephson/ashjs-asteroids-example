define([
    'ash', 'game/components/guncontrols', 'game/components/gun', 'game/components/position'
], function (Ash, GunControls, Gun, Position) {
    var GunControl = Ash.Node.create({
        control : GunControls,
        gun : Gun,
        position : Position
    });

    return GunControl;
});
