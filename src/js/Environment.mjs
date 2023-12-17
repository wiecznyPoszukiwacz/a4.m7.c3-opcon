"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Environment = void 0;
var acorn = require("acorn");
var awalk = require("acorn-walk");
var Environment = /** @class */ (function () {
    function Environment() {
    }
    Environment.prototype.setTerminal = function (terminal) {
        this.terminal = terminal;
    };
    Environment.prototype.execute = function (command) {
        var _this = this;
        var ast = acorn.parse(command, { ecmaVersion: 2024 });
        var scope = {
            a: function (p) { return p * 5; },
            b: 7
        };
        var getNodeValue = function (node) {
            if (node.type === 'Literal') {
                return node.value;
            }
            else if (node.type === 'Identifier') {
                var n = node;
                return scope[n.name];
            }
            else if (node.type === 'CallExpression') {
                var n = node;
                var callee = getNodeValue(n.callee);
                var args = n.arguments.map(function (n) { return getNodeValue(n); });
                var wynik = callee.apply(void 0, args);
                return wynik;
            }
            else if (node.type === 'Program') {
            }
            else if (node.type === 'ExpressionStatement') {
                /*
                const n = (node as acorn.ExpressionStatement)

                return getNodeValue(n.expression)
                */
                return null;
            }
            else {
                _this.terminal.line('---- unknown node type');
                _this.terminal.dir(node);
                return null;
            }
        };
        awalk.full(ast, function (node) {
            var _a;
            var value = getNodeValue(node);
            _this.terminal.line((_a = value === null || value === void 0 ? void 0 : value.toString()) !== null && _a !== void 0 ? _a : '-no-value-');
        });
    };
    return Environment;
}());
exports.Environment = Environment;
