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
        "../assets/lungs/", // Path on a server for the file
        "scene.glb", // The file name that should be loaded from the above path
        scene, // The scene to load this mesh/model file into
        
    );

    scene.animationTimeScale = 1;

    const camera = new BABYLON.ArcRotateCamera("camera", 0, Math.PI / 2, 60, new BABYLON.Vector3(0, 0, 0));
    //camera.upperRadiusLimit = 200;
    camera.lowerRadiusLimit = 10;
    //camera.zoomToMouseLocation = true;

    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

    // GUI

    var b_larynx = new glButton(() => {
        camera.moveTo("target", new BABYLON.Vector3(5, 16, 0), 600);
        camera.moveTo("position", new BABYLON.Vector3(20, 15, 15), 200);

        b_larynx.plane.moveTo("position", new BABYLON.Vector3(0.0, 18.0, 0.0), 300);
        b_larynx.plane.scaling.z = 0.5;

        var t1 = new textBox(camera.detachControl(), camera.attachControl(scene, true), scene);
        t1.tb.text = "this the larynx";
        t1.plane.position = new BABYLON.Vector3(10.0, 18.0, -5.0);
        t1.plane.rotate(new BABYLON.Vector3(0, 1, 0), Math.PI / 6);
        setTimeout(() => {
            b_larynx.plane.moveTo("position", new BABYLON.Vector3(4.0, 18.0, 0.5), 300);
            t1.destroy();
        }, 2000);
    }, scene, "Larynx")

    b_larynx.plane.position = new BABYLON.Vector3(4.0, 18.0, 0.0);

    var b_trachea = new glButton(() => {
        camera.moveTo("target", new BABYLON.Vector3(0, 14, 0), 600);
        camera.moveTo("position", new BABYLON.Vector3(20, 15, -15), 200);

        b_trachea.plane.moveTo("position", new BABYLON.Vector3(10.0, 14.0, 5.0), 300);
        b_trachea.plane.scaling.z = 0.5;

        var t1 = new textBox(camera.detachControl(), camera.attachControl(scene, true), scene);
        t1.tb.text = "yo trachea";
        t1.plane.position = new BABYLON.Vector3(0.0, 15.0, -7.0);
        t1.plane.rotate(new BABYLON.Vector3(0, 1, 0), 1.2 * Math.PI / 2);
        setTimeout(() => {
            b_trachea.plane.moveTo("position", new BABYLON.Vector3(4.0, 14.0, -4.0), 300);
            t1.destroy();
        }, 2000);
    }, scene, "Trachea")
    b_trachea.plane.position = new BABYLON.Vector3(4.0, 14.0, -4.0);

    return scene;
};

export var Lungs = createScene();