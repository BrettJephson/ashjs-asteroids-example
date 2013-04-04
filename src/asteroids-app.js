require([
    'brejep/fillsnfixes',
    'brejep/keypoll',
    'game/asteroids'
], function(Fixes, KeyPoll, Asteroids) {
        'use strict';

        function AsteroidsApp() {
            var CANVAS_WIDTH = 800,
                CANVAS_HEIGHT = 600;

            // Game initialisation
            this.initialise = function() {
                // some polyfills and additions to base javascript classes
                Fixes.initialise();

                var canvasElem = createCanvas();
                var gamewrapper = document.getElementById('game_wrapper');
                gamewrapper.appendChild(canvasElem);

                // init keyboard poll
                KeyPoll.initialise(window);

                var asteroids = new Asteroids();
                asteroids.initialise(canvasElem);
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
