
if (typeof gdjs.evtsExt__A3F__NormalizedDirection !== "undefined") {
  gdjs.evtsExt__A3F__NormalizedDirection.registeredGdjsCallbacks.forEach(callback =>
    gdjs._unregisterCallback(callback)
  );
}

gdjs.evtsExt__A3F__NormalizedDirection = {};
gdjs.evtsExt__A3F__NormalizedDirection.GDObjectObjects1= [];


gdjs.evtsExt__A3F__NormalizedDirection.userFunc0x11bfea8 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
const Object3D = objects[0].get3DRendererObject();
const Axis = eventsFunctionContext.getArgument("Axis");
const TargetVariable = eventsFunctionContext.getArgument("TargetVariable");
//
Object3D.updateMatrixWorld(); // 念のため
const D = new THREE.Vector3(0, 0, -1); // -Z
if (Axis == "X") {
    D.set(1, 0, 0);
} else if (Axis == "Y") {
    D.set(0, 1, 0);
} else if (Axis == "Z") {
    D.set(0, 0, 1);
} else if (Axis == "-X") {
    D.set(-1, 0, 0);
} else if (Axis == "-Y") {
    D.set(0, -1, 0);
}
D.transformDirection(Object3D.matrixWorld);
D.y *= -1;
TargetVariable.getChildNamed("x").setNumber(D.x);
TargetVariable.getChildNamed("y").setNumber(D.y);
TargetVariable.getChildNamed("z").setNumber(D.z);


};
gdjs.evtsExt__A3F__NormalizedDirection.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__A3F__NormalizedDirection.GDObjectObjects1);

const objects = gdjs.evtsExt__A3F__NormalizedDirection.GDObjectObjects1;
gdjs.evtsExt__A3F__NormalizedDirection.userFunc0x11bfea8(runtimeScene, objects, eventsFunctionContext);

}


};

gdjs.evtsExt__A3F__NormalizedDirection.func = function(runtimeScene, Object, Capability3d, Axis, TargetVariable, parentEventsFunctionContext) {
let scopeInstanceContainer = null;
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
},
  _objectArraysMap: {
"Object": gdjs.objectsListsToArray(Object)
},
  _behaviorNamesMap: {
"Capability3d": Capability3d
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
if (argName === "TargetVariable") return TargetVariable;
    return "";
  },
  getOnceTriggers: function() { return runtimeScene.getOnceTriggers(); }
};

gdjs.evtsExt__A3F__NormalizedDirection.GDObjectObjects1.length = 0;

gdjs.evtsExt__A3F__NormalizedDirection.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__A3F__NormalizedDirection.GDObjectObjects1.length = 0;


return;
}

gdjs.evtsExt__A3F__NormalizedDirection.registeredGdjsCallbacks = [];