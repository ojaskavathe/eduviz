/// <reference path = '../vendor/babylonjs/babylon.d.ts' /> 
//this is for vscode intellisense ^

export class textBox{
    constructor(onEnter, onExit){
        this.plane = BABYLON.MeshBuilder.CreatePlane("plane", {size: 15});
        this.plane.position.x = 15;
        this.plane.rotate(new BABYLON.Vector3(0, 1, 0), Math.PI);
        //this.plane.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
        this.plane.scaling = new BABYLON.Vector3(1, 0, 1);
        this.plane.moveTo("scaling", new BABYLON.Vector3(1, 1, 1), 30);

        this.advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(this.plane);

        this.sv = new BABYLON.GUI.ScrollViewer();
        this.sv.thickness = 7;
        this.sv.color = "green";
        this.sv.width = 0.4;
        this.sv.height = 0.4;
        this.sv.background = "black";

        this.advancedTexture.addControl(this.sv);

        this.tb = new BABYLON.GUI.TextBlock();
        this.tb.textWrapping = BABYLON.GUI.TextWrapping.WordWrap;
        this.tb.resizeToFit = true;
        this.tb.paddingTop = "5%";
        this.tb.paddingLeft = "30px";
        this.tb.paddingRight = "20px"
        this.tb.paddingBottom = "5%";
        this.tb.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.tb.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.tb.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.tb.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.tb.color = "red";
        this.tb.background = "yellow";

        this.tb.onPointerEnterObservable.add(onEnter)

        this.tb.onPointerOutObservable.add(onExit)

        this.tb.text = "this is an exhaust. \nit does \nexhaust things";

        this.tb.fontSize = "32px";

        this.sv.addControl(this.tb);
    }

    destroy(){
        this.plane.moveTo("scaling", new BABYLON.Vector3(1, 0, 1), 30);

        setTimeout(() => { 
            this.tb.dispose();
            this.sv.dispose();
            this.advancedTexture.dispose();
            this.plane.dispose();
        }, 1000);
    }
}
