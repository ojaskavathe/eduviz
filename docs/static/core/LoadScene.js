/// <reference path = '../../vendor/babylonjs/babylon.d.ts' /> 
//this is for vscode intellisense ^

import "../util/cameraMove.js"

import { engine } from "./LoadEngine.js"
import { GetSw } from "./SwitchUtil.js"

import { ICEngine } from "../Scenes/SC_ICEngine.js"
import { Projection } from "../Scenes/SC_Projection.js"
import { Lungs } from "../Scenes/SC_Lungs.js"
import { About } from "../Scenes/SC_About.js"
import { SolarSystem } from "../Scenes/SC_SolarSystem.js"

var scenes = [
    ICEngine,
    Projection,
    Lungs,
    SolarSystem,
    About
]

detachScenes();
var currentScene = scenes[0];
currentScene.attachControl();

export var onSwitch = function(){

    detachScenes();

    $("#defs").empty();

    var cam = currentScene.getCameraByName("camera");

    setTimeout(() => {
        currentScene = scenes[GetSw()];
        if(currentScene == scenes[3]) //solarSystem
        {
            $("#titlebar h1").css("color", "white");
            $("#titlebar button").css("color", "white");
            $("#reset button").css("color", "white");
        } else 
        {
            $("#titlebar h1").css("color", "rgb(0, 0, 0, 0.8)");
            $("#titlebar button").css("color", "black");
            $("#reset button").css("color", "black");
        }
        currentScene.attachControl();
    }, 200);

}

export var onAbout = function(){
    detachScenes();
    currentScene = scenes[4];
    currentScene.attachControl();
}

export var onReset = function(){

    if(currentScene == scenes[3]) //Solar System
    {
        var cam = currentScene.getCameraByName("camera");
        cam.lockedTarget = null;
        cam.moveTo("target", new BABYLON.Vector3(0, 0, 0), 6000);
        cam.moveTo("radius", 600, 6000);
    } else 
    {
        var cam = currentScene.getCameraByName("camera");
        cam.moveTo("target", new BABYLON.Vector3(0, 0, 0), 600);
        cam.moveTo("radius", 60, 600);            
    } 
}

engine.runRenderLoop(() => {
    engine.resize();
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