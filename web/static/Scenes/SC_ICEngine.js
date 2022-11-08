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
    var b_exhaust = new glButton(() => {
        //Switch();
        camera.moveTo("target", new BABYLON.Vector3(0, 0, 0), 600);
        camera.moveTo("position", new BABYLON.Vector3(22, 2, 26), 200);

        document.getElementById("renderCanvas").style.width   = "calc(100% - 350px)";
        document.getElementById("sideNav").style.width = "350px"; 

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
        //if(timer < 2)
        var t1 = new textBox(camera.detachControl(), camera.attachControl(scene, true), scene);

        //stop the smoke after 5s
        setTimeout(() => {
           particleSystem.stop();
           t1.destroy();
        }, 2000);
    }, scene, "Exhaust")

    var b_cylinder = new glButton(() => {
        //Switch();
        camera.moveTo("target", new BABYLON.Vector3(0, 0, 0), 600);
        camera.moveTo("position", new BABYLON.Vector3(-22, 2, 26), 200);
        //if(timer < 2)
        var t1 = new textBox(camera.detachControl(), camera.attachControl(scene, true), scene);
        t1.tb.text = "These automobile engine parts are located in the engine block also known as the cylinder block. It contains a liner or sleeves around it. This liner is worn out when subjected to work and can be easily replaced. The cylinders have part or space for the piston to move upward and downward, making the combustion take place."
        t1.plane.position = new BABYLON.Vector3(-12.0, 0.0, 0.0);

        //stop the smoke after 5s
        setTimeout(() => {
           t1.destroy();
        }, 2000);
    }, scene, "Cylinder")
    b_cylinder.plane.position = new BABYLON.Vector3(-5.0, 0.0, 0.0);

    return scene;
};

export var ICEngine = createScene();