/// <reference path = '../../vendor/babylonjs/babylon.d.ts' /> 
//this is for vscode intellisense ^

import { engine, canvas } from "../core/LoadEngine.js";

import "../util/cameraMove.js"
import { textBox } from "../util/textBox.js";

const createScene = () => {
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0.5, 0.6, 0.5);

    var model;

    BABYLON.SceneLoader.ImportMesh(
        undefined, // Name of meshes to load
        "../assets/projection/", // Path on a server for the file
        "scene.glb", // The file name that should be loaded from the above path
        scene, // The scene to load this mesh/model file into
    );

    scene.animationTimeScale = 1;

    const camera = new BABYLON.ArcRotateCamera("camera", Math.PI, Math.PI / 2.5, 60, new BABYLON.Vector3(0, 0, 0));
    camera.upperRadiusLimit = 200;
    camera.lowerRadiusLimit = 30;
    //camera.zoomToMouseLocation = true;

    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

    // GUI
    var plane = BABYLON.MeshBuilder.CreatePlane("plane", {size: 10});
    //plane.parent = sphere;
    plane.position.x = 10;
    //plane.rotate(BABYLON.Vector3(0, 1, 0), Math.PI/2)

    plane.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;

    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(plane);
    var b_exhaust = BABYLON.GUI.Button.CreateSimpleButton("but1", "Exhaust");
    b_exhaust.width = 0.4;
    b_exhaust.height = 0.2;    ;
    b_exhaust.color = "white";
    b_exhaust.fontSize = 100;
    b_exhaust.background = "blue";
    b_exhaust.alpha = 0.5;
    b_exhaust.onPointerUpObservable.add(function() {
        camera.moveTo("target", new BABYLON.Vector3(0, 3, -5), 600);
        camera.moveTo("position", new BABYLON.Vector3(22, 2, 26), 200);

        var t1 = new textBox(camera.detachControl(), camera.attachControl(scene, true), scene);

        //stop the smoke after 5s
        setTimeout(() => {
           //particleSystem.stop();
           t1.destroy();
        }, 2000);
    });
    advancedTexture.addControl(b_exhaust);

    return scene;
};

export var Projection = createScene();