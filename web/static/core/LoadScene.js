/// <reference path = '../../vendor/babylonjs/babylon.d.ts' /> 
//this is for vscode intellisense ^

import { engine } from "./LoadEngine.js"
import { GetSw } from "./SwitchUtil.js";

import { Projection } from "../Scenes/SC_Projection.js"
import { IC_Engine } from "../Scenes/SC_Engine.js"
import { About } from "../Scenes/SC_About.js";

export var onSwitch = function(){
    if(GetSw() == 0)
    {
        Projection.detachControl();
        About.detachControl();
        IC_Engine.attachControl();
    }
    else
    {
        IC_Engine.detachControl();
        About.detachControl();
        Projection.attachControl();
    }
}

export var onAbout = function(){
    Projection.detachControl();
    IC_Engine.detachControl();
    About.attachControl();
}

engine.runRenderLoop(() => {
    if(GetSw() == 0)
        IC_Engine.render();
    else if(GetSw() == 1)
        Projection.render();
    else if(GetSw() == 2)
        About.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});