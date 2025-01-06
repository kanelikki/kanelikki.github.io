'use strict';

let exportsNodeImg = (function(){
//Object.defineProperty(exports, '__esModule', { value: true });

let exports = {};

var rendering = Sigma.rendering;
var utils = Sigma.utils;
var events = Sigma.MouseCaptor;

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}

function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return _arrayLikeToArray(r);
}

function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}

function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}

function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}

function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}

function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}

function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}

function _getPrototypeOf(t) {
  return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, _getPrototypeOf(t);
}

function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch (t) {}
  return (_isNativeReflectConstruct = function () {
    return !!t;
  })();
}

function _assertThisInitialized(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}

function _possibleConstructorReturn(t, e) {
  if (e && ("object" == typeof e || "function" == typeof e)) return e;
  if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
  return _assertThisInitialized(t);
}

function _callSuper(t, o, e) {
  return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}

function _superPropBase(t, o) {
  for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t)););
  return t;
}

function _get() {
  return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) {
    var p = _superPropBase(e, t);
    if (p) {
      var n = Object.getOwnPropertyDescriptor(p, t);
      return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value;
    }
  }, _get.apply(null, arguments);
}

function _superPropGet(t, o, e, r) {
  var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e);
  return 2 & r && "function" == typeof p ? function (t) {
    return p.apply(e, t);
  } : p;
}

function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
    return t.__proto__ = e, t;
  }, _setPrototypeOf(t, e);
}

function _inherits(t, e) {
  if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && _setPrototypeOf(t, e);
}

function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}

function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (e.includes(n)) continue;
    t[n] = r[n];
  }
  return t;
}

function _objectWithoutProperties(e, t) {
  if (null == e) return {};
  var o,
    r,
    i = _objectWithoutPropertiesLoose(e, t);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e);
    for (r = 0; r < s.length; r++) o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}

function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}

function getFragmentShader(_ref) {
  var texturesCount = _ref.texturesCount;
  // language=GLSL
  var SHADER = /*glsl*/"\nprecision highp float;\n\nvarying vec4 v_color;\nvarying vec2 v_diffVector;\nvarying float v_radius;\nvarying vec4 v_texture;\nvarying float v_textureIndex;\n\nuniform sampler2D u_atlas[".concat(texturesCount, "];\nuniform float u_correctionRatio;\nuniform float u_cameraAngle;\nuniform float u_percentagePadding;\nuniform bool u_colorizeImages;\nuniform bool u_keepWithinCircle;\n\nconst vec4 transparent = vec4(0.0, 0.0, 0.0, 0.0);\n\nconst float radius = 0.5;\n\nvoid main(void) {\n  float border = 2.0 * u_correctionRatio;\n  float dist = length(v_diffVector);\n  vec4 color = gl_FragColor;\n\n  float c = cos(-u_cameraAngle);\n  float s = sin(-u_cameraAngle);\n  vec2 diffVector = mat2(c, s, -s, c) * (v_diffVector);\n\n  // No antialiasing for picking mode:\n  #ifdef PICKING_MODE\n  border = 0.0;\n  color = v_color;\n\n  #else\n  // First case: No image to display\n  if (v_texture.w <= 0.0) {\n    if (!u_colorizeImages) {\n      color = v_color;\n    }\n  }\n\n  // Second case: Image loaded into the texture\n  else {\n    float paddingRatio = 1.0 + 2.0 * u_percentagePadding;\n    float coef = u_keepWithinCircle ? 1.0 : ").concat(Math.SQRT2, ";\n    vec2 coordinateInTexture = diffVector * vec2(paddingRatio, -paddingRatio) / v_radius / 2.0 * coef + vec2(0.5, 0.5);\n    int index = int(v_textureIndex + 0.5); // +0.5 avoid rounding errors\n\n    bool noTextureFound = false;\n    vec4 texel;\n\n    ").concat(_toConsumableArray(new Array(texturesCount)).map(function (_, i) {
    return "if (index == ".concat(i, ") texel = texture2D(u_atlas[").concat(i, "], (v_texture.xy + coordinateInTexture * v_texture.zw), -1.0);");
  }).join("\n    else ") + "else {\n      texel = texture2D(u_atlas[0], (v_texture.xy + coordinateInTexture * v_texture.zw), -1.0);\n      noTextureFound = true;\n    }", "\n\n    if (noTextureFound) {\n      color = v_color;\n    } else {\n      // Colorize all visible image pixels:\n      if (u_colorizeImages) {\n        color = mix(gl_FragColor, v_color, texel.a);\n      }\n\n      // Colorize background pixels, keep image pixel colors:\n      else {\n        color = vec4(mix(v_color, texel, texel.a).rgb, max(texel.a, v_color.a));\n      }\n\n      // Erase pixels \"in the padding\":\n      if (abs(diffVector.x) > v_radius / paddingRatio || abs(diffVector.y) > v_radius / paddingRatio) {\n        color = u_colorizeImages ? gl_FragColor : v_color;\n      }\n    }\n  }\n  #endif\n\n  // Crop in a circle when u_keepWithinCircle is truthy:\n  if (u_keepWithinCircle) {\n    if (dist < v_radius - border) {\n      gl_FragColor = color;\n    } else if (dist < v_radius) {\n      gl_FragColor = mix(transparent, color, (v_radius - dist) / border);\n    }\n  }\n\n  // Crop in a square else:\n  else {\n    float squareHalfSize = v_radius * ").concat(Math.SQRT1_2 * Math.cos(Math.PI / 12), ";\n    if (abs(diffVector.x) > squareHalfSize || abs(diffVector.y) > squareHalfSize) {\n      gl_FragColor = transparent;\n    } else {\n      gl_FragColor = color;\n    }\n  }\n}\n");
  return SHADER;
}

// language=GLSL
var VERTEX_SHADER_SOURCE = /*glsl*/"\nattribute vec4 a_id;\nattribute vec4 a_color;\nattribute vec2 a_position;\nattribute float a_size;\nattribute float a_angle;\nattribute vec4 a_texture;\nattribute float a_textureIndex;\n\nuniform mat3 u_matrix;\nuniform float u_sizeRatio;\nuniform float u_correctionRatio;\n\nvarying vec4 v_color;\nvarying vec2 v_diffVector;\nvarying float v_radius;\nvarying vec4 v_texture;\nvarying float v_textureIndex;\n\nconst float bias = 255.0 / 254.0;\nconst float marginRatio = 1.05;\n\nvoid main() {\n  float size = a_size * u_correctionRatio / u_sizeRatio * 4.0;\n  vec2 diffVector = size * vec2(cos(a_angle), sin(a_angle));\n  vec2 position = a_position + diffVector * marginRatio;\n  gl_Position = vec4(\n    (u_matrix * vec3(position, 1)).xy,\n    0,\n    1\n  );\n\n  v_diffVector = diffVector;\n  v_radius = size / 2.0 / marginRatio;\n\n  #ifdef PICKING_MODE\n  // For picking mode, we use the ID as the color:\n  v_color = a_id;\n  #else\n  // For normal mode, we use the color:\n  v_color = a_color;\n\n  // Pass the texture coordinates:\n  v_textureIndex = a_textureIndex;\n  v_texture = a_texture;\n  #endif\n\n  v_color.a *= bias;\n}\n";
var VERTEX_SHADER_SOURCE$1 = VERTEX_SHADER_SOURCE;

function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return e;
  };
  var t,
    e = {},
    r = Object.prototype,
    n = r.hasOwnProperty,
    o = Object.defineProperty || function (t, e, r) {
      t[e] = r.value;
    },
    i = "function" == typeof Symbol ? Symbol : {},
    a = i.iterator || "@@iterator",
    c = i.asyncIterator || "@@asyncIterator",
    u = i.toStringTag || "@@toStringTag";
  function define(t, e, r) {
    return Object.defineProperty(t, e, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), t[e];
  }
  try {
    define({}, "");
  } catch (t) {
    define = function (t, e, r) {
      return t[e] = r;
    };
  }
  function wrap(t, e, r, n) {
    var i = e && e.prototype instanceof Generator ? e : Generator,
      a = Object.create(i.prototype),
      c = new Context(n || []);
    return o(a, "_invoke", {
      value: makeInvokeMethod(t, r, c)
    }), a;
  }
  function tryCatch(t, e, r) {
    try {
      return {
        type: "normal",
        arg: t.call(e, r)
      };
    } catch (t) {
      return {
        type: "throw",
        arg: t
      };
    }
  }
  e.wrap = wrap;
  var h = "suspendedStart",
    l = "suspendedYield",
    f = "executing",
    s = "completed",
    y = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var p = {};
  define(p, a, function () {
    return this;
  });
  var d = Object.getPrototypeOf,
    v = d && d(d(values([])));
  v && v !== r && n.call(v, a) && (p = v);
  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
  function defineIteratorMethods(t) {
    ["next", "throw", "return"].forEach(function (e) {
      define(t, e, function (t) {
        return this._invoke(e, t);
      });
    });
  }
  function AsyncIterator(t, e) {
    function invoke(r, o, i, a) {
      var c = tryCatch(t[r], t, o);
      if ("throw" !== c.type) {
        var u = c.arg,
          h = u.value;
        return h && "object" == typeof h && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
          invoke("next", t, i, a);
        }, function (t) {
          invoke("throw", t, i, a);
        }) : e.resolve(h).then(function (t) {
          u.value = t, i(u);
        }, function (t) {
          return invoke("throw", t, i, a);
        });
      }
      a(c.arg);
    }
    var r;
    o(this, "_invoke", {
      value: function (t, n) {
        function callInvokeWithMethodAndArg() {
          return new e(function (e, r) {
            invoke(t, n, e, r);
          });
        }
        return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(e, r, n) {
    var o = h;
    return function (i, a) {
      if (o === f) throw Error("Generator is already running");
      if (o === s) {
        if ("throw" === i) throw a;
        return {
          value: t,
          done: !0
        };
      }
      for (n.method = i, n.arg = a;;) {
        var c = n.delegate;
        if (c) {
          var u = maybeInvokeDelegate(c, n);
          if (u) {
            if (u === y) continue;
            return u;
          }
        }
        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
          if (o === h) throw o = s, n.arg;
          n.dispatchException(n.arg);
        } else "return" === n.method && n.abrupt("return", n.arg);
        o = f;
        var p = tryCatch(e, r, n);
        if ("normal" === p.type) {
          if (o = n.done ? s : l, p.arg === y) continue;
          return {
            value: p.arg,
            done: n.done
          };
        }
        "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
      }
    };
  }
  function maybeInvokeDelegate(e, r) {
    var n = r.method,
      o = e.iterator[n];
    if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
    var i = tryCatch(o, e.iterator, r.arg);
    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
    var a = i.arg;
    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
  }
  function pushTryEntry(t) {
    var e = {
      tryLoc: t[0]
    };
    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
  }
  function resetTryEntry(t) {
    var e = t.completion || {};
    e.type = "normal", delete e.arg, t.completion = e;
  }
  function Context(t) {
    this.tryEntries = [{
      tryLoc: "root"
    }], t.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(e) {
    if (e || "" === e) {
      var r = e[a];
      if (r) return r.call(e);
      if ("function" == typeof e.next) return e;
      if (!isNaN(e.length)) {
        var o = -1,
          i = function next() {
            for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
            return next.value = t, next.done = !0, next;
          };
        return i.next = i;
      }
    }
    throw new TypeError(typeof e + " is not iterable");
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), o(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
    var e = "function" == typeof t && t.constructor;
    return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
  }, e.mark = function (t) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
  }, e.awrap = function (t) {
    return {
      __await: t
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
    return this;
  }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
    void 0 === i && (i = Promise);
    var a = new AsyncIterator(wrap(t, r, n, o), i);
    return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
      return t.done ? t.value : a.next();
    });
  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
    return this;
  }), define(g, "toString", function () {
    return "[object Generator]";
  }), e.keys = function (t) {
    var e = Object(t),
      r = [];
    for (var n in e) r.push(n);
    return r.reverse(), function next() {
      for (; r.length;) {
        var t = r.pop();
        if (t in e) return next.value = t, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, e.values = values, Context.prototype = {
    constructor: Context,
    reset: function (e) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
    },
    stop: function () {
      this.done = !0;
      var t = this.tryEntries[0].completion;
      if ("throw" === t.type) throw t.arg;
      return this.rval;
    },
    dispatchException: function (e) {
      if (this.done) throw e;
      var r = this;
      function handle(n, o) {
        return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
      }
      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
        var i = this.tryEntries[o],
          a = i.completion;
        if ("root" === i.tryLoc) return handle("end");
        if (i.tryLoc <= this.prev) {
          var c = n.call(i, "catchLoc"),
            u = n.call(i, "finallyLoc");
          if (c && u) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          } else if (c) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
          } else {
            if (!u) throw Error("try statement without catch or finally");
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          }
        }
      }
    },
    abrupt: function (t, e) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var o = this.tryEntries[r];
        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
          var i = o;
          break;
        }
      }
      i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
      var a = i ? i.completion : {};
      return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
    },
    complete: function (t, e) {
      if ("throw" === t.type) throw t.arg;
      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
    },
    finish: function (t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
      }
    },
    catch: function (t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.tryLoc === t) {
          var n = r.completion;
          if ("throw" === n.type) {
            var o = n.arg;
            resetTryEntry(r);
          }
          return o;
        }
      }
      throw Error("illegal catch attempt");
    },
    delegateYield: function (e, r, n) {
      return this.delegate = {
        iterator: values(e),
        resultName: r,
        nextLoc: n
      }, "next" === this.method && (this.arg = t), y;
    }
  }, e;
}

function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c),
      u = i.value;
  } catch (n) {
    return void e(n);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
  return function () {
    var t = this,
      e = arguments;
    return new Promise(function (r, o) {
      var a = n.apply(t, e);
      function _next(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
      }
      function _throw(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
      }
      _next(void 0);
    });
  };
}

/**
 * Useful types:
 * *************
 */

var DEFAULT_TEXTURE_MANAGER_OPTIONS = {
  size: {
    mode: "max",
    value: 512
  },
  objectFit: "cover",
  correctCentering: false,
  maxTextureSize: 4096,
  debounceTimeout: 500,
  crossOrigin: "anonymous"
};

// This margin helps to avoid images collisions in the texture:
var MARGIN_IN_TEXTURE = 1;

/**
 * Helpers:
 * ********
 */
/**
 * This helper loads an image at a given URL, and returns an HTMLImageElement
 * with it displayed once it's properly loaded, within a promise.
 */
function loadRasterImage(imageSource) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    crossOrigin = _ref.crossOrigin;
  return new Promise(function (resolve, reject) {
    var image = new Image();
    image.addEventListener("load", function () {
      resolve(image);
    }, {
      once: true
    });
    image.addEventListener("error", function (e) {
      reject(e.error);
    }, {
      once: true
    });

    // Load image:
    if (crossOrigin) {
      image.setAttribute("crossOrigin", crossOrigin);
    }
    image.src = imageSource;
  });
}

/**
 * This helper loads an SVG image at a given URL, adjusts its size to a given
 * size, and returns an HTMLImageElement with it displayed once it's properly
 * loaded, within a promise.
 */
function loadSVGImage(_x) {
  return _loadSVGImage.apply(this, arguments);
}

/**
 * This helper loads an image using the proper function.
 */
function _loadSVGImage() {
  _loadSVGImage = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(imageSource) {
    var _ref2,
      size,
      crossOrigin,
      resp,
      svgString,
      svg,
      root,
      originalWidth,
      originalHeight,
      correctedSvgString,
      blob,
      url,
      res,
      _args2 = arguments;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _ref2 = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {}, size = _ref2.size, crossOrigin = _ref2.crossOrigin;
          if (!(crossOrigin === "use-credentials")) {
            _context2.next = 7;
            break;
          }
          _context2.next = 4;
          return fetch(imageSource, {
            credentials: "include"
          });
        case 4:
          resp = _context2.sent;
          _context2.next = 10;
          break;
        case 7:
          _context2.next = 9;
          return fetch(imageSource);
        case 9:
          resp = _context2.sent;
        case 10:
          _context2.next = 12;
          return resp.text();
        case 12:
          svgString = _context2.sent;
          svg = new DOMParser().parseFromString(svgString, "image/svg+xml");
          root = svg.documentElement;
          originalWidth = root.getAttribute("width");
          originalHeight = root.getAttribute("height");
          if (!(!originalWidth || !originalHeight)) {
            _context2.next = 19;
            break;
          }
          throw new Error("loadSVGImage: cannot use `size` if target SVG has no definite dimensions.");
        case 19:
          if (typeof size === "number") {
            root.setAttribute("width", "" + size);
            root.setAttribute("height", "" + size);
          }

          // NOTE: since Google Material last changes to their icon viewBox, this
          // code is no longer necessary (hopefully it does not break something else...)
          // root.setAttribute("viewBox", `0 0 ${originalWidth} ${originalHeight}`);
          correctedSvgString = new XMLSerializer().serializeToString(svg);
          blob = new Blob([correctedSvgString], {
            type: "image/svg+xml"
          });
          url = URL.createObjectURL(blob);
          res = loadRasterImage(url);
          res["finally"](function () {
            return URL.revokeObjectURL(url);
          });
          return _context2.abrupt("return", res);
        case 26:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _loadSVGImage.apply(this, arguments);
}
function loadImage(_x2) {
  return _loadImage.apply(this, arguments);
}

/**
 * This helper computes exact coordinates to draw an image onto a texture.
 */
function _loadImage() {
  _loadImage = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(imageSource) {
    var _imageSource$split$0$;
    var _ref3,
      size,
      crossOrigin,
      isSVG,
      image,
      _args3 = arguments;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _ref3 = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {}, size = 100, crossOrigin = _ref3.crossOrigin;
          isSVG = ((_imageSource$split$0$ = imageSource.split(/[#?]/)[0].split(".").pop()) === null || _imageSource$split$0$ === void 0 ? void 0 : _imageSource$split$0$.trim().toLowerCase()) === "svg";
          if (!(isSVG && size)) {
            _context3.next = 16;
            break;
          }
          _context3.prev = 3;
          _context3.next = 6;
          return loadSVGImage(imageSource, {
            size: size,
            crossOrigin: crossOrigin
          });
        case 6:
          image = _context3.sent;
          _context3.next = 14;
          break;
        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](3);
          _context3.next = 13;
          return loadRasterImage(imageSource, {
            crossOrigin: crossOrigin
          });
        case 13:
          image = _context3.sent;
        case 14:
          _context3.next = 19;
          break;
        case 16:
          _context3.next = 18;
          return loadRasterImage(imageSource, {
            crossOrigin: crossOrigin
          });
        case 18:
          image = _context3.sent;
        case 19:
          return _context3.abrupt("return", image);
        case 20:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[3, 9]]);
  }));
  return _loadImage.apply(this, arguments);
}
function refineImage(image, corrector, _ref4) {
  var objectFit = _ref4.objectFit,
    size = _ref4.size,
    correctCentering = _ref4.correctCentering;
  var sourceSize = objectFit === "contain" ? Math.max(image.width, image.height) : Math.min(image.width, image.height);
  var destinationSize = size.mode === "auto" ? sourceSize : size.mode === "force" ? size.value : Math.min(size.value, sourceSize);
  var sourceX = (image.width - sourceSize) / 2;
  var sourceY = (image.height - sourceSize) / 2;
  if (correctCentering) {
    var correction = corrector.getCorrectionOffset(image, sourceSize);
    sourceX = correction.x;
    sourceY = correction.y;
  }
  return {
    sourceX: sourceX,
    sourceY: sourceY,
    sourceSize: sourceSize,
    destinationSize: destinationSize
  };
}

/**
 * This helper takes an array of ready-to-draw images, and draws as much as possible in a single texture.
 * It then returns the atlas of the draw images, as well as the texture itself.
 */
function drawTexture(images, ctx, cursor) {
  var _ctx$canvas = ctx.canvas,
    width = _ctx$canvas.width,
    height = _ctx$canvas.height;

  // Refine images coordinates:
  var refinedImagesArray = [];
  var x = cursor.x,
    y = cursor.y,
    rowHeight = cursor.rowHeight,
    maxRowWidth = cursor.maxRowWidth;
  var atlas = {};
  for (var i = 0, l = images.length; i < l; i++) {
    var _images$i = images[i],
      key = _images$i.key,
      image = _images$i.image,
      sourceSize = _images$i.sourceSize,
      sourceX = _images$i.sourceX,
      sourceY = _images$i.sourceY,
      destinationSize = _images$i.destinationSize;
    var destinationSizeWithMargin = destinationSize + MARGIN_IN_TEXTURE;

    // If the image does not fit, just skip it:
    if (y + destinationSizeWithMargin > height || x + destinationSizeWithMargin > width && y + destinationSizeWithMargin + rowHeight > height) {
      continue;
    }
    if (x + destinationSizeWithMargin > width) {
      maxRowWidth = Math.max(maxRowWidth, x);
      x = 0;
      y += rowHeight;
      rowHeight = destinationSizeWithMargin;
    }
    refinedImagesArray.push({
      key: key,
      image: image,
      sourceX: sourceX,
      sourceY: sourceY,
      sourceSize: sourceSize,
      destinationX: x,
      destinationY: y,
      destinationSize: destinationSize
    });
    atlas[key] = {
      x: x,
      y: y,
      size: destinationSize
    };
    x += destinationSizeWithMargin;
    rowHeight = Math.max(rowHeight, destinationSizeWithMargin);
  }

  // Crop texture to final best dimensions:
  maxRowWidth = Math.max(maxRowWidth, x);
  var effectiveWidth = maxRowWidth;
  var effectiveHeight = y + rowHeight;

  // Fill texture:
  for (var _i = 0, _l = refinedImagesArray.length; _i < _l; _i++) {
    var _refinedImagesArray$_ = refinedImagesArray[_i],
      _image = _refinedImagesArray$_.image,
      _sourceSize = _refinedImagesArray$_.sourceSize,
      _sourceX = _refinedImagesArray$_.sourceX,
      _sourceY = _refinedImagesArray$_.sourceY,
      _destinationSize = _refinedImagesArray$_.destinationSize,
      destinationX = _refinedImagesArray$_.destinationX,
      destinationY = _refinedImagesArray$_.destinationY;
    ctx.drawImage(_image, _sourceX, _sourceY, _sourceSize, _sourceSize, destinationX, destinationY, _destinationSize, _destinationSize);
  }
  return {
    atlas: atlas,
    texture: ctx.getImageData(0, 0, effectiveWidth, effectiveHeight),
    cursor: {
      x: x,
      y: y,
      rowHeight: rowHeight,
      maxRowWidth: maxRowWidth
    }
  };
}

/**
 * This helper takes a collection of image states and a context, draw all the
 * images in the context, and returns an atlas to get where each image is drawn
 * on the texture.
 */
function drawTextures(_ref5, images, ctx) {
  var prevAtlas = _ref5.atlas,
    prevTextures = _ref5.textures,
    prevCursor = _ref5.cursor;
  var res = {
    atlas: _objectSpread2({}, prevAtlas),
    textures: _toConsumableArray(prevTextures.slice(0, -1)),
    cursor: _objectSpread2({}, prevCursor)
  };

  // Extract images that are ready to draw, but not drawn yet:
  var imagesToDraw = [];
  for (var key in images) {
    var _prevAtlas$key;
    // Skip images that are not ready yet:
    var imageState = images[key];
    if (imageState.status !== "ready") continue;

    // Skip all images that already exist in a texture:
    var textureIndex = (_prevAtlas$key = prevAtlas[key]) === null || _prevAtlas$key === void 0 ? void 0 : _prevAtlas$key.textureIndex;
    if (typeof textureIndex === "number") continue;

    // Keep all the rest:
    imagesToDraw.push(_objectSpread2({
      key: key
    }, imageState));
  }

  // Draw remaining images on new textures until there are none remaining:
  var _loop = function _loop() {
    var _drawTexture = drawTexture(imagesToDraw, ctx, res.cursor),
      atlas = _drawTexture.atlas,
      texture = _drawTexture.texture,
      cursor = _drawTexture.cursor;
    res.cursor = cursor;
    var remainingImages = [];
    imagesToDraw.forEach(function (image) {
      if (atlas[image.key]) {
        res.atlas[image.key] = _objectSpread2(_objectSpread2({}, atlas[image.key]), {}, {
          textureIndex: res.textures.length
        });
      } else {
        remainingImages.push(image);
      }
    });
    res.textures.push(texture);
    imagesToDraw = remainingImages;
    if (imagesToDraw.length) {
      res.cursor = {
        x: 0,
        y: 0,
        rowHeight: 0,
        maxRowWidth: 0
      };
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
  };
  while (imagesToDraw.length) {
    _loop();
  }
  return res;
}

/**
 * This class helps to "correct" the centering of an SVG pictogram by finding
 * the "true" visually correct center through the barycenter of the pictogram's
 * alpha layer in x and y dimension.
 */
var PictogramCenteringCorrector = /*#__PURE__*/function () {
  function PictogramCenteringCorrector() {
    _classCallCheck(this, PictogramCenteringCorrector);
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d", {
      willReadFrequently: true
    });
  }
  _createClass(PictogramCenteringCorrector, [{
    key: "getCorrectionOffset",
    value: function getCorrectionOffset(image, size) {
      this.canvas.width = size;
      this.canvas.height = size;
      this.context.clearRect(0, 0, size, size);
      this.context.drawImage(image, 0, 0, size, size);
      var data = this.context.getImageData(0, 0, size, size).data;
      var alpha = new Uint8ClampedArray(data.length / 4);
      for (var i = 0; i < data.length; i++) {
        alpha[i] = data[i * 4 + 3];
      }
      var sumX = 0;
      var sumY = 0;
      var total = 0;
      for (var y = 0; y < size; y++) {
        for (var x = 0; x < size; x++) {
          var a = alpha[y * size + x];
          total += a;
          sumX += a * x;
          sumY += a * y;
        }
      }
      var barycenterX = sumX / total;
      var barycenterY = sumY / total;
      return {
        x: barycenterX - size / 2,
        y: barycenterY - size / 2
      };
    }
  }]);
  return PictogramCenteringCorrector;
}();
var TextureManager = /*#__PURE__*/function (_EventEmitter) {
  _inherits(TextureManager, _EventEmitter);
  function TextureManager() {
    var _this;
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, TextureManager);
    _this = _callSuper(this, TextureManager);
    _defineProperty(_assertThisInitialized(_this), "canvas", document.createElement("canvas"));
    _defineProperty(_assertThisInitialized(_this), "ctx", _this.canvas.getContext("2d", {
      willReadFrequently: true
    }));
    _defineProperty(_assertThisInitialized(_this), "corrector", new PictogramCenteringCorrector());
    _defineProperty(_assertThisInitialized(_this), "imageStates", {});
    _defineProperty(_assertThisInitialized(_this), "textures", [_this.ctx.getImageData(0, 0, 1, 1)]);
    _defineProperty(_assertThisInitialized(_this), "lastTextureCursor", {
      x: 0,
      y: 0,
      rowHeight: 0,
      maxRowWidth: 0
    });
    _defineProperty(_assertThisInitialized(_this), "atlas", {});
    _this.options = _objectSpread2(_objectSpread2({}, DEFAULT_TEXTURE_MANAGER_OPTIONS), options);
    _this.canvas.width = _this.options.maxTextureSize;
    _this.canvas.height = _this.options.maxTextureSize;
    return _this;
  }
  _createClass(TextureManager, [{
    key: "scheduleGenerateTexture",
    value: function scheduleGenerateTexture() {
      var _this2 = this;
      if (typeof this.frameId === "number") return;
      if (typeof this.options.debounceTimeout === "number") {
        this.frameId = window.setTimeout(function () {
          _this2.generateTextures();
          _this2.frameId = undefined;
        }, this.options.debounceTimeout);
      } else {
        this.generateTextures();
      }
    }
  }, {
    key: "generateTextures",
    value: function generateTextures() {
      var _drawTextures = drawTextures({
          atlas: this.atlas,
          textures: this.textures,
          cursor: this.lastTextureCursor
        }, this.imageStates, this.ctx),
        atlas = _drawTextures.atlas,
        textures = _drawTextures.textures,
        cursor = _drawTextures.cursor;
      this.atlas = atlas;
      this.textures = textures;
      this.lastTextureCursor = cursor;
      this.emit(TextureManager.NEW_TEXTURE_EVENT, {
        atlas: atlas,
        textures: textures
      });
    }

    // PUBLIC API:
  }, {
    key: "registerImage",
    value: function () {
      var _registerImage = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(source) {
        var size, image;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (!this.imageStates[source]) {
                _context.next = 2;
                break;
              }
              return _context.abrupt("return");
            case 2:
              this.imageStates[source] = {
                status: "loading"
              };
              _context.prev = 3;
              size = this.options.size;
              _context.next = 7;
              return loadImage(source, {
                size: size.mode === "force" ? size.value : undefined,
                crossOrigin: this.options.crossOrigin || undefined
              });
            case 7:
              image = _context.sent;
              this.imageStates[source] = _objectSpread2({
                status: "ready",
                image: image
              }, refineImage(image, this.corrector, this.options));
              this.scheduleGenerateTexture();
              _context.next = 15;
              break;
            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](3);
              this.imageStates[source] = {
                status: "error"
              };
            case 15:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[3, 12]]);
      }));
      function registerImage(_x3) {
        return _registerImage.apply(this, arguments);
      }
      return registerImage;
    }()
  }, {
    key: "getAtlas",
    value: function getAtlas() {
      return this.atlas;
    }
  }, {
    key: "getTextures",
    value: function getTextures() {
      return this.textures;
    }
  }]);
  return TextureManager;
}(events.EventEmitter);
_defineProperty(TextureManager, "NEW_TEXTURE_EVENT", "newTexture");

var _excluded = ["drawHover", "drawLabel", "drawingMode", "keepWithinCircle", "padding", "colorAttribute", "imageAttribute"];
var _WebGLRenderingContex = WebGLRenderingContext,
  UNSIGNED_BYTE = _WebGLRenderingContex.UNSIGNED_BYTE,
  FLOAT = _WebGLRenderingContex.FLOAT;
var DEFAULT_CREATE_NODE_IMAGE_OPTIONS = _objectSpread2(_objectSpread2({}, DEFAULT_TEXTURE_MANAGER_OPTIONS), {}, {
  drawingMode: "background",
  keepWithinCircle: true,
  drawLabel: undefined,
  drawHover: undefined,
  padding: 0,
  colorAttribute: "color",
  imageAttribute: "image"
});
var UNIFORMS = ["u_sizeRatio", "u_correctionRatio", "u_cameraAngle", "u_percentagePadding", "u_matrix", "u_colorizeImages", "u_keepWithinCircle", "u_atlas"];

/**
 * To share the texture between the program instances of the graph and the
 * hovered nodes (to prevent some flickering, mostly), this program must be
 * "built" for each sigma instance:
 */
function createNodeImageProgram(options) {
  var _NodeImageProgram;
  // Compute effective MAX_TEXTURE_SIZE from the current WebGL context:
  var gl = document.createElement("canvas").getContext("webgl");
  var defaultMaxTextureSize = Math.min(gl.getParameter(gl.MAX_TEXTURE_SIZE), DEFAULT_TEXTURE_MANAGER_OPTIONS.maxTextureSize);
  gl.canvas.remove();
  var _maxTextureSize = _objectSpread2(_objectSpread2(_objectSpread2({}, DEFAULT_CREATE_NODE_IMAGE_OPTIONS), {
      maxTextureSize: defaultMaxTextureSize
    }), options || {}),
    drawHover = _maxTextureSize.drawHover,
    drawLabel = _maxTextureSize.drawLabel,
    drawingMode = _maxTextureSize.drawingMode,
    keepWithinCircle = _maxTextureSize.keepWithinCircle,
    padding = _maxTextureSize.padding,
    colorAttribute = _maxTextureSize.colorAttribute,
    imageAttribute = _maxTextureSize.imageAttribute,
    textureManagerOptions = _objectWithoutProperties(_maxTextureSize, _excluded);

  /**
   * This texture manager is shared between all instances of this exact class,
   * returned by this call to createNodeProgramImage. This means that
   * remounting the sigma instance will not reload the images and regenerate
   * the texture.
   */
  var textureManager = new TextureManager(textureManagerOptions);
  return _NodeImageProgram = /*#__PURE__*/function (_NodeProgram) {
    _inherits(NodeImageProgram, _NodeProgram);
    function NodeImageProgram(gl, pickingBuffer, renderer) {
      var _this;
      _classCallCheck(this, NodeImageProgram);
      _this = _callSuper(this, NodeImageProgram, [gl, pickingBuffer, renderer]);
      _defineProperty(_assertThisInitialized(_this), "drawLabel", drawLabel);
      _defineProperty(_assertThisInitialized(_this), "drawHover", drawHover);
      _defineProperty(_assertThisInitialized(_this), "textureManagerCallback", null);
      _this.textureManagerCallback = function (_ref) {
        var atlas = _ref.atlas,
          textures = _ref.textures;
        var shouldUpgradeShaders = textures.length !== _this.textures.length;
        _this.atlas = atlas;
        _this.textureImages = textures;
        if (shouldUpgradeShaders) _this.upgradeShaders();
        _this.bindTextures();
        if (_this.latestRenderParams) _this.render(_this.latestRenderParams);
        if (_this.renderer && _this.renderer.refresh) _this.renderer.refresh();
      };
      textureManager.on(TextureManager.NEW_TEXTURE_EVENT, _this.textureManagerCallback);
      _this.atlas = textureManager.getAtlas();
      _this.textureImages = textureManager.getTextures();
      _this.textures = _this.textureImages.map(function () {
        return gl.createTexture();
      });
      _this.bindTextures();
      return _this;
    }
    _createClass(NodeImageProgram, [{
      key: "getDefinition",
      value: function getDefinition() {
        return {
          VERTICES: 3,
          VERTEX_SHADER_SOURCE: VERTEX_SHADER_SOURCE$1,
          FRAGMENT_SHADER_SOURCE: getFragmentShader({
            texturesCount: textureManager.getTextures().length
          }),
          METHOD: WebGLRenderingContext.TRIANGLES,
          UNIFORMS: UNIFORMS,
          ATTRIBUTES: [{
            name: "a_position",
            size: 2,
            type: FLOAT
          }, {
            name: "a_size",
            size: 1,
            type: FLOAT
          }, {
            name: "a_color",
            size: 4,
            type: UNSIGNED_BYTE,
            normalized: true
          }, {
            name: "a_id",
            size: 4,
            type: UNSIGNED_BYTE,
            normalized: true
          }, {
            name: "a_texture",
            size: 4,
            type: FLOAT
          }, {
            name: "a_textureIndex",
            size: 1,
            type: FLOAT
          }],
          CONSTANT_ATTRIBUTES: [{
            name: "a_angle",
            size: 1,
            type: FLOAT
          }],
          CONSTANT_DATA: [[NodeImageProgram.ANGLE_1], [NodeImageProgram.ANGLE_2], [NodeImageProgram.ANGLE_3]]
        };
      }
    }, {
      key: "upgradeShaders",
      value: function upgradeShaders() {
        var def = this.getDefinition();
        var _this$normalProgram = this.normalProgram,
          program = _this$normalProgram.program,
          buffer = _this$normalProgram.buffer,
          vertexShader = _this$normalProgram.vertexShader,
          fragmentShader = _this$normalProgram.fragmentShader,
          gl = _this$normalProgram.gl;
        gl.deleteProgram(program);
        gl.deleteBuffer(buffer);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
        this.normalProgram = this.getProgramInfo("normal", gl, def.VERTEX_SHADER_SOURCE, def.FRAGMENT_SHADER_SOURCE, null);
      }
    }, {
      key: "kill",
      value: function kill() {
        var _this$normalProgram2;
        var gl = (_this$normalProgram2 = this.normalProgram) === null || _this$normalProgram2 === void 0 ? void 0 : _this$normalProgram2.gl;
        if (gl) {
          for (var i = 0; i < this.textures.length; i++) {
            gl.deleteTexture(this.textures[i]);
          }
        }
        if (this.textureManagerCallback) {
          textureManager.off(TextureManager.NEW_TEXTURE_EVENT, this.textureManagerCallback);
          this.textureManagerCallback = null;
        }
        _superPropGet(NodeImageProgram, "kill", this, 3)([]);
      }
    }, {
      key: "bindTextures",
      value: function bindTextures() {
        var gl = this.normalProgram.gl;
        for (var i = 0; i < this.textureImages.length; i++) {
          if (i >= this.textures.length) {
            var texture = gl.createTexture();
            if (texture) this.textures.push(texture);
          }
          gl.activeTexture(gl.TEXTURE0 + i);
          gl.bindTexture(gl.TEXTURE_2D, this.textures[i]);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.textureImages[i]);
          gl.generateMipmap(gl.TEXTURE_2D);
        }
      }
    }, {
      key: "renderProgram",
      value: function renderProgram(params, programInfo) {
        if (!programInfo.isPicking) {
          // Rebind texture (since it's been just unbound by picking):
          var _gl = programInfo.gl;
          for (var i = 0; i < this.textureImages.length; i++) {
            _gl.activeTexture(_gl.TEXTURE0 + i);
            _gl.bindTexture(_gl.TEXTURE_2D, this.textures[i]);
          }
        }
        _superPropGet(NodeImageProgram, "renderProgram", this, 3)([params, programInfo]);
      }
    }, {
      key: "processVisibleItem",
      value: function processVisibleItem(nodeIndex, startIndex, data) {
        var array = this.array;
        var color = utils.floatColor(data[colorAttribute]);
        var imageSource = data[imageAttribute];
        var imagePosition = imageSource ? this.atlas[imageSource] : undefined;
        if (typeof imageSource === "string" && !imagePosition) textureManager.registerImage(imageSource);
        array[startIndex++] = data.x;
        array[startIndex++] = data.y;
        array[startIndex++] = data.size;
        array[startIndex++] = color;
        array[startIndex++] = nodeIndex;

        // Reference texture:
        if (imagePosition && typeof imagePosition.textureIndex === "number") {
          var _this$textureImages$i = this.textureImages[imagePosition.textureIndex],
          width = _this$textureImages$i.width,
          height = _this$textureImages$i.height;
          array[startIndex++] = imagePosition.x / width;
          array[startIndex++] = imagePosition.y / height;
          array[startIndex++] = imagePosition.size / width;
          array[startIndex++] = imagePosition.size / height;
          array[startIndex++] = imagePosition.textureIndex;
        } else {
          array[startIndex++] = 0;
          array[startIndex++] = 0;
          array[startIndex++] = 0;
          array[startIndex++] = 0;
          array[startIndex++] = 0;
        }
      }
    }, {
      key: "setUniforms",
      value: function setUniforms(params, _ref2) {
        var gl = _ref2.gl,
          uniformLocations = _ref2.uniformLocations;
        var u_sizeRatio = uniformLocations.u_sizeRatio,
          u_correctionRatio = uniformLocations.u_correctionRatio,
          u_matrix = uniformLocations.u_matrix,
          u_atlas = uniformLocations.u_atlas,
          u_colorizeImages = uniformLocations.u_colorizeImages,
          u_keepWithinCircle = uniformLocations.u_keepWithinCircle,
          u_cameraAngle = uniformLocations.u_cameraAngle,
          u_percentagePadding = uniformLocations.u_percentagePadding;
        this.latestRenderParams = params;
        gl.uniform1f(u_correctionRatio, params.correctionRatio);
        gl.uniform1f(u_sizeRatio, keepWithinCircle ? params.sizeRatio : params.sizeRatio / Math.SQRT2);
        gl.uniform1f(u_cameraAngle, params.cameraAngle);
        gl.uniform1f(u_percentagePadding, padding);
        gl.uniformMatrix3fv(u_matrix, false, params.matrix);
        gl.uniform1iv(u_atlas, _toConsumableArray(new Array(this.textureImages.length)).map(function (_, i) {
          return i;
        }));
        gl.uniform1i(u_colorizeImages, drawingMode === "color" ? 1 : 0);
        gl.uniform1i(u_keepWithinCircle, keepWithinCircle ? 1 : 0);
      }
    }]);
    return NodeImageProgram;
  }(rendering.NodeProgram), _defineProperty(_NodeImageProgram, "ANGLE_1", 0), _defineProperty(_NodeImageProgram, "ANGLE_2", 2 * Math.PI / 3), _defineProperty(_NodeImageProgram, "ANGLE_3", 4 * Math.PI / 3), _defineProperty(_NodeImageProgram, "textureManager", textureManager), _NodeImageProgram;
}

var NodeImageProgram = createNodeImageProgram();
var NodePictogramProgram = createNodeImageProgram({
  keepWithinCircle: false,
  size: {
    mode: "force",
    value: 256
  },
  drawingMode: "color",
  correctCentering: true
});

exports.NodeImageProgram = NodeImageProgram;
exports.NodePictogramProgram = NodePictogramProgram;
exports.createNodeImageProgram = createNodeImageProgram;
return exports;
})();