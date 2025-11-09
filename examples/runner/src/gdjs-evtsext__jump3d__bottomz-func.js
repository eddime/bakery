
if (typeof gdjs.evtsExt__Jump3D__BottomZ !== "undefined") {
  gdjs.evtsExt__Jump3D__BottomZ.registeredGdjsCallbacks.forEach(callback =>
    gdjs._unregisterCallback(callback)
  );
}

gdjs.evtsExt__Jump3D__BottomZ = {};
gdjs.evtsExt__Jump3D__BottomZ.GDObjectObjects1= [];


gdjs.evtsExt__Jump3D__BottomZ.userFunc0x1020fa8 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
if (objects.length === 0) {
    return;
}
const object = objects[0];
eventsFunctionContext.returnValue = object.getDrawableZ ? object.getDrawableZ() : 0;

};
gdjs.evtsExt__Jump3D__BottomZ.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Jump3D__BottomZ.GDObjectObjects1);

const objects = gdjs.evtsExt__Jump3D__BottomZ.GDObjectObjects1;
gdjs.evtsExt__Jump3D__BottomZ.userFunc0x1020fa8(runtimeScene, objects, eventsFunctionContext);

}


};

gdjs.evtsExt__Jump3D__BottomZ.func = function(runtimeScene, Object, parentEventsFunctionContext) {
let scopeInstanceContainer = null;
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
},
  _objectArraysMap: {
"Object": gdjs.objectsListsToArray(Object)
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Jump3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Jump3D"),
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
    return "";
  },
  getOnceTriggers: function() { return runtimeScene.getOnceTriggers(); }
};

gdjs.evtsExt__Jump3D__BottomZ.GDObjectObjects1.length = 0;

gdjs.evtsExt__Jump3D__BottomZ.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Jump3D__BottomZ.GDObjectObjects1.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}

gdjs.evtsExt__Jump3D__BottomZ.registeredGdjsCallbacks = [];