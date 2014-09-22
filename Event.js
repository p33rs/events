/**
 * @prop {string} name
 * @prop {array} namespace
 * @prop {function} callback
 * @prop {object} [context=null]
 * @prop {boolean} [once=false]
 * @param {Event.eventname} event
 * @param {function} callback
 * @param {object} [context=null]
 * @param {boolean} [once=false]
 * @constructor
 * @namespace
 */
function Event(event, callback, context, once) {

    if (typeof event !== 'string' || !event) {
        throw new RangeError('expected event name');
    }
    var parts = event.split('.');
    for (var i = 0; i < parts.length; i++) {
        if (!parts[i]) {
            throw new RangeError('empty event name or namespace');
        }
    }
    this.name = parts.shift();
    this.namespace = parts;

    if (typeof callback !== 'function') {
        throw new TypeError('callback should be callable');
    } else {
        this.callback = callback;
    }

    if (typeof context === 'undefined') {
        this.context = null;
    } else {
        this.context = context;
    }

    this.once = !!once;

}

/**
 * An identifier for an event.
 * If a '.' appears in this string, any text following it (including
 *   subsequent . characters) will be treated as a "namespace".
 *   If a non-namespaced event fires, all handlers (namespaced or not)
 *   will be called. However, if a namespaced event fires, only the
 *   applicable handlers will be called.
 * @typedef {string} Event.eventname
 */