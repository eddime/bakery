
if (typeof gdjs.evtsExt__A3F__CheckOpacity !== "undefined") {
  gdjs.evtsExt__A3F__CheckOpacity.registeredGdjsCallbacks.forEach(callback =>
    gdjs._unregisterCallback(callback)
  );
}

gdjs.evtsExt__A3F__CheckOpacity = {};
gdjs.evtsExt__A3F__CheckOpacity.GDObjectObjects1= [];


gdjs.evtsExt__A3F__CheckOpacity.userFunc0xf1cab8 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
if (objects.length == 0) {
    return;
}
const ObjectsLists = eventsFunctionContext.getObjectsLists("Object");
const Operator = eventsFunctionContext.getArgument("Operator");
const TargetOpacity = eventsFunctionContext.getArgument("Opacity") / 255;
//
eventsFunctionContext.returnValue = gdjs.evtTools.object.pickObjectsIf((Obj, Argument) => {
    let Opacity = null;
    const Object2D = Obj;
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
    //
    if (Operator == "=") {
        return (Opacity == TargetOpacity);
    } else if (Operator == "<") {
        return (Opacity < TargetOpacity);
    } else if (Operator == ">") {
        return (Opacity > TargetOpacity);
    } else if (Operator == "≤") {
        return (Opacity <= TargetOpacity);
    } else if (Operator == "≥") {
        return (Opacity >= TargetOpacity);
    } else {
        // ≠
        return (Opacity != TargetOpacity);
    }
}, ObjectsLists, false, null);


};
gdjs.evtsExt__A3F__CheckOpacity.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__A3F__CheckOpacity.GDObjectObjects1);

const objects = gdjs.evtsExt__A3F__CheckOpacity.GDObjectObjects1;
gdjs.evtsExt__A3F__CheckOpacity.userFunc0xf1cab8(runtimeScene, objects, eventsFunctionContext);

}


};

gdjs.evtsExt__A3F__CheckOpacity.func = function(runtimeScene, Object, Capability3d, Operator, Opacity, parentEventsFunctionContext) {
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
if (argName === "Operator") return Operator;
if (argName === "Opacity") return Opacity;
    return "";
  },
  getOnceTriggers: function() { return runtimeScene.getOnceTriggers(); }
};

gdjs.evtsExt__A3F__CheckOpacity.GDObjectObjects1.length = 0;

gdjs.evtsExt__A3F__CheckOpacity.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__A3F__CheckOpacity.GDObjectObjects1.length = 0;


return !!eventsFunctionContext.returnValue;
}

gdjs.evtsExt__A3F__CheckOpacity.registeredGdjsCallbacks = [];