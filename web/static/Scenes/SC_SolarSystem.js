/// <reference path = '../../vendor/babylonjs/babylon.d.ts' /> 
//this is for vscode intellisense ^

import { engine, canvas } from "../core/LoadEngine.js";

import { glButton } from "../util/glButton.js";

//var particleSystem;

const createScene = () => {
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0.05, 0.05, 0.1);
    
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 0, 0));
    light.intensity = 0.03;

    const pointLight = new BABYLON.PointLight("sun", new BABYLON.Vector3(0, 0, 0), scene);
    pointLight.intensity = 500000.0;

    BABYLON.SceneLoader.ImportMesh(
        undefined, // Name of meshes to load
        "../assets/solarSystem/", // Path on a server for the file
        "solarSystem1.glb", // The file name that should be loaded from the above path
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
    //const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

    function f(_term){
        camera.lockedTarget = scene.getMeshByName(_term);
    };

    openFromDef("Sun",      ()=>{f("Sun")});
    openFromDef("Mercury",  ()=>{f("Mercury")});
    openFromDef("Venus",    ()=>{f("Venus")});
    openFromDef("Earth",    ()=>{f("Earth")});
    openFromDef("Mars",     ()=>{f("Mars")});
    openFromDef("Jupiter",  ()=>{f("Jupiter")});
    openFromDef("Saturn",   ()=>{f("Saturn")});
    openFromDef("Uranus",   ()=>{f("Uranus")});
    openFromDef("Neptune",  ()=>{f("Neptune")});

    // scene.onPointerPick = function (evt, pickInfo) {
    //     //Show delete button if there is a picked mesh
    //     if (pickInfo.pickedMesh) {
    //         var selectedMesh = pickInfo.pickedMesh;
    //         //console.log(selectedMesh.position);
    //         console.log(scene.getMeshByName("pSphere1_phong1_0"));
    //         //pointLight.excludedMeshes.push(scene.getMeshByName("pSphere1_phong1_0"));	
    //     }
    // }

    scene.onPointerDown = function(evt, pickInfo) {
        if(pickInfo.hit) {
            camera.radius = 300;
            camera.lockedTarget = pickInfo.pickedMesh;
            switch(pickInfo.pickedMesh.name)
            {
                case "Sun":
                    openDef("Sun");
                    f("Sun");
                    break;
                case "Mercury":
                    openDef("Mercury");
                    f("Mercury");
                    break;
                case "Venus":
                    openDef("Venus");
                    f("Venus");
                    break;
                case "Earth":
                    openDef("Earth");
                    f("Earth");
                    break;
                case "Mars":
                    openDef("Mars");
                    f("Mars");
                    break;
                case "Jupiter":
                    openDef("Jupiter");
                    f("Jupiter");
                    break;
                case "Saturn":
                    openDef("Saturn");
                    f("Saturn");
                    break;
                case "Uranus":
                    openDef("Uranus");
                    f("Uranus");
                    break;
                case "Neptune":
                    openDef("Neptune");
                    f("Neptune");
                    break;
            }
        }
    }

    return scene;
};

export var SolarSystem = createScene();