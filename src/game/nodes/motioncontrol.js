define([
    'ash', 'game/components/motioncontrols', 'game/components/position',
    'game/components/motion'
], function (Ash, MotionControls, Position, Motion) {
    var MotionControl = Ash.Node.create({
        control : MotionControls,
        position : Position,
        motion : Motion
    });

    return MotionControl;
});
