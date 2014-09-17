/**
 * @namespace
 */
function EventDispatcher() {
    this.events = {};
    this.onceEvents = {};
}

/**
 * @param {EventDispatcher.event} event 
 * @param {EventDispatcher.handlerCallback} callback
 * @param {boolean} [once=false] unsubscribe after the first trigger?
 * @todo add a "context" var. we'll proxy it for them.
 * @throws TypeError
 */
EventDispatcher.prototype.on = function(event, callback, once) {
    event = String(event);
    if (!event) {
        throw new TypeError('event should be a non-empty string');
    }
    if (typeof callback !== 'function') {
        throw new TypeError('callback should be callable');
    }
    // assign handler
    var queue = once ? this.onceListeners : this.listeners;
    if (!queue.hasOwnProperty(event)) {
        queue[event] = [];
    }
    queue[event].push(callback);
    return this;
};

/**
 * Courtesy method for one-shot binds.
 * @param {EventDispatcher.event} event 
 * @param {EventDispatcher.handlerCallback} callback
 * @see EventDispatcher.on()
 */
EventDispatcher.prototype.once = function(event, callback) {
    return this.on(event, callback, true);
};

/**
 * @param var {string} event The name of the event being triggered.
 * @param {*} data Arbitrary data attached to this event.
 */
EventDispatcher.prototype.trigger = function(event, data) {
    var queues = [];
    if (this.listeners[event]) {
        queues.push(this.listeners[event]);
    }
    if (this.onceListeners[event]) {
        queues.push(this.onceListeners[event]);
    }
    for (var i = 0; i < queues.length; i++) {
        var callbacks = queues[i];
        for (var j = 0; j < callbacks.length; j++) {
            callbacks[j].call(null, data, event);
        }
    }
    if (this.onceListeners[event]) {
        delete this.onceListeners[event];
    }
    return this;
};

/**
 * Called to handle any notification event that occurs.
 * @callback EventDispatcher.handlerCallback
 * @param {*} data Arbitrary data attached to this event.
 * @param {string} event The name of this event
 */

 /**
  * An identifier for an event.
  * If a '.' appears in this string, any text following it (including
  *   subsequent . characters) will be treated as a "namespace". 
  *   If a non-namespaced event fires, all handlers (namespaced or not)
  *   will be called. However, if a namespaced event fires, only the
  *   applicable handlers will be called.
  * @typedef {string} EventDispatcher.event
  */