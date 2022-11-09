/// <reference path = '../../vendor/babylonjs/babylon.d.ts' /> 
//this is for vscode intellisense ^

import { engine, canvas } from "../core/LoadEngine.js";

import { textBox } from "../util/textBox.js";
import { smoke } from "../util/smokeParticles.js";
import { glButton } from "../util/glButton.js";

//var particleSystem;

const createScene = () => {
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0.5, 0.6, 0.5);
    BABYLON.SceneLoader.ImportMesh(
        undefined, // Name of meshes to load
        "../assets/engine/", // Path on a server for the file
        "pistonAnim.glb", // The file name that should be loaded from the above path
        scene, // The scene to load this mesh/model file into
        (meshes, particleSystem, skeletons, animationGroups) => { //on load
            animationGroups[0].speedRatio = 10; 
            for (var i = 0; i < meshes.length; ++i){
                meshes[i].position.y += -3;
                meshes[i].position.z += 5;
            }
        }
    );

    const camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 3, Math.PI / 2.5, 60, new BABYLON.Vector3(0, 0, 0));
    //camera.upperRadiusLimit = 200;
    camera.lowerRadiusLimit = 30;
    //camera.zoomToMouseLocation = true;

    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

    // GUI
    function onExhaust(){
        camera.detachControl();
        camera.moveTo("target", new BABYLON.Vector3(0, 0, 0), 600);
        camera.moveTo("position", new BABYLON.Vector3(22, 2, 26), 200);

        // Create a particle system
        var particleSystem = new BABYLON.ParticleSystem("particles", 8000, scene);
        //Texture of each particle
        particleSystem.particleTexture = new BABYLON.Texture("../../assets/images/smokeParticleTexture.png", scene);
        smoke(particleSystem);
        particleSystem.emitter = new BABYLON.Vector3(7, -3, 9)
        // Create a particle system
        particleSystem = new BABYLON.ParticleSystem("particles", 8000, scene);
        //Texture of each particle
        particleSystem.particleTexture = new BABYLON.Texture("../../assets/images/smokeParticleTexture.png", scene);
        smoke(particleSystem);
        particleSystem.emitter = new BABYLON.Vector3(7, -3, 9)

        particleSystem.start();

        setTimeout(camera.attachControl(scene, true), 1000);

        //stop the smoke after 5s
        setTimeout(() => {
            particleSystem.stop();
        }, 2000);
    }
    openFromDef("exhaust", onExhaust);
    var b_exhaust = new glButton(() => {
        openDef("exhaust");
        onExhaust();
    }, scene, "Exhaust")


    function onCylinder(){
        camera.detachControl();
        camera.moveTo("target", new BABYLON.Vector3(0, 0, 0), 600);
        camera.moveTo("position", new BABYLON.Vector3(-22, 2, 26), 200);
        setTimeout(camera.attachControl(scene, true), 1000);
    }
    openFromDef("cylinder", onCylinder);
    var b_cylinder = new glButton(()=>{
        openDef("cylinder");
        onCylinder();
    }, scene, "Cylinder")
    b_cylinder.plane.position = new BABYLON.Vector3(-5.0, 0.0, 0.0);

    //piston
    function onPiston(){
        camera.detachControl();
        camera.moveTo("target", new BABYLON.Vector3(0, 0, 0), 600);
        camera.moveTo("position", new BABYLON.Vector3(0, 5, 20), 200);
        setTimeout(camera.attachControl(scene, true), 1000);
    }
    openFromDef("piston", onPiston);
    var b_piston = new glButton(()=>{
        openDef("piston");
        onPiston();
    }, scene, "Piston")
    b_piston.plane.position = new BABYLON.Vector3(0.0, 0.0, 10.0);

    //crankshaft
    //piston
    function onCrankshaft(){
        camera.detachControl();
        camera.moveTo("target", new BABYLON.Vector3(0, 0, 0), 600);
        camera.moveTo("position", new BABYLON.Vector3(10, -5, -20), 200);
        setTimeout(camera.attachControl(scene, true), 1000);
    }
    openFromDef("crankshaft", onCrankshaft);
    var b_crankshaft = new glButton(()=>{
        openDef("crankshaft");
        onCrankshaft();
    }, scene, "Crankshaft")
    b_crankshaft.plane.position = new BABYLON.Vector3(0.0, 0.0, -10.0);
    b_crankshaft.button.width = 0.6;

    return scene;
};

export var ICEngine = createScene();