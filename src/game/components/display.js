define(['ash'], function (Ash) {
    var Display = Ash.Class.extend({
        constructor: function (graphic) {
            this.graphic = graphic;
        }
    });

    return Display;
});
