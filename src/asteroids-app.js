require([
    'brejep/fillsnfixes',
    'brejep/keypoll',
    'game/asteroids',
    'Stats'
], function(Fixes, KeyPoll, Asteroids, Stats) {
        'use strict';

        function AsteroidsApp() {
            var CANVAS_WIDTH = 800,
                CANVAS_HEIGHT = 600;

            // Game initialisation
            this.initialise = function() {
                // some polyfills and additions to base javascript classes
                Fixes.initialise();

                var canvasElem = createCanvas();
                var gamewrapper = document.getElementById('game-wrapper');
                gamewrapper.appendChild(canvasElem);

                // init keyboard poll
                KeyPoll.initialise(window);

                // init Stats
                var stats = new Stats();
                stats.setMode(0); // 0: fps, 1: ms

                // Align top-left
                stats.domElement.style.position = 'absolute';
                stats.domElement.style.left = '0px';
                stats.domElement.style.top = '0px';

                gamewrapper.appendChild( stats.domElement );

                var asteroids = new Asteroids(canvasElem, stats);
                asteroids.start();
            };

            function createCanvas() {
                var canvasElem = document.createElement('canvas');
                canvasElem.setAttribute('id', 'game_stage');
                canvasElem.setAttribute('width', CANVAS_WIDTH);
                canvasElem.setAttribute('height', CANVAS_HEIGHT);
                canvasElem.style.backgroundColor = '#000';
                return canvasElem;
            }
        }

        // start!
        new AsteroidsApp().initialise();
    }
);
