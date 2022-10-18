/// <reference path = '../../vendor/babylonjs/babylon.d.ts' /> 
//this is for vscode intellisense ^

import "../util/cameraMove.js"

import { engine } from "./LoadEngine.js"
import { GetSw } from "./SwitchUtil.js"

import { ICEngine } from "../Scenes/SC_ICEngine.js"
import { Projection } from "../Scenes/SC_Projection.js"
import { Lungs } from "../Scenes/SC_Lungs.js"
import { About } from "../Scenes/SC_About.js"


var scenes = [
    ICEngine,
    Projection,
    Lungs,
    About
]

detachScenes();
var currentScene = scenes[0];
currentScene.attachControl();

export var onSwitch = function(){

    detachScenes();

    var cam = currentScene.getCameraByName("camera");

    setTimeout(() => {
        currentScene = scenes[GetSw()];

        currentScene.attachControl();
    }, 200);

}

export var onAbout = function(){
    detachScenes();
    currentScene = scenes[3];
    currentScene.attachControl();
}

export var onReset = function(){
    var cam = currentScene.getCameraByName("camera");
    cam.moveTo("target", new BABYLON.Vector3(0, 0, 0), 600);
    cam.moveTo("radius", 60, 600);
}

engine.runRenderLoop(() => {
    currentScene.render();
});

function detachScenes(){
    for(let i of scenes){
        i.detachControl();
    }
}

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});