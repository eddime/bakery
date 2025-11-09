
if (typeof gdjs.evtsExt__A3F__Opacity !== "undefined") {
  gdjs.evtsExt__A3F__Opacity.registeredGdjsCallbacks.forEach(callback =>
    gdjs._unregisterCallback(callback)
  );
}

gdjs.evtsExt__A3F__Opacity = {};
gdjs.evtsExt__A3F__Opacity.GDObjectObjects1= [];


gdjs.evtsExt__A3F__Opacity.userFunc0xf1a008 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
eventsFunctionContext.returnValue = 255;
if (objects.length == 0) {
    return;
}
let Opacity = null;
const Object2D = objects[0];
const Object3D = Object2D.get3DRendererObject();
//
if (Object3D) {
    Object3D.traverse((Child) => {
        if (Opacity === null) {
            if (Child.material) {
                if (Array.isArray(Child.material)) {
                    Opacity = Child.material[0].opacity;
                } else {
                    Opacity = Child.material.opacity;
                }
            }
        }
    });
}
Opacity = (Opacity === null) ? 1 : Opacity;
Opacity *= 255;
eventsFunctionContext.returnValue = Opacity;


};
gdjs.evtsExt__A3F__Opacity.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__A3F__Opacity.GDObjectObjects1);

const objects = gdjs.evtsExt__A3F__Opacity.GDObjectObjects1;
gdjs.evtsExt__A3F__Opacity.userFunc0xf1a008(runtimeScene, objects, eventsFunctionContext);

}


};

gdjs.evtsExt__A3F__Opacity.func = function(runtimeScene, Object, parentEventsFunctionContext) {
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
    return "";
  },
  getOnceTriggers: function() { return runtimeScene.getOnceTriggers(); }
};

gdjs.evtsExt__A3F__Opacity.GDObjectObjects1.length = 0;

gdjs.evtsExt__A3F__Opacity.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__A3F__Opacity.GDObjectObjects1.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}

gdjs.evtsExt__A3F__Opacity.registeredGdjsCallbacks = [];