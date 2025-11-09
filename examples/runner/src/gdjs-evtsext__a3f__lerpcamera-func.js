
if (typeof gdjs.evtsExt__A3F__LerpCamera !== "undefined") {
  gdjs.evtsExt__A3F__LerpCamera.registeredGdjsCallbacks.forEach(callback =>
    gdjs._unregisterCallback(callback)
  );
}

gdjs.evtsExt__A3F__LerpCamera = {};
gdjs.evtsExt__A3F__LerpCamera.GDTargetObjects1= [];


gdjs.evtsExt__A3F__LerpCamera.userFunc0xae5318 = function GDJSInlineCode(runtimeScene, eventsFunctionContext) {
"use strict";
const Layer = eventsFunctionContext.getArgument("Layer");
// const CameraNumber = eventsFunctionContext.getArgument("CameraNumber");
const Targets = eventsFunctionContext.getObjects("Target");
const FactorP = eventsFunctionContext.getArgument("FactorP");
const FactorR = eventsFunctionContext.getArgument("FactorR");
const Viewpoint = eventsFunctionContext.getArgument("Viewpoint");
//
const Camera3D = runtimeScene.getLayer(Layer).getRenderer().getThreeCamera();
if (!Camera3D) {
    return;
}
if (Targets.length === 0) {
    return;
}
const Object3D = Targets[0].get3DRendererObject();
//
if (FactorP) {
    const Vec3 = Object3D.position.clone();
    Vec3.y *= -1;
    Camera3D.position.lerp(Vec3, FactorP);
    runtimeScene.getLayer(Layer)._cameraX = Camera3D.position.x;
    runtimeScene.getLayer(Layer)._cameraY = -Camera3D.position.y;
    runtimeScene.getLayer(Layer).setCameraZ(Camera3D.position.z, null);
}
if (FactorR) {
    const Euler = Object3D.rotation.clone();
    Euler.x *= -1;
    Euler.z *= -1;
    const Quaternion = new THREE.Quaternion();
    Quaternion.setFromEuler(Euler);
    //
    if (Viewpoint) {
        const EulerView = new THREE.Euler(gdjs.toRad(90), gdjs.toRad(-90), 0);
        const QuaternionView = new THREE.Quaternion();
        QuaternionView.setFromEuler(EulerView);
        Quaternion.multiply(QuaternionView);
    }
    //
    Camera3D.quaternion.slerp(Quaternion, FactorR);
    runtimeScene.getLayer(Layer).setCameraRotation(gdjs.toDegrees(-Camera3D.rotation.z));
}


};
gdjs.evtsExt__A3F__LerpCamera.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


gdjs.evtsExt__A3F__LerpCamera.userFunc0xae5318(runtimeScene, eventsFunctionContext);

}


};

gdjs.evtsExt__A3F__LerpCamera.func = function(runtimeScene, Layer, CameraNumber, Target, TargetCapability3d, FactorP, FactorR, Viewpoint, parentEventsFunctionContext) {
let scopeInstanceContainer = null;
var eventsFunctionContext = {
  _objectsMap: {
"Target": Target
},
  _objectArraysMap: {
"Target": gdjs.objectsListsToArray(Target)
},
  _behaviorNamesMap: {
"TargetCapability3d": TargetCapability3d
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("A3F"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("A3F"),
  localVariables: [],
  getObjects: function(objectName) {
    return eventsFunctionContext._objectArraysMap[objectName] || [];
  },
  getObjectsLists: function(objectName) {
    return eventsFunctionContext._objectsMap[objectName] || null;
  },
  getBehaviorName: function(behaviorName) {
    return eventsFunctionContext._behaviorNamesMap[behaviorName] || behaviorName;
  },
  createObject: function(objectName) {
    const objectsList = eventsFunctionContext._objectsMap[objectName];
    if (objectsList) {
      const object = parentEventsFunctionContext && !(scopeInstanceContainer && scopeInstanceContainer.isObjectRegistered(objectName)) ?
        parentEventsFunctionContext.createObject(objectsList.firstKey()) :
        runtimeScene.createObject(objectsList.firstKey());
      if (object) {
        objectsList.get(objectsList.firstKey()).push(object);
        eventsFunctionContext._objectArraysMap[objectName].push(object);
      }
      return object;
    }
    return null;
  },
  getInstancesCountOnScene: function(objectName) {
    const objectsList = eventsFunctionContext._objectsMap[objectName];
    let count = 0;
    if (objectsList) {
      for(const objectName in objectsList.items)
        count += parentEventsFunctionContext && !(scopeInstanceContainer && scopeInstanceContainer.isObjectRegistered(objectName)) ?
parentEventsFunctionContext.getInstancesCountOnScene(objectName) :
        runtimeScene.getInstancesCountOnScene(objectName);
    }
    return count;
  },
  getLayer: function(layerName) {
    return runtimeScene.getLayer(layerName);
  },
  getArgument: function(argName) {
if (argName === "Layer") return Layer;
if (argName === "CameraNumber") return CameraNumber;
if (argName === "FactorP") return FactorP;
if (argName === "FactorR") return FactorR;
if (argName === "Viewpoint") return Viewpoint;
    return "";
  },
  getOnceTriggers: function() { return runtimeScene.getOnceTriggers(); }
};

gdjs.evtsExt__A3F__LerpCamera.GDTargetObjects1.length = 0;

gdjs.evtsExt__A3F__LerpCamera.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__A3F__LerpCamera.GDTargetObjects1.length = 0;


return;
}

gdjs.evtsExt__A3F__LerpCamera.registeredGdjsCallbacks = [];