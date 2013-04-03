define(function () {
    function SpaceshipView( graphic ) {
        this.initialise( graphic );
    }
    var api = SpaceshipView.prototype;
    api.x = 0;
    api.y = 0;
    api.width = 20;
    api.height = 20;
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
        graphic.beginPath();
        graphic.translate( this.x, this.y );
        graphic.rotate( this.rotation );
        graphic.fillStyle =  "#FFFFFF";
        graphic.moveTo( 8, 0 );
        graphic.lineTo( -7, 7 );
        graphic.lineTo( -4, 0 );
        graphic.lineTo( -7, -7 );
        graphic.lineTo( 10, 0 );
        graphic.fill();
        graphic.restore();
    };
    return SpaceshipView;
});
