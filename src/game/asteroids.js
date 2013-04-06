define([
    'game/components/gamestate',
    'game/systems/gamemanager',
    'game/systems/motioncontrolsystem',
    'game/systems/guncontrolsystem',
    'game/systems/bulletagesystem',
    'game/systems/movementsystem',
    'game/systems/collisionsystem',
    'game/systems/rendersystem',
    'game/systems/systempriorities',
    'game/entitycreator',
    'ash',
    'brejep/tickprovider',
    'brejep/keypoll'
], function (
    GameState,
    GameManager,
    MotionControlSystem,
    GunControlSystem,
    BulletAgeSystem,
    MovementSystem,
    CollisionSystem,
    RenderSystem,
    SystemPriorities,
    EntityCreator,
    Ash,
    TickProvider,
    KeyPoll
) {

    var Asteroids = Ash.Class.extend({
        width: 0,
        height: 0,
        engine: null,
        gameState: null,
        tickProvider: null,

        constructor: function (canvas, stats) {
            var canvasContext = canvas.getContext('2d');

            this.width = canvas.width;
            this.height = canvas.height;

            this.engine = new Ash.Engine();

            this.gameState = new GameState(this.width, this.height);

            var creator = new EntityCreator(this.engine, canvasContext);

            this.engine.addSystem(
                new GameManager(this.gameState, creator),
                SystemPriorities.preUpdate
           );
            this.engine.addSystem(
                new MotionControlSystem(KeyPoll),
                SystemPriorities.update
           );
            this.engine.addSystem(
                new GunControlSystem(KeyPoll, creator),
                SystemPriorities.update
           );
            this.engine.addSystem(
                new BulletAgeSystem(creator),
                SystemPriorities.update
           );
            this.engine.addSystem(
                new MovementSystem(this.gameState),
                SystemPriorities.move
           );
            this.engine.addSystem(
                new CollisionSystem(creator),
                SystemPriorities.resolveCollisions
           );
            this.engine.addSystem(
                new RenderSystem(canvasContext),
                SystemPriorities.render
           );
            this.tickProvider = new TickProvider(stats);
        },

        start: function () {
            this.gameState.level = 0;
            this.gameState.lives = 3;
            this.gameState.points = 0;

            this.tickProvider.add(this.engine.update, this.engine);
            this.tickProvider.start();
        }
    });

    return Asteroids;
});
