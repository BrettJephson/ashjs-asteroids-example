// Set the require.js configuration for your application.
require.config({

    // Initialize the application with the main application file.
    deps: ["asteroids-app"],

    paths: {
        // JavaScript folders.
        brejep: "../lib/brejep",
        game: "game",

        // Libraries
        ash: "../lib/ash/ash"
    }
});
