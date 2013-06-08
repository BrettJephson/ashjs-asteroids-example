define(['ash'], function (Ash) {
    var GameState = Ash.Class.extend({
        constructor: function (width, height) {
            this.lives = 0;
            this.level = 0;
            this.points = 0;
            this.width = width;
            this.height = height;
        }
    });

    return GameState;
});
