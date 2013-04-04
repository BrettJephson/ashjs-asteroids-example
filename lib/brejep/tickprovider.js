define([
    'ash'
], function (Ash) {
    var TickProvider = Ash.Class.extend({
        previousTime: 0,
        ticked: new Ash.Signals.Signal(),
        request: null,

        constructor: function () { },

        start: function () {
            this.request = requestAnimationFrame(this.tick.bind(this));
        },

        stop: function () {
            cancelRequestAnimationFrame(this.request);
        },

        add: function (listener, context) {
            this.ticked.add(listener, context);
        },

        remove: function (listener, context) {
            this.ticked.remove(listener, context);
        },

        tick: function (timestamp) {
            timestamp = timestamp || Date.now();
            var tmp = this.previousTime || timestamp;
            this.previousTime = timestamp;
            var delta = (timestamp - tmp) * 0.001;
            this.ticked.dispatch(delta);
            requestAnimationFrame(this.tick.bind(this));
        }
    });

    return TickProvider;
});
