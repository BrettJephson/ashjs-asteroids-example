// Set the require.js configuration for your application.
require.config({

    // Initialize the application with the main application file.
    deps: ["asteroids-app"],

    paths: {
        // JavaScript folders.
        brejep: "../lib/brejep",
        utils: "../lib/utils",
        game: "game",

        // Libraries
        ash: "../lib/ash/ash",
        Stats: "../lib/utils/Stats"
    },

    // Sets the configuration for your third party scripts that are not AMD compatible
    shim: {
        "Stats": {
            "exports": "Stats"
        }
    }
});
