'use strict';

//Object.defineProperty(exports, '__esModule', { value: true });
let exportsNodeBorder = (function(){
let exports= {};
var rendering = Sigma.rendering;
var utils = Sigma.utils;

function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}

function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}

function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
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

function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return _arrayLikeToArray(r);
}

function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
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

var DEFAULT_BORDER_SIZE_MODE = "relative";
var DEFAULT_CREATE_NODE_BORDER_OPTIONS = {
  drawLabel: undefined,
  drawHover: undefined,
  borders: [{
    size: {
      value: 0.1
    },
    color: {
      attribute: "borderColor"
    }
  }, {
    size: {
      fill: true
    },
    color: {
      attribute: "color"
    }
  }]
};
var DEFAULT_COLOR = "#000000";

function getFragmentShader(_ref) {
  var borders = _ref.borders;
  var fillCounts = rendering.numberToGLSLFloat(borders.filter(function (_ref2) {
    var size = _ref2.size;
    return "fill" in size;
  }).length);

  // language=GLSL
  var SHADER = /*glsl*/"\nprecision highp float;\n\nvarying vec2 v_diffVector;\nvarying float v_radius;\n\n#ifdef PICKING_MODE\nvarying vec4 v_color;\n#else\n// For normal mode, we use the border colors defined in the program:\n".concat(borders.flatMap(function (_ref3, i) {
    var size = _ref3.size;
    return "attribute" in size ? ["varying float v_borderSize_".concat(i + 1, ";")] : [];
  }).join("\n"), "\n").concat(borders.flatMap(function (_ref4, i) {
    var color = _ref4.color;
    return "attribute" in color ? ["varying vec4 v_borderColor_".concat(i + 1, ";")] : "value" in color ? ["uniform vec4 u_borderColor_".concat(i + 1, ";")] : [];
  }).join("\n"), "\n#endif\n\nuniform float u_correctionRatio;\n\nconst float bias = 255.0 / 254.0;\nconst vec4 transparent = vec4(0.0, 0.0, 0.0, 0.0);\n\nvoid main(void) {\n  float dist = length(v_diffVector);\n  float aaBorder = 2.0 * u_correctionRatio;\n  float v_borderSize_0 = v_radius;\n  vec4 v_borderColor_0 = transparent;\n\n  // No antialiasing for picking mode:\n  #ifdef PICKING_MODE\n  if (dist > v_radius)\n    gl_FragColor = transparent;\n  else {\n    gl_FragColor = v_color;\n    gl_FragColor.a *= bias;\n  }\n  #else\n  // Sizes:\n").concat(borders.flatMap(function (_ref5, i) {
    var size = _ref5.size;
    if ("fill" in size) return [];
    size = size;
    var value = "attribute" in size ? "v_borderSize_".concat(i + 1) : rendering.numberToGLSLFloat(size.value);
    var factor = (size.mode || DEFAULT_BORDER_SIZE_MODE) === "pixels" ? "u_correctionRatio" : "v_radius";
    return ["  float borderSize_".concat(i + 1, " = ").concat(factor, " * ").concat(value, ";")];
  }).join("\n"), "\n  // Now, let's split the remaining space between \"fill\" borders:\n  float fillBorderSize = (v_radius - (").concat(borders.flatMap(function (_ref6, i) {
    var size = _ref6.size;
    return !("fill" in size) ? ["borderSize_".concat(i + 1)] : [];
  }).join(" + "), ") ) / ").concat(fillCounts, ";\n").concat(borders.flatMap(function (_ref7, i) {
    var size = _ref7.size;
    return "fill" in size ? ["  float borderSize_".concat(i + 1, " = fillBorderSize;")] : [];
  }).join("\n"), "\n\n  // Finally, normalize all border sizes, to start from the full size and to end with the smallest:\n  float adjustedBorderSize_0 = v_radius;\n").concat(borders.map(function (_, i) {
    return "  float adjustedBorderSize_".concat(i + 1, " = adjustedBorderSize_").concat(i, " - borderSize_").concat(i + 1, ";");
  }).join("\n"), "\n\n  // Colors:\n  vec4 borderColor_0 = transparent;\n").concat(borders.map(function (_ref8, i) {
    var color = _ref8.color;
    var res = [];
    if ("attribute" in color) {
      res.push("  vec4 borderColor_".concat(i + 1, " = v_borderColor_").concat(i + 1, ";"));
    } else if ("transparent" in color) {
      res.push("  vec4 borderColor_".concat(i + 1, " = vec4(0.0, 0.0, 0.0, 0.0);"));
    } else {
      res.push("  vec4 borderColor_".concat(i + 1, " = u_borderColor_").concat(i + 1, ";"));
    }
    res.push("  borderColor_".concat(i + 1, ".a *= bias;"));
    res.push("  if (borderSize_".concat(i + 1, " <= 1.0 * u_correctionRatio) { borderColor_").concat(i + 1, " = borderColor_").concat(i, "; }"));
    return res.join("\n");
  }).join("\n"), "\n  if (dist > adjustedBorderSize_0) {\n    gl_FragColor = borderColor_0;\n  } else ").concat(borders.map(function (_, i) {
    return "if (dist > adjustedBorderSize_".concat(i, " - aaBorder) {\n    gl_FragColor = mix(borderColor_").concat(i + 1, ", borderColor_").concat(i, ", (dist - adjustedBorderSize_").concat(i, " + aaBorder) / aaBorder);\n  } else if (dist > adjustedBorderSize_").concat(i + 1, ") {\n    gl_FragColor = borderColor_").concat(i + 1, ";\n  } else ");
  }).join(""), " { /* Nothing to add here */ }\n  #endif\n}\n");
  return SHADER;
}

function getVertexShader(_ref) {
  var borders = _ref.borders;
  // language=GLSL
  var SHADER = /*glsl*/"\nattribute vec2 a_position;\nattribute float a_size;\nattribute float a_angle;\n\nuniform mat3 u_matrix;\nuniform float u_sizeRatio;\nuniform float u_correctionRatio;\n\nvarying vec2 v_diffVector;\nvarying float v_radius;\n\n#ifdef PICKING_MODE\nattribute vec4 a_id;\nvarying vec4 v_color;\n#else\n".concat(borders.flatMap(function (_ref2, i) {
    var size = _ref2.size;
    return "attribute" in size ? ["attribute float a_borderSize_".concat(i + 1, ";"), "varying float v_borderSize_".concat(i + 1, ";")] : [];
  }).join("\n"), "\n").concat(borders.flatMap(function (_ref3, i) {
    var color = _ref3.color;
    return "attribute" in color ? ["attribute vec4 a_borderColor_".concat(i + 1, ";"), "varying vec4 v_borderColor_".concat(i + 1, ";")] : [];
  }).join("\n"), "\n#endif\n\nconst float bias = 255.0 / 254.0;\nconst vec4 transparent = vec4(0.0, 0.0, 0.0, 0.0);\n\nvoid main() {\n  float size = a_size * u_correctionRatio / u_sizeRatio * 4.0;\n  vec2 diffVector = size * vec2(cos(a_angle), sin(a_angle));\n  vec2 position = a_position + diffVector;\n  gl_Position = vec4(\n    (u_matrix * vec3(position, 1)).xy,\n    0,\n    1\n  );\n\n  v_radius = size / 2.0;\n  v_diffVector = diffVector;\n\n  #ifdef PICKING_MODE\n  v_color = a_id;\n  #else\n").concat(borders.flatMap(function (_ref4, i) {
    var size = _ref4.size;
    return "attribute" in size ? ["  v_borderSize_".concat(i + 1, " = a_borderSize_").concat(i + 1, ";")] : [];
  }).join("\n"), "\n").concat(borders.flatMap(function (_ref5, i) {
    var color = _ref5.color;
    return "attribute" in color ? ["  v_borderColor_".concat(i + 1, " = a_borderColor_").concat(i + 1, ";")] : [];
  }).join("\n"), "\n  #endif\n}\n");
  return SHADER;
}

var _WebGLRenderingContex = WebGLRenderingContext,
  UNSIGNED_BYTE = _WebGLRenderingContex.UNSIGNED_BYTE,
  FLOAT = _WebGLRenderingContex.FLOAT;
function createNodeBorderProgram(inputOptions) {
  var _NodeBorderProgram;
  var options = _objectSpread2(_objectSpread2({}, DEFAULT_CREATE_NODE_BORDER_OPTIONS), inputOptions || {});
  var borders = options.borders,
    drawLabel = options.drawLabel,
    drawHover = options.drawHover;
  var UNIFORMS = ["u_sizeRatio", "u_correctionRatio", "u_matrix"].concat(_toConsumableArray(borders.flatMap(function (_ref, i) {
    var color = _ref.color;
    return "value" in color ? ["u_borderColor_".concat(i + 1)] : [];
  })));
  return _NodeBorderProgram = /*#__PURE__*/function (_NodeProgram) {
    _inherits(NodeBorderProgram, _NodeProgram);
    function NodeBorderProgram() {
      var _this;
      _classCallCheck(this, NodeBorderProgram);
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      _this = _callSuper(this, NodeBorderProgram, [].concat(args));
      _defineProperty(_assertThisInitialized(_this), "drawLabel", drawLabel);
      _defineProperty(_assertThisInitialized(_this), "drawHover", drawHover);
      return _this;
    }
    _createClass(NodeBorderProgram, [{
      key: "getDefinition",
      value: function getDefinition() {
        return {
          VERTICES: 3,
          VERTEX_SHADER_SOURCE: getVertexShader(options),
          FRAGMENT_SHADER_SOURCE: getFragmentShader(options),
          METHOD: WebGLRenderingContext.TRIANGLES,
          UNIFORMS: UNIFORMS,
          ATTRIBUTES: [{
            name: "a_position",
            size: 2,
            type: FLOAT
          }, {
            name: "a_id",
            size: 4,
            type: UNSIGNED_BYTE,
            normalized: true
          }, {
            name: "a_size",
            size: 1,
            type: FLOAT
          }].concat(_toConsumableArray(borders.flatMap(function (_ref2, i) {
            var color = _ref2.color;
            return "attribute" in color ? [{
              name: "a_borderColor_".concat(i + 1),
              size: 4,
              type: UNSIGNED_BYTE,
              normalized: true
            }] : [];
          })), _toConsumableArray(borders.flatMap(function (_ref3, i) {
            var size = _ref3.size;
            return "attribute" in size ? [{
              name: "a_borderSize_".concat(i + 1),
              size: 1,
              type: FLOAT
            }] : [];
          }))),
          CONSTANT_ATTRIBUTES: [{
            name: "a_angle",
            size: 1,
            type: FLOAT
          }],
          CONSTANT_DATA: [[NodeBorderProgram.ANGLE_1], [NodeBorderProgram.ANGLE_2], [NodeBorderProgram.ANGLE_3]]
        };
      }
    }, {
      key: "processVisibleItem",
      value: function processVisibleItem(nodeIndex, startIndex, data) {
        var array = this.array;
        array[startIndex++] = data.x;
        array[startIndex++] = data.y;
        array[startIndex++] = nodeIndex;
        array[startIndex++] = data.size;
        borders.forEach(function (_ref4) {
          var color = _ref4.color;
          if ("attribute" in color) array[startIndex++] = utils.floatColor(data[color.attribute] || color.defaultValue || DEFAULT_COLOR);
        });
        borders.forEach(function (_ref5) {
          var size = _ref5.size;
          if ("attribute" in size) array[startIndex++] = data[size.attribute] || size.defaultValue;
        });
      }
    }, {
      key: "setUniforms",
      value: function setUniforms(params, _ref6) {
        var gl = _ref6.gl,
          uniformLocations = _ref6.uniformLocations;
        var u_sizeRatio = uniformLocations.u_sizeRatio,
          u_correctionRatio = uniformLocations.u_correctionRatio,
          u_matrix = uniformLocations.u_matrix;
        gl.uniform1f(u_correctionRatio, params.correctionRatio);
        gl.uniform1f(u_sizeRatio, params.sizeRatio);
        gl.uniformMatrix3fv(u_matrix, false, params.matrix);
        borders.forEach(function (_ref7, i) {
          var color = _ref7.color;
          if ("value" in color) {
            var location = uniformLocations["u_borderColor_".concat(i + 1)];
            var _colorToArray = utils.colorToArray(color.value),
              _colorToArray2 = _slicedToArray(_colorToArray, 4),
              r = _colorToArray2[0],
              g = _colorToArray2[1],
              b = _colorToArray2[2],
              a = _colorToArray2[3];
            gl.uniform4f(location, r / 255, g / 255, b / 255, a / 255);
          }
        });
      }
    }]);
    return NodeBorderProgram;
  }(rendering.NodeProgram), _defineProperty(_NodeBorderProgram, "ANGLE_1", 0), _defineProperty(_NodeBorderProgram, "ANGLE_2", 2 * Math.PI / 3), _defineProperty(_NodeBorderProgram, "ANGLE_3", 4 * Math.PI / 3), _NodeBorderProgram;
}

var NodeBorderProgram = createNodeBorderProgram();

exports.NodeBorderProgram = NodeBorderProgram;
exports.createNodeBorderProgram = createNodeBorderProgram;
return exports;
})();