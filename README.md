# Another JS Event Dispatcher

... just what the internet needs.

## Opting In

You can add event dispatchers to objects manually:
```
foo.events = new EventDispatcher();
foo.events.on('event', handler, foo);
```

The Observable method will add `.__events` to the object it's given, and bind
the on/once/trigger methods as a courtesy, so that you can ...
```
function Foo() {
  Observable(this);
  this.on('event', this.handler, this);
}
```

## Binding and Triggering Events

You can either use `.on` or `.once` to bind an event. On will fire in perpetuity; Once will fire only once.
As a convenience, you can pass a Context param, and we'll do the proxy-apply for you.
Event names may be namespaced, jQuery style: Triggering `'action'` will fire handlers for `'action'` as well as
`'action.namespace'`, while triggering `'action.namespace'` will fire handlers for `'action.namespace'` but not
`'action'`.