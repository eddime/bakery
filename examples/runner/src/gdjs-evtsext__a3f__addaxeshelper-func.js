
if (typeof gdjs.evtsExt__A3F__AddAxesHelper !== "undefined") {
  gdjs.evtsExt__A3F__AddAxesHelper.registeredGdjsCallbacks.forEach(callback =>
    gdjs._unregisterCallback(callback)
  );
}

gdjs.evtsExt__A3F__AddAxesHelper = {};
gdjs.evtsExt__A3F__AddAxesHelper.forEachIndex2 = 0;

gdjs.evtsExt__A3F__AddAxesHelper.forEachObjects2 = [];

gdjs.evtsExt__A3F__AddAxesHelper.forEachTemporary2 = null;

gdjs.evtsExt__A3F__AddAxesHelper.forEachTotalCount2 = 0;

gdjs.evtsExt__A3F__AddAxesHelper.GDObjectObjects1= [];
gdjs.evtsExt__A3F__AddAxesHelper.GDObjectObjects2= [];
gdjs.evtsExt__A3F__AddAxesHelper.GDObjectObjects3= [];


gdjs.evtsExt__A3F__AddAxesHelper.userFunc0xf15848 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
const Object3D = objects[0].get3DRendererObject();
//
const AxesHelper = new THREE.AxesHelper(2);
AxesHelper.name = objects[0].name + objects[0].id + "_AxesHelper";
Object3D.add(AxesHelper);
};
gdjs.evtsExt__A3F__AddAxesHelper.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(gdjs.evtsExt__A3F__AddAxesHelper.GDObjectObjects2, gdjs.evtsExt__A3F__AddAxesHelper.GDObjectObjects3);


const objects = gdjs.evtsExt__A3F__AddAxesHelper.GDObjectObjects3;
gdjs.evtsExt__A3F__AddAxesHelper.userFunc0xf15848(runtimeScene, objects, eventsFunctionContext);

}


};gdjs.evtsExt__A3F__AddAxesHelper.eventsList1 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__A3F__AddAxesHelper.GDObjectObjects1);

for (gdjs.evtsExt__A3F__AddAxesHelper.forEachIndex2 = 0;gdjs.evtsExt__A3F__AddAxesHelper.forEachIndex2 < gdjs.evtsExt__A3F__AddAxesHelper.GDObjectObjects1.length;++gdjs.evtsExt__A3F__AddAxesHelper.forEachIndex2) {
gdjs.evtsExt__A3F__AddAxesHelper.GDObjectObjects2.length = 0;


gdjs.evtsExt__A3F__AddAxesHelper.forEachTemporary2 = gdjs.evtsExt__A3F__AddAxesHelper.GDObjectObjects1[gdjs.evtsExt__A3F__AddAxesHelper.forEachIndex2];
gdjs.evtsExt__A3F__AddAxesHelper.GDObjectObjects2.push(gdjs.evtsExt__A3F__AddAxesHelper.forEachTemporary2);
let isConditionTrue_0 = false;
if (true) {

{ //Subevents: 
gdjs.evtsExt__A3F__AddAxesHelper.eventsList0(runtimeScene, eventsFunctionContext);} //Subevents end.
}
}

}


};

gdjs.evtsExt__A3F__AddAxesHelper.func = function(runtimeScene, Object, Capability3d, parentEventsFunctionContext) {
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

gdjs.evtsExt__A3F__AddAxesHelper.GDObjectObjects1.length = 0;
gdjs.evtsExt__A3F__AddAxesHelper.GDObjectObjects2.length = 0;
gdjs.evtsExt__A3F__AddAxesHelper.GDObjectObjects3.length = 0;

gdjs.evtsExt__A3F__AddAxesHelper.eventsList1(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__A3F__AddAxesHelper.GDObjectObjects1.length = 0;
gdjs.evtsExt__A3F__AddAxesHelper.GDObjectObjects2.length = 0;
gdjs.evtsExt__A3F__AddAxesHelper.GDObjectObjects3.length = 0;


return;
}

gdjs.evtsExt__A3F__AddAxesHelper.registeredGdjsCallbacks = [];