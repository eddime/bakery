
if (typeof gdjs.evtsExt__Tween3D__SetTint !== "undefined") {
  gdjs.evtsExt__Tween3D__SetTint.registeredGdjsCallbacks.forEach(callback =>
    gdjs._unregisterCallback(callback)
  );
}

gdjs.evtsExt__Tween3D__SetTint = {};
gdjs.evtsExt__Tween3D__SetTint.GDObjectObjects1= [];


gdjs.evtsExt__Tween3D__SetTint.userFunc0xe741f8 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
const color = gdjs.rgbOrHexStringToNumber(eventsFunctionContext.getArgument("Color") || "255; 255;255");

if (!runtimeScene.__tween3DExtension) {
  runtimeScene.__tween3DExtension = {
    tintManagers: new Map()
  };
}
const { tintManagers } = runtimeScene.__tween3DExtension;
for (const object of objects) {
  let manager = tintManagers.get(object.getName());
  if (!manager) {
    const { TintManager } = gdjs.__tween3DExtension;
    manager = new TintManager(object);
    tintManagers.set(object.getName(), manager);
  }
  manager.applyTint(object, color);
}

};
gdjs.evtsExt__Tween3D__SetTint.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Tween3D__SetTint.GDObjectObjects1);

const objects = gdjs.evtsExt__Tween3D__SetTint.GDObjectObjects1;
gdjs.evtsExt__Tween3D__SetTint.userFunc0xe741f8(runtimeScene, objects, eventsFunctionContext);

}


};

gdjs.evtsExt__Tween3D__SetTint.func = function(runtimeScene, Object, Object3D, Color, parentEventsFunctionContext) {
let scopeInstanceContainer = null;
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
},
  _objectArraysMap: {
"Object": gdjs.objectsListsToArray(Object)
},
  _behaviorNamesMap: {
"Object3D": Object3D
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Tween3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Tween3D"),
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
if (argName === "Color") return Color;
    return "";
  },
  getOnceTriggers: function() { return runtimeScene.getOnceTriggers(); }
};

gdjs.evtsExt__Tween3D__SetTint.GDObjectObjects1.length = 0;

gdjs.evtsExt__Tween3D__SetTint.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Tween3D__SetTint.GDObjectObjects1.length = 0;


return;
}

gdjs.evtsExt__Tween3D__SetTint.registeredGdjsCallbacks = [];