'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

let ws = {};

const cache = [];
let open = false;
let apiVersion = "v0";

let error = (...msg) => console.error(...msg);

const isString = o => typeof o === "string";
const isFunction = o => typeof o === "function";

const stringify = msg => {
  try {
    if (isString(msg)) {
      msg = JSON.parse(msg);
    }

    msg[0] = `${apiVersion}.${msg[0]}`;

    return JSON.stringify(msg)
  } catch (e) {
    error(e);
  }
};

const parse = msg => {
  if (!isString(msg)) {
    return msg
  }

  try {
    return JSON.parse(msg)
  } catch (e) {
    return msg
  }
};

const reactions = actions => ({
  onmessage: e => {
    if (e.data === "Unknown Action") {
      error("Unknown Action", e);
      return
    }

    const [path, data] = parse(e.data);
    let action = actions;

    path.split(".").forEach(key => {
      const fnName = `${key}_done`;
      const sub = action[fnName];
      if (isFunction(sub)) {
        action = sub;
        return
      } else {
        action = actions[key];
      }
    });

    if (isFunction(action)) {
      return action(data)
    }
  },
  open: () => {
    open = true;

    while (cache.length) {
      const msg = cache.shift();
      send(msg);
    }
  },
  close: () => {
    open = false;
  }
});

const connect = (actions, options = {}) => {
  const host = options.host || location.hostname;
  const port = options.port || location.port;
  const protocol = options.protocol || "ws";

  apiVersion = options.apiVersion || "v0";
  error = options.error || error;

  ws = new WebSocket(`${protocol}://${host}:${port}`);

  open = false;

  const react = reactions(actions);

  ws.onopen = react.open;
  ws.onclose = react.close;
  ws.onmessage = react.onmessage;

  return ws
};

const send = msg => (open ? ws.send(stringify(msg)) : cache.push(msg));

const map = (actions = {}, remote = {}, parent = null) => {
  Object.keys(remote).forEach(name => {
    const action = remote[name];

    if (typeof action === "function") {
      actions[name + "_done"] = action;

      actions[name] = (state, actions) => data => {
        const key = parent ? `${parent}.${name}` : name;
        const msg = [key, data].filter(e => !!e);

        send(msg);
      };

      return
    }

    if (typeof action === "object") {
      const remoteActions = map({}, action, name);
      actions[name] = Object.assign({}, actions[name], remoteActions);
      return
    }
  });

  return actions
};

// default action for connected actions.
// will expect the response from the server to be a slice of the state.
// this slice will then be updated.
const rem = res => () => res;

const connect$1 = connect;
const mapActions = map;

exports.rem = rem;
exports.connect = connect$1;
exports.mapActions = mapActions;
//# sourceMappingURL=index.js.map
