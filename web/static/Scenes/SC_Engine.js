/// <reference path = '../../vendor/babylonjs/babylon.d.ts' /> 
//this is for vscode intellisense ^

import { engine, canvas } from "../core/LoadEngine.js";

import { textBox } from "../util/textBox.js";
import { smoke } from "../util/smokeParticles.js";
import { glButton } from "../util/glButton.js";

var particleSystem;

const createScene = () => {
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0.5, 0.6, 0.5);
    BABYLON.SceneLoader.ImportMesh(
        undefined, // Name of meshes to load
        "../assets/engine/", // Path on a server for the file
        "pistonAnim.glb", // The file name that should be loaded from the above path
        scene, // The scene to load this mesh/model file into
        function (meshes, particleSystem, skeletons, animationGroups) {
            animationGroups[0].speedRatio = 10;
        }
    );

    const camera = new BABYLON.ArcRotateCamera("camera", Math.PI, Math.PI / 2.5, 60, new BABYLON.Vector3(0, 3, -5));
    camera.upperRadiusLimit = 200;
    camera.lowerRadiusLimit = 30;
    //camera.zoomToMouseLocation = true;

    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

    // Create a particle system
    particleSystem = new BABYLON.ParticleSystem("particles", 8000, scene);
    //Texture of each particle
    particleSystem.particleTexture = new BABYLON.Texture("https://raw.githubusercontent.com/PatrickRyanMS/BabylonJStextures/master/FFV/smokeParticleTexture.png", scene);
    smoke(particleSystem);

    // GUI
    var b_exhaust = new glButton(() => {
        //Switch();
        camera.moveTo("target", new BABYLON.Vector3(0, 3, -5), 600);
        camera.moveTo("position", new BABYLON.Vector3(22, 2, 26), 200);

        particleSystem.start();
        //if(timer < 2)
        var t1 = new textBox(camera.detachControl(), camera.attachControl(scene, true), scene);

        //stop the smoke after 5s
        setTimeout(() => {
           particleSystem.stop();
           t1.destroy();
        }, 2000);
    }, scene, "Exhaust")
    
    return scene;
};
export var IC_Engine = createScene();