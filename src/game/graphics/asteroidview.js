define(function() {
    function AsteroidView( radius, graphic ) {
        this.initialise( radius, graphic );
    }
    var api = AsteroidView.prototype;
    api.x = 0;
    api.y = 0;
    api.width = 0;
    api.height = 0;
    api.rotation = 0;
    api.graphic = null;
    api.radius = 0;
    api.points = null;
    api.initialise = function( radius, graphic ) {
        this.graphic = graphic;
        this.radius = radius;
        this.width = radius;
        this.height = radius;
        this.points = [];
        var angle = 0;
        while( angle < Math.PI * 2 ){
            var length = ( 0.75 + Math.random() * 0.25 ) * this.radius;
            var posX  = Math.cos( angle ) * length;
            var posY  = Math.sin( angle ) * length;
            this.points.push({x: posX, y: posY});
            angle += Math.random() * 0.5;
        }
        this.draw();
        return this;
    };
    api.count = 0;
    api.draw = function() {
        var graphic = this.graphic;
        graphic.save();
        graphic.beginPath();
        graphic.translate( this.x, this.y );
        graphic.rotate( this.rotation );
        graphic.fillStyle = "#FFFFFF";
        graphic.moveTo( this.radius, 0 );
        for( var i = 0; i<this.points.length; ++i){
            graphic.lineTo( this.points[i].x, this.points[i].y );
        }
        graphic.lineTo( this.radius, 0 );
        graphic.fill();
        graphic.restore();
    };

    return AsteroidView;
});
