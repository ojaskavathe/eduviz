/// <reference path = '../../vendor/babylonjs/babylon.d.ts' /> 
//this is for vscode intellisense ^

import { engine, canvas } from "../core/LoadEngine.js";

import { textBox } from "../util/textBox.js";

const createScene = () => {
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0.5, 0.6, 0.5);

    scene.animationTimeScale = 1;

    const camera = new BABYLON.ArcRotateCamera("camera", Math.PI, Math.PI / 2.5, 60, new BABYLON.Vector3(0, 0, 0));
    camera.upperRadiusLimit = 200;
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
    title.tb.text = "About Us";
    title.tb.fontSize = 75;
    var createLink = function(fontFamily) {
			
        var headID = document.head;
        var link = document.createElement('link');
        link.rel = 'stylesheet';
                
        headID.appendChild(link);
        link.href = 'https://fonts.googleapis.com/css?family=' + fontFamily;
    }
    
    var loadFonts = function() {
    
        jQuery.getScript('https://cdnjs.cloudflare.com/ajax/libs/fontfaceobserver/2.0.1/fontfaceobserver.js', function () {
    
            var font = new FontFaceObserver("Pacifico");
            createLink(font.family);
    
            font.load().then(function () {
                title.fontFamily = font.family;
            });
            
        });
    
    }
    loadFonts();

    title.plane.position = new BABYLON.Vector3(0.0, 15.0, 0.0);
    title.plane.rotate(new BABYLON.Vector3(0, 1, 0), -Math.PI/2)

    var contents = new textBox(camera.detachControl(), camera.attachControl(scene, true), scene, {size:50});
    contents.tb.text = "i am god";
    contents.sv.width = 1;
    contents.plane.position = new BABYLON.Vector3(0.0, 0.0, 0.0);
    contents.plane.rotate(new BABYLON.Vector3(0, 1, 0), -Math.PI/2)
        
    return scene;
};

export var About = createScene();