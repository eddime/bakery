
if (typeof gdjs.evtsExt__A3F__LocalTranslateCameraDistance !== "undefined") {
  gdjs.evtsExt__A3F__LocalTranslateCameraDistance.registeredGdjsCallbacks.forEach(callback =>
    gdjs._unregisterCallback(callback)
  );
}

gdjs.evtsExt__A3F__LocalTranslateCameraDistance = {};


gdjs.evtsExt__A3F__LocalTranslateCameraDistance.userFunc0x124c300 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
const Axis = eventsFunctionContext.getArgument("Axis");
const Distance = eventsFunctionContext.getArgument("Distance");
const Layer = eventsFunctionContext.getArgument("Layer");
// const CameraNumber = eventsFunctionContext.getArgument("CameraNumber");

const Camera3D = runtimeScene.getLayer(Layer).getRenderer().getThreeCamera();
if (!Camera3D) {
    return;
}
if (Axis == "X") {
    Camera3D.translateX(Distance);
} else if (Axis == "Y") {
    Camera3D.translateY(-Distance);
} else {
    Camera3D.translateZ(Distance);
}
runtimeScene.getLayer(Layer)._cameraX = Camera3D.position.x;
runtimeScene.getLayer(Layer)._cameraY = -Camera3D.position.y;
runtimeScene.getLayer(Layer).setCameraZ(Camera3D.position.z, null);

};
gdjs.evtsExt__A3F__LocalTranslateCameraDistance.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


const objects = [];
gdjs.evtsExt__A3F__LocalTranslateCameraDistance.userFunc0x124c300(runtimeScene, objects, eventsFunctionContext);

}


};

gdjs.evtsExt__A3F__LocalTranslateCameraDistance.func = function(runtimeScene, Axis, Distance, Layer, CameraNumber, parentEventsFunctionContext) {
let scopeInstanceContainer = null;
var eventsFunctionContext = {
  _objectsMap: {
},
  _objectArraysMap: {
},
  _behaviorNamesMap: {
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
if (argName === "Axis") return Axis;
if (argName === "Distance") return Distance;
if (argName === "Layer") return Layer;
if (argName === "CameraNumber") return CameraNumber;
    return "";
  },
  getOnceTriggers: function() { return runtimeScene.getOnceTriggers(); }
};


gdjs.evtsExt__A3F__LocalTranslateCameraDistance.eventsList0(runtimeScene, eventsFunctionContext);


return;
}

gdjs.evtsExt__A3F__LocalTranslateCameraDistance.registeredGdjsCallbacks = [];