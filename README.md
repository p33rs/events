You can add event dispatchers to objects manually:

foo.events = new EventDispatcher();
foo.events.on('event', handler);

You can either make objects observable one-at-a-time, like so:

var x = Observable(new Foo());

Or you can do it within a constructor:

function Foo() {
  Observable(this);
}

If it's not working, be sure you're not doing this:

function Foo() {};
Observable(Foo);
