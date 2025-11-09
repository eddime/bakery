
if (typeof gdjs.evtsExt__A3F__CheckDistance !== "undefined") {
  gdjs.evtsExt__A3F__CheckDistance.registeredGdjsCallbacks.forEach(callback =>
    gdjs._unregisterCallback(callback)
  );
}

gdjs.evtsExt__A3F__CheckDistance = {};
gdjs.evtsExt__A3F__CheckDistance.GDObjectObjects1= [];
gdjs.evtsExt__A3F__CheckDistance.GDTargetObjectObjects1= [];


gdjs.evtsExt__A3F__CheckDistance.userFunc0xf23118 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
const TargetObjects = eventsFunctionContext.getObjects("TargetObject");
if (objects.length == 0 || TargetObjects.length == 0) {
    return;
}
const ObjectsLists = eventsFunctionContext.getObjectsLists("Object");
const TargetObjectsLists = eventsFunctionContext.getObjectsLists("TargetObject");
const Operator = eventsFunctionContext.getArgument("Operator");
const Distance = eventsFunctionContext.getArgument("Distance");
const Arguments = {Ope: Operator, Dis: Distance};
//
eventsFunctionContext.returnValue = gdjs.evtTools.object.twoListsTest(
    (Obj1, Obj2, Arg) => {
        // const Obj1_3D = Obj1.get3DRendererObject();
        // const Obj2_3D = Obj2.get3DRendererObject();
        // const PosA = Obj1_3D.position;
        // const PosB = Obj2_3D.position;
        const PosA = new THREE.Vector3(Obj1.getX(), Obj1.getY(), Obj1.getZ());
        const PosB = new THREE.Vector3(Obj2.getX(), Obj2.getY(), Obj2.getZ());
        const Dis = PosA.distanceTo(PosB);
        if (Arg.Ope == "=") {
            return (Dis == Arg.Dis);
        } else if (Arg.Ope == "<") {
            return (Dis < Arg.Dis);
        } else if (Arg.Ope == ">") {
            return (Dis > Arg.Dis);
        } else if (Arg.Ope == "≤") {
            return (Dis <= Arg.Dis);
        } else if (Arg.Ope == "≥") {
            return (Dis >= Arg.Dis);
        } else {
            // ≠
            return (Dis != Arg.Dis);
        }
    },
    ObjectsLists,
    TargetObjectsLists,
    false,
    Arguments
);


};
gdjs.evtsExt__A3F__CheckDistance.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__A3F__CheckDistance.GDObjectObjects1);

const objects = gdjs.evtsExt__A3F__CheckDistance.GDObjectObjects1;
gdjs.evtsExt__A3F__CheckDistance.userFunc0xf23118(runtimeScene, objects, eventsFunctionContext);

}


};

gdjs.evtsExt__A3F__CheckDistance.func = function(runtimeScene, Object, Capability3d, TargetObject, TargetCapability3d, Operator, Distance, parentEventsFunctionContext) {
let scopeInstanceContainer = null;
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "TargetObject": TargetObject
},
  _objectArraysMap: {
"Object": gdjs.objectsListsToArray(Object)
, "TargetObject": gdjs.objectsListsToArray(TargetObject)
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
if (argName === "Operator") return Operator;
if (argName === "Distance") return Distance;
    return "";
  },
  getOnceTriggers: function() { return runtimeScene.getOnceTriggers(); }
};

gdjs.evtsExt__A3F__CheckDistance.GDObjectObjects1.length = 0;
gdjs.evtsExt__A3F__CheckDistance.GDTargetObjectObjects1.length = 0;

gdjs.evtsExt__A3F__CheckDistance.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__A3F__CheckDistance.GDObjectObjects1.length = 0;
gdjs.evtsExt__A3F__CheckDistance.GDTargetObjectObjects1.length = 0;


return !!eventsFunctionContext.returnValue;
}

gdjs.evtsExt__A3F__CheckDistance.registeredGdjsCallbacks = [];