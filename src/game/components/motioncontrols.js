define(['ash'], function (Ash) {
    var MotionControls = Ash.Class.extend({
        constructor: function (left, right, accelerate, accelerationRate, rotationRate) {
            this.left = left;
            this.right = right;
            this.accelerate = accelerate;
            this.accelerationRate = accelerationRate;
            this.rotationRate = rotationRate;
        }
    });

    return MotionControls;
});
