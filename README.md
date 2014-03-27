periodic-task
=============

A JavaScript module that defines a PeriodicTask constructor, easing the way you use setTimeout to run periodic tasks.

# How to use it

### In the browser
Just include the `periodic-task.js` script in your HTML file to make the `PeriodicTask` contructor available.
```html
<script src="path/to/periodic-task.js"></script>
```

### In NodeJS
It is not bundled as an npm package yet, so just `require('./periodic-task')`:
```js
var PeriodicTask = require('./periodic-task');// You may have to adjust the path to the module
```

### Available functions

#### PeriodicTask(delay, fn, context, args…)
*The constructor of a periodic task.*
 * **delay** (number|object): the time in milliseconds between to periodic calls (you may also pass in a [momentjs Duration object](http://momentjs.com/docs/#/durations/)) ;
 * fn (Function): the task to be executed periodically ;
 * context (mixed) [optionnal]: the value to be bound as `this` to the task's function when running it ;
 * args (mixed) [optionnals]: any additional arguments passed will be passed to the task when running it.

#### PeriodicTask.run()
*Run the task immediately, and then schedule it to be executed periodically.*

#### PeriodicTask.runOnce()
*Run the task just once. Does not schedule it to be executed later. If an execution was scheduled, it will be cancelled.*

####PeriodicTask.stop()
*Cancel the scheduled executions, if necessary.*

# Sample usage
Try running the following code after including/requiring PeriodicTask:
```js
'use strict';

var levels = ['debug', 'notice', 'warning', 'error'];
var DEFAULT_LEVEL = levels[0];

function log(message, level) {
    if (!level) {
        level = DEFAULT_LEVEL;
    }
    if (levels.indexOf(level) === -1) {
        throw new Error('Invalid log level: `' + level + '`');
    }
    console.log('[' + level + '] ' + message);
}

function t() {
    return +new Date();
}
var t0;
var delay = 2000;
var log_count = 0;

var task = new PeriodicTask(delay, function () {
    log_count += 1;
    log('#' + log_count + ' ~' + ((t() - t0) / 1000) + 's');
});

console.log('The demo task is available:', task);
console.log('It will be started automatically.')
console.log('Try running `task.stop();` or `task.run();`');

t0 = t(); task.run();
```
