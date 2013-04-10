# Ashteroids.js
A simple asteroids game using [Ash.js](https://github.com/brejep/ash-js), a JavaScript port of [Ash Framework](http://ashframework.org)

## Running
Just open `ashteroids.html` from your browser. This will run the final (built & minified) version of the game.

If you modify or customize the code, you have to re-build the sources in order to see the effect.
Or you can run the game in development version (see the [topic below](#running-the-development-version).

## Building/compiling
This project uses RequireJS (AMD) & [Grunt](http://www.gruntjs.com) for the building process.
All JavaScript files, including the Ash Framework, will be concatenated into 1 file & minified using UglifyJS.

### Dependencies
* Node.js
* Grunt's CLI installed globally using `npm install -g grunt-cli`
* `npm install` from the project folder. This will automatically download & install the required modules

### Command lines
* `grunt` will run jshint & build the game files. The results can be found at folder `build` (both minified & non-minified version)

## Running the *Development Version*
Open `ashteroids.dev.html` and you will run the non build-and-minified version of the game.
Running the development version allows you to debug the source codes easily or see any changes immediately without having to build.

## Grunt command lines
These are the list of grunt commands:

* `grunt connect` to start a local webserver (using port 9000 by default). From your browser, you can go to `http://localhost:9000/ashteroids.dev.html`.
* `grunt jshint` to jshint all JS files
* `grunt requirejs:compile` to build the non-minified version
* `grunt requirejs:minified` to build the minified version

## License
MIT License
