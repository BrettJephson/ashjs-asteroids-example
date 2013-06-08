define(function () {
    function BulletView( graphic ) {
        this.initialise( graphic );
    }
    var api = BulletView.prototype;
    api.x = 0;
    api.y = 0;
    api.width = 4;
    api.height = 4;
    api.rotation = 0;
    api.graphic = null;
    api.initialise = function( graphic ) {
        this.graphic = graphic;
        this.draw();
        return this;
    };
    api.draw = function() {
        var graphic = this.graphic;
        graphic.save();
        graphic.rotate( this.rotation );
        graphic.beginPath();
        graphic.fillStyle = "#FFFFFF";
        graphic.arc( this.x, this.y, 2, 0, Math.PI*2, false );
        graphic.fill();
        graphic.restore();
    };
    return BulletView;
});
