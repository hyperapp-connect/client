const { mapActions } = require("../dist/index.js")

const local = {
  local: () => () => {},
  counter: {
    up: () => () => {}
  },
  deep: {
    nested: {
      object: () => () => {}
    }
  }
}

const remote = {
  counter: {
    up2: () => () => {}
  },
  deep: {
    nested: {
      remoted: {
        object: () => () => {}
      }
    }
  }
}

module.exports = [
  { fn: () => mapActions({}, {}), expect: e => typeof e === "object" },
  { fn: () => mapActions(local, remote), expect: e => typeof e === "object" },
  {
    fn: () => mapActions(local, remote),
    expect: e => typeof e.deep.nested.object === "function"
  },
  {
    fn: () => mapActions(local, remote),
    expect: e => typeof e.deep.nested.remoted.object === "function"
  },
  {
    fn: () => mapActions(local, remote),
    expect: e => typeof e.local === "function"
  },
  {
    fn: () => mapActions(local, remote),
    expect: e => typeof e.counter.up2 === "function"
  },
  {
    fn: () => mapActions(local, remote),
    expect: e => typeof e.counter.up2_done === "function"
  },
  {
    fn: () => mapActions(local, remote),
    expect: e => typeof e.counter.up === "function"
  },
  {
    fn: () => mapActions(local, remote),
    expect: e => typeof e.counter.up_done === "undefined"
  }
]
