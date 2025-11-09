
if (typeof gdjs.evtsExt__A3F__ChangeMorphTarget !== "undefined") {
  gdjs.evtsExt__A3F__ChangeMorphTarget.registeredGdjsCallbacks.forEach(callback =>
    gdjs._unregisterCallback(callback)
  );
}

gdjs.evtsExt__A3F__ChangeMorphTarget = {};
gdjs.evtsExt__A3F__ChangeMorphTarget.forEachIndex2 = 0;

gdjs.evtsExt__A3F__ChangeMorphTarget.forEachObjects2 = [];

gdjs.evtsExt__A3F__ChangeMorphTarget.forEachTemporary2 = null;

gdjs.evtsExt__A3F__ChangeMorphTarget.forEachTotalCount2 = 0;

gdjs.evtsExt__A3F__ChangeMorphTarget.GDObjectObjects1= [];
gdjs.evtsExt__A3F__ChangeMorphTarget.GDObjectObjects2= [];
gdjs.evtsExt__A3F__ChangeMorphTarget.GDObjectObjects3= [];


gdjs.evtsExt__A3F__ChangeMorphTarget.userFunc0x10c41a8 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
const Object3D = objects[0].get3DRendererObject();
const TargetName = eventsFunctionContext.getArgument("TargetName");
const Operator = eventsFunctionContext.getArgument("Operator");
const Value = eventsFunctionContext.getArgument("Value");
//
Object3D.traverse((Child) => {
    if (Child.morphTargetDictionary) {
        const Idx = Child.morphTargetDictionary[TargetName];
        if (Idx !== undefined) {
            if (Operator == "+") {
                Child.morphTargetInfluences[Idx] += Value;
            } else if (Operator == "-") {
                Child.morphTargetInfluences[Idx] -= Value;
            } else if (Operator == "*") {
                Child.morphTargetInfluences[Idx] *= Value;
            } else if (Operator == "/") {
                Child.morphTargetInfluences[Idx] /= Value;
            } else {
                // =
                Child.morphTargetInfluences[Idx] = Value;
            }
            Child.morphTargetInfluences[Idx] = gdjs.evtTools.common.clamp(Child.morphTargetInfluences[Idx], 0, 1.0);
        }
    }
});
};
gdjs.evtsExt__A3F__ChangeMorphTarget.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(gdjs.evtsExt__A3F__ChangeMorphTarget.GDObjectObjects2, gdjs.evtsExt__A3F__ChangeMorphTarget.GDObjectObjects3);


const objects = gdjs.evtsExt__A3F__ChangeMorphTarget.GDObjectObjects3;
gdjs.evtsExt__A3F__ChangeMorphTarget.userFunc0x10c41a8(runtimeScene, objects, eventsFunctionContext);

}


};gdjs.evtsExt__A3F__ChangeMorphTarget.eventsList1 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__A3F__ChangeMorphTarget.GDObjectObjects1);

for (gdjs.evtsExt__A3F__ChangeMorphTarget.forEachIndex2 = 0;gdjs.evtsExt__A3F__ChangeMorphTarget.forEachIndex2 < gdjs.evtsExt__A3F__ChangeMorphTarget.GDObjectObjects1.length;++gdjs.evtsExt__A3F__ChangeMorphTarget.forEachIndex2) {
gdjs.evtsExt__A3F__ChangeMorphTarget.GDObjectObjects2.length = 0;


gdjs.evtsExt__A3F__ChangeMorphTarget.forEachTemporary2 = gdjs.evtsExt__A3F__ChangeMorphTarget.GDObjectObjects1[gdjs.evtsExt__A3F__ChangeMorphTarget.forEachIndex2];
gdjs.evtsExt__A3F__ChangeMorphTarget.GDObjectObjects2.push(gdjs.evtsExt__A3F__ChangeMorphTarget.forEachTemporary2);
let isConditionTrue_0 = false;
if (true) {

{ //Subevents: 
gdjs.evtsExt__A3F__ChangeMorphTarget.eventsList0(runtimeScene, eventsFunctionContext);} //Subevents end.
}
}

}


};

gdjs.evtsExt__A3F__ChangeMorphTarget.func = function(runtimeScene, Object, Capability3d, TargetName, Operator, Value, parentEventsFunctionContext) {
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
if (argName === "TargetName") return TargetName;
if (argName === "Operator") return Operator;
if (argName === "Value") return Value;
    return "";
  },
  getOnceTriggers: function() { return runtimeScene.getOnceTriggers(); }
};

gdjs.evtsExt__A3F__ChangeMorphTarget.GDObjectObjects1.length = 0;
gdjs.evtsExt__A3F__ChangeMorphTarget.GDObjectObjects2.length = 0;
gdjs.evtsExt__A3F__ChangeMorphTarget.GDObjectObjects3.length = 0;

gdjs.evtsExt__A3F__ChangeMorphTarget.eventsList1(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__A3F__ChangeMorphTarget.GDObjectObjects1.length = 0;
gdjs.evtsExt__A3F__ChangeMorphTarget.GDObjectObjects2.length = 0;
gdjs.evtsExt__A3F__ChangeMorphTarget.GDObjectObjects3.length = 0;


return;
}

gdjs.evtsExt__A3F__ChangeMorphTarget.registeredGdjsCallbacks = [];