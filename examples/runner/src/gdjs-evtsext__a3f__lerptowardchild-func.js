
if (typeof gdjs.evtsExt__A3F__LerpTowardChild !== "undefined") {
  gdjs.evtsExt__A3F__LerpTowardChild.registeredGdjsCallbacks.forEach(callback =>
    gdjs._unregisterCallback(callback)
  );
}

gdjs.evtsExt__A3F__LerpTowardChild = {};
gdjs.evtsExt__A3F__LerpTowardChild.forEachIndex2 = 0;

gdjs.evtsExt__A3F__LerpTowardChild.forEachObjects2 = [];

gdjs.evtsExt__A3F__LerpTowardChild.forEachTemporary2 = null;

gdjs.evtsExt__A3F__LerpTowardChild.forEachTotalCount2 = 0;

gdjs.evtsExt__A3F__LerpTowardChild.GDObjectObjects1= [];
gdjs.evtsExt__A3F__LerpTowardChild.GDObjectObjects2= [];
gdjs.evtsExt__A3F__LerpTowardChild.GDObjectObjects3= [];
gdjs.evtsExt__A3F__LerpTowardChild.GDTargetObjects1= [];
gdjs.evtsExt__A3F__LerpTowardChild.GDTargetObjects2= [];
gdjs.evtsExt__A3F__LerpTowardChild.GDTargetObjects3= [];


gdjs.evtsExt__A3F__LerpTowardChild.userFunc0xf278a0 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
const Object2D = objects[0];
const Object3D = Object2D.get3DRendererObject();
const Targets = eventsFunctionContext.getObjects("Target");
const ChildName = eventsFunctionContext.getArgument("ChildName");
const FactorP = eventsFunctionContext.getArgument("FactorP");
const FactorR = eventsFunctionContext.getArgument("FactorR");
//
if (Targets.length === 0) {
    return;
}
const Target3D = Targets[0].get3DRendererObject();
const TargetChild = Target3D.getObjectByName(ChildName);
if (!TargetChild) {return};
//
TargetChild.updateMatrixWorld(false);
if (FactorP) {
    const TargetChildPosition = new THREE.Vector3();
    TargetChild.getWorldPosition(TargetChildPosition);
    TargetChildPosition.y = -TargetChildPosition.y;
    //
    const ObjectPosition = new THREE.Vector3(Object2D.getX(), Object2D.getY(), Object2D.getZ());
    ObjectPosition.lerp(TargetChildPosition, FactorP);
    //
    Object2D.x = ObjectPosition.x;
    Object2D.y = ObjectPosition.y;
    Object2D._z = ObjectPosition.z;
    Object2D.getRenderer().updatePosition();
}
if (FactorR) {
    const TargetChildQuaternion = new THREE.Quaternion();
    TargetChild.getWorldQuaternion(TargetChildQuaternion);
    const Euler = new THREE.Euler().setFromQuaternion(TargetChildQuaternion);
    Euler.x *= -1;
    Euler.z *= -1;
    //Euler.z += Math.PI; // 180
    TargetChildQuaternion.setFromEuler(Euler);
    //
    Object3D.quaternion.slerp(TargetChildQuaternion, FactorR);
    //
    Object2D._rotationX = gdjs.toDegrees(Object3D.rotation.x);
    Object2D._rotationY = gdjs.toDegrees(Object3D.rotation.y);
    // Object2D.setAngle(gdjs.toDegrees(Object3D.rotation.z));
    Object2D.angle = gdjs.toDegrees(Object3D.rotation.z);
    Object2D.getRenderer().updateRotation();
}


};
gdjs.evtsExt__A3F__LerpTowardChild.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(gdjs.evtsExt__A3F__LerpTowardChild.GDObjectObjects2, gdjs.evtsExt__A3F__LerpTowardChild.GDObjectObjects3);


const objects = gdjs.evtsExt__A3F__LerpTowardChild.GDObjectObjects3;
gdjs.evtsExt__A3F__LerpTowardChild.userFunc0xf278a0(runtimeScene, objects, eventsFunctionContext);

}


};gdjs.evtsExt__A3F__LerpTowardChild.eventsList1 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__A3F__LerpTowardChild.GDObjectObjects1);

for (gdjs.evtsExt__A3F__LerpTowardChild.forEachIndex2 = 0;gdjs.evtsExt__A3F__LerpTowardChild.forEachIndex2 < gdjs.evtsExt__A3F__LerpTowardChild.GDObjectObjects1.length;++gdjs.evtsExt__A3F__LerpTowardChild.forEachIndex2) {
gdjs.evtsExt__A3F__LerpTowardChild.GDObjectObjects2.length = 0;


gdjs.evtsExt__A3F__LerpTowardChild.forEachTemporary2 = gdjs.evtsExt__A3F__LerpTowardChild.GDObjectObjects1[gdjs.evtsExt__A3F__LerpTowardChild.forEachIndex2];
gdjs.evtsExt__A3F__LerpTowardChild.GDObjectObjects2.push(gdjs.evtsExt__A3F__LerpTowardChild.forEachTemporary2);
let isConditionTrue_0 = false;
if (true) {

{ //Subevents: 
gdjs.evtsExt__A3F__LerpTowardChild.eventsList0(runtimeScene, eventsFunctionContext);} //Subevents end.
}
}

}


};

gdjs.evtsExt__A3F__LerpTowardChild.func = function(runtimeScene, Object, Capability3d, Target, TargetCapability3d, ChildName, FactorP, FactorR, parentEventsFunctionContext) {
let scopeInstanceContainer = null;
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "Target": Target
},
  _objectArraysMap: {
"Object": gdjs.objectsListsToArray(Object)
, "Target": gdjs.objectsListsToArray(Target)
},
  _behaviorNamesMap: {
"Capability3d": Capability3d
, "TargetCapability3d": TargetCapability3d
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
if (argName === "ChildName") return ChildName;
if (argName === "FactorP") return FactorP;
if (argName === "FactorR") return FactorR;
    return "";
  },
  getOnceTriggers: function() { return runtimeScene.getOnceTriggers(); }
};

gdjs.evtsExt__A3F__LerpTowardChild.GDObjectObjects1.length = 0;
gdjs.evtsExt__A3F__LerpTowardChild.GDObjectObjects2.length = 0;
gdjs.evtsExt__A3F__LerpTowardChild.GDObjectObjects3.length = 0;
gdjs.evtsExt__A3F__LerpTowardChild.GDTargetObjects1.length = 0;
gdjs.evtsExt__A3F__LerpTowardChild.GDTargetObjects2.length = 0;
gdjs.evtsExt__A3F__LerpTowardChild.GDTargetObjects3.length = 0;

gdjs.evtsExt__A3F__LerpTowardChild.eventsList1(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__A3F__LerpTowardChild.GDObjectObjects1.length = 0;
gdjs.evtsExt__A3F__LerpTowardChild.GDObjectObjects2.length = 0;
gdjs.evtsExt__A3F__LerpTowardChild.GDObjectObjects3.length = 0;
gdjs.evtsExt__A3F__LerpTowardChild.GDTargetObjects1.length = 0;
gdjs.evtsExt__A3F__LerpTowardChild.GDTargetObjects2.length = 0;
gdjs.evtsExt__A3F__LerpTowardChild.GDTargetObjects3.length = 0;


return;
}

gdjs.evtsExt__A3F__LerpTowardChild.registeredGdjsCallbacks = [];