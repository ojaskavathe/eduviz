/// <reference path = '../../vendor/babylonjs/babylon.d.ts' /> 
//this is for vscode intellisense ^

class glButton {
    constructor(onClick, onExit, scene) {
        this.plane = new BABYLON.MeshBuilder.CreatePlane("plane", {size: 10}, scene);
        this.plane.position.x = 10;

        this.plane.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;

        this.advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(plane);
        this.button = BABYLON.GUI.Button.CreateSimpleButton("but1", "Exhaust");
        this.button.width = 0.4;
        this.button.height = 0.2;    ;
        this.button.color = "white";
        this.button.fontSize = 100;
        this.button.background = "blue";
        this.button.alpha = 0.5;

        this.button.onPointerUpObservable.add(onClick)
        this.advancedTexture.addControl(this.button);
    }

    destroy() {
        this.button.dispose();
        this.advancedTexture.dispose();
        this.plane.dispose();
    }
}