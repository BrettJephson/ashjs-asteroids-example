(function(global) {
    // Poly fills for Object creation and extension
    function fixObjectCreate() {
        if( typeof Object.create !== "function" ) {
            Object.create = function ( obj ) {
                function F() {}
                F.prototype = obj;
                return new F();
            };
        }
    }

    function fixObjectExtend() {
        if( typeof Object.extend !== "function" ) {
            Object.extend = function( destination, source ) {
                for (var property in source) {
                    if(!destination.hasOwnProperty(property) && source.hasOwnProperty(property) ) {
                        destination[property] = source[property];
                    }
                }
                return destination;
            }
        }
    }
    
    function fixObjectDeepExtend() {
        if( typeof Object.deepExtend !== "function" ) {
            Object.deepExtend = function(destination, source) {
                for (var property in source) {
                    if (source[property] && source[property].constructor &&
                        source[property].constructor === Object) {
                        destination[property] = destination[property] || {};
                        arguments.callee(destination[property], source[property]);
                    } else {
                        destination[property] = source[property];
                    }
                }
                return destination;
            };
        }
    }

    // Polyfill for requestAnimationFrame
    function fixRequestAnimationFrame() {
        var requestAnimationFrame = global.requestAnimationFrame || 
                                    global.mozRequestAnimationFrame ||  
                                    global.webkitRequestAnimationFrame || 
                                    global.msRequestAnimationFrame ||
                                    function( /* function */ callback, /* DOMElement */ element ){
                                        return global.setTimeout( callback, 1000 / 60 );
                                    };
        global.requestAnimationFrame = requestAnimationFrame;
            
        var cancelRequestAnimationFrame = global.cancelAnimationFrame || 
                                    global.webkitCancelRequestAnimationFrame ||
                                    global.mozCancelRequestAnimationFrame ||
                                    global.oCancelRequestAnimationFrame ||
                                    global.msCancelRequestAnimationFrame ||
                                    global.clearTimeout;
        global.cancelRequestAnimationFrame = cancelRequestAnimationFrame;
    }
    
    // Keyboard key codes
    function addKeyboardCodeEnum() {
        global.Keyboard = {
            BACKSPACE: 8,
            TAB: 9,
            ENTER: 13,
            SHIFT: 16,
            CONTROL: 17,
            CAPSLOCK: 20,
            ESCAPE: 27,
            SPACEBAR: 32,
            PAGE_UP: 33,
            PAGE_DOWN: 34,
            END: 35,
            HOME: 36,
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40,
            INSERT: 45,
            DELETE: 46,
            NUMLOCK: 144,
            SCROLL_LOCK: 145,
            PAUSE_BREAK: 19,
            
            ZERO: 48,
            ONE: 49,
            TWO: 50,
            THREE: 51,
            FOUR: 52,
            FIVE: 53,
            SIX: 54,
            SEVEN: 55,
            EIGHT: 56,
            NINE: 57,
            
            A: 65,
            B: 66,
            C: 67,
            D: 68,
            E: 69,
            F: 70,
            G: 71,
            H: 72,
            I: 73,
            J: 74,
            K: 75,
            L: 76,
            M: 77,
            N: 78,
            O: 79,
            P: 80,
            Q: 81,
            R: 82, 
            S: 83,
            T: 84,
            U: 85,
            V: 86,
            W: 87,
            X: 88,
            Y: 89,
            Z: 90,
            
            NUMPAD_ZERO: 96,
            NUMPAD_ONE: 97,
            NUMPAD_TWO: 98,
            NUMPAD_THREE: 99,
            NUMPAD_FOUR: 100,
            NUMPAD_FIVE: 101,
            NUMPAD_SIX: 102,
            NUMPAD_SEVEN: 103,
            NUMPAD_EIGHT: 104,
            NUMPAD_NINE: 105,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_ADD: 107,
            NUMPAD_ENTER: 13,
            NUMPAD_SUBTRACT: 109,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111
        };
    }

    function addTestHelpers() {
        function hasItems( testArray, items ) {
            var testCount = items.length;
            for( var i = 0; i<testArray.length; ++i ){
                for( var j = 0; j<items.length; ++j ) {
                    if( testArray[i] == items[j] ) {
                        testCount--;
                    }
                }
            }
            return testCount === 0;
        }
        window['hasItems'] = hasItems;
    }

    global.TEST_ENV = 0;
    global.STAGE_ENV = 1;
    global.LIVE_ENV = 2;

    var fillsnfixes = {
        VERSION : '0.1.0',
        initialise : function(env) {
            fixObjectCreate();
            fixObjectExtend();
            fixObjectDeepExtend();
            fixRequestAnimationFrame();
            addKeyboardCodeEnum();
            if(env == TEST_ENV )
            {
                addTestHelpers();
            }
        }
    };
    
    //exports to multiple environments
    if(typeof define === 'function' && define.amd){ //AMD
        define( "brejep/fillsnfixes", fillsnfixes );
    } else if (typeof module !== 'undefined' && module.exports){ //node
        module.exports = fillsnfixes;
    } else { //browser
        //use string because of Google closure compiler ADVANCED_MODE
        global['fillsnfixes'] = fillsnfixes;
    }
}(this));
(function( root, factory ) {
    // We want the object to work with or without AMD
    if( typeof define === 'function' && define.amd ) {
        define('brejep/dictionary', factory );
    } else {
        // If not using AMD, references to dependencies must be available on the root object
        if( typeof root.brejep === 'undefined') {
            root.brejep = {};
        }
        root.brejep.dictionary = factory();
    }
} ( this, function() {
    "use strict";
    function Dictionary() {
        this.initialise();
    }
    var api = Dictionary.prototype;
    api.VERSION = "0.1.0";
    api.keys = null;
    api.values = null;
    api.initialise = function() {
        this.keys = [];
        this.values = [];
        return this;
    };
    api.add = function( key, value ) {
        var keyIndex = this.getIndex( key );
        if( keyIndex >= 0 ) {
            this.values[keyIndex] = value;
        } else {
            this.keys.push( key );
            this.values.push( value );
        }
    };
    api.remove = function( key ) {
        var keyIndex = this.getIndex( key );
        if( keyIndex >= 0 ) {
            this.keys.splice( keyIndex, 1 );
            this.values.splice( keyIndex, 1 );
        } else {
            throw "Key does not exist";
        }
    };
    api.retrieve = function( key ) {
        var value = null;
        var keyIndex = this.getIndex( key );
        if( keyIndex >= 0 ) {
            value = this.values[ keyIndex ];
        }
        return value;
    };
    api.getIndex = function( testKey ) {
        var i = 0,
            len = this.keys.length,
            key;
        for( ; i<len; ++i ){
            key = this.keys[i];
            if( key == testKey ) {
                return i;
            }
        }
        return -1;
    };
    api.has = function( testKey ) {
        var i = 0,
            len = this.keys.length,
            key;
        for( ; i<len; ++i ){
            key = this.keys[i];
            if( key == testKey ) {
                return true;
            }
        }
        return false;
    };
    api.forEach = function( action ) {
        var i = 0,
            len = this.keys.length,
            key, 
            value;
        
        for( ; i<len; ++i ) {
            key = this.keys[i];
            value = this.values[i];
            var breakHere = action( key, value );
            if( breakHere == "return" ) {
                return false;
            }
        }
        return true;
    };  
    return Dictionary;
}));
(function( root, factory ) {
    // We want the object to work with or without AMD
    if( typeof define === 'function' && define.amd ) {
        define('brejep/point', factory );
    } else {
        // If not using AMD, references to dependencies must be available on the root object
        if( typeof root.brejep === 'undefined') {
            root.brejep = {};
        }
        root.brejep.point = factory();
    }
} ( this, function() {
    "use strict";
    function Point( x, y ) {
        this.x = x || 0;
        this.y = y || 0;
    }
    Point.VERSION = "0.1.0";
    Point.prototype.x = null;
    Point.prototype.y = null;
    Point.prototype.distanceSquaredTo = function( targetPoint ) {
        var dx = this.x - targetPoint.x,
            dy = this.y - targetPoint.y;
        return dx * dx + dy * dy;
    };
    Point.prototype.distanceTo = function( targetPoint ) {
        var dx = this.x - targetPoint.x,
            dy = this.y - targetPoint.y;
        return Math.sqrt( dx * dx + dy * dy );
    };
    return Point;
}));
/*jslint onevar:true, undef:true, newcap:true, regexp:true, bitwise:true, maxerr:50, indent:4, white:false, nomen:false, plusplus:false */
/*global define:false, require:false, exports:false, module:false*/

/** @license
 * JS Signals <http://millermedeiros.github.com/js-signals/>
 * Released under the MIT license
 * Author: Miller Medeiros
 * Version: 0.7.4 - Build: 252 (2012/02/24 10:30 PM)
 */

(function(global){

    /**
     * @namespace Signals Namespace - Custom event/messaging system based on AS3 Signals
     * @name signals
     */
    var signals = /** @lends signals */{
        /**
         * Signals Version Number
         * @type String
         * @const
         */
        VERSION : '0.7.4'
    };


    // SignalBinding -------------------------------------------------
    //================================================================

    /**
     * Object that represents a binding between a Signal and a listener function.
     * <br />- <strong>This is an internal constructor and shouldn't be called by regular users.</strong>
     * <br />- inspired by Joa Ebert AS3 SignalBinding and Robert Penner's Slot classes.
     * @author Miller Medeiros
     * @constructor
     * @internal
     * @name signals.SignalBinding
     * @param {signals.Signal} signal Reference to Signal object that listener is currently bound to.
     * @param {Function} listener Handler function bound to the signal.
     * @param {boolean} isOnce If binding should be executed just once.
     * @param {Object} [listenerContext] Context on which listener will be executed (object that should represent the `this` variable inside listener function).
     * @param {Number} [priority] The priority level of the event listener. (default = 0).
     */
    function SignalBinding(signal, listener, isOnce, listenerContext, priority) {

        /**
         * Handler function bound to the signal.
         * @type Function
         * @private
         */
        this._listener = listener;

        /**
         * If binding should be executed just once.
         * @type boolean
         * @private
         */
        this._isOnce = isOnce;

        /**
         * Context on which listener will be executed (object that should represent the `this` variable inside listener function).
         * @memberOf signals.SignalBinding.prototype
         * @name context
         * @type Object|undefined|null
         */
        this.context = listenerContext;

        /**
         * Reference to Signal object that listener is currently bound to.
         * @type signals.Signal
         * @private
         */
        this._signal = signal;

        /**
         * Listener priority
         * @type Number
         * @private
         */
        this._priority = priority || 0;
    }

    SignalBinding.prototype = /** @lends signals.SignalBinding.prototype */ {

        /**
         * If binding is active and should be executed.
         * @type boolean
         */
        active : true,

        /**
         * Default parameters passed to listener during `Signal.dispatch` and `SignalBinding.execute`. (curried parameters)
         * @type Array|null
         */
        params : null,

        /**
         * Call listener passing arbitrary parameters.
         * <p>If binding was added using `Signal.addOnce()` it will be automatically removed from signal dispatch queue, this method is used internally for the signal dispatch.</p>
         * @param {Array} [paramsArr] Array of parameters that should be passed to the listener
         * @return {*} Value returned by the listener.
         */
        execute : function (paramsArr) {
            var handlerReturn, params;
            if (this.active && !!this._listener) {
                params = this.params? this.params.concat(paramsArr) : paramsArr;
                handlerReturn = this._listener.apply(this.context, params);
                if (this._isOnce) {
                    this.detach();
                }
            }
            return handlerReturn;
        },

        /**
         * Detach binding from signal.
         * - alias to: mySignal.remove(myBinding.getListener());
         * @return {Function|null} Handler function bound to the signal or `null` if binding was previously detached.
         */
        detach : function () {
            return this.isBound()? this._signal.remove(this._listener, this.context) : null;
        },

        /**
         * @return {Boolean} `true` if binding is still bound to the signal and have a listener.
         */
        isBound : function () {
            return (!!this._signal && !!this._listener);
        },

        /**
         * @return {Function} Handler function bound to the signal.
         */
        getListener : function () {
            return this._listener;
        },

        /**
         * Delete instance properties
         * @private
         */
        _destroy : function () {
            delete this._signal;
            delete this._listener;
            delete this.context;
        },

        /**
         * @return {boolean} If SignalBinding will only be executed once.
         */
        isOnce : function () {
            return this._isOnce;
        },

        /**
         * @return {string} String representation of the object.
         */
        toString : function () {
            return '[SignalBinding isOnce:' + this._isOnce +', isBound:'+ this.isBound() +', active:' + this.active + ']';
        }

    };


/*global signals:false, SignalBinding:false*/

    // Signal --------------------------------------------------------
    //================================================================

    function validateListener(listener, fnName) {
        if (typeof listener !== 'function') {
            throw new Error( 'listener is a required param of {fn}() and should be a Function.'.replace('{fn}', fnName) );
        }
    }

    /**
     * Custom event broadcaster
     * <br />- inspired by Robert Penner's AS3 Signals.
     * @author Miller Medeiros
     * @constructor
     */
    signals.Signal = function () {
        /**
         * @type Array.<SignalBinding>
         * @private
         */
        this._bindings = [];
        this._prevParams = null;
    };

    signals.Signal.prototype = {

        /**
         * If Signal should keep record of previously dispatched parameters and
         * automatically execute listener during `add()`/`addOnce()` if Signal was
         * already dispatched before.
         * @type boolean
         */
        memorize : false,

        /**
         * @type boolean
         * @private
         */
        _shouldPropagate : true,

        /**
         * If Signal is active and should broadcast events.
         * <p><strong>IMPORTANT:</strong> Setting this property during a dispatch will only affect the next dispatch, if you want to stop the propagation of a signal use `halt()` instead.</p>
         * @type boolean
         */
        active : true,

        /**
         * @param {Function} listener
         * @param {boolean} isOnce
         * @param {Object} [listenerContext]
         * @param {Number} [priority]
         * @return {SignalBinding}
         * @private
         */
        _registerListener : function (listener, isOnce, listenerContext, priority) {

            var prevIndex = this._indexOfListener(listener, listenerContext),
                binding;

            if (prevIndex !== -1) {
                binding = this._bindings[prevIndex];
                if (binding.isOnce() !== isOnce) {
                    throw new Error('You cannot add'+ (isOnce? '' : 'Once') +'() then add'+ (!isOnce? '' : 'Once') +'() the same listener without removing the relationship first.');
                }
            } else {
                binding = new SignalBinding(this, listener, isOnce, listenerContext, priority);
                this._addBinding(binding);
            }

            if(this.memorize && this._prevParams){
                binding.execute(this._prevParams);
            }

            return binding;
        },

        /**
         * @param {SignalBinding} binding
         * @private
         */
        _addBinding : function (binding) {
            //simplified insertion sort
            var n = this._bindings.length;
            do { --n; } while (this._bindings[n] && binding._priority <= this._bindings[n]._priority);
            this._bindings.splice(n + 1, 0, binding);
        },

        /**
         * @param {Function} listener
         * @return {number}
         * @private
         */
        _indexOfListener : function (listener, context) {
            var n = this._bindings.length,
                cur;
            while (n--) {
                cur = this._bindings[n];
                if (cur._listener === listener && cur.context === context) {
                    return n;
                }
            }
            return -1;
        },

        /**
         * Check if listener was attached to Signal.
         * @param {Function} listener
         * @param {Object} [context]
         * @return {boolean} if Signal has the specified listener.
         */
        has : function (listener, context) {
            return this._indexOfListener(listener, context) !== -1;
        },

        /**
         * Add a listener to the signal.
         * @param {Function} listener Signal handler function.
         * @param {Object} [listenerContext] Context on which listener will be executed (object that should represent the `this` variable inside listener function).
         * @param {Number} [priority] The priority level of the event listener. Listeners with higher priority will be executed before listeners with lower priority. Listeners with same priority level will be executed at the same order as they were added. (default = 0)
         * @return {SignalBinding} An Object representing the binding between the Signal and listener.
         */
        add : function (listener, listenerContext, priority) {
            validateListener(listener, 'add');
            return this._registerListener(listener, false, listenerContext, priority);
        },

        /**
         * Add listener to the signal that should be removed after first execution (will be executed only once).
         * @param {Function} listener Signal handler function.
         * @param {Object} [listenerContext] Context on which listener will be executed (object that should represent the `this` variable inside listener function).
         * @param {Number} [priority] The priority level of the event listener. Listeners with higher priority will be executed before listeners with lower priority. Listeners with same priority level will be executed at the same order as they were added. (default = 0)
         * @return {SignalBinding} An Object representing the binding between the Signal and listener.
         */
        addOnce : function (listener, listenerContext, priority) {
            validateListener(listener, 'addOnce');
            return this._registerListener(listener, true, listenerContext, priority);
        },

        /**
         * Remove a single listener from the dispatch queue.
         * @param {Function} listener Handler function that should be removed.
         * @param {Object} [context] Execution context (since you can add the same handler multiple times if executing in a different context).
         * @return {Function} Listener handler function.
         */
        remove : function (listener, context) {
            validateListener(listener, 'remove');

            var i = this._indexOfListener(listener, context);
            if (i !== -1) {
                this._bindings[i]._destroy(); //no reason to a SignalBinding exist if it isn't attached to a signal
                this._bindings.splice(i, 1);
            }
            return listener;
        },

        /**
         * Remove all listeners from the Signal.
         */
        removeAll : function () {
            var n = this._bindings.length;
            while (n--) {
                this._bindings[n]._destroy();
            }
            this._bindings.length = 0;
        },

        /**
         * @return {number} Number of listeners attached to the Signal.
         */
        getNumListeners : function () {
            return this._bindings.length;
        },

        /**
         * Stop propagation of the event, blocking the dispatch to next listeners on the queue.
         * <p><strong>IMPORTANT:</strong> should be called only during signal dispatch, calling it before/after dispatch won't affect signal broadcast.</p>
         * @see signals.Signal.prototype.disable
         */
        halt : function () {
            this._shouldPropagate = false;
        },

        /**
         * Dispatch/Broadcast Signal to all listeners added to the queue.
         * @param {...*} [params] Parameters that should be passed to each handler.
         */
        dispatch : function (params) {
            if (! this.active) {
                return;
            }

            var paramsArr = Array.prototype.slice.call(arguments),
                n = this._bindings.length,
                bindings;

            if (this.memorize) {
                this._prevParams = paramsArr;
            }

            if (! n) {
                //should come after memorize
                return;
            }

            bindings = this._bindings.slice(); //clone array in case add/remove items during dispatch
            this._shouldPropagate = true; //in case `halt` was called before dispatch or during the previous dispatch.

            //execute all callbacks until end of the list or until a callback returns `false` or stops propagation
            //reverse loop since listeners with higher priority will be added at the end of the list
            do { n--; } while (bindings[n] && this._shouldPropagate && bindings[n].execute(paramsArr) !== false);
        },

        /**
         * Forget memorized arguments.
         * @see signals.Signal.memorize
         */
        forget : function(){
            this._prevParams = null;
        },

        /**
         * Remove all bindings from signal and destroy any reference to external objects (destroy Signal object).
         * <p><strong>IMPORTANT:</strong> calling any method on the signal instance after calling dispose will throw errors.</p>
         */
        dispose : function () {
            this.removeAll();
            delete this._bindings;
            delete this._prevParams;
        },

        /**
         * @return {string} String representation of the object.
         */
        toString : function () {
            return '[Signal active:'+ this.active +' numListeners:'+ this.getNumListeners() +']';
        }

    };


    //exports to multiple environments
    if(typeof define === 'function' && define.amd){ //AMD
        define(signals);
    } else if (typeof module !== 'undefined' && module.exports){ //node
        module.exports = signals;
    } else { //browser
        //use string because of Google closure compiler ADVANCED_MODE
        global['signals'] = signals;
    }

}(this));

/**
 * Ash-js Entity
 */
(function( root, factory ) {
    // We want the object to work with or without AMD
    if( typeof define === 'function' && define.amd ) {
           define('ash/entity', [ "libs/signals", "brejep/dictionary" ], factory );
    } else {
        // If not using AMD, references to dependencies must be available on the root object
        if( typeof root.ash === 'undefined') {
            root.ash = {};
        }
        root.ash.entity = factory( root.signals, root.brejep.dictionary );
    }
} ( this, function( signals, Dictionary ) {
    "use strict";
    function Entity() {
        this.initialise();
    }
    var api = Entity.prototype;
    api.componentAdded = new signals.Signal();
    api.componentRemoved = new signals.Signal();
    api.previous = null; /* Entity */
    api.next = null; /* Entity */
    api.components = null;
    api.initialise = function()  {
        this.components = new Dictionary();
        return this;
    };
    api.add = function( component, componentObject ) {
        componentObject = componentObject || component.constructor;
        componentObject = componentObject.prototype;
        if ( this.components.has( componentObject ) ) {
            this.remove( componentObject );
        }
        this.components.add( componentObject, component );
        this.componentAdded.dispatch( this, componentObject );
        return this;
    };
    api.remove = function( componentObject ) {
        componentObject = componentObject.prototype;
        var component = this.components.retrieve( componentObject );
        if ( component ) {
            this.components.remove( componentObject );
            this.componentRemoved.dispatch( this, componentObject );
            return component;
        }
        return null;
    };
    api.get = function( componentObject ) {
        return this.components.retrieve( componentObject.prototype );
    };
    /**
     * Get all components from the entity.
     * @return {Array} Contains all the components on the entity
     */
    api.getAll = function() {
        var componentArray = [];
        this.components.forEach(function( componentObject, component ) {
            componentArray.push(component);
        });
        return componentArray;
    };
    api.has = function( componentObject ) {
        return this.components.has( componentObject.prototype );
    };
    api.clone = function() {
        var copy = new Entity();
        this.components.forEach( function( componentObject, component ) {
            var newComponent = new componentObject.constructor();
            for( var property in component ) {
                if( component.hasOwnProperty( property ) ) {
                    newComponent[property] = component[property];
                }
            }
            copy.add( newComponent );
        } );
        return copy;
    };
    return Entity;
}));
/**
 * Ash-js EntityList
 */
(function( root, factory ) {
    // We want the object to work with or without AMD
    if( typeof define === 'function' && define.amd ) {
        define('ash/entitylist', factory );
    } else {
        // If not using AMD, references to dependencies must be available on the root object
        if( typeof root.ash === 'undefined') {
            root.ash = {};
        }
        root.ash.entitylist = factory();
    }
} ( this, function() {
    "use strict";
    function EntityList() {
        
    }
    var api = EntityList.prototype;
    api.head = null; /* Entity */
    api.tail = null; /* Entity */
    api.add = function( entity ) {
        if( !this.head ) {
            this.head = this.tail = entity;
        } else {
            this.tail.next = entity;
            entity.previous = this.tail;
            this.tail = entity;
        }
    };
    api.remove = function( entity ) {
        if ( this.head == entity ) {
            this.head = this.head.next;
        }
        if ( this.tail == entity ) {
            this.tail = this.tail.previous;
        }
        if ( entity.previous ) {
            entity.previous.next = entity.next;
        }
        if ( entity.next ) {
            entity.next.previous = entity.previous;
        }
    };
    api.removeAll = function() {
        while( this.head ) {
            var entity = this.head;
            this.head = this.head.next;
            entity.previous = null;
            entity.next = null;
        }
        this.tail = null;
    };
    return EntityList;
}));
/**
 * Ash-js Node
 */
(function( root, factory ) {
    // We want the object to work with or without AMD
    if( typeof define === 'function' && define.amd ) {
        define('ash/node', factory );
    } else {
        // If not using AMD, references to dependencies must be available on the root object
        if( typeof root.ash === 'undefined') {
            root.ash = {};
        }
        root.ash.node = factory();
    }
} ( this, function() {
    "use strict";
    function Node() {}
    var api = Node.prototype;
    api.entity = null;
    api.previous = null;
    api.next = null;
    return Node;
}));
/**
 * Ash-js Node List
 */
(function( root, factory ) {
    // We want the object to work with or without AMD
    if( typeof define === 'function' && define.amd ) {
        define('ash/nodelist', ["libs/signals"], factory );
    } else {
        // If not using AMD, references to dependencies must be available on the root object
        if( typeof root.ash === 'undefined') {
            root.ash = {};
        }
        root.ash.nodelist = factory( root.signals );
    }
} ( this, function( signals ) {
    "use strict";
    function NodeList() {}
    NodeList.prototype.head = null;
    NodeList.prototype.tail = null;
    NodeList.prototype.nodeAdded = new signals.Signal();
    NodeList.prototype.nodeRemoved = new signals.Signal();
    NodeList.prototype.add = function( node ) {
        if( !this.head ) {
            this.head = this.tail = node;
        } else {
            this.tail.next = node;
            node.previous = this.tail;
            this.tail = node;
        }
        this.nodeAdded.dispatch( node );
    };
    NodeList.prototype.remove = function( node ) {
        if( this.head == node ) {
            this.head = this.head.next;
        }
        if( this.tail == node ) {
            this.tail = this.tail.previous;
        }
        if( node.previous ) {
            node.previous.next = node.next;
        }
        if( node.next ) {
            node.next.previous = node.previous;
        }
        this.nodeRemoved.dispatch( node );
    };
    NodeList.prototype.removeAll = function() {
        while( this.head ) {
            var node = this.head;
            this.head = node.next;
            node.previous = null;
            node.next = null;
            this.nodeRemoved.dispatch( node );
        }
        this.tail = null;
    };
    NodeList.prototype.empty = function() {
        return this.head == null;
    };
    NodeList.prototype.swap = function( node1, node2 ) {
        if( node1.previous == node2 ) {
            node1.previous = node2.previous;
            node2.previous = node1;
            node2.next = node1.next;
            node1.next = node2;
        } else if( node2.previous == node1 ) {
            node2.previous = node1.previous;
            node1.previous = node2;
            node1.next = node2.next;
            node2.next = node1;
        } else {
            var temp = node1.previous;
            node1.previous = node2.previous;
            node2.previous = temp;
            temp = node1.next;
            node1.next = node2.next;
            node2.next = temp;
        }
        if( this.head == node1 ) {
            this.head = node2;
        } else if( this.head == node2 ) {
            this.head = node1;
        }
        if( this.tail == node1 ) {
            this.tail = node2;
        } else if( this.tail == node2 ) {
            this.tail = node1;
        }
        if( node1.previous ) {
            node1.previous.next = node1;
        }
        if( node2.previous ) {
            node2.previous.next = node2;
        }
        if( node1.next ) {
            node1.next.previous = node1;
        }
        if( node2.next ) {
            node2.next.previous = node2;
        }
    };
    return NodeList;
}));
/**
 * Ash-js Node Pool
 */
(function( root, factory ) {
    // We want the object to work with or without AMD
    if( typeof define === 'function' && define.amd ) {
        define('ash/nodepool', factory );
    } else {
        // If not using AMD, references to dependencies must be available on the root object
        if( typeof root.ash === 'undefined') {
            root.ash = {};
        }
        root.ash.nodepool = factory();
    }
} ( this, function() {
    "use strict";
    function NodePool( nodeClass ) {
        this.initialise( nodeClass );
    }
    var api = NodePool.prototype;
    api.tail = null;
    api.cacheTail = null;
    api.nodeClass = null;
    api.initialise = function( nodeClass ) {
        this.nodeClass = nodeClass;
        return this;
    };
    api.get = function() {
        if( this.tail ) {
            var node = this.tail;
            this.tail = this.tail.previous;
            node.previous = null;
            return node;
        } else {
            return new this.nodeClass();
        }
    };
    api.dispose = function( node ) {
        node.next = null;
        node.previous = this.tail;
        this.tail = node;
    };
    api.cache = function( node ) {
        node.previous = this.cacheTail;
        this.cacheTail = node;
    };
    api.releaseCache = function() {
        while( this.cacheTail ) {
            var node = this.cacheTail;
            this.cacheTail = node.previous;
            node.next = null;
            node.previous = this.tail;
            this.tail = node;
        }
    };
    return NodePool;
}));
/**
 * Ash-js Family
 */
(function( root, factory ) {
    // We want the object to work with or without AMD
    if( typeof define === 'function' && define.amd ) {
        define('ash/family', [], factory );
    } else {
        // If not using AMD, references to dependencies must be available on the root object
        if( typeof root.ash === 'undefined') {
            root.ash = {};
        }
        root.ash.family = factory();
    }
} ( this, function() {
    "use strict";
    function Family() {}
    Family.prototype.nodes = null;
    Family.prototype.__defineGetter__("nodeList", function() {
            return this.nodes;
    });
    Family.prototype.initialise = function( nodeObject, engine ) {
        throw new Error( 'should be overriden' );
    };
    Family.prototype.newEntity = function( entity ) {
        throw new Error( 'should be overriden' );
    };
    Family.prototype.removeEntity = function( entity ) {
        throw new Error( 'should be overriden' );
    };
    Family.prototype.componentAddedToEntity = function( entity, componentClass ) {
        throw new Error( 'should be overriden' );
    };
    Family.prototype.componentRemovedFromEntity = function( entity, componentClass ) {
        throw new Error( 'should be overriden' );
    };
    Family.prototype.cleanUp = function() {
        throw new Error( 'should be overriden' );    
    };
    return Family;
}));
/**
 * @author Brett Jephson
 */
(function( root, factory ) {
    // We want the object to work with or without AMD
    if( typeof define === 'function' && define.amd ) {
        define(
            'ash/componentmatchingfamily',
            ['ash/family', 'ash/nodepool', 'ash/nodelist', 'brejep/dictionary'],
            factory
        );
    } else {
        // If not using AMD, references to dependencies must be available on the root object
        if( typeof root.ash === 'undefined') {
            root.ash = {};
        }
        root.ash.componentmatchingfamily = factory( root.ash.family, root.ash.nodepool, root.ash.nodelist, root.brejep.dictionary );
    }
}( this, function( Family, NodePool, NodeList, Dictionary) {
    function ComponentMatchingFamily( nodeClass, engine ) {    
        Object.extend( ComponentMatchingFamily.prototype, Family.prototype );
        this.nodeClass = nodeClass;
        this.engine = engine;
        this.initialise(); 
    }
    
    var api = ComponentMatchingFamily.prototype;
    api.nodeClass = null;
    api.engine = null;
    api.nodes = null;
    api.entities = null;
    api.components = null;
    api.nodePool = null;
    api.__defineGetter__("nodeList", function() {
        return this.nodes;
    });
    api.initialise = function() {
        var nodeClass = this.nodeClass;
        
        var nodePool = this.nodePool = new NodePool( nodeClass );
        this.nodes = new NodeList();
        this.entities = new Dictionary();
        this.components = new Dictionary();
        
        nodePool.dispose( nodePool.get() );
        
        var nodeClassPrototype = nodeClass.prototype;
        
        for( var property in nodeClassPrototype ) {
            ///TODO - tidy this up...
            if( nodeClassPrototype.hasOwnProperty( property ) 
                && property != "types" 
                && property != "next" 
                && property != "previous" 
                && property != "entity" ) {
                var componentObject = nodeClassPrototype["types"][property];
                this.components.add( componentObject, property );
            }
        }
        
        return this;
    };
    api.newEntity = function( entity ) {
        this.addIfMatch( entity );
    };
    api.componentAddedToEntity = function( entity, componentClass ) {
        this.addIfMatch( entity );
    };
    api.componentRemovedFromEntity = function( entity, componentClass ) {
        if( this.components.has( componentClass ) ) {
            this.removeIfMatch( entity );
        }
    };
    api.removeEntity = function( entity ) {
        this.removeIfMatch( entity );
    };
    api.cleanUp = function() {
        for( var node = this.nodes.head; node; node = node.next ) {
            delete this.entities.retrieve( node.entity );
        }
        this.nodes.removeAll();
    };
    api.addIfMatch = function( entity ) {
        if( !this.entities.has( entity ) )
        {
            var componentClass;
            if(
                !this.components.forEach( function( componentClass, componentName ) {
                    if( !entity.has( componentClass ) ) {
                        return "return";
                    }
                } )
            ) { return; }
            var node = this.nodePool.get();
            node.entity = entity;
            this.components.forEach( function( componentClass, componentName ) {
                node[componentName] = entity.get( componentClass );
            } );
            this.entities.add(entity, node);
            entity.componentRemoved.add( this.componentRemovedFromEntity, this );
            this.nodes.add( node );
        }
    };
    api.removeIfMatch = function( entity ) {
        var entities = this.entities,    
            nodes = this.nodes,
            engine = this.engine,
            nodePool = this.nodePool;
            
        if( entities.has( entity ) )
        {
            var node = entities.retrieve( entity );
            entity.componentRemoved.remove( this.componentRemovedFromEntity, this );
            entities.remove( entity );
            nodes.remove( node );
            if( engine.updating )
            {
                nodePool.cache( node );
                engine.updateComplete.add( this.releaseNodePoolCache, this );
            }
            else
            {
                nodePool.dispose( node );
            }
        }
    };
    api.releaseNodePoolCache = function() {
        this.engine.updateComplete.remove( this.releaseNodePoolCache );
        this.nodePool.releaseCache();
    };

    return ComponentMatchingFamily
}));
/**
 * Ash-js System
 */
(function( root, factory ) {
    // We want the object to work with or without AMD
    if( typeof define === 'function' && define.amd ) {
        define('ash/system', factory );
    } else {
        // If not using AMD, references to dependencies must be available on the root object
        if( typeof root.ash === 'undefined') {
            root.ash = {};
        }
        root.ash.system = factory();
    }
} ( this, function() {
    "use strict";
    function System() {}
    System.prototype.previous = null; /* System */
    System.prototype.next = null; /* System */
    System.prototype.priority = 0;
    System.prototype.initialise = function() {
        return this;
    };
    System.prototype.addToEngine = function( engine ) {
        /* Left deliberately blank */
    };
    System.prototype.removeFromEngine = function( engine ) {
        /* Left deliberately blank */
    };
    System.prototype.update = function( time ) {
        /* Left deliberately blank */
    };
    System.prototype.is = function( type ) {
        return type.prototype.isPrototypeOf( this );
    };
    return System;
}));
/**
 * Ash-js System List
 */
(function( root, factory ) {
    // We want the object to work with or without AMD
    if( typeof define === 'function' && define.amd ) {
        define('ash/systemlist', factory );
    } else {
        // If not using AMD, references to dependencies must be available on the root object
        if( typeof root.ash === 'undefined') {
            root.ash = {};
        }
        root.ash.systemlist = factory();
    }
} ( this, function() {
    function SystemList() {}
    var api = SystemList.prototype;
    api.head = null; /* System */
    api.tail = null; /* System */
    api.add = function( system ) {
        if( !this.head ) {
            this.head = this.tail = system;
            system.next = system.previous = null;
        } else {
            for( var node = this.tail; node; node = node.previous ) {
                if( node.priority <= system.priority ) {
                    break;
                }
            }
            if( node == this.tail ) {
                this.tail.next = system;
                system.previous = this.tail;
                system.next = null;
                this.tail = system;
            } else if( !node ) {
                system.next = this.head;
                system.previous = null;
                this.head.previous = system;
                this.head = system;
            } else {
                system.next = node.next;
                system.previous = node;
                node.next.previous = system;
                node.next = system;
            }
        }
    };
    api.remove = function( system ) {
        if ( this.head == system ) {
            this.head = this.head.next;
        }
        if ( this.tail == system ) {
            this.tail = this.tail.previous;
        }
        if ( system.previous ) {
            system.previous.next = system.next;
        }
        if ( system.next ) {
            system.next.previous = system.previous;
        }
    };
    api.removeAll = function() {
        while( this.head )
        {
            var system = this.head;
            this.head = this.head.next;
            system.previous = null;
            system.next = null;
        }
        this.tail = null;
    };
    api.get = function( type ) {
        for( var system = this.head; system; system = system.next ) {
            if ( system.is( type ) ) {
                return system;
            }
        }
        return null;
    };
    return SystemList;
}));
/**
 * Ash-js engine
 */
(function( root, factory ) {
    // We want the object to work with or without AMD
    if( typeof define === 'function' && define.amd ) {
        define(
            'ash/engine',
            [ "ash/componentmatchingfamily", "ash/entitylist", "ash/systemlist", "libs/signals", "brejep/dictionary" ],
            factory
        );
    } else {
        // If not using AMD, references to dependencies must be available on the root object
        if( typeof root.ash === 'undefined') {
            root.ash = {};
        }
        root.ash.engine = factory( root.ash.componentmatchingfamily, root.ash.entitylist, root.ash.systemlist, root.signals, root.brejep.dictionary );
    }
}( this, function( ComponentMatchingFamily, EntityList, SystemList, signals, Dictionary ) {
    "use strict";
    function Engine() {
        this.initialise();
    }
    
    var api = Engine.prototype;
    api.initialise = function() {
        this.entityList = new EntityList(),
        this.systemList = new SystemList();
        this.families = new Dictionary();
        
        this.__defineGetter__("entities", function() {
            var tmpEntities = [];
            for( var entity = this.entityList.head; entity; entity = entity.next )
            {
                tmpEntities.push( entity );
            }
            return tmpEntities;
        });
        
        this.__defineGetter__("systems", function() {
            var tmpSystems = [];
            for( var system = this.systemList.head; system; system = system.next )
            {
                tmpSystems.push( system );
            }
            return tmpSystems;
        });
        
        return this;
    };
    api.familyClass = ComponentMatchingFamily;
    api.families = null;
    api.entityList = null;
    api.systemList = null;
    api.updating = false;
    api.updateComplete = new signals.Signal();
    api.addEntity = function( entity ) {
        this.entityList.add( entity );
        entity.componentAdded.add( this.componentAdded, this );
        this.families.forEach( function( nodeObject, family ) {
            family.newEntity( entity );
        } );
    };
    api.removeEntity = function( entity ) {
        entity.componentAdded.remove( this.componentAdded, this );
        this.families.forEach( function( nodeObject, family ) {
            family.removeEntity( entity );
        });
        this.entityList.remove( entity );
    };
    api.removeAllEntities = function() {
        while( this.entityList.head ) {
            this.removeEntity( this.entityList.head );
        }
    };
    api.componentAdded = function( entity, componentClass ) {
        this.families.forEach( function( nodeObject, family ) {
            family.componentAddedToEntity( entity, componentClass );
        });
    };
    api.getNodeList = function( nodeObject ) {
        if( this.families.has( nodeObject ) ) {
            return this.families.retrieve( nodeObject ).nodes;
        }
        var family = new this.familyClass( nodeObject, this );
        this.families.add( nodeObject, family );
        for( var entity = this.entityList.head; entity; entity = entity.next ) {
            family.newEntity( entity );
        }
        return family.nodes;
    };
    api.releaseNodeList = function( nodeObject ) {
        if( this.families.has( nodeObject ) ) {
            this.families.retrieve( nodeObject ).cleanUp();
        }
        this.families.remove( nodeObject );
    };
    api.addSystem = function( system, priority ) {
        system.priority = priority;
        system.addToEngine( this );
        this.systemList.add( system );
    };
    api.getSystem = function( type ) {
        return this.systemList.get( type );
    };
    api.removeSystem = function( system ) {
        this.systemList.remove( system );
        system.removeFromEngine( this );
    };
    api.removeAllSystems = function() {
        while( this.systemList.head ) {
           this.removeSystem( this.systemList.head );
        }
    };
    api.update = function( time ) {
        this.updating = true;
        for( var system = this.systemList.head; system; system = system.next ) {
            system.update( time );
        }
        this.updating = false;
        this.updateComplete.dispatch();
    };
    
    return Engine;
}));