/**
 * @namespace
 */
function EventDispatcher() {
    this.events = {};
}

/**
 * @param {EventDispatcher.name} name
 * @param {EventDispatcher.handlerCallback} callback
 * @param {object} [context=null] context to excecute the handler in?
 * @param {boolean} [once=false] unsubscribe after the first trigger?
 * @throws TypeError
 */
EventDispatcher.prototype.on = function(name, callback, context, once) {

    var event = new Event(name, callback, context, once);
    if (!this.events.hasOwnProperty(event.name)) {
        this.events[event.name] = [event];
    } else {
        this.events[event.name].push(event);
    }
    return this;
};

/**
 * Courtesy method for one-shot binds.
 * @param {EventDispatcher.name} event
 * @param {EventDispatcher.handlerCallback} callback
 * @see EventDispatcher.on()
 */
EventDispatcher.prototype.once = function(event, callback, context) {
    return this.on(event, callback, context, true);
};

/**
 * @param var {string} name The name of the event being triggered.
 * @param {*} data Arbitrary data attached to this event.
 */
EventDispatcher.prototype.trigger = function(name, data) {
    if (typeof name !== 'string' || !name) {
        throw new RangeError('expected event name');
    }
    var parts = name.split('.');
    var name = parts[0];
    if (this.events[name]) {
        var deleteable = [];
        for (var i = 0; i < this.events[name]; i++) {
            var event = this.events[name][i];
            if (!this.isApplicable('name', event)) {
                continue;
            }
            event.callback.call(event.context, data);
            if (event.once) {
                deleteable.push(i);
            }
        }
        for (var i = deleteable.length; i > 0; i) {
            delete (this.events[name][--i]);
        }
    }
    return this;
};

/**
 * Does the given trigger apply to the given handler?
 * @param {string} trigger
 * @param {Event} handler
 */
EventDispatcher.prototype.isApplicable = function(trigger, handler) {
    var triggerNamespace = trigger.split('.');
    var trigger = triggerNamespace.shift();
    var handlerNamespace = handler.namespace;
    if (!this.events[trigger]) {
        return false;
    }
    if (!triggerNamespace.length) {
        return true;
    }
    for (var j = 0; j < handlerNamespace.length; j++) {
        if (handlerNamespace[j] !== triggerNamespace[j]) {
            return false;
        }
    }
    return true;
};

/**
 * Called to handle any notification event that occurs.
 * @callback EventDispatcher.handlerCallback
 * @param {*} data Arbitrary data attached to this event.
 * @param {string} event The name of this event
 */

