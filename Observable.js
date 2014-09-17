/**
 * Allow convenient access to an events handler.
 * @see EventDispatcher
 * @todo maybe assume context "target" but allow overrides
 */
function Observable(target) {

    var check = function(test) {
        if (!test.events || !(test.events instanceof EventDispatcher)) {
            throw Error('no event dispatcher');
        }
    };

    try {
        check(target);
    } catch (e) {
        if (typeof EventDispatcher !== 'function') {
            throw Error('no event dispatcher available');
        } else if (target.events) {
            throw Error('no room for event dispatcher')
        }
        target.events = new EventDispatcher();
    }

    target.on = function(event, callback, context) {
        check(target);
        this.events.on(event, callback, context);
        return target;
    };
    target.once = function(event, callback, context) {
        check(target);
        target.events.once(event, callback, context);
        return target;
    };
    target.trigger = function(event, data) {
        check(target);
        target.events.trigger(event, data);
        return target;
    };

    return target;

}