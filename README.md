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

See the [demo file](https://github.com/cGuille/periodic-task/blob/master/periodic-task-demo.html).
