(function () {
    'use strict';

    /**
     * PeriodicTask constructor
     *
     * Sample call: new PeriodicTask(500, myFunction, self, arg1, arg2…)
     *
     * @param {number|object} delay the minimum delay between two task executions - if an object is given, its valueOf() method must return a number (evaluated as milliseconds)
     * @param {Function} task the function to be executed periodically
     * @param {mixed} context the context to be bound to the task
     * @param {mixed} args… pass as many arguments as you want to give to the task
     *
     * @return {PeriodicTask} a task that can be executed periodically
     */
    function PeriodicTask() {
        if (arguments.length < 2) {
            throw new Error('PeriodicTask constructor expect at least two arguments');
        }
        var self = this;
        var args = Array.prototype.slice.call(arguments);
        var duration = args.shift();
        var fn = args.shift();
        var context = args.shift();

        this._task = function () {
            fn.apply(context, args);
        };
        this.duration = duration.valueOf();
        this._timer = null;
    }

    /**
     * Run the task immediately, and then schedule it to be executed periodically.
     */
    PeriodicTask.prototype.run = function () {
        this.runOnce();
        schedule(this);
    };

    /**
     * Run the task just once.
     *
     * Does not schedule it to be executed later.
     * If an execution was scheduled, it will be cancelled.
     */
    PeriodicTask.prototype.runOnce = function () {
        this.stop();
        this._task();
    };

    /**
     * Cancel the scheduled executions, if necessary.
     */
    PeriodicTask.prototype.stop = function () {
        if (this._timer !== null) {
            clearTimeout(this._timer);
            this._timer = null;
        }
    };

    /**
     * PRIVATE INTERNAL ROUTINE
     *
     * Schedule the task to be executed at the next occurence.
     *
     * @param  {PeriodicTask} task the task to be scheduled
     */
    function schedule(task) {
        task._timer = setTimeout(function () {
            task._task();
            schedule(task);
        }, task.duration);
    }

    // Exposing the module:
    var hasModule = (typeof module !== 'undefined' && module.exports && typeof require !== 'undefined');
    if (hasModule) {
        module.exports = PeriodicTask;
    } else {
        window.PeriodicTask = PeriodicTask;
    }
}());