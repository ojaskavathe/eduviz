/// <reference path = '../../vendor/babylonjs/babylon.d.ts' /> 
//this is for vscode intellisense ^

import "../util/cameraMove.js"

import { engine } from "./LoadEngine.js"
import { GetSw } from "./SwitchUtil.js";

import { Projection } from "../Scenes/SC_Projection.js"
import { IC_Engine } from "../Scenes/SC_Engine.js"
import { About } from "../Scenes/SC_About.js";

var currentScene = IC_Engine;

export var onSwitch = function(){
    if(GetSw() == 0)
    {
        currentScene = IC_Engine;
        Projection.detachControl();
        About.detachControl();
        IC_Engine.attachControl();
    }
    else
    {
        currentScene = Projection;
        IC_Engine.detachControl();
        About.detachControl();
        Projection.attachControl();
    }
}

export var onAbout = function(){
    currentScene = About;
    Projection.detachControl();
    IC_Engine.detachControl();
    About.attachControl();
}

export var onReset = function(){
    currentScene.getCameraByName("camera").moveTo("target", new BABYLON.Vector3(0, 0, 0), 600);
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