
if (typeof gdjs.evtsExt__A3F__OutputMorphTarget !== "undefined") {
  gdjs.evtsExt__A3F__OutputMorphTarget.registeredGdjsCallbacks.forEach(callback =>
    gdjs._unregisterCallback(callback)
  );
}

gdjs.evtsExt__A3F__OutputMorphTarget = {};
gdjs.evtsExt__A3F__OutputMorphTarget.forEachIndex2 = 0;

gdjs.evtsExt__A3F__OutputMorphTarget.forEachObjects2 = [];

gdjs.evtsExt__A3F__OutputMorphTarget.forEachTemporary2 = null;

gdjs.evtsExt__A3F__OutputMorphTarget.forEachTotalCount2 = 0;

gdjs.evtsExt__A3F__OutputMorphTarget.GDObjectObjects1= [];
gdjs.evtsExt__A3F__OutputMorphTarget.GDObjectObjects2= [];
gdjs.evtsExt__A3F__OutputMorphTarget.GDObjectObjects3= [];


gdjs.evtsExt__A3F__OutputMorphTarget.userFunc0xf32ec8 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
const Object3D = objects[0].get3DRendererObject();
const L = new Set();
Object3D.traverse((Child) => {
    if (Child.morphTargetDictionary) {
        const Names = Object.keys(Child.morphTargetDictionary);
        Names.forEach((N) => L.add(N));
    }
});
const A = Array.from(L);
A.unshift("Morph target names of " + objects[0].name);
console.log(A.join('\n'));
};
gdjs.evtsExt__A3F__OutputMorphTarget.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(gdjs.evtsExt__A3F__OutputMorphTarget.GDObjectObjects2, gdjs.evtsExt__A3F__OutputMorphTarget.GDObjectObjects3);


const objects = gdjs.evtsExt__A3F__OutputMorphTarget.GDObjectObjects3;
gdjs.evtsExt__A3F__OutputMorphTarget.userFunc0xf32ec8(runtimeScene, objects, eventsFunctionContext);

}


};gdjs.evtsExt__A3F__OutputMorphTarget.eventsList1 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__A3F__OutputMorphTarget.GDObjectObjects1);

for (gdjs.evtsExt__A3F__OutputMorphTarget.forEachIndex2 = 0;gdjs.evtsExt__A3F__OutputMorphTarget.forEachIndex2 < gdjs.evtsExt__A3F__OutputMorphTarget.GDObjectObjects1.length;++gdjs.evtsExt__A3F__OutputMorphTarget.forEachIndex2) {
gdjs.evtsExt__A3F__OutputMorphTarget.GDObjectObjects2.length = 0;


gdjs.evtsExt__A3F__OutputMorphTarget.forEachTemporary2 = gdjs.evtsExt__A3F__OutputMorphTarget.GDObjectObjects1[gdjs.evtsExt__A3F__OutputMorphTarget.forEachIndex2];
gdjs.evtsExt__A3F__OutputMorphTarget.GDObjectObjects2.push(gdjs.evtsExt__A3F__OutputMorphTarget.forEachTemporary2);
let isConditionTrue_0 = false;
if (true) {

{ //Subevents: 
gdjs.evtsExt__A3F__OutputMorphTarget.eventsList0(runtimeScene, eventsFunctionContext);} //Subevents end.
}
}

}


};

gdjs.evtsExt__A3F__OutputMorphTarget.func = function(runtimeScene, Object, Capability3d, parentEventsFunctionContext) {
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
    return "";
  },
  getOnceTriggers: function() { return runtimeScene.getOnceTriggers(); }
};

gdjs.evtsExt__A3F__OutputMorphTarget.GDObjectObjects1.length = 0;
gdjs.evtsExt__A3F__OutputMorphTarget.GDObjectObjects2.length = 0;
gdjs.evtsExt__A3F__OutputMorphTarget.GDObjectObjects3.length = 0;

gdjs.evtsExt__A3F__OutputMorphTarget.eventsList1(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__A3F__OutputMorphTarget.GDObjectObjects1.length = 0;
gdjs.evtsExt__A3F__OutputMorphTarget.GDObjectObjects2.length = 0;
gdjs.evtsExt__A3F__OutputMorphTarget.GDObjectObjects3.length = 0;


return;
}

gdjs.evtsExt__A3F__OutputMorphTarget.registeredGdjsCallbacks = [];