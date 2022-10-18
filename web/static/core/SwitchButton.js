/// <reference path = '../../vendor/babylonjs/babylon.d.ts' /> 
//this is for vscode intellisense ^

import { SetSw, Switch } from "./SwitchUtil.js";
import { onAbout, onSwitch, onReset } from "./LoadScene.js";

const icengine = document.getElementById('sc_icengine');
const projection = document.getElementById('sc_projection');
const lungs = document.getElementById('sc_lungs');
const aboutButton = document.getElementById('about')
const resetButton = document.getElementById('resetButton');

// ✅ Works
icengine.onclick = function () {
  SetSw(0);
  onSwitch();
};

projection.onclick = function () {
  SetSw(1);
  onSwitch();
};

lungs.onclick = function () {
  SetSw(2);
  onSwitch();
};


aboutButton.onclick = function () {
  SetSw(3);
  onAbout();
};

resetButton.onclick = function () {
  onReset();
};

