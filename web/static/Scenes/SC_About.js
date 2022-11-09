/// <reference path = '../../vendor/babylonjs/babylon.d.ts' /> 
//this is for vscode intellisense ^

import { engine, canvas } from "../core/LoadEngine.js";

import { textBox } from "../util/textBox.js";

const createScene = () => {
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0.5, 0.6, 0.5);

    scene.animationTimeScale = 1;

    const camera = new BABYLON.ArcRotateCamera("camera", Math.PI, Math.PI / 2.5, 60, new BABYLON.Vector3(0, 0, 0));
    //camera.upperRadiusLimit = 200;
    camera.lowerRadiusLimit = 30;
    camera.lowerAlphaLimit = Math.PI * 3/4;
    camera.upperAlphaLimit = Math.PI * 5/4;

    camera.lowerBetaLimit = Math.PI * 1/4;
    camera.upperBetaLimit = Math.PI * 3/4;
    //camera.zoomToMouseLocation = true;

    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 0, 0));

    var title = new textBox(camera.detachControl(), camera.attachControl(scene, true), scene);
    title.sv.addControl(title.tb);
    title.sv.height = 0.2;
    title.sv.width = 1;

    title.tb.paddingTop = "20%";
    title.tb.paddingLeft = "30px";
    title.tb.paddingRight = "20px"
    title.tb.paddingBottom = "5%";
    title.tb.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    title.tb.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    title.tb.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    title.tb.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    title.tb.color = "red";
    title.tb.background = "yellow";


    title.tb.text = "About Us";
    title.tb.fontSize = 95;

    title.plane.position = new BABYLON.Vector3(0.0, 15.0, 0.0);
    title.plane.rotate(new BABYLON.Vector3(0, 1, 0), -Math.PI/2)

    
    var contents = new textBox(camera.detachControl(), camera.attachControl(scene, true), scene, {size:50});
    contents.tb.text = "We are a group of students from KJ Somaiya Institute of Engineering and Information Technology.\n\nWe created this website to make learning concepts in 3D much easier. Enjoy a curated set of hand modelled and hand animated assets, in a fully interactable environment.\n\n Have fun and learn!";
    contents.sv.width = 1;
    contents.plane.position = new BABYLON.Vector3(0.0, 0.0, 0.0);
    contents.plane.rotate(new BABYLON.Vector3(0, 1, 0), -Math.PI/2)
        
    return scene;
};

export var About = createScene();