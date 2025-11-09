
if (typeof gdjs.evtsExt__Extension__DropItem !== "undefined") {
  gdjs.evtsExt__Extension__DropItem.registeredGdjsCallbacks.forEach(callback =>
    gdjs._unregisterCallback(callback)
  );
}

gdjs.evtsExt__Extension__DropItem = {};
gdjs.evtsExt__Extension__DropItem.GDItemObjectObjects1= [];
gdjs.evtsExt__Extension__DropItem.GDItemObjectObjects2= [];
gdjs.evtsExt__Extension__DropItem.GDItemObjectObjects3= [];
gdjs.evtsExt__Extension__DropItem.GDItemObjectObjects4= [];


gdjs.evtsExt__Extension__DropItem.mapOfGDgdjs_9546evtsExt_9595_9595Extension_9595_9595DropItem_9546GDItemObjectObjects3Objects = Hashtable.newFrom({"ItemObject": gdjs.evtsExt__Extension__DropItem.GDItemObjectObjects3});
gdjs.evtsExt__Extension__DropItem.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().get("CalculateItemDropChance")) <= eventsFunctionContext.getArgument("DropChance"));
}
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = eventsFunctionContext.getOnceTriggers().triggerOnce(26120972);
}
}
if (isConditionTrue_0) {
gdjs.evtsExt__Extension__DropItem.GDItemObjectObjects3.length = 0;

{gdjs.evtTools.object.createObjectOnScene(eventsFunctionContext, gdjs.evtsExt__Extension__DropItem.mapOfGDgdjs_9546evtsExt_9595_9595Extension_9595_9595DropItem_9546GDItemObjectObjects3Objects, gdjs.randomInRange(eventsFunctionContext.getArgument("Position_X") - 10, eventsFunctionContext.getArgument("Position_X") + 10), gdjs.randomInRange(eventsFunctionContext.getArgument("Position_Y") - 10, eventsFunctionContext.getArgument("Position_Y") + 10), "");
}
{for(var i = 0, len = gdjs.evtsExt__Extension__DropItem.GDItemObjectObjects3.length ;i < len;++i) {
    gdjs.evtsExt__Extension__DropItem.GDItemObjectObjects3[i].getBehavior(eventsFunctionContext.getBehaviorName("Parameter")).setAnimationName(eventsFunctionContext.getArgument("ObjectAnimationName"));
}
}
{for(var i = 0, len = gdjs.evtsExt__Extension__DropItem.GDItemObjectObjects3.length ;i < len;++i) {
    gdjs.evtsExt__Extension__DropItem.GDItemObjectObjects3[i].getBehavior(eventsFunctionContext.getBehaviorName("Object3D")).setZ(30);
}
}
}

}


};gdjs.evtsExt__Extension__DropItem.eventsList1 = function(runtimeScene, eventsFunctionContext) {

{


const repeatCount2 = eventsFunctionContext.getArgument("Amount");
for (let repeatIndex2 = 0;repeatIndex2 < repeatCount2;++repeatIndex2) {

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = eventsFunctionContext.getOnceTriggers().triggerOnce(26111340);
}
if (isConditionTrue_0)
{
{runtimeScene.getScene().getVariables().get("CalculateItemDropChance").setNumber(gdjs.randomInRange(0, 100));
}

{ //Subevents: 
gdjs.evtsExt__Extension__DropItem.eventsList0(runtimeScene, eventsFunctionContext);} //Subevents end.
}
}

}


};

gdjs.evtsExt__Extension__DropItem.func = function(runtimeScene, ItemObject, Parameter2, ObjectAnimationName, Parameter, Position_X, Position_Y, DropChance, Amount, parentEventsFunctionContext) {
let scopeInstanceContainer = null;
var eventsFunctionContext = {
  _objectsMap: {
"ItemObject": ItemObject
},
  _objectArraysMap: {
"ItemObject": gdjs.objectsListsToArray(ItemObject)
},
  _behaviorNamesMap: {
"Parameter2": Parameter2
, "Parameter": Parameter
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Extension"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Extension"),
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
if (argName === "ObjectAnimationName") return ObjectAnimationName;
if (argName === "Position_X") return Position_X;
if (argName === "Position_Y") return Position_Y;
if (argName === "DropChance") return DropChance;
if (argName === "Amount") return Amount;
    return "";
  },
  getOnceTriggers: function() { return runtimeScene.getOnceTriggers(); }
};

gdjs.evtsExt__Extension__DropItem.GDItemObjectObjects1.length = 0;
gdjs.evtsExt__Extension__DropItem.GDItemObjectObjects2.length = 0;
gdjs.evtsExt__Extension__DropItem.GDItemObjectObjects3.length = 0;
gdjs.evtsExt__Extension__DropItem.GDItemObjectObjects4.length = 0;

gdjs.evtsExt__Extension__DropItem.eventsList1(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__Extension__DropItem.GDItemObjectObjects1.length = 0;
gdjs.evtsExt__Extension__DropItem.GDItemObjectObjects2.length = 0;
gdjs.evtsExt__Extension__DropItem.GDItemObjectObjects3.length = 0;
gdjs.evtsExt__Extension__DropItem.GDItemObjectObjects4.length = 0;


return;
}

gdjs.evtsExt__Extension__DropItem.registeredGdjsCallbacks = [];