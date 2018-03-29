'use strict';

const run = require("@magic/test");

const { mapActions } = require("../dist/index.js");

const local = {
  local: () => () => {},
  counter: {
    up: () => () => {}
  }
};

const remote = {
  counter: {
    up2: () => () => {}
  }
};

const mapped = mapActions(local, remote);
console.log({ mapped });

const tests = {
  mapActions: [
    { fn: () => mapActions({}, {}), expect: e => typeof e === "object" },
    { fn: () => mapActions(local, remote), expect: e => typeof e === "object" },
    { fn: () => mapActions(local, remote), expect: e => typeof e.local === "function" },
    { fn: () => mapActions(local, remote), expect: e => typeof e.counter.up2 === "function" },
    { fn: () => mapActions(local, remote), expect: e => typeof e.counter.up2_done === "function" },
    { fn: () => mapActions(local, remote), expect: e => typeof e.counter.up === "function" },
    { fn: () => mapActions(local, remote), expect: e => typeof e.counter.up_done === "undefined" }
  ]
};

run(tests);
//# sourceMappingURL=test.js.map
