function getDefaultExportFromCjs(x2) {
  return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
}
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
var react = { exports: {} };
var react_production_min = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var l$1 = Symbol.for("react.element"), n$1 = Symbol.for("react.portal"), p$2 = Symbol.for("react.fragment"), q$1 = Symbol.for("react.strict_mode"), r = Symbol.for("react.profiler"), t = Symbol.for("react.provider"), u = Symbol.for("react.context"), v$1 = Symbol.for("react.forward_ref"), w = Symbol.for("react.suspense"), x$1 = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), z$1 = Symbol.iterator;
function A$2(a) {
  if (null === a || "object" !== typeof a) return null;
  a = z$1 && a[z$1] || a["@@iterator"];
  return "function" === typeof a ? a : null;
}
var B$2 = { isMounted: function() {
  return false;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, C$1 = Object.assign, D$1 = {};
function E$1(a, b, e) {
  this.props = a;
  this.context = b;
  this.refs = D$1;
  this.updater = e || B$2;
}
E$1.prototype.isReactComponent = {};
E$1.prototype.setState = function(a, b) {
  if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, a, b, "setState");
};
E$1.prototype.forceUpdate = function(a) {
  this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};
function F() {
}
F.prototype = E$1.prototype;
function G$1(a, b, e) {
  this.props = a;
  this.context = b;
  this.refs = D$1;
  this.updater = e || B$2;
}
var H$1 = G$1.prototype = new F();
H$1.constructor = G$1;
C$1(H$1, E$1.prototype);
H$1.isPureReactComponent = true;
var I$1 = Array.isArray, J$1 = Object.prototype.hasOwnProperty, K$1 = { current: null }, L$1 = { key: true, ref: true, __self: true, __source: true };
function M$1(a, b, e) {
  var d, c = {}, k2 = null, h = null;
  if (null != b) for (d in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k2 = "" + b.key), b) J$1.call(b, d) && !L$1.hasOwnProperty(d) && (c[d] = b[d]);
  var g = arguments.length - 2;
  if (1 === g) c.children = e;
  else if (1 < g) {
    for (var f2 = Array(g), m2 = 0; m2 < g; m2++) f2[m2] = arguments[m2 + 2];
    c.children = f2;
  }
  if (a && a.defaultProps) for (d in g = a.defaultProps, g) void 0 === c[d] && (c[d] = g[d]);
  return { $$typeof: l$1, type: a, key: k2, ref: h, props: c, _owner: K$1.current };
}
function N$1(a, b) {
  return { $$typeof: l$1, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner };
}
function O$1(a) {
  return "object" === typeof a && null !== a && a.$$typeof === l$1;
}
function escape(a) {
  var b = { "=": "=0", ":": "=2" };
  return "$" + a.replace(/[=:]/g, function(a2) {
    return b[a2];
  });
}
var P$2 = /\/+/g;
function Q$1(a, b) {
  return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
}
function R$1(a, b, e, d, c) {
  var k2 = typeof a;
  if ("undefined" === k2 || "boolean" === k2) a = null;
  var h = false;
  if (null === a) h = true;
  else switch (k2) {
    case "string":
    case "number":
      h = true;
      break;
    case "object":
      switch (a.$$typeof) {
        case l$1:
        case n$1:
          h = true;
      }
  }
  if (h) return h = a, c = c(h), a = "" === d ? "." + Q$1(h, 0) : d, I$1(c) ? (e = "", null != a && (e = a.replace(P$2, "$&/") + "/"), R$1(c, b, e, "", function(a2) {
    return a2;
  })) : null != c && (O$1(c) && (c = N$1(c, e + (!c.key || h && h.key === c.key ? "" : ("" + c.key).replace(P$2, "$&/") + "/") + a)), b.push(c)), 1;
  h = 0;
  d = "" === d ? "." : d + ":";
  if (I$1(a)) for (var g = 0; g < a.length; g++) {
    k2 = a[g];
    var f2 = d + Q$1(k2, g);
    h += R$1(k2, b, e, f2, c);
  }
  else if (f2 = A$2(a), "function" === typeof f2) for (a = f2.call(a), g = 0; !(k2 = a.next()).done; ) k2 = k2.value, f2 = d + Q$1(k2, g++), h += R$1(k2, b, e, f2, c);
  else if ("object" === k2) throw b = String(a), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
  return h;
}
function S$1(a, b, e) {
  if (null == a) return a;
  var d = [], c = 0;
  R$1(a, d, "", "", function(a2) {
    return b.call(e, a2, c++);
  });
  return d;
}
function T$2(a) {
  if (-1 === a._status) {
    var b = a._result;
    b = b();
    b.then(function(b2) {
      if (0 === a._status || -1 === a._status) a._status = 1, a._result = b2;
    }, function(b2) {
      if (0 === a._status || -1 === a._status) a._status = 2, a._result = b2;
    });
    -1 === a._status && (a._status = 0, a._result = b);
  }
  if (1 === a._status) return a._result.default;
  throw a._result;
}
var U$2 = { current: null }, V$1 = { transition: null }, W$2 = { ReactCurrentDispatcher: U$2, ReactCurrentBatchConfig: V$1, ReactCurrentOwner: K$1 };
function X$2() {
  throw Error("act(...) is not supported in production builds of React.");
}
react_production_min.Children = { map: S$1, forEach: function(a, b, e) {
  S$1(a, function() {
    b.apply(this, arguments);
  }, e);
}, count: function(a) {
  var b = 0;
  S$1(a, function() {
    b++;
  });
  return b;
}, toArray: function(a) {
  return S$1(a, function(a2) {
    return a2;
  }) || [];
}, only: function(a) {
  if (!O$1(a)) throw Error("React.Children.only expected to receive a single React element child.");
  return a;
} };
react_production_min.Component = E$1;
react_production_min.Fragment = p$2;
react_production_min.Profiler = r;
react_production_min.PureComponent = G$1;
react_production_min.StrictMode = q$1;
react_production_min.Suspense = w;
react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W$2;
react_production_min.act = X$2;
react_production_min.cloneElement = function(a, b, e) {
  if (null === a || void 0 === a) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
  var d = C$1({}, a.props), c = a.key, k2 = a.ref, h = a._owner;
  if (null != b) {
    void 0 !== b.ref && (k2 = b.ref, h = K$1.current);
    void 0 !== b.key && (c = "" + b.key);
    if (a.type && a.type.defaultProps) var g = a.type.defaultProps;
    for (f2 in b) J$1.call(b, f2) && !L$1.hasOwnProperty(f2) && (d[f2] = void 0 === b[f2] && void 0 !== g ? g[f2] : b[f2]);
  }
  var f2 = arguments.length - 2;
  if (1 === f2) d.children = e;
  else if (1 < f2) {
    g = Array(f2);
    for (var m2 = 0; m2 < f2; m2++) g[m2] = arguments[m2 + 2];
    d.children = g;
  }
  return { $$typeof: l$1, type: a.type, key: c, ref: k2, props: d, _owner: h };
};
react_production_min.createContext = function(a) {
  a = { $$typeof: u, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
  a.Provider = { $$typeof: t, _context: a };
  return a.Consumer = a;
};
react_production_min.createElement = M$1;
react_production_min.createFactory = function(a) {
  var b = M$1.bind(null, a);
  b.type = a;
  return b;
};
react_production_min.createRef = function() {
  return { current: null };
};
react_production_min.forwardRef = function(a) {
  return { $$typeof: v$1, render: a };
};
react_production_min.isValidElement = O$1;
react_production_min.lazy = function(a) {
  return { $$typeof: y, _payload: { _status: -1, _result: a }, _init: T$2 };
};
react_production_min.memo = function(a, b) {
  return { $$typeof: x$1, type: a, compare: void 0 === b ? null : b };
};
react_production_min.startTransition = function(a) {
  var b = V$1.transition;
  V$1.transition = {};
  try {
    a();
  } finally {
    V$1.transition = b;
  }
};
react_production_min.unstable_act = X$2;
react_production_min.useCallback = function(a, b) {
  return U$2.current.useCallback(a, b);
};
react_production_min.useContext = function(a) {
  return U$2.current.useContext(a);
};
react_production_min.useDebugValue = function() {
};
react_production_min.useDeferredValue = function(a) {
  return U$2.current.useDeferredValue(a);
};
react_production_min.useEffect = function(a, b) {
  return U$2.current.useEffect(a, b);
};
react_production_min.useId = function() {
  return U$2.current.useId();
};
react_production_min.useImperativeHandle = function(a, b, e) {
  return U$2.current.useImperativeHandle(a, b, e);
};
react_production_min.useInsertionEffect = function(a, b) {
  return U$2.current.useInsertionEffect(a, b);
};
react_production_min.useLayoutEffect = function(a, b) {
  return U$2.current.useLayoutEffect(a, b);
};
react_production_min.useMemo = function(a, b) {
  return U$2.current.useMemo(a, b);
};
react_production_min.useReducer = function(a, b, e) {
  return U$2.current.useReducer(a, b, e);
};
react_production_min.useRef = function(a) {
  return U$2.current.useRef(a);
};
react_production_min.useState = function(a) {
  return U$2.current.useState(a);
};
react_production_min.useSyncExternalStore = function(a, b, e) {
  return U$2.current.useSyncExternalStore(a, b, e);
};
react_production_min.useTransition = function() {
  return U$2.current.useTransition();
};
react_production_min.version = "18.3.1";
{
  react.exports = react_production_min;
}
var reactExports = react.exports;
const React = /* @__PURE__ */ getDefaultExportFromCjs(reactExports);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f = reactExports, k$1 = Symbol.for("react.element"), l = Symbol.for("react.fragment"), m$1 = Object.prototype.hasOwnProperty, n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p$1 = { key: true, ref: true, __self: true, __source: true };
function q(c, a, g) {
  var b, d = {}, e = null, h = null;
  void 0 !== g && (e = "" + g);
  void 0 !== a.key && (e = "" + a.key);
  void 0 !== a.ref && (h = a.ref);
  for (b in a) m$1.call(a, b) && !p$1.hasOwnProperty(b) && (d[b] = a[b]);
  if (c && c.defaultProps) for (b in a = c.defaultProps, a) void 0 === d[b] && (d[b] = a[b]);
  return { $$typeof: k$1, type: c, key: e, ref: h, props: d, _owner: n.current };
}
reactJsxRuntime_production_min.Fragment = l;
reactJsxRuntime_production_min.jsx = q;
reactJsxRuntime_production_min.jsxs = q;
{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}
var jsxRuntimeExports = jsxRuntime.exports;
var client = {};
var reactDom = { exports: {} };
var reactDom_production_min = {};
var scheduler = { exports: {} };
var scheduler_production_min = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(exports) {
  function f2(a, b) {
    var c = a.length;
    a.push(b);
    a: for (; 0 < c; ) {
      var d = c - 1 >>> 1, e = a[d];
      if (0 < g(e, b)) a[d] = b, a[c] = e, c = d;
      else break a;
    }
  }
  function h(a) {
    return 0 === a.length ? null : a[0];
  }
  function k2(a) {
    if (0 === a.length) return null;
    var b = a[0], c = a.pop();
    if (c !== b) {
      a[0] = c;
      a: for (var d = 0, e = a.length, w2 = e >>> 1; d < w2; ) {
        var m2 = 2 * (d + 1) - 1, C2 = a[m2], n2 = m2 + 1, x2 = a[n2];
        if (0 > g(C2, c)) n2 < e && 0 > g(x2, C2) ? (a[d] = x2, a[n2] = c, d = n2) : (a[d] = C2, a[m2] = c, d = m2);
        else if (n2 < e && 0 > g(x2, c)) a[d] = x2, a[n2] = c, d = n2;
        else break a;
      }
    }
    return b;
  }
  function g(a, b) {
    var c = a.sortIndex - b.sortIndex;
    return 0 !== c ? c : a.id - b.id;
  }
  if ("object" === typeof performance && "function" === typeof performance.now) {
    var l2 = performance;
    exports.unstable_now = function() {
      return l2.now();
    };
  } else {
    var p2 = Date, q2 = p2.now();
    exports.unstable_now = function() {
      return p2.now() - q2;
    };
  }
  var r2 = [], t2 = [], u2 = 1, v2 = null, y2 = 3, z2 = false, A2 = false, B2 = false, D2 = "function" === typeof setTimeout ? setTimeout : null, E2 = "function" === typeof clearTimeout ? clearTimeout : null, F2 = "undefined" !== typeof setImmediate ? setImmediate : null;
  "undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function G2(a) {
    for (var b = h(t2); null !== b; ) {
      if (null === b.callback) k2(t2);
      else if (b.startTime <= a) k2(t2), b.sortIndex = b.expirationTime, f2(r2, b);
      else break;
      b = h(t2);
    }
  }
  function H2(a) {
    B2 = false;
    G2(a);
    if (!A2) if (null !== h(r2)) A2 = true, I2(J2);
    else {
      var b = h(t2);
      null !== b && K2(H2, b.startTime - a);
    }
  }
  function J2(a, b) {
    A2 = false;
    B2 && (B2 = false, E2(L2), L2 = -1);
    z2 = true;
    var c = y2;
    try {
      G2(b);
      for (v2 = h(r2); null !== v2 && (!(v2.expirationTime > b) || a && !M2()); ) {
        var d = v2.callback;
        if ("function" === typeof d) {
          v2.callback = null;
          y2 = v2.priorityLevel;
          var e = d(v2.expirationTime <= b);
          b = exports.unstable_now();
          "function" === typeof e ? v2.callback = e : v2 === h(r2) && k2(r2);
          G2(b);
        } else k2(r2);
        v2 = h(r2);
      }
      if (null !== v2) var w2 = true;
      else {
        var m2 = h(t2);
        null !== m2 && K2(H2, m2.startTime - b);
        w2 = false;
      }
      return w2;
    } finally {
      v2 = null, y2 = c, z2 = false;
    }
  }
  var N2 = false, O2 = null, L2 = -1, P2 = 5, Q2 = -1;
  function M2() {
    return exports.unstable_now() - Q2 < P2 ? false : true;
  }
  function R2() {
    if (null !== O2) {
      var a = exports.unstable_now();
      Q2 = a;
      var b = true;
      try {
        b = O2(true, a);
      } finally {
        b ? S2() : (N2 = false, O2 = null);
      }
    } else N2 = false;
  }
  var S2;
  if ("function" === typeof F2) S2 = function() {
    F2(R2);
  };
  else if ("undefined" !== typeof MessageChannel) {
    var T2 = new MessageChannel(), U2 = T2.port2;
    T2.port1.onmessage = R2;
    S2 = function() {
      U2.postMessage(null);
    };
  } else S2 = function() {
    D2(R2, 0);
  };
  function I2(a) {
    O2 = a;
    N2 || (N2 = true, S2());
  }
  function K2(a, b) {
    L2 = D2(function() {
      a(exports.unstable_now());
    }, b);
  }
  exports.unstable_IdlePriority = 5;
  exports.unstable_ImmediatePriority = 1;
  exports.unstable_LowPriority = 4;
  exports.unstable_NormalPriority = 3;
  exports.unstable_Profiling = null;
  exports.unstable_UserBlockingPriority = 2;
  exports.unstable_cancelCallback = function(a) {
    a.callback = null;
  };
  exports.unstable_continueExecution = function() {
    A2 || z2 || (A2 = true, I2(J2));
  };
  exports.unstable_forceFrameRate = function(a) {
    0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P2 = 0 < a ? Math.floor(1e3 / a) : 5;
  };
  exports.unstable_getCurrentPriorityLevel = function() {
    return y2;
  };
  exports.unstable_getFirstCallbackNode = function() {
    return h(r2);
  };
  exports.unstable_next = function(a) {
    switch (y2) {
      case 1:
      case 2:
      case 3:
        var b = 3;
        break;
      default:
        b = y2;
    }
    var c = y2;
    y2 = b;
    try {
      return a();
    } finally {
      y2 = c;
    }
  };
  exports.unstable_pauseExecution = function() {
  };
  exports.unstable_requestPaint = function() {
  };
  exports.unstable_runWithPriority = function(a, b) {
    switch (a) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        a = 3;
    }
    var c = y2;
    y2 = a;
    try {
      return b();
    } finally {
      y2 = c;
    }
  };
  exports.unstable_scheduleCallback = function(a, b, c) {
    var d = exports.unstable_now();
    "object" === typeof c && null !== c ? (c = c.delay, c = "number" === typeof c && 0 < c ? d + c : d) : c = d;
    switch (a) {
      case 1:
        var e = -1;
        break;
      case 2:
        e = 250;
        break;
      case 5:
        e = 1073741823;
        break;
      case 4:
        e = 1e4;
        break;
      default:
        e = 5e3;
    }
    e = c + e;
    a = { id: u2++, callback: b, priorityLevel: a, startTime: c, expirationTime: e, sortIndex: -1 };
    c > d ? (a.sortIndex = c, f2(t2, a), null === h(r2) && a === h(t2) && (B2 ? (E2(L2), L2 = -1) : B2 = true, K2(H2, c - d))) : (a.sortIndex = e, f2(r2, a), A2 || z2 || (A2 = true, I2(J2)));
    return a;
  };
  exports.unstable_shouldYield = M2;
  exports.unstable_wrapCallback = function(a) {
    var b = y2;
    return function() {
      var c = y2;
      y2 = b;
      try {
        return a.apply(this, arguments);
      } finally {
        y2 = c;
      }
    };
  };
})(scheduler_production_min);
{
  scheduler.exports = scheduler_production_min;
}
var schedulerExports = scheduler.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var aa = reactExports, ca = schedulerExports;
function p(a) {
  for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) b += "&args[]=" + encodeURIComponent(arguments[c]);
  return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var da = /* @__PURE__ */ new Set(), ea = {};
function fa(a, b) {
  ha(a, b);
  ha(a + "Capture", b);
}
function ha(a, b) {
  ea[a] = b;
  for (a = 0; a < b.length; a++) da.add(b[a]);
}
var ia = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement), ja = Object.prototype.hasOwnProperty, ka = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, la = {}, ma = {};
function oa(a) {
  if (ja.call(ma, a)) return true;
  if (ja.call(la, a)) return false;
  if (ka.test(a)) return ma[a] = true;
  la[a] = true;
  return false;
}
function pa(a, b, c, d) {
  if (null !== c && 0 === c.type) return false;
  switch (typeof b) {
    case "function":
    case "symbol":
      return true;
    case "boolean":
      if (d) return false;
      if (null !== c) return !c.acceptsBooleans;
      a = a.toLowerCase().slice(0, 5);
      return "data-" !== a && "aria-" !== a;
    default:
      return false;
  }
}
function qa(a, b, c, d) {
  if (null === b || "undefined" === typeof b || pa(a, b, c, d)) return true;
  if (d) return false;
  if (null !== c) switch (c.type) {
    case 3:
      return !b;
    case 4:
      return false === b;
    case 5:
      return isNaN(b);
    case 6:
      return isNaN(b) || 1 > b;
  }
  return false;
}
function v(a, b, c, d, e, f2, g) {
  this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
  this.attributeName = d;
  this.attributeNamespace = e;
  this.mustUseProperty = c;
  this.propertyName = a;
  this.type = b;
  this.sanitizeURL = f2;
  this.removeEmptyString = g;
}
var z = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
  z[a] = new v(a, 0, false, a, null, false, false);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a) {
  var b = a[0];
  z[b] = new v(b, 1, false, a[1], null, false, false);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a) {
  z[a] = new v(a, 2, false, a.toLowerCase(), null, false, false);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a) {
  z[a] = new v(a, 2, false, a, null, false, false);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
  z[a] = new v(a, 3, false, a.toLowerCase(), null, false, false);
});
["checked", "multiple", "muted", "selected"].forEach(function(a) {
  z[a] = new v(a, 3, true, a, null, false, false);
});
["capture", "download"].forEach(function(a) {
  z[a] = new v(a, 4, false, a, null, false, false);
});
["cols", "rows", "size", "span"].forEach(function(a) {
  z[a] = new v(a, 6, false, a, null, false, false);
});
["rowSpan", "start"].forEach(function(a) {
  z[a] = new v(a, 5, false, a.toLowerCase(), null, false, false);
});
var ra = /[\-:]([a-z])/g;
function sa(a) {
  return a[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
  var b = a.replace(
    ra,
    sa
  );
  z[b] = new v(b, 1, false, a, null, false, false);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
  var b = a.replace(ra, sa);
  z[b] = new v(b, 1, false, a, "http://www.w3.org/1999/xlink", false, false);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(a) {
  var b = a.replace(ra, sa);
  z[b] = new v(b, 1, false, a, "http://www.w3.org/XML/1998/namespace", false, false);
});
["tabIndex", "crossOrigin"].forEach(function(a) {
  z[a] = new v(a, 1, false, a.toLowerCase(), null, false, false);
});
z.xlinkHref = new v("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
["src", "href", "action", "formAction"].forEach(function(a) {
  z[a] = new v(a, 1, false, a.toLowerCase(), null, true, true);
});
function ta(a, b, c, d) {
  var e = z.hasOwnProperty(b) ? z[b] : null;
  if (null !== e ? 0 !== e.type : d || !(2 < b.length) || "o" !== b[0] && "O" !== b[0] || "n" !== b[1] && "N" !== b[1]) qa(b, c, e, d) && (c = null), d || null === e ? oa(b) && (null === c ? a.removeAttribute(b) : a.setAttribute(b, "" + c)) : e.mustUseProperty ? a[e.propertyName] = null === c ? 3 === e.type ? false : "" : c : (b = e.attributeName, d = e.attributeNamespace, null === c ? a.removeAttribute(b) : (e = e.type, c = 3 === e || 4 === e && true === c ? "" : "" + c, d ? a.setAttributeNS(d, b, c) : a.setAttribute(b, c)));
}
var ua = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, va = Symbol.for("react.element"), wa = Symbol.for("react.portal"), ya = Symbol.for("react.fragment"), za = Symbol.for("react.strict_mode"), Aa = Symbol.for("react.profiler"), Ba = Symbol.for("react.provider"), Ca = Symbol.for("react.context"), Da = Symbol.for("react.forward_ref"), Ea = Symbol.for("react.suspense"), Fa = Symbol.for("react.suspense_list"), Ga = Symbol.for("react.memo"), Ha = Symbol.for("react.lazy");
var Ia = Symbol.for("react.offscreen");
var Ja = Symbol.iterator;
function Ka(a) {
  if (null === a || "object" !== typeof a) return null;
  a = Ja && a[Ja] || a["@@iterator"];
  return "function" === typeof a ? a : null;
}
var A$1 = Object.assign, La;
function Ma(a) {
  if (void 0 === La) try {
    throw Error();
  } catch (c) {
    var b = c.stack.trim().match(/\n( *(at )?)/);
    La = b && b[1] || "";
  }
  return "\n" + La + a;
}
var Na = false;
function Oa(a, b) {
  if (!a || Na) return "";
  Na = true;
  var c = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (b) if (b = function() {
      throw Error();
    }, Object.defineProperty(b.prototype, "props", { set: function() {
      throw Error();
    } }), "object" === typeof Reflect && Reflect.construct) {
      try {
        Reflect.construct(b, []);
      } catch (l2) {
        var d = l2;
      }
      Reflect.construct(a, [], b);
    } else {
      try {
        b.call();
      } catch (l2) {
        d = l2;
      }
      a.call(b.prototype);
    }
    else {
      try {
        throw Error();
      } catch (l2) {
        d = l2;
      }
      a();
    }
  } catch (l2) {
    if (l2 && d && "string" === typeof l2.stack) {
      for (var e = l2.stack.split("\n"), f2 = d.stack.split("\n"), g = e.length - 1, h = f2.length - 1; 1 <= g && 0 <= h && e[g] !== f2[h]; ) h--;
      for (; 1 <= g && 0 <= h; g--, h--) if (e[g] !== f2[h]) {
        if (1 !== g || 1 !== h) {
          do
            if (g--, h--, 0 > h || e[g] !== f2[h]) {
              var k2 = "\n" + e[g].replace(" at new ", " at ");
              a.displayName && k2.includes("<anonymous>") && (k2 = k2.replace("<anonymous>", a.displayName));
              return k2;
            }
          while (1 <= g && 0 <= h);
        }
        break;
      }
    }
  } finally {
    Na = false, Error.prepareStackTrace = c;
  }
  return (a = a ? a.displayName || a.name : "") ? Ma(a) : "";
}
function Pa(a) {
  switch (a.tag) {
    case 5:
      return Ma(a.type);
    case 16:
      return Ma("Lazy");
    case 13:
      return Ma("Suspense");
    case 19:
      return Ma("SuspenseList");
    case 0:
    case 2:
    case 15:
      return a = Oa(a.type, false), a;
    case 11:
      return a = Oa(a.type.render, false), a;
    case 1:
      return a = Oa(a.type, true), a;
    default:
      return "";
  }
}
function Qa(a) {
  if (null == a) return null;
  if ("function" === typeof a) return a.displayName || a.name || null;
  if ("string" === typeof a) return a;
  switch (a) {
    case ya:
      return "Fragment";
    case wa:
      return "Portal";
    case Aa:
      return "Profiler";
    case za:
      return "StrictMode";
    case Ea:
      return "Suspense";
    case Fa:
      return "SuspenseList";
  }
  if ("object" === typeof a) switch (a.$$typeof) {
    case Ca:
      return (a.displayName || "Context") + ".Consumer";
    case Ba:
      return (a._context.displayName || "Context") + ".Provider";
    case Da:
      var b = a.render;
      a = a.displayName;
      a || (a = b.displayName || b.name || "", a = "" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
      return a;
    case Ga:
      return b = a.displayName || null, null !== b ? b : Qa(a.type) || "Memo";
    case Ha:
      b = a._payload;
      a = a._init;
      try {
        return Qa(a(b));
      } catch (c) {
      }
  }
  return null;
}
function Ra(a) {
  var b = a.type;
  switch (a.tag) {
    case 24:
      return "Cache";
    case 9:
      return (b.displayName || "Context") + ".Consumer";
    case 10:
      return (b._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return a = b.render, a = a.displayName || a.name || "", b.displayName || ("" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return b;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Qa(b);
    case 8:
      return b === za ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if ("function" === typeof b) return b.displayName || b.name || null;
      if ("string" === typeof b) return b;
  }
  return null;
}
function Sa(a) {
  switch (typeof a) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return a;
    case "object":
      return a;
    default:
      return "";
  }
}
function Ta(a) {
  var b = a.type;
  return (a = a.nodeName) && "input" === a.toLowerCase() && ("checkbox" === b || "radio" === b);
}
function Ua(a) {
  var b = Ta(a) ? "checked" : "value", c = Object.getOwnPropertyDescriptor(a.constructor.prototype, b), d = "" + a[b];
  if (!a.hasOwnProperty(b) && "undefined" !== typeof c && "function" === typeof c.get && "function" === typeof c.set) {
    var e = c.get, f2 = c.set;
    Object.defineProperty(a, b, { configurable: true, get: function() {
      return e.call(this);
    }, set: function(a2) {
      d = "" + a2;
      f2.call(this, a2);
    } });
    Object.defineProperty(a, b, { enumerable: c.enumerable });
    return { getValue: function() {
      return d;
    }, setValue: function(a2) {
      d = "" + a2;
    }, stopTracking: function() {
      a._valueTracker = null;
      delete a[b];
    } };
  }
}
function Va(a) {
  a._valueTracker || (a._valueTracker = Ua(a));
}
function Wa(a) {
  if (!a) return false;
  var b = a._valueTracker;
  if (!b) return true;
  var c = b.getValue();
  var d = "";
  a && (d = Ta(a) ? a.checked ? "true" : "false" : a.value);
  a = d;
  return a !== c ? (b.setValue(a), true) : false;
}
function Xa(a) {
  a = a || ("undefined" !== typeof document ? document : void 0);
  if ("undefined" === typeof a) return null;
  try {
    return a.activeElement || a.body;
  } catch (b) {
    return a.body;
  }
}
function Ya(a, b) {
  var c = b.checked;
  return A$1({}, b, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: null != c ? c : a._wrapperState.initialChecked });
}
function Za(a, b) {
  var c = null == b.defaultValue ? "" : b.defaultValue, d = null != b.checked ? b.checked : b.defaultChecked;
  c = Sa(null != b.value ? b.value : c);
  a._wrapperState = { initialChecked: d, initialValue: c, controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value };
}
function ab(a, b) {
  b = b.checked;
  null != b && ta(a, "checked", b, false);
}
function bb(a, b) {
  ab(a, b);
  var c = Sa(b.value), d = b.type;
  if (null != c) if ("number" === d) {
    if (0 === c && "" === a.value || a.value != c) a.value = "" + c;
  } else a.value !== "" + c && (a.value = "" + c);
  else if ("submit" === d || "reset" === d) {
    a.removeAttribute("value");
    return;
  }
  b.hasOwnProperty("value") ? cb(a, b.type, c) : b.hasOwnProperty("defaultValue") && cb(a, b.type, Sa(b.defaultValue));
  null == b.checked && null != b.defaultChecked && (a.defaultChecked = !!b.defaultChecked);
}
function db(a, b, c) {
  if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
    var d = b.type;
    if (!("submit" !== d && "reset" !== d || void 0 !== b.value && null !== b.value)) return;
    b = "" + a._wrapperState.initialValue;
    c || b === a.value || (a.value = b);
    a.defaultValue = b;
  }
  c = a.name;
  "" !== c && (a.name = "");
  a.defaultChecked = !!a._wrapperState.initialChecked;
  "" !== c && (a.name = c);
}
function cb(a, b, c) {
  if ("number" !== b || Xa(a.ownerDocument) !== a) null == c ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c && (a.defaultValue = "" + c);
}
var eb = Array.isArray;
function fb(a, b, c, d) {
  a = a.options;
  if (b) {
    b = {};
    for (var e = 0; e < c.length; e++) b["$" + c[e]] = true;
    for (c = 0; c < a.length; c++) e = b.hasOwnProperty("$" + a[c].value), a[c].selected !== e && (a[c].selected = e), e && d && (a[c].defaultSelected = true);
  } else {
    c = "" + Sa(c);
    b = null;
    for (e = 0; e < a.length; e++) {
      if (a[e].value === c) {
        a[e].selected = true;
        d && (a[e].defaultSelected = true);
        return;
      }
      null !== b || a[e].disabled || (b = a[e]);
    }
    null !== b && (b.selected = true);
  }
}
function gb(a, b) {
  if (null != b.dangerouslySetInnerHTML) throw Error(p(91));
  return A$1({}, b, { value: void 0, defaultValue: void 0, children: "" + a._wrapperState.initialValue });
}
function hb(a, b) {
  var c = b.value;
  if (null == c) {
    c = b.children;
    b = b.defaultValue;
    if (null != c) {
      if (null != b) throw Error(p(92));
      if (eb(c)) {
        if (1 < c.length) throw Error(p(93));
        c = c[0];
      }
      b = c;
    }
    null == b && (b = "");
    c = b;
  }
  a._wrapperState = { initialValue: Sa(c) };
}
function ib(a, b) {
  var c = Sa(b.value), d = Sa(b.defaultValue);
  null != c && (c = "" + c, c !== a.value && (a.value = c), null == b.defaultValue && a.defaultValue !== c && (a.defaultValue = c));
  null != d && (a.defaultValue = "" + d);
}
function jb(a) {
  var b = a.textContent;
  b === a._wrapperState.initialValue && "" !== b && null !== b && (a.value = b);
}
function kb(a) {
  switch (a) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function lb(a, b) {
  return null == a || "http://www.w3.org/1999/xhtml" === a ? kb(b) : "http://www.w3.org/2000/svg" === a && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a;
}
var mb, nb = function(a) {
  return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(b, c, d, e) {
    MSApp.execUnsafeLocalFunction(function() {
      return a(b, c, d, e);
    });
  } : a;
}(function(a, b) {
  if ("http://www.w3.org/2000/svg" !== a.namespaceURI || "innerHTML" in a) a.innerHTML = b;
  else {
    mb = mb || document.createElement("div");
    mb.innerHTML = "<svg>" + b.valueOf().toString() + "</svg>";
    for (b = mb.firstChild; a.firstChild; ) a.removeChild(a.firstChild);
    for (; b.firstChild; ) a.appendChild(b.firstChild);
  }
});
function ob(a, b) {
  if (b) {
    var c = a.firstChild;
    if (c && c === a.lastChild && 3 === c.nodeType) {
      c.nodeValue = b;
      return;
    }
  }
  a.textContent = b;
}
var pb = {
  animationIterationCount: true,
  aspectRatio: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridArea: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
}, qb = ["Webkit", "ms", "Moz", "O"];
Object.keys(pb).forEach(function(a) {
  qb.forEach(function(b) {
    b = b + a.charAt(0).toUpperCase() + a.substring(1);
    pb[b] = pb[a];
  });
});
function rb(a, b, c) {
  return null == b || "boolean" === typeof b || "" === b ? "" : c || "number" !== typeof b || 0 === b || pb.hasOwnProperty(a) && pb[a] ? ("" + b).trim() : b + "px";
}
function sb(a, b) {
  a = a.style;
  for (var c in b) if (b.hasOwnProperty(c)) {
    var d = 0 === c.indexOf("--"), e = rb(c, b[c], d);
    "float" === c && (c = "cssFloat");
    d ? a.setProperty(c, e) : a[c] = e;
  }
}
var tb = A$1({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
function ub(a, b) {
  if (b) {
    if (tb[a] && (null != b.children || null != b.dangerouslySetInnerHTML)) throw Error(p(137, a));
    if (null != b.dangerouslySetInnerHTML) {
      if (null != b.children) throw Error(p(60));
      if ("object" !== typeof b.dangerouslySetInnerHTML || !("__html" in b.dangerouslySetInnerHTML)) throw Error(p(61));
    }
    if (null != b.style && "object" !== typeof b.style) throw Error(p(62));
  }
}
function vb(a, b) {
  if (-1 === a.indexOf("-")) return "string" === typeof b.is;
  switch (a) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return false;
    default:
      return true;
  }
}
var wb = null;
function xb(a) {
  a = a.target || a.srcElement || window;
  a.correspondingUseElement && (a = a.correspondingUseElement);
  return 3 === a.nodeType ? a.parentNode : a;
}
var yb = null, zb = null, Ab = null;
function Bb(a) {
  if (a = Cb(a)) {
    if ("function" !== typeof yb) throw Error(p(280));
    var b = a.stateNode;
    b && (b = Db(b), yb(a.stateNode, a.type, b));
  }
}
function Eb(a) {
  zb ? Ab ? Ab.push(a) : Ab = [a] : zb = a;
}
function Fb() {
  if (zb) {
    var a = zb, b = Ab;
    Ab = zb = null;
    Bb(a);
    if (b) for (a = 0; a < b.length; a++) Bb(b[a]);
  }
}
function Gb(a, b) {
  return a(b);
}
function Hb() {
}
var Ib = false;
function Jb(a, b, c) {
  if (Ib) return a(b, c);
  Ib = true;
  try {
    return Gb(a, b, c);
  } finally {
    if (Ib = false, null !== zb || null !== Ab) Hb(), Fb();
  }
}
function Kb(a, b) {
  var c = a.stateNode;
  if (null === c) return null;
  var d = Db(c);
  if (null === d) return null;
  c = d[b];
  a: switch (b) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (d = !d.disabled) || (a = a.type, d = !("button" === a || "input" === a || "select" === a || "textarea" === a));
      a = !d;
      break a;
    default:
      a = false;
  }
  if (a) return null;
  if (c && "function" !== typeof c) throw Error(p(231, b, typeof c));
  return c;
}
var Lb = false;
if (ia) try {
  var Mb = {};
  Object.defineProperty(Mb, "passive", { get: function() {
    Lb = true;
  } });
  window.addEventListener("test", Mb, Mb);
  window.removeEventListener("test", Mb, Mb);
} catch (a) {
  Lb = false;
}
function Nb(a, b, c, d, e, f2, g, h, k2) {
  var l2 = Array.prototype.slice.call(arguments, 3);
  try {
    b.apply(c, l2);
  } catch (m2) {
    this.onError(m2);
  }
}
var Ob = false, Pb = null, Qb = false, Rb = null, Sb = { onError: function(a) {
  Ob = true;
  Pb = a;
} };
function Tb(a, b, c, d, e, f2, g, h, k2) {
  Ob = false;
  Pb = null;
  Nb.apply(Sb, arguments);
}
function Ub(a, b, c, d, e, f2, g, h, k2) {
  Tb.apply(this, arguments);
  if (Ob) {
    if (Ob) {
      var l2 = Pb;
      Ob = false;
      Pb = null;
    } else throw Error(p(198));
    Qb || (Qb = true, Rb = l2);
  }
}
function Vb(a) {
  var b = a, c = a;
  if (a.alternate) for (; b.return; ) b = b.return;
  else {
    a = b;
    do
      b = a, 0 !== (b.flags & 4098) && (c = b.return), a = b.return;
    while (a);
  }
  return 3 === b.tag ? c : null;
}
function Wb(a) {
  if (13 === a.tag) {
    var b = a.memoizedState;
    null === b && (a = a.alternate, null !== a && (b = a.memoizedState));
    if (null !== b) return b.dehydrated;
  }
  return null;
}
function Xb(a) {
  if (Vb(a) !== a) throw Error(p(188));
}
function Yb(a) {
  var b = a.alternate;
  if (!b) {
    b = Vb(a);
    if (null === b) throw Error(p(188));
    return b !== a ? null : a;
  }
  for (var c = a, d = b; ; ) {
    var e = c.return;
    if (null === e) break;
    var f2 = e.alternate;
    if (null === f2) {
      d = e.return;
      if (null !== d) {
        c = d;
        continue;
      }
      break;
    }
    if (e.child === f2.child) {
      for (f2 = e.child; f2; ) {
        if (f2 === c) return Xb(e), a;
        if (f2 === d) return Xb(e), b;
        f2 = f2.sibling;
      }
      throw Error(p(188));
    }
    if (c.return !== d.return) c = e, d = f2;
    else {
      for (var g = false, h = e.child; h; ) {
        if (h === c) {
          g = true;
          c = e;
          d = f2;
          break;
        }
        if (h === d) {
          g = true;
          d = e;
          c = f2;
          break;
        }
        h = h.sibling;
      }
      if (!g) {
        for (h = f2.child; h; ) {
          if (h === c) {
            g = true;
            c = f2;
            d = e;
            break;
          }
          if (h === d) {
            g = true;
            d = f2;
            c = e;
            break;
          }
          h = h.sibling;
        }
        if (!g) throw Error(p(189));
      }
    }
    if (c.alternate !== d) throw Error(p(190));
  }
  if (3 !== c.tag) throw Error(p(188));
  return c.stateNode.current === c ? a : b;
}
function Zb(a) {
  a = Yb(a);
  return null !== a ? $b(a) : null;
}
function $b(a) {
  if (5 === a.tag || 6 === a.tag) return a;
  for (a = a.child; null !== a; ) {
    var b = $b(a);
    if (null !== b) return b;
    a = a.sibling;
  }
  return null;
}
var ac = ca.unstable_scheduleCallback, bc = ca.unstable_cancelCallback, cc = ca.unstable_shouldYield, dc = ca.unstable_requestPaint, B$1 = ca.unstable_now, ec = ca.unstable_getCurrentPriorityLevel, fc = ca.unstable_ImmediatePriority, gc = ca.unstable_UserBlockingPriority, hc = ca.unstable_NormalPriority, ic = ca.unstable_LowPriority, jc = ca.unstable_IdlePriority, kc = null, lc = null;
function mc(a) {
  if (lc && "function" === typeof lc.onCommitFiberRoot) try {
    lc.onCommitFiberRoot(kc, a, void 0, 128 === (a.current.flags & 128));
  } catch (b) {
  }
}
var oc = Math.clz32 ? Math.clz32 : nc, pc = Math.log, qc = Math.LN2;
function nc(a) {
  a >>>= 0;
  return 0 === a ? 32 : 31 - (pc(a) / qc | 0) | 0;
}
var rc = 64, sc = 4194304;
function tc(a) {
  switch (a & -a) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return a & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return a & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return a;
  }
}
function uc(a, b) {
  var c = a.pendingLanes;
  if (0 === c) return 0;
  var d = 0, e = a.suspendedLanes, f2 = a.pingedLanes, g = c & 268435455;
  if (0 !== g) {
    var h = g & ~e;
    0 !== h ? d = tc(h) : (f2 &= g, 0 !== f2 && (d = tc(f2)));
  } else g = c & ~e, 0 !== g ? d = tc(g) : 0 !== f2 && (d = tc(f2));
  if (0 === d) return 0;
  if (0 !== b && b !== d && 0 === (b & e) && (e = d & -d, f2 = b & -b, e >= f2 || 16 === e && 0 !== (f2 & 4194240))) return b;
  0 !== (d & 4) && (d |= c & 16);
  b = a.entangledLanes;
  if (0 !== b) for (a = a.entanglements, b &= d; 0 < b; ) c = 31 - oc(b), e = 1 << c, d |= a[c], b &= ~e;
  return d;
}
function vc(a, b) {
  switch (a) {
    case 1:
    case 2:
    case 4:
      return b + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return b + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function wc(a, b) {
  for (var c = a.suspendedLanes, d = a.pingedLanes, e = a.expirationTimes, f2 = a.pendingLanes; 0 < f2; ) {
    var g = 31 - oc(f2), h = 1 << g, k2 = e[g];
    if (-1 === k2) {
      if (0 === (h & c) || 0 !== (h & d)) e[g] = vc(h, b);
    } else k2 <= b && (a.expiredLanes |= h);
    f2 &= ~h;
  }
}
function xc(a) {
  a = a.pendingLanes & -1073741825;
  return 0 !== a ? a : a & 1073741824 ? 1073741824 : 0;
}
function yc() {
  var a = rc;
  rc <<= 1;
  0 === (rc & 4194240) && (rc = 64);
  return a;
}
function zc(a) {
  for (var b = [], c = 0; 31 > c; c++) b.push(a);
  return b;
}
function Ac(a, b, c) {
  a.pendingLanes |= b;
  536870912 !== b && (a.suspendedLanes = 0, a.pingedLanes = 0);
  a = a.eventTimes;
  b = 31 - oc(b);
  a[b] = c;
}
function Bc(a, b) {
  var c = a.pendingLanes & ~b;
  a.pendingLanes = b;
  a.suspendedLanes = 0;
  a.pingedLanes = 0;
  a.expiredLanes &= b;
  a.mutableReadLanes &= b;
  a.entangledLanes &= b;
  b = a.entanglements;
  var d = a.eventTimes;
  for (a = a.expirationTimes; 0 < c; ) {
    var e = 31 - oc(c), f2 = 1 << e;
    b[e] = 0;
    d[e] = -1;
    a[e] = -1;
    c &= ~f2;
  }
}
function Cc(a, b) {
  var c = a.entangledLanes |= b;
  for (a = a.entanglements; c; ) {
    var d = 31 - oc(c), e = 1 << d;
    e & b | a[d] & b && (a[d] |= b);
    c &= ~e;
  }
}
var C = 0;
function Dc(a) {
  a &= -a;
  return 1 < a ? 4 < a ? 0 !== (a & 268435455) ? 16 : 536870912 : 4 : 1;
}
var Ec, Fc, Gc, Hc, Ic, Jc = false, Kc = [], Lc = null, Mc = null, Nc = null, Oc = /* @__PURE__ */ new Map(), Pc = /* @__PURE__ */ new Map(), Qc = [], Rc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Sc(a, b) {
  switch (a) {
    case "focusin":
    case "focusout":
      Lc = null;
      break;
    case "dragenter":
    case "dragleave":
      Mc = null;
      break;
    case "mouseover":
    case "mouseout":
      Nc = null;
      break;
    case "pointerover":
    case "pointerout":
      Oc.delete(b.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Pc.delete(b.pointerId);
  }
}
function Tc(a, b, c, d, e, f2) {
  if (null === a || a.nativeEvent !== f2) return a = { blockedOn: b, domEventName: c, eventSystemFlags: d, nativeEvent: f2, targetContainers: [e] }, null !== b && (b = Cb(b), null !== b && Fc(b)), a;
  a.eventSystemFlags |= d;
  b = a.targetContainers;
  null !== e && -1 === b.indexOf(e) && b.push(e);
  return a;
}
function Uc(a, b, c, d, e) {
  switch (b) {
    case "focusin":
      return Lc = Tc(Lc, a, b, c, d, e), true;
    case "dragenter":
      return Mc = Tc(Mc, a, b, c, d, e), true;
    case "mouseover":
      return Nc = Tc(Nc, a, b, c, d, e), true;
    case "pointerover":
      var f2 = e.pointerId;
      Oc.set(f2, Tc(Oc.get(f2) || null, a, b, c, d, e));
      return true;
    case "gotpointercapture":
      return f2 = e.pointerId, Pc.set(f2, Tc(Pc.get(f2) || null, a, b, c, d, e)), true;
  }
  return false;
}
function Vc(a) {
  var b = Wc(a.target);
  if (null !== b) {
    var c = Vb(b);
    if (null !== c) {
      if (b = c.tag, 13 === b) {
        if (b = Wb(c), null !== b) {
          a.blockedOn = b;
          Ic(a.priority, function() {
            Gc(c);
          });
          return;
        }
      } else if (3 === b && c.stateNode.current.memoizedState.isDehydrated) {
        a.blockedOn = 3 === c.tag ? c.stateNode.containerInfo : null;
        return;
      }
    }
  }
  a.blockedOn = null;
}
function Xc(a) {
  if (null !== a.blockedOn) return false;
  for (var b = a.targetContainers; 0 < b.length; ) {
    var c = Yc(a.domEventName, a.eventSystemFlags, b[0], a.nativeEvent);
    if (null === c) {
      c = a.nativeEvent;
      var d = new c.constructor(c.type, c);
      wb = d;
      c.target.dispatchEvent(d);
      wb = null;
    } else return b = Cb(c), null !== b && Fc(b), a.blockedOn = c, false;
    b.shift();
  }
  return true;
}
function Zc(a, b, c) {
  Xc(a) && c.delete(b);
}
function $c() {
  Jc = false;
  null !== Lc && Xc(Lc) && (Lc = null);
  null !== Mc && Xc(Mc) && (Mc = null);
  null !== Nc && Xc(Nc) && (Nc = null);
  Oc.forEach(Zc);
  Pc.forEach(Zc);
}
function ad(a, b) {
  a.blockedOn === b && (a.blockedOn = null, Jc || (Jc = true, ca.unstable_scheduleCallback(ca.unstable_NormalPriority, $c)));
}
function bd(a) {
  function b(b2) {
    return ad(b2, a);
  }
  if (0 < Kc.length) {
    ad(Kc[0], a);
    for (var c = 1; c < Kc.length; c++) {
      var d = Kc[c];
      d.blockedOn === a && (d.blockedOn = null);
    }
  }
  null !== Lc && ad(Lc, a);
  null !== Mc && ad(Mc, a);
  null !== Nc && ad(Nc, a);
  Oc.forEach(b);
  Pc.forEach(b);
  for (c = 0; c < Qc.length; c++) d = Qc[c], d.blockedOn === a && (d.blockedOn = null);
  for (; 0 < Qc.length && (c = Qc[0], null === c.blockedOn); ) Vc(c), null === c.blockedOn && Qc.shift();
}
var cd = ua.ReactCurrentBatchConfig, dd = true;
function ed(a, b, c, d) {
  var e = C, f2 = cd.transition;
  cd.transition = null;
  try {
    C = 1, fd(a, b, c, d);
  } finally {
    C = e, cd.transition = f2;
  }
}
function gd(a, b, c, d) {
  var e = C, f2 = cd.transition;
  cd.transition = null;
  try {
    C = 4, fd(a, b, c, d);
  } finally {
    C = e, cd.transition = f2;
  }
}
function fd(a, b, c, d) {
  if (dd) {
    var e = Yc(a, b, c, d);
    if (null === e) hd(a, b, d, id, c), Sc(a, d);
    else if (Uc(e, a, b, c, d)) d.stopPropagation();
    else if (Sc(a, d), b & 4 && -1 < Rc.indexOf(a)) {
      for (; null !== e; ) {
        var f2 = Cb(e);
        null !== f2 && Ec(f2);
        f2 = Yc(a, b, c, d);
        null === f2 && hd(a, b, d, id, c);
        if (f2 === e) break;
        e = f2;
      }
      null !== e && d.stopPropagation();
    } else hd(a, b, d, null, c);
  }
}
var id = null;
function Yc(a, b, c, d) {
  id = null;
  a = xb(d);
  a = Wc(a);
  if (null !== a) if (b = Vb(a), null === b) a = null;
  else if (c = b.tag, 13 === c) {
    a = Wb(b);
    if (null !== a) return a;
    a = null;
  } else if (3 === c) {
    if (b.stateNode.current.memoizedState.isDehydrated) return 3 === b.tag ? b.stateNode.containerInfo : null;
    a = null;
  } else b !== a && (a = null);
  id = a;
  return null;
}
function jd(a) {
  switch (a) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (ec()) {
        case fc:
          return 1;
        case gc:
          return 4;
        case hc:
        case ic:
          return 16;
        case jc:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var kd = null, ld = null, md = null;
function nd() {
  if (md) return md;
  var a, b = ld, c = b.length, d, e = "value" in kd ? kd.value : kd.textContent, f2 = e.length;
  for (a = 0; a < c && b[a] === e[a]; a++) ;
  var g = c - a;
  for (d = 1; d <= g && b[c - d] === e[f2 - d]; d++) ;
  return md = e.slice(a, 1 < d ? 1 - d : void 0);
}
function od(a) {
  var b = a.keyCode;
  "charCode" in a ? (a = a.charCode, 0 === a && 13 === b && (a = 13)) : a = b;
  10 === a && (a = 13);
  return 32 <= a || 13 === a ? a : 0;
}
function pd() {
  return true;
}
function qd() {
  return false;
}
function rd(a) {
  function b(b2, d, e, f2, g) {
    this._reactName = b2;
    this._targetInst = e;
    this.type = d;
    this.nativeEvent = f2;
    this.target = g;
    this.currentTarget = null;
    for (var c in a) a.hasOwnProperty(c) && (b2 = a[c], this[c] = b2 ? b2(f2) : f2[c]);
    this.isDefaultPrevented = (null != f2.defaultPrevented ? f2.defaultPrevented : false === f2.returnValue) ? pd : qd;
    this.isPropagationStopped = qd;
    return this;
  }
  A$1(b.prototype, { preventDefault: function() {
    this.defaultPrevented = true;
    var a2 = this.nativeEvent;
    a2 && (a2.preventDefault ? a2.preventDefault() : "unknown" !== typeof a2.returnValue && (a2.returnValue = false), this.isDefaultPrevented = pd);
  }, stopPropagation: function() {
    var a2 = this.nativeEvent;
    a2 && (a2.stopPropagation ? a2.stopPropagation() : "unknown" !== typeof a2.cancelBubble && (a2.cancelBubble = true), this.isPropagationStopped = pd);
  }, persist: function() {
  }, isPersistent: pd });
  return b;
}
var sd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a) {
  return a.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, td = rd(sd), ud = A$1({}, sd, { view: 0, detail: 0 }), vd = rd(ud), wd, xd, yd, Ad = A$1({}, ud, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a) {
  return void 0 === a.relatedTarget ? a.fromElement === a.srcElement ? a.toElement : a.fromElement : a.relatedTarget;
}, movementX: function(a) {
  if ("movementX" in a) return a.movementX;
  a !== yd && (yd && "mousemove" === a.type ? (wd = a.screenX - yd.screenX, xd = a.screenY - yd.screenY) : xd = wd = 0, yd = a);
  return wd;
}, movementY: function(a) {
  return "movementY" in a ? a.movementY : xd;
} }), Bd = rd(Ad), Cd = A$1({}, Ad, { dataTransfer: 0 }), Dd = rd(Cd), Ed = A$1({}, ud, { relatedTarget: 0 }), Fd = rd(Ed), Gd = A$1({}, sd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Hd = rd(Gd), Id = A$1({}, sd, { clipboardData: function(a) {
  return "clipboardData" in a ? a.clipboardData : window.clipboardData;
} }), Jd = rd(Id), Kd = A$1({}, sd, { data: 0 }), Ld = rd(Kd), Md = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, Nd = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, Od = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Pd(a) {
  var b = this.nativeEvent;
  return b.getModifierState ? b.getModifierState(a) : (a = Od[a]) ? !!b[a] : false;
}
function zd() {
  return Pd;
}
var Qd = A$1({}, ud, { key: function(a) {
  if (a.key) {
    var b = Md[a.key] || a.key;
    if ("Unidentified" !== b) return b;
  }
  return "keypress" === a.type ? (a = od(a), 13 === a ? "Enter" : String.fromCharCode(a)) : "keydown" === a.type || "keyup" === a.type ? Nd[a.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a) {
  return "keypress" === a.type ? od(a) : 0;
}, keyCode: function(a) {
  return "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
}, which: function(a) {
  return "keypress" === a.type ? od(a) : "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
} }), Rd = rd(Qd), Sd = A$1({}, Ad, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Td = rd(Sd), Ud = A$1({}, ud, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd }), Vd = rd(Ud), Wd = A$1({}, sd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Xd = rd(Wd), Yd = A$1({}, Ad, {
  deltaX: function(a) {
    return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
  },
  deltaY: function(a) {
    return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Zd = rd(Yd), $d = [9, 13, 27, 32], ae$1 = ia && "CompositionEvent" in window, be$1 = null;
ia && "documentMode" in document && (be$1 = document.documentMode);
var ce$1 = ia && "TextEvent" in window && !be$1, de$1 = ia && (!ae$1 || be$1 && 8 < be$1 && 11 >= be$1), ee = String.fromCharCode(32), fe$1 = false;
function ge(a, b) {
  switch (a) {
    case "keyup":
      return -1 !== $d.indexOf(b.keyCode);
    case "keydown":
      return 229 !== b.keyCode;
    case "keypress":
    case "mousedown":
    case "focusout":
      return true;
    default:
      return false;
  }
}
function he(a) {
  a = a.detail;
  return "object" === typeof a && "data" in a ? a.data : null;
}
var ie$1 = false;
function je$1(a, b) {
  switch (a) {
    case "compositionend":
      return he(b);
    case "keypress":
      if (32 !== b.which) return null;
      fe$1 = true;
      return ee;
    case "textInput":
      return a = b.data, a === ee && fe$1 ? null : a;
    default:
      return null;
  }
}
function ke$1(a, b) {
  if (ie$1) return "compositionend" === a || !ae$1 && ge(a, b) ? (a = nd(), md = ld = kd = null, ie$1 = false, a) : null;
  switch (a) {
    case "paste":
      return null;
    case "keypress":
      if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
        if (b.char && 1 < b.char.length) return b.char;
        if (b.which) return String.fromCharCode(b.which);
      }
      return null;
    case "compositionend":
      return de$1 && "ko" !== b.locale ? null : b.data;
    default:
      return null;
  }
}
var le$1 = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
function me$1(a) {
  var b = a && a.nodeName && a.nodeName.toLowerCase();
  return "input" === b ? !!le$1[a.type] : "textarea" === b ? true : false;
}
function ne$1(a, b, c, d) {
  Eb(d);
  b = oe$1(b, "onChange");
  0 < b.length && (c = new td("onChange", "change", null, c, d), a.push({ event: c, listeners: b }));
}
var pe$1 = null, qe$1 = null;
function re$1(a) {
  se$1(a, 0);
}
function te(a) {
  var b = ue$1(a);
  if (Wa(b)) return a;
}
function ve$1(a, b) {
  if ("change" === a) return b;
}
var we$1 = false;
if (ia) {
  var xe$1;
  if (ia) {
    var ye$1 = "oninput" in document;
    if (!ye$1) {
      var ze$1 = document.createElement("div");
      ze$1.setAttribute("oninput", "return;");
      ye$1 = "function" === typeof ze$1.oninput;
    }
    xe$1 = ye$1;
  } else xe$1 = false;
  we$1 = xe$1 && (!document.documentMode || 9 < document.documentMode);
}
function Ae$1() {
  pe$1 && (pe$1.detachEvent("onpropertychange", Be$1), qe$1 = pe$1 = null);
}
function Be$1(a) {
  if ("value" === a.propertyName && te(qe$1)) {
    var b = [];
    ne$1(b, qe$1, a, xb(a));
    Jb(re$1, b);
  }
}
function Ce$1(a, b, c) {
  "focusin" === a ? (Ae$1(), pe$1 = b, qe$1 = c, pe$1.attachEvent("onpropertychange", Be$1)) : "focusout" === a && Ae$1();
}
function De$1(a) {
  if ("selectionchange" === a || "keyup" === a || "keydown" === a) return te(qe$1);
}
function Ee(a, b) {
  if ("click" === a) return te(b);
}
function Fe$1(a, b) {
  if ("input" === a || "change" === a) return te(b);
}
function Ge$1(a, b) {
  return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
}
var He$1 = "function" === typeof Object.is ? Object.is : Ge$1;
function Ie$1(a, b) {
  if (He$1(a, b)) return true;
  if ("object" !== typeof a || null === a || "object" !== typeof b || null === b) return false;
  var c = Object.keys(a), d = Object.keys(b);
  if (c.length !== d.length) return false;
  for (d = 0; d < c.length; d++) {
    var e = c[d];
    if (!ja.call(b, e) || !He$1(a[e], b[e])) return false;
  }
  return true;
}
function Je$1(a) {
  for (; a && a.firstChild; ) a = a.firstChild;
  return a;
}
function Ke$1(a, b) {
  var c = Je$1(a);
  a = 0;
  for (var d; c; ) {
    if (3 === c.nodeType) {
      d = a + c.textContent.length;
      if (a <= b && d >= b) return { node: c, offset: b - a };
      a = d;
    }
    a: {
      for (; c; ) {
        if (c.nextSibling) {
          c = c.nextSibling;
          break a;
        }
        c = c.parentNode;
      }
      c = void 0;
    }
    c = Je$1(c);
  }
}
function Le$1(a, b) {
  return a && b ? a === b ? true : a && 3 === a.nodeType ? false : b && 3 === b.nodeType ? Le$1(a, b.parentNode) : "contains" in a ? a.contains(b) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(b) & 16) : false : false;
}
function Me$1() {
  for (var a = window, b = Xa(); b instanceof a.HTMLIFrameElement; ) {
    try {
      var c = "string" === typeof b.contentWindow.location.href;
    } catch (d) {
      c = false;
    }
    if (c) a = b.contentWindow;
    else break;
    b = Xa(a.document);
  }
  return b;
}
function Ne$1(a) {
  var b = a && a.nodeName && a.nodeName.toLowerCase();
  return b && ("input" === b && ("text" === a.type || "search" === a.type || "tel" === a.type || "url" === a.type || "password" === a.type) || "textarea" === b || "true" === a.contentEditable);
}
function Oe$1(a) {
  var b = Me$1(), c = a.focusedElem, d = a.selectionRange;
  if (b !== c && c && c.ownerDocument && Le$1(c.ownerDocument.documentElement, c)) {
    if (null !== d && Ne$1(c)) {
      if (b = d.start, a = d.end, void 0 === a && (a = b), "selectionStart" in c) c.selectionStart = b, c.selectionEnd = Math.min(a, c.value.length);
      else if (a = (b = c.ownerDocument || document) && b.defaultView || window, a.getSelection) {
        a = a.getSelection();
        var e = c.textContent.length, f2 = Math.min(d.start, e);
        d = void 0 === d.end ? f2 : Math.min(d.end, e);
        !a.extend && f2 > d && (e = d, d = f2, f2 = e);
        e = Ke$1(c, f2);
        var g = Ke$1(
          c,
          d
        );
        e && g && (1 !== a.rangeCount || a.anchorNode !== e.node || a.anchorOffset !== e.offset || a.focusNode !== g.node || a.focusOffset !== g.offset) && (b = b.createRange(), b.setStart(e.node, e.offset), a.removeAllRanges(), f2 > d ? (a.addRange(b), a.extend(g.node, g.offset)) : (b.setEnd(g.node, g.offset), a.addRange(b)));
      }
    }
    b = [];
    for (a = c; a = a.parentNode; ) 1 === a.nodeType && b.push({ element: a, left: a.scrollLeft, top: a.scrollTop });
    "function" === typeof c.focus && c.focus();
    for (c = 0; c < b.length; c++) a = b[c], a.element.scrollLeft = a.left, a.element.scrollTop = a.top;
  }
}
var Pe$1 = ia && "documentMode" in document && 11 >= document.documentMode, Qe$1 = null, Re$1 = null, Se$1 = null, Te$1 = false;
function Ue$1(a, b, c) {
  var d = c.window === c ? c.document : 9 === c.nodeType ? c : c.ownerDocument;
  Te$1 || null == Qe$1 || Qe$1 !== Xa(d) || (d = Qe$1, "selectionStart" in d && Ne$1(d) ? d = { start: d.selectionStart, end: d.selectionEnd } : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = { anchorNode: d.anchorNode, anchorOffset: d.anchorOffset, focusNode: d.focusNode, focusOffset: d.focusOffset }), Se$1 && Ie$1(Se$1, d) || (Se$1 = d, d = oe$1(Re$1, "onSelect"), 0 < d.length && (b = new td("onSelect", "select", null, b, c), a.push({ event: b, listeners: d }), b.target = Qe$1)));
}
function Ve$1(a, b) {
  var c = {};
  c[a.toLowerCase()] = b.toLowerCase();
  c["Webkit" + a] = "webkit" + b;
  c["Moz" + a] = "moz" + b;
  return c;
}
var We$1 = { animationend: Ve$1("Animation", "AnimationEnd"), animationiteration: Ve$1("Animation", "AnimationIteration"), animationstart: Ve$1("Animation", "AnimationStart"), transitionend: Ve$1("Transition", "TransitionEnd") }, Xe$1 = {}, Ye$1 = {};
ia && (Ye$1 = document.createElement("div").style, "AnimationEvent" in window || (delete We$1.animationend.animation, delete We$1.animationiteration.animation, delete We$1.animationstart.animation), "TransitionEvent" in window || delete We$1.transitionend.transition);
function Ze$1(a) {
  if (Xe$1[a]) return Xe$1[a];
  if (!We$1[a]) return a;
  var b = We$1[a], c;
  for (c in b) if (b.hasOwnProperty(c) && c in Ye$1) return Xe$1[a] = b[c];
  return a;
}
var $e$1 = Ze$1("animationend"), af = Ze$1("animationiteration"), bf = Ze$1("animationstart"), cf = Ze$1("transitionend"), df = /* @__PURE__ */ new Map(), ef = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function ff(a, b) {
  df.set(a, b);
  fa(b, [a]);
}
for (var gf = 0; gf < ef.length; gf++) {
  var hf = ef[gf], jf = hf.toLowerCase(), kf = hf[0].toUpperCase() + hf.slice(1);
  ff(jf, "on" + kf);
}
ff($e$1, "onAnimationEnd");
ff(af, "onAnimationIteration");
ff(bf, "onAnimationStart");
ff("dblclick", "onDoubleClick");
ff("focusin", "onFocus");
ff("focusout", "onBlur");
ff(cf, "onTransitionEnd");
ha("onMouseEnter", ["mouseout", "mouseover"]);
ha("onMouseLeave", ["mouseout", "mouseover"]);
ha("onPointerEnter", ["pointerout", "pointerover"]);
ha("onPointerLeave", ["pointerout", "pointerover"]);
fa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
fa("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
fa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
fa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
function nf(a, b, c) {
  var d = a.type || "unknown-event";
  a.currentTarget = c;
  Ub(d, b, void 0, a);
  a.currentTarget = null;
}
function se$1(a, b) {
  b = 0 !== (b & 4);
  for (var c = 0; c < a.length; c++) {
    var d = a[c], e = d.event;
    d = d.listeners;
    a: {
      var f2 = void 0;
      if (b) for (var g = d.length - 1; 0 <= g; g--) {
        var h = d[g], k2 = h.instance, l2 = h.currentTarget;
        h = h.listener;
        if (k2 !== f2 && e.isPropagationStopped()) break a;
        nf(e, h, l2);
        f2 = k2;
      }
      else for (g = 0; g < d.length; g++) {
        h = d[g];
        k2 = h.instance;
        l2 = h.currentTarget;
        h = h.listener;
        if (k2 !== f2 && e.isPropagationStopped()) break a;
        nf(e, h, l2);
        f2 = k2;
      }
    }
  }
  if (Qb) throw a = Rb, Qb = false, Rb = null, a;
}
function D(a, b) {
  var c = b[of];
  void 0 === c && (c = b[of] = /* @__PURE__ */ new Set());
  var d = a + "__bubble";
  c.has(d) || (pf(b, a, 2, false), c.add(d));
}
function qf(a, b, c) {
  var d = 0;
  b && (d |= 4);
  pf(c, a, d, b);
}
var rf = "_reactListening" + Math.random().toString(36).slice(2);
function sf(a) {
  if (!a[rf]) {
    a[rf] = true;
    da.forEach(function(b2) {
      "selectionchange" !== b2 && (mf.has(b2) || qf(b2, false, a), qf(b2, true, a));
    });
    var b = 9 === a.nodeType ? a : a.ownerDocument;
    null === b || b[rf] || (b[rf] = true, qf("selectionchange", false, b));
  }
}
function pf(a, b, c, d) {
  switch (jd(b)) {
    case 1:
      var e = ed;
      break;
    case 4:
      e = gd;
      break;
    default:
      e = fd;
  }
  c = e.bind(null, b, c, a);
  e = void 0;
  !Lb || "touchstart" !== b && "touchmove" !== b && "wheel" !== b || (e = true);
  d ? void 0 !== e ? a.addEventListener(b, c, { capture: true, passive: e }) : a.addEventListener(b, c, true) : void 0 !== e ? a.addEventListener(b, c, { passive: e }) : a.addEventListener(b, c, false);
}
function hd(a, b, c, d, e) {
  var f2 = d;
  if (0 === (b & 1) && 0 === (b & 2) && null !== d) a: for (; ; ) {
    if (null === d) return;
    var g = d.tag;
    if (3 === g || 4 === g) {
      var h = d.stateNode.containerInfo;
      if (h === e || 8 === h.nodeType && h.parentNode === e) break;
      if (4 === g) for (g = d.return; null !== g; ) {
        var k2 = g.tag;
        if (3 === k2 || 4 === k2) {
          if (k2 = g.stateNode.containerInfo, k2 === e || 8 === k2.nodeType && k2.parentNode === e) return;
        }
        g = g.return;
      }
      for (; null !== h; ) {
        g = Wc(h);
        if (null === g) return;
        k2 = g.tag;
        if (5 === k2 || 6 === k2) {
          d = f2 = g;
          continue a;
        }
        h = h.parentNode;
      }
    }
    d = d.return;
  }
  Jb(function() {
    var d2 = f2, e2 = xb(c), g2 = [];
    a: {
      var h2 = df.get(a);
      if (void 0 !== h2) {
        var k3 = td, n2 = a;
        switch (a) {
          case "keypress":
            if (0 === od(c)) break a;
          case "keydown":
          case "keyup":
            k3 = Rd;
            break;
          case "focusin":
            n2 = "focus";
            k3 = Fd;
            break;
          case "focusout":
            n2 = "blur";
            k3 = Fd;
            break;
          case "beforeblur":
          case "afterblur":
            k3 = Fd;
            break;
          case "click":
            if (2 === c.button) break a;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            k3 = Bd;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            k3 = Dd;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            k3 = Vd;
            break;
          case $e$1:
          case af:
          case bf:
            k3 = Hd;
            break;
          case cf:
            k3 = Xd;
            break;
          case "scroll":
            k3 = vd;
            break;
          case "wheel":
            k3 = Zd;
            break;
          case "copy":
          case "cut":
          case "paste":
            k3 = Jd;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            k3 = Td;
        }
        var t2 = 0 !== (b & 4), J2 = !t2 && "scroll" === a, x2 = t2 ? null !== h2 ? h2 + "Capture" : null : h2;
        t2 = [];
        for (var w2 = d2, u2; null !== w2; ) {
          u2 = w2;
          var F2 = u2.stateNode;
          5 === u2.tag && null !== F2 && (u2 = F2, null !== x2 && (F2 = Kb(w2, x2), null != F2 && t2.push(tf(w2, F2, u2))));
          if (J2) break;
          w2 = w2.return;
        }
        0 < t2.length && (h2 = new k3(h2, n2, null, c, e2), g2.push({ event: h2, listeners: t2 }));
      }
    }
    if (0 === (b & 7)) {
      a: {
        h2 = "mouseover" === a || "pointerover" === a;
        k3 = "mouseout" === a || "pointerout" === a;
        if (h2 && c !== wb && (n2 = c.relatedTarget || c.fromElement) && (Wc(n2) || n2[uf])) break a;
        if (k3 || h2) {
          h2 = e2.window === e2 ? e2 : (h2 = e2.ownerDocument) ? h2.defaultView || h2.parentWindow : window;
          if (k3) {
            if (n2 = c.relatedTarget || c.toElement, k3 = d2, n2 = n2 ? Wc(n2) : null, null !== n2 && (J2 = Vb(n2), n2 !== J2 || 5 !== n2.tag && 6 !== n2.tag)) n2 = null;
          } else k3 = null, n2 = d2;
          if (k3 !== n2) {
            t2 = Bd;
            F2 = "onMouseLeave";
            x2 = "onMouseEnter";
            w2 = "mouse";
            if ("pointerout" === a || "pointerover" === a) t2 = Td, F2 = "onPointerLeave", x2 = "onPointerEnter", w2 = "pointer";
            J2 = null == k3 ? h2 : ue$1(k3);
            u2 = null == n2 ? h2 : ue$1(n2);
            h2 = new t2(F2, w2 + "leave", k3, c, e2);
            h2.target = J2;
            h2.relatedTarget = u2;
            F2 = null;
            Wc(e2) === d2 && (t2 = new t2(x2, w2 + "enter", n2, c, e2), t2.target = u2, t2.relatedTarget = J2, F2 = t2);
            J2 = F2;
            if (k3 && n2) b: {
              t2 = k3;
              x2 = n2;
              w2 = 0;
              for (u2 = t2; u2; u2 = vf(u2)) w2++;
              u2 = 0;
              for (F2 = x2; F2; F2 = vf(F2)) u2++;
              for (; 0 < w2 - u2; ) t2 = vf(t2), w2--;
              for (; 0 < u2 - w2; ) x2 = vf(x2), u2--;
              for (; w2--; ) {
                if (t2 === x2 || null !== x2 && t2 === x2.alternate) break b;
                t2 = vf(t2);
                x2 = vf(x2);
              }
              t2 = null;
            }
            else t2 = null;
            null !== k3 && wf(g2, h2, k3, t2, false);
            null !== n2 && null !== J2 && wf(g2, J2, n2, t2, true);
          }
        }
      }
      a: {
        h2 = d2 ? ue$1(d2) : window;
        k3 = h2.nodeName && h2.nodeName.toLowerCase();
        if ("select" === k3 || "input" === k3 && "file" === h2.type) var na = ve$1;
        else if (me$1(h2)) if (we$1) na = Fe$1;
        else {
          na = De$1;
          var xa = Ce$1;
        }
        else (k3 = h2.nodeName) && "input" === k3.toLowerCase() && ("checkbox" === h2.type || "radio" === h2.type) && (na = Ee);
        if (na && (na = na(a, d2))) {
          ne$1(g2, na, c, e2);
          break a;
        }
        xa && xa(a, h2, d2);
        "focusout" === a && (xa = h2._wrapperState) && xa.controlled && "number" === h2.type && cb(h2, "number", h2.value);
      }
      xa = d2 ? ue$1(d2) : window;
      switch (a) {
        case "focusin":
          if (me$1(xa) || "true" === xa.contentEditable) Qe$1 = xa, Re$1 = d2, Se$1 = null;
          break;
        case "focusout":
          Se$1 = Re$1 = Qe$1 = null;
          break;
        case "mousedown":
          Te$1 = true;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Te$1 = false;
          Ue$1(g2, c, e2);
          break;
        case "selectionchange":
          if (Pe$1) break;
        case "keydown":
        case "keyup":
          Ue$1(g2, c, e2);
      }
      var $a;
      if (ae$1) b: {
        switch (a) {
          case "compositionstart":
            var ba = "onCompositionStart";
            break b;
          case "compositionend":
            ba = "onCompositionEnd";
            break b;
          case "compositionupdate":
            ba = "onCompositionUpdate";
            break b;
        }
        ba = void 0;
      }
      else ie$1 ? ge(a, c) && (ba = "onCompositionEnd") : "keydown" === a && 229 === c.keyCode && (ba = "onCompositionStart");
      ba && (de$1 && "ko" !== c.locale && (ie$1 || "onCompositionStart" !== ba ? "onCompositionEnd" === ba && ie$1 && ($a = nd()) : (kd = e2, ld = "value" in kd ? kd.value : kd.textContent, ie$1 = true)), xa = oe$1(d2, ba), 0 < xa.length && (ba = new Ld(ba, a, null, c, e2), g2.push({ event: ba, listeners: xa }), $a ? ba.data = $a : ($a = he(c), null !== $a && (ba.data = $a))));
      if ($a = ce$1 ? je$1(a, c) : ke$1(a, c)) d2 = oe$1(d2, "onBeforeInput"), 0 < d2.length && (e2 = new Ld("onBeforeInput", "beforeinput", null, c, e2), g2.push({ event: e2, listeners: d2 }), e2.data = $a);
    }
    se$1(g2, b);
  });
}
function tf(a, b, c) {
  return { instance: a, listener: b, currentTarget: c };
}
function oe$1(a, b) {
  for (var c = b + "Capture", d = []; null !== a; ) {
    var e = a, f2 = e.stateNode;
    5 === e.tag && null !== f2 && (e = f2, f2 = Kb(a, c), null != f2 && d.unshift(tf(a, f2, e)), f2 = Kb(a, b), null != f2 && d.push(tf(a, f2, e)));
    a = a.return;
  }
  return d;
}
function vf(a) {
  if (null === a) return null;
  do
    a = a.return;
  while (a && 5 !== a.tag);
  return a ? a : null;
}
function wf(a, b, c, d, e) {
  for (var f2 = b._reactName, g = []; null !== c && c !== d; ) {
    var h = c, k2 = h.alternate, l2 = h.stateNode;
    if (null !== k2 && k2 === d) break;
    5 === h.tag && null !== l2 && (h = l2, e ? (k2 = Kb(c, f2), null != k2 && g.unshift(tf(c, k2, h))) : e || (k2 = Kb(c, f2), null != k2 && g.push(tf(c, k2, h))));
    c = c.return;
  }
  0 !== g.length && a.push({ event: b, listeners: g });
}
var xf = /\r\n?/g, yf = /\u0000|\uFFFD/g;
function zf(a) {
  return ("string" === typeof a ? a : "" + a).replace(xf, "\n").replace(yf, "");
}
function Af(a, b, c) {
  b = zf(b);
  if (zf(a) !== b && c) throw Error(p(425));
}
function Bf() {
}
var Cf = null, Df = null;
function Ef(a, b) {
  return "textarea" === a || "noscript" === a || "string" === typeof b.children || "number" === typeof b.children || "object" === typeof b.dangerouslySetInnerHTML && null !== b.dangerouslySetInnerHTML && null != b.dangerouslySetInnerHTML.__html;
}
var Ff = "function" === typeof setTimeout ? setTimeout : void 0, Gf = "function" === typeof clearTimeout ? clearTimeout : void 0, Hf = "function" === typeof Promise ? Promise : void 0, Jf = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof Hf ? function(a) {
  return Hf.resolve(null).then(a).catch(If);
} : Ff;
function If(a) {
  setTimeout(function() {
    throw a;
  });
}
function Kf(a, b) {
  var c = b, d = 0;
  do {
    var e = c.nextSibling;
    a.removeChild(c);
    if (e && 8 === e.nodeType) if (c = e.data, "/$" === c) {
      if (0 === d) {
        a.removeChild(e);
        bd(b);
        return;
      }
      d--;
    } else "$" !== c && "$?" !== c && "$!" !== c || d++;
    c = e;
  } while (c);
  bd(b);
}
function Lf(a) {
  for (; null != a; a = a.nextSibling) {
    var b = a.nodeType;
    if (1 === b || 3 === b) break;
    if (8 === b) {
      b = a.data;
      if ("$" === b || "$!" === b || "$?" === b) break;
      if ("/$" === b) return null;
    }
  }
  return a;
}
function Mf(a) {
  a = a.previousSibling;
  for (var b = 0; a; ) {
    if (8 === a.nodeType) {
      var c = a.data;
      if ("$" === c || "$!" === c || "$?" === c) {
        if (0 === b) return a;
        b--;
      } else "/$" === c && b++;
    }
    a = a.previousSibling;
  }
  return null;
}
var Nf = Math.random().toString(36).slice(2), Of = "__reactFiber$" + Nf, Pf = "__reactProps$" + Nf, uf = "__reactContainer$" + Nf, of = "__reactEvents$" + Nf, Qf = "__reactListeners$" + Nf, Rf = "__reactHandles$" + Nf;
function Wc(a) {
  var b = a[Of];
  if (b) return b;
  for (var c = a.parentNode; c; ) {
    if (b = c[uf] || c[Of]) {
      c = b.alternate;
      if (null !== b.child || null !== c && null !== c.child) for (a = Mf(a); null !== a; ) {
        if (c = a[Of]) return c;
        a = Mf(a);
      }
      return b;
    }
    a = c;
    c = a.parentNode;
  }
  return null;
}
function Cb(a) {
  a = a[Of] || a[uf];
  return !a || 5 !== a.tag && 6 !== a.tag && 13 !== a.tag && 3 !== a.tag ? null : a;
}
function ue$1(a) {
  if (5 === a.tag || 6 === a.tag) return a.stateNode;
  throw Error(p(33));
}
function Db(a) {
  return a[Pf] || null;
}
var Sf = [], Tf = -1;
function Uf(a) {
  return { current: a };
}
function E(a) {
  0 > Tf || (a.current = Sf[Tf], Sf[Tf] = null, Tf--);
}
function G(a, b) {
  Tf++;
  Sf[Tf] = a.current;
  a.current = b;
}
var Vf = {}, H = Uf(Vf), Wf = Uf(false), Xf = Vf;
function Yf(a, b) {
  var c = a.type.contextTypes;
  if (!c) return Vf;
  var d = a.stateNode;
  if (d && d.__reactInternalMemoizedUnmaskedChildContext === b) return d.__reactInternalMemoizedMaskedChildContext;
  var e = {}, f2;
  for (f2 in c) e[f2] = b[f2];
  d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);
  return e;
}
function Zf(a) {
  a = a.childContextTypes;
  return null !== a && void 0 !== a;
}
function $f() {
  E(Wf);
  E(H);
}
function ag(a, b, c) {
  if (H.current !== Vf) throw Error(p(168));
  G(H, b);
  G(Wf, c);
}
function bg(a, b, c) {
  var d = a.stateNode;
  b = b.childContextTypes;
  if ("function" !== typeof d.getChildContext) return c;
  d = d.getChildContext();
  for (var e in d) if (!(e in b)) throw Error(p(108, Ra(a) || "Unknown", e));
  return A$1({}, c, d);
}
function cg(a) {
  a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || Vf;
  Xf = H.current;
  G(H, a);
  G(Wf, Wf.current);
  return true;
}
function dg(a, b, c) {
  var d = a.stateNode;
  if (!d) throw Error(p(169));
  c ? (a = bg(a, b, Xf), d.__reactInternalMemoizedMergedChildContext = a, E(Wf), E(H), G(H, a)) : E(Wf);
  G(Wf, c);
}
var eg = null, fg = false, gg = false;
function hg(a) {
  null === eg ? eg = [a] : eg.push(a);
}
function ig(a) {
  fg = true;
  hg(a);
}
function jg() {
  if (!gg && null !== eg) {
    gg = true;
    var a = 0, b = C;
    try {
      var c = eg;
      for (C = 1; a < c.length; a++) {
        var d = c[a];
        do
          d = d(true);
        while (null !== d);
      }
      eg = null;
      fg = false;
    } catch (e) {
      throw null !== eg && (eg = eg.slice(a + 1)), ac(fc, jg), e;
    } finally {
      C = b, gg = false;
    }
  }
  return null;
}
var kg = [], lg = 0, mg = null, ng = 0, og = [], pg = 0, qg = null, rg = 1, sg = "";
function tg(a, b) {
  kg[lg++] = ng;
  kg[lg++] = mg;
  mg = a;
  ng = b;
}
function ug(a, b, c) {
  og[pg++] = rg;
  og[pg++] = sg;
  og[pg++] = qg;
  qg = a;
  var d = rg;
  a = sg;
  var e = 32 - oc(d) - 1;
  d &= ~(1 << e);
  c += 1;
  var f2 = 32 - oc(b) + e;
  if (30 < f2) {
    var g = e - e % 5;
    f2 = (d & (1 << g) - 1).toString(32);
    d >>= g;
    e -= g;
    rg = 1 << 32 - oc(b) + e | c << e | d;
    sg = f2 + a;
  } else rg = 1 << f2 | c << e | d, sg = a;
}
function vg(a) {
  null !== a.return && (tg(a, 1), ug(a, 1, 0));
}
function wg(a) {
  for (; a === mg; ) mg = kg[--lg], kg[lg] = null, ng = kg[--lg], kg[lg] = null;
  for (; a === qg; ) qg = og[--pg], og[pg] = null, sg = og[--pg], og[pg] = null, rg = og[--pg], og[pg] = null;
}
var xg = null, yg = null, I = false, zg = null;
function Ag(a, b) {
  var c = Bg(5, null, null, 0);
  c.elementType = "DELETED";
  c.stateNode = b;
  c.return = a;
  b = a.deletions;
  null === b ? (a.deletions = [c], a.flags |= 16) : b.push(c);
}
function Cg(a, b) {
  switch (a.tag) {
    case 5:
      var c = a.type;
      b = 1 !== b.nodeType || c.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;
      return null !== b ? (a.stateNode = b, xg = a, yg = Lf(b.firstChild), true) : false;
    case 6:
      return b = "" === a.pendingProps || 3 !== b.nodeType ? null : b, null !== b ? (a.stateNode = b, xg = a, yg = null, true) : false;
    case 13:
      return b = 8 !== b.nodeType ? null : b, null !== b ? (c = null !== qg ? { id: rg, overflow: sg } : null, a.memoizedState = { dehydrated: b, treeContext: c, retryLane: 1073741824 }, c = Bg(18, null, null, 0), c.stateNode = b, c.return = a, a.child = c, xg = a, yg = null, true) : false;
    default:
      return false;
  }
}
function Dg(a) {
  return 0 !== (a.mode & 1) && 0 === (a.flags & 128);
}
function Eg(a) {
  if (I) {
    var b = yg;
    if (b) {
      var c = b;
      if (!Cg(a, b)) {
        if (Dg(a)) throw Error(p(418));
        b = Lf(c.nextSibling);
        var d = xg;
        b && Cg(a, b) ? Ag(d, c) : (a.flags = a.flags & -4097 | 2, I = false, xg = a);
      }
    } else {
      if (Dg(a)) throw Error(p(418));
      a.flags = a.flags & -4097 | 2;
      I = false;
      xg = a;
    }
  }
}
function Fg(a) {
  for (a = a.return; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag; ) a = a.return;
  xg = a;
}
function Gg(a) {
  if (a !== xg) return false;
  if (!I) return Fg(a), I = true, false;
  var b;
  (b = 3 !== a.tag) && !(b = 5 !== a.tag) && (b = a.type, b = "head" !== b && "body" !== b && !Ef(a.type, a.memoizedProps));
  if (b && (b = yg)) {
    if (Dg(a)) throw Hg(), Error(p(418));
    for (; b; ) Ag(a, b), b = Lf(b.nextSibling);
  }
  Fg(a);
  if (13 === a.tag) {
    a = a.memoizedState;
    a = null !== a ? a.dehydrated : null;
    if (!a) throw Error(p(317));
    a: {
      a = a.nextSibling;
      for (b = 0; a; ) {
        if (8 === a.nodeType) {
          var c = a.data;
          if ("/$" === c) {
            if (0 === b) {
              yg = Lf(a.nextSibling);
              break a;
            }
            b--;
          } else "$" !== c && "$!" !== c && "$?" !== c || b++;
        }
        a = a.nextSibling;
      }
      yg = null;
    }
  } else yg = xg ? Lf(a.stateNode.nextSibling) : null;
  return true;
}
function Hg() {
  for (var a = yg; a; ) a = Lf(a.nextSibling);
}
function Ig() {
  yg = xg = null;
  I = false;
}
function Jg(a) {
  null === zg ? zg = [a] : zg.push(a);
}
var Kg = ua.ReactCurrentBatchConfig;
function Lg(a, b, c) {
  a = c.ref;
  if (null !== a && "function" !== typeof a && "object" !== typeof a) {
    if (c._owner) {
      c = c._owner;
      if (c) {
        if (1 !== c.tag) throw Error(p(309));
        var d = c.stateNode;
      }
      if (!d) throw Error(p(147, a));
      var e = d, f2 = "" + a;
      if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === f2) return b.ref;
      b = function(a2) {
        var b2 = e.refs;
        null === a2 ? delete b2[f2] : b2[f2] = a2;
      };
      b._stringRef = f2;
      return b;
    }
    if ("string" !== typeof a) throw Error(p(284));
    if (!c._owner) throw Error(p(290, a));
  }
  return a;
}
function Mg(a, b) {
  a = Object.prototype.toString.call(b);
  throw Error(p(31, "[object Object]" === a ? "object with keys {" + Object.keys(b).join(", ") + "}" : a));
}
function Ng(a) {
  var b = a._init;
  return b(a._payload);
}
function Og(a) {
  function b(b2, c2) {
    if (a) {
      var d2 = b2.deletions;
      null === d2 ? (b2.deletions = [c2], b2.flags |= 16) : d2.push(c2);
    }
  }
  function c(c2, d2) {
    if (!a) return null;
    for (; null !== d2; ) b(c2, d2), d2 = d2.sibling;
    return null;
  }
  function d(a2, b2) {
    for (a2 = /* @__PURE__ */ new Map(); null !== b2; ) null !== b2.key ? a2.set(b2.key, b2) : a2.set(b2.index, b2), b2 = b2.sibling;
    return a2;
  }
  function e(a2, b2) {
    a2 = Pg(a2, b2);
    a2.index = 0;
    a2.sibling = null;
    return a2;
  }
  function f2(b2, c2, d2) {
    b2.index = d2;
    if (!a) return b2.flags |= 1048576, c2;
    d2 = b2.alternate;
    if (null !== d2) return d2 = d2.index, d2 < c2 ? (b2.flags |= 2, c2) : d2;
    b2.flags |= 2;
    return c2;
  }
  function g(b2) {
    a && null === b2.alternate && (b2.flags |= 2);
    return b2;
  }
  function h(a2, b2, c2, d2) {
    if (null === b2 || 6 !== b2.tag) return b2 = Qg(c2, a2.mode, d2), b2.return = a2, b2;
    b2 = e(b2, c2);
    b2.return = a2;
    return b2;
  }
  function k2(a2, b2, c2, d2) {
    var f3 = c2.type;
    if (f3 === ya) return m2(a2, b2, c2.props.children, d2, c2.key);
    if (null !== b2 && (b2.elementType === f3 || "object" === typeof f3 && null !== f3 && f3.$$typeof === Ha && Ng(f3) === b2.type)) return d2 = e(b2, c2.props), d2.ref = Lg(a2, b2, c2), d2.return = a2, d2;
    d2 = Rg(c2.type, c2.key, c2.props, null, a2.mode, d2);
    d2.ref = Lg(a2, b2, c2);
    d2.return = a2;
    return d2;
  }
  function l2(a2, b2, c2, d2) {
    if (null === b2 || 4 !== b2.tag || b2.stateNode.containerInfo !== c2.containerInfo || b2.stateNode.implementation !== c2.implementation) return b2 = Sg(c2, a2.mode, d2), b2.return = a2, b2;
    b2 = e(b2, c2.children || []);
    b2.return = a2;
    return b2;
  }
  function m2(a2, b2, c2, d2, f3) {
    if (null === b2 || 7 !== b2.tag) return b2 = Tg(c2, a2.mode, d2, f3), b2.return = a2, b2;
    b2 = e(b2, c2);
    b2.return = a2;
    return b2;
  }
  function q2(a2, b2, c2) {
    if ("string" === typeof b2 && "" !== b2 || "number" === typeof b2) return b2 = Qg("" + b2, a2.mode, c2), b2.return = a2, b2;
    if ("object" === typeof b2 && null !== b2) {
      switch (b2.$$typeof) {
        case va:
          return c2 = Rg(b2.type, b2.key, b2.props, null, a2.mode, c2), c2.ref = Lg(a2, null, b2), c2.return = a2, c2;
        case wa:
          return b2 = Sg(b2, a2.mode, c2), b2.return = a2, b2;
        case Ha:
          var d2 = b2._init;
          return q2(a2, d2(b2._payload), c2);
      }
      if (eb(b2) || Ka(b2)) return b2 = Tg(b2, a2.mode, c2, null), b2.return = a2, b2;
      Mg(a2, b2);
    }
    return null;
  }
  function r2(a2, b2, c2, d2) {
    var e2 = null !== b2 ? b2.key : null;
    if ("string" === typeof c2 && "" !== c2 || "number" === typeof c2) return null !== e2 ? null : h(a2, b2, "" + c2, d2);
    if ("object" === typeof c2 && null !== c2) {
      switch (c2.$$typeof) {
        case va:
          return c2.key === e2 ? k2(a2, b2, c2, d2) : null;
        case wa:
          return c2.key === e2 ? l2(a2, b2, c2, d2) : null;
        case Ha:
          return e2 = c2._init, r2(
            a2,
            b2,
            e2(c2._payload),
            d2
          );
      }
      if (eb(c2) || Ka(c2)) return null !== e2 ? null : m2(a2, b2, c2, d2, null);
      Mg(a2, c2);
    }
    return null;
  }
  function y2(a2, b2, c2, d2, e2) {
    if ("string" === typeof d2 && "" !== d2 || "number" === typeof d2) return a2 = a2.get(c2) || null, h(b2, a2, "" + d2, e2);
    if ("object" === typeof d2 && null !== d2) {
      switch (d2.$$typeof) {
        case va:
          return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, k2(b2, a2, d2, e2);
        case wa:
          return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, l2(b2, a2, d2, e2);
        case Ha:
          var f3 = d2._init;
          return y2(a2, b2, c2, f3(d2._payload), e2);
      }
      if (eb(d2) || Ka(d2)) return a2 = a2.get(c2) || null, m2(b2, a2, d2, e2, null);
      Mg(b2, d2);
    }
    return null;
  }
  function n2(e2, g2, h2, k3) {
    for (var l3 = null, m3 = null, u2 = g2, w2 = g2 = 0, x2 = null; null !== u2 && w2 < h2.length; w2++) {
      u2.index > w2 ? (x2 = u2, u2 = null) : x2 = u2.sibling;
      var n3 = r2(e2, u2, h2[w2], k3);
      if (null === n3) {
        null === u2 && (u2 = x2);
        break;
      }
      a && u2 && null === n3.alternate && b(e2, u2);
      g2 = f2(n3, g2, w2);
      null === m3 ? l3 = n3 : m3.sibling = n3;
      m3 = n3;
      u2 = x2;
    }
    if (w2 === h2.length) return c(e2, u2), I && tg(e2, w2), l3;
    if (null === u2) {
      for (; w2 < h2.length; w2++) u2 = q2(e2, h2[w2], k3), null !== u2 && (g2 = f2(u2, g2, w2), null === m3 ? l3 = u2 : m3.sibling = u2, m3 = u2);
      I && tg(e2, w2);
      return l3;
    }
    for (u2 = d(e2, u2); w2 < h2.length; w2++) x2 = y2(u2, e2, w2, h2[w2], k3), null !== x2 && (a && null !== x2.alternate && u2.delete(null === x2.key ? w2 : x2.key), g2 = f2(x2, g2, w2), null === m3 ? l3 = x2 : m3.sibling = x2, m3 = x2);
    a && u2.forEach(function(a2) {
      return b(e2, a2);
    });
    I && tg(e2, w2);
    return l3;
  }
  function t2(e2, g2, h2, k3) {
    var l3 = Ka(h2);
    if ("function" !== typeof l3) throw Error(p(150));
    h2 = l3.call(h2);
    if (null == h2) throw Error(p(151));
    for (var u2 = l3 = null, m3 = g2, w2 = g2 = 0, x2 = null, n3 = h2.next(); null !== m3 && !n3.done; w2++, n3 = h2.next()) {
      m3.index > w2 ? (x2 = m3, m3 = null) : x2 = m3.sibling;
      var t3 = r2(e2, m3, n3.value, k3);
      if (null === t3) {
        null === m3 && (m3 = x2);
        break;
      }
      a && m3 && null === t3.alternate && b(e2, m3);
      g2 = f2(t3, g2, w2);
      null === u2 ? l3 = t3 : u2.sibling = t3;
      u2 = t3;
      m3 = x2;
    }
    if (n3.done) return c(
      e2,
      m3
    ), I && tg(e2, w2), l3;
    if (null === m3) {
      for (; !n3.done; w2++, n3 = h2.next()) n3 = q2(e2, n3.value, k3), null !== n3 && (g2 = f2(n3, g2, w2), null === u2 ? l3 = n3 : u2.sibling = n3, u2 = n3);
      I && tg(e2, w2);
      return l3;
    }
    for (m3 = d(e2, m3); !n3.done; w2++, n3 = h2.next()) n3 = y2(m3, e2, w2, n3.value, k3), null !== n3 && (a && null !== n3.alternate && m3.delete(null === n3.key ? w2 : n3.key), g2 = f2(n3, g2, w2), null === u2 ? l3 = n3 : u2.sibling = n3, u2 = n3);
    a && m3.forEach(function(a2) {
      return b(e2, a2);
    });
    I && tg(e2, w2);
    return l3;
  }
  function J2(a2, d2, f3, h2) {
    "object" === typeof f3 && null !== f3 && f3.type === ya && null === f3.key && (f3 = f3.props.children);
    if ("object" === typeof f3 && null !== f3) {
      switch (f3.$$typeof) {
        case va:
          a: {
            for (var k3 = f3.key, l3 = d2; null !== l3; ) {
              if (l3.key === k3) {
                k3 = f3.type;
                if (k3 === ya) {
                  if (7 === l3.tag) {
                    c(a2, l3.sibling);
                    d2 = e(l3, f3.props.children);
                    d2.return = a2;
                    a2 = d2;
                    break a;
                  }
                } else if (l3.elementType === k3 || "object" === typeof k3 && null !== k3 && k3.$$typeof === Ha && Ng(k3) === l3.type) {
                  c(a2, l3.sibling);
                  d2 = e(l3, f3.props);
                  d2.ref = Lg(a2, l3, f3);
                  d2.return = a2;
                  a2 = d2;
                  break a;
                }
                c(a2, l3);
                break;
              } else b(a2, l3);
              l3 = l3.sibling;
            }
            f3.type === ya ? (d2 = Tg(f3.props.children, a2.mode, h2, f3.key), d2.return = a2, a2 = d2) : (h2 = Rg(f3.type, f3.key, f3.props, null, a2.mode, h2), h2.ref = Lg(a2, d2, f3), h2.return = a2, a2 = h2);
          }
          return g(a2);
        case wa:
          a: {
            for (l3 = f3.key; null !== d2; ) {
              if (d2.key === l3) if (4 === d2.tag && d2.stateNode.containerInfo === f3.containerInfo && d2.stateNode.implementation === f3.implementation) {
                c(a2, d2.sibling);
                d2 = e(d2, f3.children || []);
                d2.return = a2;
                a2 = d2;
                break a;
              } else {
                c(a2, d2);
                break;
              }
              else b(a2, d2);
              d2 = d2.sibling;
            }
            d2 = Sg(f3, a2.mode, h2);
            d2.return = a2;
            a2 = d2;
          }
          return g(a2);
        case Ha:
          return l3 = f3._init, J2(a2, d2, l3(f3._payload), h2);
      }
      if (eb(f3)) return n2(a2, d2, f3, h2);
      if (Ka(f3)) return t2(a2, d2, f3, h2);
      Mg(a2, f3);
    }
    return "string" === typeof f3 && "" !== f3 || "number" === typeof f3 ? (f3 = "" + f3, null !== d2 && 6 === d2.tag ? (c(a2, d2.sibling), d2 = e(d2, f3), d2.return = a2, a2 = d2) : (c(a2, d2), d2 = Qg(f3, a2.mode, h2), d2.return = a2, a2 = d2), g(a2)) : c(a2, d2);
  }
  return J2;
}
var Ug = Og(true), Vg = Og(false), Wg = Uf(null), Xg = null, Yg = null, Zg = null;
function $g() {
  Zg = Yg = Xg = null;
}
function ah(a) {
  var b = Wg.current;
  E(Wg);
  a._currentValue = b;
}
function bh(a, b, c) {
  for (; null !== a; ) {
    var d = a.alternate;
    (a.childLanes & b) !== b ? (a.childLanes |= b, null !== d && (d.childLanes |= b)) : null !== d && (d.childLanes & b) !== b && (d.childLanes |= b);
    if (a === c) break;
    a = a.return;
  }
}
function ch(a, b) {
  Xg = a;
  Zg = Yg = null;
  a = a.dependencies;
  null !== a && null !== a.firstContext && (0 !== (a.lanes & b) && (dh = true), a.firstContext = null);
}
function eh(a) {
  var b = a._currentValue;
  if (Zg !== a) if (a = { context: a, memoizedValue: b, next: null }, null === Yg) {
    if (null === Xg) throw Error(p(308));
    Yg = a;
    Xg.dependencies = { lanes: 0, firstContext: a };
  } else Yg = Yg.next = a;
  return b;
}
var fh = null;
function gh(a) {
  null === fh ? fh = [a] : fh.push(a);
}
function hh(a, b, c, d) {
  var e = b.interleaved;
  null === e ? (c.next = c, gh(b)) : (c.next = e.next, e.next = c);
  b.interleaved = c;
  return ih(a, d);
}
function ih(a, b) {
  a.lanes |= b;
  var c = a.alternate;
  null !== c && (c.lanes |= b);
  c = a;
  for (a = a.return; null !== a; ) a.childLanes |= b, c = a.alternate, null !== c && (c.childLanes |= b), c = a, a = a.return;
  return 3 === c.tag ? c.stateNode : null;
}
var jh = false;
function kh(a) {
  a.updateQueue = { baseState: a.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function lh(a, b) {
  a = a.updateQueue;
  b.updateQueue === a && (b.updateQueue = { baseState: a.baseState, firstBaseUpdate: a.firstBaseUpdate, lastBaseUpdate: a.lastBaseUpdate, shared: a.shared, effects: a.effects });
}
function mh(a, b) {
  return { eventTime: a, lane: b, tag: 0, payload: null, callback: null, next: null };
}
function nh(a, b, c) {
  var d = a.updateQueue;
  if (null === d) return null;
  d = d.shared;
  if (0 !== (K & 2)) {
    var e = d.pending;
    null === e ? b.next = b : (b.next = e.next, e.next = b);
    d.pending = b;
    return ih(a, c);
  }
  e = d.interleaved;
  null === e ? (b.next = b, gh(d)) : (b.next = e.next, e.next = b);
  d.interleaved = b;
  return ih(a, c);
}
function oh(a, b, c) {
  b = b.updateQueue;
  if (null !== b && (b = b.shared, 0 !== (c & 4194240))) {
    var d = b.lanes;
    d &= a.pendingLanes;
    c |= d;
    b.lanes = c;
    Cc(a, c);
  }
}
function ph(a, b) {
  var c = a.updateQueue, d = a.alternate;
  if (null !== d && (d = d.updateQueue, c === d)) {
    var e = null, f2 = null;
    c = c.firstBaseUpdate;
    if (null !== c) {
      do {
        var g = { eventTime: c.eventTime, lane: c.lane, tag: c.tag, payload: c.payload, callback: c.callback, next: null };
        null === f2 ? e = f2 = g : f2 = f2.next = g;
        c = c.next;
      } while (null !== c);
      null === f2 ? e = f2 = b : f2 = f2.next = b;
    } else e = f2 = b;
    c = { baseState: d.baseState, firstBaseUpdate: e, lastBaseUpdate: f2, shared: d.shared, effects: d.effects };
    a.updateQueue = c;
    return;
  }
  a = c.lastBaseUpdate;
  null === a ? c.firstBaseUpdate = b : a.next = b;
  c.lastBaseUpdate = b;
}
function qh(a, b, c, d) {
  var e = a.updateQueue;
  jh = false;
  var f2 = e.firstBaseUpdate, g = e.lastBaseUpdate, h = e.shared.pending;
  if (null !== h) {
    e.shared.pending = null;
    var k2 = h, l2 = k2.next;
    k2.next = null;
    null === g ? f2 = l2 : g.next = l2;
    g = k2;
    var m2 = a.alternate;
    null !== m2 && (m2 = m2.updateQueue, h = m2.lastBaseUpdate, h !== g && (null === h ? m2.firstBaseUpdate = l2 : h.next = l2, m2.lastBaseUpdate = k2));
  }
  if (null !== f2) {
    var q2 = e.baseState;
    g = 0;
    m2 = l2 = k2 = null;
    h = f2;
    do {
      var r2 = h.lane, y2 = h.eventTime;
      if ((d & r2) === r2) {
        null !== m2 && (m2 = m2.next = {
          eventTime: y2,
          lane: 0,
          tag: h.tag,
          payload: h.payload,
          callback: h.callback,
          next: null
        });
        a: {
          var n2 = a, t2 = h;
          r2 = b;
          y2 = c;
          switch (t2.tag) {
            case 1:
              n2 = t2.payload;
              if ("function" === typeof n2) {
                q2 = n2.call(y2, q2, r2);
                break a;
              }
              q2 = n2;
              break a;
            case 3:
              n2.flags = n2.flags & -65537 | 128;
            case 0:
              n2 = t2.payload;
              r2 = "function" === typeof n2 ? n2.call(y2, q2, r2) : n2;
              if (null === r2 || void 0 === r2) break a;
              q2 = A$1({}, q2, r2);
              break a;
            case 2:
              jh = true;
          }
        }
        null !== h.callback && 0 !== h.lane && (a.flags |= 64, r2 = e.effects, null === r2 ? e.effects = [h] : r2.push(h));
      } else y2 = { eventTime: y2, lane: r2, tag: h.tag, payload: h.payload, callback: h.callback, next: null }, null === m2 ? (l2 = m2 = y2, k2 = q2) : m2 = m2.next = y2, g |= r2;
      h = h.next;
      if (null === h) if (h = e.shared.pending, null === h) break;
      else r2 = h, h = r2.next, r2.next = null, e.lastBaseUpdate = r2, e.shared.pending = null;
    } while (1);
    null === m2 && (k2 = q2);
    e.baseState = k2;
    e.firstBaseUpdate = l2;
    e.lastBaseUpdate = m2;
    b = e.shared.interleaved;
    if (null !== b) {
      e = b;
      do
        g |= e.lane, e = e.next;
      while (e !== b);
    } else null === f2 && (e.shared.lanes = 0);
    rh |= g;
    a.lanes = g;
    a.memoizedState = q2;
  }
}
function sh(a, b, c) {
  a = b.effects;
  b.effects = null;
  if (null !== a) for (b = 0; b < a.length; b++) {
    var d = a[b], e = d.callback;
    if (null !== e) {
      d.callback = null;
      d = c;
      if ("function" !== typeof e) throw Error(p(191, e));
      e.call(d);
    }
  }
}
var th = {}, uh = Uf(th), vh = Uf(th), wh = Uf(th);
function xh(a) {
  if (a === th) throw Error(p(174));
  return a;
}
function yh(a, b) {
  G(wh, b);
  G(vh, a);
  G(uh, th);
  a = b.nodeType;
  switch (a) {
    case 9:
    case 11:
      b = (b = b.documentElement) ? b.namespaceURI : lb(null, "");
      break;
    default:
      a = 8 === a ? b.parentNode : b, b = a.namespaceURI || null, a = a.tagName, b = lb(b, a);
  }
  E(uh);
  G(uh, b);
}
function zh() {
  E(uh);
  E(vh);
  E(wh);
}
function Ah(a) {
  xh(wh.current);
  var b = xh(uh.current);
  var c = lb(b, a.type);
  b !== c && (G(vh, a), G(uh, c));
}
function Bh(a) {
  vh.current === a && (E(uh), E(vh));
}
var L = Uf(0);
function Ch(a) {
  for (var b = a; null !== b; ) {
    if (13 === b.tag) {
      var c = b.memoizedState;
      if (null !== c && (c = c.dehydrated, null === c || "$?" === c.data || "$!" === c.data)) return b;
    } else if (19 === b.tag && void 0 !== b.memoizedProps.revealOrder) {
      if (0 !== (b.flags & 128)) return b;
    } else if (null !== b.child) {
      b.child.return = b;
      b = b.child;
      continue;
    }
    if (b === a) break;
    for (; null === b.sibling; ) {
      if (null === b.return || b.return === a) return null;
      b = b.return;
    }
    b.sibling.return = b.return;
    b = b.sibling;
  }
  return null;
}
var Dh = [];
function Eh() {
  for (var a = 0; a < Dh.length; a++) Dh[a]._workInProgressVersionPrimary = null;
  Dh.length = 0;
}
var Fh = ua.ReactCurrentDispatcher, Gh = ua.ReactCurrentBatchConfig, Hh = 0, M = null, N = null, O = null, Ih = false, Jh = false, Kh = 0, Lh = 0;
function P$1() {
  throw Error(p(321));
}
function Mh(a, b) {
  if (null === b) return false;
  for (var c = 0; c < b.length && c < a.length; c++) if (!He$1(a[c], b[c])) return false;
  return true;
}
function Nh(a, b, c, d, e, f2) {
  Hh = f2;
  M = b;
  b.memoizedState = null;
  b.updateQueue = null;
  b.lanes = 0;
  Fh.current = null === a || null === a.memoizedState ? Oh : Ph;
  a = c(d, e);
  if (Jh) {
    f2 = 0;
    do {
      Jh = false;
      Kh = 0;
      if (25 <= f2) throw Error(p(301));
      f2 += 1;
      O = N = null;
      b.updateQueue = null;
      Fh.current = Qh;
      a = c(d, e);
    } while (Jh);
  }
  Fh.current = Rh;
  b = null !== N && null !== N.next;
  Hh = 0;
  O = N = M = null;
  Ih = false;
  if (b) throw Error(p(300));
  return a;
}
function Sh() {
  var a = 0 !== Kh;
  Kh = 0;
  return a;
}
function Th() {
  var a = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  null === O ? M.memoizedState = O = a : O = O.next = a;
  return O;
}
function Uh() {
  if (null === N) {
    var a = M.alternate;
    a = null !== a ? a.memoizedState : null;
  } else a = N.next;
  var b = null === O ? M.memoizedState : O.next;
  if (null !== b) O = b, N = a;
  else {
    if (null === a) throw Error(p(310));
    N = a;
    a = { memoizedState: N.memoizedState, baseState: N.baseState, baseQueue: N.baseQueue, queue: N.queue, next: null };
    null === O ? M.memoizedState = O = a : O = O.next = a;
  }
  return O;
}
function Vh(a, b) {
  return "function" === typeof b ? b(a) : b;
}
function Wh(a) {
  var b = Uh(), c = b.queue;
  if (null === c) throw Error(p(311));
  c.lastRenderedReducer = a;
  var d = N, e = d.baseQueue, f2 = c.pending;
  if (null !== f2) {
    if (null !== e) {
      var g = e.next;
      e.next = f2.next;
      f2.next = g;
    }
    d.baseQueue = e = f2;
    c.pending = null;
  }
  if (null !== e) {
    f2 = e.next;
    d = d.baseState;
    var h = g = null, k2 = null, l2 = f2;
    do {
      var m2 = l2.lane;
      if ((Hh & m2) === m2) null !== k2 && (k2 = k2.next = { lane: 0, action: l2.action, hasEagerState: l2.hasEagerState, eagerState: l2.eagerState, next: null }), d = l2.hasEagerState ? l2.eagerState : a(d, l2.action);
      else {
        var q2 = {
          lane: m2,
          action: l2.action,
          hasEagerState: l2.hasEagerState,
          eagerState: l2.eagerState,
          next: null
        };
        null === k2 ? (h = k2 = q2, g = d) : k2 = k2.next = q2;
        M.lanes |= m2;
        rh |= m2;
      }
      l2 = l2.next;
    } while (null !== l2 && l2 !== f2);
    null === k2 ? g = d : k2.next = h;
    He$1(d, b.memoizedState) || (dh = true);
    b.memoizedState = d;
    b.baseState = g;
    b.baseQueue = k2;
    c.lastRenderedState = d;
  }
  a = c.interleaved;
  if (null !== a) {
    e = a;
    do
      f2 = e.lane, M.lanes |= f2, rh |= f2, e = e.next;
    while (e !== a);
  } else null === e && (c.lanes = 0);
  return [b.memoizedState, c.dispatch];
}
function Xh(a) {
  var b = Uh(), c = b.queue;
  if (null === c) throw Error(p(311));
  c.lastRenderedReducer = a;
  var d = c.dispatch, e = c.pending, f2 = b.memoizedState;
  if (null !== e) {
    c.pending = null;
    var g = e = e.next;
    do
      f2 = a(f2, g.action), g = g.next;
    while (g !== e);
    He$1(f2, b.memoizedState) || (dh = true);
    b.memoizedState = f2;
    null === b.baseQueue && (b.baseState = f2);
    c.lastRenderedState = f2;
  }
  return [f2, d];
}
function Yh() {
}
function Zh(a, b) {
  var c = M, d = Uh(), e = b(), f2 = !He$1(d.memoizedState, e);
  f2 && (d.memoizedState = e, dh = true);
  d = d.queue;
  $h(ai.bind(null, c, d, a), [a]);
  if (d.getSnapshot !== b || f2 || null !== O && O.memoizedState.tag & 1) {
    c.flags |= 2048;
    bi(9, ci.bind(null, c, d, e, b), void 0, null);
    if (null === Q) throw Error(p(349));
    0 !== (Hh & 30) || di(c, b, e);
  }
  return e;
}
function di(a, b, c) {
  a.flags |= 16384;
  a = { getSnapshot: b, value: c };
  b = M.updateQueue;
  null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.stores = [a]) : (c = b.stores, null === c ? b.stores = [a] : c.push(a));
}
function ci(a, b, c, d) {
  b.value = c;
  b.getSnapshot = d;
  ei(b) && fi(a);
}
function ai(a, b, c) {
  return c(function() {
    ei(b) && fi(a);
  });
}
function ei(a) {
  var b = a.getSnapshot;
  a = a.value;
  try {
    var c = b();
    return !He$1(a, c);
  } catch (d) {
    return true;
  }
}
function fi(a) {
  var b = ih(a, 1);
  null !== b && gi(b, a, 1, -1);
}
function hi(a) {
  var b = Th();
  "function" === typeof a && (a = a());
  b.memoizedState = b.baseState = a;
  a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Vh, lastRenderedState: a };
  b.queue = a;
  a = a.dispatch = ii.bind(null, M, a);
  return [b.memoizedState, a];
}
function bi(a, b, c, d) {
  a = { tag: a, create: b, destroy: c, deps: d, next: null };
  b = M.updateQueue;
  null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.lastEffect = a.next = a) : (c = b.lastEffect, null === c ? b.lastEffect = a.next = a : (d = c.next, c.next = a, a.next = d, b.lastEffect = a));
  return a;
}
function ji() {
  return Uh().memoizedState;
}
function ki(a, b, c, d) {
  var e = Th();
  M.flags |= a;
  e.memoizedState = bi(1 | b, c, void 0, void 0 === d ? null : d);
}
function li(a, b, c, d) {
  var e = Uh();
  d = void 0 === d ? null : d;
  var f2 = void 0;
  if (null !== N) {
    var g = N.memoizedState;
    f2 = g.destroy;
    if (null !== d && Mh(d, g.deps)) {
      e.memoizedState = bi(b, c, f2, d);
      return;
    }
  }
  M.flags |= a;
  e.memoizedState = bi(1 | b, c, f2, d);
}
function mi(a, b) {
  return ki(8390656, 8, a, b);
}
function $h(a, b) {
  return li(2048, 8, a, b);
}
function ni(a, b) {
  return li(4, 2, a, b);
}
function oi(a, b) {
  return li(4, 4, a, b);
}
function pi(a, b) {
  if ("function" === typeof b) return a = a(), b(a), function() {
    b(null);
  };
  if (null !== b && void 0 !== b) return a = a(), b.current = a, function() {
    b.current = null;
  };
}
function qi(a, b, c) {
  c = null !== c && void 0 !== c ? c.concat([a]) : null;
  return li(4, 4, pi.bind(null, b, a), c);
}
function ri() {
}
function si(a, b) {
  var c = Uh();
  b = void 0 === b ? null : b;
  var d = c.memoizedState;
  if (null !== d && null !== b && Mh(b, d[1])) return d[0];
  c.memoizedState = [a, b];
  return a;
}
function ti(a, b) {
  var c = Uh();
  b = void 0 === b ? null : b;
  var d = c.memoizedState;
  if (null !== d && null !== b && Mh(b, d[1])) return d[0];
  a = a();
  c.memoizedState = [a, b];
  return a;
}
function ui(a, b, c) {
  if (0 === (Hh & 21)) return a.baseState && (a.baseState = false, dh = true), a.memoizedState = c;
  He$1(c, b) || (c = yc(), M.lanes |= c, rh |= c, a.baseState = true);
  return b;
}
function vi(a, b) {
  var c = C;
  C = 0 !== c && 4 > c ? c : 4;
  a(true);
  var d = Gh.transition;
  Gh.transition = {};
  try {
    a(false), b();
  } finally {
    C = c, Gh.transition = d;
  }
}
function wi() {
  return Uh().memoizedState;
}
function xi(a, b, c) {
  var d = yi(a);
  c = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
  if (zi(a)) Ai(b, c);
  else if (c = hh(a, b, c, d), null !== c) {
    var e = R();
    gi(c, a, d, e);
    Bi(c, b, d);
  }
}
function ii(a, b, c) {
  var d = yi(a), e = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
  if (zi(a)) Ai(b, e);
  else {
    var f2 = a.alternate;
    if (0 === a.lanes && (null === f2 || 0 === f2.lanes) && (f2 = b.lastRenderedReducer, null !== f2)) try {
      var g = b.lastRenderedState, h = f2(g, c);
      e.hasEagerState = true;
      e.eagerState = h;
      if (He$1(h, g)) {
        var k2 = b.interleaved;
        null === k2 ? (e.next = e, gh(b)) : (e.next = k2.next, k2.next = e);
        b.interleaved = e;
        return;
      }
    } catch (l2) {
    } finally {
    }
    c = hh(a, b, e, d);
    null !== c && (e = R(), gi(c, a, d, e), Bi(c, b, d));
  }
}
function zi(a) {
  var b = a.alternate;
  return a === M || null !== b && b === M;
}
function Ai(a, b) {
  Jh = Ih = true;
  var c = a.pending;
  null === c ? b.next = b : (b.next = c.next, c.next = b);
  a.pending = b;
}
function Bi(a, b, c) {
  if (0 !== (c & 4194240)) {
    var d = b.lanes;
    d &= a.pendingLanes;
    c |= d;
    b.lanes = c;
    Cc(a, c);
  }
}
var Rh = { readContext: eh, useCallback: P$1, useContext: P$1, useEffect: P$1, useImperativeHandle: P$1, useInsertionEffect: P$1, useLayoutEffect: P$1, useMemo: P$1, useReducer: P$1, useRef: P$1, useState: P$1, useDebugValue: P$1, useDeferredValue: P$1, useTransition: P$1, useMutableSource: P$1, useSyncExternalStore: P$1, useId: P$1, unstable_isNewReconciler: false }, Oh = { readContext: eh, useCallback: function(a, b) {
  Th().memoizedState = [a, void 0 === b ? null : b];
  return a;
}, useContext: eh, useEffect: mi, useImperativeHandle: function(a, b, c) {
  c = null !== c && void 0 !== c ? c.concat([a]) : null;
  return ki(
    4194308,
    4,
    pi.bind(null, b, a),
    c
  );
}, useLayoutEffect: function(a, b) {
  return ki(4194308, 4, a, b);
}, useInsertionEffect: function(a, b) {
  return ki(4, 2, a, b);
}, useMemo: function(a, b) {
  var c = Th();
  b = void 0 === b ? null : b;
  a = a();
  c.memoizedState = [a, b];
  return a;
}, useReducer: function(a, b, c) {
  var d = Th();
  b = void 0 !== c ? c(b) : b;
  d.memoizedState = d.baseState = b;
  a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: a, lastRenderedState: b };
  d.queue = a;
  a = a.dispatch = xi.bind(null, M, a);
  return [d.memoizedState, a];
}, useRef: function(a) {
  var b = Th();
  a = { current: a };
  return b.memoizedState = a;
}, useState: hi, useDebugValue: ri, useDeferredValue: function(a) {
  return Th().memoizedState = a;
}, useTransition: function() {
  var a = hi(false), b = a[0];
  a = vi.bind(null, a[1]);
  Th().memoizedState = a;
  return [b, a];
}, useMutableSource: function() {
}, useSyncExternalStore: function(a, b, c) {
  var d = M, e = Th();
  if (I) {
    if (void 0 === c) throw Error(p(407));
    c = c();
  } else {
    c = b();
    if (null === Q) throw Error(p(349));
    0 !== (Hh & 30) || di(d, b, c);
  }
  e.memoizedState = c;
  var f2 = { value: c, getSnapshot: b };
  e.queue = f2;
  mi(ai.bind(
    null,
    d,
    f2,
    a
  ), [a]);
  d.flags |= 2048;
  bi(9, ci.bind(null, d, f2, c, b), void 0, null);
  return c;
}, useId: function() {
  var a = Th(), b = Q.identifierPrefix;
  if (I) {
    var c = sg;
    var d = rg;
    c = (d & ~(1 << 32 - oc(d) - 1)).toString(32) + c;
    b = ":" + b + "R" + c;
    c = Kh++;
    0 < c && (b += "H" + c.toString(32));
    b += ":";
  } else c = Lh++, b = ":" + b + "r" + c.toString(32) + ":";
  return a.memoizedState = b;
}, unstable_isNewReconciler: false }, Ph = {
  readContext: eh,
  useCallback: si,
  useContext: eh,
  useEffect: $h,
  useImperativeHandle: qi,
  useInsertionEffect: ni,
  useLayoutEffect: oi,
  useMemo: ti,
  useReducer: Wh,
  useRef: ji,
  useState: function() {
    return Wh(Vh);
  },
  useDebugValue: ri,
  useDeferredValue: function(a) {
    var b = Uh();
    return ui(b, N.memoizedState, a);
  },
  useTransition: function() {
    var a = Wh(Vh)[0], b = Uh().memoizedState;
    return [a, b];
  },
  useMutableSource: Yh,
  useSyncExternalStore: Zh,
  useId: wi,
  unstable_isNewReconciler: false
}, Qh = { readContext: eh, useCallback: si, useContext: eh, useEffect: $h, useImperativeHandle: qi, useInsertionEffect: ni, useLayoutEffect: oi, useMemo: ti, useReducer: Xh, useRef: ji, useState: function() {
  return Xh(Vh);
}, useDebugValue: ri, useDeferredValue: function(a) {
  var b = Uh();
  return null === N ? b.memoizedState = a : ui(b, N.memoizedState, a);
}, useTransition: function() {
  var a = Xh(Vh)[0], b = Uh().memoizedState;
  return [a, b];
}, useMutableSource: Yh, useSyncExternalStore: Zh, useId: wi, unstable_isNewReconciler: false };
function Ci(a, b) {
  if (a && a.defaultProps) {
    b = A$1({}, b);
    a = a.defaultProps;
    for (var c in a) void 0 === b[c] && (b[c] = a[c]);
    return b;
  }
  return b;
}
function Di(a, b, c, d) {
  b = a.memoizedState;
  c = c(d, b);
  c = null === c || void 0 === c ? b : A$1({}, b, c);
  a.memoizedState = c;
  0 === a.lanes && (a.updateQueue.baseState = c);
}
var Ei = { isMounted: function(a) {
  return (a = a._reactInternals) ? Vb(a) === a : false;
}, enqueueSetState: function(a, b, c) {
  a = a._reactInternals;
  var d = R(), e = yi(a), f2 = mh(d, e);
  f2.payload = b;
  void 0 !== c && null !== c && (f2.callback = c);
  b = nh(a, f2, e);
  null !== b && (gi(b, a, e, d), oh(b, a, e));
}, enqueueReplaceState: function(a, b, c) {
  a = a._reactInternals;
  var d = R(), e = yi(a), f2 = mh(d, e);
  f2.tag = 1;
  f2.payload = b;
  void 0 !== c && null !== c && (f2.callback = c);
  b = nh(a, f2, e);
  null !== b && (gi(b, a, e, d), oh(b, a, e));
}, enqueueForceUpdate: function(a, b) {
  a = a._reactInternals;
  var c = R(), d = yi(a), e = mh(c, d);
  e.tag = 2;
  void 0 !== b && null !== b && (e.callback = b);
  b = nh(a, e, d);
  null !== b && (gi(b, a, d, c), oh(b, a, d));
} };
function Fi(a, b, c, d, e, f2, g) {
  a = a.stateNode;
  return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f2, g) : b.prototype && b.prototype.isPureReactComponent ? !Ie$1(c, d) || !Ie$1(e, f2) : true;
}
function Gi(a, b, c) {
  var d = false, e = Vf;
  var f2 = b.contextType;
  "object" === typeof f2 && null !== f2 ? f2 = eh(f2) : (e = Zf(b) ? Xf : H.current, d = b.contextTypes, f2 = (d = null !== d && void 0 !== d) ? Yf(a, e) : Vf);
  b = new b(c, f2);
  a.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
  b.updater = Ei;
  a.stateNode = b;
  b._reactInternals = a;
  d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f2);
  return b;
}
function Hi(a, b, c, d) {
  a = b.state;
  "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);
  "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);
  b.state !== a && Ei.enqueueReplaceState(b, b.state, null);
}
function Ii(a, b, c, d) {
  var e = a.stateNode;
  e.props = c;
  e.state = a.memoizedState;
  e.refs = {};
  kh(a);
  var f2 = b.contextType;
  "object" === typeof f2 && null !== f2 ? e.context = eh(f2) : (f2 = Zf(b) ? Xf : H.current, e.context = Yf(a, f2));
  e.state = a.memoizedState;
  f2 = b.getDerivedStateFromProps;
  "function" === typeof f2 && (Di(a, b, f2, c), e.state = a.memoizedState);
  "function" === typeof b.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b !== e.state && Ei.enqueueReplaceState(e, e.state, null), qh(a, c, e, d), e.state = a.memoizedState);
  "function" === typeof e.componentDidMount && (a.flags |= 4194308);
}
function Ji(a, b) {
  try {
    var c = "", d = b;
    do
      c += Pa(d), d = d.return;
    while (d);
    var e = c;
  } catch (f2) {
    e = "\nError generating stack: " + f2.message + "\n" + f2.stack;
  }
  return { value: a, source: b, stack: e, digest: null };
}
function Ki(a, b, c) {
  return { value: a, source: null, stack: null != c ? c : null, digest: null != b ? b : null };
}
function Li(a, b) {
  try {
    console.error(b.value);
  } catch (c) {
    setTimeout(function() {
      throw c;
    });
  }
}
var Mi = "function" === typeof WeakMap ? WeakMap : Map;
function Ni(a, b, c) {
  c = mh(-1, c);
  c.tag = 3;
  c.payload = { element: null };
  var d = b.value;
  c.callback = function() {
    Oi || (Oi = true, Pi = d);
    Li(a, b);
  };
  return c;
}
function Qi(a, b, c) {
  c = mh(-1, c);
  c.tag = 3;
  var d = a.type.getDerivedStateFromError;
  if ("function" === typeof d) {
    var e = b.value;
    c.payload = function() {
      return d(e);
    };
    c.callback = function() {
      Li(a, b);
    };
  }
  var f2 = a.stateNode;
  null !== f2 && "function" === typeof f2.componentDidCatch && (c.callback = function() {
    Li(a, b);
    "function" !== typeof d && (null === Ri ? Ri = /* @__PURE__ */ new Set([this]) : Ri.add(this));
    var c2 = b.stack;
    this.componentDidCatch(b.value, { componentStack: null !== c2 ? c2 : "" });
  });
  return c;
}
function Si(a, b, c) {
  var d = a.pingCache;
  if (null === d) {
    d = a.pingCache = new Mi();
    var e = /* @__PURE__ */ new Set();
    d.set(b, e);
  } else e = d.get(b), void 0 === e && (e = /* @__PURE__ */ new Set(), d.set(b, e));
  e.has(c) || (e.add(c), a = Ti.bind(null, a, b, c), b.then(a, a));
}
function Ui(a) {
  do {
    var b;
    if (b = 13 === a.tag) b = a.memoizedState, b = null !== b ? null !== b.dehydrated ? true : false : true;
    if (b) return a;
    a = a.return;
  } while (null !== a);
  return null;
}
function Vi(a, b, c, d, e) {
  if (0 === (a.mode & 1)) return a === b ? a.flags |= 65536 : (a.flags |= 128, c.flags |= 131072, c.flags &= -52805, 1 === c.tag && (null === c.alternate ? c.tag = 17 : (b = mh(-1, 1), b.tag = 2, nh(c, b, 1))), c.lanes |= 1), a;
  a.flags |= 65536;
  a.lanes = e;
  return a;
}
var Wi = ua.ReactCurrentOwner, dh = false;
function Xi(a, b, c, d) {
  b.child = null === a ? Vg(b, null, c, d) : Ug(b, a.child, c, d);
}
function Yi(a, b, c, d, e) {
  c = c.render;
  var f2 = b.ref;
  ch(b, e);
  d = Nh(a, b, c, d, f2, e);
  c = Sh();
  if (null !== a && !dh) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e);
  I && c && vg(b);
  b.flags |= 1;
  Xi(a, b, d, e);
  return b.child;
}
function $i(a, b, c, d, e) {
  if (null === a) {
    var f2 = c.type;
    if ("function" === typeof f2 && !aj(f2) && void 0 === f2.defaultProps && null === c.compare && void 0 === c.defaultProps) return b.tag = 15, b.type = f2, bj(a, b, f2, d, e);
    a = Rg(c.type, null, d, b, b.mode, e);
    a.ref = b.ref;
    a.return = b;
    return b.child = a;
  }
  f2 = a.child;
  if (0 === (a.lanes & e)) {
    var g = f2.memoizedProps;
    c = c.compare;
    c = null !== c ? c : Ie$1;
    if (c(g, d) && a.ref === b.ref) return Zi(a, b, e);
  }
  b.flags |= 1;
  a = Pg(f2, d);
  a.ref = b.ref;
  a.return = b;
  return b.child = a;
}
function bj(a, b, c, d, e) {
  if (null !== a) {
    var f2 = a.memoizedProps;
    if (Ie$1(f2, d) && a.ref === b.ref) if (dh = false, b.pendingProps = d = f2, 0 !== (a.lanes & e)) 0 !== (a.flags & 131072) && (dh = true);
    else return b.lanes = a.lanes, Zi(a, b, e);
  }
  return cj(a, b, c, d, e);
}
function dj(a, b, c) {
  var d = b.pendingProps, e = d.children, f2 = null !== a ? a.memoizedState : null;
  if ("hidden" === d.mode) if (0 === (b.mode & 1)) b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, G(ej, fj), fj |= c;
  else {
    if (0 === (c & 1073741824)) return a = null !== f2 ? f2.baseLanes | c : c, b.lanes = b.childLanes = 1073741824, b.memoizedState = { baseLanes: a, cachePool: null, transitions: null }, b.updateQueue = null, G(ej, fj), fj |= a, null;
    b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null };
    d = null !== f2 ? f2.baseLanes : c;
    G(ej, fj);
    fj |= d;
  }
  else null !== f2 ? (d = f2.baseLanes | c, b.memoizedState = null) : d = c, G(ej, fj), fj |= d;
  Xi(a, b, e, c);
  return b.child;
}
function gj(a, b) {
  var c = b.ref;
  if (null === a && null !== c || null !== a && a.ref !== c) b.flags |= 512, b.flags |= 2097152;
}
function cj(a, b, c, d, e) {
  var f2 = Zf(c) ? Xf : H.current;
  f2 = Yf(b, f2);
  ch(b, e);
  c = Nh(a, b, c, d, f2, e);
  d = Sh();
  if (null !== a && !dh) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e);
  I && d && vg(b);
  b.flags |= 1;
  Xi(a, b, c, e);
  return b.child;
}
function hj(a, b, c, d, e) {
  if (Zf(c)) {
    var f2 = true;
    cg(b);
  } else f2 = false;
  ch(b, e);
  if (null === b.stateNode) ij(a, b), Gi(b, c, d), Ii(b, c, d, e), d = true;
  else if (null === a) {
    var g = b.stateNode, h = b.memoizedProps;
    g.props = h;
    var k2 = g.context, l2 = c.contextType;
    "object" === typeof l2 && null !== l2 ? l2 = eh(l2) : (l2 = Zf(c) ? Xf : H.current, l2 = Yf(b, l2));
    var m2 = c.getDerivedStateFromProps, q2 = "function" === typeof m2 || "function" === typeof g.getSnapshotBeforeUpdate;
    q2 || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || k2 !== l2) && Hi(b, g, d, l2);
    jh = false;
    var r2 = b.memoizedState;
    g.state = r2;
    qh(b, d, g, e);
    k2 = b.memoizedState;
    h !== d || r2 !== k2 || Wf.current || jh ? ("function" === typeof m2 && (Di(b, c, m2, d), k2 = b.memoizedState), (h = jh || Fi(b, c, h, d, r2, k2, l2)) ? (q2 || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.flags |= 4194308)) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), b.memoizedProps = d, b.memoizedState = k2), g.props = d, g.state = k2, g.context = l2, d = h) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), d = false);
  } else {
    g = b.stateNode;
    lh(a, b);
    h = b.memoizedProps;
    l2 = b.type === b.elementType ? h : Ci(b.type, h);
    g.props = l2;
    q2 = b.pendingProps;
    r2 = g.context;
    k2 = c.contextType;
    "object" === typeof k2 && null !== k2 ? k2 = eh(k2) : (k2 = Zf(c) ? Xf : H.current, k2 = Yf(b, k2));
    var y2 = c.getDerivedStateFromProps;
    (m2 = "function" === typeof y2 || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== q2 || r2 !== k2) && Hi(b, g, d, k2);
    jh = false;
    r2 = b.memoizedState;
    g.state = r2;
    qh(b, d, g, e);
    var n2 = b.memoizedState;
    h !== q2 || r2 !== n2 || Wf.current || jh ? ("function" === typeof y2 && (Di(b, c, y2, d), n2 = b.memoizedState), (l2 = jh || Fi(b, c, l2, d, r2, n2, k2) || false) ? (m2 || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d, n2, k2), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, n2, k2)), "function" === typeof g.componentDidUpdate && (b.flags |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.flags |= 1024)) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 1024), b.memoizedProps = d, b.memoizedState = n2), g.props = d, g.state = n2, g.context = k2, d = l2) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 1024), d = false);
  }
  return jj(a, b, c, d, f2, e);
}
function jj(a, b, c, d, e, f2) {
  gj(a, b);
  var g = 0 !== (b.flags & 128);
  if (!d && !g) return e && dg(b, c, false), Zi(a, b, f2);
  d = b.stateNode;
  Wi.current = b;
  var h = g && "function" !== typeof c.getDerivedStateFromError ? null : d.render();
  b.flags |= 1;
  null !== a && g ? (b.child = Ug(b, a.child, null, f2), b.child = Ug(b, null, h, f2)) : Xi(a, b, h, f2);
  b.memoizedState = d.state;
  e && dg(b, c, true);
  return b.child;
}
function kj(a) {
  var b = a.stateNode;
  b.pendingContext ? ag(a, b.pendingContext, b.pendingContext !== b.context) : b.context && ag(a, b.context, false);
  yh(a, b.containerInfo);
}
function lj(a, b, c, d, e) {
  Ig();
  Jg(e);
  b.flags |= 256;
  Xi(a, b, c, d);
  return b.child;
}
var mj = { dehydrated: null, treeContext: null, retryLane: 0 };
function nj(a) {
  return { baseLanes: a, cachePool: null, transitions: null };
}
function oj(a, b, c) {
  var d = b.pendingProps, e = L.current, f2 = false, g = 0 !== (b.flags & 128), h;
  (h = g) || (h = null !== a && null === a.memoizedState ? false : 0 !== (e & 2));
  if (h) f2 = true, b.flags &= -129;
  else if (null === a || null !== a.memoizedState) e |= 1;
  G(L, e & 1);
  if (null === a) {
    Eg(b);
    a = b.memoizedState;
    if (null !== a && (a = a.dehydrated, null !== a)) return 0 === (b.mode & 1) ? b.lanes = 1 : "$!" === a.data ? b.lanes = 8 : b.lanes = 1073741824, null;
    g = d.children;
    a = d.fallback;
    return f2 ? (d = b.mode, f2 = b.child, g = { mode: "hidden", children: g }, 0 === (d & 1) && null !== f2 ? (f2.childLanes = 0, f2.pendingProps = g) : f2 = pj(g, d, 0, null), a = Tg(a, d, c, null), f2.return = b, a.return = b, f2.sibling = a, b.child = f2, b.child.memoizedState = nj(c), b.memoizedState = mj, a) : qj(b, g);
  }
  e = a.memoizedState;
  if (null !== e && (h = e.dehydrated, null !== h)) return rj(a, b, g, d, h, e, c);
  if (f2) {
    f2 = d.fallback;
    g = b.mode;
    e = a.child;
    h = e.sibling;
    var k2 = { mode: "hidden", children: d.children };
    0 === (g & 1) && b.child !== e ? (d = b.child, d.childLanes = 0, d.pendingProps = k2, b.deletions = null) : (d = Pg(e, k2), d.subtreeFlags = e.subtreeFlags & 14680064);
    null !== h ? f2 = Pg(h, f2) : (f2 = Tg(f2, g, c, null), f2.flags |= 2);
    f2.return = b;
    d.return = b;
    d.sibling = f2;
    b.child = d;
    d = f2;
    f2 = b.child;
    g = a.child.memoizedState;
    g = null === g ? nj(c) : { baseLanes: g.baseLanes | c, cachePool: null, transitions: g.transitions };
    f2.memoizedState = g;
    f2.childLanes = a.childLanes & ~c;
    b.memoizedState = mj;
    return d;
  }
  f2 = a.child;
  a = f2.sibling;
  d = Pg(f2, { mode: "visible", children: d.children });
  0 === (b.mode & 1) && (d.lanes = c);
  d.return = b;
  d.sibling = null;
  null !== a && (c = b.deletions, null === c ? (b.deletions = [a], b.flags |= 16) : c.push(a));
  b.child = d;
  b.memoizedState = null;
  return d;
}
function qj(a, b) {
  b = pj({ mode: "visible", children: b }, a.mode, 0, null);
  b.return = a;
  return a.child = b;
}
function sj(a, b, c, d) {
  null !== d && Jg(d);
  Ug(b, a.child, null, c);
  a = qj(b, b.pendingProps.children);
  a.flags |= 2;
  b.memoizedState = null;
  return a;
}
function rj(a, b, c, d, e, f2, g) {
  if (c) {
    if (b.flags & 256) return b.flags &= -257, d = Ki(Error(p(422))), sj(a, b, g, d);
    if (null !== b.memoizedState) return b.child = a.child, b.flags |= 128, null;
    f2 = d.fallback;
    e = b.mode;
    d = pj({ mode: "visible", children: d.children }, e, 0, null);
    f2 = Tg(f2, e, g, null);
    f2.flags |= 2;
    d.return = b;
    f2.return = b;
    d.sibling = f2;
    b.child = d;
    0 !== (b.mode & 1) && Ug(b, a.child, null, g);
    b.child.memoizedState = nj(g);
    b.memoizedState = mj;
    return f2;
  }
  if (0 === (b.mode & 1)) return sj(a, b, g, null);
  if ("$!" === e.data) {
    d = e.nextSibling && e.nextSibling.dataset;
    if (d) var h = d.dgst;
    d = h;
    f2 = Error(p(419));
    d = Ki(f2, d, void 0);
    return sj(a, b, g, d);
  }
  h = 0 !== (g & a.childLanes);
  if (dh || h) {
    d = Q;
    if (null !== d) {
      switch (g & -g) {
        case 4:
          e = 2;
          break;
        case 16:
          e = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          e = 32;
          break;
        case 536870912:
          e = 268435456;
          break;
        default:
          e = 0;
      }
      e = 0 !== (e & (d.suspendedLanes | g)) ? 0 : e;
      0 !== e && e !== f2.retryLane && (f2.retryLane = e, ih(a, e), gi(d, a, e, -1));
    }
    tj();
    d = Ki(Error(p(421)));
    return sj(a, b, g, d);
  }
  if ("$?" === e.data) return b.flags |= 128, b.child = a.child, b = uj.bind(null, a), e._reactRetry = b, null;
  a = f2.treeContext;
  yg = Lf(e.nextSibling);
  xg = b;
  I = true;
  zg = null;
  null !== a && (og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, rg = a.id, sg = a.overflow, qg = b);
  b = qj(b, d.children);
  b.flags |= 4096;
  return b;
}
function vj(a, b, c) {
  a.lanes |= b;
  var d = a.alternate;
  null !== d && (d.lanes |= b);
  bh(a.return, b, c);
}
function wj(a, b, c, d, e) {
  var f2 = a.memoizedState;
  null === f2 ? a.memoizedState = { isBackwards: b, rendering: null, renderingStartTime: 0, last: d, tail: c, tailMode: e } : (f2.isBackwards = b, f2.rendering = null, f2.renderingStartTime = 0, f2.last = d, f2.tail = c, f2.tailMode = e);
}
function xj(a, b, c) {
  var d = b.pendingProps, e = d.revealOrder, f2 = d.tail;
  Xi(a, b, d.children, c);
  d = L.current;
  if (0 !== (d & 2)) d = d & 1 | 2, b.flags |= 128;
  else {
    if (null !== a && 0 !== (a.flags & 128)) a: for (a = b.child; null !== a; ) {
      if (13 === a.tag) null !== a.memoizedState && vj(a, c, b);
      else if (19 === a.tag) vj(a, c, b);
      else if (null !== a.child) {
        a.child.return = a;
        a = a.child;
        continue;
      }
      if (a === b) break a;
      for (; null === a.sibling; ) {
        if (null === a.return || a.return === b) break a;
        a = a.return;
      }
      a.sibling.return = a.return;
      a = a.sibling;
    }
    d &= 1;
  }
  G(L, d);
  if (0 === (b.mode & 1)) b.memoizedState = null;
  else switch (e) {
    case "forwards":
      c = b.child;
      for (e = null; null !== c; ) a = c.alternate, null !== a && null === Ch(a) && (e = c), c = c.sibling;
      c = e;
      null === c ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null);
      wj(b, false, e, c, f2);
      break;
    case "backwards":
      c = null;
      e = b.child;
      for (b.child = null; null !== e; ) {
        a = e.alternate;
        if (null !== a && null === Ch(a)) {
          b.child = e;
          break;
        }
        a = e.sibling;
        e.sibling = c;
        c = e;
        e = a;
      }
      wj(b, true, c, null, f2);
      break;
    case "together":
      wj(b, false, null, null, void 0);
      break;
    default:
      b.memoizedState = null;
  }
  return b.child;
}
function ij(a, b) {
  0 === (b.mode & 1) && null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);
}
function Zi(a, b, c) {
  null !== a && (b.dependencies = a.dependencies);
  rh |= b.lanes;
  if (0 === (c & b.childLanes)) return null;
  if (null !== a && b.child !== a.child) throw Error(p(153));
  if (null !== b.child) {
    a = b.child;
    c = Pg(a, a.pendingProps);
    b.child = c;
    for (c.return = b; null !== a.sibling; ) a = a.sibling, c = c.sibling = Pg(a, a.pendingProps), c.return = b;
    c.sibling = null;
  }
  return b.child;
}
function yj(a, b, c) {
  switch (b.tag) {
    case 3:
      kj(b);
      Ig();
      break;
    case 5:
      Ah(b);
      break;
    case 1:
      Zf(b.type) && cg(b);
      break;
    case 4:
      yh(b, b.stateNode.containerInfo);
      break;
    case 10:
      var d = b.type._context, e = b.memoizedProps.value;
      G(Wg, d._currentValue);
      d._currentValue = e;
      break;
    case 13:
      d = b.memoizedState;
      if (null !== d) {
        if (null !== d.dehydrated) return G(L, L.current & 1), b.flags |= 128, null;
        if (0 !== (c & b.child.childLanes)) return oj(a, b, c);
        G(L, L.current & 1);
        a = Zi(a, b, c);
        return null !== a ? a.sibling : null;
      }
      G(L, L.current & 1);
      break;
    case 19:
      d = 0 !== (c & b.childLanes);
      if (0 !== (a.flags & 128)) {
        if (d) return xj(a, b, c);
        b.flags |= 128;
      }
      e = b.memoizedState;
      null !== e && (e.rendering = null, e.tail = null, e.lastEffect = null);
      G(L, L.current);
      if (d) break;
      else return null;
    case 22:
    case 23:
      return b.lanes = 0, dj(a, b, c);
  }
  return Zi(a, b, c);
}
var zj, Aj, Bj, Cj;
zj = function(a, b) {
  for (var c = b.child; null !== c; ) {
    if (5 === c.tag || 6 === c.tag) a.appendChild(c.stateNode);
    else if (4 !== c.tag && null !== c.child) {
      c.child.return = c;
      c = c.child;
      continue;
    }
    if (c === b) break;
    for (; null === c.sibling; ) {
      if (null === c.return || c.return === b) return;
      c = c.return;
    }
    c.sibling.return = c.return;
    c = c.sibling;
  }
};
Aj = function() {
};
Bj = function(a, b, c, d) {
  var e = a.memoizedProps;
  if (e !== d) {
    a = b.stateNode;
    xh(uh.current);
    var f2 = null;
    switch (c) {
      case "input":
        e = Ya(a, e);
        d = Ya(a, d);
        f2 = [];
        break;
      case "select":
        e = A$1({}, e, { value: void 0 });
        d = A$1({}, d, { value: void 0 });
        f2 = [];
        break;
      case "textarea":
        e = gb(a, e);
        d = gb(a, d);
        f2 = [];
        break;
      default:
        "function" !== typeof e.onClick && "function" === typeof d.onClick && (a.onclick = Bf);
    }
    ub(c, d);
    var g;
    c = null;
    for (l2 in e) if (!d.hasOwnProperty(l2) && e.hasOwnProperty(l2) && null != e[l2]) if ("style" === l2) {
      var h = e[l2];
      for (g in h) h.hasOwnProperty(g) && (c || (c = {}), c[g] = "");
    } else "dangerouslySetInnerHTML" !== l2 && "children" !== l2 && "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && "autoFocus" !== l2 && (ea.hasOwnProperty(l2) ? f2 || (f2 = []) : (f2 = f2 || []).push(l2, null));
    for (l2 in d) {
      var k2 = d[l2];
      h = null != e ? e[l2] : void 0;
      if (d.hasOwnProperty(l2) && k2 !== h && (null != k2 || null != h)) if ("style" === l2) if (h) {
        for (g in h) !h.hasOwnProperty(g) || k2 && k2.hasOwnProperty(g) || (c || (c = {}), c[g] = "");
        for (g in k2) k2.hasOwnProperty(g) && h[g] !== k2[g] && (c || (c = {}), c[g] = k2[g]);
      } else c || (f2 || (f2 = []), f2.push(
        l2,
        c
      )), c = k2;
      else "dangerouslySetInnerHTML" === l2 ? (k2 = k2 ? k2.__html : void 0, h = h ? h.__html : void 0, null != k2 && h !== k2 && (f2 = f2 || []).push(l2, k2)) : "children" === l2 ? "string" !== typeof k2 && "number" !== typeof k2 || (f2 = f2 || []).push(l2, "" + k2) : "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && (ea.hasOwnProperty(l2) ? (null != k2 && "onScroll" === l2 && D("scroll", a), f2 || h === k2 || (f2 = [])) : (f2 = f2 || []).push(l2, k2));
    }
    c && (f2 = f2 || []).push("style", c);
    var l2 = f2;
    if (b.updateQueue = l2) b.flags |= 4;
  }
};
Cj = function(a, b, c, d) {
  c !== d && (b.flags |= 4);
};
function Dj(a, b) {
  if (!I) switch (a.tailMode) {
    case "hidden":
      b = a.tail;
      for (var c = null; null !== b; ) null !== b.alternate && (c = b), b = b.sibling;
      null === c ? a.tail = null : c.sibling = null;
      break;
    case "collapsed":
      c = a.tail;
      for (var d = null; null !== c; ) null !== c.alternate && (d = c), c = c.sibling;
      null === d ? b || null === a.tail ? a.tail = null : a.tail.sibling = null : d.sibling = null;
  }
}
function S(a) {
  var b = null !== a.alternate && a.alternate.child === a.child, c = 0, d = 0;
  if (b) for (var e = a.child; null !== e; ) c |= e.lanes | e.childLanes, d |= e.subtreeFlags & 14680064, d |= e.flags & 14680064, e.return = a, e = e.sibling;
  else for (e = a.child; null !== e; ) c |= e.lanes | e.childLanes, d |= e.subtreeFlags, d |= e.flags, e.return = a, e = e.sibling;
  a.subtreeFlags |= d;
  a.childLanes = c;
  return b;
}
function Ej(a, b, c) {
  var d = b.pendingProps;
  wg(b);
  switch (b.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return S(b), null;
    case 1:
      return Zf(b.type) && $f(), S(b), null;
    case 3:
      d = b.stateNode;
      zh();
      E(Wf);
      E(H);
      Eh();
      d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);
      if (null === a || null === a.child) Gg(b) ? b.flags |= 4 : null === a || a.memoizedState.isDehydrated && 0 === (b.flags & 256) || (b.flags |= 1024, null !== zg && (Fj(zg), zg = null));
      Aj(a, b);
      S(b);
      return null;
    case 5:
      Bh(b);
      var e = xh(wh.current);
      c = b.type;
      if (null !== a && null != b.stateNode) Bj(a, b, c, d, e), a.ref !== b.ref && (b.flags |= 512, b.flags |= 2097152);
      else {
        if (!d) {
          if (null === b.stateNode) throw Error(p(166));
          S(b);
          return null;
        }
        a = xh(uh.current);
        if (Gg(b)) {
          d = b.stateNode;
          c = b.type;
          var f2 = b.memoizedProps;
          d[Of] = b;
          d[Pf] = f2;
          a = 0 !== (b.mode & 1);
          switch (c) {
            case "dialog":
              D("cancel", d);
              D("close", d);
              break;
            case "iframe":
            case "object":
            case "embed":
              D("load", d);
              break;
            case "video":
            case "audio":
              for (e = 0; e < lf.length; e++) D(lf[e], d);
              break;
            case "source":
              D("error", d);
              break;
            case "img":
            case "image":
            case "link":
              D(
                "error",
                d
              );
              D("load", d);
              break;
            case "details":
              D("toggle", d);
              break;
            case "input":
              Za(d, f2);
              D("invalid", d);
              break;
            case "select":
              d._wrapperState = { wasMultiple: !!f2.multiple };
              D("invalid", d);
              break;
            case "textarea":
              hb(d, f2), D("invalid", d);
          }
          ub(c, f2);
          e = null;
          for (var g in f2) if (f2.hasOwnProperty(g)) {
            var h = f2[g];
            "children" === g ? "string" === typeof h ? d.textContent !== h && (true !== f2.suppressHydrationWarning && Af(d.textContent, h, a), e = ["children", h]) : "number" === typeof h && d.textContent !== "" + h && (true !== f2.suppressHydrationWarning && Af(
              d.textContent,
              h,
              a
            ), e = ["children", "" + h]) : ea.hasOwnProperty(g) && null != h && "onScroll" === g && D("scroll", d);
          }
          switch (c) {
            case "input":
              Va(d);
              db(d, f2, true);
              break;
            case "textarea":
              Va(d);
              jb(d);
              break;
            case "select":
            case "option":
              break;
            default:
              "function" === typeof f2.onClick && (d.onclick = Bf);
          }
          d = e;
          b.updateQueue = d;
          null !== d && (b.flags |= 4);
        } else {
          g = 9 === e.nodeType ? e : e.ownerDocument;
          "http://www.w3.org/1999/xhtml" === a && (a = kb(c));
          "http://www.w3.org/1999/xhtml" === a ? "script" === c ? (a = g.createElement("div"), a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild)) : "string" === typeof d.is ? a = g.createElement(c, { is: d.is }) : (a = g.createElement(c), "select" === c && (g = a, d.multiple ? g.multiple = true : d.size && (g.size = d.size))) : a = g.createElementNS(a, c);
          a[Of] = b;
          a[Pf] = d;
          zj(a, b, false, false);
          b.stateNode = a;
          a: {
            g = vb(c, d);
            switch (c) {
              case "dialog":
                D("cancel", a);
                D("close", a);
                e = d;
                break;
              case "iframe":
              case "object":
              case "embed":
                D("load", a);
                e = d;
                break;
              case "video":
              case "audio":
                for (e = 0; e < lf.length; e++) D(lf[e], a);
                e = d;
                break;
              case "source":
                D("error", a);
                e = d;
                break;
              case "img":
              case "image":
              case "link":
                D(
                  "error",
                  a
                );
                D("load", a);
                e = d;
                break;
              case "details":
                D("toggle", a);
                e = d;
                break;
              case "input":
                Za(a, d);
                e = Ya(a, d);
                D("invalid", a);
                break;
              case "option":
                e = d;
                break;
              case "select":
                a._wrapperState = { wasMultiple: !!d.multiple };
                e = A$1({}, d, { value: void 0 });
                D("invalid", a);
                break;
              case "textarea":
                hb(a, d);
                e = gb(a, d);
                D("invalid", a);
                break;
              default:
                e = d;
            }
            ub(c, e);
            h = e;
            for (f2 in h) if (h.hasOwnProperty(f2)) {
              var k2 = h[f2];
              "style" === f2 ? sb(a, k2) : "dangerouslySetInnerHTML" === f2 ? (k2 = k2 ? k2.__html : void 0, null != k2 && nb(a, k2)) : "children" === f2 ? "string" === typeof k2 ? ("textarea" !== c || "" !== k2) && ob(a, k2) : "number" === typeof k2 && ob(a, "" + k2) : "suppressContentEditableWarning" !== f2 && "suppressHydrationWarning" !== f2 && "autoFocus" !== f2 && (ea.hasOwnProperty(f2) ? null != k2 && "onScroll" === f2 && D("scroll", a) : null != k2 && ta(a, f2, k2, g));
            }
            switch (c) {
              case "input":
                Va(a);
                db(a, d, false);
                break;
              case "textarea":
                Va(a);
                jb(a);
                break;
              case "option":
                null != d.value && a.setAttribute("value", "" + Sa(d.value));
                break;
              case "select":
                a.multiple = !!d.multiple;
                f2 = d.value;
                null != f2 ? fb(a, !!d.multiple, f2, false) : null != d.defaultValue && fb(
                  a,
                  !!d.multiple,
                  d.defaultValue,
                  true
                );
                break;
              default:
                "function" === typeof e.onClick && (a.onclick = Bf);
            }
            switch (c) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                d = !!d.autoFocus;
                break a;
              case "img":
                d = true;
                break a;
              default:
                d = false;
            }
          }
          d && (b.flags |= 4);
        }
        null !== b.ref && (b.flags |= 512, b.flags |= 2097152);
      }
      S(b);
      return null;
    case 6:
      if (a && null != b.stateNode) Cj(a, b, a.memoizedProps, d);
      else {
        if ("string" !== typeof d && null === b.stateNode) throw Error(p(166));
        c = xh(wh.current);
        xh(uh.current);
        if (Gg(b)) {
          d = b.stateNode;
          c = b.memoizedProps;
          d[Of] = b;
          if (f2 = d.nodeValue !== c) {
            if (a = xg, null !== a) switch (a.tag) {
              case 3:
                Af(d.nodeValue, c, 0 !== (a.mode & 1));
                break;
              case 5:
                true !== a.memoizedProps.suppressHydrationWarning && Af(d.nodeValue, c, 0 !== (a.mode & 1));
            }
          }
          f2 && (b.flags |= 4);
        } else d = (9 === c.nodeType ? c : c.ownerDocument).createTextNode(d), d[Of] = b, b.stateNode = d;
      }
      S(b);
      return null;
    case 13:
      E(L);
      d = b.memoizedState;
      if (null === a || null !== a.memoizedState && null !== a.memoizedState.dehydrated) {
        if (I && null !== yg && 0 !== (b.mode & 1) && 0 === (b.flags & 128)) Hg(), Ig(), b.flags |= 98560, f2 = false;
        else if (f2 = Gg(b), null !== d && null !== d.dehydrated) {
          if (null === a) {
            if (!f2) throw Error(p(318));
            f2 = b.memoizedState;
            f2 = null !== f2 ? f2.dehydrated : null;
            if (!f2) throw Error(p(317));
            f2[Of] = b;
          } else Ig(), 0 === (b.flags & 128) && (b.memoizedState = null), b.flags |= 4;
          S(b);
          f2 = false;
        } else null !== zg && (Fj(zg), zg = null), f2 = true;
        if (!f2) return b.flags & 65536 ? b : null;
      }
      if (0 !== (b.flags & 128)) return b.lanes = c, b;
      d = null !== d;
      d !== (null !== a && null !== a.memoizedState) && d && (b.child.flags |= 8192, 0 !== (b.mode & 1) && (null === a || 0 !== (L.current & 1) ? 0 === T$1 && (T$1 = 3) : tj()));
      null !== b.updateQueue && (b.flags |= 4);
      S(b);
      return null;
    case 4:
      return zh(), Aj(a, b), null === a && sf(b.stateNode.containerInfo), S(b), null;
    case 10:
      return ah(b.type._context), S(b), null;
    case 17:
      return Zf(b.type) && $f(), S(b), null;
    case 19:
      E(L);
      f2 = b.memoizedState;
      if (null === f2) return S(b), null;
      d = 0 !== (b.flags & 128);
      g = f2.rendering;
      if (null === g) if (d) Dj(f2, false);
      else {
        if (0 !== T$1 || null !== a && 0 !== (a.flags & 128)) for (a = b.child; null !== a; ) {
          g = Ch(a);
          if (null !== g) {
            b.flags |= 128;
            Dj(f2, false);
            d = g.updateQueue;
            null !== d && (b.updateQueue = d, b.flags |= 4);
            b.subtreeFlags = 0;
            d = c;
            for (c = b.child; null !== c; ) f2 = c, a = d, f2.flags &= 14680066, g = f2.alternate, null === g ? (f2.childLanes = 0, f2.lanes = a, f2.child = null, f2.subtreeFlags = 0, f2.memoizedProps = null, f2.memoizedState = null, f2.updateQueue = null, f2.dependencies = null, f2.stateNode = null) : (f2.childLanes = g.childLanes, f2.lanes = g.lanes, f2.child = g.child, f2.subtreeFlags = 0, f2.deletions = null, f2.memoizedProps = g.memoizedProps, f2.memoizedState = g.memoizedState, f2.updateQueue = g.updateQueue, f2.type = g.type, a = g.dependencies, f2.dependencies = null === a ? null : { lanes: a.lanes, firstContext: a.firstContext }), c = c.sibling;
            G(L, L.current & 1 | 2);
            return b.child;
          }
          a = a.sibling;
        }
        null !== f2.tail && B$1() > Gj && (b.flags |= 128, d = true, Dj(f2, false), b.lanes = 4194304);
      }
      else {
        if (!d) if (a = Ch(g), null !== a) {
          if (b.flags |= 128, d = true, c = a.updateQueue, null !== c && (b.updateQueue = c, b.flags |= 4), Dj(f2, true), null === f2.tail && "hidden" === f2.tailMode && !g.alternate && !I) return S(b), null;
        } else 2 * B$1() - f2.renderingStartTime > Gj && 1073741824 !== c && (b.flags |= 128, d = true, Dj(f2, false), b.lanes = 4194304);
        f2.isBackwards ? (g.sibling = b.child, b.child = g) : (c = f2.last, null !== c ? c.sibling = g : b.child = g, f2.last = g);
      }
      if (null !== f2.tail) return b = f2.tail, f2.rendering = b, f2.tail = b.sibling, f2.renderingStartTime = B$1(), b.sibling = null, c = L.current, G(L, d ? c & 1 | 2 : c & 1), b;
      S(b);
      return null;
    case 22:
    case 23:
      return Hj(), d = null !== b.memoizedState, null !== a && null !== a.memoizedState !== d && (b.flags |= 8192), d && 0 !== (b.mode & 1) ? 0 !== (fj & 1073741824) && (S(b), b.subtreeFlags & 6 && (b.flags |= 8192)) : S(b), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(p(156, b.tag));
}
function Ij(a, b) {
  wg(b);
  switch (b.tag) {
    case 1:
      return Zf(b.type) && $f(), a = b.flags, a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
    case 3:
      return zh(), E(Wf), E(H), Eh(), a = b.flags, 0 !== (a & 65536) && 0 === (a & 128) ? (b.flags = a & -65537 | 128, b) : null;
    case 5:
      return Bh(b), null;
    case 13:
      E(L);
      a = b.memoizedState;
      if (null !== a && null !== a.dehydrated) {
        if (null === b.alternate) throw Error(p(340));
        Ig();
      }
      a = b.flags;
      return a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
    case 19:
      return E(L), null;
    case 4:
      return zh(), null;
    case 10:
      return ah(b.type._context), null;
    case 22:
    case 23:
      return Hj(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Jj = false, U$1 = false, Kj = "function" === typeof WeakSet ? WeakSet : Set, V = null;
function Lj(a, b) {
  var c = a.ref;
  if (null !== c) if ("function" === typeof c) try {
    c(null);
  } catch (d) {
    W$1(a, b, d);
  }
  else c.current = null;
}
function Mj(a, b, c) {
  try {
    c();
  } catch (d) {
    W$1(a, b, d);
  }
}
var Nj = false;
function Oj(a, b) {
  Cf = dd;
  a = Me$1();
  if (Ne$1(a)) {
    if ("selectionStart" in a) var c = { start: a.selectionStart, end: a.selectionEnd };
    else a: {
      c = (c = a.ownerDocument) && c.defaultView || window;
      var d = c.getSelection && c.getSelection();
      if (d && 0 !== d.rangeCount) {
        c = d.anchorNode;
        var e = d.anchorOffset, f2 = d.focusNode;
        d = d.focusOffset;
        try {
          c.nodeType, f2.nodeType;
        } catch (F2) {
          c = null;
          break a;
        }
        var g = 0, h = -1, k2 = -1, l2 = 0, m2 = 0, q2 = a, r2 = null;
        b: for (; ; ) {
          for (var y2; ; ) {
            q2 !== c || 0 !== e && 3 !== q2.nodeType || (h = g + e);
            q2 !== f2 || 0 !== d && 3 !== q2.nodeType || (k2 = g + d);
            3 === q2.nodeType && (g += q2.nodeValue.length);
            if (null === (y2 = q2.firstChild)) break;
            r2 = q2;
            q2 = y2;
          }
          for (; ; ) {
            if (q2 === a) break b;
            r2 === c && ++l2 === e && (h = g);
            r2 === f2 && ++m2 === d && (k2 = g);
            if (null !== (y2 = q2.nextSibling)) break;
            q2 = r2;
            r2 = q2.parentNode;
          }
          q2 = y2;
        }
        c = -1 === h || -1 === k2 ? null : { start: h, end: k2 };
      } else c = null;
    }
    c = c || { start: 0, end: 0 };
  } else c = null;
  Df = { focusedElem: a, selectionRange: c };
  dd = false;
  for (V = b; null !== V; ) if (b = V, a = b.child, 0 !== (b.subtreeFlags & 1028) && null !== a) a.return = b, V = a;
  else for (; null !== V; ) {
    b = V;
    try {
      var n2 = b.alternate;
      if (0 !== (b.flags & 1024)) switch (b.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (null !== n2) {
            var t2 = n2.memoizedProps, J2 = n2.memoizedState, x2 = b.stateNode, w2 = x2.getSnapshotBeforeUpdate(b.elementType === b.type ? t2 : Ci(b.type, t2), J2);
            x2.__reactInternalSnapshotBeforeUpdate = w2;
          }
          break;
        case 3:
          var u2 = b.stateNode.containerInfo;
          1 === u2.nodeType ? u2.textContent = "" : 9 === u2.nodeType && u2.documentElement && u2.removeChild(u2.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(p(163));
      }
    } catch (F2) {
      W$1(b, b.return, F2);
    }
    a = b.sibling;
    if (null !== a) {
      a.return = b.return;
      V = a;
      break;
    }
    V = b.return;
  }
  n2 = Nj;
  Nj = false;
  return n2;
}
function Pj(a, b, c) {
  var d = b.updateQueue;
  d = null !== d ? d.lastEffect : null;
  if (null !== d) {
    var e = d = d.next;
    do {
      if ((e.tag & a) === a) {
        var f2 = e.destroy;
        e.destroy = void 0;
        void 0 !== f2 && Mj(b, c, f2);
      }
      e = e.next;
    } while (e !== d);
  }
}
function Qj(a, b) {
  b = b.updateQueue;
  b = null !== b ? b.lastEffect : null;
  if (null !== b) {
    var c = b = b.next;
    do {
      if ((c.tag & a) === a) {
        var d = c.create;
        c.destroy = d();
      }
      c = c.next;
    } while (c !== b);
  }
}
function Rj(a) {
  var b = a.ref;
  if (null !== b) {
    var c = a.stateNode;
    switch (a.tag) {
      case 5:
        a = c;
        break;
      default:
        a = c;
    }
    "function" === typeof b ? b(a) : b.current = a;
  }
}
function Sj(a) {
  var b = a.alternate;
  null !== b && (a.alternate = null, Sj(b));
  a.child = null;
  a.deletions = null;
  a.sibling = null;
  5 === a.tag && (b = a.stateNode, null !== b && (delete b[Of], delete b[Pf], delete b[of], delete b[Qf], delete b[Rf]));
  a.stateNode = null;
  a.return = null;
  a.dependencies = null;
  a.memoizedProps = null;
  a.memoizedState = null;
  a.pendingProps = null;
  a.stateNode = null;
  a.updateQueue = null;
}
function Tj(a) {
  return 5 === a.tag || 3 === a.tag || 4 === a.tag;
}
function Uj(a) {
  a: for (; ; ) {
    for (; null === a.sibling; ) {
      if (null === a.return || Tj(a.return)) return null;
      a = a.return;
    }
    a.sibling.return = a.return;
    for (a = a.sibling; 5 !== a.tag && 6 !== a.tag && 18 !== a.tag; ) {
      if (a.flags & 2) continue a;
      if (null === a.child || 4 === a.tag) continue a;
      else a.child.return = a, a = a.child;
    }
    if (!(a.flags & 2)) return a.stateNode;
  }
}
function Vj(a, b, c) {
  var d = a.tag;
  if (5 === d || 6 === d) a = a.stateNode, b ? 8 === c.nodeType ? c.parentNode.insertBefore(a, b) : c.insertBefore(a, b) : (8 === c.nodeType ? (b = c.parentNode, b.insertBefore(a, c)) : (b = c, b.appendChild(a)), c = c._reactRootContainer, null !== c && void 0 !== c || null !== b.onclick || (b.onclick = Bf));
  else if (4 !== d && (a = a.child, null !== a)) for (Vj(a, b, c), a = a.sibling; null !== a; ) Vj(a, b, c), a = a.sibling;
}
function Wj(a, b, c) {
  var d = a.tag;
  if (5 === d || 6 === d) a = a.stateNode, b ? c.insertBefore(a, b) : c.appendChild(a);
  else if (4 !== d && (a = a.child, null !== a)) for (Wj(a, b, c), a = a.sibling; null !== a; ) Wj(a, b, c), a = a.sibling;
}
var X$1 = null, Xj = false;
function Yj(a, b, c) {
  for (c = c.child; null !== c; ) Zj(a, b, c), c = c.sibling;
}
function Zj(a, b, c) {
  if (lc && "function" === typeof lc.onCommitFiberUnmount) try {
    lc.onCommitFiberUnmount(kc, c);
  } catch (h) {
  }
  switch (c.tag) {
    case 5:
      U$1 || Lj(c, b);
    case 6:
      var d = X$1, e = Xj;
      X$1 = null;
      Yj(a, b, c);
      X$1 = d;
      Xj = e;
      null !== X$1 && (Xj ? (a = X$1, c = c.stateNode, 8 === a.nodeType ? a.parentNode.removeChild(c) : a.removeChild(c)) : X$1.removeChild(c.stateNode));
      break;
    case 18:
      null !== X$1 && (Xj ? (a = X$1, c = c.stateNode, 8 === a.nodeType ? Kf(a.parentNode, c) : 1 === a.nodeType && Kf(a, c), bd(a)) : Kf(X$1, c.stateNode));
      break;
    case 4:
      d = X$1;
      e = Xj;
      X$1 = c.stateNode.containerInfo;
      Xj = true;
      Yj(a, b, c);
      X$1 = d;
      Xj = e;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!U$1 && (d = c.updateQueue, null !== d && (d = d.lastEffect, null !== d))) {
        e = d = d.next;
        do {
          var f2 = e, g = f2.destroy;
          f2 = f2.tag;
          void 0 !== g && (0 !== (f2 & 2) ? Mj(c, b, g) : 0 !== (f2 & 4) && Mj(c, b, g));
          e = e.next;
        } while (e !== d);
      }
      Yj(a, b, c);
      break;
    case 1:
      if (!U$1 && (Lj(c, b), d = c.stateNode, "function" === typeof d.componentWillUnmount)) try {
        d.props = c.memoizedProps, d.state = c.memoizedState, d.componentWillUnmount();
      } catch (h) {
        W$1(c, b, h);
      }
      Yj(a, b, c);
      break;
    case 21:
      Yj(a, b, c);
      break;
    case 22:
      c.mode & 1 ? (U$1 = (d = U$1) || null !== c.memoizedState, Yj(a, b, c), U$1 = d) : Yj(a, b, c);
      break;
    default:
      Yj(a, b, c);
  }
}
function ak(a) {
  var b = a.updateQueue;
  if (null !== b) {
    a.updateQueue = null;
    var c = a.stateNode;
    null === c && (c = a.stateNode = new Kj());
    b.forEach(function(b2) {
      var d = bk.bind(null, a, b2);
      c.has(b2) || (c.add(b2), b2.then(d, d));
    });
  }
}
function ck(a, b) {
  var c = b.deletions;
  if (null !== c) for (var d = 0; d < c.length; d++) {
    var e = c[d];
    try {
      var f2 = a, g = b, h = g;
      a: for (; null !== h; ) {
        switch (h.tag) {
          case 5:
            X$1 = h.stateNode;
            Xj = false;
            break a;
          case 3:
            X$1 = h.stateNode.containerInfo;
            Xj = true;
            break a;
          case 4:
            X$1 = h.stateNode.containerInfo;
            Xj = true;
            break a;
        }
        h = h.return;
      }
      if (null === X$1) throw Error(p(160));
      Zj(f2, g, e);
      X$1 = null;
      Xj = false;
      var k2 = e.alternate;
      null !== k2 && (k2.return = null);
      e.return = null;
    } catch (l2) {
      W$1(e, b, l2);
    }
  }
  if (b.subtreeFlags & 12854) for (b = b.child; null !== b; ) dk(b, a), b = b.sibling;
}
function dk(a, b) {
  var c = a.alternate, d = a.flags;
  switch (a.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      ck(b, a);
      ek(a);
      if (d & 4) {
        try {
          Pj(3, a, a.return), Qj(3, a);
        } catch (t2) {
          W$1(a, a.return, t2);
        }
        try {
          Pj(5, a, a.return);
        } catch (t2) {
          W$1(a, a.return, t2);
        }
      }
      break;
    case 1:
      ck(b, a);
      ek(a);
      d & 512 && null !== c && Lj(c, c.return);
      break;
    case 5:
      ck(b, a);
      ek(a);
      d & 512 && null !== c && Lj(c, c.return);
      if (a.flags & 32) {
        var e = a.stateNode;
        try {
          ob(e, "");
        } catch (t2) {
          W$1(a, a.return, t2);
        }
      }
      if (d & 4 && (e = a.stateNode, null != e)) {
        var f2 = a.memoizedProps, g = null !== c ? c.memoizedProps : f2, h = a.type, k2 = a.updateQueue;
        a.updateQueue = null;
        if (null !== k2) try {
          "input" === h && "radio" === f2.type && null != f2.name && ab(e, f2);
          vb(h, g);
          var l2 = vb(h, f2);
          for (g = 0; g < k2.length; g += 2) {
            var m2 = k2[g], q2 = k2[g + 1];
            "style" === m2 ? sb(e, q2) : "dangerouslySetInnerHTML" === m2 ? nb(e, q2) : "children" === m2 ? ob(e, q2) : ta(e, m2, q2, l2);
          }
          switch (h) {
            case "input":
              bb(e, f2);
              break;
            case "textarea":
              ib(e, f2);
              break;
            case "select":
              var r2 = e._wrapperState.wasMultiple;
              e._wrapperState.wasMultiple = !!f2.multiple;
              var y2 = f2.value;
              null != y2 ? fb(e, !!f2.multiple, y2, false) : r2 !== !!f2.multiple && (null != f2.defaultValue ? fb(
                e,
                !!f2.multiple,
                f2.defaultValue,
                true
              ) : fb(e, !!f2.multiple, f2.multiple ? [] : "", false));
          }
          e[Pf] = f2;
        } catch (t2) {
          W$1(a, a.return, t2);
        }
      }
      break;
    case 6:
      ck(b, a);
      ek(a);
      if (d & 4) {
        if (null === a.stateNode) throw Error(p(162));
        e = a.stateNode;
        f2 = a.memoizedProps;
        try {
          e.nodeValue = f2;
        } catch (t2) {
          W$1(a, a.return, t2);
        }
      }
      break;
    case 3:
      ck(b, a);
      ek(a);
      if (d & 4 && null !== c && c.memoizedState.isDehydrated) try {
        bd(b.containerInfo);
      } catch (t2) {
        W$1(a, a.return, t2);
      }
      break;
    case 4:
      ck(b, a);
      ek(a);
      break;
    case 13:
      ck(b, a);
      ek(a);
      e = a.child;
      e.flags & 8192 && (f2 = null !== e.memoizedState, e.stateNode.isHidden = f2, !f2 || null !== e.alternate && null !== e.alternate.memoizedState || (fk = B$1()));
      d & 4 && ak(a);
      break;
    case 22:
      m2 = null !== c && null !== c.memoizedState;
      a.mode & 1 ? (U$1 = (l2 = U$1) || m2, ck(b, a), U$1 = l2) : ck(b, a);
      ek(a);
      if (d & 8192) {
        l2 = null !== a.memoizedState;
        if ((a.stateNode.isHidden = l2) && !m2 && 0 !== (a.mode & 1)) for (V = a, m2 = a.child; null !== m2; ) {
          for (q2 = V = m2; null !== V; ) {
            r2 = V;
            y2 = r2.child;
            switch (r2.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Pj(4, r2, r2.return);
                break;
              case 1:
                Lj(r2, r2.return);
                var n2 = r2.stateNode;
                if ("function" === typeof n2.componentWillUnmount) {
                  d = r2;
                  c = r2.return;
                  try {
                    b = d, n2.props = b.memoizedProps, n2.state = b.memoizedState, n2.componentWillUnmount();
                  } catch (t2) {
                    W$1(d, c, t2);
                  }
                }
                break;
              case 5:
                Lj(r2, r2.return);
                break;
              case 22:
                if (null !== r2.memoizedState) {
                  gk(q2);
                  continue;
                }
            }
            null !== y2 ? (y2.return = r2, V = y2) : gk(q2);
          }
          m2 = m2.sibling;
        }
        a: for (m2 = null, q2 = a; ; ) {
          if (5 === q2.tag) {
            if (null === m2) {
              m2 = q2;
              try {
                e = q2.stateNode, l2 ? (f2 = e.style, "function" === typeof f2.setProperty ? f2.setProperty("display", "none", "important") : f2.display = "none") : (h = q2.stateNode, k2 = q2.memoizedProps.style, g = void 0 !== k2 && null !== k2 && k2.hasOwnProperty("display") ? k2.display : null, h.style.display = rb("display", g));
              } catch (t2) {
                W$1(a, a.return, t2);
              }
            }
          } else if (6 === q2.tag) {
            if (null === m2) try {
              q2.stateNode.nodeValue = l2 ? "" : q2.memoizedProps;
            } catch (t2) {
              W$1(a, a.return, t2);
            }
          } else if ((22 !== q2.tag && 23 !== q2.tag || null === q2.memoizedState || q2 === a) && null !== q2.child) {
            q2.child.return = q2;
            q2 = q2.child;
            continue;
          }
          if (q2 === a) break a;
          for (; null === q2.sibling; ) {
            if (null === q2.return || q2.return === a) break a;
            m2 === q2 && (m2 = null);
            q2 = q2.return;
          }
          m2 === q2 && (m2 = null);
          q2.sibling.return = q2.return;
          q2 = q2.sibling;
        }
      }
      break;
    case 19:
      ck(b, a);
      ek(a);
      d & 4 && ak(a);
      break;
    case 21:
      break;
    default:
      ck(
        b,
        a
      ), ek(a);
  }
}
function ek(a) {
  var b = a.flags;
  if (b & 2) {
    try {
      a: {
        for (var c = a.return; null !== c; ) {
          if (Tj(c)) {
            var d = c;
            break a;
          }
          c = c.return;
        }
        throw Error(p(160));
      }
      switch (d.tag) {
        case 5:
          var e = d.stateNode;
          d.flags & 32 && (ob(e, ""), d.flags &= -33);
          var f2 = Uj(a);
          Wj(a, f2, e);
          break;
        case 3:
        case 4:
          var g = d.stateNode.containerInfo, h = Uj(a);
          Vj(a, h, g);
          break;
        default:
          throw Error(p(161));
      }
    } catch (k2) {
      W$1(a, a.return, k2);
    }
    a.flags &= -3;
  }
  b & 4096 && (a.flags &= -4097);
}
function hk(a, b, c) {
  V = a;
  ik(a);
}
function ik(a, b, c) {
  for (var d = 0 !== (a.mode & 1); null !== V; ) {
    var e = V, f2 = e.child;
    if (22 === e.tag && d) {
      var g = null !== e.memoizedState || Jj;
      if (!g) {
        var h = e.alternate, k2 = null !== h && null !== h.memoizedState || U$1;
        h = Jj;
        var l2 = U$1;
        Jj = g;
        if ((U$1 = k2) && !l2) for (V = e; null !== V; ) g = V, k2 = g.child, 22 === g.tag && null !== g.memoizedState ? jk(e) : null !== k2 ? (k2.return = g, V = k2) : jk(e);
        for (; null !== f2; ) V = f2, ik(f2), f2 = f2.sibling;
        V = e;
        Jj = h;
        U$1 = l2;
      }
      kk(a);
    } else 0 !== (e.subtreeFlags & 8772) && null !== f2 ? (f2.return = e, V = f2) : kk(a);
  }
}
function kk(a) {
  for (; null !== V; ) {
    var b = V;
    if (0 !== (b.flags & 8772)) {
      var c = b.alternate;
      try {
        if (0 !== (b.flags & 8772)) switch (b.tag) {
          case 0:
          case 11:
          case 15:
            U$1 || Qj(5, b);
            break;
          case 1:
            var d = b.stateNode;
            if (b.flags & 4 && !U$1) if (null === c) d.componentDidMount();
            else {
              var e = b.elementType === b.type ? c.memoizedProps : Ci(b.type, c.memoizedProps);
              d.componentDidUpdate(e, c.memoizedState, d.__reactInternalSnapshotBeforeUpdate);
            }
            var f2 = b.updateQueue;
            null !== f2 && sh(b, f2, d);
            break;
          case 3:
            var g = b.updateQueue;
            if (null !== g) {
              c = null;
              if (null !== b.child) switch (b.child.tag) {
                case 5:
                  c = b.child.stateNode;
                  break;
                case 1:
                  c = b.child.stateNode;
              }
              sh(b, g, c);
            }
            break;
          case 5:
            var h = b.stateNode;
            if (null === c && b.flags & 4) {
              c = h;
              var k2 = b.memoizedProps;
              switch (b.type) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  k2.autoFocus && c.focus();
                  break;
                case "img":
                  k2.src && (c.src = k2.src);
              }
            }
            break;
          case 6:
            break;
          case 4:
            break;
          case 12:
            break;
          case 13:
            if (null === b.memoizedState) {
              var l2 = b.alternate;
              if (null !== l2) {
                var m2 = l2.memoizedState;
                if (null !== m2) {
                  var q2 = m2.dehydrated;
                  null !== q2 && bd(q2);
                }
              }
            }
            break;
          case 19:
          case 17:
          case 21:
          case 22:
          case 23:
          case 25:
            break;
          default:
            throw Error(p(163));
        }
        U$1 || b.flags & 512 && Rj(b);
      } catch (r2) {
        W$1(b, b.return, r2);
      }
    }
    if (b === a) {
      V = null;
      break;
    }
    c = b.sibling;
    if (null !== c) {
      c.return = b.return;
      V = c;
      break;
    }
    V = b.return;
  }
}
function gk(a) {
  for (; null !== V; ) {
    var b = V;
    if (b === a) {
      V = null;
      break;
    }
    var c = b.sibling;
    if (null !== c) {
      c.return = b.return;
      V = c;
      break;
    }
    V = b.return;
  }
}
function jk(a) {
  for (; null !== V; ) {
    var b = V;
    try {
      switch (b.tag) {
        case 0:
        case 11:
        case 15:
          var c = b.return;
          try {
            Qj(4, b);
          } catch (k2) {
            W$1(b, c, k2);
          }
          break;
        case 1:
          var d = b.stateNode;
          if ("function" === typeof d.componentDidMount) {
            var e = b.return;
            try {
              d.componentDidMount();
            } catch (k2) {
              W$1(b, e, k2);
            }
          }
          var f2 = b.return;
          try {
            Rj(b);
          } catch (k2) {
            W$1(b, f2, k2);
          }
          break;
        case 5:
          var g = b.return;
          try {
            Rj(b);
          } catch (k2) {
            W$1(b, g, k2);
          }
      }
    } catch (k2) {
      W$1(b, b.return, k2);
    }
    if (b === a) {
      V = null;
      break;
    }
    var h = b.sibling;
    if (null !== h) {
      h.return = b.return;
      V = h;
      break;
    }
    V = b.return;
  }
}
var lk = Math.ceil, mk = ua.ReactCurrentDispatcher, nk = ua.ReactCurrentOwner, ok = ua.ReactCurrentBatchConfig, K = 0, Q = null, Y$1 = null, Z = 0, fj = 0, ej = Uf(0), T$1 = 0, pk = null, rh = 0, qk = 0, rk = 0, sk = null, tk = null, fk = 0, Gj = Infinity, uk = null, Oi = false, Pi = null, Ri = null, vk = false, wk = null, xk = 0, yk = 0, zk = null, Ak = -1, Bk = 0;
function R() {
  return 0 !== (K & 6) ? B$1() : -1 !== Ak ? Ak : Ak = B$1();
}
function yi(a) {
  if (0 === (a.mode & 1)) return 1;
  if (0 !== (K & 2) && 0 !== Z) return Z & -Z;
  if (null !== Kg.transition) return 0 === Bk && (Bk = yc()), Bk;
  a = C;
  if (0 !== a) return a;
  a = window.event;
  a = void 0 === a ? 16 : jd(a.type);
  return a;
}
function gi(a, b, c, d) {
  if (50 < yk) throw yk = 0, zk = null, Error(p(185));
  Ac(a, c, d);
  if (0 === (K & 2) || a !== Q) a === Q && (0 === (K & 2) && (qk |= c), 4 === T$1 && Ck(a, Z)), Dk(a, d), 1 === c && 0 === K && 0 === (b.mode & 1) && (Gj = B$1() + 500, fg && jg());
}
function Dk(a, b) {
  var c = a.callbackNode;
  wc(a, b);
  var d = uc(a, a === Q ? Z : 0);
  if (0 === d) null !== c && bc(c), a.callbackNode = null, a.callbackPriority = 0;
  else if (b = d & -d, a.callbackPriority !== b) {
    null != c && bc(c);
    if (1 === b) 0 === a.tag ? ig(Ek.bind(null, a)) : hg(Ek.bind(null, a)), Jf(function() {
      0 === (K & 6) && jg();
    }), c = null;
    else {
      switch (Dc(d)) {
        case 1:
          c = fc;
          break;
        case 4:
          c = gc;
          break;
        case 16:
          c = hc;
          break;
        case 536870912:
          c = jc;
          break;
        default:
          c = hc;
      }
      c = Fk(c, Gk.bind(null, a));
    }
    a.callbackPriority = b;
    a.callbackNode = c;
  }
}
function Gk(a, b) {
  Ak = -1;
  Bk = 0;
  if (0 !== (K & 6)) throw Error(p(327));
  var c = a.callbackNode;
  if (Hk() && a.callbackNode !== c) return null;
  var d = uc(a, a === Q ? Z : 0);
  if (0 === d) return null;
  if (0 !== (d & 30) || 0 !== (d & a.expiredLanes) || b) b = Ik(a, d);
  else {
    b = d;
    var e = K;
    K |= 2;
    var f2 = Jk();
    if (Q !== a || Z !== b) uk = null, Gj = B$1() + 500, Kk(a, b);
    do
      try {
        Lk();
        break;
      } catch (h) {
        Mk(a, h);
      }
    while (1);
    $g();
    mk.current = f2;
    K = e;
    null !== Y$1 ? b = 0 : (Q = null, Z = 0, b = T$1);
  }
  if (0 !== b) {
    2 === b && (e = xc(a), 0 !== e && (d = e, b = Nk(a, e)));
    if (1 === b) throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B$1()), c;
    if (6 === b) Ck(a, d);
    else {
      e = a.current.alternate;
      if (0 === (d & 30) && !Ok(e) && (b = Ik(a, d), 2 === b && (f2 = xc(a), 0 !== f2 && (d = f2, b = Nk(a, f2))), 1 === b)) throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B$1()), c;
      a.finishedWork = e;
      a.finishedLanes = d;
      switch (b) {
        case 0:
        case 1:
          throw Error(p(345));
        case 2:
          Pk(a, tk, uk);
          break;
        case 3:
          Ck(a, d);
          if ((d & 130023424) === d && (b = fk + 500 - B$1(), 10 < b)) {
            if (0 !== uc(a, 0)) break;
            e = a.suspendedLanes;
            if ((e & d) !== d) {
              R();
              a.pingedLanes |= a.suspendedLanes & e;
              break;
            }
            a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), b);
            break;
          }
          Pk(a, tk, uk);
          break;
        case 4:
          Ck(a, d);
          if ((d & 4194240) === d) break;
          b = a.eventTimes;
          for (e = -1; 0 < d; ) {
            var g = 31 - oc(d);
            f2 = 1 << g;
            g = b[g];
            g > e && (e = g);
            d &= ~f2;
          }
          d = e;
          d = B$1() - d;
          d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3e3 > d ? 3e3 : 4320 > d ? 4320 : 1960 * lk(d / 1960)) - d;
          if (10 < d) {
            a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), d);
            break;
          }
          Pk(a, tk, uk);
          break;
        case 5:
          Pk(a, tk, uk);
          break;
        default:
          throw Error(p(329));
      }
    }
  }
  Dk(a, B$1());
  return a.callbackNode === c ? Gk.bind(null, a) : null;
}
function Nk(a, b) {
  var c = sk;
  a.current.memoizedState.isDehydrated && (Kk(a, b).flags |= 256);
  a = Ik(a, b);
  2 !== a && (b = tk, tk = c, null !== b && Fj(b));
  return a;
}
function Fj(a) {
  null === tk ? tk = a : tk.push.apply(tk, a);
}
function Ok(a) {
  for (var b = a; ; ) {
    if (b.flags & 16384) {
      var c = b.updateQueue;
      if (null !== c && (c = c.stores, null !== c)) for (var d = 0; d < c.length; d++) {
        var e = c[d], f2 = e.getSnapshot;
        e = e.value;
        try {
          if (!He$1(f2(), e)) return false;
        } catch (g) {
          return false;
        }
      }
    }
    c = b.child;
    if (b.subtreeFlags & 16384 && null !== c) c.return = b, b = c;
    else {
      if (b === a) break;
      for (; null === b.sibling; ) {
        if (null === b.return || b.return === a) return true;
        b = b.return;
      }
      b.sibling.return = b.return;
      b = b.sibling;
    }
  }
  return true;
}
function Ck(a, b) {
  b &= ~rk;
  b &= ~qk;
  a.suspendedLanes |= b;
  a.pingedLanes &= ~b;
  for (a = a.expirationTimes; 0 < b; ) {
    var c = 31 - oc(b), d = 1 << c;
    a[c] = -1;
    b &= ~d;
  }
}
function Ek(a) {
  if (0 !== (K & 6)) throw Error(p(327));
  Hk();
  var b = uc(a, 0);
  if (0 === (b & 1)) return Dk(a, B$1()), null;
  var c = Ik(a, b);
  if (0 !== a.tag && 2 === c) {
    var d = xc(a);
    0 !== d && (b = d, c = Nk(a, d));
  }
  if (1 === c) throw c = pk, Kk(a, 0), Ck(a, b), Dk(a, B$1()), c;
  if (6 === c) throw Error(p(345));
  a.finishedWork = a.current.alternate;
  a.finishedLanes = b;
  Pk(a, tk, uk);
  Dk(a, B$1());
  return null;
}
function Qk(a, b) {
  var c = K;
  K |= 1;
  try {
    return a(b);
  } finally {
    K = c, 0 === K && (Gj = B$1() + 500, fg && jg());
  }
}
function Rk(a) {
  null !== wk && 0 === wk.tag && 0 === (K & 6) && Hk();
  var b = K;
  K |= 1;
  var c = ok.transition, d = C;
  try {
    if (ok.transition = null, C = 1, a) return a();
  } finally {
    C = d, ok.transition = c, K = b, 0 === (K & 6) && jg();
  }
}
function Hj() {
  fj = ej.current;
  E(ej);
}
function Kk(a, b) {
  a.finishedWork = null;
  a.finishedLanes = 0;
  var c = a.timeoutHandle;
  -1 !== c && (a.timeoutHandle = -1, Gf(c));
  if (null !== Y$1) for (c = Y$1.return; null !== c; ) {
    var d = c;
    wg(d);
    switch (d.tag) {
      case 1:
        d = d.type.childContextTypes;
        null !== d && void 0 !== d && $f();
        break;
      case 3:
        zh();
        E(Wf);
        E(H);
        Eh();
        break;
      case 5:
        Bh(d);
        break;
      case 4:
        zh();
        break;
      case 13:
        E(L);
        break;
      case 19:
        E(L);
        break;
      case 10:
        ah(d.type._context);
        break;
      case 22:
      case 23:
        Hj();
    }
    c = c.return;
  }
  Q = a;
  Y$1 = a = Pg(a.current, null);
  Z = fj = b;
  T$1 = 0;
  pk = null;
  rk = qk = rh = 0;
  tk = sk = null;
  if (null !== fh) {
    for (b = 0; b < fh.length; b++) if (c = fh[b], d = c.interleaved, null !== d) {
      c.interleaved = null;
      var e = d.next, f2 = c.pending;
      if (null !== f2) {
        var g = f2.next;
        f2.next = e;
        d.next = g;
      }
      c.pending = d;
    }
    fh = null;
  }
  return a;
}
function Mk(a, b) {
  do {
    var c = Y$1;
    try {
      $g();
      Fh.current = Rh;
      if (Ih) {
        for (var d = M.memoizedState; null !== d; ) {
          var e = d.queue;
          null !== e && (e.pending = null);
          d = d.next;
        }
        Ih = false;
      }
      Hh = 0;
      O = N = M = null;
      Jh = false;
      Kh = 0;
      nk.current = null;
      if (null === c || null === c.return) {
        T$1 = 1;
        pk = b;
        Y$1 = null;
        break;
      }
      a: {
        var f2 = a, g = c.return, h = c, k2 = b;
        b = Z;
        h.flags |= 32768;
        if (null !== k2 && "object" === typeof k2 && "function" === typeof k2.then) {
          var l2 = k2, m2 = h, q2 = m2.tag;
          if (0 === (m2.mode & 1) && (0 === q2 || 11 === q2 || 15 === q2)) {
            var r2 = m2.alternate;
            r2 ? (m2.updateQueue = r2.updateQueue, m2.memoizedState = r2.memoizedState, m2.lanes = r2.lanes) : (m2.updateQueue = null, m2.memoizedState = null);
          }
          var y2 = Ui(g);
          if (null !== y2) {
            y2.flags &= -257;
            Vi(y2, g, h, f2, b);
            y2.mode & 1 && Si(f2, l2, b);
            b = y2;
            k2 = l2;
            var n2 = b.updateQueue;
            if (null === n2) {
              var t2 = /* @__PURE__ */ new Set();
              t2.add(k2);
              b.updateQueue = t2;
            } else n2.add(k2);
            break a;
          } else {
            if (0 === (b & 1)) {
              Si(f2, l2, b);
              tj();
              break a;
            }
            k2 = Error(p(426));
          }
        } else if (I && h.mode & 1) {
          var J2 = Ui(g);
          if (null !== J2) {
            0 === (J2.flags & 65536) && (J2.flags |= 256);
            Vi(J2, g, h, f2, b);
            Jg(Ji(k2, h));
            break a;
          }
        }
        f2 = k2 = Ji(k2, h);
        4 !== T$1 && (T$1 = 2);
        null === sk ? sk = [f2] : sk.push(f2);
        f2 = g;
        do {
          switch (f2.tag) {
            case 3:
              f2.flags |= 65536;
              b &= -b;
              f2.lanes |= b;
              var x2 = Ni(f2, k2, b);
              ph(f2, x2);
              break a;
            case 1:
              h = k2;
              var w2 = f2.type, u2 = f2.stateNode;
              if (0 === (f2.flags & 128) && ("function" === typeof w2.getDerivedStateFromError || null !== u2 && "function" === typeof u2.componentDidCatch && (null === Ri || !Ri.has(u2)))) {
                f2.flags |= 65536;
                b &= -b;
                f2.lanes |= b;
                var F2 = Qi(f2, h, b);
                ph(f2, F2);
                break a;
              }
          }
          f2 = f2.return;
        } while (null !== f2);
      }
      Sk(c);
    } catch (na) {
      b = na;
      Y$1 === c && null !== c && (Y$1 = c = c.return);
      continue;
    }
    break;
  } while (1);
}
function Jk() {
  var a = mk.current;
  mk.current = Rh;
  return null === a ? Rh : a;
}
function tj() {
  if (0 === T$1 || 3 === T$1 || 2 === T$1) T$1 = 4;
  null === Q || 0 === (rh & 268435455) && 0 === (qk & 268435455) || Ck(Q, Z);
}
function Ik(a, b) {
  var c = K;
  K |= 2;
  var d = Jk();
  if (Q !== a || Z !== b) uk = null, Kk(a, b);
  do
    try {
      Tk();
      break;
    } catch (e) {
      Mk(a, e);
    }
  while (1);
  $g();
  K = c;
  mk.current = d;
  if (null !== Y$1) throw Error(p(261));
  Q = null;
  Z = 0;
  return T$1;
}
function Tk() {
  for (; null !== Y$1; ) Uk(Y$1);
}
function Lk() {
  for (; null !== Y$1 && !cc(); ) Uk(Y$1);
}
function Uk(a) {
  var b = Vk(a.alternate, a, fj);
  a.memoizedProps = a.pendingProps;
  null === b ? Sk(a) : Y$1 = b;
  nk.current = null;
}
function Sk(a) {
  var b = a;
  do {
    var c = b.alternate;
    a = b.return;
    if (0 === (b.flags & 32768)) {
      if (c = Ej(c, b, fj), null !== c) {
        Y$1 = c;
        return;
      }
    } else {
      c = Ij(c, b);
      if (null !== c) {
        c.flags &= 32767;
        Y$1 = c;
        return;
      }
      if (null !== a) a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null;
      else {
        T$1 = 6;
        Y$1 = null;
        return;
      }
    }
    b = b.sibling;
    if (null !== b) {
      Y$1 = b;
      return;
    }
    Y$1 = b = a;
  } while (null !== b);
  0 === T$1 && (T$1 = 5);
}
function Pk(a, b, c) {
  var d = C, e = ok.transition;
  try {
    ok.transition = null, C = 1, Wk(a, b, c, d);
  } finally {
    ok.transition = e, C = d;
  }
  return null;
}
function Wk(a, b, c, d) {
  do
    Hk();
  while (null !== wk);
  if (0 !== (K & 6)) throw Error(p(327));
  c = a.finishedWork;
  var e = a.finishedLanes;
  if (null === c) return null;
  a.finishedWork = null;
  a.finishedLanes = 0;
  if (c === a.current) throw Error(p(177));
  a.callbackNode = null;
  a.callbackPriority = 0;
  var f2 = c.lanes | c.childLanes;
  Bc(a, f2);
  a === Q && (Y$1 = Q = null, Z = 0);
  0 === (c.subtreeFlags & 2064) && 0 === (c.flags & 2064) || vk || (vk = true, Fk(hc, function() {
    Hk();
    return null;
  }));
  f2 = 0 !== (c.flags & 15990);
  if (0 !== (c.subtreeFlags & 15990) || f2) {
    f2 = ok.transition;
    ok.transition = null;
    var g = C;
    C = 1;
    var h = K;
    K |= 4;
    nk.current = null;
    Oj(a, c);
    dk(c, a);
    Oe$1(Df);
    dd = !!Cf;
    Df = Cf = null;
    a.current = c;
    hk(c);
    dc();
    K = h;
    C = g;
    ok.transition = f2;
  } else a.current = c;
  vk && (vk = false, wk = a, xk = e);
  f2 = a.pendingLanes;
  0 === f2 && (Ri = null);
  mc(c.stateNode);
  Dk(a, B$1());
  if (null !== b) for (d = a.onRecoverableError, c = 0; c < b.length; c++) e = b[c], d(e.value, { componentStack: e.stack, digest: e.digest });
  if (Oi) throw Oi = false, a = Pi, Pi = null, a;
  0 !== (xk & 1) && 0 !== a.tag && Hk();
  f2 = a.pendingLanes;
  0 !== (f2 & 1) ? a === zk ? yk++ : (yk = 0, zk = a) : yk = 0;
  jg();
  return null;
}
function Hk() {
  if (null !== wk) {
    var a = Dc(xk), b = ok.transition, c = C;
    try {
      ok.transition = null;
      C = 16 > a ? 16 : a;
      if (null === wk) var d = false;
      else {
        a = wk;
        wk = null;
        xk = 0;
        if (0 !== (K & 6)) throw Error(p(331));
        var e = K;
        K |= 4;
        for (V = a.current; null !== V; ) {
          var f2 = V, g = f2.child;
          if (0 !== (V.flags & 16)) {
            var h = f2.deletions;
            if (null !== h) {
              for (var k2 = 0; k2 < h.length; k2++) {
                var l2 = h[k2];
                for (V = l2; null !== V; ) {
                  var m2 = V;
                  switch (m2.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Pj(8, m2, f2);
                  }
                  var q2 = m2.child;
                  if (null !== q2) q2.return = m2, V = q2;
                  else for (; null !== V; ) {
                    m2 = V;
                    var r2 = m2.sibling, y2 = m2.return;
                    Sj(m2);
                    if (m2 === l2) {
                      V = null;
                      break;
                    }
                    if (null !== r2) {
                      r2.return = y2;
                      V = r2;
                      break;
                    }
                    V = y2;
                  }
                }
              }
              var n2 = f2.alternate;
              if (null !== n2) {
                var t2 = n2.child;
                if (null !== t2) {
                  n2.child = null;
                  do {
                    var J2 = t2.sibling;
                    t2.sibling = null;
                    t2 = J2;
                  } while (null !== t2);
                }
              }
              V = f2;
            }
          }
          if (0 !== (f2.subtreeFlags & 2064) && null !== g) g.return = f2, V = g;
          else b: for (; null !== V; ) {
            f2 = V;
            if (0 !== (f2.flags & 2048)) switch (f2.tag) {
              case 0:
              case 11:
              case 15:
                Pj(9, f2, f2.return);
            }
            var x2 = f2.sibling;
            if (null !== x2) {
              x2.return = f2.return;
              V = x2;
              break b;
            }
            V = f2.return;
          }
        }
        var w2 = a.current;
        for (V = w2; null !== V; ) {
          g = V;
          var u2 = g.child;
          if (0 !== (g.subtreeFlags & 2064) && null !== u2) u2.return = g, V = u2;
          else b: for (g = w2; null !== V; ) {
            h = V;
            if (0 !== (h.flags & 2048)) try {
              switch (h.tag) {
                case 0:
                case 11:
                case 15:
                  Qj(9, h);
              }
            } catch (na) {
              W$1(h, h.return, na);
            }
            if (h === g) {
              V = null;
              break b;
            }
            var F2 = h.sibling;
            if (null !== F2) {
              F2.return = h.return;
              V = F2;
              break b;
            }
            V = h.return;
          }
        }
        K = e;
        jg();
        if (lc && "function" === typeof lc.onPostCommitFiberRoot) try {
          lc.onPostCommitFiberRoot(kc, a);
        } catch (na) {
        }
        d = true;
      }
      return d;
    } finally {
      C = c, ok.transition = b;
    }
  }
  return false;
}
function Xk(a, b, c) {
  b = Ji(c, b);
  b = Ni(a, b, 1);
  a = nh(a, b, 1);
  b = R();
  null !== a && (Ac(a, 1, b), Dk(a, b));
}
function W$1(a, b, c) {
  if (3 === a.tag) Xk(a, a, c);
  else for (; null !== b; ) {
    if (3 === b.tag) {
      Xk(b, a, c);
      break;
    } else if (1 === b.tag) {
      var d = b.stateNode;
      if ("function" === typeof b.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === Ri || !Ri.has(d))) {
        a = Ji(c, a);
        a = Qi(b, a, 1);
        b = nh(b, a, 1);
        a = R();
        null !== b && (Ac(b, 1, a), Dk(b, a));
        break;
      }
    }
    b = b.return;
  }
}
function Ti(a, b, c) {
  var d = a.pingCache;
  null !== d && d.delete(b);
  b = R();
  a.pingedLanes |= a.suspendedLanes & c;
  Q === a && (Z & c) === c && (4 === T$1 || 3 === T$1 && (Z & 130023424) === Z && 500 > B$1() - fk ? Kk(a, 0) : rk |= c);
  Dk(a, b);
}
function Yk(a, b) {
  0 === b && (0 === (a.mode & 1) ? b = 1 : (b = sc, sc <<= 1, 0 === (sc & 130023424) && (sc = 4194304)));
  var c = R();
  a = ih(a, b);
  null !== a && (Ac(a, b, c), Dk(a, c));
}
function uj(a) {
  var b = a.memoizedState, c = 0;
  null !== b && (c = b.retryLane);
  Yk(a, c);
}
function bk(a, b) {
  var c = 0;
  switch (a.tag) {
    case 13:
      var d = a.stateNode;
      var e = a.memoizedState;
      null !== e && (c = e.retryLane);
      break;
    case 19:
      d = a.stateNode;
      break;
    default:
      throw Error(p(314));
  }
  null !== d && d.delete(b);
  Yk(a, c);
}
var Vk;
Vk = function(a, b, c) {
  if (null !== a) if (a.memoizedProps !== b.pendingProps || Wf.current) dh = true;
  else {
    if (0 === (a.lanes & c) && 0 === (b.flags & 128)) return dh = false, yj(a, b, c);
    dh = 0 !== (a.flags & 131072) ? true : false;
  }
  else dh = false, I && 0 !== (b.flags & 1048576) && ug(b, ng, b.index);
  b.lanes = 0;
  switch (b.tag) {
    case 2:
      var d = b.type;
      ij(a, b);
      a = b.pendingProps;
      var e = Yf(b, H.current);
      ch(b, c);
      e = Nh(null, b, d, a, e, c);
      var f2 = Sh();
      b.flags |= 1;
      "object" === typeof e && null !== e && "function" === typeof e.render && void 0 === e.$$typeof ? (b.tag = 1, b.memoizedState = null, b.updateQueue = null, Zf(d) ? (f2 = true, cg(b)) : f2 = false, b.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null, kh(b), e.updater = Ei, b.stateNode = e, e._reactInternals = b, Ii(b, d, a, c), b = jj(null, b, d, true, f2, c)) : (b.tag = 0, I && f2 && vg(b), Xi(null, b, e, c), b = b.child);
      return b;
    case 16:
      d = b.elementType;
      a: {
        ij(a, b);
        a = b.pendingProps;
        e = d._init;
        d = e(d._payload);
        b.type = d;
        e = b.tag = Zk(d);
        a = Ci(d, a);
        switch (e) {
          case 0:
            b = cj(null, b, d, a, c);
            break a;
          case 1:
            b = hj(null, b, d, a, c);
            break a;
          case 11:
            b = Yi(null, b, d, a, c);
            break a;
          case 14:
            b = $i(null, b, d, Ci(d.type, a), c);
            break a;
        }
        throw Error(p(
          306,
          d,
          ""
        ));
      }
      return b;
    case 0:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), cj(a, b, d, e, c);
    case 1:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), hj(a, b, d, e, c);
    case 3:
      a: {
        kj(b);
        if (null === a) throw Error(p(387));
        d = b.pendingProps;
        f2 = b.memoizedState;
        e = f2.element;
        lh(a, b);
        qh(b, d, null, c);
        var g = b.memoizedState;
        d = g.element;
        if (f2.isDehydrated) if (f2 = { element: d, isDehydrated: false, cache: g.cache, pendingSuspenseBoundaries: g.pendingSuspenseBoundaries, transitions: g.transitions }, b.updateQueue.baseState = f2, b.memoizedState = f2, b.flags & 256) {
          e = Ji(Error(p(423)), b);
          b = lj(a, b, d, c, e);
          break a;
        } else if (d !== e) {
          e = Ji(Error(p(424)), b);
          b = lj(a, b, d, c, e);
          break a;
        } else for (yg = Lf(b.stateNode.containerInfo.firstChild), xg = b, I = true, zg = null, c = Vg(b, null, d, c), b.child = c; c; ) c.flags = c.flags & -3 | 4096, c = c.sibling;
        else {
          Ig();
          if (d === e) {
            b = Zi(a, b, c);
            break a;
          }
          Xi(a, b, d, c);
        }
        b = b.child;
      }
      return b;
    case 5:
      return Ah(b), null === a && Eg(b), d = b.type, e = b.pendingProps, f2 = null !== a ? a.memoizedProps : null, g = e.children, Ef(d, e) ? g = null : null !== f2 && Ef(d, f2) && (b.flags |= 32), gj(a, b), Xi(a, b, g, c), b.child;
    case 6:
      return null === a && Eg(b), null;
    case 13:
      return oj(a, b, c);
    case 4:
      return yh(b, b.stateNode.containerInfo), d = b.pendingProps, null === a ? b.child = Ug(b, null, d, c) : Xi(a, b, d, c), b.child;
    case 11:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), Yi(a, b, d, e, c);
    case 7:
      return Xi(a, b, b.pendingProps, c), b.child;
    case 8:
      return Xi(a, b, b.pendingProps.children, c), b.child;
    case 12:
      return Xi(a, b, b.pendingProps.children, c), b.child;
    case 10:
      a: {
        d = b.type._context;
        e = b.pendingProps;
        f2 = b.memoizedProps;
        g = e.value;
        G(Wg, d._currentValue);
        d._currentValue = g;
        if (null !== f2) if (He$1(f2.value, g)) {
          if (f2.children === e.children && !Wf.current) {
            b = Zi(a, b, c);
            break a;
          }
        } else for (f2 = b.child, null !== f2 && (f2.return = b); null !== f2; ) {
          var h = f2.dependencies;
          if (null !== h) {
            g = f2.child;
            for (var k2 = h.firstContext; null !== k2; ) {
              if (k2.context === d) {
                if (1 === f2.tag) {
                  k2 = mh(-1, c & -c);
                  k2.tag = 2;
                  var l2 = f2.updateQueue;
                  if (null !== l2) {
                    l2 = l2.shared;
                    var m2 = l2.pending;
                    null === m2 ? k2.next = k2 : (k2.next = m2.next, m2.next = k2);
                    l2.pending = k2;
                  }
                }
                f2.lanes |= c;
                k2 = f2.alternate;
                null !== k2 && (k2.lanes |= c);
                bh(
                  f2.return,
                  c,
                  b
                );
                h.lanes |= c;
                break;
              }
              k2 = k2.next;
            }
          } else if (10 === f2.tag) g = f2.type === b.type ? null : f2.child;
          else if (18 === f2.tag) {
            g = f2.return;
            if (null === g) throw Error(p(341));
            g.lanes |= c;
            h = g.alternate;
            null !== h && (h.lanes |= c);
            bh(g, c, b);
            g = f2.sibling;
          } else g = f2.child;
          if (null !== g) g.return = f2;
          else for (g = f2; null !== g; ) {
            if (g === b) {
              g = null;
              break;
            }
            f2 = g.sibling;
            if (null !== f2) {
              f2.return = g.return;
              g = f2;
              break;
            }
            g = g.return;
          }
          f2 = g;
        }
        Xi(a, b, e.children, c);
        b = b.child;
      }
      return b;
    case 9:
      return e = b.type, d = b.pendingProps.children, ch(b, c), e = eh(e), d = d(e), b.flags |= 1, Xi(a, b, d, c), b.child;
    case 14:
      return d = b.type, e = Ci(d, b.pendingProps), e = Ci(d.type, e), $i(a, b, d, e, c);
    case 15:
      return bj(a, b, b.type, b.pendingProps, c);
    case 17:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), ij(a, b), b.tag = 1, Zf(d) ? (a = true, cg(b)) : a = false, ch(b, c), Gi(b, d, e), Ii(b, d, e, c), jj(null, b, d, true, a, c);
    case 19:
      return xj(a, b, c);
    case 22:
      return dj(a, b, c);
  }
  throw Error(p(156, b.tag));
};
function Fk(a, b) {
  return ac(a, b);
}
function $k(a, b, c, d) {
  this.tag = a;
  this.key = c;
  this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
  this.index = 0;
  this.ref = null;
  this.pendingProps = b;
  this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
  this.mode = d;
  this.subtreeFlags = this.flags = 0;
  this.deletions = null;
  this.childLanes = this.lanes = 0;
  this.alternate = null;
}
function Bg(a, b, c, d) {
  return new $k(a, b, c, d);
}
function aj(a) {
  a = a.prototype;
  return !(!a || !a.isReactComponent);
}
function Zk(a) {
  if ("function" === typeof a) return aj(a) ? 1 : 0;
  if (void 0 !== a && null !== a) {
    a = a.$$typeof;
    if (a === Da) return 11;
    if (a === Ga) return 14;
  }
  return 2;
}
function Pg(a, b) {
  var c = a.alternate;
  null === c ? (c = Bg(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.type = a.type, c.flags = 0, c.subtreeFlags = 0, c.deletions = null);
  c.flags = a.flags & 14680064;
  c.childLanes = a.childLanes;
  c.lanes = a.lanes;
  c.child = a.child;
  c.memoizedProps = a.memoizedProps;
  c.memoizedState = a.memoizedState;
  c.updateQueue = a.updateQueue;
  b = a.dependencies;
  c.dependencies = null === b ? null : { lanes: b.lanes, firstContext: b.firstContext };
  c.sibling = a.sibling;
  c.index = a.index;
  c.ref = a.ref;
  return c;
}
function Rg(a, b, c, d, e, f2) {
  var g = 2;
  d = a;
  if ("function" === typeof a) aj(a) && (g = 1);
  else if ("string" === typeof a) g = 5;
  else a: switch (a) {
    case ya:
      return Tg(c.children, e, f2, b);
    case za:
      g = 8;
      e |= 8;
      break;
    case Aa:
      return a = Bg(12, c, b, e | 2), a.elementType = Aa, a.lanes = f2, a;
    case Ea:
      return a = Bg(13, c, b, e), a.elementType = Ea, a.lanes = f2, a;
    case Fa:
      return a = Bg(19, c, b, e), a.elementType = Fa, a.lanes = f2, a;
    case Ia:
      return pj(c, e, f2, b);
    default:
      if ("object" === typeof a && null !== a) switch (a.$$typeof) {
        case Ba:
          g = 10;
          break a;
        case Ca:
          g = 9;
          break a;
        case Da:
          g = 11;
          break a;
        case Ga:
          g = 14;
          break a;
        case Ha:
          g = 16;
          d = null;
          break a;
      }
      throw Error(p(130, null == a ? a : typeof a, ""));
  }
  b = Bg(g, c, b, e);
  b.elementType = a;
  b.type = d;
  b.lanes = f2;
  return b;
}
function Tg(a, b, c, d) {
  a = Bg(7, a, d, b);
  a.lanes = c;
  return a;
}
function pj(a, b, c, d) {
  a = Bg(22, a, d, b);
  a.elementType = Ia;
  a.lanes = c;
  a.stateNode = { isHidden: false };
  return a;
}
function Qg(a, b, c) {
  a = Bg(6, a, null, b);
  a.lanes = c;
  return a;
}
function Sg(a, b, c) {
  b = Bg(4, null !== a.children ? a.children : [], a.key, b);
  b.lanes = c;
  b.stateNode = { containerInfo: a.containerInfo, pendingChildren: null, implementation: a.implementation };
  return b;
}
function al(a, b, c, d, e) {
  this.tag = b;
  this.containerInfo = a;
  this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
  this.timeoutHandle = -1;
  this.callbackNode = this.pendingContext = this.context = null;
  this.callbackPriority = 0;
  this.eventTimes = zc(0);
  this.expirationTimes = zc(-1);
  this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
  this.entanglements = zc(0);
  this.identifierPrefix = d;
  this.onRecoverableError = e;
  this.mutableSourceEagerHydrationData = null;
}
function bl(a, b, c, d, e, f2, g, h, k2) {
  a = new al(a, b, c, h, k2);
  1 === b ? (b = 1, true === f2 && (b |= 8)) : b = 0;
  f2 = Bg(3, null, null, b);
  a.current = f2;
  f2.stateNode = a;
  f2.memoizedState = { element: d, isDehydrated: c, cache: null, transitions: null, pendingSuspenseBoundaries: null };
  kh(f2);
  return a;
}
function cl(a, b, c) {
  var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
  return { $$typeof: wa, key: null == d ? null : "" + d, children: a, containerInfo: b, implementation: c };
}
function dl(a) {
  if (!a) return Vf;
  a = a._reactInternals;
  a: {
    if (Vb(a) !== a || 1 !== a.tag) throw Error(p(170));
    var b = a;
    do {
      switch (b.tag) {
        case 3:
          b = b.stateNode.context;
          break a;
        case 1:
          if (Zf(b.type)) {
            b = b.stateNode.__reactInternalMemoizedMergedChildContext;
            break a;
          }
      }
      b = b.return;
    } while (null !== b);
    throw Error(p(171));
  }
  if (1 === a.tag) {
    var c = a.type;
    if (Zf(c)) return bg(a, c, b);
  }
  return b;
}
function el(a, b, c, d, e, f2, g, h, k2) {
  a = bl(c, d, true, a, e, f2, g, h, k2);
  a.context = dl(null);
  c = a.current;
  d = R();
  e = yi(c);
  f2 = mh(d, e);
  f2.callback = void 0 !== b && null !== b ? b : null;
  nh(c, f2, e);
  a.current.lanes = e;
  Ac(a, e, d);
  Dk(a, d);
  return a;
}
function fl(a, b, c, d) {
  var e = b.current, f2 = R(), g = yi(e);
  c = dl(c);
  null === b.context ? b.context = c : b.pendingContext = c;
  b = mh(f2, g);
  b.payload = { element: a };
  d = void 0 === d ? null : d;
  null !== d && (b.callback = d);
  a = nh(e, b, g);
  null !== a && (gi(a, e, g, f2), oh(a, e, g));
  return g;
}
function gl(a) {
  a = a.current;
  if (!a.child) return null;
  switch (a.child.tag) {
    case 5:
      return a.child.stateNode;
    default:
      return a.child.stateNode;
  }
}
function hl(a, b) {
  a = a.memoizedState;
  if (null !== a && null !== a.dehydrated) {
    var c = a.retryLane;
    a.retryLane = 0 !== c && c < b ? c : b;
  }
}
function il(a, b) {
  hl(a, b);
  (a = a.alternate) && hl(a, b);
}
function jl() {
  return null;
}
var kl = "function" === typeof reportError ? reportError : function(a) {
  console.error(a);
};
function ll(a) {
  this._internalRoot = a;
}
ml.prototype.render = ll.prototype.render = function(a) {
  var b = this._internalRoot;
  if (null === b) throw Error(p(409));
  fl(a, b, null, null);
};
ml.prototype.unmount = ll.prototype.unmount = function() {
  var a = this._internalRoot;
  if (null !== a) {
    this._internalRoot = null;
    var b = a.containerInfo;
    Rk(function() {
      fl(null, a, null, null);
    });
    b[uf] = null;
  }
};
function ml(a) {
  this._internalRoot = a;
}
ml.prototype.unstable_scheduleHydration = function(a) {
  if (a) {
    var b = Hc();
    a = { blockedOn: null, target: a, priority: b };
    for (var c = 0; c < Qc.length && 0 !== b && b < Qc[c].priority; c++) ;
    Qc.splice(c, 0, a);
    0 === c && Vc(a);
  }
};
function nl(a) {
  return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType);
}
function ol(a) {
  return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType && (8 !== a.nodeType || " react-mount-point-unstable " !== a.nodeValue));
}
function pl() {
}
function ql(a, b, c, d, e) {
  if (e) {
    if ("function" === typeof d) {
      var f2 = d;
      d = function() {
        var a2 = gl(g);
        f2.call(a2);
      };
    }
    var g = el(b, d, a, 0, null, false, false, "", pl);
    a._reactRootContainer = g;
    a[uf] = g.current;
    sf(8 === a.nodeType ? a.parentNode : a);
    Rk();
    return g;
  }
  for (; e = a.lastChild; ) a.removeChild(e);
  if ("function" === typeof d) {
    var h = d;
    d = function() {
      var a2 = gl(k2);
      h.call(a2);
    };
  }
  var k2 = bl(a, 0, false, null, null, false, false, "", pl);
  a._reactRootContainer = k2;
  a[uf] = k2.current;
  sf(8 === a.nodeType ? a.parentNode : a);
  Rk(function() {
    fl(b, k2, c, d);
  });
  return k2;
}
function rl(a, b, c, d, e) {
  var f2 = c._reactRootContainer;
  if (f2) {
    var g = f2;
    if ("function" === typeof e) {
      var h = e;
      e = function() {
        var a2 = gl(g);
        h.call(a2);
      };
    }
    fl(b, g, a, e);
  } else g = ql(c, b, a, e, d);
  return gl(g);
}
Ec = function(a) {
  switch (a.tag) {
    case 3:
      var b = a.stateNode;
      if (b.current.memoizedState.isDehydrated) {
        var c = tc(b.pendingLanes);
        0 !== c && (Cc(b, c | 1), Dk(b, B$1()), 0 === (K & 6) && (Gj = B$1() + 500, jg()));
      }
      break;
    case 13:
      Rk(function() {
        var b2 = ih(a, 1);
        if (null !== b2) {
          var c2 = R();
          gi(b2, a, 1, c2);
        }
      }), il(a, 1);
  }
};
Fc = function(a) {
  if (13 === a.tag) {
    var b = ih(a, 134217728);
    if (null !== b) {
      var c = R();
      gi(b, a, 134217728, c);
    }
    il(a, 134217728);
  }
};
Gc = function(a) {
  if (13 === a.tag) {
    var b = yi(a), c = ih(a, b);
    if (null !== c) {
      var d = R();
      gi(c, a, b, d);
    }
    il(a, b);
  }
};
Hc = function() {
  return C;
};
Ic = function(a, b) {
  var c = C;
  try {
    return C = a, b();
  } finally {
    C = c;
  }
};
yb = function(a, b, c) {
  switch (b) {
    case "input":
      bb(a, c);
      b = c.name;
      if ("radio" === c.type && null != b) {
        for (c = a; c.parentNode; ) c = c.parentNode;
        c = c.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');
        for (b = 0; b < c.length; b++) {
          var d = c[b];
          if (d !== a && d.form === a.form) {
            var e = Db(d);
            if (!e) throw Error(p(90));
            Wa(d);
            bb(d, e);
          }
        }
      }
      break;
    case "textarea":
      ib(a, c);
      break;
    case "select":
      b = c.value, null != b && fb(a, !!c.multiple, b, false);
  }
};
Gb = Qk;
Hb = Rk;
var sl = { usingClientEntryPoint: false, Events: [Cb, ue$1, Db, Eb, Fb, Qk] }, tl = { findFiberByHostInstance: Wc, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" };
var ul = { bundleType: tl.bundleType, version: tl.version, rendererPackageName: tl.rendererPackageName, rendererConfig: tl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ua.ReactCurrentDispatcher, findHostInstanceByFiber: function(a) {
  a = Zb(a);
  return null === a ? null : a.stateNode;
}, findFiberByHostInstance: tl.findFiberByHostInstance || jl, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
  var vl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!vl.isDisabled && vl.supportsFiber) try {
    kc = vl.inject(ul), lc = vl;
  } catch (a) {
  }
}
reactDom_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sl;
reactDom_production_min.createPortal = function(a, b) {
  var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
  if (!nl(b)) throw Error(p(200));
  return cl(a, b, null, c);
};
reactDom_production_min.createRoot = function(a, b) {
  if (!nl(a)) throw Error(p(299));
  var c = false, d = "", e = kl;
  null !== b && void 0 !== b && (true === b.unstable_strictMode && (c = true), void 0 !== b.identifierPrefix && (d = b.identifierPrefix), void 0 !== b.onRecoverableError && (e = b.onRecoverableError));
  b = bl(a, 1, false, null, null, c, false, d, e);
  a[uf] = b.current;
  sf(8 === a.nodeType ? a.parentNode : a);
  return new ll(b);
};
reactDom_production_min.findDOMNode = function(a) {
  if (null == a) return null;
  if (1 === a.nodeType) return a;
  var b = a._reactInternals;
  if (void 0 === b) {
    if ("function" === typeof a.render) throw Error(p(188));
    a = Object.keys(a).join(",");
    throw Error(p(268, a));
  }
  a = Zb(b);
  a = null === a ? null : a.stateNode;
  return a;
};
reactDom_production_min.flushSync = function(a) {
  return Rk(a);
};
reactDom_production_min.hydrate = function(a, b, c) {
  if (!ol(b)) throw Error(p(200));
  return rl(null, a, b, true, c);
};
reactDom_production_min.hydrateRoot = function(a, b, c) {
  if (!nl(a)) throw Error(p(405));
  var d = null != c && c.hydratedSources || null, e = false, f2 = "", g = kl;
  null !== c && void 0 !== c && (true === c.unstable_strictMode && (e = true), void 0 !== c.identifierPrefix && (f2 = c.identifierPrefix), void 0 !== c.onRecoverableError && (g = c.onRecoverableError));
  b = el(b, null, a, 1, null != c ? c : null, e, false, f2, g);
  a[uf] = b.current;
  sf(a);
  if (d) for (a = 0; a < d.length; a++) c = d[a], e = c._getVersion, e = e(c._source), null == b.mutableSourceEagerHydrationData ? b.mutableSourceEagerHydrationData = [c, e] : b.mutableSourceEagerHydrationData.push(
    c,
    e
  );
  return new ml(b);
};
reactDom_production_min.render = function(a, b, c) {
  if (!ol(b)) throw Error(p(200));
  return rl(null, a, b, false, c);
};
reactDom_production_min.unmountComponentAtNode = function(a) {
  if (!ol(a)) throw Error(p(40));
  return a._reactRootContainer ? (Rk(function() {
    rl(null, null, a, false, function() {
      a._reactRootContainer = null;
      a[uf] = null;
    });
  }), true) : false;
};
reactDom_production_min.unstable_batchedUpdates = Qk;
reactDom_production_min.unstable_renderSubtreeIntoContainer = function(a, b, c, d) {
  if (!ol(c)) throw Error(p(200));
  if (null == a || void 0 === a._reactInternals) throw Error(p(38));
  return rl(a, b, c, false, d);
};
reactDom_production_min.version = "18.3.1-next-f1338f8080-20240426";
function checkDCE() {
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
    return;
  }
  try {
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    console.error(err);
  }
}
{
  checkDCE();
  reactDom.exports = reactDom_production_min;
}
var reactDomExports = reactDom.exports;
const So = /* @__PURE__ */ getDefaultExportFromCjs(reactDomExports);
var m = reactDomExports;
{
  client.createRoot = m.createRoot;
  client.hydrateRoot = m.hydrateRoot;
}
const createStoreImpl = (createState) => {
  let state;
  const listeners = /* @__PURE__ */ new Set();
  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const getInitialState = () => initialState;
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const api = { setState, getState, getInitialState, subscribe };
  const initialState = state = createState(setState, getState, api);
  return api;
};
const createStore = (createState) => createState ? createStoreImpl(createState) : createStoreImpl;
const identity = (arg) => arg;
function useStore(api, selector = identity) {
  const slice = React.useSyncExternalStore(
    api.subscribe,
    React.useCallback(() => selector(api.getState()), [api, selector]),
    React.useCallback(() => selector(api.getInitialState()), [api, selector])
  );
  React.useDebugValue(slice);
  return slice;
}
const createImpl = (createState) => {
  const api = createStore(createState);
  const useBoundStore = (selector) => useStore(api, selector);
  Object.assign(useBoundStore, api);
  return useBoundStore;
};
const create = (createState) => createState ? createImpl(createState) : createImpl;
const defaultProgress = {
  phase: "scanning",
  current: 0,
  total: 0,
  currentFile: "",
  message: ""
};
const defaultStats = {
  totalImages: 0,
  totalFilesScanned: 0,
  duplicateGroups: 0,
  exactDuplicates: 0,
  similarImages: 0,
  totalSize: 0,
  duplicateSize: 0,
  scanDurationMs: 0
};
const useAppStore = create((set, get) => ({
  view: "scan",
  folders: [],
  scanState: "idle",
  progress: defaultProgress,
  similarityThreshold: 5,
  results: [],
  failedFiles: [],
  stats: defaultStats,
  searchQuery: "",
  filterType: "all",
  sortBy: "similarity",
  formatFilter: [],
  selectedFiles: /* @__PURE__ */ new Set(),
  undoStack: [],
  showUndoToast: false,
  lastDeleteOp: null,
  comparePaths: null,
  autoSelectLowerQuality: true,
  /* Navigation */
  setView: (view) => set({ view }),
  /* Folders */
  addFolders: (paths) => set((s) => {
    const existing = new Set(s.folders);
    const newFolders = paths.filter((p2) => !existing.has(p2));
    return { folders: [...s.folders, ...newFolders] };
  }),
  removeFolder: (path) => set((s) => ({ folders: s.folders.filter((f2) => f2 !== path) })),
  clearFolders: () => set({ folders: [] }),
  /* Scan */
  setScanState: (scanState) => set({ scanState }),
  setProgress: (progress) => set({ progress }),
  setSimilarityThreshold: (similarityThreshold) => set({ similarityThreshold }),
  /* Results — takes full ScanResults from backend */
  setResults: (scanResults) => {
    const { groups, failedFiles = [], totalFilesScanned, scanDurationMs } = scanResults;
    const exactDuplicates = groups.filter((g) => g.type === "exact").length;
    const similarImages = groups.filter((g) => g.type === "similar").length;
    const totalImages = groups.reduce((acc, g) => acc + g.images.length, 0);
    const totalSize = groups.reduce(
      (acc, g) => acc + g.images.reduce((a, img) => a + img.size, 0),
      0
    );
    const duplicateSize = groups.reduce((acc, g) => acc + g.spaceSavings, 0);
    set({
      results: groups,
      failedFiles,
      stats: {
        totalImages,
        totalFilesScanned: totalFilesScanned || totalImages,
        duplicateGroups: groups.length,
        exactDuplicates,
        similarImages,
        totalSize,
        duplicateSize,
        scanDurationMs: scanDurationMs || 0
      }
    });
  },
  clearResults: () => set({
    results: [],
    failedFiles: [],
    stats: defaultStats,
    selectedFiles: /* @__PURE__ */ new Set(),
    searchQuery: "",
    filterType: "all",
    sortBy: "similarity"
  }),
  /* Filtering */
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setFilterType: (filterType) => set({ filterType }),
  setSortBy: (sortBy) => set({ sortBy }),
  setFormatFilter: (formatFilter) => set({ formatFilter }),
  /* Selection */
  toggleFileSelection: (path) => set((s) => {
    const next = new Set(s.selectedFiles);
    if (next.has(path)) next.delete(path);
    else next.add(path);
    return { selectedFiles: next };
  }),
  selectFiles: (paths) => set((s) => {
    const next = new Set(s.selectedFiles);
    paths.forEach((p2) => next.add(p2));
    return { selectedFiles: next };
  }),
  deselectFiles: (paths) => set((s) => {
    const next = new Set(s.selectedFiles);
    paths.forEach((p2) => next.delete(p2));
    return { selectedFiles: next };
  }),
  selectAllDuplicates: () => {
    const { results } = get();
    const paths = [];
    results.forEach((group) => {
      group.images.forEach((img) => {
        if (!img.isOriginal) {
          paths.push(img.filePath);
        }
      });
    });
    set({ selectedFiles: new Set(paths) });
  },
  deselectAll: () => set({ selectedFiles: /* @__PURE__ */ new Set() }),
  /* Undo — now uses undoId from backend */
  pushDeleteOp: (op) => set((s) => ({
    undoStack: [...s.undoStack, op],
    lastDeleteOp: op,
    showUndoToast: true
  })),
  popDeleteOp: () => {
    const { undoStack } = get();
    if (undoStack.length === 0) return null;
    const last = undoStack[undoStack.length - 1];
    set({ undoStack: undoStack.slice(0, -1), showUndoToast: false, lastDeleteOp: null });
    return last;
  },
  dismissUndoToast: () => set({ showUndoToast: false }),
  /* Post-delete cleanup */
  removeDeletedFiles: (paths) => {
    const pathSet = new Set(paths);
    set((s) => {
      const newResults = s.results.map((group) => ({
        ...group,
        images: group.images.filter((img) => !pathSet.has(img.filePath))
      })).filter((group) => group.images.length > 1);
      const newSelected = new Set(s.selectedFiles);
      paths.forEach((p2) => newSelected.delete(p2));
      return { results: newResults, selectedFiles: newSelected };
    });
    const { results, stats } = get();
    const exactDuplicates = results.filter((g) => g.type === "exact").length;
    const similarImages = results.filter((g) => g.type === "similar").length;
    const totalImages = results.reduce((acc, g) => acc + g.images.length, 0);
    const totalSize = results.reduce(
      (acc, g) => acc + g.images.reduce((a, img) => a + img.size, 0),
      0
    );
    const duplicateSize = results.reduce((acc, g) => acc + g.spaceSavings, 0);
    set({
      stats: {
        ...stats,
        totalImages,
        duplicateGroups: results.length,
        exactDuplicates,
        similarImages,
        totalSize,
        duplicateSize
      }
    });
  },
  /* Compare */
  setComparePaths: (comparePaths) => set({ comparePaths }),
  /* Settings */
  setAutoSelectLowerQuality: (autoSelectLowerQuality) => set({ autoSelectLowerQuality }),
  /* Computed helpers */
  getFilteredResults: () => {
    const { results, searchQuery, filterType, sortBy, formatFilter } = get();
    let filtered = [...results];
    if (filterType !== "all") {
      filtered = filtered.filter((g) => g.type === filterType);
    }
    if (formatFilter.length > 0) {
      filtered = filtered.filter(
        (g) => g.images.some((img) => formatFilter.includes(img.format.toLowerCase()))
      );
    }
    if (searchQuery.trim()) {
      const q2 = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (g) => g.images.some(
          (img) => img.fileName.toLowerCase().includes(q2) || img.filePath.toLowerCase().includes(q2)
        )
      );
    }
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "similarity":
          return b.similarity - a.similarity;
        case "size":
          return b.spaceSavings - a.spaceSavings;
        case "date":
          return new Date(b.images[0]?.createdAt || 0).getTime() - new Date(a.images[0]?.createdAt || 0).getTime();
        default:
          return 0;
      }
    });
    return filtered;
  },
  getSelectedSize: () => {
    const { results, selectedFiles } = get();
    let total = 0;
    results.forEach(
      (g) => g.images.forEach((img) => {
        if (selectedFiles.has(img.filePath)) total += img.size;
      })
    );
    return total;
  }
}));
function formatBytes(bytes) {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const k2 = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k2));
  const value = bytes / Math.pow(k2, i);
  return `${value.toFixed(i === 0 ? 0 : 2)} ${units[i]}`;
}
function truncatePath(path, maxLen = 50) {
  if (path.length <= maxLen) return path;
  const sep = path.includes("\\") ? "\\" : "/";
  const parts = path.split(sep);
  const filename = parts[parts.length - 1];
  if (filename.length >= maxLen - 4) {
    return "..." + filename.slice(-(maxLen - 3));
  }
  const prefix = parts.slice(0, 2).join(sep);
  const remaining = maxLen - prefix.length - filename.length - 5;
  if (remaining <= 0) {
    return prefix + sep + "..." + sep + filename;
  }
  return prefix + sep + "..." + sep + filename;
}
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Icon = reactExports.forwardRef(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => {
    return reactExports.createElement(
      "svg",
      {
        ref,
        ...defaultAttributes,
        width: size,
        height: size,
        stroke: color,
        strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        className: mergeClasses("lucide", className),
        ...rest
      },
      [
        ...iconNode.map(([tag, attrs]) => reactExports.createElement(tag, attrs)),
        ...Array.isArray(children) ? children : [children]
      ]
    );
  }
);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const createLucideIcon = (iconName, iconNode) => {
  const Component = reactExports.forwardRef(
    ({ className, ...props }, ref) => reactExports.createElement(Icon, {
      ref,
      iconNode,
      className: mergeClasses(`lucide-${toKebabCase(iconName)}`, className),
      ...props
    })
  );
  Component.displayName = `${iconName}`;
  return Component;
};
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ArrowLeft = createLucideIcon("ArrowLeft", [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ArrowUpNarrowWide = createLucideIcon("ArrowUpNarrowWide", [
  ["path", { d: "m3 8 4-4 4 4", key: "11wl7u" }],
  ["path", { d: "M7 4v16", key: "1glfcx" }],
  ["path", { d: "M11 12h4", key: "q8tih4" }],
  ["path", { d: "M11 16h7", key: "uosisv" }],
  ["path", { d: "M11 20h10", key: "jvxblo" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ChartColumn = createLucideIcon("ChartColumn", [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "M18 17V9", key: "2bz60n" }],
  ["path", { d: "M13 17V5", key: "1frdt8" }],
  ["path", { d: "M8 17v-3", key: "17ska0" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Check = createLucideIcon("Check", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ChevronDown = createLucideIcon("ChevronDown", [
  ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ChevronRight = createLucideIcon("ChevronRight", [
  ["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const CircleCheckBig = createLucideIcon("CircleCheckBig", [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const CircleX = createLucideIcon("CircleX", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Copy = createLucideIcon("Copy", [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Crown = createLucideIcon("Crown", [
  [
    "path",
    {
      d: "M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z",
      key: "1vdc57"
    }
  ],
  ["path", { d: "M5 21h14", key: "11awu3" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ExternalLink = createLucideIcon("ExternalLink", [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Eye = createLucideIcon("Eye", [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const FileImage = createLucideIcon("FileImage", [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["circle", { cx: "10", cy: "12", r: "2", key: "737tya" }],
  ["path", { d: "m20 17-1.296-1.296a2.41 2.41 0 0 0-3.408 0L9 22", key: "wt3hpn" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Filter = createLucideIcon("Filter", [
  ["polygon", { points: "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3", key: "1yg77f" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const FolderOpen = createLucideIcon("FolderOpen", [
  [
    "path",
    {
      d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",
      key: "usdka0"
    }
  ]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const HardDrive = createLucideIcon("HardDrive", [
  ["line", { x1: "22", x2: "2", y1: "12", y2: "12", key: "1y58io" }],
  [
    "path",
    {
      d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
      key: "oot6mr"
    }
  ],
  ["line", { x1: "6", x2: "6.01", y1: "16", y2: "16", key: "sgf278" }],
  ["line", { x1: "10", x2: "10.01", y1: "16", y2: "16", key: "1l4acy" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Image = createLucideIcon("Image", [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Info = createLucideIcon("Info", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const LoaderCircle = createLucideIcon("LoaderCircle", [
  ["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Play = createLucideIcon("Play", [
  ["polygon", { points: "6 3 20 12 6 21 6 3", key: "1oa8hb" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Search = createLucideIcon("Search", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Settings = createLucideIcon("Settings", [
  [
    "path",
    {
      d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
      key: "1qme2f"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Shield = createLucideIcon("Shield", [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Trash2 = createLucideIcon("Trash2", [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const TriangleAlert = createLucideIcon("TriangleAlert", [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Undo = createLucideIcon("Undo", [
  ["path", { d: "M3 7v6h6", key: "1v2h90" }],
  ["path", { d: "M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13", key: "1r6uu6" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Upload = createLucideIcon("Upload", [
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["polyline", { points: "17 8 12 3 7 8", key: "t8dd8p" }],
  ["line", { x1: "12", x2: "12", y1: "3", y2: "15", key: "widbto" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const X = createLucideIcon("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zap = createLucideIcon("Zap", [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
]);
const navItems = [
  { id: "scan", icon: FolderOpen, label: "Scan" },
  { id: "results", icon: ChartColumn, label: "Results" },
  { id: "compare", icon: Eye, label: "Compare" },
  { id: "settings", icon: Settings, label: "Settings" }
];
const viewTitles = {
  scan: "Scan for Duplicates",
  results: "Duplicate Results",
  compare: "Image Compare",
  settings: "Settings"
};
function Layout({ children }) {
  const [collapsed, setCollapsed] = reactExports.useState(false);
  const view = useAppStore((s) => s.view);
  const setView = useAppStore((s) => s.setView);
  const scanState = useAppStore((s) => s.scanState);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-surface text-on-surface selection:bg-primary-container selection:text-on-primary-container min-h-screen font-sans", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "aside",
      {
        className: `fixed left-0 top-0 h-full z-40 bg-surface/60 backdrop-blur-[20px] border-r border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] flex flex-col py-6 transition-all duration-300`,
        style: { width: collapsed ? 80 : 240 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent", style: { display: collapsed ? "none" : void 0 }, children: "PhotoSweep" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-on-surface-variant opacity-70 tracking-widest uppercase mt-1", style: { display: collapsed ? "none" : void 0 }, children: "Pro Edition" }),
            collapsed && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded bg-primary-container/80", "aria-hidden": true })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { role: "navigation", "aria-label": "Main navigation", className: "flex-1 flex flex-col gap-1", children: navItems.map((item) => {
            const isActive = view === item.id;
            const Icon2 = item.icon;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => setView(item.id),
                "aria-current": isActive ? "page" : void 0,
                "aria-label": `${item.label} view`,
                title: item.label,
                className: cn(
                  "flex items-center gap-3 px-6 py-3 transition-all duration-300 w-full text-left",
                  isActive ? "bg-white/5 text-primary-container border-l-2 border-primary-container" : "text-on-surface-variant hover:text-on-surface hover:bg-white/10 hover:backdrop-blur-md active:scale-[0.98] border-l-2 border-transparent"
                ),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Icon2, { className: "w-5 h-5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium tracking-wide", style: { display: collapsed ? "none" : void 0 }, children: item.label })
                ]
              },
              item.id
            );
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 mt-auto", children: scanState === "scanning" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full py-4 rounded-xl card-glass border border-primary-container flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.15)] animate-pulse", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 rounded-full bg-primary-container animate-pulse-glow" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-primary-container", children: "Scanning..." })
          ] }) : null })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "fixed top-0 right-0 h-16 z-30 bg-surface/40 backdrop-blur-[20px] border-b border-white/10 flex justify-between items-center px-8", style: { left: collapsed ? 80 : 240, width: `calc(100% - ${collapsed ? 80 : 240}px)` }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setCollapsed((s) => !s),
          "aria-label": collapsed ? "Expand sidebar" : "Collapse sidebar",
          className: "icon-btn mr-2",
          children: collapsed ? "»" : "«"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-semibold text-on-surface tracking-wide", "aria-live": "polite", children: viewTitles[view] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mt-16 p-8 h-[calc(100vh-64px)] flex flex-col relative overflow-hidden", style: { marginLeft: collapsed ? 80 : 240 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed top-[-10%] right-[-5%] w-[400px] h-[400px] bg-primary-container/10 rounded-full blur-[120px] pointer-events-none -z-10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-[-10%] left-[5%] w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none -z-10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-hidden animate-fade-in flex flex-col relative z-0", children })
    ] })
  ] });
}
const ThresholdSlider = () => {
  const { similarityThreshold, setSimilarityThreshold } = useAppStore();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md mx-auto mt-6 card-glass p-4 rounded-xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-sm font-medium text-text-primary flex items-center gap-2", children: [
        "Similarity Sensitivity",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-4 h-4 text-text-secondary hover:text-accent-cyan cursor-help transition-colors" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2 card-glass text-xs text-text-secondary opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all shadow-xl z-20", children: 'Higher value means looser matching (finds more "similar" images that might be different). Lower value requires images to be more identical.' })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-accent-cyan px-2 py-0.5 rounded", children: similarityThreshold })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative pt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "range",
          min: "0",
          max: "20",
          step: "1",
          value: similarityThreshold,
          onChange: (e) => setSimilarityThreshold(parseInt(e.target.value, 10)),
          className: "w-full h-2 bg-white/5 rounded-lg appearance-none cursor-pointer slider-accent"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-text-secondary mt-2 px-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Strict (Exact)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Balanced" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Loose" })
      ] })
    ] })
  ] });
};
function FolderSelector() {
  const folders = useAppStore((s) => s.folders);
  const addFolders = useAppStore((s) => s.addFolders);
  const removeFolder = useAppStore((s) => s.removeFolder);
  const clearFolders = useAppStore((s) => s.clearFolders);
  const similarityThreshold = useAppStore((s) => s.similarityThreshold);
  const setScanState = useAppStore((s) => s.setScanState);
  const setView = useAppStore((s) => s.setView);
  const [isDragging, setIsDragging] = reactExports.useState(false);
  const handleBrowse = reactExports.useCallback(async () => {
    try {
      const selected = await window.api.selectFolders();
      if (selected.length > 0) {
        addFolders(selected);
      }
    } catch (err) {
      console.error("Failed to select folders:", err);
    }
  }, [addFolders]);
  const handleStartScan = reactExports.useCallback(async () => {
    if (folders.length === 0) return;
    try {
      setScanState("scanning");
      setView("scan");
      await window.api.startScan(folders, similarityThreshold);
    } catch (err) {
      console.error("Failed to start scan:", err);
      setScanState("idle");
    }
  }, [folders, similarityThreshold, setScanState, setView]);
  const handleDragOver = reactExports.useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);
  const handleDragLeave = reactExports.useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);
  const handleDrop = reactExports.useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      const items = Array.from(e.dataTransfer.files);
      const folderPaths = items.filter((f2) => f2.type === "" || f2.size === 0).map((f2) => f2.path).filter(Boolean);
      if (folderPaths.length > 0) {
        addFolders(folderPaths);
      }
    },
    [addFolders]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center h-full px-8 py-10 animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8 animate-slide-up", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold gradient-text mb-3", children: "Find Duplicate Photos" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-text-secondary text-sm max-w-md mx-auto leading-relaxed", children: "Select folders to scan for exact and visually similar duplicates. Free up disk space with AI-powered detection." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        role: "button",
        tabIndex: 0,
        "aria-label": "Add folders to scan",
        onKeyDown: (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleBrowse();
          }
        },
        className: cn(
          "dropzone group relative w-full max-w-xl aspect-[21/9] rounded-[32px] transition-all duration-500 cursor-pointer overflow-hidden animate-slide-up",
          isDragging ? "border-primary scale-[1.02] bg-white/10" : "hover:border-primary/50 hover:bg-white/10"
        ),
        style: { animationDelay: "0.1s" },
        onDragOver: handleDragOver,
        onDragLeave: handleDragLeave,
        onDrop: handleDrop,
        onClick: handleBrowse,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col items-center justify-center h-full gap-4 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 mb-2 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500", children: isDragging ? /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-10 h-10 text-primary animate-bounce" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "w-10 h-10 text-primary transition-colors duration-300" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-semibold", children: "Drag and drop folders here" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-on-surface-variant", children: [
              "or",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: (e) => {
                    e.stopPropagation();
                    handleBrowse();
                  },
                  className: "btn btn-ghost",
                  "aria-label": "Browse folders",
                  children: "browse your computer"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-widest text-on-surface-variant/60 mt-2", children: "Supports JPG, PNG, WEBP, HEIC, TIFF, BMP, GIF" })
          ] })
        ]
      }
    ),
    folders.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "w-full max-w-xl mt-6 animate-slide-up",
        style: { animationDelay: "0.15s" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-medium text-text-secondary", children: [
              folders.length,
              " folder",
              folders.length !== 1 ? "s" : "",
              " selected"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: (e) => {
                  e.stopPropagation();
                  clearFolders();
                },
                className: "btn btn-sm btn-ghost",
                children: "Clear all"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: folders.map((folder) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "group flex items-center gap-2 text-sm",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "folder-pill", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "w-3.5 h-3.5 text-accent-cyan shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-text-secondary text-xs truncate max-w-[240px]",
                      title: folder,
                      children: truncatePath(folder, 40)
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: (e) => {
                      e.stopPropagation();
                      removeFolder(folder);
                    },
                    className: "btn btn-sm btn-ghost opacity-0 group-hover:opacity-100",
                    "aria-label": `Remove ${folder}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" })
                  }
                )
              ]
            },
            folder
          )) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "w-full max-w-xl mt-6 animate-slide-up",
        style: { animationDelay: "0.2s" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(ThresholdSlider, {})
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: handleStartScan,
        disabled: folders.length === 0,
        "aria-label": "Start scan",
        title: folders.length === 0 ? "Select folders first" : "Start scan",
        className: cn("mt-8 w-full max-w-xl animate-slide-up btn btn-primary", folders.length === 0 ? "opacity-60 cursor-not-allowed" : ""),
        style: { animationDelay: "0.25s" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex items-center justify-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: cn("w-6 h-6", folders.length === 0 && "opacity-50") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "Start Scan" })
        ] })
      }
    )
  ] });
}
function ScanProgress() {
  const progress = useAppStore((s) => s.progress);
  const setScanState = useAppStore((s) => s.setScanState);
  const { phase, current, total, currentFile, message } = progress;
  const percent = total > 0 ? Math.round(current / total * 100) : current > 0 ? 100 : 0;
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - percent / 100 * circumference;
  const handleCancel = reactExports.useCallback(async () => {
    try {
      await window.api.cancelScan();
      setScanState("cancelled");
    } catch (err) {
      console.error("Failed to cancel scan:", err);
    }
  }, [setScanState]);
  const phaseLabels = {
    scanning: "Scanning folders",
    hashing: "Hashing files",
    grouping: "Grouping duplicates",
    complete: "Complete",
    error: "Error",
    cancelled: "Cancelled"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center h-full px-8 animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-8 card-glass p-6 rounded-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "svg",
        {
          width: "180",
          height: "180",
          className: "circular-progress",
          viewBox: "0 0 180 180",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "progress-gradient", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#06b6d4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "50%", stopColor: "#8b5cf6" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#3b82f6" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "circle",
              {
                className: "circular-progress-track",
                cx: "90",
                cy: "90",
                r: radius,
                strokeWidth: "6"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "circle",
              {
                className: "circular-progress-bar",
                cx: "90",
                cy: "90",
                r: radius,
                strokeWidth: "6",
                strokeDasharray: circumference,
                strokeDashoffset: dashOffset
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-4xl font-bold gradient-text", children: [
          percent,
          "%"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-text-tertiary mt-1 capitalize", children: phaseLabels[phase] || phase })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-md mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 rounded-full bg-white/5 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-full rounded-full gradient-accent transition-all duration-500 ease-out",
        style: { width: `${percent}%` }
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-6 mb-8 w-full max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-text-primary animate-count-up", children: current.toLocaleString() }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-text-tertiary mt-1", children: [
          "of ",
          total > 0 ? total.toLocaleString() : "?",
          " processed"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-text-secondary mt-2", children: message }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-text-muted max-w-md w-full mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 text-accent-cyan animate-spin shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: truncatePath(currentFile || "", 60) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: handleCancel,
        "aria-label": "Cancel scan",
        className: "btn btn-ghost",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }),
          "Cancel Scan"
        ]
      }
    )
  ] });
}
const we = 0, Pt = 1, Xt = 2, Wn = 4;
function fn(t2) {
  return () => t2;
}
function xo(t2) {
  t2();
}
function re(t2, e) {
  return (n2) => t2(e(n2));
}
function mn(t2, e) {
  return () => t2(e);
}
function vo(t2, e) {
  return (n2) => t2(e, n2);
}
function _e(t2) {
  return t2 !== void 0;
}
function To(...t2) {
  return () => {
    t2.map(xo);
  };
}
function Jt() {
}
function ye(t2, e) {
  return e(t2), t2;
}
function Co(t2, e) {
  return e(t2);
}
function rt(...t2) {
  return t2;
}
function Y(t2, e) {
  return t2(Pt, e);
}
function _(t2, e) {
  t2(we, e);
}
function Ne(t2) {
  t2(Xt);
}
function it(t2) {
  return t2(Wn);
}
function k(t2, e) {
  return Y(t2, vo(e, we));
}
function yt(t2, e) {
  const n2 = t2(Pt, (o) => {
    n2(), e(o);
  });
  return n2;
}
function pn(t2) {
  let e, n2;
  return (o) => (r2) => {
    e = r2, n2 && clearTimeout(n2), n2 = setTimeout(() => {
      o(e);
    }, t2);
  };
}
function Pn(t2, e) {
  return t2 === e;
}
function nt(t2 = Pn) {
  let e;
  return (n2) => (o) => {
    t2(e, o) || (e = o, n2(o));
  };
}
function P(t2) {
  return (e) => (n2) => {
    t2(n2) && e(n2);
  };
}
function B(t2) {
  return (e) => re(e, t2);
}
function Bt(t2) {
  return (e) => () => {
    e(t2);
  };
}
function x(t2, ...e) {
  const n2 = wo(...e);
  return (o, r2) => {
    switch (o) {
      case Xt:
        Ne(t2);
        return;
      case Pt:
        return Y(t2, n2(r2));
    }
  };
}
function Lt(t2, e) {
  return (n2) => (o) => {
    n2(e = t2(e, o));
  };
}
function Ut(t2) {
  return (e) => (n2) => {
    t2 > 0 ? t2-- : e(n2);
  };
}
function zt(t2) {
  let e = null, n2;
  return (o) => (r2) => {
    e = r2, !n2 && (n2 = setTimeout(() => {
      n2 = void 0, o(e);
    }, t2));
  };
}
function $(...t2) {
  const e = new Array(t2.length);
  let n2 = 0, o = null;
  const r2 = 2 ** t2.length - 1;
  return t2.forEach((s, i) => {
    const l2 = 2 ** i;
    Y(s, (c) => {
      const d = n2;
      n2 |= l2, e[i] = c, d !== r2 && n2 === r2 && o && (o(), o = null);
    });
  }), (s) => (i) => {
    const l2 = () => {
      s([i].concat(e));
    };
    n2 === r2 ? l2() : o = l2;
  };
}
function wo(...t2) {
  return (e) => t2.reduceRight(Co, e);
}
function yo(t2) {
  let e, n2;
  const o = () => e?.();
  return function(r2, s) {
    switch (r2) {
      case Pt:
        return s ? n2 === s ? void 0 : (o(), n2 = s, e = Y(t2, s), e) : (o(), Jt);
      case Xt:
        o(), n2 = null;
        return;
    }
  };
}
function T(t2) {
  let e = t2;
  const n2 = U();
  return (o, r2) => {
    switch (o) {
      case we:
        e = r2;
        break;
      case Pt: {
        r2(e);
        break;
      }
      case Wn:
        return e;
    }
    return n2(o, r2);
  };
}
function ht(t2, e) {
  return ye(T(e), (n2) => k(t2, n2));
}
function U() {
  const t2 = [];
  return (e, n2) => {
    switch (e) {
      case we:
        t2.slice().forEach((o) => {
          o(n2);
        });
        return;
      case Xt:
        t2.splice(0, t2.length);
        return;
      case Pt:
        return t2.push(n2), () => {
          const o = t2.indexOf(n2);
          o > -1 && t2.splice(o, 1);
        };
    }
  };
}
function Tt(t2) {
  return ye(U(), (e) => k(t2, e));
}
function j(t2, e = [], { singleton: n2 } = { singleton: true }) {
  return {
    constructor: t2,
    dependencies: e,
    id: bo(),
    singleton: n2
  };
}
const bo = () => Symbol();
function Ro(t2) {
  const e = /* @__PURE__ */ new Map(), n2 = ({ constructor: o, dependencies: r2, id: s, singleton: i }) => {
    if (i && e.has(s))
      return e.get(s);
    const l2 = o(r2.map((c) => n2(c)));
    return i && e.set(s, l2), l2;
  };
  return n2(t2);
}
function at(...t2) {
  const e = U(), n2 = new Array(t2.length);
  let o = 0;
  const r2 = 2 ** t2.length - 1;
  return t2.forEach((s, i) => {
    const l2 = 2 ** i;
    Y(s, (c) => {
      n2[i] = c, o |= l2, o === r2 && _(e, n2);
    });
  }), function(s, i) {
    switch (s) {
      case Xt: {
        Ne(e);
        return;
      }
      case Pt:
        return o === r2 && i(n2), Y(e, i);
    }
  };
}
function W(t2, e = Pn) {
  return x(t2, nt(e));
}
function Fe(...t2) {
  return function(e, n2) {
    switch (e) {
      case Xt:
        return;
      case Pt:
        return To(...t2.map((o) => Y(o, n2)));
    }
  };
}
const ft = {
  /** Detailed debugging information including item measurements */
  DEBUG: 0,
  /** General informational messages */
  INFO: 1,
  /** Warning messages for potential issues */
  WARN: 2,
  /** Error messages for failures (default level) */
  ERROR: 3
}, Ho = {
  [ft.DEBUG]: "debug",
  [ft.ERROR]: "error",
  [ft.INFO]: "log",
  [ft.WARN]: "warn"
}, Eo = () => typeof globalThis > "u" ? window : globalThis, Gt = j(
  () => {
    const t2 = T(ft.ERROR);
    return {
      log: T((n2, o, r2 = ft.INFO) => {
        const s = Eo().VIRTUOSO_LOG_LEVEL ?? it(t2);
        r2 >= s && console[Ho[r2]](
          "%creact-virtuoso: %c%s %o",
          "color: #0253b3; font-weight: bold",
          "color: initial",
          n2,
          o
        );
      }),
      logLevel: t2
    };
  },
  [],
  { singleton: true }
), Ve = /* @__PURE__ */ new WeakMap();
function Gn(t2) {
  return "self" in t2 ? t2.document.documentElement : t2;
}
function Bo(t2) {
  const e = Gn(t2), n2 = Ve.get(e);
  if (n2 !== void 0)
    return n2;
  const o = e.ownerDocument.defaultView.getComputedStyle(e).direction === "rtl";
  return Ve.set(e, o), o;
}
function hn(t2) {
  Ve.delete(Gn(t2));
}
function An(t2, e) {
  return Bo(t2) ? -e : e;
}
const _t = An;
function gn(t2, e) {
  return An(t2, e);
}
function Ot(t2, e, n2) {
  return De(t2, e, n2).callbackRef;
}
function De(t2, e, n2) {
  const o = React.useRef(null);
  let r2 = (i) => {
  };
  const s = React.useMemo(() => typeof ResizeObserver < "u" ? new ResizeObserver((i) => {
    const l2 = () => {
      const c = i[0].target;
      c.offsetParent !== null && t2(c);
    };
    n2 ? l2() : requestAnimationFrame(l2);
  }) : null, [t2, n2]);
  return r2 = (i) => {
    i && e ? (s?.observe(i), o.current = i) : (o.current && s?.unobserve(o.current), o.current = null);
  }, { callbackRef: r2, ref: o };
}
function Mn(t2, e, n2, o, r2, s, i, l2, c) {
  const d = React.useCallback(
    (m2) => {
      const v2 = Lo(m2.children, e, l2 ? "offsetWidth" : "offsetHeight", r2);
      let p2 = m2.parentElement;
      for (; p2.dataset.virtuosoScroller === void 0; )
        p2 = p2.parentElement;
      const I2 = p2.lastElementChild.dataset.viewportType === "window";
      let w2;
      I2 && (w2 = p2.ownerDocument.defaultView);
      const R2 = i ? l2 ? i.scrollWidth : i.scrollHeight : I2 ? l2 ? w2.document.documentElement.scrollWidth : w2.document.documentElement.scrollHeight : l2 ? p2.scrollWidth : p2.scrollHeight, h = i ? l2 ? i.offsetWidth : i.offsetHeight : I2 ? l2 ? w2.innerWidth : w2.innerHeight : l2 ? p2.offsetWidth : p2.offsetHeight, f2 = i ? l2 ? _t(i, i.scrollLeft) : i.scrollTop : I2 ? l2 ? _t(w2, w2.scrollX || w2.document.documentElement.scrollLeft) : w2.scrollY || w2.document.documentElement.scrollTop : l2 ? _t(p2, p2.scrollLeft) : p2.scrollTop;
      o({
        scrollHeight: R2,
        scrollTop: Math.max(f2, 0),
        viewportHeight: h
      }), s?.(
        l2 ? In("column-gap", getComputedStyle(m2).columnGap, r2) : In("row-gap", getComputedStyle(m2).rowGap, r2)
      ), v2 !== null && t2(v2);
    },
    [t2, e, r2, s, i, o, l2]
  );
  return De(d, n2, c);
}
function Lo(t2, e, n2, o) {
  const r2 = t2.length;
  if (r2 === 0)
    return null;
  const s = [];
  for (let i = 0; i < r2; i++) {
    const l2 = t2.item(i);
    if (l2.dataset.index === void 0)
      continue;
    const c = parseInt(l2.dataset.index), d = parseFloat(l2.dataset.knownSize), m2 = e(l2, n2);
    if (m2 === 0 && o("Zero-sized element, this should not happen", { child: l2 }, ft.ERROR), m2 === d)
      continue;
    const v2 = s[s.length - 1];
    s.length === 0 || v2.size !== m2 || v2.endIndex !== c - 1 ? s.push({ endIndex: c, size: m2, startIndex: c }) : s[s.length - 1].endIndex++;
  }
  return s;
}
function In(t2, e, n2) {
  return e !== "normal" && e?.endsWith("px") !== true && n2(`${t2} was not resolved to pixel value correctly`, e, ft.WARN), e === "normal" ? 0 : parseInt(e ?? "0", 10);
}
function $e(t2, e, n2) {
  const o = React.useRef(null), r2 = React.useCallback(
    (c) => {
      if (!c?.offsetParent)
        return;
      const d = c.getBoundingClientRect(), m2 = d.width;
      let v2, p2;
      if (e) {
        const I2 = e.getBoundingClientRect(), w2 = d.top - I2.top;
        p2 = I2.height - Math.max(0, w2), v2 = w2 + e.scrollTop;
      } else {
        const I2 = i.current.ownerDocument.defaultView;
        p2 = I2.innerHeight - Math.max(0, d.top), v2 = d.top + I2.scrollY;
      }
      o.current = {
        listHeight: d.height,
        offsetTop: v2,
        visibleHeight: p2,
        visibleWidth: m2
      }, t2(o.current);
    },
    // oxlint-disable-next-line exhaustive-deps
    [t2, e]
  ), { callbackRef: s, ref: i } = De(r2, true, n2), l2 = React.useCallback(() => {
    r2(i.current);
  }, [r2, i]);
  return React.useEffect(() => {
    if (e) {
      e.addEventListener("scroll", l2);
      const d = new ResizeObserver(() => {
        requestAnimationFrame(l2);
      });
      return d.observe(e), () => {
        e.removeEventListener("scroll", l2), d.unobserve(e);
      };
    }
    const c = i.current?.ownerDocument.defaultView;
    return c?.addEventListener("scroll", l2), c?.addEventListener("resize", l2), () => {
      c?.removeEventListener("scroll", l2), c?.removeEventListener("resize", l2);
    };
  }, [l2, e, i]), s;
}
const It = j(
  () => {
    const t2 = U(), e = U(), n2 = T(0), o = U(), r2 = T(0), s = U(), i = U(), l2 = T(0), c = T(0), d = T(0), m2 = T(0), v2 = U(), p2 = U(), I2 = T(false), w2 = T(false), R2 = T(false);
    return k(
      x(
        t2,
        B(({ scrollTop: h }) => h)
      ),
      e
    ), k(
      x(
        t2,
        B(({ scrollHeight: h }) => h)
      ),
      i
    ), k(e, r2), {
      deviation: n2,
      fixedFooterHeight: d,
      fixedHeaderHeight: c,
      footerHeight: m2,
      headerHeight: l2,
      horizontalDirection: w2,
      scrollBy: p2,
      // input
      scrollContainerState: t2,
      scrollHeight: i,
      scrollingInProgress: I2,
      // signals
      scrollTo: v2,
      scrollTop: e,
      skipAnimationFrameInResizeObserver: R2,
      smoothScrollTargetReached: o,
      // state
      statefulScrollTop: r2,
      viewportHeight: s
    };
  },
  [],
  { singleton: true }
), se = { lvl: 0 };
function _n(t2, e) {
  const n2 = t2.length;
  if (n2 === 0)
    return [];
  let { index: o, value: r2 } = e(t2[0]);
  const s = [];
  for (let i = 1; i < n2; i++) {
    const { index: l2, value: c } = e(t2[i]);
    s.push({ end: l2 - 1, start: o, value: r2 }), o = l2, r2 = c;
  }
  return s.push({ end: 1 / 0, start: o, value: r2 }), s;
}
function J(t2) {
  return t2 === se;
}
function ie(t2, e) {
  if (!J(t2))
    return e === t2.k ? t2.v : e < t2.k ? ie(t2.l, e) : ie(t2.r, e);
}
function Rt(t2, e, n2 = "k") {
  if (J(t2))
    return [-1 / 0, void 0];
  if (Number(t2[n2]) === e)
    return [t2.k, t2.v];
  if (Number(t2[n2]) < e) {
    const o = Rt(t2.r, e, n2);
    return o[0] === -1 / 0 ? [t2.k, t2.v] : o;
  }
  return Rt(t2.l, e, n2);
}
function vt(t2, e, n2) {
  return J(t2) ? $n(e, n2, 1) : e === t2.k ? dt(t2, { k: e, v: n2 }) : e < t2.k ? Sn(dt(t2, { l: vt(t2.l, e, n2) })) : Sn(dt(t2, { r: vt(t2.r, e, n2) }));
}
function Yt() {
  return se;
}
function Zt(t2, e, n2) {
  if (J(t2))
    return [];
  const o = Rt(t2, e)[0];
  return Oo(Pe(t2, o, n2));
}
function We(t2, e) {
  if (J(t2))
    return se;
  const { k: n2, l: o, r: r2 } = t2;
  if (e === n2) {
    if (J(o))
      return r2;
    if (J(r2))
      return o;
    const [s, i] = Dn(o);
    return xe(dt(t2, { k: s, l: Nn(o), v: i }));
  }
  return e < n2 ? xe(dt(t2, { l: We(o, e) })) : xe(dt(t2, { r: We(r2, e) }));
}
function Nt(t2) {
  return J(t2) ? [] : [...Nt(t2.l), { k: t2.k, v: t2.v }, ...Nt(t2.r)];
}
function Pe(t2, e, n2) {
  if (J(t2))
    return [];
  const { k: o, l: r2, r: s, v: i } = t2;
  let l2 = [];
  return o > e && (l2 = l2.concat(Pe(r2, e, n2))), o >= e && o <= n2 && l2.push({ k: o, v: i }), o <= n2 && (l2 = l2.concat(Pe(s, e, n2))), l2;
}
function xe(t2) {
  const { l: e, lvl: n2, r: o } = t2;
  if (o.lvl >= n2 - 1 && e.lvl >= n2 - 1)
    return t2;
  if (n2 > o.lvl + 1) {
    if (Be(e))
      return Un(dt(t2, { lvl: n2 - 1 }));
    if (!J(e) && !J(e.r))
      return dt(e.r, {
        l: dt(e, { r: e.r.l }),
        lvl: n2,
        r: dt(t2, {
          l: e.r.r,
          lvl: n2 - 1
        })
      });
    throw new Error("Unexpected empty nodes");
  }
  if (Be(t2))
    return Ge(dt(t2, { lvl: n2 - 1 }));
  if (!J(o) && !J(o.l)) {
    const r2 = o.l, s = Be(r2) ? o.lvl - 1 : o.lvl;
    return dt(r2, {
      l: dt(t2, {
        lvl: n2 - 1,
        r: r2.l
      }),
      lvl: r2.lvl + 1,
      r: Ge(dt(o, { l: r2.r, lvl: s }))
    });
  }
  throw new Error("Unexpected empty nodes");
}
function dt(t2, e) {
  return $n(
    e.k !== void 0 ? e.k : t2.k,
    e.v !== void 0 ? e.v : t2.v,
    e.lvl !== void 0 ? e.lvl : t2.lvl,
    e.l !== void 0 ? e.l : t2.l,
    e.r !== void 0 ? e.r : t2.r
  );
}
function Nn(t2) {
  return J(t2.r) ? t2.l : xe(dt(t2, { r: Nn(t2.r) }));
}
function Be(t2) {
  return J(t2) || t2.lvl > t2.r.lvl;
}
function Dn(t2) {
  return J(t2.r) ? [t2.k, t2.v] : Dn(t2.r);
}
function $n(t2, e, n2, o = se, r2 = se) {
  return { k: t2, l: o, lvl: n2, r: r2, v: e };
}
function Sn(t2) {
  return Ge(Un(t2));
}
function Un(t2) {
  const { l: e } = t2;
  return !J(e) && e.lvl === t2.lvl ? dt(e, { r: dt(t2, { l: e.r }) }) : t2;
}
function Ge(t2) {
  const { lvl: e, r: n2 } = t2;
  return !J(n2) && !J(n2.r) && n2.lvl === e && n2.r.lvl === e ? dt(n2, { l: dt(t2, { r: n2.l }), lvl: e + 1 }) : t2;
}
function Oo(t2) {
  return _n(t2, ({ k: e, v: n2 }) => ({ index: e, value: n2 }));
}
function Kn(t2, e) {
  return !!(t2 && t2.startIndex === e.startIndex && t2.endIndex === e.endIndex);
}
function le(t2, e) {
  return !!(t2 && t2[0] === e[0] && t2[1] === e[1]);
}
const Ue = j(
  () => ({ recalcInProgress: T(false) }),
  [],
  { singleton: true }
);
function jn(t2, e, n2) {
  return t2[Te(t2, e, n2)];
}
function Te(t2, e, n2, o = 0) {
  let r2 = t2.length - 1;
  for (; o <= r2; ) {
    const s = Math.floor((o + r2) / 2), i = t2[s], l2 = n2(i, e);
    if (l2 === 0)
      return s;
    if (l2 === -1) {
      if (r2 - o < 2)
        return s - 1;
      r2 = s - 1;
    } else {
      if (r2 === o)
        return s;
      o = s + 1;
    }
  }
  throw new Error(`Failed binary finding record in array - ${t2.join(",")}, searched for ${e}`);
}
function ko(t2, e, n2, o) {
  const r2 = Te(t2, e, o), s = Te(t2, n2, o, r2);
  return t2.slice(r2, s + 1);
}
function Ht(t2, e) {
  return Math.round(t2.getBoundingClientRect()[e]);
}
function be(t2) {
  return !J(t2.groupOffsetTree);
}
function Ke({ index: t2 }, e) {
  return e === t2 ? 0 : e < t2 ? -1 : 1;
}
function zo() {
  return {
    groupIndices: [],
    groupOffsetTree: Yt(),
    lastIndex: 0,
    lastOffset: 0,
    lastSize: 0,
    offsetTree: [],
    sizeTree: Yt()
  };
}
function Fo(t2, e) {
  let n2 = J(t2) ? 0 : 1 / 0;
  for (const o of e) {
    const { endIndex: r2, size: s, startIndex: i } = o;
    if (n2 = Math.min(n2, i), J(t2)) {
      t2 = vt(t2, 0, s);
      continue;
    }
    const l2 = Zt(t2, i - 1, r2 + 1);
    if (l2.some(_o(o)))
      continue;
    let c = false, d = false;
    for (const { end: m2, start: v2, value: p2 } of l2)
      c ? (r2 >= v2 || s === p2) && (t2 = We(t2, v2)) : (d = p2 !== s, c = true), m2 > r2 && r2 >= v2 && p2 !== s && (t2 = vt(t2, r2 + 1, p2));
    d && (t2 = vt(t2, i, s));
  }
  return [t2, n2];
}
function Vo(t2) {
  return typeof t2.groupIndex < "u";
}
function Wo({ offset: t2 }, e) {
  return e === t2 ? 0 : e < t2 ? -1 : 1;
}
function ce(t2, e, n2) {
  if (e.length === 0)
    return 0;
  const { index: o, offset: r2, size: s } = jn(e, t2, Ke), i = t2 - o, l2 = s * i + (i - 1) * n2 + r2;
  return l2 > 0 ? l2 + n2 : l2;
}
function qn(t2, e) {
  if (!be(e))
    return t2;
  let n2 = 0;
  for (; e.groupIndices[n2] <= t2 + n2; )
    n2++;
  return t2 + n2;
}
function Yn(t2, e, n2) {
  if (Vo(t2))
    return e.groupIndices[t2.groupIndex] + 1;
  const o = t2.index === "LAST" ? n2 : t2.index;
  let r2 = qn(o, e);
  return r2 = Math.max(0, r2, Math.min(n2, r2)), r2;
}
function Po(t2, e, n2, o = 0) {
  return o > 0 && (e = Math.max(e, jn(t2, o, Ke).offset)), _n(ko(t2, e, n2, Wo), Mo);
}
function Go(t2, [e, n2, o, r2]) {
  e.length > 0 && o("received item sizes", e, ft.DEBUG);
  const s = t2.sizeTree;
  let i = s, l2 = 0;
  if (n2.length > 0 && J(s) && e.length === 2) {
    const p2 = e[0].size, I2 = e[1].size;
    i = n2.reduce((w2, R2) => vt(vt(w2, R2, p2), R2 + 1, I2), i);
  } else
    [i, l2] = Fo(i, e);
  if (i === s)
    return t2;
  const { lastIndex: c, lastOffset: d, lastSize: m2, offsetTree: v2 } = Ae(t2.offsetTree, l2, i, r2);
  return {
    groupIndices: n2,
    groupOffsetTree: n2.reduce((p2, I2) => vt(p2, I2, ce(I2, v2, r2)), Yt()),
    lastIndex: c,
    lastOffset: d,
    lastSize: m2,
    offsetTree: v2,
    sizeTree: i
  };
}
function Ao(t2) {
  return Nt(t2).map(({ k: e, v: n2 }, o, r2) => {
    const s = r2[o + 1];
    return { endIndex: s !== void 0 ? s.k - 1 : 1 / 0, size: n2, startIndex: e };
  });
}
function xn(t2, e) {
  let n2 = 0, o = 0;
  for (; n2 < t2; )
    n2 += e[o + 1] - e[o] - 1, o++;
  return o - (n2 === t2 ? 0 : 1);
}
function Ae(t2, e, n2, o) {
  let r2 = t2, s = 0, i = 0, l2 = 0, c = 0;
  if (e !== 0) {
    c = Te(r2, e - 1, Ke), l2 = r2[c].offset;
    const m2 = Rt(n2, e - 1);
    s = m2[0], i = m2[1], r2.length && r2[c].size === Rt(n2, e)[1] && (c -= 1), r2 = r2.slice(0, c + 1);
  } else
    r2 = [];
  for (const { start: d, value: m2 } of Zt(n2, e, 1 / 0)) {
    const v2 = d - s, p2 = v2 * i + l2 + v2 * o;
    r2.push({
      index: d,
      offset: p2,
      size: m2
    }), s = d, l2 = p2, i = m2;
  }
  return {
    lastIndex: s,
    lastOffset: l2,
    lastSize: i,
    offsetTree: r2
  };
}
function Mo(t2) {
  return { index: t2.index, value: t2 };
}
function _o(t2) {
  const { endIndex: e, size: n2, startIndex: o } = t2;
  return (r2) => r2.start === o && (r2.end === e || r2.end === 1 / 0) && r2.value === n2;
}
const No = {
  offsetHeight: "height",
  offsetWidth: "width"
}, kt = j(
  ([{ log: t2 }, { recalcInProgress: e }]) => {
    const n2 = U(), o = U(), r2 = ht(o, 0), s = U(), i = U(), l2 = T(0), c = T([]), d = T(void 0), m2 = T(void 0), v2 = T(void 0), p2 = T(void 0), I2 = T((u2, g) => Ht(u2, No[g])), w2 = T(void 0), R2 = T(0), h = zo(), f2 = ht(
      x(n2, $(c, t2, R2), Lt(Go, h), nt()),
      h
    ), a = ht(
      x(
        c,
        nt(),
        Lt((u2, g) => ({ current: g, prev: u2.current }), {
          current: [],
          prev: []
        }),
        B(({ prev: u2 }) => u2)
      ),
      []
    );
    k(
      x(
        c,
        P((u2) => u2.length > 0),
        $(f2, R2),
        B(([u2, g, C2]) => {
          const z2 = u2.reduce((L2, V2, N2) => vt(L2, V2, ce(V2, g.offsetTree, C2) || N2), Yt());
          return {
            ...g,
            groupIndices: u2,
            groupOffsetTree: z2
          };
        })
      ),
      f2
    ), k(
      x(
        o,
        $(f2),
        P(([u2, { lastIndex: g }]) => u2 < g),
        B(([u2, { lastIndex: g, lastSize: C2 }]) => [
          {
            endIndex: g,
            size: C2,
            startIndex: u2
          }
        ])
      ),
      n2
    ), k(d, m2);
    const S2 = ht(
      x(
        d,
        B((u2) => u2 === void 0)
      ),
      true
    );
    k(
      x(
        m2,
        P((u2) => u2 !== void 0 && J(it(f2).sizeTree)),
        B((u2) => {
          const g = it(v2), C2 = it(c).length > 0;
          return g !== void 0 && g !== 0 ? C2 ? [
            { endIndex: 0, size: g, startIndex: 0 },
            { endIndex: 1, size: u2, startIndex: 1 }
          ] : [] : [{ endIndex: 0, size: u2, startIndex: 0 }];
        })
      ),
      n2
    ), k(
      x(
        p2,
        P((u2) => u2 !== void 0 && u2.length > 0 && J(it(f2).sizeTree)),
        B((u2) => {
          const g = [];
          let C2 = u2[0], z2 = 0;
          for (let L2 = 1; L2 < u2.length; L2++) {
            const V2 = u2[L2];
            V2 !== C2 && (g.push({
              endIndex: L2 - 1,
              size: C2,
              startIndex: z2
            }), C2 = V2, z2 = L2);
          }
          return g.push({
            endIndex: u2.length - 1,
            size: C2,
            startIndex: z2
          }), g;
        })
      ),
      n2
    ), k(
      x(
        c,
        $(v2, m2),
        P(([, u2, g]) => u2 !== void 0 && g !== void 0),
        B(([u2, g, C2]) => {
          const z2 = [];
          for (let L2 = 0; L2 < u2.length; L2++) {
            const V2 = u2[L2], N2 = u2[L2 + 1];
            z2.push({
              startIndex: V2,
              endIndex: V2,
              size: g
            }), N2 !== void 0 && z2.push({
              startIndex: V2 + 1,
              endIndex: N2 - 1,
              size: C2
            });
          }
          return z2;
        })
      ),
      n2
    );
    const H2 = Tt(
      x(
        n2,
        $(f2),
        Lt(
          ({ sizes: u2 }, [g, C2]) => ({
            changed: C2 !== u2,
            sizes: C2
          }),
          { changed: false, sizes: h }
        ),
        B((u2) => u2.changed)
      )
    );
    Y(
      x(
        l2,
        Lt(
          (u2, g) => ({ diff: u2.prev - g, prev: g }),
          { diff: 0, prev: 0 }
        ),
        B((u2) => u2.diff)
      ),
      (u2) => {
        const { groupIndices: g } = it(f2);
        if (u2 > 0)
          _(e, true), _(s, u2 + xn(u2, g));
        else if (u2 < 0) {
          const C2 = it(a);
          C2.length > 0 && (u2 -= xn(-u2, C2)), _(i, u2);
        }
      }
    ), Y(x(l2, $(t2)), ([u2, g]) => {
      u2 < 0 && g(
        "`firstItemIndex` prop should not be set to less than zero. If you don't know the total count, just use a very high value",
        { firstItemIndex: l2 },
        ft.ERROR
      );
    });
    const y2 = Tt(s);
    k(
      x(
        s,
        $(f2),
        B(([u2, g]) => {
          const C2 = g.groupIndices.length > 0, z2 = [], L2 = g.lastSize;
          if (C2) {
            const V2 = ie(g.sizeTree, 0);
            let N2 = 0, Z2 = 0;
            for (; N2 < u2; ) {
              const q2 = g.groupIndices[Z2], Q2 = g.groupIndices.length === Z2 + 1 ? 1 / 0 : g.groupIndices[Z2 + 1] - q2 - 1;
              z2.push({
                endIndex: q2,
                size: V2,
                startIndex: q2
              }), z2.push({
                endIndex: q2 + 1 + Q2 - 1,
                size: L2,
                startIndex: q2 + 1
              }), Z2++, N2 += Q2 + 1;
            }
            const F2 = Nt(g.sizeTree);
            return N2 !== u2 && F2.shift(), F2.reduce(
              (q2, { k: Q2, v: gt }) => {
                let ut = q2.ranges;
                return q2.prevSize !== 0 && (ut = [
                  ...q2.ranges,
                  {
                    endIndex: Q2 + u2 - 1,
                    size: q2.prevSize,
                    startIndex: q2.prevIndex
                  }
                ]), {
                  prevIndex: Q2 + u2,
                  prevSize: gt,
                  ranges: ut
                };
              },
              {
                prevIndex: u2,
                prevSize: 0,
                ranges: z2
              }
            ).ranges;
          }
          return Nt(g.sizeTree).reduce(
            (V2, { k: N2, v: Z2 }) => ({
              prevIndex: N2 + u2,
              prevSize: Z2,
              ranges: [...V2.ranges, { endIndex: N2 + u2 - 1, size: V2.prevSize, startIndex: V2.prevIndex }]
            }),
            {
              prevIndex: 0,
              prevSize: L2,
              ranges: []
            }
          ).ranges;
        })
      ),
      n2
    );
    const O2 = Tt(
      x(
        i,
        $(f2, R2),
        B(([u2, { offsetTree: g }, C2]) => {
          const z2 = -u2;
          return ce(z2, g, C2);
        })
      )
    );
    return k(
      x(
        i,
        $(f2, R2),
        B(([u2, g, C2]) => {
          if (g.groupIndices.length > 0) {
            if (J(g.sizeTree))
              return g;
            let V2 = Yt();
            const N2 = it(a);
            let Z2 = 0, F2 = 0, mt = 0;
            for (; Z2 < -u2; ) {
              mt = N2[F2];
              const Q2 = N2[F2 + 1] - mt - 1;
              F2++, Z2 += Q2 + 1;
            }
            if (V2 = Nt(g.sizeTree).reduce((Q2, { k: gt, v: ut }) => vt(Q2, Math.max(0, gt + u2), ut), V2), Z2 !== -u2) {
              const Q2 = ie(g.sizeTree, mt);
              V2 = vt(V2, 0, Q2);
              const gt = Rt(g.sizeTree, -u2 + 1)[1];
              V2 = vt(V2, 1, gt);
            }
            return {
              ...g,
              sizeTree: V2,
              ...Ae(g.offsetTree, 0, V2, C2)
            };
          }
          const L2 = Nt(g.sizeTree).reduce((V2, { k: N2, v: Z2 }) => vt(V2, Math.max(0, N2 + u2), Z2), Yt());
          return {
            ...g,
            sizeTree: L2,
            ...Ae(g.offsetTree, 0, L2, C2)
          };
        })
      ),
      f2
    ), {
      beforeUnshiftWith: y2,
      // input
      data: w2,
      defaultItemSize: m2,
      firstItemIndex: l2,
      fixedItemSize: d,
      fixedGroupSize: v2,
      gap: R2,
      groupIndices: c,
      heightEstimates: p2,
      itemSize: I2,
      listRefresh: H2,
      shiftWith: i,
      shiftWithOffset: O2,
      sizeRanges: n2,
      // output
      sizes: f2,
      statefulTotalCount: r2,
      totalCount: o,
      trackItemSizes: S2,
      unshiftWith: s
    };
  },
  rt(Gt, Ue),
  { singleton: true }
);
function Do(t2) {
  return t2.reduce(
    (e, n2) => (e.groupIndices.push(e.totalCount), e.totalCount += n2 + 1, e),
    {
      groupIndices: [],
      totalCount: 0
    }
  );
}
const Zn = j(
  ([{ groupIndices: t2, sizes: e, totalCount: n2 }, { headerHeight: o, scrollTop: r2 }]) => {
    const s = U(), i = U(), l2 = Tt(x(s, B(Do)));
    return k(
      x(
        l2,
        B((c) => c.totalCount)
      ),
      n2
    ), k(
      x(
        l2,
        B((c) => c.groupIndices)
      ),
      t2
    ), k(
      x(
        at(r2, e, o),
        P(([c, d]) => be(d)),
        B(([c, d, m2]) => Rt(d.groupOffsetTree, Math.max(c - m2, 0), "v")[0]),
        nt(),
        B((c) => [c])
      ),
      i
    ), { groupCounts: s, topItemsIndexes: i };
  },
  rt(kt, It)
), At = j(
  ([{ log: t2 }]) => {
    const e = T(false), n2 = Tt(
      x(
        e,
        P((o) => o),
        nt()
      )
    );
    return Y(e, (o) => {
      o && it(t2)("props updated", {}, ft.DEBUG);
    }), { didMount: n2, propsReady: e };
  },
  rt(Gt),
  { singleton: true }
), $o = typeof document < "u" && "scrollBehavior" in document.documentElement.style;
function Xn(t2) {
  const e = typeof t2 == "number" ? { index: t2 } : t2;
  return e.align || (e.align = "start"), (!e.behavior || !$o) && (e.behavior = "auto"), e.offset === void 0 && (e.offset = 0), e;
}
const fe = j(
  ([
    { gap: t2, listRefresh: e, sizes: n2, totalCount: o },
    {
      fixedFooterHeight: r2,
      fixedHeaderHeight: s,
      footerHeight: i,
      headerHeight: l2,
      scrollingInProgress: c,
      scrollTo: d,
      smoothScrollTargetReached: m2,
      viewportHeight: v2
    },
    { log: p2 }
  ]) => {
    const I2 = U(), w2 = U(), R2 = T(0);
    let h = null, f2 = null, a = null;
    function S2() {
      h !== null && (h(), h = null), a !== null && (a(), a = null), f2 && (clearTimeout(f2), f2 = null), _(c, false);
    }
    return k(
      x(
        I2,
        $(n2, v2, o, R2, l2, i, p2),
        $(t2, s, r2),
        B(
          ([
            [H2, y2, O2, u2, g, C2, z2, L2],
            V2,
            N2,
            Z2
          ]) => {
            const F2 = Xn(H2), { align: mt, behavior: q2, offset: Q2 } = F2, gt = u2 - 1, ut = Yn(F2, y2, gt);
            let St = ce(ut, y2.offsetTree, V2) + C2;
            mt === "end" ? (St += N2 + Rt(y2.sizeTree, ut)[1] - O2 + Z2, ut === gt && (St += z2)) : mt === "center" ? St += (N2 + Rt(y2.sizeTree, ut)[1] - O2 + Z2) / 2 : St -= g, Q2 !== void 0 && Q2 !== 0 && (St += Q2);
            const Ft = (pt) => {
              S2(), pt ? (L2("retrying to scroll to", { location: H2 }, ft.DEBUG), _(I2, H2)) : (_(w2, true), L2("list did not change, scroll successful", {}, ft.DEBUG));
            };
            if (S2(), q2 === "smooth") {
              let pt = false;
              a = Y(e, (jt) => {
                pt = pt || jt;
              }), h = yt(m2, () => {
                Ft(pt);
              });
            } else
              h = yt(x(e, Uo(150)), Ft);
            return f2 = setTimeout(() => {
              S2();
            }, 1200), _(c, true), L2("scrolling from index to", { behavior: q2, index: ut, top: St }, ft.DEBUG), { behavior: q2, top: St };
          }
        )
      ),
      d
    ), {
      scrollTargetReached: w2,
      scrollToIndex: I2,
      topListHeight: R2
    };
  },
  rt(kt, It, Gt),
  { singleton: true }
);
function Uo(t2) {
  return (e) => {
    const n2 = setTimeout(() => {
      e(false);
    }, t2);
    return (o) => {
      o && (e(true), clearTimeout(n2));
    };
  };
}
function je(t2, e) {
  t2 === 0 ? e() : requestAnimationFrame(() => {
    je(t2 - 1, e);
  });
}
function qe(t2, e) {
  const n2 = e - 1;
  return typeof t2 == "number" ? t2 : t2.index === "LAST" ? n2 : t2.index;
}
const me = j(
  ([{ defaultItemSize: t2, listRefresh: e, sizes: n2 }, { scrollTop: o }, { scrollTargetReached: r2, scrollToIndex: s }, { didMount: i }]) => {
    const l2 = T(true), c = T(0), d = T(true);
    return k(
      x(
        i,
        $(c),
        P(([m2, v2]) => v2 !== 0),
        Bt(false)
      ),
      l2
    ), k(
      x(
        i,
        $(c),
        P(([m2, v2]) => v2 !== 0),
        Bt(false)
      ),
      d
    ), Y(
      x(
        at(e, i),
        $(l2, n2, t2, d),
        P(([[, m2], v2, { sizeTree: p2 }, I2, w2]) => m2 && (!J(p2) || _e(I2)) && !v2 && !w2),
        $(c)
      ),
      ([, m2]) => {
        yt(r2, () => {
          _(d, true);
        }), je(4, () => {
          yt(o, () => {
            _(l2, true);
          }), _(s, m2);
        });
      }
    ), {
      initialItemFinalLocationReached: d,
      initialTopMostItemIndex: c,
      scrolledToInitialItem: l2
    };
  },
  rt(kt, It, fe, At),
  { singleton: true }
);
function Jn(t2, e) {
  return Math.abs(t2 - e) < 1.01;
}
const ue = "up", ne = "down", Ko = "none", jo = {
  atBottom: false,
  notAtBottomBecause: "NOT_SHOWING_LAST_ITEM",
  state: {
    offsetBottom: 0,
    scrollHeight: 0,
    scrollTop: 0,
    viewportHeight: 0
  }
}, qo = 0, pe = j(([{ footerHeight: t2, headerHeight: e, scrollBy: n2, scrollContainerState: o, scrollTop: r2, viewportHeight: s }]) => {
  const i = T(false), l2 = T(true), c = U(), d = U(), m2 = T(4), v2 = T(qo), p2 = ht(
    x(
      Fe(x(W(r2), Ut(1), Bt(true)), x(W(r2), Ut(1), Bt(false), pn(100))),
      nt()
    ),
    false
  ), I2 = ht(
    x(Fe(x(n2, Bt(true)), x(n2, Bt(false), pn(200))), nt()),
    false
  );
  k(
    x(
      at(W(r2), W(v2)),
      B(([a, S2]) => a <= S2),
      nt()
    ),
    l2
  ), k(x(l2, zt(50)), d);
  const w2 = Tt(
    x(
      at(o, W(s), W(e), W(t2), W(m2)),
      Lt((a, [{ scrollHeight: S2, scrollTop: H2 }, y2, O2, u2, g]) => {
        const C2 = H2 + y2 - S2 > -g, z2 = {
          scrollHeight: S2,
          scrollTop: H2,
          viewportHeight: y2
        };
        if (C2) {
          let V2, N2;
          return H2 > a.state.scrollTop ? (V2 = "SCROLLED_DOWN", N2 = a.state.scrollTop - H2) : (V2 = "SIZE_DECREASED", N2 = a.state.scrollTop - H2 || a.scrollTopDelta), {
            atBottom: true,
            atBottomBecause: V2,
            scrollTopDelta: N2,
            state: z2
          };
        }
        let L2;
        return z2.scrollHeight > a.state.scrollHeight ? L2 = "SIZE_INCREASED" : y2 < a.state.viewportHeight ? L2 = "VIEWPORT_HEIGHT_DECREASING" : H2 < a.state.scrollTop ? L2 = "SCROLLING_UPWARDS" : L2 = "NOT_FULLY_SCROLLED_TO_LAST_ITEM_BOTTOM", {
          atBottom: false,
          notAtBottomBecause: L2,
          state: z2
        };
      }, jo),
      nt((a, S2) => a !== void 0 && a.atBottom === S2.atBottom)
    )
  ), R2 = ht(
    x(
      o,
      Lt(
        (a, { scrollHeight: S2, scrollTop: H2, viewportHeight: y2 }) => {
          if (!Jn(a.scrollHeight, S2)) {
            const O2 = S2 - (H2 + y2) < 1;
            return a.scrollTop !== H2 && O2 ? {
              changed: true,
              jump: a.scrollTop - H2,
              scrollHeight: S2,
              scrollTop: H2
            } : {
              changed: true,
              jump: 0,
              scrollHeight: S2,
              scrollTop: H2
            };
          }
          return {
            changed: false,
            jump: 0,
            scrollHeight: S2,
            scrollTop: H2
          };
        },
        { changed: false, jump: 0, scrollHeight: 0, scrollTop: 0 }
      ),
      P((a) => a.changed),
      B((a) => a.jump)
    ),
    0
  );
  k(
    x(
      w2,
      B((a) => a.atBottom)
    ),
    i
  ), k(x(i, zt(50)), c);
  const h = T(ne);
  k(
    x(
      o,
      B(({ scrollTop: a }) => a),
      nt(),
      Lt(
        (a, S2) => it(I2) ? { direction: a.direction, prevScrollTop: S2 } : { direction: S2 < a.prevScrollTop ? ue : ne, prevScrollTop: S2 },
        { direction: ne, prevScrollTop: 0 }
      ),
      B((a) => a.direction)
    ),
    h
  ), k(x(o, zt(50), Bt(Ko)), h);
  const f2 = T(0);
  return k(
    x(
      p2,
      P((a) => !a),
      Bt(0)
    ),
    f2
  ), k(
    x(
      r2,
      zt(100),
      $(p2),
      P(([a, S2]) => S2),
      Lt(([a, S2], [H2]) => [S2, H2], [0, 0]),
      B(([a, S2]) => S2 - a)
    ),
    f2
  ), {
    atBottomState: w2,
    atBottomStateChange: c,
    atBottomThreshold: m2,
    atTopStateChange: d,
    atTopThreshold: v2,
    isAtBottom: i,
    isAtTop: l2,
    isScrolling: p2,
    lastJumpDueToItemResize: R2,
    scrollDirection: h,
    scrollVelocity: f2
  };
}, rt(It)), ae = "top", de = "bottom", vn = "none";
function Tn(t2, e, n2) {
  return typeof t2 == "number" ? n2 === ue && e === ae || n2 === ne && e === de ? t2 : 0 : n2 === ue ? e === ae ? t2.main : t2.reverse : e === de ? t2.main : t2.reverse;
}
function Cn(t2, e) {
  return typeof t2 == "number" ? t2 : t2[e] ?? 0;
}
const Ye = j(
  ([{ deviation: t2, fixedHeaderHeight: e, headerHeight: n2, scrollTop: o, viewportHeight: r2 }]) => {
    const s = U(), i = T(0), l2 = T(0), c = T(0), d = ht(
      x(
        at(
          W(o),
          W(r2),
          W(n2),
          W(s, le),
          W(c),
          W(i),
          W(e),
          W(t2),
          W(l2)
        ),
        B(
          ([
            m2,
            v2,
            p2,
            [I2, w2],
            R2,
            h,
            f2,
            a,
            S2
          ]) => {
            const H2 = m2 - a, y2 = h + f2, O2 = Math.max(p2 - H2, 0);
            let u2 = vn;
            const g = Cn(S2, ae), C2 = Cn(S2, de);
            return I2 -= a, I2 += p2 + f2, w2 += p2 + f2, w2 -= a, I2 > m2 + y2 - g && (u2 = ue), w2 < m2 - O2 + v2 + C2 && (u2 = ne), u2 !== vn ? [
              Math.max(H2 - p2 - Tn(R2, ae, u2) - g, 0),
              H2 - O2 - f2 + v2 + Tn(R2, de, u2) + C2
            ] : null;
          }
        ),
        P((m2) => m2 !== null),
        nt(le)
      ),
      [0, 0]
    );
    return {
      increaseViewportBy: l2,
      // input
      listBoundary: s,
      overscan: c,
      topListHeight: i,
      // output
      visibleRange: d
    };
  },
  rt(It),
  { singleton: true }
);
function Yo(t2, e, n2) {
  if (be(e)) {
    const o = qn(t2, e);
    return [
      { index: Rt(e.groupOffsetTree, o)[0], offset: 0, size: 0 },
      { data: n2?.[0], index: o, offset: 0, size: 0 }
    ];
  }
  return [{ data: n2?.[0], index: t2, offset: 0, size: 0 }];
}
const Le = {
  bottom: 0,
  firstItemIndex: 0,
  items: [],
  offsetBottom: 0,
  offsetTop: 0,
  top: 0,
  topItems: [],
  topListHeight: 0,
  totalCount: 0
};
function ve(t2, e, n2, o, r2, s) {
  const { lastIndex: i, lastOffset: l2, lastSize: c } = r2;
  let d = 0, m2 = 0;
  if (t2.length > 0) {
    d = t2[0].offset;
    const R2 = t2[t2.length - 1];
    m2 = R2.offset + R2.size;
  }
  const v2 = n2 - i, p2 = l2 + v2 * c + (v2 - 1) * o, I2 = d, w2 = p2 - m2;
  return {
    bottom: m2,
    firstItemIndex: s,
    items: wn(t2, r2, s),
    offsetBottom: w2,
    offsetTop: d,
    top: I2,
    topItems: wn(e, r2, s),
    topListHeight: e.reduce((R2, h) => h.size + R2, 0),
    totalCount: n2
  };
}
function Qn(t2, e, n2, o, r2, s) {
  let i = 0;
  if (n2.groupIndices.length > 0)
    for (const m2 of n2.groupIndices) {
      if (m2 - i >= t2)
        break;
      i++;
    }
  const l2 = t2 + i, c = qe(e, l2), d = Array.from({ length: l2 }).map((m2, v2) => ({
    data: s[v2 + c],
    index: v2 + c,
    offset: 0,
    size: 0
  }));
  return ve(d, [], l2, r2, n2, o);
}
function wn(t2, e, n2) {
  if (t2.length === 0)
    return [];
  if (!be(e))
    return t2.map((d) => ({ ...d, index: d.index + n2, originalIndex: d.index }));
  const o = t2[0].index, r2 = t2[t2.length - 1].index, s = [], i = Zt(e.groupOffsetTree, o, r2);
  let l2, c = 0;
  for (const d of t2) {
    (!l2 || l2.end < d.index) && (l2 = i.shift(), c = e.groupIndices.indexOf(l2.start));
    let m2;
    d.index === l2.start ? m2 = {
      index: c,
      type: "group"
    } : m2 = {
      groupIndex: c,
      index: d.index - (c + 1) + n2
    }, s.push({
      ...m2,
      data: d.data,
      offset: d.offset,
      originalIndex: d.index,
      size: d.size
    });
  }
  return s;
}
function yn(t2, e) {
  return t2 === void 0 ? 0 : typeof t2 == "number" ? t2 : t2[e] ?? 0;
}
const Kt = j(
  ([
    { data: t2, firstItemIndex: e, gap: n2, sizes: o, totalCount: r2 },
    s,
    { listBoundary: i, topListHeight: l2, visibleRange: c },
    { initialTopMostItemIndex: d, scrolledToInitialItem: m2 },
    { topListHeight: v2 },
    p2,
    { didMount: I2 },
    { recalcInProgress: w2 }
  ]) => {
    const R2 = T([]), h = T(0), f2 = U(), a = T(0);
    k(s.topItemsIndexes, R2);
    const S2 = ht(
      x(
        at(
          I2,
          w2,
          W(c, le),
          W(r2),
          W(o),
          W(d),
          m2,
          W(R2),
          W(e),
          W(n2),
          W(a),
          t2
        ),
        P(([u2, g, , C2, , , , , , , , z2]) => {
          const L2 = z2 !== void 0 && z2.length !== C2;
          return u2 && !g && !L2;
        }),
        B(
          ([
            ,
            ,
            [u2, g],
            C2,
            z2,
            L2,
            V2,
            N2,
            Z2,
            F2,
            mt,
            q2
          ]) => {
            const Q2 = z2, { offsetTree: gt, sizeTree: ut } = Q2, St = it(h);
            if (C2 === 0)
              return { ...Le, totalCount: C2 };
            if (u2 === 0 && g === 0)
              return St === 0 ? { ...Le, totalCount: C2 } : Qn(St, L2, z2, Z2, F2, q2 || []);
            if (J(ut))
              return St > 0 ? null : ve(
                Yo(qe(L2, C2), Q2, q2),
                [],
                C2,
                F2,
                Q2,
                Z2
              );
            const Ft = [];
            if (N2.length > 0) {
              const D2 = N2[0], K2 = N2[N2.length - 1];
              let st = 0;
              for (const tt of Zt(ut, D2, K2)) {
                const X2 = tt.value, lt = Math.max(tt.start, D2), xt = Math.min(tt.end, K2);
                for (let ct = lt; ct <= xt; ct++)
                  Ft.push({ data: q2?.[ct], index: ct, offset: st, size: X2 }), st += X2;
              }
            }
            if (!V2)
              return ve([], Ft, C2, F2, Q2, Z2);
            const pt = N2.length > 0 ? N2[N2.length - 1] + 1 : 0, jt = Po(gt, u2, g, pt);
            if (jt.length === 0)
              return null;
            const Qt = C2 - 1, Et = ye([], (D2) => {
              for (const K2 of jt) {
                const st = K2.value;
                let tt = st.offset, X2 = K2.start;
                const lt = st.size;
                if (st.offset < u2) {
                  X2 += Math.floor((u2 - st.offset + F2) / (lt + F2));
                  const ct = X2 - K2.start;
                  tt += ct * lt + ct * F2;
                }
                X2 < pt && (tt += (pt - X2) * lt, X2 = pt);
                const xt = Math.min(K2.end, Qt);
                for (let ct = X2; ct <= xt && !(tt >= g); ct++)
                  D2.push({ data: q2?.[ct], index: ct, offset: tt, size: lt }), tt += lt + F2;
              }
            }), te2 = yn(mt, ae), b = yn(mt, de);
            if (Et.length > 0 && (te2 > 0 || b > 0)) {
              const D2 = Et[0], K2 = Et[Et.length - 1];
              if (te2 > 0 && D2.index > pt) {
                const st = Math.min(te2, D2.index - pt), tt = [];
                let X2 = D2.offset;
                for (let lt = D2.index - 1; lt >= D2.index - st; lt--) {
                  const ct = Zt(ut, lt, lt)[0]?.value ?? D2.size;
                  X2 -= ct + F2, tt.unshift({ data: q2?.[lt], index: lt, offset: X2, size: ct });
                }
                Et.unshift(...tt);
              }
              if (b > 0 && K2.index < Qt) {
                const st = Math.min(b, Qt - K2.index);
                let tt = K2.offset + K2.size + F2;
                for (let X2 = K2.index + 1; X2 <= K2.index + st; X2++) {
                  const xt = Zt(ut, X2, X2)[0]?.value ?? K2.size;
                  Et.push({ data: q2?.[X2], index: X2, offset: tt, size: xt }), tt += xt + F2;
                }
              }
            }
            return ve(Et, Ft, C2, F2, Q2, Z2);
          }
        ),
        //@ts-expect-error filter needs to be fixed
        P((u2) => u2 !== null),
        nt()
      ),
      Le
    );
    k(
      x(
        t2,
        P(_e),
        B((u2) => u2?.length)
      ),
      r2
    ), k(
      x(
        S2,
        B((u2) => u2.topListHeight)
      ),
      v2
    ), k(v2, l2), k(
      x(
        S2,
        B((u2) => [u2.top, u2.bottom])
      ),
      i
    ), k(
      x(
        S2,
        B((u2) => u2.items)
      ),
      f2
    );
    const H2 = Tt(
      x(
        S2,
        P(({ items: u2 }) => u2.length > 0),
        $(r2, t2),
        P(([{ items: u2 }, g]) => u2[u2.length - 1].originalIndex === g - 1),
        B(([, u2, g]) => [u2 - 1, g]),
        nt(le),
        B(([u2]) => u2)
      )
    ), y2 = Tt(
      x(
        S2,
        zt(200),
        P(({ items: u2, topItems: g }) => u2.length > 0 && u2[0].originalIndex === g.length),
        B(({ items: u2 }) => u2[0].index),
        nt()
      )
    ), O2 = Tt(
      x(
        S2,
        P(({ items: u2 }) => u2.length > 0),
        B(({ items: u2 }) => {
          let g = 0, C2 = u2.length - 1;
          for (; u2[g].type === "group" && g < C2; )
            g++;
          for (; u2[C2].type === "group" && C2 > g; )
            C2--;
          return {
            endIndex: u2[C2].index,
            startIndex: u2[g].index
          };
        }),
        nt(Kn)
      )
    );
    return {
      endReached: H2,
      initialItemCount: h,
      itemsRendered: f2,
      listState: S2,
      minOverscanItemCount: a,
      rangeChanged: O2,
      startReached: y2,
      topItemsIndexes: R2,
      ...p2
    };
  },
  rt(
    kt,
    Zn,
    Ye,
    me,
    fe,
    pe,
    At,
    Ue
  ),
  { singleton: true }
), to = j(
  ([{ fixedFooterHeight: t2, fixedHeaderHeight: e, footerHeight: n2, headerHeight: o }, { listState: r2 }]) => {
    const s = U(), i = ht(
      x(
        at(n2, t2, o, e, r2),
        B(([l2, c, d, m2, v2]) => l2 + c + d + m2 + v2.offsetBottom + v2.bottom)
      ),
      0
    );
    return k(W(i), s), { totalListHeight: i, totalListHeightChanged: s };
  },
  rt(It, Kt),
  { singleton: true }
), Zo = j(
  ([{ viewportHeight: t2 }, { totalListHeight: e }]) => {
    const n2 = T(false), o = ht(
      x(
        at(n2, t2, e),
        P(([r2]) => r2),
        B(([, r2, s]) => Math.max(0, r2 - s)),
        zt(0),
        nt()
      ),
      0
    );
    return { alignToBottom: n2, paddingTopAddition: o };
  },
  rt(It, to),
  { singleton: true }
), eo = j(() => ({
  context: T(null)
})), Xo = ({
  itemBottom: t2,
  itemTop: e,
  locationParams: { align: n2, behavior: o, ...r2 },
  viewportBottom: s,
  viewportTop: i
}) => e < i ? { ...r2, align: n2 ?? "start", ...o !== void 0 ? { behavior: o } : {} } : t2 > s ? { ...r2, align: n2 ?? "end", ...o !== void 0 ? { behavior: o } : {} } : null, no = j(
  ([
    { gap: t2, sizes: e, totalCount: n2 },
    { fixedFooterHeight: o, fixedHeaderHeight: r2, headerHeight: s, scrollingInProgress: i, scrollTop: l2, viewportHeight: c },
    { scrollToIndex: d }
  ]) => {
    const m2 = U();
    return k(
      x(
        m2,
        $(e, c, n2, s, r2, o, l2),
        $(t2),
        B(([[v2, p2, I2, w2, R2, h, f2, a], S2]) => {
          const { calculateViewLocation: H2 = Xo, done: y2, ...O2 } = v2, u2 = Yn(v2, p2, w2 - 1), g = ce(u2, p2.offsetTree, S2) + R2 + h, C2 = g + Rt(p2.sizeTree, u2)[1], z2 = a + h, L2 = a + I2 - f2, V2 = H2({
            itemBottom: C2,
            itemTop: g,
            locationParams: O2,
            viewportBottom: L2,
            viewportTop: z2
          });
          return V2 !== null ? y2 && yt(
            x(
              i,
              P((N2) => !N2),
              // skips the initial publish of false, and the cleanup call.
              // but if scrollingInProgress is true, we skip the initial publish.
              Ut(it(i) ? 1 : 2)
            ),
            y2
          ) : y2?.(), V2;
        }),
        P((v2) => v2 !== null)
      ),
      d
    ), {
      scrollIntoView: m2
    };
  },
  rt(kt, It, fe, Kt, Gt),
  { singleton: true }
);
function bn(t2) {
  return t2 === false ? false : t2 === "smooth" ? "smooth" : "auto";
}
const Jo = (t2, e) => typeof t2 == "function" ? bn(t2(e)) : e && bn(t2), Qo = j(
  ([
    { listRefresh: t2, totalCount: e, fixedItemSize: n2, data: o },
    { atBottomState: r2, isAtBottom: s },
    { scrollToIndex: i },
    { scrolledToInitialItem: l2 },
    { didMount: c, propsReady: d },
    { log: m2 },
    { scrollingInProgress: v2 },
    { context: p2 },
    { scrollIntoView: I2 }
  ]) => {
    const w2 = T(false), R2 = U();
    let h = null;
    function f2(y2) {
      _(i, {
        align: "end",
        behavior: y2,
        index: "LAST"
      });
    }
    Y(
      x(
        at(x(W(e), Ut(1)), c),
        $(W(w2), s, l2, v2),
        B(([[y2, O2], u2, g, C2, z2]) => {
          let L2 = O2 && C2, V2 = "auto";
          return L2 && (V2 = Jo(u2, g || z2), L2 = L2 && V2 !== false), { followOutputBehavior: V2, shouldFollow: L2, totalCount: y2 };
        }),
        P(({ shouldFollow: y2 }) => y2)
      ),
      ({ followOutputBehavior: y2, totalCount: O2 }) => {
        h !== null && (h(), h = null), it(n2) !== void 0 ? requestAnimationFrame(() => {
          it(m2)("following output to ", { totalCount: O2 }, ft.DEBUG), f2(y2);
        }) : h = yt(t2, () => {
          it(m2)("following output to ", { totalCount: O2 }, ft.DEBUG), f2(y2), h = null;
        });
      }
    );
    function a(y2) {
      const O2 = yt(r2, (u2) => {
        y2 && !u2.atBottom && u2.notAtBottomBecause === "SIZE_INCREASED" && h === null && (it(m2)("scrolling to bottom due to increased size", {}, ft.DEBUG), f2("auto"));
      });
      setTimeout(O2, 100);
    }
    Y(
      x(
        at(W(w2), e, d),
        P(([y2, , O2]) => y2 !== false && O2),
        Lt(
          ({ value: y2 }, [, O2]) => ({ refreshed: y2 === O2, value: O2 }),
          { refreshed: false, value: 0 }
        ),
        P(({ refreshed: y2 }) => y2),
        $(w2, e)
      ),
      ([, y2]) => {
        it(l2) && a(y2 !== false);
      }
    ), Y(R2, () => {
      a(it(w2) !== false);
    }), Y(at(W(w2), r2), ([y2, O2]) => {
      y2 !== false && !O2.atBottom && O2.notAtBottomBecause === "VIEWPORT_HEIGHT_DECREASING" && f2("auto");
    });
    const S2 = T(null), H2 = U();
    return k(
      Fe(
        x(
          W(o),
          B((y2) => y2?.length ?? 0)
        ),
        x(W(e))
      ),
      H2
    ), Y(
      x(
        at(x(H2, Ut(1)), c),
        $(W(S2), l2, v2, p2),
        B(([[y2, O2], u2, g, C2, z2]) => O2 && g && u2?.({ context: z2, totalCount: y2, scrollingInProgress: C2 })),
        P((y2) => !!y2),
        zt(0)
      ),
      (y2) => {
        h !== null && (h(), h = null), it(n2) !== void 0 ? requestAnimationFrame(() => {
          it(m2)("scrolling into view", {}), _(I2, y2);
        }) : h = yt(t2, () => {
          it(m2)("scrolling into view", {}), _(I2, y2), h = null;
        });
      }
    ), { autoscrollToBottom: R2, followOutput: w2, scrollIntoViewOnChange: S2 };
  },
  rt(
    kt,
    pe,
    fe,
    me,
    At,
    Gt,
    It,
    eo,
    no
  )
), tr = j(
  ([{ data: t2, firstItemIndex: e, gap: n2, sizes: o }, { initialTopMostItemIndex: r2 }, { initialItemCount: s, listState: i }, { didMount: l2 }]) => (k(
    x(
      l2,
      $(s),
      P(([, c]) => c !== 0),
      $(r2, o, e, n2, t2),
      B(([[, c], d, m2, v2, p2, I2 = []]) => Qn(c, d, m2, v2, p2, I2))
    ),
    i
  ), {}),
  rt(kt, me, Kt, At),
  { singleton: true }
), er = j(
  ([{ didMount: t2 }, { scrollTo: e }, { listState: n2 }]) => {
    const o = T(0);
    return Y(
      x(
        t2,
        $(o),
        P(([, r2]) => r2 !== 0),
        B(([, r2]) => ({ top: r2 }))
      ),
      (r2) => {
        yt(
          x(
            n2,
            Ut(1),
            P((s) => s.items.length > 1)
          ),
          () => {
            requestAnimationFrame(() => {
              _(e, r2);
            });
          }
        );
      }
    ), {
      initialScrollTop: o
    };
  },
  rt(At, It, Kt),
  { singleton: true }
), oo = j(
  ([{ scrollVelocity: t2 }]) => {
    const e = T(false), n2 = U(), o = T(false);
    return k(
      x(
        t2,
        $(o, e, n2),
        P(([r2, s]) => s !== false && s !== void 0),
        B(([r2, s, i, l2]) => {
          const { enter: c, exit: d } = s;
          if (i) {
            if (d(r2, l2))
              return false;
          } else if (c(r2, l2))
            return true;
          return i;
        }),
        nt()
      ),
      e
    ), Y(
      x(at(e, t2, n2), $(o)),
      ([[r2, s, i], l2]) => {
        r2 && l2 !== false && l2 !== void 0 && l2.change && l2.change(s, i);
      }
    ), { isSeeking: e, scrollSeekConfiguration: o, scrollSeekRangeChanged: n2, scrollVelocity: t2 };
  },
  rt(pe),
  { singleton: true }
), Ze = j(([{ scrollContainerState: t2, scrollTo: e }]) => {
  const n2 = U(), o = U(), r2 = U(), s = T(false), i = T(void 0);
  return k(
    x(
      at(n2, o),
      B(([{ scrollTop: l2, viewportHeight: c }, { offsetTop: d, listHeight: m2 }]) => ({
        scrollHeight: m2,
        scrollTop: Math.max(0, l2 - d),
        viewportHeight: c
      }))
    ),
    t2
  ), k(
    x(
      e,
      $(o),
      B(([l2, { offsetTop: c }]) => ({
        ...l2,
        top: l2.top + c
      }))
    ),
    r2
  ), {
    customScrollParent: i,
    // config
    useWindowScroll: s,
    // input
    windowScrollContainerState: n2,
    // signals
    windowScrollTo: r2,
    windowViewportRect: o
  };
}, rt(It)), nr = j(
  ([
    { sizeRanges: t2, sizes: e },
    { headerHeight: n2, scrollTop: o },
    { initialTopMostItemIndex: r2 },
    { didMount: s },
    { useWindowScroll: i, windowScrollContainerState: l2, windowViewportRect: c }
  ]) => {
    const d = U(), m2 = T(void 0), v2 = T(null), p2 = T(null);
    return k(l2, v2), k(c, p2), Y(
      x(
        d,
        $(e, o, i, v2, p2, n2)
      ),
      ([I2, w2, R2, h, f2, a, S2]) => {
        const H2 = Ao(w2.sizeTree);
        h && f2 !== null && a !== null && (R2 = f2.scrollTop - a.offsetTop), R2 -= S2, I2({ ranges: H2, scrollTop: R2 });
      }
    ), k(x(m2, P(_e), B(or)), r2), k(
      x(
        s,
        $(m2),
        P(([, I2]) => I2 !== void 0),
        nt(),
        B(([, I2]) => I2.ranges)
      ),
      t2
    ), {
      getState: d,
      restoreStateFrom: m2
    };
  },
  rt(kt, It, me, At, Ze)
);
function or(t2) {
  return { align: "start", index: 0, offset: t2.scrollTop };
}
const rr = j(([{ topItemsIndexes: t2 }]) => {
  const e = T(0);
  return k(
    x(
      e,
      P((n2) => n2 >= 0),
      B((n2) => Array.from({ length: n2 }).map((o, r2) => r2))
    ),
    t2
  ), { topItemCount: e };
}, rt(Kt));
function ro(t2) {
  let e = false, n2;
  return () => (e || (e = true, n2 = t2()), n2);
}
const sr = ro(() => /iP(ad|od|hone)/i.test(navigator.userAgent) && /WebKit/i.test(navigator.userAgent)), ir = j(
  ([
    { deviation: t2, scrollBy: e, scrollingInProgress: n2, scrollTop: o },
    { isAtBottom: r2, isScrolling: s, lastJumpDueToItemResize: i, scrollDirection: l2 },
    { listState: c },
    { beforeUnshiftWith: d, gap: m2, shiftWithOffset: v2, sizes: p2 },
    { log: I2 },
    { recalcInProgress: w2 }
  ]) => {
    const R2 = Tt(
      x(
        c,
        $(i),
        Lt(
          ([, f2, a, S2], [{ bottom: H2, items: y2, offsetBottom: O2, totalCount: u2 }, g]) => {
            const C2 = H2 + O2;
            let z2 = 0;
            return a === u2 && f2.length > 0 && y2.length > 0 && (y2[0].originalIndex === 0 && f2[0].originalIndex === 0 || (z2 = C2 - S2, z2 !== 0 && (z2 += g))), [z2, y2, u2, C2];
          },
          [0, [], 0, 0]
        ),
        P(([f2]) => f2 !== 0),
        $(o, l2, n2, r2, I2, w2),
        P(([, f2, a, S2, , , H2]) => !H2 && !S2 && f2 !== 0 && a === ue),
        B(([[f2], , , , , a]) => (a("Upward scrolling compensation", { amount: f2 }, ft.DEBUG), f2))
      )
    );
    function h(f2) {
      f2 > 0 ? (_(e, { behavior: "auto", top: -f2 }), _(t2, 0)) : (_(t2, 0), _(e, { behavior: "auto", top: -f2 }));
    }
    return Y(x(R2, $(t2, s)), ([f2, a, S2]) => {
      S2 && sr() ? _(t2, a - f2) : h(-f2);
    }), Y(
      x(
        at(ht(s, false), t2, w2),
        P(([f2, a, S2]) => !f2 && !S2 && a !== 0),
        B(([f2, a]) => a),
        zt(1)
      ),
      h
    ), k(
      x(
        v2,
        B((f2) => ({ top: -f2 }))
      ),
      e
    ), Y(
      x(
        d,
        $(p2, m2),
        B(([f2, { groupIndices: a, lastSize: S2, sizeTree: H2 }, y2]) => {
          function O2(L2) {
            return L2 * (S2 + y2);
          }
          if (a.length === 0)
            return O2(f2);
          let u2 = 0;
          const g = ie(H2, 0);
          let C2 = 0, z2 = 0;
          for (; C2 < f2; ) {
            C2++, u2 += g;
            let L2 = a.length === z2 + 1 ? 1 / 0 : a[z2 + 1] - a[z2] - 1;
            C2 + L2 > f2 && (u2 -= g, L2 = f2 - C2 + 1), C2 += L2, u2 += O2(L2), z2++;
          }
          return u2;
        })
      ),
      (f2) => {
        _(t2, f2), requestAnimationFrame(() => {
          _(e, { top: f2 }), requestAnimationFrame(() => {
            _(t2, 0), _(w2, false);
          });
        });
      }
    ), { deviation: t2 };
  },
  rt(It, pe, Kt, kt, Gt, Ue)
), lr = j(
  ([
    t2,
    e,
    n2,
    o,
    r2,
    s,
    i,
    l2,
    c,
    d,
    m2
  ]) => ({
    ...t2,
    ...e,
    ...n2,
    ...o,
    ...r2,
    ...s,
    ...i,
    ...l2,
    ...c,
    ...d,
    ...m2
  }),
  rt(
    Ye,
    tr,
    At,
    oo,
    to,
    er,
    Zo,
    Ze,
    no,
    Gt,
    eo
  )
), so = j(
  ([
    {
      data: t2,
      defaultItemSize: e,
      firstItemIndex: n2,
      fixedItemSize: o,
      fixedGroupSize: r2,
      gap: s,
      groupIndices: i,
      heightEstimates: l2,
      itemSize: c,
      sizeRanges: d,
      sizes: m2,
      statefulTotalCount: v2,
      totalCount: p2,
      trackItemSizes: I2
    },
    { initialItemFinalLocationReached: w2, initialTopMostItemIndex: R2, scrolledToInitialItem: h },
    f2,
    a,
    S2,
    H2,
    { scrollToIndex: y2 },
    O2,
    { topItemCount: u2 },
    { groupCounts: g },
    C2
  ]) => {
    const { listState: z2, minOverscanItemCount: L2, topItemsIndexes: V2, rangeChanged: N2, ...Z2 } = H2;
    return k(N2, C2.scrollSeekRangeChanged), k(
      x(
        C2.windowViewportRect,
        B((F2) => F2.visibleHeight)
      ),
      f2.viewportHeight
    ), {
      data: t2,
      defaultItemHeight: e,
      firstItemIndex: n2,
      fixedItemHeight: o,
      fixedGroupHeight: r2,
      gap: s,
      groupCounts: g,
      heightEstimates: l2,
      initialItemFinalLocationReached: w2,
      initialTopMostItemIndex: R2,
      scrolledToInitialItem: h,
      sizeRanges: d,
      topItemCount: u2,
      topItemsIndexes: V2,
      // input
      totalCount: p2,
      ...S2,
      groupIndices: i,
      itemSize: c,
      listState: z2,
      minOverscanItemCount: L2,
      scrollToIndex: y2,
      // output
      statefulTotalCount: v2,
      trackItemSizes: I2,
      // exported from stateFlagsSystem
      rangeChanged: N2,
      ...Z2,
      // the bag of IO from featureGroup1System
      ...C2,
      ...f2,
      sizes: m2,
      ...a
    };
  },
  rt(
    kt,
    me,
    It,
    nr,
    Qo,
    Kt,
    fe,
    ir,
    rr,
    Zn,
    lr
  )
);
function cr(t2, e) {
  const n2 = {}, o = {};
  let r2 = 0;
  const s = t2.length;
  for (; r2 < s; )
    o[t2[r2]] = 1, r2 += 1;
  for (const i in e)
    Object.hasOwn(o, i) || (n2[i] = e[i]);
  return n2;
}
const Ie = typeof document < "u" ? React.useLayoutEffect : React.useEffect;
function Xe(t2, e, n2) {
  const o = Object.keys(e.required || {}), r2 = Object.keys(e.optional || {}), s = Object.keys(e.methods || {}), i = Object.keys(e.events || {}), l2 = React.createContext({});
  function c(f2, a) {
    f2.propsReady !== void 0 && _(f2.propsReady, false);
    for (const S2 of o) {
      const H2 = f2[e.required[S2]];
      _(H2, a[S2]);
    }
    for (const S2 of r2)
      if (S2 in a) {
        const H2 = f2[e.optional[S2]];
        _(H2, a[S2]);
      }
    f2.propsReady !== void 0 && _(f2.propsReady, true);
  }
  function d(f2) {
    return s.reduce((a, S2) => (a[S2] = (H2) => {
      const y2 = f2[e.methods[S2]];
      _(y2, H2);
    }, a), {});
  }
  function m2(f2) {
    return i.reduce((a, S2) => (a[S2] = yo(f2[e.events[S2]]), a), {});
  }
  const v2 = React.forwardRef(function(a, S2) {
    const { children: H2, ...y2 } = a, [O2] = React.useState(() => ye(Ro(t2), (C2) => {
      c(C2, y2);
    })), [u2] = React.useState(mn(m2, O2));
    Ie(() => {
      for (const C2 of i)
        C2 in y2 && Y(u2[C2], y2[C2]);
      return () => {
        Object.values(u2).map(Ne);
      };
    }, [y2, u2, O2]), Ie(() => {
      c(O2, y2);
    }), React.useImperativeHandle(S2, fn(d(O2)));
    const g = n2;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(l2.Provider, { value: O2, children: n2 !== void 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(g, { ...cr([...o, ...r2, ...i], y2), children: H2 }) : H2 });
  }), p2 = (f2) => {
    const a = React.useContext(l2);
    return React.useCallback(
      (S2) => {
        _(a[f2], S2);
      },
      [a, f2]
    );
  }, I2 = (f2) => {
    const S2 = React.useContext(l2)[f2], H2 = React.useCallback(
      (y2) => Y(S2, y2),
      [S2]
    );
    return React.useSyncExternalStore(
      H2,
      () => it(S2),
      () => it(S2)
    );
  }, w2 = (f2) => {
    const S2 = React.useContext(l2)[f2], [H2, y2] = React.useState(mn(it, S2));
    return Ie(
      () => Y(S2, (O2) => {
        O2 !== H2 && y2(fn(O2));
      }),
      [S2, H2]
    ), H2;
  }, R2 = parseInt(React.version) >= 18 ? I2 : w2;
  return {
    Component: v2,
    useEmitter: (f2, a) => {
      const H2 = React.useContext(l2)[f2];
      Ie(() => Y(H2, a), [a, H2]);
    },
    useEmitterValue: R2,
    usePublisher: p2
  };
}
const Re = React.createContext(void 0), io = React.createContext(void 0), Oe = "-webkit-sticky", Rn = "sticky", Je = ro(() => {
  if (typeof document > "u")
    return Rn;
  const t2 = document.createElement("div");
  return t2.style.position = Oe, t2.style.position === Oe ? Oe : Rn;
}), lo = typeof document < "u" ? React.useLayoutEffect : React.useEffect;
function ke(t2) {
  return "self" in t2;
}
function ur(t2) {
  return "body" in t2;
}
function co(t2, e, n2, o = Jt, r2, s) {
  const i = React.useRef(null), l2 = React.useRef(null), c = React.useRef(null), d = React.useCallback(
    (p2) => {
      let I2, w2, R2;
      const h = p2.target;
      if (ur(h) || ke(h)) {
        const a = ke(h) ? h : h.defaultView;
        R2 = s === true ? _t(a, a.scrollX) : a.scrollY, I2 = s === true ? a.document.documentElement.scrollWidth : a.document.documentElement.scrollHeight, w2 = s === true ? a.innerWidth : a.innerHeight;
      } else
        R2 = s === true ? _t(h, h.scrollLeft) : h.scrollTop, I2 = s === true ? h.scrollWidth : h.scrollHeight, w2 = s === true ? h.offsetWidth : h.offsetHeight;
      const f2 = () => {
        t2({
          scrollHeight: I2,
          scrollTop: Math.max(R2, 0),
          viewportHeight: w2
        });
      };
      p2.suppressFlushSync === true ? f2() : So.flushSync(f2), l2.current !== null && (R2 === l2.current || R2 <= 0 || R2 === I2 - w2) && (l2.current = null, e(true), c.current && (clearTimeout(c.current), c.current = null));
    },
    [t2, e, s]
  );
  React.useEffect(() => {
    const p2 = r2 || i.current;
    return hn(p2), o(r2 || i.current), d({ suppressFlushSync: true, target: p2 }), p2.addEventListener("scroll", d, { passive: true }), () => {
      hn(p2), o(null), p2.removeEventListener("scroll", d);
    };
  }, [i, d, n2, o, r2]);
  function m2(p2) {
    const I2 = i.current;
    if (!I2 || (s === true ? "offsetWidth" in I2 && I2.offsetWidth === 0 : "offsetHeight" in I2 && I2.offsetHeight === 0))
      return;
    const w2 = p2.behavior === "smooth";
    let R2, h, f2;
    ke(I2) ? (h = Math.max(
      Ht(I2.document.documentElement, s === true ? "width" : "height"),
      s === true ? I2.document.documentElement.scrollWidth : I2.document.documentElement.scrollHeight
    ), R2 = s === true ? I2.innerWidth : I2.innerHeight, f2 = s === true ? _t(I2, I2.scrollX) : I2.scrollY) : (h = I2[s === true ? "scrollWidth" : "scrollHeight"], R2 = Ht(I2, s === true ? "width" : "height"), f2 = s === true ? _t(I2, I2.scrollLeft) : I2.scrollTop);
    const a = h - R2;
    if (p2.top === void 0) {
      I2.scrollTo(p2);
      return;
    }
    const S2 = Math.ceil(Math.max(Math.min(a, p2.top), 0));
    if (p2.top = S2, Jn(R2, h) || S2 === f2) {
      t2({ scrollHeight: h, scrollTop: f2, viewportHeight: R2 }), w2 && e(true);
      return;
    }
    w2 ? (l2.current = S2, c.current && clearTimeout(c.current), c.current = setTimeout(() => {
      c.current = null, l2.current = null, e(true);
    }, 1e3)) : l2.current = null, s === true && (p2 = {
      ...p2.behavior !== void 0 ? { behavior: p2.behavior } : {},
      left: gn(I2, S2)
    }), I2.scrollTo(p2);
  }
  function v2(p2) {
    s === true && (p2 = {
      ...p2.behavior !== void 0 ? { behavior: p2.behavior } : {},
      ...p2.top !== void 0 ? { left: gn(i.current, p2.top) } : {}
    }), i.current.scrollBy(p2);
  }
  return { scrollByCallback: v2, scrollerRef: i, scrollToCallback: m2 };
}
function Qe(t2) {
  return t2;
}
const ar = /* @__PURE__ */ j(() => {
  const t2 = T((l2) => `Item ${l2}`), e = T((l2) => `Group ${l2}`), n2 = T({}), o = T(Qe), r2 = T("div"), s = T(Jt), i = (l2, c = null) => ht(
    x(
      n2,
      B((d) => d[l2]),
      nt()
    ),
    c
  );
  return {
    components: n2,
    computeItemKey: o,
    EmptyPlaceholder: i("EmptyPlaceholder"),
    FooterComponent: i("Footer"),
    GroupComponent: i("Group", "div"),
    groupContent: e,
    HeaderComponent: i("Header"),
    HeaderFooterTag: r2,
    ItemComponent: i("Item", "div"),
    itemContent: t2,
    ListComponent: i("List", "div"),
    ScrollerComponent: i("Scroller", "div"),
    scrollerRef: s,
    ScrollSeekPlaceholder: i("ScrollSeekPlaceholder"),
    TopItemListComponent: i("TopItemList")
  };
}), dr = /* @__PURE__ */ j(
  ([t2, e]) => ({ ...t2, ...e }),
  rt(so, ar)
), fr = ({ height: t2 }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { height: t2 } }), mr = { overflowAnchor: "none", position: Je(), zIndex: 1 }, uo = { overflowAnchor: "none" }, pr = { ...uo, display: "inline-block", height: "100%" }, Hn = /* @__PURE__ */ React.memo(function({ showTopList: e = false }) {
  const n2 = A("listState"), o = Ct("sizeRanges"), r2 = A("useWindowScroll"), s = A("customScrollParent"), i = Ct("windowScrollContainerState"), l2 = Ct("scrollContainerState"), c = s || r2 ? i : l2, d = A("itemContent"), m2 = A("context"), v2 = A("groupContent"), p2 = A("trackItemSizes"), I2 = A("itemSize"), w2 = A("log"), R2 = Ct("gap"), h = A("horizontalDirection"), { callbackRef: f2 } = Mn(
    o,
    I2,
    p2,
    e ? Jt : c,
    w2,
    R2,
    s,
    h,
    A("skipAnimationFrameInResizeObserver")
  ), [a, S2] = React.useState(0);
  on("deviation", (F2) => {
    a !== F2 && S2(F2);
  });
  const H2 = A("EmptyPlaceholder"), y2 = A("ScrollSeekPlaceholder") ?? fr, O2 = A("ListComponent"), u2 = A("ItemComponent"), g = A("GroupComponent"), C2 = A("computeItemKey"), z2 = A("isSeeking"), L2 = A("groupIndices").length > 0, V2 = A("alignToBottom"), N2 = A("initialItemFinalLocationReached"), Z2 = e ? {} : {
    boxSizing: "border-box",
    ...h ? {
      display: "inline-block",
      height: "100%",
      marginInlineStart: a !== 0 ? a : V2 ? "auto" : 0,
      paddingInlineEnd: n2.offsetBottom,
      paddingInlineStart: n2.offsetTop,
      whiteSpace: "nowrap"
    } : {
      marginTop: a !== 0 ? a : V2 ? "auto" : 0,
      paddingBottom: n2.offsetBottom,
      paddingTop: n2.offsetTop
    },
    ...N2 ? {} : { visibility: "hidden" }
  };
  return !e && n2.totalCount === 0 && H2 !== null && H2 !== void 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(H2, { ...ot(H2, m2) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
    O2,
    {
      ...ot(O2, m2),
      "data-testid": e ? "virtuoso-top-item-list" : "virtuoso-item-list",
      ref: f2,
      style: Z2,
      children: (e ? n2.topItems : n2.items).map((F2) => {
        const mt = F2.originalIndex, q2 = C2(mt + n2.firstItemIndex, F2.data, m2);
        return z2 ? /* @__PURE__ */ reactExports.createElement(
          y2,
          {
            ...ot(y2, m2),
            height: F2.size,
            index: F2.index,
            key: q2,
            type: F2.type || "item",
            ...F2.type === "group" ? {} : { groupIndex: F2.groupIndex }
          }
        ) : F2.type === "group" ? /* @__PURE__ */ reactExports.createElement(
          g,
          {
            ...ot(g, m2),
            "data-index": mt,
            "data-item-index": F2.index,
            "data-known-size": F2.size,
            key: q2,
            style: mr
          },
          v2(F2.index, m2)
        ) : /* @__PURE__ */ reactExports.createElement(
          u2,
          {
            ...ot(u2, m2),
            ...ao(u2, F2.data),
            "data-index": mt,
            "data-item-group-index": F2.groupIndex,
            "data-item-index": F2.index,
            "data-known-size": F2.size,
            key: q2,
            style: h ? pr : uo
          },
          L2 ? d(F2.index, F2.groupIndex, F2.data, m2) : d(F2.index, F2.data, m2)
        );
      })
    }
  );
}), hr = {
  height: "100%",
  outline: "none",
  overflowY: "auto",
  position: "relative",
  WebkitOverflowScrolling: "touch"
}, gr = {
  outline: "none",
  overflowX: "auto",
  position: "relative"
}, He = (t2) => ({
  height: "100%",
  position: "absolute",
  top: 0,
  width: "100%",
  ...t2 ? { display: "flex", flexDirection: "column" } : void 0
}), tn = (t2, e, n2 = 0) => ({
  ...He(t2),
  position: e ? "relative" : "absolute",
  top: e ? -n2 : 0
}), Ir = {
  position: Je(),
  top: 0,
  width: "100%",
  zIndex: 1
};
function ot(t2, e) {
  if (typeof t2 != "string")
    return { context: e };
}
function ao(t2, e) {
  return { item: typeof t2 == "string" ? void 0 : e };
}
const Sr = /* @__PURE__ */ React.memo(function() {
  const e = A("HeaderComponent"), n2 = Ct("headerHeight"), o = A("HeaderFooterTag"), r2 = Ot(
    React.useMemo(
      () => (i) => {
        n2(Ht(i, "height"));
      },
      [n2]
    ),
    true,
    A("skipAnimationFrameInResizeObserver")
  ), s = A("context");
  return e != null ? /* @__PURE__ */ jsxRuntimeExports.jsx(o, { ref: r2, children: /* @__PURE__ */ jsxRuntimeExports.jsx(e, { ...ot(e, s) }) }) : null;
}), xr = /* @__PURE__ */ React.memo(function() {
  const e = A("FooterComponent"), n2 = Ct("footerHeight"), o = A("HeaderFooterTag"), r2 = Ot(
    React.useMemo(
      () => (i) => {
        n2(Ht(i, "height"));
      },
      [n2]
    ),
    true,
    A("skipAnimationFrameInResizeObserver")
  ), s = A("context");
  return e != null ? /* @__PURE__ */ jsxRuntimeExports.jsx(o, { ref: r2, children: /* @__PURE__ */ jsxRuntimeExports.jsx(e, { ...ot(e, s) }) }) : null;
});
function en({ useEmitter: t2, useEmitterValue: e, usePublisher: n2 }) {
  return React.memo(function({ children: s, style: i, context: l2, ...c }) {
    const d = n2("scrollContainerState"), m2 = e("ScrollerComponent"), v2 = n2("smoothScrollTargetReached"), p2 = e("scrollerRef"), I2 = e("horizontalDirection") || false, { scrollByCallback: w2, scrollerRef: R2, scrollToCallback: h } = co(
      d,
      v2,
      m2,
      p2,
      void 0,
      I2
    );
    return t2("scrollTo", h), t2("scrollBy", w2), /* @__PURE__ */ jsxRuntimeExports.jsx(
      m2,
      {
        "data-testid": "virtuoso-scroller",
        "data-virtuoso-scroller": true,
        ref: R2,
        style: { ...I2 ? gr : hr, ...i },
        tabIndex: 0,
        ...c,
        ...ot(m2, l2),
        children: s
      }
    );
  });
}
function nn({ useEmitter: t2, useEmitterValue: e, usePublisher: n2 }) {
  return React.memo(function({ children: s, style: i, context: l2, ...c }) {
    const d = n2("windowScrollContainerState"), m2 = e("ScrollerComponent"), v2 = n2("smoothScrollTargetReached"), p2 = e("totalListHeight"), I2 = e("deviation"), w2 = e("customScrollParent"), R2 = React.useRef(null), h = e("scrollerRef"), { scrollByCallback: f2, scrollerRef: a, scrollToCallback: S2 } = co(
      d,
      v2,
      m2,
      h,
      w2
    );
    return lo(() => (a.current = w2 || R2.current?.ownerDocument.defaultView, () => {
      a.current = null;
    }), [a, w2]), t2("windowScrollTo", S2), t2("scrollBy", f2), /* @__PURE__ */ jsxRuntimeExports.jsx(
      m2,
      {
        ref: R2,
        "data-virtuoso-scroller": true,
        style: { position: "relative", ...i, ...p2 !== 0 ? { height: p2 + I2 } : void 0 },
        ...c,
        ...ot(m2, l2),
        children: s
      }
    );
  });
}
const vr = ({ children: t2 }) => {
  const e = React.useContext(Re), n2 = Ct("viewportHeight"), o = Ct("fixedItemHeight"), r2 = A("alignToBottom"), s = A("horizontalDirection"), i = React.useMemo(
    () => re(n2, (c) => Ht(c, s ? "width" : "height")),
    [n2, s]
  ), l2 = Ot(i, true, A("skipAnimationFrameInResizeObserver"));
  return React.useEffect(() => {
    e && (n2(e.viewportHeight), o(e.itemHeight));
  }, [e, n2, o]), /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-viewport-type": "element", ref: l2, style: He(r2), children: t2 });
}, Tr = ({ children: t2 }) => {
  const e = React.useContext(Re), n2 = Ct("windowViewportRect"), o = Ct("fixedItemHeight"), r2 = A("customScrollParent"), s = A("useWindowScroll"), i = A("topListHeight"), l2 = $e(
    n2,
    r2,
    A("skipAnimationFrameInResizeObserver")
  ), c = A("alignToBottom");
  return React.useEffect(() => {
    e && (o(e.itemHeight), n2({ listHeight: 0, offsetTop: 0, visibleHeight: e.viewportHeight, visibleWidth: 100 }));
  }, [e, n2, o]), /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-viewport-type": "window", ref: l2, style: tn(c, s, i), children: t2 });
}, Cr = ({ children: t2 }) => {
  const e = A("TopItemListComponent") ?? "div", n2 = A("headerHeight"), o = { ...Ir, marginTop: `${n2}px` }, r2 = A("context");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(e, { style: o, ...ot(e, r2), children: t2 });
}, wr = /* @__PURE__ */ React.memo(function(e) {
  const n2 = A("useWindowScroll"), o = A("topItemsIndexes").length > 0, r2 = A("customScrollParent"), s = A("context");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(r2 || n2 ? br : yr, { ...e, context: s, children: [
    o && /* @__PURE__ */ jsxRuntimeExports.jsx(Cr, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Hn, { showTopList: true }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(r2 || n2 ? Tr : vr, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Sr, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Hn, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(xr, {})
    ] })
  ] });
}), {
  Component: fo,
  useEmitter: on,
  useEmitterValue: A,
  usePublisher: Ct
} = /* @__PURE__ */ Xe(
  dr,
  {
    optional: {
      restoreStateFrom: "restoreStateFrom",
      context: "context",
      followOutput: "followOutput",
      scrollIntoViewOnChange: "scrollIntoViewOnChange",
      itemContent: "itemContent",
      groupContent: "groupContent",
      overscan: "overscan",
      increaseViewportBy: "increaseViewportBy",
      minOverscanItemCount: "minOverscanItemCount",
      totalCount: "totalCount",
      groupCounts: "groupCounts",
      topItemCount: "topItemCount",
      firstItemIndex: "firstItemIndex",
      initialTopMostItemIndex: "initialTopMostItemIndex",
      components: "components",
      atBottomThreshold: "atBottomThreshold",
      atTopThreshold: "atTopThreshold",
      computeItemKey: "computeItemKey",
      defaultItemHeight: "defaultItemHeight",
      fixedGroupHeight: "fixedGroupHeight",
      // Must be set above 'fixedItemHeight'
      fixedItemHeight: "fixedItemHeight",
      heightEstimates: "heightEstimates",
      itemSize: "itemSize",
      scrollSeekConfiguration: "scrollSeekConfiguration",
      headerFooterTag: "HeaderFooterTag",
      data: "data",
      initialItemCount: "initialItemCount",
      initialScrollTop: "initialScrollTop",
      alignToBottom: "alignToBottom",
      useWindowScroll: "useWindowScroll",
      customScrollParent: "customScrollParent",
      scrollerRef: "scrollerRef",
      logLevel: "logLevel",
      horizontalDirection: "horizontalDirection",
      skipAnimationFrameInResizeObserver: "skipAnimationFrameInResizeObserver"
    },
    methods: {
      scrollToIndex: "scrollToIndex",
      scrollIntoView: "scrollIntoView",
      scrollTo: "scrollTo",
      scrollBy: "scrollBy",
      autoscrollToBottom: "autoscrollToBottom",
      getState: "getState"
    },
    events: {
      isScrolling: "isScrolling",
      endReached: "endReached",
      startReached: "startReached",
      rangeChanged: "rangeChanged",
      atBottomStateChange: "atBottomStateChange",
      atTopStateChange: "atTopStateChange",
      totalListHeightChanged: "totalListHeightChanged",
      itemsRendered: "itemsRendered",
      groupIndices: "groupIndices"
    }
  },
  wr
), yr = /* @__PURE__ */ en({ useEmitter: on, useEmitterValue: A, usePublisher: Ct }), br = /* @__PURE__ */ nn({ useEmitter: on, useEmitterValue: A, usePublisher: Ct }), ns = fo, Rr = /* @__PURE__ */ j(() => {
  const t2 = T((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { children: [
    "Item $",
    d
  ] })), e = T(null), n2 = T((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { colSpan: 1e3, children: [
    "Group ",
    d
  ] })), o = T(null), r2 = T(null), s = T({}), i = T(Qe), l2 = T(Jt), c = (d, m2 = null) => ht(
    x(
      s,
      B((v2) => v2[d]),
      nt()
    ),
    m2
  );
  return {
    components: s,
    computeItemKey: i,
    context: e,
    EmptyPlaceholder: c("EmptyPlaceholder"),
    FillerRow: c("FillerRow"),
    fixedFooterContent: r2,
    fixedHeaderContent: o,
    itemContent: t2,
    groupContent: n2,
    ScrollerComponent: c("Scroller", "div"),
    scrollerRef: l2,
    ScrollSeekPlaceholder: c("ScrollSeekPlaceholder"),
    TableBodyComponent: c("TableBody", "tbody"),
    TableComponent: c("Table", "table"),
    TableFooterComponent: c("TableFoot", "tfoot"),
    TableHeadComponent: c("TableHead", "thead"),
    TableRowComponent: c("TableRow", "tr"),
    GroupComponent: c("Group", "tr")
  };
});
/* @__PURE__ */ j(
  ([t2, e]) => ({ ...t2, ...e }),
  rt(so, Rr)
);
({ position: Je() });
const Ln = {
  bottom: 0,
  itemHeight: 0,
  items: [],
  itemWidth: 0,
  offsetBottom: 0,
  offsetTop: 0,
  top: 0
}, Pr = {
  bottom: 0,
  itemHeight: 0,
  items: [{ index: 0 }],
  itemWidth: 0,
  offsetBottom: 0,
  offsetTop: 0,
  top: 0
}, { ceil: On, floor: Ce, max: oe, min: ze, round: kn } = Math;
function zn(t2, e, n2) {
  return Array.from({ length: e - t2 + 1 }).map((o, r2) => ({ data: n2 === null ? null : n2[r2 + t2], index: r2 + t2 }));
}
function Gr(t2) {
  return {
    ...Pr,
    items: t2
  };
}
function Se(t2, e) {
  return t2 !== void 0 && t2.width === e.width && t2.height === e.height;
}
function Ar(t2, e) {
  return t2 !== void 0 && t2.column === e.column && t2.row === e.row;
}
const Mr = /* @__PURE__ */ j(
  ([
    { increaseViewportBy: t2, listBoundary: e, overscan: n2, visibleRange: o },
    { footerHeight: r2, headerHeight: s, scrollBy: i, scrollContainerState: l2, scrollTo: c, scrollTop: d, smoothScrollTargetReached: m2, viewportHeight: v2 },
    p2,
    I2,
    { didMount: w2, propsReady: R2 },
    { customScrollParent: h, useWindowScroll: f2, windowScrollContainerState: a, windowScrollTo: S2, windowViewportRect: H2 },
    y2
  ]) => {
    const O2 = T(0), u2 = T(0), g = T(Ln), C2 = T({ height: 0, width: 0 }), z2 = T({ height: 0, width: 0 }), L2 = U(), V2 = U(), N2 = T(0), Z2 = T(null), F2 = T({ column: 0, row: 0 }), mt = U(), q2 = U(), Q2 = T(false), gt = T(0), ut = T(true), St = T(false), Ft = T(false);
    Y(
      x(
        w2,
        $(gt),
        P(([b, D2]) => D2 !== 0)
      ),
      () => {
        _(ut, false);
      }
    ), Y(
      x(
        at(w2, ut, z2, C2, gt, St),
        P(([b, D2, K2, st, , tt]) => b && !D2 && K2.height !== 0 && st.height !== 0 && !tt)
      ),
      ([, , , , b]) => {
        _(St, true), je(1, () => {
          _(L2, b);
        }), yt(x(d), () => {
          _(e, [0, 0]), _(ut, true);
        });
      }
    ), k(
      x(
        q2,
        P((b) => b != null && b.scrollTop > 0),
        Bt(0)
      ),
      u2
    ), Y(
      x(
        w2,
        $(q2),
        P(([, b]) => b != null)
      ),
      ([, b]) => {
        b && (_(C2, b.viewport), _(z2, b.item), _(F2, b.gap), b.scrollTop > 0 && (_(Q2, true), yt(x(d, Ut(1)), (D2) => {
          _(Q2, false);
        }), _(c, { top: b.scrollTop })));
      }
    ), k(
      x(
        C2,
        B(({ height: b }) => b)
      ),
      v2
    ), k(
      x(
        at(
          W(C2, Se),
          W(z2, Se),
          W(F2, (b, D2) => b !== void 0 && b.column === D2.column && b.row === D2.row),
          W(d)
        ),
        B(([b, D2, K2, st]) => ({
          gap: K2,
          item: D2,
          scrollTop: st,
          viewport: b
        }))
      ),
      mt
    ), k(
      x(
        at(
          W(O2),
          o,
          W(F2, Ar),
          W(z2, Se),
          W(C2, Se),
          W(Z2),
          W(u2),
          W(Q2),
          W(ut),
          W(gt)
        ),
        P(([, , , , , , , b]) => !b),
        B(
          ([
            b,
            [D2, K2],
            st,
            tt,
            X2,
            lt,
            xt,
            ,
            ct,
            Vt
          ]) => {
            const { column: Wt, row: ee2 } = st, { height: he2, width: Ee2 } = tt, { width: sn } = X2;
            if (xt === 0 && (b === 0 || sn === 0))
              return Ln;
            if (Ee2 === 0) {
              const dn = qe(Vt, b), Io = dn + Math.max(xt - 1, 0);
              return Gr(zn(dn, Io, lt));
            }
            const ge2 = po(sn, Ee2, Wt);
            let qt, Mt;
            ct ? D2 === 0 && K2 === 0 && xt > 0 ? (qt = 0, Mt = xt - 1) : (qt = ge2 * Ce((D2 + ee2) / (he2 + ee2)), Mt = ge2 * On((K2 + ee2) / (he2 + ee2)) - 1, Mt = ze(b - 1, oe(Mt, ge2 - 1)), qt = ze(Mt, oe(0, qt))) : (qt = 0, Mt = -1);
            const ln = zn(qt, Mt, lt), { bottom: cn2, top: un } = Fn(X2, st, tt, ln), an = On(b / ge2), go = an * he2 + (an - 1) * ee2 - cn2;
            return { bottom: cn2, itemHeight: he2, items: ln, itemWidth: Ee2, offsetBottom: go, offsetTop: un, top: un };
          }
        )
      ),
      g
    ), k(
      x(
        Z2,
        P((b) => b !== null),
        B((b) => b.length)
      ),
      O2
    ), k(
      x(
        at(C2, z2, g, F2),
        P(([b, D2, { items: K2 }]) => K2.length > 0 && D2.height !== 0 && b.height !== 0),
        B(([b, D2, { items: K2 }, st]) => {
          const { bottom: tt, top: X2 } = Fn(b, st, D2, K2);
          return [X2, tt];
        }),
        nt(le)
      ),
      e
    );
    const pt = T(false);
    k(
      x(
        d,
        $(pt),
        B(([b, D2]) => D2 || b !== 0)
      ),
      pt
    );
    const jt = Tt(
      x(
        at(g, O2),
        P(([{ items: b }]) => b.length > 0),
        $(pt),
        P(([[b, D2], K2]) => {
          const tt = b.items[b.items.length - 1].index === D2 - 1;
          return (K2 || b.bottom > 0 && b.itemHeight > 0 && b.offsetBottom === 0 && b.items.length === D2) && tt;
        }),
        B(([[, b]]) => b - 1),
        nt()
      )
    ), Qt = Tt(
      x(
        W(g),
        P(({ items: b }) => b.length > 0 && b[0].index === 0),
        Bt(0),
        nt()
      )
    ), Et = Tt(
      x(
        W(g),
        $(Q2),
        P(([{ items: b }, D2]) => b.length > 0 && !D2),
        B(([{ items: b }]) => ({
          endIndex: b[b.length - 1].index,
          startIndex: b[0].index
        })),
        nt(Kn),
        zt(0)
      )
    );
    k(Et, I2.scrollSeekRangeChanged), k(
      x(
        L2,
        $(C2, z2, O2, F2),
        B(([b, D2, K2, st, tt]) => {
          const X2 = Xn(b), { align: lt, behavior: xt, offset: ct } = X2;
          let Vt = X2.index;
          Vt === "LAST" && (Vt = st - 1), Vt = oe(0, Vt, ze(st - 1, Vt));
          let Wt = Me(D2, tt, K2, Vt);
          return lt === "end" ? Wt = kn(Wt - D2.height + K2.height) : lt === "center" && (Wt = kn(Wt - D2.height / 2 + K2.height / 2)), ct !== void 0 && ct !== 0 && (Wt += ct), { behavior: xt, top: Wt };
        })
      ),
      c
    );
    const te2 = ht(
      x(
        g,
        B((b) => b.offsetBottom + b.bottom)
      ),
      0
    );
    return k(
      x(
        H2,
        B((b) => ({ height: b.visibleHeight, width: b.visibleWidth }))
      ),
      C2
    ), {
      customScrollParent: h,
      // input
      data: Z2,
      deviation: N2,
      footerHeight: r2,
      gap: F2,
      headerHeight: s,
      increaseViewportBy: t2,
      initialItemCount: u2,
      itemDimensions: z2,
      overscan: n2,
      restoreStateFrom: q2,
      scrollBy: i,
      scrollContainerState: l2,
      scrollHeight: V2,
      scrollTo: c,
      scrollToIndex: L2,
      scrollTop: d,
      smoothScrollTargetReached: m2,
      totalCount: O2,
      useWindowScroll: f2,
      viewportDimensions: C2,
      windowScrollContainerState: a,
      windowScrollTo: S2,
      windowViewportRect: H2,
      ...I2,
      // output
      gridState: g,
      horizontalDirection: Ft,
      initialTopMostItemIndex: gt,
      totalListHeight: te2,
      ...p2,
      endReached: jt,
      propsReady: R2,
      rangeChanged: Et,
      startReached: Qt,
      stateChanged: mt,
      stateRestoreInProgress: Q2,
      ...y2
    };
  },
  rt(Ye, It, pe, oo, At, Ze, Gt)
);
function po(t2, e, n2) {
  return oe(1, Ce((t2 + n2) / (Ce(e) + n2)));
}
function Fn(t2, e, n2, o) {
  const { height: r2 } = n2;
  if (r2 === void 0 || o.length === 0)
    return { bottom: 0, top: 0 };
  const s = Me(t2, e, n2, o[0].index);
  return { bottom: Me(t2, e, n2, o[o.length - 1].index) + r2, top: s };
}
function Me(t2, e, n2, o) {
  const r2 = po(t2.width, n2.width, e.column), s = Ce(o / r2), i = s * n2.height + oe(0, s - 1) * e.row;
  return i > 0 ? i + e.row : i;
}
const _r = /* @__PURE__ */ j(() => {
  const t2 = T((v2) => `Item ${v2}`), e = T({}), n2 = T(null), o = T("virtuoso-grid-item"), r2 = T("virtuoso-grid-list"), s = T(Qe), i = T("div"), l2 = T(Jt), c = (v2, p2 = null) => ht(
    x(
      e,
      B((I2) => I2[v2]),
      nt()
    ),
    p2
  ), d = T(false), m2 = T(false);
  return k(W(m2), d), {
    components: e,
    computeItemKey: s,
    context: n2,
    FooterComponent: c("Footer"),
    HeaderComponent: c("Header"),
    headerFooterTag: i,
    itemClassName: o,
    ItemComponent: c("Item", "div"),
    itemContent: t2,
    listClassName: r2,
    ListComponent: c("List", "div"),
    readyStateChanged: d,
    reportReadyState: m2,
    ScrollerComponent: c("Scroller", "div"),
    scrollerRef: l2,
    ScrollSeekPlaceholder: c("ScrollSeekPlaceholder", "div")
  };
}), Nr = /* @__PURE__ */ j(
  ([t2, e]) => ({ ...t2, ...e }),
  rt(Mr, _r)
), Dr = /* @__PURE__ */ React.memo(function() {
  const e = et("gridState"), n2 = et("listClassName"), o = et("itemClassName"), r2 = et("itemContent"), s = et("computeItemKey"), i = et("isSeeking"), l2 = wt("scrollHeight"), c = et("ItemComponent"), d = et("ListComponent"), m2 = et("ScrollSeekPlaceholder"), v2 = et("context"), p2 = wt("itemDimensions"), I2 = wt("gap"), w2 = et("log"), R2 = et("stateRestoreInProgress"), h = wt("reportReadyState"), f2 = Ot(
    React.useMemo(
      () => (a) => {
        const S2 = a.parentElement.parentElement.scrollHeight;
        l2(S2);
        const H2 = a.firstChild;
        if (H2 !== null) {
          const { height: y2, width: O2 } = H2.getBoundingClientRect();
          p2({ height: y2, width: O2 });
        }
        I2({
          column: Vn("column-gap", getComputedStyle(a).columnGap, w2),
          row: Vn("row-gap", getComputedStyle(a).rowGap, w2)
        });
      },
      [l2, p2, I2, w2]
    ),
    true,
    false
  );
  return lo(() => {
    e.itemHeight > 0 && e.itemWidth > 0 && h(true);
  }, [e]), R2 ? null : /* @__PURE__ */ jsxRuntimeExports.jsx(
    d,
    {
      className: n2,
      ref: f2,
      ...ot(d, v2),
      "data-testid": "virtuoso-item-list",
      style: { paddingBottom: e.offsetBottom, paddingTop: e.offsetTop },
      children: e.items.map((a) => {
        const S2 = s(a.index, a.data, v2);
        return i ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          m2,
          {
            ...ot(m2, v2),
            height: e.itemHeight,
            index: a.index,
            width: e.itemWidth
          },
          S2
        ) : /* @__PURE__ */ reactExports.createElement(
          c,
          {
            ...ot(c, v2),
            className: o,
            "data-index": a.index,
            key: S2
          },
          r2(a.index, a.data, v2)
        );
      })
    }
  );
}), $r = React.memo(function() {
  const e = et("HeaderComponent"), n2 = wt("headerHeight"), o = et("headerFooterTag"), r2 = Ot(
    React.useMemo(
      () => (i) => {
        n2(Ht(i, "height"));
      },
      [n2]
    ),
    true,
    false
  ), s = et("context");
  return e != null ? /* @__PURE__ */ jsxRuntimeExports.jsx(o, { ref: r2, children: /* @__PURE__ */ jsxRuntimeExports.jsx(e, { ...ot(e, s) }) }) : null;
}), Ur = React.memo(function() {
  const e = et("FooterComponent"), n2 = wt("footerHeight"), o = et("headerFooterTag"), r2 = Ot(
    React.useMemo(
      () => (i) => {
        n2(Ht(i, "height"));
      },
      [n2]
    ),
    true,
    false
  ), s = et("context");
  return e != null ? /* @__PURE__ */ jsxRuntimeExports.jsx(o, { ref: r2, children: /* @__PURE__ */ jsxRuntimeExports.jsx(e, { ...ot(e, s) }) }) : null;
}), Kr = ({ children: t2 }) => {
  const e = React.useContext(io), n2 = wt("itemDimensions"), o = wt("viewportDimensions"), r2 = Ot(
    React.useMemo(
      () => (s) => {
        o(s.getBoundingClientRect());
      },
      [o]
    ),
    true,
    false
  );
  return React.useEffect(() => {
    e && (o({ height: e.viewportHeight, width: e.viewportWidth }), n2({ height: e.itemHeight, width: e.itemWidth }));
  }, [e, o, n2]), /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: r2, style: He(false), children: t2 });
}, jr = ({ children: t2 }) => {
  const e = React.useContext(io), n2 = wt("windowViewportRect"), o = wt("itemDimensions"), r2 = et("customScrollParent"), s = et("useWindowScroll"), i = $e(n2, r2, false);
  return React.useEffect(() => {
    e && (o({ height: e.itemHeight, width: e.itemWidth }), n2({ listHeight: 0, offsetTop: 0, visibleHeight: e.viewportHeight, visibleWidth: e.viewportWidth }));
  }, [e, n2, o]), /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: i, style: tn(false, s), children: t2 });
}, qr = /* @__PURE__ */ React.memo(function({ ...e }) {
  const n2 = et("useWindowScroll"), o = et("customScrollParent"), r2 = o || n2 ? Xr : Zr, s = o || n2 ? jr : Kr, i = et("context");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(r2, { ...e, ...ot(r2, i), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(s, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx($r, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dr, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Ur, {})
  ] }) });
}), {
  useEmitter: ho,
  useEmitterValue: et,
  usePublisher: wt
} = /* @__PURE__ */ Xe(
  Nr,
  {
    optional: {
      context: "context",
      totalCount: "totalCount",
      overscan: "overscan",
      itemContent: "itemContent",
      components: "components",
      computeItemKey: "computeItemKey",
      data: "data",
      initialItemCount: "initialItemCount",
      scrollSeekConfiguration: "scrollSeekConfiguration",
      headerFooterTag: "headerFooterTag",
      listClassName: "listClassName",
      itemClassName: "itemClassName",
      useWindowScroll: "useWindowScroll",
      customScrollParent: "customScrollParent",
      scrollerRef: "scrollerRef",
      logLevel: "logLevel",
      restoreStateFrom: "restoreStateFrom",
      initialTopMostItemIndex: "initialTopMostItemIndex",
      increaseViewportBy: "increaseViewportBy"
    },
    methods: {
      scrollTo: "scrollTo",
      scrollBy: "scrollBy",
      scrollToIndex: "scrollToIndex"
    },
    events: {
      isScrolling: "isScrolling",
      endReached: "endReached",
      startReached: "startReached",
      rangeChanged: "rangeChanged",
      atBottomStateChange: "atBottomStateChange",
      atTopStateChange: "atTopStateChange",
      stateChanged: "stateChanged",
      readyStateChanged: "readyStateChanged"
    }
  },
  qr
), Zr = /* @__PURE__ */ en({ useEmitter: ho, useEmitterValue: et, usePublisher: wt }), Xr = /* @__PURE__ */ nn({ useEmitter: ho, useEmitterValue: et, usePublisher: wt });
function Vn(t2, e, n2) {
  return e !== "normal" && e?.endsWith("px") !== true && n2(`${t2} was not resolved to pixel value correctly`, e, ft.WARN), e === "normal" ? 0 : parseInt(e ?? "0", 10);
}
const thumbnailCache = /* @__PURE__ */ new Map();
function useThumbnail(thumbnailPath) {
  const [dataUrl, setDataUrl] = reactExports.useState(
    thumbnailPath ? thumbnailCache.get(thumbnailPath) || null : null
  );
  const [loading, setLoading] = reactExports.useState(!dataUrl && !!thumbnailPath);
  const [error, setError] = reactExports.useState(false);
  const observerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!thumbnailPath) {
      setLoading(false);
      return;
    }
    if (thumbnailCache.has(thumbnailPath)) {
      setDataUrl(thumbnailCache.get(thumbnailPath));
      setLoading(false);
      return;
    }
    let isMounted = true;
    let observer;
    const loadThumbnail = async () => {
      try {
        const base64 = await window.api.getThumbnail(thumbnailPath);
        if (isMounted) {
          thumbnailCache.set(thumbnailPath, base64);
          setDataUrl(base64);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          console.error("Failed to load thumbnail:", err);
          setError(true);
          setLoading(false);
        }
      }
    };
    if (observerRef.current) {
      observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadThumbnail();
          observer.disconnect();
        }
      }, { rootMargin: "200px" });
      observer.observe(observerRef.current);
    } else {
      loadThumbnail();
    }
    return () => {
      isMounted = false;
      if (observer) observer.disconnect();
    };
  }, [thumbnailPath]);
  return { dataUrl, loading, error, observerRef };
}
function ImagePreview({ image, isBest }) {
  const selectedFiles = useAppStore((s) => s.selectedFiles);
  const toggleFileSelection = useAppStore((s) => s.toggleFileSelection);
  const isSelected = selectedFiles.has(image.filePath);
  const { observerRef, dataUrl, loading, error } = useThumbnail(image.thumbnailPath);
  const handleDoubleClick = reactExports.useCallback(
    (e) => {
      e.stopPropagation();
      window.api?.openFile(image.filePath);
    },
    [image.filePath]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "group relative flex-shrink-0 w-32 md:w-40 select-none animate-fade-in",
      onClick: () => toggleFileSelection(image.filePath),
      onDoubleClick: handleDoubleClick,
      onKeyDown: (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleFileSelection(image.filePath);
        }
        if (e.key === "o" || e.key === "O") {
          window.api?.openFile(image.filePath);
        }
      },
      role: "button",
      tabIndex: 0,
      "aria-pressed": isSelected,
      title: image.filePath,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            ref: observerRef,
            className: cn(
              "relative aspect-square overflow-hidden bg-bg-tertiary rounded-xl border transition-all duration-200",
              isSelected ? "border-accent-cyan/50 shadow-glow-cyan bg-accent-cyan/5" : "border-border-subtle hover:border-border-strong bg-white/[0.02]"
            ),
            children: [
              loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full skeleton" }) : error || !dataUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center bg-bg-tertiary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileImage, { className: "w-8 h-8 text-text-muted" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: dataUrl,
                  alt: image.fileName || "Image preview",
                  className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105",
                  loading: "lazy",
                  decoding: "async"
                }
              ),
              isBest && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-1.5 left-1.5 badge bg-accent-amber/90 text-white text-[10px] font-bold", "aria-hidden": true, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-3 h-3" }),
                "BEST"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: cn(
                    "absolute top-1.5 right-1.5 icon-btn",
                    isSelected ? "gradient-accent" : "bg-black/40 border border-white/20 opacity-0 group-hover:opacity-100"
                  ),
                  "aria-hidden": !isSelected,
                  children: isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3 h-3 text-white" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: (e) => {
                    e.stopPropagation();
                    window.api?.openFile(image.filePath);
                  },
                  "aria-label": `Open ${image.fileName}`,
                  className: "absolute bottom-1.5 right-1.5 icon-btn opacity-0 group-hover:opacity-100",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3 h-3 text-white" })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 px-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-text-primary font-medium truncate", title: image.fileName, children: image.fileName }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1 text-[10px] text-text-tertiary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-text-muted", children: formatBytes(image.size) }),
            image.width > 0 && image.height > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-text-muted", children: [
              image.width,
              "×",
              image.height
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-text-muted uppercase mt-0.5 block", children: image.format })
        ] })
      ]
    }
  );
}
function DuplicateCard({ group, index }) {
  const [isExpanded, setIsExpanded] = reactExports.useState(true);
  const selectedFiles = useAppStore((s) => s.selectedFiles);
  const selectFiles = useAppStore((s) => s.selectFiles);
  const deselectFiles = useAppStore((s) => s.deselectFiles);
  const selectedInGroup = group.images.filter(
    (img) => selectedFiles.has(img.filePath)
  ).length;
  const handleSelectAll = () => {
    const nonBest = group.images.filter((img) => !img.isOriginal).map((img) => img.filePath);
    selectFiles(nonBest);
  };
  const handleDeselectAll = () => {
    deselectFiles(group.images.map((img) => img.filePath));
  };
  const isExact = group.type === "exact";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "card-glass overflow-hidden transition-all duration-300 hover:border-border-strong animate-scale-in",
      style: { animationDelay: `${Math.min(index * 0.05, 0.3)}s` },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            role: "button",
            tabIndex: 0,
            "aria-expanded": isExpanded,
            onKeyDown: (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setIsExpanded(!isExpanded);
              }
            },
            className: "flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-white/[0.02] transition-colors",
            onClick: () => setIsExpanded(!isExpanded),
            children: [
              isExpanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-text-muted shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-text-muted shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: cn(
                    "badge shrink-0 text-xs",
                    isExact ? "bg-accent-green/15 text-accent-green border border-accent-green/20" : "bg-accent-amber/15 text-accent-amber border border-accent-amber/20"
                  ),
                  children: isExact ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3 h-3" }),
                    "Exact"
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-3 h-3" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-medium text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-amber-500" }),
                      Math.round(group.similarity),
                      "% Match"
                    ] })
                  ] })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-text-secondary", children: [
                Math.round(group.similarity),
                "% match"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-text-muted", children: [
                "· ",
                group.images.length,
                " images"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-accent-cyan ml-auto", children: [
                formatBytes(group.spaceSavings),
                " saveable"
              ] }),
              selectedInGroup > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-accent-purple font-medium", children: [
                selectedInGroup,
                " selected"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", onClick: (e) => e.stopPropagation(), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: handleSelectAll,
                    "aria-label": `Select duplicates in group ${index + 1}`,
                    className: "btn btn-sm btn-ghost",
                    children: "Select"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: handleDeselectAll,
                    "aria-label": `Clear selection in group ${index + 1}`,
                    className: "btn btn-sm btn-ghost",
                    children: "Clear"
                  }
                )
              ] })
            ]
          }
        ),
        isExpanded && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-4 pt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 overflow-x-auto pb-2 scrollbar-thin", children: group.images.map((image, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          ImagePreview,
          {
            image,
            isBest: idx === 0
          },
          image.filePath
        )) }) })
      ]
    }
  );
}
const FilterBar = () => {
  const {
    searchQuery,
    setSearchQuery,
    filterType,
    setFilterType,
    sortBy,
    setSortBy
  } = useAppStore();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4 p-4 card-glass", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[200px] max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary w-4 h-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          value: searchQuery,
          onChange: (e) => setSearchQuery(e.target.value),
          placeholder: "Search filenames...",
          className: "w-full bg-transparent border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all placeholder:text-text-secondary"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-3 py-2 btn btn-ghost text-sm text-text-secondary cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Filter, { className: "w-4 h-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Type: ",
            filterType === "all" ? "All" : filterType === "exact" ? "Exact Match" : "Similar"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-text-secondary" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-full right-0 mt-1 w-40 card-glass rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `px-4 py-2 text-sm cursor-pointer hover:bg-white/5 ${filterType === "all" ? "text-accent-cyan" : "text-text-secondary"}`, onClick: () => setFilterType("all"), children: "All Duplicates" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `px-4 py-2 text-sm cursor-pointer hover:bg-white/5 ${filterType === "exact" ? "text-accent-cyan" : "text-text-secondary"}`, onClick: () => setFilterType("exact"), children: "Exact Match" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `px-4 py-2 text-sm cursor-pointer hover:bg-white/5 ${filterType === "similar" ? "text-accent-cyan" : "text-text-secondary"}`, onClick: () => setFilterType("similar"), children: "Similar Only" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-3 py-2 btn btn-ghost text-sm text-text-secondary cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpNarrowWide, { className: "w-4 h-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Sort: ",
            sortBy === "similarity" ? "Similarity" : sortBy === "size" ? "Size" : "Date"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-text-secondary" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-full right-0 mt-1 w-40 card-glass rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `px-4 py-2 text-sm cursor-pointer hover:bg-white/5 ${sortBy === "similarity" ? "text-accent-cyan" : "text-text-secondary"}`, onClick: () => setSortBy("similarity"), children: "By Similarity" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `px-4 py-2 text-sm cursor-pointer hover:bg-white/5 ${sortBy === "size" ? "text-accent-cyan" : "text-text-secondary"}`, onClick: () => setSortBy("size"), children: "By Space Saved" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `px-4 py-2 text-sm cursor-pointer hover:bg-white/5 ${sortBy === "date" ? "text-accent-cyan" : "text-text-secondary"}`, onClick: () => setSortBy("date"), children: "By Date" })
        ] })
      ] })
    ] })
  ] });
};
const ScanStats = () => {
  const { stats } = useAppStore();
  const statCards = [
    {
      title: "Total Scanned",
      value: stats.totalImages.toLocaleString(),
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-5 h-5 text-blue-400" }),
      bg: "from-blue-500/20 to-blue-600/5",
      border: "border-blue-500/20"
    },
    {
      title: "Duplicate Groups",
      value: stats.duplicateGroups.toLocaleString(),
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-5 h-5 text-purple-400" }),
      bg: "from-purple-500/20 to-purple-600/5",
      border: "border-purple-500/20"
    },
    {
      title: "Wasted Space",
      value: formatBytes(stats.duplicateSize),
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(HardDrive, { className: "w-5 h-5 text-pink-400" }),
      bg: "from-pink-500/20 to-pink-600/5",
      border: "border-pink-500/20"
    },
    {
      title: "Exact Matches",
      value: stats.exactDuplicates.toLocaleString(),
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-5 h-5 text-cyan-400" }),
      bg: "from-cyan-500/20 to-cyan-600/5",
      border: "border-cyan-500/20"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6", children: statCards.map((card, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `card-glass flex items-center gap-4 rounded-xl p-4 animate-fade-in ${card.border}`,
      style: { animationDelay: `${i * 100}ms`, backgroundImage: `linear-gradient(135deg, ${card.bg})` },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-black/30 flex items-center justify-center backdrop-blur-md border border-white/5", children: card.icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-text-secondary", children: card.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-semibold text-text-primary", children: card.value })
        ] })
      ]
    },
    i
  )) });
};
function DuplicateGroups() {
  const results = useAppStore((s) => s.results);
  const stats = useAppStore((s) => s.stats);
  const selectAllDuplicates = useAppStore((s) => s.selectAllDuplicates);
  const getFilteredResults = useAppStore((s) => s.getFilteredResults);
  const setView = useAppStore((s) => s.setView);
  const setSearchQuery = useAppStore((s) => s.setSearchQuery);
  const setFilterType = useAppStore((s) => s.setFilterType);
  const setFormatFilter = useAppStore((s) => s.setFormatFilter);
  const filteredResults = getFilteredResults();
  const handleExportCSV = reactExports.useCallback(async () => {
    try {
      await window.api.exportCSV(results);
    } catch (err) {
      console.error("Export failed:", err);
    }
  }, [results]);
  if (results.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center h-full px-8 animate-fade-in", role: "region", "aria-label": "No results", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileImage, { className: "w-10 h-10 text-text-muted" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-text-primary mb-2", children: "No duplicates yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-text-secondary text-center max-w-sm mb-4", children: "Run a scan to locate duplicate photos. Select folders from the Scan tab to get started." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setView("scan"),
            className: "px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-medium",
            "aria-label": "Go to Scan tab",
            children: "Select Folders"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setView("settings"),
            className: "px-4 py-2 rounded-lg bg-white/5 text-text-secondary border border-border-subtle",
            "aria-label": "Open settings",
            children: "Settings"
          }
        )
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 px-6 pt-5 pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScanStats, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "shrink-0 px-6 pb-3 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-text-secondary", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-text-primary font-semibold", children: filteredResults.length }),
        " ",
        "group",
        filteredResults.length !== 1 ? "s" : "",
        " found",
        stats.duplicateSize > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          " · ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent-cyan font-semibold", children: formatBytes(stats.duplicateSize) }),
          " ",
          "can be freed"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: selectAllDuplicates,
            "aria-label": "Auto-select duplicates",
            className: "btn btn-sm btn-ghost flex items-center gap-1.5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3.5 h-3.5" }),
              "Auto-select duplicates"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleExportCSV,
            "aria-label": "Export results to CSV",
            className: "btn btn-sm btn-ghost",
            children: "Export CSV"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 px-6 pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FilterBar, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 px-6 pb-4", children: filteredResults.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center h-full", role: "status", "aria-live": "polite", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-text-muted mb-3", children: "No groups match your current filters." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => {
              setSearchQuery("");
              setFilterType("all");
              setFormatFilter([]);
            },
            className: "btn btn-sm btn-ghost",
            "aria-label": "Clear filters",
            children: "Clear Filters"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setView("scan"),
            className: "btn btn-sm",
            "aria-label": "Go to scan tab",
            children: "Select Folders"
          }
        )
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      ns,
      {
        data: filteredResults,
        overscan: 200,
        itemContent: (index, group) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DuplicateCard, { group, index }) }, group.id),
        style: { height: "100%" }
      }
    ) })
  ] });
}
function CompareView() {
  const comparePaths = useAppStore((s) => s.comparePaths);
  const setComparePaths = useAppStore((s) => s.setComparePaths);
  const [path1, setPath1] = reactExports.useState(comparePaths?.[0] ?? "");
  const [path2, setPath2] = reactExports.useState(comparePaths?.[1] ?? "");
  const [thumb1, setThumb1] = reactExports.useState(null);
  const [thumb2, setThumb2] = reactExports.useState(null);
  const [result, setResult] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  const handleSelectImage = reactExports.useCallback(
    async (slot) => {
      try {
        const files = await window.api.selectFiles();
        if (files.length > 0) {
          const filePath = files[0];
          const thumb = await window.api.getThumbnail(filePath);
          if (slot === 1) {
            setPath1(filePath);
            setThumb1(thumb);
          } else {
            setPath2(filePath);
            setThumb2(thumb);
          }
          setResult(null);
        }
      } catch (err) {
        console.error("Failed to select image:", err);
      }
    },
    []
  );
  const handleCompare = reactExports.useCallback(async () => {
    if (!path1 || !path2) return;
    setLoading(true);
    try {
      setComparePaths([path1, path2]);
      const res = await window.api.compareImages(path1, path2);
      setResult(res);
    } catch (err) {
      console.error("Comparison failed:", err);
    } finally {
      setLoading(false);
    }
  }, [path1, path2, setComparePaths]);
  const handleReset = reactExports.useCallback(() => {
    setPath1("");
    setPath2("");
    setThumb1(null);
    setThumb2(null);
    setResult(null);
    setComparePaths(null);
  }, [setComparePaths]);
  const resultConfig = result ? {
    exact: {
      icon: CircleCheckBig,
      color: "text-accent-green",
      bg: "bg-accent-green/10 border-accent-green/20",
      label: "Exact Match",
      desc: "These images are pixel-for-pixel identical."
    },
    visual: {
      icon: TriangleAlert,
      color: "text-accent-amber",
      bg: "bg-accent-amber/10 border-accent-amber/20",
      label: `Visually Similar (${Math.round(result.similarity * 100)}%)`,
      desc: "These images look very similar but have minor differences."
    },
    different: {
      icon: CircleX,
      color: "text-accent-red",
      bg: "bg-accent-red/10 border-accent-red/20",
      label: "Different Images",
      desc: "These images are not duplicates."
    }
  }[result.type] : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full px-6 py-6 animate-fade-in overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-5 h-5 text-accent-purple" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-text-primary", children: "Compare Two Images" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-text-secondary mt-0.5", children: "Select two images to compare pixel-by-pixel" })
      ] }),
      (path1 || path2) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: handleReset,
          className: "ml-auto flex items-center gap-1.5 text-xs text-text-muted hover:text-text-secondary transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-3.5 h-3.5" }),
            "Reset"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-6 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        DropSlot,
        {
          label: "Image 1",
          thumb: thumb1,
          path: path1,
          onSelect: () => handleSelectImage(1)
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        DropSlot,
        {
          label: "Image 2",
          thumb: thumb2,
          path: path2,
          onSelect: () => handleSelectImage(2)
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: handleCompare,
        disabled: !path1 || !path2 || loading,
        "aria-label": "Compare selected images",
        className: `btn ${path1 && path2 && !loading ? "btn-primary" : "btn-ghost"}`,
        children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
          "Comparing..."
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" }),
          "Compare"
        ] })
      }
    ) }),
    result && resultConfig && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-slide-up", role: "status", "aria-live": "polite", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: cn(
            "flex items-center gap-3 p-4 rounded-xl border mb-6",
            resultConfig.bg
          ),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(resultConfig.icon, { className: cn("w-6 h-6", resultConfig.color) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn("text-sm font-semibold", resultConfig.color), children: resultConfig.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-text-secondary mt-0.5", children: resultConfig.desc })
            ] })
          ]
        }
      ),
      result.diffImageBase64 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-glass rounded-xl p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-medium text-text-primary mb-3", children: "Difference Overlay" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg overflow-hidden bg-bg-tertiary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: result.diffImageBase64,
            alt: "Difference overlay showing pixel differences between images",
            className: "w-full max-h-80 object-contain"
          }
        ) })
      ] })
    ] })
  ] });
}
function DropSlot({ label, thumb, path, onSelect }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "dropzone card-glass rounded-xl overflow-hidden cursor-pointer group p-2",
      onClick: onSelect,
      role: "button",
      tabIndex: 0,
      "aria-label": `Select ${label}`,
      onKeyDown: (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      },
      children: thumb ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: thumb,
            alt: label,
            className: "w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 to-transparent", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/80 truncate", title: path, children: path.split(/[/\\]/).pop() }) })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center aspect-square", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-8 h-8 text-text-muted mb-2 group-hover:text-accent-cyan transition-colors" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-text-muted group-hover:text-text-secondary transition-colors", children: [
          label,
          " — Click to select"
        ] })
      ] })
    }
  );
}
const SettingsPanel = () => {
  const { similarityThreshold, setSimilarityThreshold } = useAppStore();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto p-6 animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold gradient-text mb-2", children: "Settings" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-text-secondary", children: "Configure how the AI detects and handles duplicates" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-glass p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-lg font-semibold text-text-primary mb-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-5 h-5 text-accent-cyan" }),
          "Detection Logic"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-text-primary", children: "Similarity Sensitivity" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-accent-cyan px-2 py-0.5 rounded", children: similarityThreshold })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-text-secondary mb-4", children: "0 = Exact Matches Only. 20 = Very Loose Matches. Default is 5." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "range",
                min: "0",
                max: "20",
                step: "1",
                value: similarityThreshold,
                onChange: (e) => setSimilarityThreshold(parseInt(e.target.value, 10)),
                className: "w-full h-2 bg-white/5 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 border-t border-white/10 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-text-primary", children: "Auto-Select Lower Quality" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-text-secondary mt-1", children: "Automatically check the lower resolution / smaller file size duplicates for deletion." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "relative inline-flex items-center cursor-pointer", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", defaultChecked: true, className: "sr-only peer" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-6 bg-white/5 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-cyan" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-glass p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-lg font-semibold text-text-primary mb-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(HardDrive, { className: "w-5 h-5 text-accent-purple" }),
          "Storage & Cache"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-4 card-glass rounded-xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-5 h-5 text-text-secondary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-text-primary", children: "Thumbnail Cache" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-text-secondary mt-0.5", children: "Used to speed up image previews" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-sm btn-ghost", children: "Clear Cache" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-glass p-6 flex items-start gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-6 h-6 text-accent-blue flex-shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-semibold text-text-primary mb-1", children: "About Duplicate Photo Cleaner AI" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-text-secondary mb-2", children: "Version 1.0.0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-text-secondary", children: "Powered by Electron, React, and perceptual hashing algorithms to safely and accurately organize your photo library." })
        ] })
      ] })
    ] })
  ] });
};
function ActionBar() {
  const selectedFiles = useAppStore((s) => s.selectedFiles);
  const selectAllDuplicates = useAppStore((s) => s.selectAllDuplicates);
  const deselectAll = useAppStore((s) => s.deselectAll);
  const getSelectedSize = useAppStore((s) => s.getSelectedSize);
  const removeDeletedFiles = useAppStore((s) => s.removeDeletedFiles);
  const pushDeleteOp = useAppStore((s) => s.pushDeleteOp);
  const [showConfirm, setShowConfirm] = reactExports.useState(false);
  const [deleting, setDeleting] = reactExports.useState(false);
  const selectedCount = selectedFiles.size;
  const selectedSize = getSelectedSize();
  const handleDelete = reactExports.useCallback(async () => {
    if (selectedCount === 0) return;
    setDeleting(true);
    try {
      const paths = Array.from(selectedFiles);
      const result = await window.api.deleteFiles(paths);
      if (result.deletedCount > 0) {
        const errorPaths = new Set(result.errors.map((e) => e.path));
        const deletedPaths = paths.filter((p2) => !errorPaths.has(p2));
        pushDeleteOp({
          undoId: result.undoId,
          paths: deletedPaths,
          deletedCount: result.deletedCount,
          timestamp: Date.now()
        });
        removeDeletedFiles(deletedPaths);
      }
      if (result.errors.length > 0) {
        console.warn("Some files failed to delete:", result.errors);
      }
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setDeleting(false);
      setShowConfirm(false);
    }
  }, [selectedFiles, selectedCount, pushDeleteOp, removeDeletedFiles]);
  if (selectedCount === 0) return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {});
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        role: "region",
        "aria-label": "Selection actions",
        className: "card-glass shrink-0 px-6 py-3 flex items-center gap-4 animate-slide-up z-20 border-t",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full gradient-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-text-primary font-medium", children: [
              selectedCount,
              " file",
              selectedCount !== 1 ? "s" : "",
              " selected"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-text-secondary", children: [
              "(",
              formatBytes(selectedSize),
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: selectAllDuplicates,
              "aria-label": "Select all duplicate files",
              className: "btn btn-sm btn-ghost",
              children: "Select All Duplicates"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: deselectAll,
              "aria-label": "Deselect all files",
              className: "btn btn-sm btn-ghost",
              children: "Deselect All"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => setShowConfirm(true),
              "aria-label": "Delete selected files",
              className: "btn btn-primary flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }),
                "Delete Selected"
              ]
            }
          )
        ]
      }
    ),
    showConfirm && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in",
          onClick: () => setShowConfirm(false)
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative card card-glass rounded-2xl p-6 w-full max-w-md mx-4 animate-scale-in shadow-elevated", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-accent-red/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5 text-accent-red" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-semibold text-text-primary", children: "Confirm Deletion" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-text-secondary mt-0.5", children: "Files will be moved to the recycle bin" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-glass rounded-lg p-3 mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-text-secondary", children: "Files to delete" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-text-primary font-medium", children: selectedCount })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm mt-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-text-secondary", children: "Space freed" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent-cyan font-medium", children: formatBytes(selectedSize) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-h-32 overflow-y-auto mb-5 text-xs space-y-1", children: [
          Array.from(selectedFiles).slice(0, 5).map((p2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "text-text-muted truncate",
              title: p2,
              children: p2
            },
            p2
          )),
          selectedCount > 5 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-text-muted", children: [
            "... and ",
            selectedCount - 5,
            " more"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 justify-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => setShowConfirm(false),
              "aria-label": "Cancel deletion",
              className: "btn btn-ghost",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }),
                "Cancel"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: handleDelete,
              "aria-label": `Confirm delete ${selectedCount} files`,
              disabled: deleting,
              className: cn("btn btn-primary", deleting ? "opacity-60 cursor-not-allowed" : ""),
              children: deleting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                "Deleting..."
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4" }),
                "Delete ",
                selectedCount,
                " Files"
              ] })
            }
          )
        ] })
      ] })
    ] })
  ] });
}
const UndoToast = () => {
  const { undoStack, popDeleteOp } = useAppStore();
  const [visible, setVisible] = reactExports.useState(false);
  const [progress, setProgress] = reactExports.useState(100);
  const latestEntry = undoStack[undoStack.length - 1];
  reactExports.useEffect(() => {
    if (latestEntry) {
      setVisible(true);
      setProgress(100);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev <= 0) {
            clearInterval(interval);
            setVisible(false);
            return 0;
          }
          return prev - 100 / 100;
        });
      }, 100);
      return () => clearInterval(interval);
    } else {
      setVisible(false);
    }
  }, [latestEntry]);
  if (!visible || !latestEntry) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-24 left-1/2 -translate-x-1/2 z-50 animate-slide-up", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "toast", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-text-secondary", children: [
        "Moved ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-text-primary font-medium", children: latestEntry.deletedCount }),
        " files to recycle bin."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: async () => {
              setVisible(false);
              const op = popDeleteOp();
              if (op) {
                await window.api?.undoDelete(op.undoId);
              }
            },
            className: "btn btn-sm btn-ghost flex items-center gap-1.5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Undo, { className: "w-3.5 h-3.5" }),
              "Undo"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setVisible(false),
            className: "icon-btn",
            "aria-label": "Dismiss undo",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 bg-black/20 w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-full bg-accent-cyan transition-all duration-100 ease-linear",
        style: { width: `${progress}%` }
      }
    ) })
  ] }) });
};
function useScanner() {
  const setScanState = useAppStore((s) => s.setScanState);
  const setProgress = useAppStore((s) => s.setProgress);
  const setResults = useAppStore((s) => s.setResults);
  const setView = useAppStore((s) => s.setView);
  reactExports.useEffect(() => {
    let cleanupProgress;
    let cleanupResults;
    try {
      if (window && window.api && typeof window.api.onScanProgress === "function") {
        cleanupProgress = window.api.onScanProgress((progress) => {
          setProgress(progress);
          if (progress.phase === "cancelled") {
            setScanState("cancelled");
          } else if (progress.phase === "error") {
            setScanState("idle");
          }
        });
      }
      if (window && window.api && typeof window.api.onScanResults === "function") {
        cleanupResults = window.api.onScanResults((results) => {
          setResults(results);
          setScanState("complete");
          setView("results");
        });
      }
    } catch (err) {
      console.error("useScanner failed to register IPC listeners", err);
    }
    return () => {
      try {
        if (cleanupProgress) cleanupProgress();
        if (cleanupResults) cleanupResults();
      } catch (err) {
        console.error("useScanner cleanup failed", err);
      }
    };
  }, [setProgress, setResults, setScanState, setView]);
  const startScan = async (folders, threshold) => {
    if (folders.length === 0) return;
    setScanState("scanning");
    setProgress({ phase: "scanning", current: 0, total: 0, currentFile: "", message: "Starting..." });
    try {
      await window.api.startScan(folders, threshold);
    } catch (error) {
      console.error("Scan failed:", error);
      setScanState("idle");
    }
  };
  const cancelScan = async () => {
    try {
      await window.api.cancelScan();
      setScanState("cancelled");
    } catch (err) {
      console.error("Failed to cancel scan:", err);
    }
  };
  return { startScan, cancelScan };
}
function App() {
  useScanner();
  const view = useAppStore((s) => s.view);
  const scanState = useAppStore((s) => s.scanState);
  const renderView = () => {
    if (scanState === "scanning") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(ScanProgress, {});
    }
    switch (view) {
      case "scan":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(FolderSelector, {});
      case "results":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(DuplicateGroups, {});
      case "compare":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(CompareView, {});
      case "settings":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsPanel, {});
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(FolderSelector, {});
    }
  };
  const showActionBar = view === "results" && scanState === "complete";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-hidden", children: renderView() }),
      showActionBar && /* @__PURE__ */ jsxRuntimeExports.jsx(ActionBar, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(UndoToast, {})
  ] });
}
client.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) })
);
