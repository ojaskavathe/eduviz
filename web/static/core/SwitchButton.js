/// <reference path = '../../vendor/babylonjs/babylon.d.ts' /> 
//this is for vscode intellisense ^

import { GetSw, Switch } from "./SwitchUtil.js";
import { onSwitch } from "./LoadScene.js";

const button = document.getElementById('switchScene');

// ✅ Works
button.onclick = function () {
  Switch();
  onSwitch();
};

