ashjs-asteroids-example
=======================

Ash JS asteroids example.

You can play the game through build/asteroids-dev.html.

To compile the game into a single uglified javascript file, you will need node and npm installed. From the root of the project run:

    npm install
    grunt
    
The first command installs all the dependencies defined in package.json and the second command will run jshint and requirejs. The output is the file asteroids-game.js in the build folder and this version of the game can be played through build/asteroids.html.