BABYLON.ArcRotateCamera.prototype.moveTo = function (_whichprop, _targetval, _speed) {
    var ease = new BABYLON.CubicEase();
    ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEIN);
	BABYLON.Animation.CreateAndStartAnimation('at4', this, _whichprop, _speed, 240, this[_whichprop], _targetval, 0, ease);
}

BABYLON.Mesh.prototype.moveTo = function (_whichprop, _targetval, _speed) {
    var ease = new BABYLON.CubicEase();
    ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
	BABYLON.Animation.CreateAndStartAnimation('at4', this, _whichprop, _speed, 240, this[_whichprop], _targetval, 0, ease);
}