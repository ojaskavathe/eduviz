/// <reference path = '../../vendor/babylonjs/babylon.d.ts' /> 
//this is for vscode intellisense ^

import { engine, canvas } from "../core/LoadEngine.js";

import "../util/cameraMove.js"
import { textBox } from "../util/textBox.js";
import { glButton } from "../util/glButton.js";

const createScene = () => {
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0.45, 0.45, 0.55);

    BABYLON.SceneLoader.ImportMesh(
        undefined, // Name of meshes to load
        "/eduviz/assets/projection/", // Path on a server for the file
        "scene.glb", // The file name that should be loaded from the above path
        scene, // The scene to load this mesh/model file into
    );

    scene.animationTimeScale = 1;

    const camera = new BABYLON.ArcRotateCamera("camera", Math.PI/2, Math.PI / 2.5, 60, new BABYLON.Vector3(0, 0, 0));
    //camera.upperRadiusLimit = 200;
    camera.lowerRadiusLimit = 30;
    //camera.zoomToMouseLocation = true;

    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

    // GUI
    function onMethane(){
        camera.detachControl();
        camera.moveTo("target", new BABYLON.Vector3(-10, 0, 0), 600);
        camera.moveTo("position", new BABYLON.Vector3(-25, 10, 26), 200);
        setTimeout(camera.attachControl(scene, true), 1000);
    }
    openFromDef("Methane", onMethane);
    var b_methane = new glButton(() => {
        openDef("Methane");
        onMethane();
    }, scene, "Methane")
    b_methane.plane.position = new BABYLON.Vector3(-12.0, 4.0, 0.0);

    function onEthane(){
        camera.detachControl();
        camera.moveTo("target", new BABYLON.Vector3(5, 0, 0), 600);
        camera.moveTo("position", new BABYLON.Vector3(20, -10, 30), 200);
        setTimeout(camera.attachControl(scene, true), 1000);
    }
    openFromDef("Ethane", onEthane);
    var b_ethane = new glButton(() => {
        openDef("Ethane");
        onEthane();
    }, scene, "Ethane")
    b_ethane.plane.position = new BABYLON.Vector3(-12.0, -4.0, 0.0);

    return scene;
};

export var Projection = createScene();