# Ashteroids.js
A simple asteroids game using [Ash.js](https://github.com/brejep/ash-js)

## Running
Open `ashteroids.html` from your browser to see the final result.

## Building/compiling
This project uses RequireJS (AMD) & [Grunt](http://www.gruntjs.com) for compiling/building all modules into 1 file.

### Dependencies
* Node.js
* Grunt's CLI installed using `npm install -g grunt-cli`
* Go to `ashjs-asteroids-example` folder & do `npm install`. This will automatically download & install the required modules for building the library

### Command lines
* `grunt` will run jshint & build the game files. The results can be found at folder `build` (both minified & non-minified version)

## Running *Developmennt Version*
* `grunt connect` to start a local webserver.
* From your browser, go to `http://localhost:9000/ashteroids.dev.html`.

## License
MIT License
