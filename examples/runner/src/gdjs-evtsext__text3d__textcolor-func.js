
if (typeof gdjs.evtsExt__Text3D__TextColor !== "undefined") {
  gdjs.evtsExt__Text3D__TextColor.registeredGdjsCallbacks.forEach(callback =>
    gdjs._unregisterCallback(callback)
  );
}

gdjs.evtsExt__Text3D__TextColor = {};
gdjs.evtsExt__Text3D__TextColor.GDObjectObjects1= [];


gdjs.evtsExt__Text3D__TextColor.userFunc0x109d818 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
/** @type {gdjs.TextRuntimeObject} */
const object = objects[0];

eventsFunctionContext.returnValue = object._color.join(";");

};
gdjs.evtsExt__Text3D__TextColor.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__Text3D__TextColor.GDObjectObjects1);

const objects = gdjs.evtsExt__Text3D__TextColor.GDObjectObjects1;
gdjs.evtsExt__Text3D__TextColor.userFunc0x109d818(runtimeScene, objects, eventsFunctionContext);

}


};

gdjs.evtsExt__Text3D__TextColor.func = function(runtimeScene, Object, parentEventsFunctionContext) {
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
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Text3D"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Text3D"),
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

gdjs.evtsExt__Text3D__TextColor.GDObjectObjects1.length = 0;

gdjs.evtsExt__Text3D__TextColor.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Text3D__TextColor.GDObjectObjects1.length = 0;


return "" + eventsFunctionContext.returnValue;
}

gdjs.evtsExt__Text3D__TextColor.registeredGdjsCallbacks = [];