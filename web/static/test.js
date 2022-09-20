/// <reference path = '../vendor/babylonjs/babylon.d.ts' /> 
//this is for vscode intellisense ^

const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

//import * as BABYLON from "./utils.js"
import {textBox} from "./textBox.js";

BABYLON.ArcRotateCamera.prototype.moveTo = function (whichprop, targetval, speed) {
    var ease = new BABYLON.CubicEase();
    ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEIN);
	BABYLON.Animation.CreateAndStartAnimation('at4', this, whichprop, speed, 240, this[whichprop], targetval, 0, ease);
}

BABYLON.Mesh.prototype.moveTo = function (whichprop, targetval, speed) {
    var ease = new BABYLON.CubicEase();
    ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
	BABYLON.Animation.CreateAndStartAnimation('at4', this, whichprop, speed, 240, this[whichprop], targetval, 0, ease);
}

var particleSystem;

const smoke = function (particleSystem) {
    
    // lifetime
    particleSystem.minLifeTime = 2;
    particleSystem.maxLifeTime = 6;

    // emit rate
    particleSystem.emitRate = 100;

    // gravity
    particleSystem.gravity = new BABYLON.Vector3(0, 1.5, 1.25);

    // size gradient
    particleSystem.addSizeGradient(0, 0.6, 1);
    particleSystem.addSizeGradient(0.3, 1, 2);
    particleSystem.addSizeGradient(0.5, 2, 3);
    particleSystem.addSizeGradient(1.0, 6, 8);

    // color gradient
    particleSystem.addColorGradient(0, new BABYLON.Color4(0.5, 0.5, 0.5, 0),  new BABYLON.Color4(0.8, 0.8, 0.8, 0));
    particleSystem.addColorGradient(0.4, new BABYLON.Color4(0.1, 0.1, 0.1, 0.1), new BABYLON.Color4(0.4, 0.4, 0.4, 0.4));
    particleSystem.addColorGradient(0.7, new BABYLON.Color4(0.03, 0.03, 0.03, 0.2), new BABYLON.Color4(0.3, 0.3, 0.3, 0.4));
    particleSystem.addColorGradient(1.0, new BABYLON.Color4(0.0, 0.0, 0.0, 0), new BABYLON.Color4(0.03, 0.03, 0.03, 0));

    // speed gradient
    particleSystem.addVelocityGradient(0, 1, 1.5);
    particleSystem.addVelocityGradient(0.1, 0.8, 0.9);
    particleSystem.addVelocityGradient(0.7, 0.4, 0.5);
    particleSystem.addVelocityGradient(1, 0.1, 0.2);

    // rotation
    particleSystem.minInitialRotation = 0;
    particleSystem.maxInitialRotation = Math.PI;
    particleSystem.minAngularSpeed = -1;
    particleSystem.maxAngularSpeed = 1;

    // blendmode
    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD;
    
    // emitter shape
    var sphereEmitter = particleSystem.createSphereEmitter(0.1);

    // Where the particles come from
    particleSystem.emitter = new BABYLON.Vector3(7, 0, 4); // the starting object, the emitter
    particleSystem.minEmitBox = new BABYLON.Vector3(-0.5, -0.5, -0.5); // Starting all from
    particleSystem.maxEmitBox = new BABYLON.Vector3(0.5, 0.5, 0.5); // To...
}

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
        //camera.detachControl();
        
        //b_exhaust.textBlock.text = camera.target;
        
        camera.moveTo("target", new BABYLON.Vector3(0, 3, -5), 60);
        camera.moveTo("position", new BABYLON.Vector3(14, 2, 18), 20);

        particleSystem.start();
        var t1 = new textBox(camera.detachControl(), camera.attachControl(scene, true));
        
        //stop the smoke after 5s
        setTimeout(() => { particleSystem.stop(); t1.destroy() }, 2000);

        //camera.attachControl(canvas, true);
    });
    advancedTexture.addControl(b_exhaust);

    
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