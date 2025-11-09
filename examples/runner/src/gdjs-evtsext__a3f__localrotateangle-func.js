
if (typeof gdjs.evtsExt__A3F__LocalRotateAngle !== "undefined") {
  gdjs.evtsExt__A3F__LocalRotateAngle.registeredGdjsCallbacks.forEach(callback =>
    gdjs._unregisterCallback(callback)
  );
}

gdjs.evtsExt__A3F__LocalRotateAngle = {};
gdjs.evtsExt__A3F__LocalRotateAngle.forEachIndex2 = 0;

gdjs.evtsExt__A3F__LocalRotateAngle.forEachObjects2 = [];

gdjs.evtsExt__A3F__LocalRotateAngle.forEachTemporary2 = null;

gdjs.evtsExt__A3F__LocalRotateAngle.forEachTotalCount2 = 0;

gdjs.evtsExt__A3F__LocalRotateAngle.GDObjectObjects1= [];
gdjs.evtsExt__A3F__LocalRotateAngle.GDObjectObjects2= [];
gdjs.evtsExt__A3F__LocalRotateAngle.GDObjectObjects3= [];


gdjs.evtsExt__A3F__LocalRotateAngle.userFunc0xf03890 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
const Object2D = objects[0];
const Object3D = Object2D.get3DRendererObject();
const Axis = eventsFunctionContext.getArgument("Axis");
const Angle = eventsFunctionContext.getArgument("Angle");

if (Axis == "X") {
    Object3D.rotateX(gdjs.toRad(Angle));
} else if (Axis == "Y") {
    Object3D.rotateY(gdjs.toRad(Angle));
} else {
    Object3D.rotateZ(gdjs.toRad(Angle));
}
// const DegreesX = gdjs.toDegrees(Object3D.rotation.x);
// const DegreesY = gdjs.toDegrees(Object3D.rotation.y);
// const DegreesZ = gdjs.toDegrees(Object3D.rotation.z);
// Object2D.setRotationX(DegreesX);
// Object2D.setRotationY(DegreesY);
// Object2D.setAngle(DegreesZ);
Object2D._rotationX = gdjs.toDegrees(Object3D.rotation.x);
Object2D._rotationY = gdjs.toDegrees(Object3D.rotation.y);
Object2D.angle = gdjs.toDegrees(Object3D.rotation.z);
Object2D.getRenderer().updateRotation();
};
gdjs.evtsExt__A3F__LocalRotateAngle.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(gdjs.evtsExt__A3F__LocalRotateAngle.GDObjectObjects2, gdjs.evtsExt__A3F__LocalRotateAngle.GDObjectObjects3);


const objects = gdjs.evtsExt__A3F__LocalRotateAngle.GDObjectObjects3;
gdjs.evtsExt__A3F__LocalRotateAngle.userFunc0xf03890(runtimeScene, objects, eventsFunctionContext);

}


};gdjs.evtsExt__A3F__LocalRotateAngle.eventsList1 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__A3F__LocalRotateAngle.GDObjectObjects1);

for (gdjs.evtsExt__A3F__LocalRotateAngle.forEachIndex2 = 0;gdjs.evtsExt__A3F__LocalRotateAngle.forEachIndex2 < gdjs.evtsExt__A3F__LocalRotateAngle.GDObjectObjects1.length;++gdjs.evtsExt__A3F__LocalRotateAngle.forEachIndex2) {
gdjs.evtsExt__A3F__LocalRotateAngle.GDObjectObjects2.length = 0;


gdjs.evtsExt__A3F__LocalRotateAngle.forEachTemporary2 = gdjs.evtsExt__A3F__LocalRotateAngle.GDObjectObjects1[gdjs.evtsExt__A3F__LocalRotateAngle.forEachIndex2];
gdjs.evtsExt__A3F__LocalRotateAngle.GDObjectObjects2.push(gdjs.evtsExt__A3F__LocalRotateAngle.forEachTemporary2);
let isConditionTrue_0 = false;
if (true) {

{ //Subevents: 
gdjs.evtsExt__A3F__LocalRotateAngle.eventsList0(runtimeScene, eventsFunctionContext);} //Subevents end.
}
}

}


};

gdjs.evtsExt__A3F__LocalRotateAngle.func = function(runtimeScene, Object, Capability3d, Axis, Angle, parentEventsFunctionContext) {
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
if (argName === "Axis") return Axis;
if (argName === "Angle") return Angle;
    return "";
  },
  getOnceTriggers: function() { return runtimeScene.getOnceTriggers(); }
};

gdjs.evtsExt__A3F__LocalRotateAngle.GDObjectObjects1.length = 0;
gdjs.evtsExt__A3F__LocalRotateAngle.GDObjectObjects2.length = 0;
gdjs.evtsExt__A3F__LocalRotateAngle.GDObjectObjects3.length = 0;

gdjs.evtsExt__A3F__LocalRotateAngle.eventsList1(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__A3F__LocalRotateAngle.GDObjectObjects1.length = 0;
gdjs.evtsExt__A3F__LocalRotateAngle.GDObjectObjects2.length = 0;
gdjs.evtsExt__A3F__LocalRotateAngle.GDObjectObjects3.length = 0;


return;
}

gdjs.evtsExt__A3F__LocalRotateAngle.registeredGdjsCallbacks = [];