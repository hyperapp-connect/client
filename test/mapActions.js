const { mapActions } = require("../dist/index.js")

const local = {
  local: () => () => {},
  counter: {
    up: () => () => {}
  }
}

const remote = {
  counter: {
    up2: () => () => {}
  }
}

const fns = [
  { fn: () => mapActions({}, {}), expect: e => typeof e === "object" },
  { fn: () => mapActions(local, remote), expect: e => typeof e === "object" },
  { fn: () => mapActions(local, remote), expect: e => typeof e.local === "function" },
  { fn: () => mapActions(local, remote), expect: e => typeof e.counter.up2 === "function" },
  { fn: () => mapActions(local, remote), expect: e => typeof e.counter.up2_done === "function" },
  { fn: () => mapActions(local, remote), expect: e => typeof e.counter.up === "function" },
  { fn: () => mapActions(local, remote), expect: e => typeof e.counter.up_done === "undefined" }
]

module.exports = fns
