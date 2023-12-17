"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroundView = void 0;
var Widget_mts_1 = require("../Widget.mts");
var GroundView = /** @class */ (function (_super) {
    __extends(GroundView, _super);
    function GroundView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.angle = 0;
        return _this;
    }
    GroundView.prototype.onDraw = function () {
        var targetAngle = (new Date().getSeconds()) * 6;
        this.angle += (targetAngle - this.angle) / 2;
        var starPathRadius = this.r * 0.75;
        this.setStyle({ lineDash: [1, 4] });
        this.circle(this.center, starPathRadius);
        var starPosition = this.getPointOnCircle(this.center, starPathRadius, this.angle);
        if (this.angle > 180) {
            this.line(starPosition, this.center);
        }
        this.setStyle({ lineDash: false, fill: true });
        var starRadius = this.w / 20;
        this.circle(starPosition, starRadius);
        this.line(this.leftMid, this.rightMid);
        for (var x = this.margin + 10; x < this.w; x += 10) {
            this.line({ x: x, y: this.center.y }, { x: x - 10, y: this.center.y + 10 });
        }
    };
    return GroundView;
}(Widget_mts_1.Widget));
exports.GroundView = GroundView;
