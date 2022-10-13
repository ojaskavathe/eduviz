/// <reference path = '../../vendor/babylonjs/babylon.d.ts' /> 
//this is for vscode intellisense ^

import { SetSw, Switch } from "./SwitchUtil.js";
import { onAbout, onSwitch, onReset } from "./LoadScene.js";

const switchButton = document.getElementById('switchScene');
const aboutButton = document.getElementById('about');
const resetButton = document.getElementById('resetButton');

// ✅ Works
switchButton.onclick = function () {
  Switch();
  onSwitch();
};

aboutButton.onclick = function () {
  SetSw(2);
  onAbout();
};

resetButton.onclick = function () {
  onReset();
};

