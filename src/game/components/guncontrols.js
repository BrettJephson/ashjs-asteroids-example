define(['ash'], function (Ash) {
    var GunControls = Ash.Class.extend({
        constructor: function (trigger) {
            this.trigger = trigger;
        }
    });

    return GunControls;
});
