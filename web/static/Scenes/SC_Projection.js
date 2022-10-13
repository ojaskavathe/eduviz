/// <reference path = '../../vendor/babylonjs/babylon.d.ts' /> 
//this is for vscode intellisense ^

import { engine, canvas } from "../core/LoadEngine.js";

import "../util/cameraMove.js"
import { textBox } from "../util/textBox.js";
import { glButton } from "../util/glButton.js";

const createScene = () => {
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0.5, 0.6, 0.5);

    BABYLON.SceneLoader.ImportMesh(
        undefined, // Name of meshes to load
        "../assets/projection/", // Path on a server for the file
        "scene.glb", // The file name that should be loaded from the above path
        scene, // The scene to load this mesh/model file into
        
    );

    scene.animationTimeScale = 1;

    const camera = new BABYLON.ArcRotateCamera("camera", Math.PI/2, Math.PI / 2.5, 60, new BABYLON.Vector3(0, 0, 0));
    camera.upperRadiusLimit = 200;
    camera.lowerRadiusLimit = 30;
    //camera.zoomToMouseLocation = true;

    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

    // GUI
    var b_methane = new glButton(() => {
        camera.moveTo("target", new BABYLON.Vector3(-10, 0, 0), 600);
        camera.moveTo("position", new BABYLON.Vector3(-25, 10, 26), 200);

        var t1 = new textBox(camera.detachControl(), camera.attachControl(scene, true), scene);
        t1.tb.text = "yoooo it's methane";
        t1.plane.position = new BABYLON.Vector3(-17.0, 4.0, 0.0);
        setTimeout(() => {
           t1.destroy();
        }, 2000);
    }, scene, "Methane")
    b_methane.plane.position = new BABYLON.Vector3(-12.0, 4.0, 0.0);

    var b_methane = new glButton(() => {
        camera.moveTo("target", new BABYLON.Vector3(5, 0, 0), 600);
        camera.moveTo("position", new BABYLON.Vector3(20, -10, 30), 200);

        var t1 = new textBox(camera.detachControl(), camera.attachControl(scene, true), scene);
        t1.tb.text = "and this be ethane"
        t1.plane.position = new BABYLON.Vector3(17.0, -4.0, 0.0);

        setTimeout(() => {
           t1.destroy();
        }, 2000);
    }, scene, "Ethane")
    b_methane.plane.position = new BABYLON.Vector3(-12.0, -4.0, 0.0);

    return scene;
};

export var Projection = createScene();