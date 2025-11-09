
if (typeof gdjs.evtsExt__A3F__ChildRotateSpeed !== "undefined") {
  gdjs.evtsExt__A3F__ChildRotateSpeed.registeredGdjsCallbacks.forEach(callback =>
    gdjs._unregisterCallback(callback)
  );
}

gdjs.evtsExt__A3F__ChildRotateSpeed = {};
gdjs.evtsExt__A3F__ChildRotateSpeed.GDObjectObjects1= [];
gdjs.evtsExt__A3F__ChildRotateSpeed.GDObjectObjects2= [];


gdjs.evtsExt__A3F__ChildRotateSpeed.mapOfGDgdjs_9546evtsExt_9595_9595A3F_9595_9595ChildRotateSpeed_9546GDObjectObjects1Objects = Hashtable.newFrom({"Object": gdjs.evtsExt__A3F__ChildRotateSpeed.GDObjectObjects1});
gdjs.evtsExt__A3F__ChildRotateSpeed.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__A3F__ChildRotateSpeed.GDObjectObjects1);
{gdjs.evtsExt__A3F__ChildRotateAngle.func(runtimeScene, gdjs.evtsExt__A3F__ChildRotateSpeed.mapOfGDgdjs_9546evtsExt_9595_9595A3F_9595_9595ChildRotateSpeed_9546GDObjectObjects1Objects, eventsFunctionContext.getBehaviorName("Capability3d"), eventsFunctionContext.getArgument("Child"), eventsFunctionContext.getArgument("Axis"), eventsFunctionContext.getArgument("Speed") * gdjs.evtTools.runtimeScene.getElapsedTimeInSeconds(runtimeScene), eventsFunctionContext);
}
}

}


};

gdjs.evtsExt__A3F__ChildRotateSpeed.func = function(runtimeScene, Object, Capability3d, Child, Axis, Speed, parentEventsFunctionContext) {
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
if (argName === "Axis") return Axis;
if (argName === "Speed") return Speed;
    return "";
  },
  getOnceTriggers: function() { return runtimeScene.getOnceTriggers(); }
};

gdjs.evtsExt__A3F__ChildRotateSpeed.GDObjectObjects1.length = 0;
gdjs.evtsExt__A3F__ChildRotateSpeed.GDObjectObjects2.length = 0;

gdjs.evtsExt__A3F__ChildRotateSpeed.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__A3F__ChildRotateSpeed.GDObjectObjects1.length = 0;
gdjs.evtsExt__A3F__ChildRotateSpeed.GDObjectObjects2.length = 0;


return;
}

gdjs.evtsExt__A3F__ChildRotateSpeed.registeredGdjsCallbacks = [];