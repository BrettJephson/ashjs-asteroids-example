// see a complete list of options here:
// https://github.com/jrburke/r.js/blob/master/build/example.build.js
requirejs.config({
  // all modules loaded are relative to this path
  // e.g. require(["grid/core"]) would grab /lib/grid/core.js
  baseUrl: ".",

  // specify custom module name paths
  paths: {
    // JavaScript folders.
    "brejep": "lib/brejep",
    "game": "src/game",
    "asteroids-app": "src/asteroids-app",

    // Libraries
    ash: "lib/ash/ash"
  },

  name: 'build/asteroids-build',

  optimize: "none",

  // build file destination, relative to the build file itself
  out: "build/ashteroids.js"
});
