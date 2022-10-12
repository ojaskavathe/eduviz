/// <reference path = '../../vendor/babylonjs/babylon.d.ts' /> 
//this is for vscode intellisense ^

import { engine } from "./LoadEngine.js"
import { GetSw, Switch } from "./SwitchUtil.js";

import { Projection } from "../Scenes/SC_Projection.js"
import { IC_Engine } from "../Scenes/SC_Engine.js"

export var onSwitch = function(){
    if(GetSw() == 0)
    {
        Projection.detachControl();
        IC_Engine.attachControl();
    }
    else
    {
        IC_Engine.detachControl();
        Projection.attachControl();
    }
}

engine.runRenderLoop(() => {
    if(GetSw() == 0)
        IC_Engine.render();
    else
        Projection.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});