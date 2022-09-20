/// <reference path = '../vendor/babylonjs/babylon.d.ts' /> 
//this is for vscode intellisense ^

import * as BABYLON from "../vendor/babylonjs/babylon.js";

BABYLON.ArcRotateCamera.prototype.moveTo = function (whichprop, targetval, speed) {
    var ease = new BABYLON.CubicEase();
    ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEIN);
	BABYLON.Animation.CreateAndStartAnimation('at4', this, whichprop, speed, 240, this[whichprop], targetval, 0, ease);
}

BABYLON.Mesh.prototype.moveTo = function (whichprop, targetval, speed) {
    var ease = new BABYLON.CubicEase();
    ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
	BABYLON.Animation.CreateAndStartAnimation('at4', this, whichprop, speed, 240, this[whichprop], targetval, 0, ease);
}