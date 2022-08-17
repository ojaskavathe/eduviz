/// <reference path = '../vendor/babylonjs/babylon.d.ts' /> 
//this is for vscode intellisense ^

const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

const createScene = function () {
    const scene = new BABYLON.Scene(engine);

    BABYLON.SceneLoader.ImportMesh(
        undefined, // Name of meshes to load
        "../assets/engine/", // Path on a server for the file
        "pistonAnim.glb", // The file name that should be loaded from the above path
        scene, // The scene to load this mesh/model file into
    );

    scene.animationTimeScale = 10;

    const camera = new BABYLON.ArcRotateCamera("camera", Math.PI, Math.PI / 2.5, 60, new BABYLON.Vector3(0, 3, -5));
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

    return scene;
};

const scene = createScene(); //Call the createScene function

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
    scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});