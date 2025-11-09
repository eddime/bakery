
if (typeof gdjs.evtsExt__A3F__ChangeChildAngle !== "undefined") {
  gdjs.evtsExt__A3F__ChangeChildAngle.registeredGdjsCallbacks.forEach(callback =>
    gdjs._unregisterCallback(callback)
  );
}

gdjs.evtsExt__A3F__ChangeChildAngle = {};
gdjs.evtsExt__A3F__ChangeChildAngle.forEachIndex2 = 0;

gdjs.evtsExt__A3F__ChangeChildAngle.forEachObjects2 = [];

gdjs.evtsExt__A3F__ChangeChildAngle.forEachTemporary2 = null;

gdjs.evtsExt__A3F__ChangeChildAngle.forEachTotalCount2 = 0;

gdjs.evtsExt__A3F__ChangeChildAngle.GDObjectObjects1= [];
gdjs.evtsExt__A3F__ChangeChildAngle.GDObjectObjects2= [];
gdjs.evtsExt__A3F__ChangeChildAngle.GDObjectObjects3= [];


gdjs.evtsExt__A3F__ChangeChildAngle.userFunc0x11bfea8 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
const Object2D = objects[0];
const Object3D = Object2D.get3DRendererObject();
const ChildName = eventsFunctionContext.getArgument("Child");
const X = eventsFunctionContext.getArgument("X");
const Y = eventsFunctionContext.getArgument("Y");
const Z = eventsFunctionContext.getArgument("Z");
//
const Child = Object3D.getObjectByName(ChildName);
if (!Child) {return};
//
Child.rotation.x = gdjs.toRad(X);
Child.rotation.y = gdjs.toRad(Y);
Child.rotation.z = gdjs.toRad(Z);
};
gdjs.evtsExt__A3F__ChangeChildAngle.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(gdjs.evtsExt__A3F__ChangeChildAngle.GDObjectObjects2, gdjs.evtsExt__A3F__ChangeChildAngle.GDObjectObjects3);


const objects = gdjs.evtsExt__A3F__ChangeChildAngle.GDObjectObjects3;
gdjs.evtsExt__A3F__ChangeChildAngle.userFunc0x11bfea8(runtimeScene, objects, eventsFunctionContext);

}


};gdjs.evtsExt__A3F__ChangeChildAngle.eventsList1 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__A3F__ChangeChildAngle.GDObjectObjects1);

for (gdjs.evtsExt__A3F__ChangeChildAngle.forEachIndex2 = 0;gdjs.evtsExt__A3F__ChangeChildAngle.forEachIndex2 < gdjs.evtsExt__A3F__ChangeChildAngle.GDObjectObjects1.length;++gdjs.evtsExt__A3F__ChangeChildAngle.forEachIndex2) {
gdjs.evtsExt__A3F__ChangeChildAngle.GDObjectObjects2.length = 0;


gdjs.evtsExt__A3F__ChangeChildAngle.forEachTemporary2 = gdjs.evtsExt__A3F__ChangeChildAngle.GDObjectObjects1[gdjs.evtsExt__A3F__ChangeChildAngle.forEachIndex2];
gdjs.evtsExt__A3F__ChangeChildAngle.GDObjectObjects2.push(gdjs.evtsExt__A3F__ChangeChildAngle.forEachTemporary2);
let isConditionTrue_0 = false;
if (true) {

{ //Subevents: 
gdjs.evtsExt__A3F__ChangeChildAngle.eventsList0(runtimeScene, eventsFunctionContext);} //Subevents end.
}
}

}


};

gdjs.evtsExt__A3F__ChangeChildAngle.func = function(runtimeScene, Object, Capability3d, Child, X, Y, Z, parentEventsFunctionContext) {
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
if (argName === "Child") return Child;
if (argName === "X") return X;
if (argName === "Y") return Y;
if (argName === "Z") return Z;
    return "";
  },
  getOnceTriggers: function() { return runtimeScene.getOnceTriggers(); }
};

gdjs.evtsExt__A3F__ChangeChildAngle.GDObjectObjects1.length = 0;
gdjs.evtsExt__A3F__ChangeChildAngle.GDObjectObjects2.length = 0;
gdjs.evtsExt__A3F__ChangeChildAngle.GDObjectObjects3.length = 0;

gdjs.evtsExt__A3F__ChangeChildAngle.eventsList1(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__A3F__ChangeChildAngle.GDObjectObjects1.length = 0;
gdjs.evtsExt__A3F__ChangeChildAngle.GDObjectObjects2.length = 0;
gdjs.evtsExt__A3F__ChangeChildAngle.GDObjectObjects3.length = 0;


return;
}

gdjs.evtsExt__A3F__ChangeChildAngle.registeredGdjsCallbacks = [];