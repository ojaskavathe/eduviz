/// <reference path = '../../vendor/babylonjs/babylon.d.ts' /> 
//this is for vscode intellisense ^

export const canvas = document.getElementById("renderCanvas"); // Get the canvas element
export const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine