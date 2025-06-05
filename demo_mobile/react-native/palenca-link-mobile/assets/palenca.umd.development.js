(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.palenca = {}));
}(this, (function (exports) { 'use strict';

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
  function _extends() {
    return _extends = Object.assign ? Object.assign.bind() : function (n) {
      for (var e = 1; e < arguments.length; e++) {
        var t = arguments[e];
        for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
      }
      return n;
    }, _extends.apply(null, arguments);
  }
  function _regeneratorRuntime() {
    _regeneratorRuntime = function () {
      return r;
    };
    var t,
      r = {},
      e = Object.prototype,
      n = e.hasOwnProperty,
      o = "function" == typeof Symbol ? Symbol : {},
      i = o.iterator || "@@iterator",
      a = o.asyncIterator || "@@asyncIterator",
      u = o.toStringTag || "@@toStringTag";
    function c(t, r, e, n) {
      return Object.defineProperty(t, r, {
        value: e,
        enumerable: !n,
        configurable: !n,
        writable: !n
      });
    }
    try {
      c({}, "");
    } catch (t) {
      c = function (t, r, e) {
        return t[r] = e;
      };
    }
    function h(r, e, n, o) {
      var i = e && e.prototype instanceof Generator ? e : Generator,
        a = Object.create(i.prototype);
      return c(a, "_invoke", function (r, e, n) {
        var o = 1;
        return function (i, a) {
          if (3 === o) throw Error("Generator is already running");
          if (4 === o) {
            if ("throw" === i) throw a;
            return {
              value: t,
              done: !0
            };
          }
          for (n.method = i, n.arg = a;;) {
            var u = n.delegate;
            if (u) {
              var c = d(u, n);
              if (c) {
                if (c === f) continue;
                return c;
              }
            }
            if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
              if (1 === o) throw o = 4, n.arg;
              n.dispatchException(n.arg);
            } else "return" === n.method && n.abrupt("return", n.arg);
            o = 3;
            var h = s(r, e, n);
            if ("normal" === h.type) {
              if (o = n.done ? 4 : 2, h.arg === f) continue;
              return {
                value: h.arg,
                done: n.done
              };
            }
            "throw" === h.type && (o = 4, n.method = "throw", n.arg = h.arg);
          }
        };
      }(r, n, new Context(o || [])), !0), a;
    }
    function s(t, r, e) {
      try {
        return {
          type: "normal",
          arg: t.call(r, e)
        };
      } catch (t) {
        return {
          type: "throw",
          arg: t
        };
      }
    }
    r.wrap = h;
    var f = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    var l = {};
    c(l, i, function () {
      return this;
    });
    var p = Object.getPrototypeOf,
      y = p && p(p(x([])));
    y && y !== e && n.call(y, i) && (l = y);
    var v = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(l);
    function g(t) {
      ["next", "throw", "return"].forEach(function (r) {
        c(t, r, function (t) {
          return this._invoke(r, t);
        });
      });
    }
    function AsyncIterator(t, r) {
      function e(o, i, a, u) {
        var c = s(t[o], t, i);
        if ("throw" !== c.type) {
          var h = c.arg,
            f = h.value;
          return f && "object" == typeof f && n.call(f, "__await") ? r.resolve(f.__await).then(function (t) {
            e("next", t, a, u);
          }, function (t) {
            e("throw", t, a, u);
          }) : r.resolve(f).then(function (t) {
            h.value = t, a(h);
          }, function (t) {
            return e("throw", t, a, u);
          });
        }
        u(c.arg);
      }
      var o;
      c(this, "_invoke", function (t, n) {
        function i() {
          return new r(function (r, o) {
            e(t, n, r, o);
          });
        }
        return o = o ? o.then(i, i) : i();
      }, !0);
    }
    function d(r, e) {
      var n = e.method,
        o = r.i[n];
      if (o === t) return e.delegate = null, "throw" === n && r.i.return && (e.method = "return", e.arg = t, d(r, e), "throw" === e.method) || "return" !== n && (e.method = "throw", e.arg = new TypeError("The iterator does not provide a '" + n + "' method")), f;
      var i = s(o, r.i, e.arg);
      if ("throw" === i.type) return e.method = "throw", e.arg = i.arg, e.delegate = null, f;
      var a = i.arg;
      return a ? a.done ? (e[r.r] = a.value, e.next = r.n, "return" !== e.method && (e.method = "next", e.arg = t), e.delegate = null, f) : a : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, f);
    }
    function w(t) {
      this.tryEntries.push(t);
    }
    function m(r) {
      var e = r[4] || {};
      e.type = "normal", e.arg = t, r[4] = e;
    }
    function Context(t) {
      this.tryEntries = [[-1]], t.forEach(w, this), this.reset(!0);
    }
    function x(r) {
      if (null != r) {
        var e = r[i];
        if (e) return e.call(r);
        if ("function" == typeof r.next) return r;
        if (!isNaN(r.length)) {
          var o = -1,
            a = function e() {
              for (; ++o < r.length;) if (n.call(r, o)) return e.value = r[o], e.done = !1, e;
              return e.value = t, e.done = !0, e;
            };
          return a.next = a;
        }
      }
      throw new TypeError(typeof r + " is not iterable");
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, c(v, "constructor", GeneratorFunctionPrototype), c(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = c(GeneratorFunctionPrototype, u, "GeneratorFunction"), r.isGeneratorFunction = function (t) {
      var r = "function" == typeof t && t.constructor;
      return !!r && (r === GeneratorFunction || "GeneratorFunction" === (r.displayName || r.name));
    }, r.mark = function (t) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, c(t, u, "GeneratorFunction")), t.prototype = Object.create(v), t;
    }, r.awrap = function (t) {
      return {
        __await: t
      };
    }, g(AsyncIterator.prototype), c(AsyncIterator.prototype, a, function () {
      return this;
    }), r.AsyncIterator = AsyncIterator, r.async = function (t, e, n, o, i) {
      void 0 === i && (i = Promise);
      var a = new AsyncIterator(h(t, e, n, o), i);
      return r.isGeneratorFunction(e) ? a : a.next().then(function (t) {
        return t.done ? t.value : a.next();
      });
    }, g(v), c(v, u, "Generator"), c(v, i, function () {
      return this;
    }), c(v, "toString", function () {
      return "[object Generator]";
    }), r.keys = function (t) {
      var r = Object(t),
        e = [];
      for (var n in r) e.unshift(n);
      return function t() {
        for (; e.length;) if ((n = e.pop()) in r) return t.value = n, t.done = !1, t;
        return t.done = !0, t;
      };
    }, r.values = x, Context.prototype = {
      constructor: Context,
      reset: function (r) {
        if (this.prev = this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(m), !r) for (var e in this) "t" === e.charAt(0) && n.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = t);
      },
      stop: function () {
        this.done = !0;
        var t = this.tryEntries[0][4];
        if ("throw" === t.type) throw t.arg;
        return this.rval;
      },
      dispatchException: function (r) {
        if (this.done) throw r;
        var e = this;
        function n(t) {
          a.type = "throw", a.arg = r, e.next = t;
        }
        for (var o = e.tryEntries.length - 1; o >= 0; --o) {
          var i = this.tryEntries[o],
            a = i[4],
            u = this.prev,
            c = i[1],
            h = i[2];
          if (-1 === i[0]) return n("end"), !1;
          if (!c && !h) throw Error("try statement without catch or finally");
          if (null != i[0] && i[0] <= u) {
            if (u < c) return this.method = "next", this.arg = t, n(c), !0;
            if (u < h) return n(h), !1;
          }
        }
      },
      abrupt: function (t, r) {
        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
          var n = this.tryEntries[e];
          if (n[0] > -1 && n[0] <= this.prev && this.prev < n[2]) {
            var o = n;
            break;
          }
        }
        o && ("break" === t || "continue" === t) && o[0] <= r && r <= o[2] && (o = null);
        var i = o ? o[4] : {};
        return i.type = t, i.arg = r, o ? (this.method = "next", this.next = o[2], f) : this.complete(i);
      },
      complete: function (t, r) {
        if ("throw" === t.type) throw t.arg;
        return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && r && (this.next = r), f;
      },
      finish: function (t) {
        for (var r = this.tryEntries.length - 1; r >= 0; --r) {
          var e = this.tryEntries[r];
          if (e[2] === t) return this.complete(e[4], e[3]), m(e), f;
        }
      },
      catch: function (t) {
        for (var r = this.tryEntries.length - 1; r >= 0; --r) {
          var e = this.tryEntries[r];
          if (e[0] === t) {
            var n = e[4];
            if ("throw" === n.type) {
              var o = n.arg;
              m(e);
            }
            return o;
          }
        }
        throw Error("illegal catch attempt");
      },
      delegateYield: function (r, e, n) {
        return this.delegate = {
          i: x(r),
          r: e,
          n: n
        }, "next" === this.method && (this.arg = t), f;
      }
    }, r;
  }

  var config = {
    apiBaseUrl: 'https://api-connect.palenca.com',
    widgetBaseUrl: 'https://connect.palenca.com'
  };

  var generateUniqueId = function generateUniqueId(length) {
    if (length === void 0) {
      length = 16;
    }
    return "id_" + parseInt(Math.ceil(Math.random() * Date.now()).toPrecision(length).toString().replace('.', ''));
  };
  var validateLoadArguments = function validateLoadArguments(publicApiKey, widgetId) {
    if (!publicApiKey || typeof publicApiKey !== 'string') {
      throw new Error('Expected publicApiKey to be a string');
    }
    if (!widgetId || typeof widgetId !== 'string') {
      throw new Error('Expected widgetId to be a string');
    }
  };
  var validateCredentials = /*#__PURE__*/function () {
    var _ref = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(publicApiKey, widgetId) {
      var payload, response;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            payload = {
              widget_id: widgetId
            };
            _context.next = 3;
            return fetch(config.apiBaseUrl + "/v1/link/authorize", {
              method: 'post',
              body: JSON.stringify(payload),
              headers: {
                'Content-Type': 'application/json',
                'x-api-key': publicApiKey
              }
            });
          case 3:
            response = _context.sent;
            if (!(response.status !== 200)) {
              _context.next = 6;
              break;
            }
            throw new Error('publicApiKey or Widget ID are invalid');
          case 6:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function validateCredentials(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
  var validateRenderArguments = function validateRenderArguments(containerId, options) {
    if (!containerId || typeof containerId !== 'string') {
      throw new Error('Expected containerId to be a string');
    }
    if (options && typeof options !== 'object') {
      throw new Error('Expected options to be an object');
    }
  };
  var queryParams = function queryParams(params) {
    var newParams = Object.keys(params).map(function (key) {
      var value = params[key];
      if (value instanceof Array) {
        if (value.length > 0) {
          return encodeURIComponent(key) + "=" + value.join(',');
        }
      }
      if (typeof value === 'string' || typeof value === 'boolean') {
        return encodeURIComponent(key) + "=" + encodeURIComponent(value);
      }
      return undefined;
    });
    return newParams.filter(function (param) {
      return param != undefined;
    }).join('&');
  };
  var parseSearchParams = function parseSearchParams(widgetId, options) {
    var params = {
      widget_id: widgetId
    };
    if (options && options.configuration) {
      var configuration = options.configuration;
      // Build the configuration object, only including defined values
      var renderConfiguration = {};
      if (configuration.externalId !== undefined) renderConfiguration.external_id = configuration.externalId;
      if (configuration.platform !== undefined) renderConfiguration.platform = configuration.platform;
      if (configuration.isSandbox !== undefined) renderConfiguration.is_sandbox = configuration.isSandbox;
      if (configuration.platforms !== undefined) renderConfiguration.platforms = configuration.platforms;
      if (configuration.country !== undefined) renderConfiguration.country = configuration.country;
      if (configuration.redirectUrl !== undefined) renderConfiguration.redirect_url = configuration.redirectUrl;
      if (configuration.uberRedirectUrl !== undefined) renderConfiguration.uber_redirect_url = configuration.uberRedirectUrl;
      if (configuration.hideLogo !== undefined) renderConfiguration.hide_logo = configuration.hideLogo;
      if (configuration.hideWhatsApp !== undefined) renderConfiguration.hide_whatsapp = configuration.hideWhatsApp;
      if (configuration.hideConsent !== undefined) renderConfiguration.hide_consent = configuration.hideConsent;
      if (configuration.lang !== undefined) renderConfiguration.lang = configuration.lang;
      if (configuration.customPrivacyUrl !== undefined) renderConfiguration.custom_privacy_url = configuration.customPrivacyUrl;
      if (configuration.whatsAppPhoneNumber !== undefined) renderConfiguration.whatsapp_number = configuration.whatsAppPhoneNumber;
      params = _extends({}, params, renderConfiguration);
    }
    if (options && options.appearance) {
      var appearance = options.appearance;
      var renderAppearance = {};
      if (appearance.borderRadius !== undefined) renderAppearance.border_radius = appearance.borderRadius;
      if (appearance.fontFamily !== undefined) renderAppearance.font_family = appearance.fontFamily;
      if (appearance.hasOwnProperty('primaryColor') && appearance.primaryColor !== undefined) {
        var urlSafeColor = appearance.primaryColor;
        if (urlSafeColor && urlSafeColor.charAt(0) === '#') {
          urlSafeColor = urlSafeColor.slice(1);
        }
        renderAppearance.primary_color = urlSafeColor;
      }
      params = _extends({}, params, renderAppearance);
    }
    return queryParams(params);
  };
  var renderFrame = function renderFrame(widgetId, containerId, options) {
    var $container = document.getElementById(containerId);
    if (!$container) {
      throw new Error('Container with id ' + containerId + ' not found');
    }
    var searchParams = parseSearchParams(widgetId, options);
    var id = generateUniqueId();
    var iframe = document.createElement('iframe');
    iframe.id = id;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.src = config.widgetBaseUrl + "?" + searchParams;
    $container.appendChild(iframe);
    return id;
  };
  var removeFrame = function removeFrame(frameId) {
    var iframe = document.getElementById(frameId);
    iframe == null || iframe.remove();
  };

  var OnEvent;
  (function (OnEvent) {
    OnEvent["ready"] = "ready";
    OnEvent["connection_success"] = "connection_success";
    OnEvent["connection_error"] = "connection_error";
    OnEvent["user_created"] = "user_created";
    OnEvent["completed"] = "completed";
    OnEvent["open_link"] = "open_link";
  })(OnEvent || (OnEvent = {}));
  var WidgetEventSignal;
  (function (WidgetEventSignal) {
    WidgetEventSignal["ready"] = "ready";
    WidgetEventSignal["connection_success"] = "connection_success";
    WidgetEventSignal["connection_error"] = "connection_error";
    WidgetEventSignal["user_created"] = "user_created";
    WidgetEventSignal["completed"] = "completed";
    WidgetEventSignal["open_link"] = "open_link";
    WidgetEventSignal["close"] = "close";
  })(WidgetEventSignal || (WidgetEventSignal = {}));

  var Dispatcher = /*#__PURE__*/function () {
    function Dispatcher() {
      this.events = {};
    }
    var _proto = Dispatcher.prototype;
    _proto.register = function register(event, callback) {
      if (typeof event !== 'string') {
        throw new Error('Event must be a string');
      }
      if (typeof callback !== 'function') {
        throw new Error('Callback must be a function');
      }
      if (this.events[event] === undefined) {
        this.events[event] = {
          listeners: []
        };
      }
      this.events[event].listeners.push(callback);
    };
    _proto.remove = function remove(event, callback) {
      if (this.events[event] === undefined) {
        throw new Error('Event does not exist');
      }
      this.events[event].listeners = this.events[event].listeners.filter(function (listener) {
        return listener.toString() !== callback.toString();
      });
    };
    _proto.dispatch = function dispatch(event, result) {
      if (this.events[event] === undefined) return;
      this.events[event].listeners.forEach(function (listener) {
        listener(result, event);
      });
    };
    _proto.clear = function clear() {
      var _this = this;
      Object.entries(this.events).map(function (_ref) {
        var event = _ref[0],
          listeners = _ref[1].listeners;
        listeners.forEach(function (listener) {
          _this.remove(event, listener);
        });
      });
    };
    return Dispatcher;
  }();

  var Link = /*#__PURE__*/function () {
    function Link(widgetId) {
      var _this = this;
      this.widgetId = widgetId;
      this.frameId = '';
      this.dispatcher = new Dispatcher();
      this.messageEventListener = function (_ref) {
        var data = _ref.data;
        _this.handleEvent(data);
      };
    }
    var _proto = Link.prototype;
    _proto.handleEvent = function handleEvent(event) {
      if (!event || !Object.values(WidgetEventSignal).includes(event.signal)) return;
      this.dispatcher.dispatch(event.signal, event.response);
    };
    _proto.registerEventLister = function registerEventLister() {
      window.addEventListener('message', this.messageEventListener);
    };
    _proto.destroy = function destroy() {
      window.removeEventListener('message', this.messageEventListener);
      removeFrame(this.frameId);
      this.dispatcher.clear();
    };
    _proto.render = function render(containerId, options) {
      validateRenderArguments(containerId, options);
      this.frameId = renderFrame(this.widgetId, containerId, options);
      this.registerEventLister();
      return this;
    };
    _proto.on = function on(event, callback) {
      if (!Object.values(OnEvent).includes(event)) return;
      this.dispatcher.register(event, callback);
    };
    return Link;
  }();

  var loadLink = /*#__PURE__*/function () {
    var _ref = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(publicApiKey, widgetId) {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            validateLoadArguments(publicApiKey, widgetId);
            _context.next = 3;
            return validateCredentials(publicApiKey, widgetId);
          case 3:
            return _context.abrupt("return", new Link(widgetId));
          case 4:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function loadLink(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  exports.loadLink = loadLink;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=palenca.umd.development.js.map
