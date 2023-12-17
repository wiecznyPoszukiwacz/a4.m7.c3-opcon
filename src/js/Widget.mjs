"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Widget = exports.Point = void 0;
/**
 * 2d coordinates
 */
var Point = /** @class */ (function () {
    function Point(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    return Point;
}());
exports.Point = Point;
var Widget = /** @class */ (function () {
    function Widget(p5, options) {
        this.p5 = p5;
        this.options = options;
        this.margin = 5;
        this.w = this.options.w;
        this.h = this.options.h;
        this.center = new Point(this.w / 2, this.h / 2);
        this.leftMid = new Point(this.margin, this.center.y);
        this.rightMid = new Point(this.w - this.margin, this.center.y);
        this.sy = this.margin;
        this.ey = this.h - this.margin;
        this.dw = this.w - 2 * this.margin;
        this.dh = this.h - 2 * this.margin;
        this.r = Math.ceil(Math.max(this.dw, this.dh) / 2);
    }
    /**
     * return coordinates of point on circe
     *
     * @param p coordinates of circle center
     * @param r circle radius
     * @param a angle
     */
    Widget.prototype.getPointOnCircle = function (p, r, a) {
        return new Point(this.p5.cos(a) * r + p.x, this.p5.sin(a) * r + p.y);
    };
    Widget.prototype.setStyle = function (style) {
        if (style.strokeWeight) {
            this.p5.strokeWeight(style.strokeWeight);
        }
        if (style.lineDash !== undefined) {
            this.p5.drawingContext.setLineDash(Array.isArray(style.lineDash) ? style.lineDash : []);
        }
        if (style.fill !== undefined) {
            //style.fill ? this.p5.fill(itemColor) : this.p5.noFill()
        }
    };
    Widget.prototype.onDraw = function () { };
    Widget.prototype.draw = function () {
        this.p5.translate(this.options.x, this.options.y);
        this.p5.noFill();
        // border
        this.p5.rect(0, 0, this.options.w, this.options.h);
        this.onDraw();
    };
    Widget.prototype.circle = function (center, radius) {
        this.p5.circle(center.x, center.y, radius * 2);
        return this;
    };
    Widget.prototype.line = function (p1, p2) {
        this.p5.line(p1.x, p1.y, p2.x, p2.y);
        return this;
    };
    return Widget;
}());
exports.Widget = Widget;
