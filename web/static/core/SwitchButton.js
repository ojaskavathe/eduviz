/// <reference path = '../../vendor/babylonjs/babylon.d.ts' /> 
//this is for vscode intellisense ^

import { SetSw, Switch } from "./SwitchUtil.js";
import { onAbout, onSwitch } from "./LoadScene.js";

const button = document.getElementById('switchScene');
const aboutButton = document.getElementById('about');

// ✅ Works
button.onclick = function () {
  Switch();
  onSwitch();
};

aboutButton.onclick = function () {
  SetSw(2);
  onAbout();
};

