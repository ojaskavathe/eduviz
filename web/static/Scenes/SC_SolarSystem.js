/// <reference path = '../../vendor/babylonjs/babylon.d.ts' /> 
//this is for vscode intellisense ^

import { engine, canvas } from "../core/LoadEngine.js";

import { glButton } from "../util/glButton.js";

//var particleSystem;

const createScene = () => {
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0.45, 0.45, 0.55);
    BABYLON.SceneLoader.ImportMesh(
        undefined, // Name of meshes to load
        "../assets/solarSystem/", // Path on a server for the file
        "solarSystem1.glb", // The file name that should be loaded from the above path
        scene, // The scene to load this mesh/model file into
        (meshes, particleSystem, skeletons, animationGroups) => { //on load
            animationGroups[0].speedRatio = 1;
        }
    );

    const camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 3, Math.PI / 2.5, 600, new BABYLON.Vector3(0, 0, 0));
    //camera.upperRadiusLimit = 200;
    camera.lowerRadiusLimit = 100;
    camera.wheelPrecision = 0.7; //camera speed -> lower is faster
    //camera.zoomToMouseLocation = true;

    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

    // scene.onPointerPick = function (evt, pickInfo) {
    //     //Show delete button if there is a picked mesh
    //     if (pickInfo.pickedMesh) {
    //         var selectedMesh = pickInfo.pickedMesh;
    //         console.log(selectedMesh.position);
    //         camera.moveTo("target", selectedMesh.position, 6000);
    //     }
    // }

    return scene;
};

export var SolarSystem = createScene();