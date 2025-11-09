
if (typeof gdjs.evtsExt__A3F__LookAtObject !== "undefined") {
  gdjs.evtsExt__A3F__LookAtObject.registeredGdjsCallbacks.forEach(callback =>
    gdjs._unregisterCallback(callback)
  );
}

gdjs.evtsExt__A3F__LookAtObject = {};
gdjs.evtsExt__A3F__LookAtObject.GDObjectObjects1= [];
gdjs.evtsExt__A3F__LookAtObject.GDObjectObjects2= [];
gdjs.evtsExt__A3F__LookAtObject.GDTargetObjects1= [];
gdjs.evtsExt__A3F__LookAtObject.GDTargetObjects2= [];


gdjs.evtsExt__A3F__LookAtObject.mapOfGDgdjs_9546evtsExt_9595_9595A3F_9595_9595LookAtObject_9546GDObjectObjects1Objects = Hashtable.newFrom({"Object": gdjs.evtsExt__A3F__LookAtObject.GDObjectObjects1});
gdjs.evtsExt__A3F__LookAtObject.mapOfGDgdjs_9546evtsExt_9595_9595A3F_9595_9595LookAtObject_9546GDObjectObjects1Objects = Hashtable.newFrom({"Object": gdjs.evtsExt__A3F__LookAtObject.GDObjectObjects1});
gdjs.evtsExt__A3F__LookAtObject.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (("" + eventsFunctionContext.getArgument("TargetPoint")) == "Center point");
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__A3F__LookAtObject.GDObjectObjects1);
gdjs.copyArray(eventsFunctionContext.getObjects("Target"), gdjs.evtsExt__A3F__LookAtObject.GDTargetObjects1);
{gdjs.evtsExt__A3F__LookAtPosition.func(runtimeScene, gdjs.evtsExt__A3F__LookAtObject.mapOfGDgdjs_9546evtsExt_9595_9595A3F_9595_9595LookAtObject_9546GDObjectObjects1Objects, eventsFunctionContext.getBehaviorName("Capability3d"), (( gdjs.evtsExt__A3F__LookAtObject.GDTargetObjects1.length === 0 ) ? 0 :gdjs.evtsExt__A3F__LookAtObject.GDTargetObjects1[0].getCenterXInScene()), (( gdjs.evtsExt__A3F__LookAtObject.GDTargetObjects1.length === 0 ) ? 0 :gdjs.evtsExt__A3F__LookAtObject.GDTargetObjects1[0].getCenterYInScene()), (( gdjs.evtsExt__A3F__LookAtObject.GDTargetObjects1.length === 0 ) ? 0 :gdjs.evtsExt__A3F__LookAtObject.GDTargetObjects1[0].getBehavior(eventsFunctionContext.getBehaviorName("TargetCapability3d")).getCenterZInScene()), eventsFunctionContext);
}
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (("" + eventsFunctionContext.getArgument("TargetPoint")) != "Center point");
}
if (isConditionTrue_0) {
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__A3F__LookAtObject.GDObjectObjects1);
gdjs.copyArray(eventsFunctionContext.getObjects("Target"), gdjs.evtsExt__A3F__LookAtObject.GDTargetObjects1);
{gdjs.evtsExt__A3F__LookAtPosition.func(runtimeScene, gdjs.evtsExt__A3F__LookAtObject.mapOfGDgdjs_9546evtsExt_9595_9595A3F_9595_9595LookAtObject_9546GDObjectObjects1Objects, eventsFunctionContext.getBehaviorName("Capability3d"), (( gdjs.evtsExt__A3F__LookAtObject.GDTargetObjects1.length === 0 ) ? 0 :gdjs.evtsExt__A3F__LookAtObject.GDTargetObjects1[0].getX()), (( gdjs.evtsExt__A3F__LookAtObject.GDTargetObjects1.length === 0 ) ? 0 :gdjs.evtsExt__A3F__LookAtObject.GDTargetObjects1[0].getY()), (( gdjs.evtsExt__A3F__LookAtObject.GDTargetObjects1.length === 0 ) ? 0 :gdjs.evtsExt__A3F__LookAtObject.GDTargetObjects1[0].getBehavior(eventsFunctionContext.getBehaviorName("TargetCapability3d")).getZ()), eventsFunctionContext);
}
}

}


};

gdjs.evtsExt__A3F__LookAtObject.func = function(runtimeScene, Object, Capability3d, Target, TargetCapability3d, TargetPoint, parentEventsFunctionContext) {
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
if (argName === "TargetPoint") return TargetPoint;
    return "";
  },
  getOnceTriggers: function() { return runtimeScene.getOnceTriggers(); }
};

gdjs.evtsExt__A3F__LookAtObject.GDObjectObjects1.length = 0;
gdjs.evtsExt__A3F__LookAtObject.GDObjectObjects2.length = 0;
gdjs.evtsExt__A3F__LookAtObject.GDTargetObjects1.length = 0;
gdjs.evtsExt__A3F__LookAtObject.GDTargetObjects2.length = 0;

gdjs.evtsExt__A3F__LookAtObject.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__A3F__LookAtObject.GDObjectObjects1.length = 0;
gdjs.evtsExt__A3F__LookAtObject.GDObjectObjects2.length = 0;
gdjs.evtsExt__A3F__LookAtObject.GDTargetObjects1.length = 0;
gdjs.evtsExt__A3F__LookAtObject.GDTargetObjects2.length = 0;


return;
}

gdjs.evtsExt__A3F__LookAtObject.registeredGdjsCallbacks = [];