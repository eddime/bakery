
if (typeof gdjs.evtsExt__Tween3D__onSceneUnloading !== "undefined") {
  gdjs.evtsExt__Tween3D__onSceneUnloading.registeredGdjsCallbacks.forEach(callback =>
    gdjs._unregisterCallback(callback)
  );
}

gdjs.evtsExt__Tween3D__onSceneUnloading = {};


gdjs.evtsExt__Tween3D__onSceneUnloading.userFunc0xe76348 = function GDJSInlineCode(runtimeScene, eventsFunctionContext) {
"use strict";
if (!runtimeScene.__tween3DExtension) {
    return;
}
const { tintManagers } = runtimeScene.__tween3DExtension;

for (const manager of tintManagers.values()) {
    manager.dispose();
}

};
gdjs.evtsExt__Tween3D__onSceneUnloading.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


gdjs.evtsExt__Tween3D__onSceneUnloading.userFunc0xe76348(runtimeScene, eventsFunctionContext);

}


};

gdjs.evtsExt__Tween3D__onSceneUnloading.func = function(runtimeScene, parentEventsFunctionContext) {
let scopeInstanceContainer = null;
var eventsFunctionContext = {
  _objectsMap: {
},
  _objectArraysMap: {
},
  _behaviorNamesMap: {
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
    return "";
  },
  getOnceTriggers: function() { return runtimeScene.getOnceTriggers(); }
};


gdjs.evtsExt__Tween3D__onSceneUnloading.eventsList0(runtimeScene, eventsFunctionContext);


return;
}

gdjs.evtsExt__Tween3D__onSceneUnloading.registeredGdjsCallbacks = [];
gdjs.evtsExt__Tween3D__onSceneUnloading.registeredGdjsCallbacks.push((runtimeScene) => {
    gdjs.evtsExt__Tween3D__onSceneUnloading.func(runtimeScene, runtimeScene);
})
gdjs.registerRuntimeSceneUnloadingCallback(gdjs.evtsExt__Tween3D__onSceneUnloading.registeredGdjsCallbacks[gdjs.evtsExt__Tween3D__onSceneUnloading.registeredGdjsCallbacks.length - 1]);
