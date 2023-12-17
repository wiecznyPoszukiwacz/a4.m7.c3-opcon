"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var p5_1 = require("p5");
var Ground_mts_1 = require("./widgets/Ground.mts");
var widgets = [];
var sketch = function (p5) {
    p5.setup = function () {
        var display = document.getElementById('display');
        if (!display) {
            throw new Error('no #display element found');
        }
        var canvas = p5.createCanvas(display.offsetWidth, display.offsetHeight);
        canvas.parent('display');
        p5.stroke(p5.color('#eaeaea'));
        p5.strokeWeight(1);
        p5.frameRate(12);
        p5.angleMode(p5.DEGREES);
    };
    // The sketch draw method
    p5.draw = function () {
        p5.background("#102040");
        for (var _i = 0, widgets_1 = widgets; _i < widgets_1.length; _i++) {
            var widget = widgets_1[_i];
            widget.draw();
        }
    };
};
var p5 = new p5_1.default(sketch);
widgets.push(new Ground_mts_1.GroundView(p5, {
    w: 150,
    h: 150,
    x: 10,
    y: 10
}));
