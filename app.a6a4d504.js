// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }
  return bundleURL;
}
function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }
  return '/';
}
function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"style.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UNITS = exports.TEXT = exports.SNAP_GRID = exports.OPERATIONS = exports.COLORS_CMD_PANEL = exports.COLORS = exports.CANVAS_DIMENSIONS = exports.APP_VERSION = exports.ANIMATION = void 0;
var APP_VERSION = exports.APP_VERSION = '0.7.0';
var CANVAS_DIMENSIONS = exports.CANVAS_DIMENSIONS = {
  WIDTH: 4000,
  HEIGHT: 3000
};

// key : value in pixel

var SNAP_GRID = exports.SNAP_GRID = {
  'XS': 2.4,
  // 5 / 3
  'S': 3.7,
  // 10 / 3
  'M': 8,
  // 20 / 3
  'L': 14,
  // 40 / 3
  'XL': 28 // 80 / 3
};

// proportion from different unit measures 
// pixels are the base...
var UNITS = exports.UNITS = {
  ONE: 1,
  // pixels
  TEN: 10,
  // cm
  HUNDRED: 100 // mt
};
var OPERATIONS = exports.OPERATIONS = {
  // VIEW
  PAN: "PAN",
  ZOOM: "ZOOM",
  SELECT: "SELECT",
  DELETE: "DELETE",
  // EDIT
  MOVE: 'MOVE',
  ROTATE: "ROTATE",
  COPY: 'COPY',
  RESIZE: "RESIZE",
  // SHAPES
  LINE: 'LINE',
  RECT: 'RECT',
  CIRCLE: 'CIRCLE',
  ARC: 'ARC',
  // STYLE
  FILL: 'FILL',
  // UTILS
  TEXT: 'TEXT',
  MEASURES: 'MEASURES'
};
var COLORS_CMD_PANEL = exports.COLORS_CMD_PANEL = [
// NAVY
'#001f3f',
// Blue
'#0074D9',
// AQUA
'#7FDBFF',
// TEAL
'#39CCCC',
// OLIVE
'#3D9970',
// GREEN
'#2ECC40',
// LIME
'#01FF70',
// YELLOW
'#FFDC00',
// ORANGE
'#FF851B',
// BROWN
'#8B4513',
// RED
'#FF4136',
// MAROON
'#85144b',
// FUCHSIA
'#F012BE',
// PURPLE
'#B10DC9',
// BLACK-
'#111111',
// GRAY
'#AAAAAA',
// SILVER
'#DDDDDD'];
var COLORS = exports.COLORS = {
  grey: {
    shapes_fill_temp: '#E8E9E9',
    shapes_fill_selected: 'rgb(200,0,100,0.25)',
    shapes_stroke: 'white',
    shapes_stroke_selected: 'salmon',
    LINES: 'grey',
    CURSOR: 'orange',
    CANVAS: "rgb(31,40,49)",
    LINES_BIG: "rgb(48,55,71)",
    LINES_SMALL: "rgb(36,45,56)"
  },
  blue: {
    shapes_fill_temp: '#E8E9E9',
    shapes_fill_selected: 'rgba(200,0,100,0.25)',
    shapes_stroke: '#D1D3D4',
    shapes_stroke_selected: 'salmon',
    LINES: 'white',
    CURSOR: '#ad7fa8',
    CANVAS: "#0f223e",
    LINES_BIG: "rgb(48,55,71)",
    LINES_SMALL: "rgb(36,45,56)"
  },
  white: {
    shapes_fill_temp: '#D1D3D4',
    shapes_fill_selected: 'rgba(231,76,60,0.25)',
    shapes_stroke: 'black',
    shapes_stroke_selected: 'salmon',
    LINES: 'black',
    CURSOR: '#2ecc71',
    CANVAS: "rgb(235,242,250)",
    LINES_BIG: "#D1D3D4",
    LINES_SMALL: "#E8E9E9"
  }
};
var TEXT = exports.TEXT = {
  OFFSET: 5,
  FONT: '13px Arial'
};
var ANIMATION = exports.ANIMATION = {
  TIME: 1,
  STEP: .05
};
},{}],"src/keyboards_events.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _constants = require("./constants");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// https://css-tricks.com/snippets/javascript/javascript-keycodes/
var KeyboardEvents = exports.default = /*#__PURE__*/function () {
  function KeyboardEvents(main) {
    var _this = this;
    _classCallCheck(this, KeyboardEvents);
    this.main = main;
    // DEFAULTS
    this.choosenCommand = _constants.OPERATIONS.SELECT;
    this.currentSnap = _constants.SNAP_GRID.M;
    this.hasSnap = true;
    this.startListenDocumentKeyup();
    document.body.addEventListener('CMD-PANEL', function (passed) {
      _this.choosenCommand = passed.detail;
    }, false);
  }
  return _createClass(KeyboardEvents, [{
    key: "startListenDocumentKeyup",
    value: function startListenDocumentKeyup() {
      var _this2 = this;
      document.onkeyup = function (e) {
        // track keyboard events only if the text input modal is not open
        if (!_this2.main.textModal.isOpen) {
          if (e.key == 'Escape' || e.key == 's') {
            _this2.choosenCommand = _constants.OPERATIONS.SELECT;
            _this2.main.shapes.forEach(function (e) {
              e.selected = false;
            });
            _this2.main.selected = null;
            /* 
            } else if (e.key == 'a') {
            this.choosenCommand = OPERATIONS.ARC;*/
          } else if (e.key == 'w') {
            _this2.choosenCommand = _constants.OPERATIONS.ROTATE;
          } else if (e.key == 'f') {
            _this2.choosenCommand = _constants.OPERATIONS.MEASURES;
          } else if (e.key == 'e') {
            _this2.choosenCommand = _constants.OPERATIONS.RESIZE;
          } else if (e.key == 'c') {
            _this2.choosenCommand = _constants.OPERATIONS.COPY;
          } else if (e.key == 'm') {
            _this2.choosenCommand = _constants.OPERATIONS.MOVE;
          } else if (e.key == 'd') {
            _this2.choosenCommand = _constants.OPERATIONS.DELETE;
          } else if (e.key == 'l') {
            _this2.choosenCommand = _constants.OPERATIONS.LINE;
          } else if (e.key == 'r') {
            _this2.choosenCommand = _constants.OPERATIONS.RECT;
          } else if (e.key == 'a') {
            _this2.choosenCommand = _constants.OPERATIONS.CIRCLE;
          } else if (e.key == 'p') {
            _this2.choosenCommand = _constants.OPERATIONS.PAN;
          } else if (e.key == 't') {
            _this2.choosenCommand = _constants.OPERATIONS.TEXT;
          } else if (e.key == 0) {
            _this2.hasSnap = false;
            _this2.sendCustomEvent('CMD-SNAP', '0');
          } else if (e.key == "1") {
            _this2.hasSnap = true;
            _this2.currentSnap = _constants.SNAP_GRID.XL;
            _this2.sendCustomEvent('CMD-SNAP', '1');
          } else if (e.key == "2") {
            _this2.hasSnap = true;
            _this2.currentSnap = _constants.SNAP_GRID.L;
            _this2.sendCustomEvent('CMD-SNAP', '2');
          } else if (e.key == "3") {
            _this2.hasSnap = true;
            _this2.currentSnap = _constants.SNAP_GRID.M;
            _this2.sendCustomEvent('CMD-SNAP', '3');
          } else if (e.key == "4") {
            _this2.hasSnap = true;
            _this2.currentSnap = _constants.SNAP_GRID.S;
            _this2.sendCustomEvent('CMD-SNAP', '4');
          } else if (e.key == "5") {
            _this2.hasSnap = true;
            _this2.currentSnap = _constants.SNAP_GRID.XS;
            _this2.sendCustomEvent('CMD-SNAP', '5');
          } else if (e.ctrlKey && e.key == 'z') {
            _this2.main.HM.undo();
          } else if (e.ctrlKey && e.key == 'y') {
            _this2.main.HM.redo();
          } else if (e.ctrlKey && e.key == 'x') {
            _this2.main.zoomLevel = 1;
          } else if (e.altKey && e.key == '+') {
            _this2.main.zoomLevel += 0.1;
          } else if (e.altKey && e.key == '-') {
            _this2.main.zoomLevel -= 0.1;
          } else if (e.key == 'x') {
            _this2.choosenCommand = _constants.OPERATIONS.ZOOM;
          }
        }
        _this2.sendCustomEvent('CMD-KEYS', _this2.choosenCommand);
      };
    }
  }, {
    key: "sendCustomEvent",
    value: function sendCustomEvent(key, payload) {
      var event = new CustomEvent(key, {
        bubbles: true,
        detail: payload
      });
      document.body.dispatchEvent(event);
    }
  }]);
}();
},{"./constants":"src/constants.js"}],"src/history_management.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var HistoryManagement = exports.default = /*#__PURE__*/function () {
  function HistoryManagement(main) {
    _classCallCheck(this, HistoryManagement);
    this.main = main;
    this.history = [[]];
    this.position = 0;
  }
  return _createClass(HistoryManagement, [{
    key: "value",
    get: function get() {
      return this.history[this.position];
    }
  }, {
    key: "selected",
    get: function get() {
      return this.history[this.position].find(function (e) {
        return e.selected;
      })[0];
    }
  }, {
    key: "set",
    value: function set(value) {
      if (this.position < this.history.length - 1) {
        this.history = this.history.slice(0, this.position + 1);
      }
      this.history.push(_toConsumableArray(value));
      this.position += 1;
    }
  }, {
    key: "undo",
    value: function undo() {
      if (this.position > 0) {
        this.position--;
        this.main.shapes = _toConsumableArray(this.value);
      } else {
        console.log('No more undo ...');
      }
    }
  }, {
    key: "redo",
    value: function redo() {
      if (this.position < this.history.length - 1) {
        this.position++;
        this.main.shapes = _toConsumableArray(this.value);
      } else {
        console.log('No more redo ...');
      }
    }
  }, {
    key: "clean",
    value: function clean() {
      this.history = [[]];
      this.position = 0;
    }

    // toString function to aid in illustrating
  }, {
    key: "toString",
    value: function toString() {
      console.log("Currnent Value: ", this.value);
      console.log("History: ", this.history);
      console.log("Position: ", this.position);
    }
  }]);
}();
},{}],"src/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.colorsTable = void 0;
exports.formatDate = formatDate;
exports.hexToRGB = hexToRGB;
exports.interpolate = interpolate;
exports.trackSelection = trackSelection;
var colorsTable = exports.colorsTable = {};
function trackSelection(shape) {
  var r = Math.round(Math.random() * 255);
  var g = Math.round(Math.random() * 255);
  var b = Math.round(Math.random() * 255);
  var key = "rgb(".concat(r, ",").concat(g, ",").concat(b, ")");
  shape.colorKey = key;
  if (!(key in colorsTable)) {
    colorsTable[key] = shape;
  }
  return shape;
}
function interpolate() {
  var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    x: 0,
    y: 0
  };
  var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    x: 0,
    y: 0
  };
  var frac = arguments.length > 2 ? arguments[2] : undefined;
  var nx = a.x + (b.x - a.x) * frac;
  var ny = a.y + (b.y - a.y) * frac;
  return {
    x: nx,
    y: ny
  };
}
function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [year, month, day].join('-');
}

// https://css-tricks.com/converting-color-spaces-in-javascript/
function hexToRGB(h) {
  var r = 0,
    g = 0,
    b = 0;

  // 3 digits
  if (h.length == 4) {
    r = "0x" + h[1] + h[1];
    g = "0x" + h[2] + h[2];
    b = "0x" + h[3] + h[3];

    // 6 digits
  } else if (h.length == 7) {
    r = "0x" + h[1] + h[2];
    g = "0x" + h[3] + h[4];
    b = "0x" + h[5] + h[6];
  }
  return "rgba(".concat(+r, ",").concat(+g, ",").concat(+b, ",.3)");
}
},{}],"src/components/commands-panel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _constants = require("../constants");
var _utils = require("../utils");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var CommandsPanel = exports.default = /*#__PURE__*/function () {
  function CommandsPanel(app) {
    var _this = this;
    _classCallCheck(this, CommandsPanel);
    this.main = app;
    this.x = this.x || 0;
    this.y = this.y || 0;
    this.newX = this.newX || 0;
    this.newY = this.newY || 0;
    this.panel = document.querySelector('#panel');
    this.header = document.querySelector('#panel-header');
    this.colors = document.querySelector('.colors');
    this.fillBtn = document.querySelector('.right');
    this.slider = document.querySelector('.slider');
    this.generateColors();
    this.choosenCommand = 'SELECT'; // default
    this.adjustSelection();
    this.adjustColorSelection(this.main.selectedColorInPanel);

    // EVENTS
    this.header.onmousedown = this.dragMouseDown.bind(this);
    this.panel.onclick = this.click.bind(this);

    // EVENTS from USER KEYBOARDS
    document.body.addEventListener('CMD-KEYS', function (passed) {
      console.log("Event from keyboard: ".concat(passed.detail));
      _this.choosenCommand = passed.detail;
      _this.adjustSelection();
    }, true);

    // EVENTS from USER KEYBOARDS for SNAP
    document.body.addEventListener('CMD-SNAP', function (passed) {
      console.log("Event from keyboard: ".concat(passed.detail));
      _this.slider.value = passed.detail;
    }, true);

    // EVENTS from USER SELECTION
    document.body.addEventListener('SELECT-ITEM', function (passed) {
      console.log("Selected element: ".concat(passed.detail));
      if (passed.detail || passed.detail == 0) {
        _this.main.selectedColorInPanel = _this.main.shapes[passed.detail].color;
        _this.adjustColorSelection(_this.main.selectedColorInPanel);
      }
    }, true);
    this.slider.addEventListener('input', function (e) {
      switch (e.target.value) {
        case '0':
          _this.main.keys.hasSnap = false;
          break;
        case '1':
          _this.main.keys.hasSnap = true;
          _this.main.keys.currentSnap = _constants.SNAP_GRID.XL;
          break;
        case '2':
          _this.main.keys.hasSnap = true;
          _this.main.keys.currentSnap = _constants.SNAP_GRID.L;
          break;
        case '3':
          _this.main.keys.hasSnap = true;
          _this.main.keys.currentSnap = _constants.SNAP_GRID.M;
          break;
        case '4':
          _this.main.keys.hasSnap = true;
          _this.main.keys.currentSnap = _constants.SNAP_GRID.S;
          break;
        case '5':
          _this.main.keys.hasSnap = true;
          _this.main.keys.currentSnap = _constants.SNAP_GRID.XS;
          break;
        default:
          _this.main.keys.hasSnap = true;
          _this.main.keys.currentSnap = _constants.SNAP_GRID.M;
          break;
      }
    }, false);
  }

  // http://clrs.cc/
  return _createClass(CommandsPanel, [{
    key: "generateColors",
    value: function generateColors() {
      var li = _constants.COLORS_CMD_PANEL;
      this.colors.innerHTML = '<ul>' + li.map(function (e) {
        return "<li class=\"color-dot\" data-color=\"".concat(e, "\" style=\"background-color:").concat(e, "\"></li>");
      }).join('') + '</ul>';
      this.colors.addEventListener('click', this.selectColor.bind(this));
    }
  }, {
    key: "selectColor",
    value: function selectColor(evt) {
      var c = evt.target.dataset.color;
      this.main.selectedColorInPanel = c;
      this.adjustColorSelection(c);
    }
  }, {
    key: "adjustColorSelection",
    value: function adjustColorSelection(c) {
      var items = this.colors.getElementsByTagName("li");
      for (var i = 0; i < items.length; ++i) {
        items[i].classList.remove('selected-color');
        if (items[i].dataset.color === c) {
          items[i].classList.add('selected-color');
        }
      }
      if (this.main.selected || this.main.selected == 0) {
        this.main.shapes[this.main.selected].color = this.main.selectedColorInPanel;
      }
    }
  }, {
    key: "adjustSelection",
    value: function adjustSelection() {
      var all = this.panel.querySelectorAll('.cmd');
      for (var i = 0; i < all.length; i++) {
        var element = all[i];
        if (element.dataset.cmd === this.choosenCommand) {
          element.classList.add('selected');
        } else {
          element.classList.remove('selected');
        }
      }
    }
  }, {
    key: "click",
    value: function click(e) {
      console.log("Event from commands panel: ".concat(e.target.dataset.cmd));
      this.choosenCommand = e.target.parentNode.dataset.cmd;
      if (this.choosenCommand) {
        if (this.choosenCommand === 'UNDO') {
          this.main.HM.undo();
          return;
        }
        if (this.choosenCommand === 'REDO') {
          this.main.HM.redo();
          return;
        }
        if (this.choosenCommand === 'FILL') {
          this.fillBtn.classList.toggle('hide');
          return;
        }
        if (this.choosenCommand === 'CONFIG') {
          this.switchUnitSystem();
          return;
        }
        if (this.choosenCommand === 'SAVE') {
          this.save();
          return;
        }
        if (this.choosenCommand === 'IMPORT') {
          this.import();
          return;
        }
        if (this.choosenCommand === 'HELP') {
          window.open("https://github.com/LorenzoCorbella74/my-web-cad");
          return;
        }
        if (this.choosenCommand === 'PALETTE') {
          this.switchTheme();
          return;
        }
        if (!e.target.classList.contains('disabled')) {
          var event = new CustomEvent('CMD-PANEL', {
            bubbles: true,
            detail: this.choosenCommand
          });
          this.panel.dispatchEvent(event);
          this.adjustSelection();
        }
      }
    }
  }, {
    key: "switchUnitSystem",
    value: function switchUnitSystem() {
      var _this2 = this;
      var options = Object.keys(_constants.UNITS);
      var index = options.findIndex(function (e) {
        return e === _this2.main.choosenUnitSystem;
      });
      if (index < options.length - 1) {
        index++;
      } else {
        index = 0;
      }
      this.main.choosenUnitSystem = options[index];
    }
  }, {
    key: "switchTheme",
    value: function switchTheme() {
      var _this3 = this;
      var options = ['grey', 'white', 'blue'];
      var index = options.findIndex(function (e) {
        return e === _this3.main.selectedTheme;
      });
      if (index < options.length - 1) {
        index++;
      } else {
        index = 0;
      }
      this.main.selectedTheme = options[index];
    }
  }, {
    key: "dragMouseDown",
    value: function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      this.newX = e.clientX;
      this.newY = e.clientY;
      this.panel.onmouseup = this.closeDragElement.bind(this);
      // call a function whenever the cursor moves:
      this.panel.onmousemove = this.elementDrag.bind(this);
    }
  }, {
    key: "elementDrag",
    value: function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      this.x = this.newX - e.clientX;
      this.y = this.newY - e.clientY;
      this.newX = e.clientX;
      this.newY = e.clientY;
      // set the element's new position:
      this.panel.style.top = this.panel.offsetTop - this.y + "px";
      this.panel.style.left = this.panel.offsetLeft - this.x + "px";
    }
  }, {
    key: "closeDragElement",
    value: function closeDragElement() {
      /* stop moving when mouse button is released:*/
      this.panel.onmouseup = null;
      this.panel.onmousemove = null;
    }
  }, {
    key: "import",
    value: function _import() {
      var _this4 = this;
      var input = document.getElementById('file-input');
      input.onchange = function (e) {
        // getting a hold of the file reference
        var file = e.target.files[0];
        // setting up the reader
        var reader = new FileReader();
        reader.readAsText(file, 'UTF-8');
        // here we tell the reader what to do when it's done reading...
        reader.onload = function (readerEvent) {
          var content = readerEvent.target.result; // this is the content!
          try {
            _this4.createDrawingFromImportedFile(JSON.parse(content));
          } catch (error) {
            console.log('Was not possible to import the file!');
          }
        };
      };
      input.click();
    }
  }, {
    key: "save",
    value: function save() {
      var output = {
        ver: _constants.APP_VERSION,
        date: (0, _utils.formatDate)(new Date()),
        shapes: this.main.HM.value,
        theme: this.main.selectedTheme
      };
      var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(output));
      var dlAnchorElem = document.getElementById('downloadAnchorElem');
      dlAnchorElem.setAttribute("href", dataStr);
      dlAnchorElem.setAttribute("download", "draw_".concat((0, _utils.formatDate)(new Date()), ".json")); // ``
      dlAnchorElem.click();
    }
  }, {
    key: "createDrawingFromImportedFile",
    value: function createDrawingFromImportedFile(data) {
      this.main.selectedTheme = data.theme;
      this.main.HM.clean();
      this.main.shapes = data.shapes;
      this.main.HM.set(this.main.shapes);
    }
  }]);
}();
},{"../constants":"src/constants.js","../utils":"src/utils.js"}],"src/components/input-dialogue.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var InputDialogue = exports.default = /*#__PURE__*/function () {
  function InputDialogue(app) {
    _classCallCheck(this, InputDialogue);
    this.main = app;
    // Get the modal
    this.modal = document.getElementById("myModal");
    this.content = this.modal.querySelector(".modal-content");
    this.input = this.modal.querySelector(".modal-content input");
    // Get the <span> element that closes the modal
    this.closeBtn = document.getElementsByClassName("close")[0];
    this.saveBtn = document.getElementsByClassName("save")[0];
    this.closeBtn.addEventListener('click', this.close.bind(this));
    this.saveBtn.addEventListener('click', this.save.bind(this));

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target == this.modal /* && this.isOpen */) {
        this.close(event);
      }
    };
  }
  return _createClass(InputDialogue, [{
    key: "close",
    value: function close(e) {
      this.modal.style.display = "none";
      this.isOpen = false;
    }
  }, {
    key: "save",
    value: function save(e) {
      this.close();
      this.callback && this.callback({
        x: this.x,
        y: this.y,
        val: this.input.value
      });
      this.input.value = '';
    }
  }, {
    key: "open",
    value: function open(x, y, value, callback) {
      this.isOpen = true;
      this.x = x;
      this.y = y;
      this.modal.style.display = "block";
      this.content.style.position = "absolute";
      this.content.style.left = x + 'px';
      this.content.style.top = y - 26 + 'px';
      this.input.value = value;
      this.input.focus();
      this.callback = callback;
    }
  }]);
}();
},{}],"src/renderFn.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderCanvas = renderCanvas;
exports.renderPointer = renderPointer;
exports.renderShapes = renderShapes;
var _constants = require("./constants");
var _utils = require("./utils");
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function renderPointer(scope) {
  scope.ctx.strokeStyle = _constants.COLORS[scope.selectedTheme].CURSOR; // green
  scope.ctx.strokeRect(scope.mouse.x - 5 - scope.netPanningX, scope.mouse.y - 5 - scope.netPanningY, 10, 10);
  scope.ctx.lineWidth = 0.5;
  scope.ctx.setLineDash([scope.keys.currentSnap, scope.keys.currentSnap]); // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash
  scope.ctx.beginPath();
  scope.ctx.moveTo(scope.mouse.x - scope.netPanningX, 0);
  scope.ctx.lineTo(scope.mouse.x - scope.netPanningX, scope.mouse.y - 5 - scope.netPanningY);
  scope.ctx.moveTo(scope.mouse.x - scope.netPanningX, scope.mouse.y + 5 - scope.netPanningY);
  scope.ctx.lineTo(scope.mouse.x - scope.netPanningX, _constants.CANVAS_DIMENSIONS.HEIGHT);
  scope.ctx.moveTo(0, scope.mouse.y - scope.netPanningY);
  scope.ctx.lineTo(scope.mouse.x - 5 - scope.netPanningX, scope.mouse.y - scope.netPanningY);
  scope.ctx.moveTo(scope.mouse.x + 5 - scope.netPanningX, scope.mouse.y - scope.netPanningY);
  scope.ctx.lineTo(_constants.CANVAS_DIMENSIONS.WIDTH, scope.mouse.y - scope.netPanningY);
  scope.ctx.stroke();
  scope.ctx.fillStyle = _constants.COLORS[scope.selectedTheme].LINES;
  scope.ctx.fillText("".concat(scope.keys.choosenCommand.toUpperCase()), scope.mouse.x + 12.5 - scope.netPanningX, scope.mouse.y - 4.5 - scope.netPanningY);
  scope.ctx.fillText("x: ".concat(scope.getValueAccordingToUnitSystem(scope.mouse.x - scope.netPanningX), " - y: ").concat(scope.getValueAccordingToUnitSystem(scope.mouse.y - scope.netPanningY)), scope.mouse.x + 12.5 - scope.netPanningX, scope.mouse.y + 12.5 - scope.netPanningY);
  scope.ctx.fillText("".concat(scope.info.key, " ").concat(scope.getValueAccordingToUnitSystem(scope.info.value1), " ").concat(scope.getValueAccordingToUnitSystem(scope.info.value2)), scope.mouse.x + 12.5 - scope.netPanningX, scope.mouse.y + 27.5 - scope.netPanningY);
  scope.ctx.closePath();
  scope.ctx.setLineDash([]);
}
function renderCanvas(scope) {
  scope.ctx.fillStyle = _constants.COLORS[scope.selectedTheme].CANVAS;
  scope.ctx.fillRect(0, 0, _constants.CANVAS_DIMENSIONS.WIDTH, _constants.CANVAS_DIMENSIONS.HEIGHT);
  // colonne
  for (var i = 0; i < _constants.CANVAS_DIMENSIONS.WIDTH; i += scope.keys.currentSnap) {
    if (scope.keys.hasSnap) {
      scope.ctx.beginPath();
      scope.ctx.moveTo(i + 0.5, 0);
      scope.ctx.lineTo(i + 0.5, _constants.CANVAS_DIMENSIONS.HEIGHT);
      if (i % 100 === 0) {
        scope.ctx.strokeStyle = _constants.COLORS[scope.selectedTheme].LINES_BIG;
      } else {
        scope.ctx.strokeStyle = _constants.COLORS[scope.selectedTheme].LINES_SMALL;
      }
      scope.ctx.lineWidth = 0.5;
      scope.ctx.closePath();
      scope.ctx.stroke();
    }
    if (i % 100 === 0) {
      scope.ctx.font = _constants.TEXT.FONT;
      scope.ctx.fillStyle = _constants.COLORS[scope.selectedTheme].LINES;
      // scope.ctx.textAlign = "center";
      scope.ctx.fillText(scope.getValueAccordingToUnitSystem(i).toString(), i + 2.5, 10 - (scope.netPanningY > 0 ? 0 : scope.netPanningY));
    }
  }
  // righe
  for (var _i = 0; _i < _constants.CANVAS_DIMENSIONS.HEIGHT; _i += scope.keys.currentSnap) {
    if (scope.keys.hasSnap) {
      scope.ctx.beginPath();
      scope.ctx.moveTo(0, _i + 0.5);
      scope.ctx.lineTo(_constants.CANVAS_DIMENSIONS.WIDTH, _i + 0.5);
      if (_i % 100 === 0) {
        scope.ctx.strokeStyle = _constants.COLORS[scope.selectedTheme].LINES_BIG;
      } else {
        scope.ctx.strokeStyle = _constants.COLORS[scope.selectedTheme].LINES_SMALL;
      }
      scope.ctx.lineWidth = 0.5;
      scope.ctx.closePath();
      scope.ctx.stroke();
    }
    if (_i % 100 === 0) {
      scope.ctx.font = _constants.TEXT.FONT;
      scope.ctx.fillStyle = _constants.COLORS[scope.selectedTheme].LINES;
      // scope.ctx.textAlign = "center";
      scope.ctx.fillText(scope.getValueAccordingToUnitSystem(_i).toString(), 2.5 - (scope.netPanningX > 0 ? 0 : scope.netPanningX), _i - 2.5);
    }
  }
}
function renderShapes(scope, ctx, hit) {
  [].concat(_toConsumableArray(scope.HM.value), _toConsumableArray(scope.tempShape)).forEach(function (item) {
    if (hit) {
      ctx.lineWidth = 10; // to select lines or sides of rect...
    } else {
      ctx.lineWidth = 0.5;
    }
    if (item.text || item.measure) {
      if (hit) {
        ctx.save();
        ctx.fillStyle = item.colorKey;
        ctx.beginPath();
        var textLength = ctx.measureText(item.text).width;
        // console.log(textLength, 9 * item.text.length) /* 9px for each char */
        ctx.rect(item.start_x - textLength / 2, item.start_y - 13, textLength, 20);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      } else {
        ctx.save();
        ctx.fillStyle = item.selected ? _constants.COLORS[scope.selectedTheme].shapes_fill_selected : hit ? item.colorKey : item.color;
        ctx.beginPath();
        ctx.font = item.font;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        if (item.text) {
          ctx.fillText(item.text, item.start_x, item.start_y);
        } else if (item.measure) {
          ctx.fillText(scope.getValueAccordingToUnitSystem(item.measure).toString(), item.start_x, item.start_y);
        }
        ctx.restore();
      }
    } else if (item.w && item.h) {
      ctx.save();
      ctx.fillStyle = item.selected ? _constants.COLORS[scope.selectedTheme].shapes_fill_selected : hit ? item.colorKey : (0, _utils.hexToRGB)(item.color);
      ctx.strokeStyle = item.selected ? _constants.COLORS[scope.selectedTheme].shapes_stroke_selected : hit ? item.colorKey : item.stroke;
      ctx.beginPath();
      ctx.translate(item.start_x + item.w / 2, item.start_y + item.h / 2);
      if (item.angle) {
        ctx.rotate(item.angle);
      }
      ctx.rect(-item.w / 2, -item.h / 2, item.w, item.h);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    } else if (item.radius) {
      ctx.save();
      ctx.strokeStyle = item.selected ? _constants.COLORS[scope.selectedTheme].shapes_stroke_selected : hit ? item.colorKey : item.stroke;
      ctx.fillStyle = item.selected ? _constants.COLORS[scope.selectedTheme].shapes_fill_selected : hit ? item.colorKey : (0, _utils.hexToRGB)(item.color);
      ctx.beginPath();
      // x, y, radius, startAngle, endAngle, antiClockwise = false by default
      ctx.arc(item.start_x, item.start_y, item.radius, 0, 2 * Math.PI, false); // full circle
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    } else {
      drawLine(scope, ctx, item, hit);
    }
  });
}
function drawLine(scope, ctx, item, hit) {
  var aWidth = 5,
    aLength = 8;
  ctx.setLineDash([0, 0]);
  var dx = item.end_x - item.start_x;
  var dy = item.end_y - item.start_y;
  var angle = Math.atan2(dy, dx);
  var length = Math.sqrt(dx * dx + dy * dy);
  ctx.strokeStyle = item.selected ? _constants.COLORS[scope.selectedTheme].shapes_stroke_selected : hit ? item.colorKey : item.stroke;
  ctx.translate(item.start_x, item.start_y);
  ctx.rotate(angle);
  ctx.beginPath();
  if (item.dashed) {
    ctx.setLineDash([3.5, 10]);
  }
  ctx.moveTo(0, 0);
  ctx.lineTo(length, 0);
  if (!hit && item.arrowStart) {
    ctx.moveTo(aLength, -aWidth);
    ctx.lineTo(0, 0);
    ctx.lineTo(aLength, aWidth);
  }
  if (!hit && item.arrowEnd) {
    ctx.moveTo(length - aLength, -aWidth);
    ctx.lineTo(length, 0);
    ctx.lineTo(length - aLength, aWidth);
  }
  ctx.stroke();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}
},{"./constants":"src/constants.js","./utils":"src/utils.js"}],"src/commands/command.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Command = exports.default = /*#__PURE__*/function () {
  function Command(main) {
    _classCallCheck(this, Command);
    // ref to main class istance
    this.main = main;
  }
  return _createClass(Command, [{
    key: "mousemove",
    value: function mousemove(e) {
      this.main.mouse.x = e._x;
      this.main.mouse.y = e._y;
      this.main.mouse.event = e;
    }
  }, {
    key: "mousedown",
    value: function mousedown(e) {
      // console.log('Command: mousedown', e, this)
    }
  }, {
    key: "mouseup",
    value: function mouseup(event) {
      // console.log('Command: mouseup', event, this)
    }
  }, {
    key: "mouseout",
    value: function mouseout(event) {
      this.mouseup(event);
    }
  }, {
    key: "click",
    value: function click(event) {
      // console.log('Command: click', event, this)
    }
  }]);
}();
},{}],"src/commands/pan.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _command = _interopRequireDefault(require("./command"));
var _constants = require("../constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var PanCommand = exports.default = /*#__PURE__*/function (_Command) {
  function PanCommand(state) {
    var _this;
    _classCallCheck(this, PanCommand);
    _this = _callSuper(this, PanCommand, [state]);

    // this.mouse drag related variables
    _this.isMouseDown = false;
    _this.startX, _this.startY;
    // the accumulated horizontal(X) & vertical(Y) panning the user has done in total
    _this.main.netPanningX = 0;
    _this.main.netPanningY = 0;
    return _this;
  }
  _inherits(PanCommand, _Command);
  return _createClass(PanCommand, [{
    key: "limitCamera",
    value: function limitCamera(panx, pany) {
      var a, b;
      if (panx < 0) {
        a = Math.max(-_constants.CANVAS_DIMENSIONS.WIDTH, panx);
      } else {
        a = 0;
      }
      if (pany < 0) {
        b = Math.max(-_constants.CANVAS_DIMENSIONS.HEIGHT, pany);
      } else {
        b = 0;
      }
      return {
        a: a,
        b: b
      };
    }
  }, {
    key: "mousemove",
    value: function mousemove(e) {
      var x = e._x;
      var y = e._y;

      // if the this.mouse is being dragged
      if (this.isMouseDown) {
        // dx & dy are the distance the this.mouse has moved since the last this.mousemove event
        var dx = x - this.startX;
        var dy = y - this.startY;

        // reset the vars for next this.mousemove
        this.startX = x;
        this.startY = y;

        // accumulate the net panning done
        this.main.netPanningX += dx;
        this.main.netPanningY += dy;
        var _this$limitCamera = this.limitCamera(this.main.netPanningX, this.main.netPanningY),
          a = _this$limitCamera.a,
          b = _this$limitCamera.b;
        this.main.netPanningX = a;
        this.main.netPanningY = b;
        // console.clear()
        // console.log(`Net change in panning: x:${this.main.netPanningX}px, y:${this.main.netPanningY}px`);
      }
      this.main.mouse.x = e._x;
      this.main.mouse.y = e._y;
      this.main.mouse.event = e;
    }
  }, {
    key: "mousedown",
    value: function mousedown(e) {
      // calc the starting this.mouse X,Y for the drag
      this.startX = e._x;
      this.startY = e._y;
      // set the isDragging flag
      this.isMouseDown = true;
    }
  }, {
    key: "mouseup",
    value: function mouseup(e) {
      // clear the isDragging flag
      this.isMouseDown = false;
    }
  }]);
}(_command.default);
},{"./command":"src/commands/command.js","../constants":"src/constants.js"}],"src/commands/zoom.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _command = _interopRequireDefault(require("./command"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var ZoomCommand = exports.default = /*#__PURE__*/function (_Command) {
  function ZoomCommand(state) {
    var _this;
    _classCallCheck(this, ZoomCommand);
    _this = _callSuper(this, ZoomCommand, [state]);
    _this.mouseDown = false;
    return _this;
  }
  _inherits(ZoomCommand, _Command);
  return _createClass(ZoomCommand, [{
    key: "mousemove",
    value: function mousemove(e) {
      // console.log('Zoom: mousemove', e, this)
      this.main.mouse.x = e._x;
      this.main.mouse.y = e._y;
      this.main.mouse.event = e;
      if (this.mouseDown) {
        if (!e.ctrlKey) {
          this.main.zoomLevel += .005;
        } else {
          this.main.zoomLevel -= .005;
        }
      }
    }
  }, {
    key: "mousedown",
    value: function mousedown(e) {
      // console.log('Zoom: mousedown', e, this)
      this.mouseDown = true;
    }
  }, {
    key: "mouseup",
    value: function mouseup(event) {
      // console.log('Zoom: mouseup', event, this)
      this.mouseDown = false;
    }
  }]);
}(_command.default);
},{"./command":"src/commands/command.js"}],"src/commands/select.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _command = _interopRequireDefault(require("./command"));
var _constants = require("../constants");
var _utils = require("../utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var SelectCommand = exports.default = /*#__PURE__*/function (_Command) {
  function SelectCommand(state) {
    _classCallCheck(this, SelectCommand);
    return _callSuper(this, SelectCommand, [state]);
  }
  _inherits(SelectCommand, _Command);
  return _createClass(SelectCommand, [{
    key: "click",
    value: function click(e) {
      var _this = this;
      // get pixel under cursor
      var pixel = this.main.gctx.getImageData(e._x * this.main.zoomLevel, e._y * this.main.zoomLevel, 1, 1).data;
      // create rgb color for that pixel
      var color = "rgb(".concat(pixel[0], ",").concat(pixel[1], ",").concat(pixel[2], ")");
      // find a shape with the same colour

      this.main.shapes.forEach(function (item, index) {
        if (item.colorKey === color) {
          item.selected = true;
          _this.main.selected = index;
          var event = new CustomEvent('SELECT-ITEM', {
            bubbles: true,
            detail: _this.main.selected
          });
          document.body.dispatchEvent(event);
        } else {
          item.selected = false;
        }
      });
      if (this.main.shapes.every(function (e) {
        return e.selected === false;
      })) {
        this.main.selected = null;
      }

      // if it's a text open the dialogue
      if (this.main.shapes[this.main.selected] && this.main.shapes[this.main.selected].text) {
        var theOne = this.main.shapes[this.main.selected];
        this.main.textModal.open(theOne.start_x - this.main.netPanningX, theOne.start_y - this.main.netPanningY, theOne.text, function (val) {
          return _this.updateText(val);
        });
      }
    }
  }, {
    key: "updateText",
    value: function updateText(info) {
      var val = info.val;
      this.main.shapes[this.main.selected].text = val;
      this.main.HM.set(this.main.shapes);
    }
  }]);
}(_command.default);
},{"./command":"src/commands/command.js","../constants":"src/constants.js","../utils":"src/utils.js"}],"src/commands/delete.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _command = _interopRequireDefault(require("./command"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var DeleteCommand = exports.default = /*#__PURE__*/function (_Command) {
  function DeleteCommand(state) {
    _classCallCheck(this, DeleteCommand);
    return _callSuper(this, DeleteCommand, [state]);
  }
  _inherits(DeleteCommand, _Command);
  return _createClass(DeleteCommand, [{
    key: "click",
    value: function click(e) {
      var pixel = this.main.gctx.getImageData(e._x * this.main.zoomLevel, e._y * this.main.zoomLevel, 1, 1).data;
      // create rgb color for that pixel
      var color = "rgb(".concat(pixel[0], ",").concat(pixel[1], ",").concat(pixel[2], ")");
      // remove the shape with the same colour
      var found = 0;
      for (var i = this.main.shapes.length - 1; i >= 0; i--) {
        if (this.main.shapes[i].colorKey === color) {
          this.main.shapes.splice(i, 1);
          found++;
        }
      }
      if (found) {
        this.main.HM.set(this.main.shapes);
      }
    }
  }]);
}(_command.default);
},{"./command":"src/commands/command.js"}],"src/commands/line.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _command = _interopRequireDefault(require("./command"));
var _constants = require("../constants");
var _utils = require("../utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var LineCommand = exports.default = /*#__PURE__*/function (_Command) {
  function LineCommand(state) {
    var _this;
    _classCallCheck(this, LineCommand);
    _this = _callSuper(this, LineCommand, [state]);
    _this.started = false;
    _this.start = {};
    return _this;
  }
  _inherits(LineCommand, _Command);
  return _createClass(LineCommand, [{
    key: "mousemove",
    value: function mousemove(event) {
      this.main.mouse.x = event._x;
      this.main.mouse.y = event._y;
      this.main.mouse.event = event;
      if (this.started) {
        this.main.tempShape = [{
          start_x: this.start.x,
          start_y: this.start.y,
          end_x: event._x - this.main.netPanningX,
          end_y: event._y - this.main.netPanningY,
          stroke: _constants.COLORS[this.main.selectedTheme].LINES
        }];
        var dx = this.start.x - (event._x - this.main.netPanningX);
        var dy = this.start.y - (event._y - this.main.netPanningY);
        this.main.info = {
          key: 'Dist: ',
          value1: Math.floor(Math.sqrt(dx * dx + dy * dy))
        };
      }
    }
  }, {
    key: "mousedown",
    value: function mousedown(event) {
      this.start.x = event._x - this.main.netPanningX;
      this.start.y = event._y - this.main.netPanningY;
      this.started = true;
    }
  }, {
    key: "mouseup",
    value: function mouseup(event) {
      if (this.started) {
        this.started = false;
        this.main.tempShape.length = 0;
        this.main.shapes.push((0, _utils.trackSelection)({
          start_x: this.start.x,
          start_y: this.start.y,
          end_x: this.start.x,
          end_y: this.start.y,
          final_end_x: event._x - this.main.netPanningX,
          final_end_y: event._y - this.main.netPanningY,
          animationCreate: true,
          counterCreate: 0,
          stroke: _constants.COLORS[this.main.selectedTheme].shapes_stroke
        }));
        this.main.HM.set(this.main.shapes);
        this.main.info = {
          key: '',
          value1: '',
          value2: ''
        };
      }
    }
  }]);
}(_command.default);
},{"./command":"src/commands/command.js","../constants":"src/constants.js","../utils":"src/utils.js"}],"src/commands/rect.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _command = _interopRequireDefault(require("./command"));
var _constants = require("../constants");
var _utils = require("../utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var RectCommand = exports.default = /*#__PURE__*/function (_Command) {
  function RectCommand(state) {
    var _this;
    _classCallCheck(this, RectCommand);
    _this = _callSuper(this, RectCommand, [state]);
    _this.started = false;
    _this.start = {};
    _this.x, _this.y;
    _this.width, _this.height;
    return _this;
  }
  _inherits(RectCommand, _Command);
  return _createClass(RectCommand, [{
    key: "mousemove",
    value: function mousemove(event) {
      this.main.mouse.x = event._x;
      this.main.mouse.y = event._y;
      this.main.mouse.event = event;
      if (this.started) {
        this.x = Math.min(event._x, this.start.x), this.y = Math.min(event._y, this.start.y), this.w = Math.abs(event._x - this.start.x), this.h = Math.abs(event._y - this.start.y);
        if (!this.w || !this.h) {
          return;
        }
        this.main.tempShape = [{
          start_x: this.x - this.main.netPanningX,
          start_y: this.y - this.main.netPanningY,
          w: this.w,
          h: this.h,
          color: _constants.COLORS[this.main.selectedTheme].shapes_fill_temp
        }];
        this.main.info = "W: ".concat(this.w, ", H: ").concat(this.h);
        this.main.info = {
          key: 'W x H: ',
          value1: this.w,
          value2: this.h
        };
      }
    }
  }, {
    key: "mousedown",
    value: function mousedown(event) {
      this.start.x = event._x;
      this.start.y = event._y;
      this.started = true;
    }
  }, {
    key: "mouseup",
    value: function mouseup(event) {
      if (this.started) {
        this.started = false;
        this.main.tempShape.length = 0;
        this.main.shapes.push((0, _utils.trackSelection)({
          start_x: this.x - this.main.netPanningX,
          start_y: this.y - this.main.netPanningY,
          final_w: this.w,
          final_h: this.h,
          w: 0,
          h: 0,
          angle: 0,
          animationCreate: true,
          counterCreate: 0,
          color: this.main.selectedColorInPanel,
          stroke: _constants.COLORS[this.main.selectedTheme].shapes_stroke
        }));
        this.main.HM.set(this.main.shapes);
        this.main.info = {
          key: '',
          value1: '',
          value2: ''
        };
      }
    }
  }]);
}(_command.default);
},{"./command":"src/commands/command.js","../constants":"src/constants.js","../utils":"src/utils.js"}],"src/commands/circle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _command = _interopRequireDefault(require("./command"));
var _constants = require("../constants");
var _utils = require("../utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var CircleCommand = exports.default = /*#__PURE__*/function (_Command) {
  function CircleCommand(state) {
    var _this;
    _classCallCheck(this, CircleCommand);
    _this = _callSuper(this, CircleCommand, [state]);
    _this.started = false;
    _this.start = {};
    _this.radius = 0;
    return _this;
  }
  _inherits(CircleCommand, _Command);
  return _createClass(CircleCommand, [{
    key: "mousemove",
    value: function mousemove(event) {
      this.main.mouse.x = event._x;
      this.main.mouse.y = event._y;
      this.main.mouse.event = event;
      if (this.started) {
        var dx = this.start.x - (event._x - this.main.netPanningX);
        var dy = this.start.y - (event._y - this.main.netPanningY);
        this.radius = Math.sqrt(dx * dx + dy * dy);
        this.main.tempShape = [{
          start_x: this.start.x,
          start_y: this.start.y,
          radius: this.radius,
          color: _constants.COLORS[this.main.selectedTheme].shapes_fill_temp
        }];
        this.main.info = {
          key: 'Radius: ',
          value1: Math.floor(this.radius),
          value2: ''
        };
      }
    }
  }, {
    key: "mousedown",
    value: function mousedown(event) {
      this.start.x = event._x - this.main.netPanningX;
      this.start.y = event._y - this.main.netPanningY;
      this.started = true;
    }
  }, {
    key: "mouseup",
    value: function mouseup(event) {
      if (this.started) {
        this.started = false;
        this.main.tempShape.length = 0;
        this.main.shapes.push((0, _utils.trackSelection)({
          start_x: this.start.x,
          start_y: this.start.y,
          radius: 0,
          final_radius: this.radius,
          animationCreate: true,
          counterCreate: 0,
          color: this.main.selectedColorInPanel,
          stroke: _constants.COLORS[this.main.selectedTheme].shapes_stroke
        }));
        this.main.HM.set(this.main.shapes);
        this.radius = 0;
        this.main.info = {
          key: '',
          value1: '',
          value2: ''
        };
      }
    }
  }]);
}(_command.default);
},{"./command":"src/commands/command.js","../constants":"src/constants.js","../utils":"src/utils.js"}],"src/commands/move.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _constants = require("../constants");
var _command = _interopRequireDefault(require("./command"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var MoveCommand = exports.default = /*#__PURE__*/function (_Command) {
  function MoveCommand(state) {
    var _this;
    _classCallCheck(this, MoveCommand);
    _this = _callSuper(this, MoveCommand, [state]);
    _this.started = false;
    _this.start = {};
    return _this;
  }
  _inherits(MoveCommand, _Command);
  return _createClass(MoveCommand, [{
    key: "mousemove",
    value: function mousemove(event) {
      this.main.mouse.x = event._x;
      this.main.mouse.y = event._y;
      this.main.mouse.event = event;

      // draw a line when dragging
      if (this.started && (this.main.selected || this.main.selected === 0)) {
        this.main.tempShape = [{
          start_x: this.start.x,
          start_y: this.start.y,
          dashed: true,
          end_x: event._x - this.main.netPanningX,
          end_y: event._y - this.main.netPanningY,
          stroke: _constants.COLORS[this.main.selectedTheme].LINES
        }];
      }
    }
  }, {
    key: "mousedown",
    value: function mousedown(event) {
      var _this2 = this;
      // get pixel under cursor
      var pixel = this.main.gctx.getImageData(event._x * this.main.zoomLevel, event._y * this.main.zoomLevel, 1, 1).data;
      // create rgb color for that pixel
      var color = "rgb(".concat(pixel[0], ",").concat(pixel[1], ",").concat(pixel[2], ")");
      // find a shape with the same colour

      this.main.shapes.forEach(function (item, index) {
        if (item.colorKey === color) {
          item.selected = true;
          _this2.main.selected = index;
        } else {
          item.selected = false;
        }
      });
      if (this.main.shapes.every(function (e) {
        return e.selected === false;
      })) {
        this.main.selected = null;
      } else {
        this.started = true;
        this.start.x = event._x - this.main.netPanningX;
        this.start.y = event._y - this.main.netPanningY;
      }
    }
  }, {
    key: "mouseup",
    value: function mouseup(event) {
      if (this.started && (this.main.selected || this.main.selected === 0)) {
        this.started = false;
        this.main.tempShape.length = 0;
        var sel = this.main.shapes[this.main.selected];
        // rect & circle
        if (sel.w || sel.radius) {
          var dx = this.start.x - sel.start_x;
          var dy = this.start.y - sel.start_y;
          sel.new_start_x = event._x - this.main.netPanningX - dx;
          sel.new_start_y = event._y - this.main.netPanningY - dy;
          sel.start_x = this.start.x - dx;
          sel.start_y = this.start.y - dy;
          sel.animationEdit = true;
          sel.counterEdit = 0;
          this.main.HM.set(this.main.shapes);
        } else {
          // lines
          var dx1 = this.start.x - sel.start_x;
          var dy1 = this.start.y - sel.start_y;
          var dx2 = this.start.x - sel.end_x;
          var dy2 = this.start.y - sel.end_y;
          sel.start_x = event._x - this.main.netPanningX - dx1;
          sel.start_y = event._y - this.main.netPanningY - dy1;
          sel.end_x = event._x - this.main.netPanningX - dx2;
          sel.end_y = event._y - this.main.netPanningY - dy2;
          this.main.HM.set(this.main.shapes);
        }
      }
    }
  }]);
}(_command.default);
},{"../constants":"src/constants.js","./command":"src/commands/command.js"}],"src/commands/copy.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _constants = require("../constants");
var _command = _interopRequireDefault(require("./command"));
var _utils = require("../utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var CopyCommand = exports.default = /*#__PURE__*/function (_Command) {
  function CopyCommand(state) {
    var _this;
    _classCallCheck(this, CopyCommand);
    _this = _callSuper(this, CopyCommand, [state]);
    _this.started = false;
    _this.start = {};
    return _this;
  }
  _inherits(CopyCommand, _Command);
  return _createClass(CopyCommand, [{
    key: "mousemove",
    value: function mousemove(event) {
      this.main.mouse.x = event._x;
      this.main.mouse.y = event._y;
      this.main.mouse.event = event;

      // draw a line when dragging
      if (this.started && (this.main.selected || this.main.selected === 0)) {
        this.main.tempShape = [{
          start_x: this.start.x,
          start_y: this.start.y,
          dashed: true,
          end_x: event._x - this.main.netPanningX,
          end_y: event._y - this.main.netPanningY,
          stroke: _constants.COLORS[this.main.selectedTheme].LINES
        }];
      }
    }
  }, {
    key: "mousedown",
    value: function mousedown(event) {
      var _this2 = this;
      var pixel = this.main.gctx.getImageData(event._x * this.main.zoomLevel, event._y * this.main.zoomLevel, 1, 1).data;
      // create rgb color for that pixel
      var color = "rgb(".concat(pixel[0], ",").concat(pixel[1], ",").concat(pixel[2], ")");
      // find a shape with the same colour

      this.main.shapes.forEach(function (item, index) {
        if (item.colorKey === color) {
          item.selected = true;
          _this2.main.selected = index;
        } else {
          item.selected = false;
        }
      });
      if (this.main.shapes.every(function (e) {
        return e.selected === false;
      })) {
        this.main.selected = null;
      } else {
        this.started = true;
        this.start.x = event._x - this.main.netPanningX;
        this.start.y = event._y - this.main.netPanningY;
      }
    }
  }, {
    key: "mouseup",
    value: function mouseup(event) {
      if (this.started && (this.main.selected || this.main.selected === 0)) {
        this.started = false;
        this.main.tempShape.length = 0;
        var sel = this.main.shapes[this.main.selected];
        // rect & circle
        if (sel.w) {
          var dx = this.start.x - sel.start_x;
          var dy = this.start.y - sel.start_y;
          this.main.shapes.push((0, _utils.trackSelection)({
            start_x: this.start.x - dx,
            start_y: this.start.y - dy,
            new_start_x: event._x - this.main.netPanningX - dx,
            new_start_y: event._y - this.main.netPanningY - dy,
            w: sel.w,
            h: sel.h,
            animationEdit: true,
            counterEdit: 0,
            color: this.main.selectedColorInPanel,
            stroke: _constants.COLORS[this.main.selectedTheme].shapes_stroke
          }));
          this.main.HM.set(this.main.shapes);
        } else if (sel.radius) {
          var _dx = this.start.x - sel.start_x;
          var _dy = this.start.y - sel.start_y;
          this.main.shapes.push((0, _utils.trackSelection)({
            start_x: this.start.x - _dx,
            start_y: this.start.y - _dy,
            new_start_x: event._x - this.main.netPanningX - _dx,
            new_start_y: event._y - this.main.netPanningY - _dy,
            radius: sel.radius,
            animationEdit: true,
            counterEdit: 0,
            color: this.main.selectedColorInPanel,
            stroke: _constants.COLORS[this.main.selectedTheme].shapes_stroke
          }));
          this.main.HM.set(this.main.shapes);
        } else {
          // lines
          var dx1 = this.start.x - sel.start_x;
          var dy1 = this.start.y - sel.start_y;
          var dx2 = this.start.x - sel.end_x;
          var dy2 = this.start.y - sel.end_y;
          this.main.shapes.push((0, _utils.trackSelection)({
            start_x: event._x - this.main.netPanningX - dx1,
            start_y: event._y - this.main.netPanningY - dy1,
            end_x: event._x - this.main.netPanningX - dx2,
            end_y: event._y - this.main.netPanningY - dy2,
            stroke: _constants.COLORS[this.main.selectedTheme].shapes_stroke
          }));
          this.main.HM.set(this.main.shapes);
        }
      }
    }
  }]);
}(_command.default);
},{"../constants":"src/constants.js","./command":"src/commands/command.js","../utils":"src/utils.js"}],"src/commands/resize.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _command = _interopRequireDefault(require("./command"));
var _constants = require("../constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var ResizeCommand = exports.default = /*#__PURE__*/function (_Command) {
  function ResizeCommand(state) {
    var _this;
    _classCallCheck(this, ResizeCommand);
    _this = _callSuper(this, ResizeCommand, [state]);
    _this.isResizeDrag = false;
    _this.expectResize = -1;
    _this.selectionHandles = [{}, {}, {}, {}, {}, {}, {}, {}];
    _this.mySelColor = '#CC0000';
    _this.mySelWidth = 10;
    _this.mySelBoxColor = 'darkred'; // New for selection boxes
    _this.mySelBoxSize = 10;
    return _this;
  }
  _inherits(ResizeCommand, _Command);
  return _createClass(ResizeCommand, [{
    key: "click",
    value: function click(e) {
      var _this2 = this;
      // get pixel under cursor
      var pixel = this.main.gctx.getImageData(e._x * this.main.zoomLevel, e._y * this.main.zoomLevel, 1, 1).data;
      // create rgb color for that pixel
      var color = "rgb(".concat(pixel[0], ",").concat(pixel[1], ",").concat(pixel[2], ")");
      // find a shape with the same colour

      this.main.shapes.forEach(function (item, index) {
        if (item.colorKey === color) {
          item.selected = true;
          _this2.main.selected = index;
        } else {
          item.selected = false;
        }
      });
      if (this.main.shapes.every(function (e) {
        return e.selected === false;
      })) {
        this.main.selected = null;
      }

      // if there is a selected and is a rectangle
      if (this.main.selected || this.main.selected === 0 /* && this.main.shapes[this.main.selected].w */) {
        this.createBoxes();
      } else {
        this.removeBoxes();
      }
    }
  }, {
    key: "removeBoxes",
    value: function removeBoxes() {
      this.main.tempShape.length = 0;
      this.selectionHandles = [{}, {}, {}, {}, {}, {}, {}, {}];
    }
  }, {
    key: "createBoxes",
    value: function createBoxes() {
      var half = this.mySelBoxSize / 2;
      var choosen = this.main.shapes[this.main.selected];

      // 0  1  2
      // 3     4
      // 5  6  7

      if (choosen.w && choosen.h) {
        // top left, middle, right
        this.selectionHandles[0].x = choosen.start_x - half;
        this.selectionHandles[0].y = choosen.start_y - half;
        this.selectionHandles[1].x = choosen.start_x + choosen.w / 2 - half;
        this.selectionHandles[1].y = choosen.start_y - half;
        this.selectionHandles[2].x = choosen.start_x + choosen.w - half;
        this.selectionHandles[2].y = choosen.start_y - half;

        //middle left
        this.selectionHandles[3].x = choosen.start_x - half;
        this.selectionHandles[3].y = choosen.start_y + choosen.h / 2 - half;

        //middle right
        this.selectionHandles[4].x = choosen.start_x + choosen.w - half;
        this.selectionHandles[4].y = choosen.start_y + choosen.h / 2 - half;

        //bottom left, middle, right
        this.selectionHandles[6].x = choosen.start_x + choosen.w / 2 - half;
        this.selectionHandles[6].y = choosen.start_y + choosen.h - half;
        this.selectionHandles[5].x = choosen.start_x - half;
        this.selectionHandles[5].y = choosen.start_y + choosen.h - half;
        this.selectionHandles[7].x = choosen.start_x + choosen.w - half;
        this.selectionHandles[7].y = choosen.start_y + choosen.h - half;
      } else if (choosen.radius) {
        // top left, middle, right
        this.selectionHandles[0].x = choosen.start_x - choosen.radius - half;
        this.selectionHandles[0].y = choosen.start_y - choosen.radius - half;
        this.selectionHandles[1].x = choosen.start_x - half;
        this.selectionHandles[1].y = choosen.start_y - choosen.radius - half;
        this.selectionHandles[2].x = choosen.start_x + choosen.radius - half;
        this.selectionHandles[2].y = choosen.start_y - choosen.radius - half;

        //middle left
        this.selectionHandles[3].x = choosen.start_x - choosen.radius - half;
        this.selectionHandles[3].y = choosen.start_y - half;

        //middle right
        this.selectionHandles[4].x = choosen.start_x + choosen.radius - half;
        this.selectionHandles[4].y = choosen.start_y - half;

        //bottom left, middle, right
        this.selectionHandles[6].x = choosen.start_x - half;
        this.selectionHandles[6].y = choosen.start_y + choosen.radius - half;
        this.selectionHandles[5].x = choosen.start_x - choosen.radius - half;
        this.selectionHandles[5].y = choosen.start_y + choosen.radius - half;
        this.selectionHandles[7].x = choosen.start_x + choosen.radius - half;
        this.selectionHandles[7].y = choosen.start_y + choosen.radius - half;
      } else {
        this.selectionHandles[0].x = choosen.start_x - half;
        this.selectionHandles[0].y = choosen.start_y - half;
        this.selectionHandles[1].x = choosen.end_x - half;
        this.selectionHandles[1].y = choosen.end_y - half;
      }
      var anchors = [];
      var numberOfAnchors = choosen.end_x ? 2 : 8;
      for (var i = 0; i < numberOfAnchors; i++) {
        var ret = this.selectionHandles[i];
        anchors.push({
          start_x: this.selectionHandles[i].x /* - this.main.netPanningX */,
          start_y: this.selectionHandles[i].y /* - this.main.netPanningY */,
          w: this.mySelWidth,
          h: this.mySelWidth,
          color: this.mySelColor,
          stroke: _constants.COLORS[this.main.selectedTheme].shapes_stroke
        });
      }
      this.main.tempShape = [].concat(anchors);
    }
  }, {
    key: "mousemove",
    value: function mousemove(e) {
      this.main.mouse.x = e._x;
      this.main.mouse.y = e._y;
      this.main.mouse.event = e;
      var mySel = this.main.shapes[this.main.selected];
      var mx = this.main.mouse.x - this.main.netPanningX;
      var my = this.main.mouse.y - this.main.netPanningY;
      if (this.isResizeDrag && mySel) {
        var oldx = mySel.start_x;
        var oldy = mySel.start_y;

        // 0  1  2
        // 3     4
        // 5  6  7
        if (mySel.w && mySel.h) {
          switch (this.expectResize) {
            case 0:
              mySel.start_x = mx;
              mySel.start_y = my;
              mySel.w += oldx - mx;
              mySel.h += oldy - my;
              break;
            case 1:
              mySel.start_y = my;
              mySel.h += oldy - my;
              break;
            case 2:
              mySel.start_y = my;
              mySel.w = mx - oldx;
              mySel.h += oldy - my;
              break;
            case 3:
              mySel.start_x = mx;
              mySel.w += oldx - mx;
              break;
            case 4:
              mySel.w = mx - oldx;
              break;
            case 5:
              mySel.start_x = mx;
              mySel.w += oldx - mx;
              mySel.h = my - oldy;
              break;
            case 6:
              mySel.h = my - oldy;
              break;
            case 7:
              mySel.w = mx - oldx;
              mySel.h = my - oldy;
              break;
          }
        } else if (mySel.radius) {
          // circle resize
          var dx = oldx - mx;
          var dy = oldy - my;
          var dr = Math.sqrt(dx * dx + dy * dy);
          mySel.radius = dr; // updating radius
        } else {
          // edit line
          switch (this.expectResize) {
            case 0:
              mySel.start_x = mx;
              mySel.start_y = my;
              break;
            case 1:
              mySel.end_x = mx;
              mySel.end_y = my;
              break;
          }
        }
        this.createBoxes();
      }
      if (mySel !== null && !this.isResizeDrag) {
        for (var i = 0; i < 8; i++) {
          // 0  1  2
          // 3     4
          // 5  6  7

          var cur = this.selectionHandles[i];

          // we dont need to use the ghost context because
          // selection handles will always be rectangles
          if (mx >= cur.x && mx <= cur.x + this.mySelBoxSize && my >= cur.y && my <= cur.y + this.mySelBoxSize) {
            // we found one!
            this.expectResize = i;
            if (!mySel.end_x) {
              switch (i) {
                case 0:
                  this.main.canvas.style.cursor = 'nw-resize';
                  break;
                case 1:
                  this.main.canvas.style.cursor = 'n-resize';
                  break;
                case 2:
                  this.main.canvas.style.cursor = 'ne-resize';
                  break;
                case 3:
                  this.main.canvas.style.cursor = 'w-resize';
                  break;
                case 4:
                  this.main.canvas.style.cursor = 'e-resize';
                  break;
                case 5:
                  this.main.canvas.style.cursor = 'sw-resize';
                  break;
                case 6:
                  this.main.canvas.style.cursor = 's-resize';
                  break;
                case 7:
                  this.main.canvas.style.cursor = 'se-resize';
                  break;
              }
            } else {
              this.main.canvas.style.cursor = 'all-scroll';
            }
            return;
          }
        }
        // not over a selection box, return to normal
        this.isResizeDrag = false;
        this.expectResize = -1;
        this.main.canvas.style.cursor = 'auto';
      }
    }
  }, {
    key: "mousedown",
    value: function mousedown(e) {
      // console.log('Command: mousedown', e, this)
      //we are over a selection box
      if (this.expectResize !== -1) {
        this.isResizeDrag = true;
        return;
      }
    }
  }, {
    key: "mouseup",
    value: function mouseup(event) {
      // console.log('Command: mouseup', event, this)
      this.isResizeDrag = false;
      this.expectResize = -1;
      this.main.canvas.style.cursor = "none";
    }
  }]);
}(_command.default);
},{"./command":"src/commands/command.js","../constants":"src/constants.js"}],"src/commands/text.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _command = _interopRequireDefault(require("./command"));
var _constants = require("../constants");
var _utils = require("../utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var TextCommand = exports.default = /*#__PURE__*/function (_Command) {
  function TextCommand(state) {
    var _this;
    _classCallCheck(this, TextCommand);
    _this = _callSuper(this, TextCommand, [state]);
    _this.started = false;
    _this.start = {};
    return _this;
  }
  _inherits(TextCommand, _Command);
  return _createClass(TextCommand, [{
    key: "mousemove",
    value: function mousemove(event) {
      this.main.mouse.x = event._x;
      this.main.mouse.y = event._y;
      this.main.mouse.event = event;
      if (this.started) {
        this.main.tempShape = [{
          start_x: this.start.x,
          start_y: this.start.y,
          end_x: event._x - this.main.netPanningX,
          end_y: event._y - this.main.netPanningY,
          stroke: _constants.COLORS[this.main.selectedTheme].LINES
        }];
      }
    }
  }, {
    key: "mousedown",
    value: function mousedown(event) {
      this.start.x = event._x - this.main.netPanningX;
      this.start.y = event._y - this.main.netPanningY;
      this.started = true;
    }
  }, {
    key: "mouseup",
    value: function mouseup(event) {
      var _this2 = this;
      if (this.started) {
        this.started = false;
        this.main.tempShape.length = 0;
        this.main.textModal.open(event._x - this.main.netPanningX, event._y - this.main.netPanningY, '', function (val) {
          return _this2.saveText(val);
        });
      }
    }
  }, {
    key: "saveText",
    value: function saveText(info) {
      var x = info.x,
        y = info.y,
        val = info.val;
      var dashed_line = (0, _utils.trackSelection)({
        start_x: this.start.x,
        start_y: this.start.y,
        dashed: true,
        arrowStart: true,
        end_x: x - this.main.netPanningX,
        end_y: y - this.main.netPanningY,
        stroke: _constants.COLORS[this.main.selectedTheme].LINES
      });
      this.main.shapes.push(dashed_line);
      this.main.shapes.push({
        start_x: x - this.main.netPanningX + _constants.TEXT.OFFSET,
        start_y: y - this.main.netPanningY - _constants.TEXT.OFFSET,
        text: val,
        font: _constants.TEXT.FONT,
        fill: _constants.COLORS[this.main.selectedTheme].shapes_stroke,
        colorKey: dashed_line.colorKey
      });
      this.main.HM.set(this.main.shapes);
    }
  }]);
}(_command.default);
},{"./command":"src/commands/command.js","../constants":"src/constants.js","../utils":"src/utils.js"}],"src/commands/measures.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _command = _interopRequireDefault(require("./command"));
var _constants = require("../constants");
var _utils = require("../utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var MeasuresCommand = exports.default = /*#__PURE__*/function (_Command) {
  function MeasuresCommand(state) {
    var _this;
    _classCallCheck(this, MeasuresCommand);
    _this = _callSuper(this, MeasuresCommand, [state]);
    _this.first = false;
    _this.start = {};
    _this.d = 0;
    return _this;
  }
  _inherits(MeasuresCommand, _Command);
  return _createClass(MeasuresCommand, [{
    key: "mousemove",
    value: function mousemove(event) {
      this.main.mouse.x = event._x;
      this.main.mouse.y = event._y;
      this.main.mouse.event = event;
      if (this.first) {
        this.main.tempShape = [{
          start_x: this.start.x,
          start_y: this.start.y,
          dashed: true,
          end_x: event._x - this.main.netPanningX,
          end_y: event._y - this.main.netPanningY,
          stroke: _constants.COLORS[this.main.selectedTheme].LINES
        }];
        var dx = this.start.x - (event._x - this.main.netPanningX);
        var dy = this.start.y - (event._y - this.main.netPanningY);
        this.d = Math.floor(Math.sqrt(dx * dx + dy * dy));
        this.main.info = {
          key: 'Dist: ',
          value1: this.d,
          value2: ''
        };
      }
    }
  }, {
    key: "mousedown",
    value: function mousedown(event) {
      this.start.x = event._x - this.main.netPanningX;
      this.start.y = event._y - this.main.netPanningY;
      this.first = true;
    }
  }, {
    key: "mouseup",
    value: function mouseup(event) {
      if (this.first) {
        this.first = false;
        this.main.tempShape.length = 0;
        var dashed_line = (0, _utils.trackSelection)({
          start_x: this.start.x,
          start_y: this.start.y,
          // dashed: true,
          arrowStart: true,
          arrowEnd: true,
          end_x: event._x - this.main.netPanningX,
          end_y: event._y - this.main.netPanningY,
          stroke: _constants.COLORS[this.main.selectedTheme].LINES
        });
        this.main.shapes.push(dashed_line);
        var midX = dashed_line.start_x + (dashed_line.end_x - dashed_line.start_x) * 0.50;
        var midY = dashed_line.start_y + (dashed_line.end_y - dashed_line.start_y) * 0.50;
        this.main.shapes.push({
          start_x: midX - this.main.netPanningX,
          start_y: midY - this.main.netPanningY,
          measure: this.d,
          font: _constants.TEXT.FONT,
          fill: _constants.COLORS[this.main.selectedTheme].shapes_stroke,
          colorKey: dashed_line.colorKey
        });
        this.main.HM.set(this.main.shapes);
        this.main.info = {
          key: '',
          value1: '',
          value2: ''
        };
        this.d = 0;
      }
    }
  }]);
}(_command.default);
},{"./command":"src/commands/command.js","../constants":"src/constants.js","../utils":"src/utils.js"}],"src/commands/rotate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _constants = require("../constants");
var _command = _interopRequireDefault(require("./command"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var RotateCommand = exports.default = /*#__PURE__*/function (_Command) {
  function RotateCommand(state) {
    var _this;
    _classCallCheck(this, RotateCommand);
    _this = _callSuper(this, RotateCommand, [state]);
    _this.started = false;
    _this.start = {};
    return _this;
  }
  _inherits(RotateCommand, _Command);
  return _createClass(RotateCommand, [{
    key: "mousemove",
    value: function mousemove(event) {
      this.main.mouse.x = event._x;
      this.main.mouse.y = event._y;
      this.main.mouse.event = event;

      // draw a line when dragging
      if (this.started && (this.main.selected || this.main.selected === 0)) {
        this.main.tempShape = [{
          start_x: this.start.x,
          start_y: this.start.y,
          dashed: true,
          end_x: event._x - this.main.netPanningX,
          end_y: event._y - this.main.netPanningY,
          stroke: _constants.COLORS[this.main.selectedTheme].LINES
        }];
        var dx = event._x - this.main.netPanningX - this.start.x;
        var dy = event._y - this.main.netPanningY - this.start.y;
        var angle = Math.atan2(dy, dx);
        this.main.info = "Angle: ".concat(Math.floor(angle * 180 / Math.PI));
      }
    }
  }, {
    key: "mousedown",
    value: function mousedown(event) {
      var _this2 = this;
      // get pixel under cursor
      var pixel = this.main.gctx.getImageData(event._x * this.main.zoomLevel, event._y * this.main.zoomLevel, 1, 1).data;
      // create rgb color for that pixel
      var color = "rgb(".concat(pixel[0], ",").concat(pixel[1], ",").concat(pixel[2], ")");
      // find a shape with the same colour

      this.main.shapes.forEach(function (item, index) {
        if (item.colorKey === color) {
          item.selected = true;
          _this2.main.selected = index;
        } else {
          item.selected = false;
        }
      });
      if (this.main.shapes.every(function (e) {
        return e.selected === false;
      })) {
        this.main.selected = null;
      } else {
        this.started = true;
        this.start.x = event._x - this.main.netPanningX;
        this.start.y = event._y - this.main.netPanningY;
      }
    }
  }, {
    key: "mouseup",
    value: function mouseup(event) {
      if (this.started && (this.main.selected || this.main.selected === 0)) {
        this.started = false;
        this.main.tempShape.length = 0;
        var sel = this.main.shapes[this.main.selected];
        // rect & circle
        if (sel.w || sel.radius) {
          var dx = event._x - this.main.netPanningX - sel.start_x;
          var dy = event._y - this.main.netPanningY - sel.start_y;
          var angle = Math.atan2(dy, dx);
          // console.log(Math.floor(angle * 180 / Math.PI))
          sel.angle = angle;
          this.main.HM.set(this.main.shapes);
          this.main.info = '';
        }
      }
    }
  }]);
}(_command.default);
},{"../constants":"src/constants.js","./command":"src/commands/command.js"}],"src/app.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebCAD = void 0;
require("../style.css");
var _keyboards_events = _interopRequireDefault(require("./keyboards_events"));
var _history_management = _interopRequireDefault(require("./history_management"));
var _utils = require("./utils");
var _commandsPanel = _interopRequireDefault(require("./components/commands-panel"));
var _inputDialogue = _interopRequireDefault(require("./components/input-dialogue"));
var _constants = require("./constants");
var _renderFn = require("./renderFn");
var _pan = _interopRequireDefault(require("./commands/pan"));
var _zoom = _interopRequireDefault(require("./commands/zoom"));
var _select = _interopRequireDefault(require("./commands/select"));
var _delete = _interopRequireDefault(require("./commands/delete"));
var _line = _interopRequireDefault(require("./commands/line"));
var _rect = _interopRequireDefault(require("./commands/rect"));
var _circle = _interopRequireDefault(require("./commands/circle"));
var _move = _interopRequireDefault(require("./commands/move"));
var _copy = _interopRequireDefault(require("./commands/copy"));
var _resize = _interopRequireDefault(require("./commands/resize"));
var _text = _interopRequireDefault(require("./commands/text"));
var _measures = _interopRequireDefault(require("./commands/measures"));
var _rotate = _interopRequireDefault(require("./commands/rotate"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // web component for the command
// Commands
window.onload = function () {
  var cad = new WebCAD();
  document.getElementById('canvas').replaceWith(cad.canvas);
  cad.start();
  window.cad = cad; // debug
};
var WebCAD = exports.WebCAD = /*#__PURE__*/function () {
  function WebCAD() {
    _classCallCheck(this, WebCAD);
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext('2d');

    // ghost canvas for selection
    this.ghostcanvas = document.createElement('canvas');
    ;
    this.gctx = this.ghostcanvas.getContext('2d');
    this.keys = new _keyboards_events.default(this);
    this.colorsTable = _utils.colorsTable;
    this.selectedTheme = 'grey'; // white, grey, blue
    this.selectedColorInPanel = '#0074D9';
    this.commands = {
      'SELECT': new _select.default(this),
      'DELETE': new _delete.default(this),
      'COPY': new _copy.default(this),
      'MOVE': new _move.default(this),
      'RESIZE': new _resize.default(this),
      'PAN': new _pan.default(this),
      'ZOOM': new _zoom.default(this),
      'LINE': new _line.default(this),
      'RECT': new _rect.default(this),
      'CIRCLE': new _circle.default(this),
      'TEXT': new _text.default(this),
      'MEASURES': new _measures.default(this),
      'ROTATE': new _rotate.default(this)
    };
    this.textModal = new _inputDialogue.default(this);
    this.panel = new _commandsPanel.default(this);
    this.mouse = {
      x: 0,
      y: 0,
      event: null
    };
    this.zoomLevel = 1;
    this.choosenUnitSystem = 'ONE';
    this.info = {
      key: '',
      value1: '',
      value2: ''
    }; // what is shown in cursor...

    this.shapes = [];
    this.tempShape = [];
    this.selected = null;
    this.HM = new _history_management.default(this);
    this.lastTime = new Date().getTime();
    this.currentTime = 0;
    this.delta = 0;
    this.startListening();
    this.resizeCanvas();
  }
  return _createClass(WebCAD, [{
    key: "setUnitSystem",
    value: function setUnitSystem(what) {
      this.choosenUnitSystem = what;
    }
  }, {
    key: "getValueAccordingToUnitSystem",
    value: function getValueAccordingToUnitSystem(val) {
      return val ? val / _constants.UNITS[this.choosenUnitSystem] : '';
    }
  }, {
    key: "resizeCanvas",
    value: function resizeCanvas() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.ghostcanvas.width = window.innerWidth;
      this.ghostcanvas.height = window.innerHeight;
      this.canvas.style.cursor = "none";
      this.draw();
    }
  }, {
    key: "startListening",
    value: function startListening() {
      // resize the canvas to fill browser window dynamically
      window.addEventListener('resize', this.resizeCanvas.bind(this), false);
      this.canvas.oncontextmenu = function () {
        return false;
      };
      this.canvas.addEventListener('click', this.globalHandler.bind(this), false);
      this.canvas.addEventListener('mousemove', this.globalHandler.bind(this), false);
      this.canvas.addEventListener('mousedown', this.globalHandler.bind(this), false);
      this.canvas.addEventListener('mouseup', this.globalHandler.bind(this), false);
      this.canvas.addEventListener('mouseout', this.globalHandler.bind(this), false);
    }
  }, {
    key: "globalHandler",
    value: function globalHandler(ev) {
      ev.preventDefault();
      ev.stopPropagation();
      var x = parseInt(ev.clientX / this.zoomLevel);
      var y = parseInt(ev.clientY / this.zoomLevel);

      /* ----------------- SNAP 2 GRID ----------------- */
      if (this.keys.hasSnap && !(this.keys.choosenCommand === 'DELETE' || this.keys.choosenCommand === 'SELECT')) {
        var restoH = x % this.keys.currentSnap;
        if (restoH >= this.keys.currentSnap) {
          x = x - restoH + this.keys.currentSnap;
        } else {
          x -= restoH;
        }
        var restoV = y % this.keys.currentSnap;
        if (restoV >= this.keys.currentSnap) {
          y = y - restoV + this.keys.currentSnap;
        } else {
          y -= restoV;
        }
      }
      ev._x = x;
      ev._y = y;
      this.currentCommand = this.commands[this.keys.choosenCommand];
      var func = this.currentCommand[ev.type].bind(this.currentCommand);
      if (func) {
        func(ev);
      }
    }
  }, {
    key: "loop",
    value: function loop() {
      var _this = this;
      // time management for animation
      this.currentTime = new Date().getTime();
      this.dt = (this.currentTime - this.lastTime) / 1000;
      this.update(this.dt);
      this.draw();
      this.lastTime = this.currentTime;
      requestAnimationFrame(function () {
        _this.loop();
      });
    }
  }, {
    key: "start",
    value: function start() {
      this.loop();
    }
  }, {
    key: "unselectAll",
    value: function unselectAll() {
      this.shapes.forEach(function (item, index) {
        item.selected = false;
      });
      this.selected = null;
    }
  }, {
    key: "update",
    value: function update(dt) {
      var _this2 = this;
      // console.log(dt)
      this.HM.value.forEach(function (item) {
        // ANIMATION on COPY / MOVE
        if (item.animationEdit) {
          if (item.counterEdit <= _constants.ANIMATION.TIME) {
            item.counterEdit += _constants.ANIMATION.STEP;
            var _interpolate = (0, _utils.interpolate)({
                x: item.start_x,
                y: item.start_y
              }, {
                x: item.new_start_x,
                y: item.new_start_y
              }, item.counterEdit / _constants.ANIMATION.TIME),
              x = _interpolate.x,
              y = _interpolate.y;
            item.start_x = x;
            item.start_y = y;
          } else {
            item.animationEdit = false;
            _this2.unselectAll();
          }
        }
        // Animation on shape creation
        if (item.animationCreate) {
          if (item.counterCreate <= _constants.ANIMATION.TIME) {
            item.counterCreate += _constants.ANIMATION.STEP;
            // RECT
            if (item.final_w) {
              var _interpolate2 = (0, _utils.interpolate)({
                  x: item.w,
                  y: item.h
                }, {
                  x: item.final_w,
                  y: item.final_h
                }, item.counterCreate / _constants.ANIMATION.TIME),
                _x = _interpolate2.x,
                _y = _interpolate2.y;
              item.w = _x;
              item.h = _y;
            }
            // LINE
            if (item.final_end_x) {
              var _interpolate3 = (0, _utils.interpolate)({
                  x: item.end_x,
                  y: item.end_y
                }, {
                  x: item.final_end_x,
                  y: item.final_end_y
                }, item.counterCreate / _constants.ANIMATION.TIME),
                _x2 = _interpolate3.x,
                _y2 = _interpolate3.y;
              item.end_x = _x2;
              item.end_y = _y2;
            }
            // CIRCLE
            if (item.final_radius) {
              var _interpolate4 = (0, _utils.interpolate)({
                  x: item.radius,
                  y: 0
                }, {
                  x: item.final_radius,
                  y: 0
                }, item.counterCreate / _constants.ANIMATION.TIME),
                _x3 = _interpolate4.x;
              item.radius = _x3;
            }
          } else {
            item.animationCreate = false;
          }
        }
      });
    }
  }, {
    key: "draw",
    value: function draw() {
      // CANCAS
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.save();
      this.ctx.scale(this.zoomLevel, this.zoomLevel); // apply scale
      this.ctx.translate(this.netPanningX, this.netPanningY); // apply translation
      (0, _renderFn.renderCanvas)(this);
      (0, _renderFn.renderShapes)(this, this.ctx, false);
      (0, _renderFn.renderPointer)(this);
      this.ctx.restore();

      // GHOST CANVAS for HIT Detection
      this.gctx.fillStyle = "black";
      this.gctx.fillRect(0, 0, this.ghostcanvas.width, this.ghostcanvas.height);
      this.gctx.save();
      this.gctx.scale(this.zoomLevel, this.zoomLevel); // apply scale
      this.gctx.translate(this.netPanningX, this.netPanningY); // apply translation
      (0, _renderFn.renderShapes)(this, this.gctx, true);
      this.gctx.restore();
    }
  }]);
}();
},{"../style.css":"style.css","./keyboards_events":"src/keyboards_events.js","./history_management":"src/history_management.js","./utils":"src/utils.js","./components/commands-panel":"src/components/commands-panel.js","./components/input-dialogue":"src/components/input-dialogue.js","./constants":"src/constants.js","./renderFn":"src/renderFn.js","./commands/pan":"src/commands/pan.js","./commands/zoom":"src/commands/zoom.js","./commands/select":"src/commands/select.js","./commands/delete":"src/commands/delete.js","./commands/line":"src/commands/line.js","./commands/rect":"src/commands/rect.js","./commands/circle":"src/commands/circle.js","./commands/move":"src/commands/move.js","./commands/copy":"src/commands/copy.js","./commands/resize":"src/commands/resize.js","./commands/text":"src/commands/text.js","./commands/measures":"src/commands/measures.js","./commands/rotate":"src/commands/rotate.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "65116" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/app.js"], null)
//# sourceMappingURL=/app.a6a4d504.js.map