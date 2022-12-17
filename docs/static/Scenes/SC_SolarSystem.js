/// <reference path = '../../vendor/babylonjs/babylon.d.ts' /> 
//this is for vscode intellisense ^

import { engine, canvas } from "../core/LoadEngine.js";

const createScene = () => {
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0.1, 0.1, 0.15);
    
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 0, 0));
    light.intensity = 0.03;

    const pointLight = new BABYLON.PointLight("sun", new BABYLON.Vector3(0, 0, 0), scene);
    pointLight.intensity = 500000.0;

    BABYLON.SceneLoader.ImportMesh(
        undefined, // Name of meshes to load
        "/eduviz/assets/solarSystem/", // Path on a server for the file
        "solarSystem.glb", // The file name that should be loaded from the above path
        scene, // The scene to load this mesh/model file into
        (meshes, particleSystem, skeletons, animationGroups) => { //on load
            animationGroups[0].speedRatio = 1;
        }
    );
    
    scene.animationTimeScale = 0.1;

    var gl = new BABYLON.GlowLayer("glow", scene);
    gl.intensity = 1.0;

    const camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 3, Math.PI / 2.5, 600, new BABYLON.Vector3(0, 0, 0));
    //camera.upperRadiusLimit = 200;
    camera.lowerRadiusLimit = 100;
    camera.wheelPrecision = 0.7; //camera speed -> lower is faster
    //camera.zoomToMouseLocation = true;

    camera.attachControl(canvas, true);

    function cameraLock(_term){
        camera.lockedTarget = scene.getMeshByName(_term);
        if(_term == "Sun") camera.radius = 400;
        else camera.radius = 100;
    };

    const planets = [
        "Sun",
        "Mercury",
        "Venus",
        "Earth",
        "Mars",
        "Jupiter",
        "Saturn",
        "Uranus",
        "Neptune"
    ];

    planets.forEach(function (_planet, _index) {
        openFromDef(_planet, ()=>{cameraLock(_planet)});
    });

    scene.onPointerDown = function(evt, pickInfo) {
        if(pickInfo.hit && planets.includes(pickInfo.pickedMesh.name)) {
            openDef(pickInfo.pickedMesh.name);
            cameraLock(pickInfo.pickedMesh.name);
        }
    }

    return scene;
};

export var SolarSystem = createScene();