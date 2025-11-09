
if (typeof gdjs.evtsExt__SpriteMasking__Unmask !== "undefined") {
  gdjs.evtsExt__SpriteMasking__Unmask.registeredGdjsCallbacks.forEach(callback =>
    gdjs._unregisterCallback(callback)
  );
}

gdjs.evtsExt__SpriteMasking__Unmask = {};
gdjs.evtsExt__SpriteMasking__Unmask.GDMaskedObjects1= [];


gdjs.evtsExt__SpriteMasking__Unmask.userFunc0xe03880 = function GDJSInlineCode(runtimeScene, eventsFunctionContext) {
"use strict";
const maskedObjects = eventsFunctionContext.getObjects("Masked");

for (const maskedObject of maskedObjects) {
    const maskedRenderer = maskedObject.getRendererObject(); 
    maskedRenderer.mask = null;
}

};
gdjs.evtsExt__SpriteMasking__Unmask.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


gdjs.evtsExt__SpriteMasking__Unmask.userFunc0xe03880(runtimeScene, eventsFunctionContext);

}


};

gdjs.evtsExt__SpriteMasking__Unmask.func = function(runtimeScene, Masked, parentEventsFunctionContext) {
let scopeInstanceContainer = null;
var eventsFunctionContext = {
  _objectsMap: {
"Masked": Masked
},
  _objectArraysMap: {
"Masked": gdjs.objectsListsToArray(Masked)
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("SpriteMasking"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("SpriteMasking"),
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

gdjs.evtsExt__SpriteMasking__Unmask.GDMaskedObjects1.length = 0;

gdjs.evtsExt__SpriteMasking__Unmask.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__SpriteMasking__Unmask.GDMaskedObjects1.length = 0;


return;
}

gdjs.evtsExt__SpriteMasking__Unmask.registeredGdjsCallbacks = [];