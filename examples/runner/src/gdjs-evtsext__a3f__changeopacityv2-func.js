
if (typeof gdjs.evtsExt__A3F__ChangeOpacityV2 !== "undefined") {
  gdjs.evtsExt__A3F__ChangeOpacityV2.registeredGdjsCallbacks.forEach(callback =>
    gdjs._unregisterCallback(callback)
  );
}

gdjs.evtsExt__A3F__ChangeOpacityV2 = {};
gdjs.evtsExt__A3F__ChangeOpacityV2.forEachIndex2 = 0;

gdjs.evtsExt__A3F__ChangeOpacityV2.forEachObjects2 = [];

gdjs.evtsExt__A3F__ChangeOpacityV2.forEachTemporary2 = null;

gdjs.evtsExt__A3F__ChangeOpacityV2.forEachTotalCount2 = 0;

gdjs.evtsExt__A3F__ChangeOpacityV2.GDObjectObjects1= [];
gdjs.evtsExt__A3F__ChangeOpacityV2.GDObjectObjects2= [];
gdjs.evtsExt__A3F__ChangeOpacityV2.GDObjectObjects3= [];


gdjs.evtsExt__A3F__ChangeOpacityV2.userFunc0xf1ffa0 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
const Object2D = objects[0];
const Object3D = Object2D.get3DRendererObject();
const Operator = eventsFunctionContext.getArgument("Operator");
const Opacity = eventsFunctionContext.getArgument("Opacity") / 255;
const Unique = eventsFunctionContext.getArgument("Unique");
//
if (Unique) {
    gdjs._A3F.MakeUniqueMaterial(Object3D);
}
//
Object3D.traverse((Child) => {
    if (Child.material) {
        if (Array.isArray(Child.material)) {
            for (let i = 0; i < Child.material.length; i++) {
                if (Operator == "+") {
                    Child.material[i].opacity += Opacity;
                } else if (Operator == "-") {
                    Child.material[i].opacity -= Opacity;
                } else if (Operator == "*") {
                    Child.material[i].opacity *= Opacity;
                } else if (Operator == "/") {
                    Child.material[i].opacity /= Opacity;
                } else {
                    // =
                    Child.material[i].opacity = Opacity;
                }
                const Transparent = (Child.material[i].opacity < 1);
                if (Child.material[i].transparent !== Transparent) {
                    Child.material[i].transparent = Transparent;
                    Child.material[i].needsUpdate = true;
                }
            }
        } else {
            if (Operator == "+") {
                Child.material.opacity += Opacity;
            } else if (Operator == "-") {
                Child.material.opacity -= Opacity;
            } else if (Operator == "*") {
                Child.material.opacity *= Opacity;
            } else if (Operator == "/") {
                Child.material.opacity /= Opacity;
            } else {
                // =
                Child.material.opacity = Opacity;
            }
            const Transparent = (Child.material.opacity < 1);
            if (Child.material.transparent !== Transparent) {
                Child.material.transparent = Transparent;
                Child.material.needsUpdate = true;
            }
        }
    }
});


};
gdjs.evtsExt__A3F__ChangeOpacityV2.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(gdjs.evtsExt__A3F__ChangeOpacityV2.GDObjectObjects2, gdjs.evtsExt__A3F__ChangeOpacityV2.GDObjectObjects3);


const objects = gdjs.evtsExt__A3F__ChangeOpacityV2.GDObjectObjects3;
gdjs.evtsExt__A3F__ChangeOpacityV2.userFunc0xf1ffa0(runtimeScene, objects, eventsFunctionContext);

}


};gdjs.evtsExt__A3F__ChangeOpacityV2.eventsList1 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__A3F__ChangeOpacityV2.GDObjectObjects1);

for (gdjs.evtsExt__A3F__ChangeOpacityV2.forEachIndex2 = 0;gdjs.evtsExt__A3F__ChangeOpacityV2.forEachIndex2 < gdjs.evtsExt__A3F__ChangeOpacityV2.GDObjectObjects1.length;++gdjs.evtsExt__A3F__ChangeOpacityV2.forEachIndex2) {
gdjs.evtsExt__A3F__ChangeOpacityV2.GDObjectObjects2.length = 0;


gdjs.evtsExt__A3F__ChangeOpacityV2.forEachTemporary2 = gdjs.evtsExt__A3F__ChangeOpacityV2.GDObjectObjects1[gdjs.evtsExt__A3F__ChangeOpacityV2.forEachIndex2];
gdjs.evtsExt__A3F__ChangeOpacityV2.GDObjectObjects2.push(gdjs.evtsExt__A3F__ChangeOpacityV2.forEachTemporary2);
let isConditionTrue_0 = false;
if (true) {

{ //Subevents: 
gdjs.evtsExt__A3F__ChangeOpacityV2.eventsList0(runtimeScene, eventsFunctionContext);} //Subevents end.
}
}

}


};

gdjs.evtsExt__A3F__ChangeOpacityV2.func = function(runtimeScene, Object, Capability3d, Operator, Opacity, Unique, parentEventsFunctionContext) {
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
if (argName === "Unique") return Unique;
    return "";
  },
  getOnceTriggers: function() { return runtimeScene.getOnceTriggers(); }
};

gdjs.evtsExt__A3F__ChangeOpacityV2.GDObjectObjects1.length = 0;
gdjs.evtsExt__A3F__ChangeOpacityV2.GDObjectObjects2.length = 0;
gdjs.evtsExt__A3F__ChangeOpacityV2.GDObjectObjects3.length = 0;

gdjs.evtsExt__A3F__ChangeOpacityV2.eventsList1(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__A3F__ChangeOpacityV2.GDObjectObjects1.length = 0;
gdjs.evtsExt__A3F__ChangeOpacityV2.GDObjectObjects2.length = 0;
gdjs.evtsExt__A3F__ChangeOpacityV2.GDObjectObjects3.length = 0;


return;
}

gdjs.evtsExt__A3F__ChangeOpacityV2.registeredGdjsCallbacks = [];