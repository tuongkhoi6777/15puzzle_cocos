window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
        o = b;
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  GameLoader: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "19c4aFPWTlCkKn3gmuxbuV1", "GameLoader");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NewClass = function(_super) {
      __extends(NewClass, _super);
      function NewClass() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.Square = null;
        _this.PauseMenu = null;
        _this.MainMenu = null;
        _this.ValueList = [];
        _this.Rows = 4;
        _this.Columns = 4;
        _this.Timer = 0;
        _this.isPaused = false;
        return _this;
      }
      NewClass.prototype.onLoad = function() {
        var _this = this;
        this.PauseMenu.active = false;
        this.PauseMenu.getChildByName("Continue Button").on("click", function() {
          return _this.ContinueGame(_this.CheckGameEnd());
        });
        this.node.parent.getChildByName("Pause Button").on("click", function() {
          return _this.PauseGame();
        });
        this.node.parent.getChildByName("Reset Button").on("click", function() {
          return _this.ResetGame();
        });
        this.node.parent.getChildByName("Back To Menu Button").on("click", function() {
          return _this.BackToMenu();
        });
      };
      NewClass.prototype.onEnable = function() {
        this.ResetGame();
      };
      NewClass.prototype.start = function() {
        this.ResetGame();
      };
      NewClass.prototype.SetValueList = function(rows, columns) {
        this.ValueList = [];
        for (var i = 0; i < rows; i++) for (var j = 0; j < columns; j++) {
          var value = i * columns + j;
          0 !== value && this.ValueList.push(value);
        }
      };
      NewClass.prototype.Init = function(rows, columns) {
        var layout = this.node.getComponent(cc.Layout);
        layout.cellSize = cc.size((this.node.width - layout.paddingLeft) / columns - layout.spacingX, (this.node.height - layout.paddingTop) / rows - layout.spacingY);
        this.CreateChildren();
      };
      NewClass.prototype.CreateChildren = function() {
        var _this = this;
        this.node.removeAllChildren();
        this.ValueList.forEach(function(value, index) {
          if (0 !== value) {
            var newSquare = cc.instantiate(_this.Square);
            newSquare.width = _this.node.getComponent(cc.Layout).cellSize.width;
            newSquare.height = _this.node.getComponent(cc.Layout).cellSize.height;
            newSquare.getComponent("Square").Init(value, index);
            newSquare.on("touchstart", function() {
              return _this.Onclick(index);
            });
            _this.node.addChild(newSquare);
          } else {
            var node = new cc.Node("Blank");
            _this.node.addChild(node);
          }
        });
      };
      NewClass.prototype.Shuffle = function(array) {
        var _a, _b;
        var currentIndex = 0;
        while (currentIndex < array.length) {
          var randomIndex = Math.floor(Math.random() * (array.length - currentIndex) + currentIndex);
          _a = [ array[randomIndex], array[currentIndex] ], array[currentIndex] = _a[0], array[randomIndex] = _a[1];
          currentIndex++;
        }
        var inversion = 0;
        for (var i = 0; i < array.length - 1; i++) {
          var count = 0;
          for (var j = i + 1; j < array.length; j++) array[i] > array[j] && count++;
          console.log(count);
          inversion += count;
        }
        console.log(inversion);
        inversion % 2 !== 0 && (_b = [ array[1], array[0] ], array[0] = _b[0], array[1] = _b[1]);
      };
      NewClass.prototype.Onclick = function(index) {
        var _a;
        var blankIndex = this.ValueList.findIndex(function(value) {
          return 0 === value;
        });
        if (Math.floor(index / this.Columns) === Math.floor(blankIndex / this.Columns) && 1 === Math.abs(index - blankIndex) || Math.abs(index - blankIndex) === this.Columns) {
          _a = [ this.ValueList[blankIndex], this.ValueList[index] ], this.ValueList[index] = _a[0], 
          this.ValueList[blankIndex] = _a[1];
          this.CreateChildren();
        }
      };
      NewClass.prototype.CheckGameEnd = function() {
        var isAllCorrect = true;
        this.ValueList.forEach(function(value, index) {
          value - index !== 1 && 0 !== value && (isAllCorrect = false);
        });
        return isAllCorrect;
      };
      NewClass.prototype.BackToMenu = function() {
        this.PauseMenu.active = false;
        this.node.parent.active = false;
        this.MainMenu.active = true;
      };
      NewClass.prototype.PauseGame = function() {
        this.PauseMenu.active = true;
        this.isPaused = true;
      };
      NewClass.prototype.ResetGame = function() {
        this.SetValueList(this.Rows, this.Columns);
        this.Shuffle(this.ValueList);
        this.ValueList.push(0);
        this.Init(this.Rows, this.Columns);
        this.Timer = 0;
      };
      NewClass.prototype.ContinueGame = function(isGameEnd) {
        this.PauseMenu.active = false;
        this.isPaused = false;
        isGameEnd && this.ResetGame();
      };
      NewClass.prototype.GetTime = function() {
        var seconds = Math.floor(this.Timer) % 60;
        var minutes = Math.floor(this.Timer / 60);
        var time = "";
        time += minutes < 10 ? "0" + minutes + " : " : minutes + " : ";
        time += seconds < 10 ? "0" + seconds : seconds;
        return {
          time: time,
          seconds: seconds,
          minutes: minutes
        };
      };
      NewClass.prototype.update = function(dt) {
        this.isPaused || (this.Timer += dt);
        this.node.parent.getChildByName("TimerLabel").getComponent(cc.Label).string = this.GetTime().time;
        if (this.CheckGameEnd()) {
          this.PauseMenu.active = true;
          this.isPaused = true;
          this.PauseMenu.getChildByName("PauseMenuLabel").getComponent(cc.Label).string = "Good jobs, you complete the puzzle in " + this.GetTime().minutes + " minutes and " + this.GetTime().seconds + " seconds!!! \n Do you want to play again???";
        }
      };
      __decorate([ property(cc.Prefab) ], NewClass.prototype, "Square", void 0);
      __decorate([ property(cc.Node) ], NewClass.prototype, "PauseMenu", void 0);
      __decorate([ property(cc.Node) ], NewClass.prototype, "MainMenu", void 0);
      NewClass = __decorate([ ccclass ], NewClass);
      return NewClass;
    }(cc.Component);
    exports.default = NewClass;
    cc._RF.pop();
  }, {} ],
  MainMenu: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0d6ddvENtFDF4kCVnR4byvl", "MainMenu");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NewClass = function(_super) {
      __extends(NewClass, _super);
      function NewClass() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      NewClass.prototype.onLoad = function() {
        this.node.parent.getChildByName("InGame").active = false;
        this.node.parent.getChildByName("PauseMenu").active = false;
        this.node.getChildByName("Play Game Button").on("click", this.startGame, this);
      };
      NewClass.prototype.startGame = function() {
        this.node.active = false;
        this.node.parent.getChildByName("InGame").active = true;
      };
      NewClass = __decorate([ ccclass ], NewClass);
      return NewClass;
    }(cc.Component);
    exports.default = NewClass;
    cc._RF.pop();
  }, {} ],
  Square: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "93b2ath8UFOMKZn0R51zLx6", "Square");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NewClass = function(_super) {
      __extends(NewClass, _super);
      function NewClass() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.Value = 0;
        _this.Index = 0;
        return _this;
      }
      NewClass.prototype.Init = function(value, index) {
        this.Index = index;
        this.Value = value;
        this.node.getChildByName("NumberLabel").getComponent(cc.Label).string = value.toString();
        this.node.getChildByName("BorderTop").setContentSize(cc.size(this.node.getContentSize().width, 2));
        this.node.getChildByName("BorderBottom").setContentSize(cc.size(this.node.getContentSize().width, 2));
        this.node.getChildByName("BorderLeft").setContentSize(cc.size(2, this.node.getContentSize().height));
        this.node.getChildByName("BorderRight").setContentSize(cc.size(2, this.node.getContentSize().height));
      };
      NewClass.prototype.update = function(dt) {
        if (this.Value - this.Index === 1) {
          this.node.color = cc.color(0, 255, 155, 255);
          this.node.getChildByName("NumberLabel").color = cc.color(0, 155, 0, 255);
        } else {
          this.node.color = cc.color(0, 255, 255, 255);
          this.node.getChildByName("NumberLabel").color = cc.color(0, 0, 255, 255);
        }
      };
      NewClass = __decorate([ ccclass ], NewClass);
      return NewClass;
    }(cc.Component);
    exports.default = NewClass;
    cc._RF.pop();
  }, {} ]
}, {}, [ "GameLoader", "MainMenu", "Square" ]);