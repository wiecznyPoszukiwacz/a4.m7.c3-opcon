"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./js/Display.mts");
require("./style/style.css");
var Terminal_mts_1 = require("./js/Terminal.mts");
var Environment_mts_1 = require("./js/Environment.mts");
var terminal = new Terminal_mts_1.OpTerminal();
var environment = new Environment_mts_1.Environment();
environment.setTerminal(terminal);
terminal.onCommand(function (command) {
    environment.execute(command);
});
